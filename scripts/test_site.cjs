// Local browser checks. Requires Playwright; BROWSER_CHANNEL=msedge uses installed Edge.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const os = require('node:os');

async function main() {
  const docs = path.resolve(__dirname, '../docs');
  const server = http.createServer(async (request, response) => {
    try {
      const url = new URL(request.url, 'http://localhost');
      assert(url.pathname.startsWith('/tripeiro/'));
      const file = path.resolve(docs, decodeURIComponent(url.pathname.slice('/tripeiro/'.length)) || '.');
      assert(file === docs || file.startsWith(docs + path.sep));
      const target = (await fs.stat(file)).isDirectory() ? path.join(file, 'index.html') : file;
      const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
        '.svg': 'image/svg+xml', '.json': 'application/json', '.zip': 'application/zip' };
      response.setHeader('Content-Type', (mime[path.extname(target)] || 'text/plain') + '; charset=utf-8');
      response.end(await fs.readFile(target));
    } catch {
      response.writeHead(404).end('Not found');
    }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  const base = origin + '/tripeiro/';
  let browser;
  try {
    browser = await chromium.launch({ headless: true,
      ...(process.env.BROWSER_CHANNEL ? { channel: process.env.BROWSER_CHANNEL } : {}) });
    let routes = 0;
    for (const locale of ['pt-BR', 'pt-PT', 'en-US', 'es-ES']) {
      const context = await browser.newContext({ locale });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', e => errors.push(e.message));
      for (const entry of ['', 'en/', 'index.html']) {
        for (const query of ['', '?lang=pt', '?lang=en', '?lang=invalid']) {
          const expected = query === '?lang=pt' ? 'pt-BR' : query === '?lang=en' ? 'en'
            : locale.startsWith('pt') ? 'pt-BR' : 'en';
          await page.goto(base + entry + query + '#ajuda');
          await page.waitForFunction(lang => document.documentElement.lang === lang &&
            document.querySelector('[data-language][aria-current]')?.lang === lang, expected);
          assert.equal(new URL(page.url()).hash, '#ajuda');
          assert.equal(await page.locator('#ajuda').count(), 1);
          assert.equal(await page.title(), expected === 'en'
            ? 'Tripeiro · Plan with your AI and find help'
            : 'Tripeiro · Planeje com sua IA e encontre ajuda');
          await page.waitForFunction(() => Math.abs(document.getElementById('ajuda').getBoundingClientRect().top) < 5);
          routes++;
        }
      }
      assert.deepEqual(errors, []);
      await context.close();
    }

    const context = await browser.newContext({ locale: 'en-US', permissions: ['clipboard-read', 'clipboard-write'] });
    const page = await context.newPage();
    await page.goto(base + '?lang=en&source=app#ajuda');
    await page.getByRole('link', { name: 'Português', exact: true }).click();
    await page.waitForURL(url => url.searchParams.get('lang') === 'pt');
    assert.equal(new URL(page.url()).hash, '#ajuda');
    assert.equal(new URL(page.url()).searchParams.get('source'), 'app');
    await page.reload();
    assert.equal(await page.locator('html').getAttribute('lang'), 'pt-BR');
    await page.locator('a[href="#perguntas"]').click();
    await page.getByRole('link', { name: 'English', exact: true }).click();
    await page.waitForURL(url => url.searchParams.get('lang') === 'en');
    assert.equal(new URL(page.url()).hash, '#perguntas');

    const ids = [];
    for (const lang of ['pt', 'en']) {
      await page.goto(base + '?lang=' + lang);
      ids.push(await page.locator('[id]').evaluateAll(elements => elements.map(el => el.id).sort()));
      const expected = await (await context.request.get(base + (lang === 'en' ? 'en/' : '') + 'instrucoes.txt')).text();
      await page.locator('#copy').click();
      await page.getByRole('status').filter({ hasText: lang === 'en' ? 'Instructions copied.' : 'Instruções copiadas.' }).waitFor();
      const copied = await page.evaluate(() => navigator.clipboard.readText());
      assert.equal(copied.replace(/\r\n/g, '\n'), expected.replace(/\r\n/g, '\n'));
      const links = await page.locator('a[href], img[src], script[src], link[href]').evaluateAll(elements =>
        elements.map(el => el.href || el.src));
      for (const link of links.filter(link => link.startsWith(origin))) {
        const url = new URL(link);
        assert.equal((await context.request.get(link)).status(), 200, link);
        if (url.hash && url.pathname.endsWith('/')) {
          assert.equal(await page.locator(`[id="${url.hash.slice(1)}"]`).count(), 1, url.hash);
        }
      }
      await page.route('**/instrucoes.txt', route => route.fulfill({ status: 404, body: 'Not found' }));
      await page.locator('#copy').click();
      await page.getByRole('status').filter({ hasText: lang === 'en' ? 'Could not copy.' : 'Não foi possível copiar.' }).waitFor();
      await page.unroute('**/instrucoes.txt');
      await page.evaluate(() => Object.defineProperty(navigator.clipboard, 'writeText', {
        configurable: true, value: () => Promise.reject(new Error('Permission denied')) }));
      await page.locator('#copy').click();
      await page.getByRole('status').filter({ hasText: lang === 'en' ? 'Could not copy.' : 'Não foi possível copiar.' }).waitFor();
      assert.equal(await page.locator('#copy').isEnabled(), true);
    }
    assert.deepEqual(ids[0], ids[1]);
    assert.equal(new Set(ids[0]).size, ids[0].length);

    const screenshots = process.env.SCREENSHOT_DIR || path.join(os.tmpdir(), 'tripeiro-site-182');
    await fs.mkdir(screenshots, { recursive: true });
    let layouts = 0;
    for (const lang of ['pt', 'en']) {
      for (const width of [375, 1280]) {
        for (const colorScheme of ['light', 'dark']) {
          await page.setViewportSize({ width, height: 900 });
          await page.emulateMedia({ colorScheme, reducedMotion: 'reduce' });
          await page.goto(base + '?lang=' + lang);
          assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${lang} ${width} ${colorScheme}`);
          await page.screenshot({ path: path.join(screenshots, `${lang}-${width}-${colorScheme}.png`), fullPage: true });
          await page.addStyleTag({ content: 'html {font-size:200%} body {font-size:32px}' });
          assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `200% ${lang} ${width}`);
          layouts++;
        }
      }
    }
    await page.goto(base + '?lang=en');
    await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(() => document.activeElement.textContent.trim()), 'Português');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(() => document.activeElement.textContent.trim()), 'Install');
    await page.locator('summary').first().focus();
    await page.keyboard.press('Enter');
    assert.equal(await page.locator('details').first().getAttribute('open'), '');
    await context.close();
    console.log(`${routes} language routes; manual switch, reload, anchors, copy success/HTTP/clipboard failures, local links, keyboard and ${layouts} layouts (also 200% text) passed.`);
    console.log(`Screenshots: ${screenshots}`);
  } finally {
    if (browser) await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
