import assert from 'node:assert/strict'
import { createServer } from 'node:http'
import { access, readFile, mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright-core'

const root = fileURLToPath(new URL('..', import.meta.url))
const example = resolve(root, 'skills/apple-design/examples/interaction-lab')
const artifacts = resolve(root, 'artifacts')
const routes = new Map([['/', ['index.html', 'text/html']], ['/app.mjs', ['app.mjs', 'text/javascript']], ['/model.mjs', ['model.mjs', 'text/javascript']], ['/style.css', ['style.css', 'text/css']]])
const server = createServer(async (request, response) => {
  const resource = routes.get(new URL(request.url, 'http://localhost').pathname)
  if (!resource) { response.writeHead(404); response.end(); return }
  try {
    const data = await readFile(resolve(example, resource[0]))
    response.writeHead(200, { 'Content-Type': resource[1] + '; charset=utf-8' }); response.end(data)
  } catch { response.writeHead(500); response.end('Example unavailable') }
})
const candidates = process.env.BROWSER_EXECUTABLE ? [process.env.BROWSER_EXECUTABLE] : [
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/chromium', '/usr/bin/google-chrome',
]
let executablePath
for (const path of candidates) { try { await access(path); executablePath = path; break } catch {} }
assert.ok(executablePath, 'Set BROWSER_EXECUTABLE to an installed Chrome/Edge/Chromium executable')
await mkdir(artifacts, { recursive: true })
await new Promise((done, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', done) })
let browser
try {
  browser = await chromium.launch({ executablePath, headless: true })
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })
  const page = await context.newPage()
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
  await page.goto('http://127.0.0.1:' + server.address().port + '/')
  await page.getByRole('button', { name: '编辑标题', exact: true }).click()
  const dialog = page.getByRole('dialog', { name: '编辑任务标题', exact: true })
  const title = page.getByRole('textbox', { name: '任务标题', exact: true })
  assert.equal(await title.evaluate(input => input === document.activeElement && input.required), true)
  for (let index = 0; index < 8; index++) {
    await page.keyboard.press('Tab')
    assert.equal(await page.evaluate(() => Boolean(document.activeElement.closest('dialog')) || !document.hasFocus()), true, 'Tab may enter browser chrome, but must not focus background controls')
  }
  await title.fill('  ')
  await page.getByRole('button', { name: '保存更改', exact: true }).click()
  assert.equal(await title.getAttribute('aria-invalid'), 'true')
  assert.equal(await title.inputValue(), '  ')
  await title.fill('失败后仍然保留的草稿')
  await page.getByRole('checkbox', { name: '模拟本次保存失败' }).check()
  await page.getByRole('button', { name: '保存更改', exact: true }).click()
  await page.getByRole('alert').filter({ hasText: '模拟保存失败' }).waitFor()
  assert.equal(await title.inputValue(), '失败后仍然保留的草稿')
  assert.equal(await dialog.isVisible(), true)
  await page.screenshot({ path: resolve(artifacts, 'failure-preserves-draft.png') })
  await page.getByRole('button', { name: '保存更改', exact: true }).click()
  await dialog.waitFor({ state: 'hidden' })
  assert.equal(await page.locator('#detail-title').textContent(), '失败后仍然保留的草稿')
  assert.equal(await page.locator('#edit').evaluate(button => button === document.activeElement), true)
  await page.locator('#edit').click()
  await title.fill('取消前应保护的输入')
  await page.keyboard.press('Escape')
  await page.getByRole('button', { name: '继续编辑', exact: true }).click()
  assert.equal(await title.inputValue(), '取消前应保护的输入')
  await page.keyboard.press('Escape')
  await page.getByRole('button', { name: '放弃修改', exact: true }).click()
  assert.equal(await page.locator('#detail-title').textContent(), '失败后仍然保留的草稿')
  await page.locator('#edit').click()
  await title.fill('LongTaskTitleWithoutSpaces'.repeat(4))
  await page.getByRole('button', { name: '保存更改', exact: true }).click()
  await dialog.waitFor({ state: 'hidden' })
  for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }, { width: 320, height: 700 }]) {
    await page.setViewportSize(viewport)
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true)
    await page.screenshot({ path: resolve(artifacts, 'layout-' + viewport.width + '.png'), fullPage: true })
  }
  await page.evaluate(() => { document.documentElement.style.fontSize = '200%' })
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true)
  await page.locator('#edit').click()
  await page.getByRole('button', { name: '保存更改', exact: true }).scrollIntoViewIfNeeded()
  assert.equal(await page.locator('#save').evaluate(button => button.getBoundingClientRect().right <= innerWidth), true)
  await page.screenshot({ path: resolve(artifacts, 'text-scale-200.png'), fullPage: true })
  await page.keyboard.press('Escape')
  await page.evaluate(() => { document.documentElement.style.fontSize = '' })
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.locator('#theme').click()
  await page.locator('#glass').click()
  assert.equal(await page.locator('.chrome').evaluate(element => getComputedStyle(element).backdropFilter), 'none')
  await page.screenshot({ path: resolve(artifacts, 'dark-opaque.png'), fullPage: true })
  await page.emulateMedia({ forcedColors: 'active' })
  await page.locator('#edit').click()
  assert.equal(await title.evaluate(input => getComputedStyle(input).outlineStyle), 'solid')
  await page.screenshot({ path: resolve(artifacts, 'forced-colors.png') })
  assert.deepEqual(errors, [])
  console.log(JSON.stringify({ status: 'passed', browser: await browser.version(), environment: 'Web Chromium only', checks: ['keyboard background isolation', 'validation', 'failed save and retry', 'dirty close protection', 'focus restoration', 'long text', 'responsive layouts', 'CSS text scale 200%', 'dark opaque', 'forced colors'], pageErrors: 0, consoleErrors: 0 }, null, 2))
  await context.close()
} finally {
  if (browser) await browser.close()
  await new Promise(done => server.close(done))
}
