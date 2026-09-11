import { titleError, saveTitle } from './model.mjs'
const tasks = ['复盘页面方案', '检查键盘与焦点', '验证窄窗口布局']
const byId = id => document.getElementById(id)
const editor = byId('editor'), form = byId('form'), title = byId('title')
const save = byId('save'), cancel = byId('cancel'), fail = byId('fail')
let selected = 0, busy = false
function render() {
  byId('detail-title').textContent = tasks[selected]
  document.querySelectorAll('[data-task]').forEach(button => {
    const index = Number(button.dataset.task)
    button.textContent = tasks[index]
    if (index === selected) button.setAttribute('aria-current', 'true')
    else button.removeAttribute('aria-current')
  })
}
function showError(message) {
  byId('error').textContent = message
  byId('error').hidden = !message
}
function requestClose() {
  if (busy) return
  if (title.value !== tasks[selected]) {
    byId('discard').hidden = false
    byId('continue').focus()
  } else editor.close()
}
document.querySelectorAll('[data-task]').forEach(button => button.addEventListener('click', () => {
  selected = Number(button.dataset.task); render()
}))
byId('edit').addEventListener('click', () => {
  title.value = tasks[selected]
  title.removeAttribute('aria-invalid')
  showError(''); byId('discard').hidden = true; fail.checked = false
  editor.showModal(); title.focus()
})
cancel.addEventListener('click', requestClose)
editor.addEventListener('cancel', event => { event.preventDefault(); requestClose() })
editor.addEventListener('close', () => byId('edit').focus())
byId('continue').addEventListener('click', () => { byId('discard').hidden = true; title.focus() })
byId('discard-confirm').addEventListener('click', () => { if (!busy) editor.close() })
title.addEventListener('input', () => { title.removeAttribute('aria-invalid'); showError(''); byId('discard').hidden = true })
form.addEventListener('submit', async event => {
  event.preventDefault()
  if (busy) return
  const error = titleError(title.value)
  showError(error)
  if (error) { title.setAttribute('aria-invalid', 'true'); title.focus(); return }
  title.removeAttribute('aria-invalid')
  busy = true; title.readOnly = true; save.disabled = cancel.disabled = fail.disabled = true
  byId('discard').hidden = true
  form.setAttribute('aria-busy', 'true'); save.textContent = '保存中…'
  try {
    tasks[selected] = await saveTitle(title.value, fail.checked)
    render()
    byId('status').textContent = '已更新当前演示；刷新后还原。'
    editor.close()
  } catch (cause) {
    showError(cause instanceof Error ? cause.message : '保存失败；输入已保留。')
    fail.checked = false; title.focus()
  } finally {
    busy = false; title.readOnly = false; save.disabled = cancel.disabled = fail.disabled = false
    form.setAttribute('aria-busy', 'false'); save.textContent = '保存更改'
  }
})
for (const [id, attribute, on, off] of [['theme', 'mode', 'dark', 'light'], ['glass', 'glass', 'off', 'on']]) {
  byId(id).addEventListener('click', () => {
    const enabled = byId(id).getAttribute('aria-pressed') !== 'true'
    byId(id).setAttribute('aria-pressed', String(enabled))
    document.documentElement.dataset[attribute] = enabled ? on : off
  })
}

