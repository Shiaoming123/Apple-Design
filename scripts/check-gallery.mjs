import assert from 'node:assert/strict'
import { createServer } from 'node:http'
import { access, mkdir, readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright-core'

const root = fileURLToPath(new URL('..', import.meta.url))
const example = resolve(root, 'skills/apple-design/examples/refactor-gallery')
const screenshots = resolve(root, 'skills/apple-design/assets/case-studies/refactor-gallery')
const routes = new Map([
  ['/', ['index.html', 'text/html']],
  ['/app.mjs', ['app.mjs', 'text/javascript']],
  ['/style.css', ['style.css', 'text/css']],
  ['/comparisons.css', ['comparisons.css', 'text/css']],
  ['/redesign.css', ['redesign.css', 'text/css']],
])
const server = createServer(async (request, response) => {
  const resource = routes.get(new URL(request.url, 'http://localhost').pathname)
  if (!resource) { response.writeHead(404); response.end(); return }
  try {
    const data = await readFile(resolve(example, resource[0]))
    response.writeHead(200, { 'Content-Type': resource[1] + '; charset=utf-8' })
    response.end(data)
  } catch {
    response.writeHead(500)
    response.end('Example unavailable')
  }
})
const candidates = process.env.BROWSER_EXECUTABLE ? [process.env.BROWSER_EXECUTABLE] : [
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/chromium',
  '/usr/bin/google-chrome',
]
let executablePath
for (const path of candidates) { try { await access(path); executablePath = path; break } catch {} }
assert.ok(executablePath, 'Set BROWSER_EXECUTABLE to an installed Chrome/Edge/Chromium executable')
await mkdir(screenshots, { recursive: true })
await new Promise((done, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', done) })

let browser
try {
  browser = await chromium.launch({ executablePath, headless: true })
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce', locale: 'en-US' })
  const page = await context.newPage()
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
  const origin = `http://127.0.0.1:${server.address().port}`
  const openCase = async (caseName, view = 'after') => {
    await page.goto(`${origin}/?case=${caseName}&view=${view}`)
    const prototype = page.locator('.prototype:not([hidden])')
    await prototype.waitFor()
    assert.equal(await prototype.getAttribute('data-case'), caseName)
    assert.equal(await prototype.getAttribute('data-view'), view)
    return prototype
  }

  const caseNames = ['commerce', 'dashboard', 'editor', 'mobile', 'cards', 'charts']
  for (const caseName of caseNames) {
    await mkdir(resolve(screenshots, caseName), { recursive: true })
    let pairHeight = 0
    if (caseName !== 'mobile') {
      for (const view of ['before', 'after']) {
        const prototype = await openCase(caseName, view)
        pairHeight = Math.max(pairHeight, Math.ceil((await prototype.boundingBox()).height))
      }
    }
    for (const view of ['before', 'after']) {
      const prototype = await openCase(caseName, view)
      if (pairHeight) await prototype.evaluate((el, height) => { el.style.minHeight = height + 'px' }, pairHeight)
      assert.doesNotMatch(await prototype.innerText(), /\p{Script=Han}/u, `${caseName} ${view} copy must be English`)
      if (caseName === 'mobile') await prototype.locator('[data-action="open-mobile-task"]').click()
      const target = caseName === 'mobile' ? prototype.locator('.phone-frame') : prototype
      await target.screenshot({ path: resolve(screenshots, caseName, `${view}.png`), style: '.gallery-bar { visibility: hidden !important; }' })
    }
  }

  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await openCase('commerce')
  await page.getByRole('button', { name: 'Before' }).click()
  assert.ok(await page.evaluate(() => document.getAnimations().length > 0), 'view changes must animate when motion is allowed')
  await page.emulateMedia({ reducedMotion: 'reduce' })

  let prototype = await openCase('commerce')
  await prototype.getByLabel('Midnight').check()
  assert.equal(await prototype.locator('.after-media').getAttribute('data-finish'), 'black')
  await prototype.getByRole('button', { name: 'Add to bag' }).click()
  assert.match(await page.locator('#prototype-status').textContent(), /1 item/)
  assert.equal(await prototype.locator('[data-cart-feedback]').isVisible(), true)

  prototype = await openCase('dashboard')
  await prototype.getByLabel('Date range').selectOption('7')
  await prototype.locator('[data-action="inspect-issue"]').first().click()
  assert.match(await page.locator('#prototype-status').textContent(), /Payment failures increased/)
  assert.match(await prototype.locator('.issue-inspector').innerText(), /Payment failures increased/)

  prototype = await openCase('editor')
  await prototype.locator('[data-action="focus-writing"]').click()
  assert.equal(await prototype.locator('.editor-sidebar').isVisible(), false)
  await prototype.locator('[data-action="focus-writing"]').click()
  assert.equal(await prototype.locator('.editor-sidebar').isVisible(), true)
  await prototype.getByLabel('Story title').fill('Autosave preserves the current draft')
  await page.waitForTimeout(700)
  assert.match(await page.locator('[data-save-status]').textContent(), /All changes saved/)
  const publish = page.getByRole('button', { name: 'Publish…' })
  await publish.click()
  const dialog = page.getByRole('dialog', { name: /Publish “Spring product update”/ })
  await dialog.waitFor()
  await page.getByRole('button', { name: 'Keep editing' }).click()
  assert.equal(await publish.evaluate(button => button === document.activeElement), true)

  prototype = await openCase('mobile')
  const task = prototype.locator('[data-action="open-mobile-task"]')
  await task.click()
  const sheet = prototype.locator('[data-mobile-overlay]')
  await sheet.waitFor()
  assert.equal(await sheet.evaluate(element => element.contains(document.activeElement)), true, 'mobile sheet must receive focus')
  await page.keyboard.press('Escape')
  assert.equal(await task.evaluate(button => button === document.activeElement), true, 'mobile trigger focus must be restored')
  await task.click()
  await prototype.getByRole('button', { name: 'Start focus' }).click()
  const focus = prototype.locator('[data-mobile-focus]')
  await focus.waitFor()
  await page.waitForTimeout(1100)
  assert.notEqual(await focus.locator('[data-focus-time]').textContent(), '45:00')
  assert.equal(await focus.evaluate(element => element === document.activeElement), true, 'focus session must receive focus')
  const pause = focus.locator('[data-action="pause-mobile-focus"]')
  await pause.click()
  assert.equal(await pause.getAttribute('aria-pressed'), 'true')
  assert.equal(await pause.textContent(), 'Resume')
  const pausedTime = await focus.locator('[data-focus-time]').textContent()
  await page.waitForTimeout(1100)
  assert.equal(await focus.locator('[data-focus-time]').textContent(), pausedTime)
  await focus.getByRole('button', { name: 'End', exact: true }).click()
  await prototype.locator('[data-mobile-today]').waitFor()
  assert.equal(await task.evaluate(button => button === document.activeElement), true, 'ending focus must return to its task')

  for (const view of ['before', 'after']) {
    prototype = await openCase('cards', view)
    const disclosure = prototype.locator('summary').first()
    await disclosure.focus()
    await page.keyboard.press('Enter')
    assert.equal(await prototype.locator('details').first().getAttribute('open'), '')
    if (view === 'after') {
      const initialSurface = await prototype.locator('.study-project').first().evaluate(el => getComputedStyle(el).backgroundImage)
      await prototype.getByLabel('Surface').selectOption('soft')
      assert.notEqual(await prototype.locator('.study-project').first().evaluate(el => getComputedStyle(el).backgroundImage), initialSurface)
      await prototype.locator('summary').nth(1).click()
      assert.equal(await prototype.locator('details').first().getAttribute('open'), null)
    }
    prototype = await openCase('charts', view)
    await prototype.getByLabel('Measure').selectOption('orders')
    assert.match(await prototype.locator('[data-chart-reading]').innerText(), /600\s+total/)
    assert.deepEqual(await prototype.locator('tbody tr td:first-of-type').allTextContents(), ['180', '240', '180'])
    if (view === 'after') {
      assert.deepEqual(await prototype.locator('.bar-track i').evaluateAll(els => els.map(el => el.style.width)), ['30%', '40%', '30%'])
      await prototype.locator('[data-chart-channel="1"]').focus()
      await page.keyboard.press('Enter')
      assert.match(await prototype.locator('.chart-insight').innerText(), /Organic.*240.*40%/)
    }
    const nextView = view === 'before' ? 'after' : 'before'
    await page.locator('[data-view-button="' + nextView + '"]').click()
    assert.match(await page.locator('.prototype:not([hidden]) [data-chart-reading]').innerText(), /600\s+total/)
  }

  for (const caseName of caseNames) {
    await page.setViewportSize({ width: 390, height: 844 })
    await openCase(caseName)
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `${caseName} must not overflow at 390px`)
  }
  await page.setViewportSize({ width: 1440, height: 1000 })
  for (const caseName of ['cards', 'charts']) {
    for (const view of ['before', 'after']) {
      prototype = await openCase(caseName, view)
      await page.evaluate(() => { document.documentElement.style.fontSize = '200%' })
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, caseName + ' must reflow at 200% text')
      await page.evaluate(() => { document.documentElement.style.fontSize = '' })
      await page.emulateMedia({ forcedColors: 'active' })
      if (caseName === 'charts') assert.match(await prototype.locator('table').innerText(), /48,000/)
      await page.emulateMedia({ forcedColors: 'none', reducedMotion: 'reduce' })
      assert.equal(await prototype.evaluate(el => el.getAnimations({ subtree: true }).length), 0, 'reduced motion must suppress component animations')
    }
  }
  await openCase('editor')
  await page.evaluate(() => { document.documentElement.style.fontSize = '200%' })
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, 'editor must not overflow at 200% text')
  assert.deepEqual(errors, [])
  if (process.env.RECORD_DEMO === '1') {
    const demoContext = await browser.newContext({
      viewport: { width: 1440, height: 1200 },
      reducedMotion: 'no-preference',
      recordVideo: { dir: resolve(root, 'artifacts/gallery-video'), size: { width: 1440, height: 1200 } },
    })
    const demo = await demoContext.newPage()
    const demoErrors = []
    demo.on('pageerror', error => demoErrors.push(error.message))
    for (const caseName of caseNames) {
      await demo.goto(origin + '/?case=' + caseName + '&view=before')
      await demo.evaluate(() => { const stage = document.querySelector('.gallery-stage'); scrollTo(0, stage.offsetTop - 100) })
      await demo.waitForTimeout(1100)
      await demo.locator('[data-view-button="after"]').click()
      await demo.waitForTimeout(1100)
      const panel = demo.locator('.prototype:not([hidden])')
      if (caseName === 'cards') await panel.locator('summary').first().click()
      if (caseName === 'charts') await panel.locator('[data-chart-channel="1"]').click()
      if (caseName === 'commerce') await panel.getByLabel('Midnight').check()
      if (caseName === 'dashboard') await panel.locator('[data-action="inspect-issue"]').first().click()
      if (caseName === 'editor') await panel.locator('[data-action="focus-writing"]').click()
      if (caseName === 'mobile') {
        await panel.locator('[data-action="open-mobile-task"]').click()
        await demo.waitForTimeout(650)
        await panel.locator('[data-action="start-mobile-focus"]').click()
      }
      await demo.waitForTimeout(1100)
    }
    await demoContext.close()
    await demo.video().saveAs(resolve(root, 'artifacts/redesign-motion.webm'))
    assert.deepEqual(demoErrors, [])
  }
  console.log(JSON.stringify({ browser: executablePath, cases: caseNames.length, screenshots: caseNames.length * 2, errors }))
} finally {
  if (browser) await browser.close()
  await new Promise(done => server.close(done))
}
