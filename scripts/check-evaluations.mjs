import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const file = fileURLToPath(new URL('../skills/apple-design/evaluations/scenarios.json', import.meta.url))
const { version, scenarios } = JSON.parse(await readFile(file, 'utf8'))
const ids = ['locked-checkout', 'existing-component', 'new-workspace', 'failure-recovery', 'cross-platform-proof', 'source-boundary']

assert.equal(version, 1)
assert.deepEqual(scenarios.map(({ id }) => id), ids)
for (const scenario of scenarios) {
  assert.equal(typeof scenario.prompt, 'string')
  assert.ok(scenario.prompt.length > 30)
  for (const field of ['mustInclude', 'mustAvoid']) {
    assert.ok(Array.isArray(scenario[field]) && scenario[field].length >= 2)
    assert.ok(scenario[field].every(item => typeof item === 'string' && item.length > 8))
  }
}
console.log(JSON.stringify({ status: 'passed', scenarios: scenarios.length, ids }))
