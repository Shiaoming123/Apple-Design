export const CASES = Object.freeze({
  commerce: {
    kicker: 'CASE 01 · COMMERCE',
    title: '商品详情与购买',
    summary: '把商品、选择条件、履约信息和购买动作组织成一条连续路径。',
  },
  dashboard: {
    kicker: 'CASE 02 · ANALYTICS',
    title: '数据仪表盘',
    summary: '从堆叠指标转向“发生了什么、为什么重要、下一步做什么”。',
  },
  editor: {
    kicker: 'CASE 03 · EDITOR',
    title: '内容编辑器',
    summary: '让写作、保存状态、预览与发布边界在同一个工作上下文中持续可见。',
  },
})

export function normalizeView(input = '') {
  const params = input instanceof URLSearchParams ? input : new URLSearchParams(input)
  const caseName = Object.hasOwn(CASES, params.get('case')) ? params.get('case') : 'commerce'
  const view = params.get('view') === 'before' ? 'before' : 'after'
  return { caseName, view }
}

export function initGallery(doc = document, locationLike = window.location, historyLike = window.history) {
  let current = normalizeView(locationLike.search)
  let cartCount = 0
  let saveTimer
  let publishTrigger
  const status = doc.querySelector('#prototype-status')
  const dialog = doc.querySelector('#publish-dialog')

  const announce = message => { status.textContent = message }
  const syncUrl = () => {
    const url = new URL(locationLike.href)
    url.searchParams.set('case', current.caseName)
    url.searchParams.set('view', current.view)
    historyLike.replaceState(null, '', url)
  }
  const render = ({ updateUrl = true } = {}) => {
    const meta = CASES[current.caseName]
    doc.querySelector('#case-kicker').textContent = meta.kicker
    doc.querySelector('#case-title').textContent = meta.title
    doc.querySelector('#case-summary').textContent = meta.summary
    doc.querySelectorAll('[data-case-button]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.caseButton === current.caseName)))
    doc.querySelectorAll('[data-view-button]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.viewButton === current.view)))
    doc.querySelectorAll('.prototype').forEach(prototype => { prototype.hidden = prototype.dataset.case !== current.caseName || prototype.dataset.view !== current.view })
    announce(`正在查看${meta.title}的重构${current.view === 'after' ? '后' : '前'}版本。`)
    if (updateUrl) syncUrl()
  }

  doc.querySelectorAll('[data-case-button]').forEach(button => button.addEventListener('click', () => {
    current = { ...current, caseName: button.dataset.caseButton }
    render()
  }))
  doc.querySelectorAll('[data-view-button]').forEach(button => button.addEventListener('click', () => {
    current = { ...current, view: button.dataset.viewButton }
    render()
  }))
  doc.querySelectorAll('[data-action="add-cart"]').forEach(button => button.addEventListener('click', () => {
    cartCount += 1
    doc.querySelectorAll('[data-cart-count]').forEach(counter => { counter.textContent = String(cartCount) })
    announce(`Arc One 已加入购物袋。购物袋中有 ${cartCount} 件商品。`)
  }))
  doc.querySelectorAll('[data-color]').forEach(input => input.addEventListener('change', () => {
    doc.querySelectorAll('[data-selected-color]').forEach(label => { label.textContent = input.dataset.color })
    announce(`已选择${input.dataset.color}。`)
  }))
  doc.querySelectorAll('[data-range]').forEach(select => select.addEventListener('change', () => {
    doc.querySelectorAll('[data-range]').forEach(peer => { peer.value = select.value })
    announce(`仪表盘已切换为近 ${select.value} 天。`)
  }))
  doc.querySelectorAll('[data-sync]').forEach(field => field.addEventListener('input', () => {
    const key = field.dataset.sync
    doc.querySelectorAll(`[data-sync="${key}"]`).forEach(peer => { if (peer !== field) peer.value = field.value })
    doc.querySelectorAll('[data-save-status]').forEach(label => { label.textContent = '有未保存的更改' })
    clearTimeout(saveTimer)
    saveTimer = setTimeout(() => {
      doc.querySelectorAll('[data-save-status]').forEach(label => { label.textContent = '所有更改已保存 · 刚刚' })
      announce('文章更改已保存到当前演示。')
    }, 650)
  }))
  doc.querySelectorAll('[data-action="preview"]').forEach(button => button.addEventListener('click', () => announce('预览已准备；此演示不会打开新页面。')))
  doc.querySelectorAll('[data-action="inspect-issue"]').forEach(button => button.addEventListener('click', () => announce(`已选择异常：${button.querySelector('strong').textContent}。`)))
  doc.querySelectorAll('[data-action="publish"]').forEach(button => button.addEventListener('click', () => {
    publishTrigger = button
    dialog.showModal()
  }))
  dialog.addEventListener('close', () => {
    announce(dialog.returnValue === 'confirm' ? '演示发布已确认；没有内容被真实发布。' : '已返回编辑。')
    publishTrigger?.focus()
  })

  render({ updateUrl: false })
  return { get current() { return current }, render }
}

if (typeof document !== 'undefined') initGallery()
