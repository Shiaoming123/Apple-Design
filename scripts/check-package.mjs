import assert from 'node:assert/strict'
import { readFile, readdir, access } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
const root = fileURLToPath(new URL('..', import.meta.url))
const skip = new Set(['.git', 'node_modules', 'artifacts'])
async function walk(directory) {
  const files = []
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (skip.has(entry.name)) continue
    const path = resolve(directory, entry.name)
    if (entry.isDirectory()) files.push(...await walk(path))
    else if (entry.isFile()) files.push(path)
  }
  return files
}
const files = await walk(root)
for (const file of files) {
  assert.ok(!/\.(?:woff2?|ttf|otf|env)$/i.test(file), 'Do not bundle fonts or environment secrets')
  if (!/\.(?:md|mjs|html|css|json|yaml)$/.test(file)) continue
  const text = await readFile(file, 'utf8')
  assert.ok(!/[A-Z]:[\\/]+Users[\\/]/i.test(text), 'Personal absolute paths must not enter the package')
  assert.ok(!/sk-(?:proj-)?[A-Za-z0-9_-]{30,}/.test(text), 'Potential secret in package')
  if (!file.endsWith('.md')) continue
  const prose = text.replace(/```[\s\S]*?```/g, '')
  for (const match of prose.matchAll(/!?\[[^\]]*\]\(([^)]+)\)/g)) {
    const target = match[1].replace(/^<|>$/g, '').split('#')[0]
    if (!target || /^(?:https?:|mailto:)/.test(target)) continue
    await access(resolve(dirname(file), target))
  }
}
const skill = await readFile(resolve(root, 'skills/apple-design/SKILL.md'), 'utf8')
assert.match(skill, /^---\r?\nname: apple-design\r?\ndescription: .+\r?\nlicense: MIT\r?\n---/)
for (const path of ['LICENSE', 'skills/apple-design/LICENSE']) {
  const text = await readFile(resolve(root, path), 'utf8')
  assert.ok(text.includes('Copyright (c) 2026 Sudewa'))
  assert.ok(text.includes('Permission is hereby granted, free of charge'))
}
assert.ok(!files.some(file => file.endsWith('read-hig.mjs')), 'Public bundle excludes the old online extraction script')
console.log(JSON.stringify({ status: 'passed', files: files.length, checks: ['local links', 'license notices', 'personal paths', 'asset boundary', 'skill entry'] }, null, 2))
