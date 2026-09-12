import assert from 'node:assert/strict'
import { access, cp, mkdtemp, readFile, readdir, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join, relative, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const source = fileURLToPath(new URL('../skills/apple-design', import.meta.url))
const temporary = await mkdtemp(join(tmpdir(), 'apple-design-portability-'))
const target = join(temporary, 'apple-design')
async function check(directory) {
  let count = 0
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) { count += await check(path); continue }
    count++
    if (!entry.name.endsWith('.md')) continue
    const prose = (await readFile(path, 'utf8')).replace(/\x60\x60\x60[\s\S]*?\x60\x60\x60/g, '')
    for (const match of prose.matchAll(/!?\[[^\]]*\]\(([^)]+)\)/g)) {
      const link = match[1].replace(/^<|>$/g, '').split('#')[0]
      if (!link || /^(https?:|mailto:)/.test(link)) continue
      const resolved = resolve(dirname(path), link)
      const local = relative(target, resolved)
      assert.ok(local !== '..' && !local.startsWith('..' + sep), 'Skill resource must remain inside the relocated package: ' + link)
      await access(resolved)
    }
  }
  return count
}
try {
  await cp(source, target, { recursive: true, filter: path => path !== join(source, 'agents') })
  await assert.rejects(access(join(target, 'agents')))
  const entry = await readFile(join(target, 'SKILL.md'), 'utf8')
  assert.match(entry, /^---\r?\nname: apple-design\r?\ndescription: [^\r\n]+\r?\n---/)
  const files = await check(target)
  for (const file of ['index.html', 'app.mjs', 'style.css', 'comparisons.css', 'redesign.css']) {
    await access(join(target, 'examples/refactor-gallery', file))
  }
  console.log(JSON.stringify({ status: 'passed', files, relocated: true, hostMetadataRequired: false }))
} finally {
  const owned = relative(resolve(tmpdir()), resolve(temporary))
  assert.ok(!owned.includes(sep) && owned.startsWith('apple-design-portability-'))
  await rm(temporary, { recursive: true })
}
