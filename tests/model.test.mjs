import assert from 'node:assert/strict'
import test from 'node:test'
import { titleError, saveTitle } from '../skills/apple-design/examples/interaction-lab/model.mjs'

test('title boundaries reject nontext, whitespace and excessive input', () => {
  for (const invalid of [null, 3, '', '  ', 'a'.repeat(121)]) assert.ok(titleError(invalid))
  assert.equal(titleError('阅读笔记'), '')
  assert.equal(titleError('a'.repeat(120)), '')
})
test('a successful simulated save returns trimmed text, never markup execution', async () => {
  assert.equal(await saveTitle('  <script>example</script>  '), '<script>example</script>')
})
test('validation and simulated failure reject without claiming success', async () => {
  await assert.rejects(saveTitle(' '), /请输入/)
  await assert.rejects(saveTitle('保留草稿', true), /输入已保留/)
  assert.equal(await saveTitle('保留草稿'), '保留草稿')
})
