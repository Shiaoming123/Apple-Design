// Original in-memory teaching example; no persistence or production backend.
export function titleError(raw) {
  if (typeof raw !== 'string') return '标题必须是文字。'
  const value = raw.trim()
  if (!value) return '请输入任务标题。'
  if (value.length > 120) return '标题过长，请缩短后重试。'
  return ''
}

export async function saveTitle(raw, fail = false) {
  const error = titleError(raw)
  if (error) throw new Error(error)
  await new Promise(resolve => setTimeout(resolve, 180))
  if (fail) throw new Error('模拟保存失败；输入已保留，请重试。')
  return raw.trim()
}
