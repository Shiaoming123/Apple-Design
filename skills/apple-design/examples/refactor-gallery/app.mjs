export const CASES = Object.freeze({
  cards: {
    kicker: 'CASE 05 · CARDS',
    title: 'Project cards, redesigned',
    summary: 'From a paper catalog to a graphite workspace: type, surfaces, composition, and disclosure.',
  },
  charts: {
    kicker: 'CASE 06 · CHARTS',
    title: 'Data exploration, redesigned',
    summary: 'From a report panel to an editorial data canvas with direct, keyboard-accessible exploration.',
  },
  commerce: {
    kicker: 'CASE 01 · COMMERCE',
    title: 'Product detail & purchase',
    summary: 'Shape product, choice, fulfilment, and purchase into one calm path.',
  },
  dashboard: {
    kicker: 'CASE 02 · ANALYTICS',
    title: 'Operations dashboard',
    summary: 'Move from metric inventory to what changed, why it matters, and what comes next.',
  },
  editor: {
    kicker: 'CASE 03 · EDITOR',
    title: 'Content editor',
    summary: 'Keep writing, save state, preview, and publishing boundaries in one continuous workspace.',
  },
  mobile: {
    kicker: 'CASE 04 · MOBILE',
    title: 'Mobile daily planner',
    summary: 'Turn a dense task list into a touch-first path from today to focus.',
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
  let focusTimer
  let focusRemaining = 45 * 60
  let focusDeadline = 0
  let focusPaused = false
  const updateFocusClock = () => {
    if (!focusPaused) focusRemaining = Math.max(0, Math.ceil((focusDeadline - Date.now()) / 1000))
    const clock = doc.querySelector('[data-focus-time]')
    clock.textContent = String(Math.floor(focusRemaining / 60)).padStart(2, '0') + ':' + String(focusRemaining % 60).padStart(2, '0')
    if (focusRemaining === 0) clearInterval(focusTimer)
  }
  const mobileTriggers = new WeakMap()
  const status = doc.querySelector('#prototype-status')
  const dialog = doc.querySelector('#publish-dialog')

  const announce = message => { status.textContent = message }
  const chartData = {
    revenue: { label: 'Revenue (USD)', values: [48000, 32000, 20000], format: value => '$' + value.toLocaleString('en-US') },
    orders: { label: 'Orders', values: [180, 240, 180], format: value => value.toLocaleString('en-US') },
  }
  const renderCharts = metric => {
    const data = chartData[metric]
    const total = data.values.reduce((sum, value) => sum + value, 0)
    const names = ['Direct', 'Organic', 'Referral']
    const shares = data.values.map(value => value / total * 100)
    doc.querySelectorAll('[data-case="charts"].prototype').forEach(panel => {
      panel.querySelector('[data-chart-metric]').value = metric
      panel.querySelector('[data-chart-caption]').textContent = data.label + ' by channel'
      const reading = panel.querySelector('[data-chart-reading]')
      reading.textContent = data.format(total) + ' total · ' + data.label
      if (panel.dataset.view === 'after') {
        reading.replaceChildren()
        const number = doc.createElement('strong')
        number.className = 'chart-total'
        number.textContent = data.format(total)
        reading.append(number, ' total · ' + data.label)
      }
      panel.querySelector('[data-chart-table]').innerHTML = names.map((name, i) => '<tr><th scope="row">' + name + '</th><td>' + data.format(data.values[i]) + '</td><td>' + shares[i] + '%</td></tr>').join('')
      const visual = panel.querySelector('[data-chart-visual]')
      // All markup is derived from the fixed fixture above, never user input.
      if (panel.dataset.view === 'before') {
        visual.innerHTML = '<div class="study-ring" aria-hidden="true" style="--stop-one:' + shares[0] + '%;--stop-two:' + (shares[0] + shares[1]) + '%"><span>' + data.format(total) + '<small>Total</small></span></div><ul class="ring-key">' + names.map((name, i) => '<li><i class="channel-' + i + '" aria-hidden="true"></i>' + name + '<strong>' + shares[i] + '%</strong></li>').join('') + '</ul>'
      } else {
        visual.innerHTML = '<div class="study-bars" role="group" aria-label="Channel shares on a zero to one hundred percent scale">' + names.map((name, i) => '<button type="button" class="study-bar-row chart-channel" data-chart-channel="' + i + '" aria-pressed="false"><div><strong>' + name + '</strong><span>' + data.format(data.values[i]) + ' · ' + shares[i] + '%</span></div><div class="bar-track"><i class="channel-' + i + '" style="width:' + shares[i] + '%"></i></div></button>').join('') + '<div class="bar-scale"><span>0%</span><span>50%</span><span>100%</span></div></div><p class="chart-insight" role="status">Select a channel to inspect its contribution.</p>'
      }
    })
  }
  doc.querySelectorAll('[data-chart-metric]').forEach(select => select.addEventListener('change', () => renderCharts(select.value)))
  renderCharts('revenue')
  doc.querySelector('[data-case="charts"][data-view="after"] [data-chart-visual]').addEventListener('click', event => {
    const button = event.target.closest('[data-chart-channel]')
    if (!button) return
    const panel = button.closest('.prototype')
    panel.querySelectorAll('[data-chart-channel]').forEach(peer => peer.setAttribute('aria-pressed', String(peer === button)))
    panel.querySelector('.chart-insight').textContent = button.innerText.replace(/\s+/g, ' ').trim() + ' of the selected total.'
  })
  doc.querySelector('[data-card-surface]').addEventListener('change', event => {
    doc.querySelector('.project-rows').dataset.surface = event.target.value
  })
  const transition = update => {
    const reduceMotion = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || !doc.startViewTransition) { update(); return }
    doc.startViewTransition(update)
  }
  const setMobileOverlay = (frame, open) => {
    const overlay = frame.querySelector('[data-mobile-overlay]')
    for (const child of frame.children) if (child !== overlay) child.inert = open
    overlay.hidden = !open
    if (open) queueMicrotask(() => overlay.querySelector('button, input, select')?.focus())
    else mobileTriggers.get(frame)?.focus()
  }
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
    announce(`Viewing ${meta.title.toLowerCase()} ${current.view === 'after' ? 'after' : 'before'} refactor.`)
    if (updateUrl) syncUrl()
  }

  doc.querySelectorAll('[data-case-button]').forEach(button => button.addEventListener('click', () => {
    current = { ...current, caseName: button.dataset.caseButton }
    transition(() => render())
  }))
  doc.querySelectorAll('[data-view-button]').forEach(button => button.addEventListener('click', () => {
    current = { ...current, view: button.dataset.viewButton }
    transition(() => render())
  }))
  doc.querySelectorAll('[data-action="add-cart"]').forEach(button => button.addEventListener('click', () => {
    cartCount += 1
    doc.querySelectorAll('[data-cart-count]').forEach(counter => { counter.textContent = String(cartCount) })
    button.classList.add('is-confirmed')
    setTimeout(() => button.classList.remove('is-confirmed'), 520)
    announce(`Arc One added. Your bag has ${cartCount} item${cartCount === 1 ? '' : 's'}.`)
    const feedback = button.closest('.prototype').querySelector('[data-cart-feedback]')
    if (feedback) { feedback.hidden = false; feedback.textContent = 'Added to your bag · ' + cartCount + ' item' + (cartCount === 1 ? '' : 's') }
  }))
  doc.querySelectorAll('[data-color]').forEach(input => input.addEventListener('change', () => {
    doc.querySelector('.after-media').dataset.finish = input.value
    doc.querySelector('[data-product-finish]').textContent = input.dataset.color
    doc.querySelectorAll('[data-selected-color]').forEach(label => { label.textContent = input.dataset.color })
    announce(`${input.dataset.color} selected.`)
  }))
  doc.querySelectorAll('[data-range]').forEach(select => select.addEventListener('change', () => {
    doc.querySelectorAll('[data-range]').forEach(peer => { peer.value = select.value })
    announce(`Dashboard changed to the last ${select.value} days.`)
  }))
  doc.querySelectorAll('[data-sync]').forEach(field => field.addEventListener('input', () => {
    const key = field.dataset.sync
    doc.querySelectorAll(`[data-sync="${key}"]`).forEach(peer => { if (peer !== field) peer.value = field.value })
    doc.querySelectorAll('[data-save-status]').forEach(label => { label.textContent = 'Unsaved changes' })
    clearTimeout(saveTimer)
    saveTimer = setTimeout(() => {
      doc.querySelectorAll('[data-save-status]').forEach(label => { label.textContent = 'All changes saved · just now' })
      announce('Story changes saved in this demo.')
    }, 650)
  }))
  doc.querySelectorAll('[data-action="preview"]').forEach(button => button.addEventListener('click', () => announce('Preview is ready; this demo does not open a new page.')))
  doc.querySelectorAll('[data-action="inspect-issue"]').forEach(button => button.addEventListener('click', () => {
    const panel = button.closest('.attention-panel')
    panel.querySelectorAll('[data-action="inspect-issue"]').forEach(peer => peer.setAttribute('aria-pressed', String(peer === button)))
    let detail = panel.querySelector('.issue-inspector')
    if (!detail) { detail = doc.createElement('p'); detail.className = 'issue-inspector'; detail.setAttribute('role', 'status'); panel.append(detail) }
    detail.textContent = button.innerText.replace(/\s+/g, ' ').trim()
    announce(`Selected issue: ${button.querySelector('strong').textContent}.`)
  }))
  doc.querySelector('[data-action="focus-writing"]').addEventListener('click', event => {
    const button = event.currentTarget
    const enabled = button.getAttribute('aria-pressed') !== 'true'
    button.setAttribute('aria-pressed', String(enabled))
    button.textContent = enabled ? 'Exit focus' : 'Focus view'
    button.closest('.editor-shell').classList.toggle('focus-writing', enabled)
  })
  doc.querySelectorAll('[data-action="publish"]').forEach(button => button.addEventListener('click', () => {
    publishTrigger = button
    dialog.showModal()
  }))
  dialog.addEventListener('close', () => {
    announce(dialog.returnValue === 'confirm' ? 'Demo publish confirmed; no real content was published.' : 'Returned to editing.')
    publishTrigger?.focus()
  })

  doc.querySelectorAll('[data-action="open-mobile-task"]').forEach(button => button.addEventListener('click', () => {
    const frame = button.closest('.phone-frame')
    mobileTriggers.set(frame, button)
    transition(() => setMobileOverlay(frame, true))
    announce('Task details opened.')
  }))
  doc.querySelectorAll('[data-action="close-mobile-task"]').forEach(button => button.addEventListener('click', () => {
    const frame = button.closest('.phone-frame')
    transition(() => setMobileOverlay(frame, false))
    announce('Task details closed.')
  }))
  doc.querySelectorAll('[data-action="start-mobile-focus"]').forEach(button => button.addEventListener('click', () => {
    const frame = button.closest('.phone-frame')
    transition(() => {
      setMobileOverlay(frame, false)
      const today = frame.querySelector('[data-mobile-today]')
      const focus = frame.querySelector('[data-mobile-focus]')
      if (today && focus) { today.hidden = true; focus.hidden = false; queueMicrotask(() => focus.focus()) }
      if (focus) {
        clearInterval(focusTimer)
        focusRemaining = 45 * 60
        focusPaused = false
        focusDeadline = Date.now() + focusRemaining * 1000
        const pause = focus.querySelector('[data-action="pause-mobile-focus"]')
        pause.textContent = 'Pause'
        pause.setAttribute('aria-pressed', 'false')
        updateFocusClock()
        focusTimer = setInterval(updateFocusClock, 250)
      }
    })
    announce('Focus started for Write product brief.')
  }))
  doc.querySelectorAll('[data-action="end-mobile-focus"]').forEach(button => button.addEventListener('click', () => {
    clearInterval(focusTimer)
    const frame = button.closest('.phone-frame')
    transition(() => {
      frame.querySelector('[data-mobile-today]').hidden = false
      frame.querySelector('[data-mobile-focus]').hidden = true
      queueMicrotask(() => mobileTriggers.get(frame)?.focus())
    })
    announce('Focus ended. Returned to Today.')
  }))
  doc.querySelectorAll('[data-action="pause-mobile-focus"]').forEach(button => button.addEventListener('click', () => {
    const paused = button.getAttribute('aria-pressed') !== 'true'
    updateFocusClock()
    focusPaused = paused
    if (!paused) focusDeadline = Date.now() + focusRemaining * 1000
    button.setAttribute('aria-pressed', String(paused))
    button.textContent = paused ? 'Resume' : 'Pause'
    announce(paused ? 'Focus paused.' : 'Focus resumed.')
  }))
  doc.querySelectorAll('[data-mobile-overlay]').forEach(overlay => overlay.addEventListener('keydown', event => {
    const frame = overlay.closest('.phone-frame')
    if (event.key === 'Escape') { event.preventDefault(); transition(() => setMobileOverlay(frame, false)); return }
    if (event.key !== 'Tab') return
    const controls = [...overlay.querySelectorAll('button, input, select')].filter(control => !control.disabled)
    const first = controls[0]
    const last = controls.at(-1)
    if (event.shiftKey && doc.activeElement === first) { event.preventDefault(); last.focus() }
    else if (!event.shiftKey && doc.activeElement === last) { event.preventDefault(); first.focus() }
  }))

  render({ updateUrl: false })
  return { get current() { return current }, render }
}

if (typeof document !== 'undefined') initGallery()
