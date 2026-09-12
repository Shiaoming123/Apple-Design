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
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce', locale: 'zh-CN' })
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

  for (const caseName of ['commerce', 'dashboard', 'editor']) {
    await mkdir(resolve(screenshots, caseName), { recursive: true })
    for (const view of ['before', 'after']) {
      const prototype = await openCase(caseName, view)
      await prototype.screenshot({ path: resolve(screenshots, caseName, `${view}.png`) })
    }
  }

  let prototype = await openCase('commerce')
  await prototype.getByLabel('午夜黑').check()
  await prototype.getByRole('button', { name: '加入购物袋' }).click()
  assert.match(await page.locator('#prototype-status').textContent(), /1 件商品/)

  prototype = await openCase('dashboard')
  await prototype.getByLabel('时间范围').selectOption('7')
  await prototype.locator('[data-action="inspect-issue"]').first().click()
  assert.match(await page.locator('#prototype-status').textContent(), /支付失败率升高/)

  prototype = await openCase('editor')
  await prototype.getByLabel('文章标题').fill('自动保存仍保留当前输入')
  await page.waitForTimeout(700)
  assert.match(await page.locator('[data-save-status]').textContent(), /所有更改已保存/)
  const publish = page.getByRole('button', { name: '发布…' })
  await publish.click()
  const dialog = page.getByRole('dialog', { name: /发布《春季产品更新》/ })
  await dialog.waitFor()
  await page.getByRole('button', { name: '继续编辑' }).click()
  assert.equal(await publish.evaluate(button => button === document.activeElement), true)

  for (const caseName of ['commerce', 'dashboard', 'editor']) {
    await page.setViewportSize({ width: 390, height: 844 })
    await openCase(caseName)
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `${caseName} must not overflow at 390px`)
  }
  await page.setViewportSize({ width: 1440, height: 1000 })
  await openCase('editor')
  await page.evaluate(() => { document.documentElement.style.fontSize = '200%' })
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, 'editor must not overflow at 200% text')
  assert.deepEqual(errors, [])
  console.log(JSON.stringify({ browser: executablePath, cases: 3, screenshots: 6, errors }))
} finally {
  if (browser) await browser.close()
  await new Promise(done => server.close(done))
}
