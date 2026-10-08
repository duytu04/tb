import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { readdir, mkdir } from 'node:fs/promises';
import { chromium } from '@playwright/test';

const root = process.cwd();
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4',
  '.json': 'application/json'
};

const server = http.createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  const filename = path.resolve(root, `.${pathname.endsWith('/') ? `${pathname}index.html` : pathname}`);
  if (!fs.existsSync(filename)) { res.writeHead(404).end(); return; }
  const stat = fs.statSync(filename);
  if (stat.isDirectory()) { res.writeHead(404).end(); return; }
  res.writeHead(200, { 'Content-Length': stat.size, 'Content-Type': types[path.extname(filename)] || 'text/plain' });
  const stream = fs.createReadStream(filename);
  stream.on('error', () => { res.end(); });
  stream.pipe(res);
});

const PORT = 5201;
server.listen(PORT, async () => {
  try {
    const cache = path.join(process.env.LOCALAPPDATA, 'ms-playwright');
    const installed = (await readdir(cache)).filter(name => /^chromium-\d+$/.test(name)).sort().at(-1);
    const executablePath = path.join(cache, installed, 'chrome-win64', 'chrome.exe');
    const browser = await chromium.launch({
      executablePath,
      headless: true,
      args: ['--autoplay-policy=no-user-gesture-required']
    });

    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.route(/https:\/\/maps\.google\./, route => route.fulfill({ contentType: 'text/html', body: '<p>Map</p>' }));

    await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('html[data-silk-ready="true"]');

    await mkdir('test-results/envelope-transition', { recursive: true });

    const seal = page.getByRole('button', { name: /Mở thiệp bằng con dấu sáp/ });
    await seal.focus();
    await page.keyboard.press('Enter');

    // Sample from 800ms to 3200ms every 150ms
    const times = [];
    for (let t = 800; t <= 3200; t += 150) {
      times.push(t);
    }

    let prev = 0;
    for (const t of times) {
      await page.waitForTimeout(t - prev);
      prev = t;

      const state = await page.evaluate(() => {
        const letter = document.getElementById('envelope-letter');
        const proxy = document.querySelector('.letter-album-proxy');
        const album = document.querySelector('.album-opening');
        const book = document.querySelector('.opening-album-book');
        const box = document.getElementById('envelope-3d-box');

        const letterRect = letter?.getBoundingClientRect();
        const proxyRect = proxy?.getBoundingClientRect();
        const bookRect = book?.getBoundingClientRect();
        const boxRect = box?.getBoundingClientRect();

        return {
          letterVisible: letter ? window.getComputedStyle(letter).visibility : null,
          letterOpacity: letter ? window.getComputedStyle(letter).opacity : null,
          letterRect: letterRect ? { y: Math.round(letterRect.y), h: Math.round(letterRect.height), w: Math.round(letterRect.width) } : null,
          proxyRect: proxyRect ? { y: Math.round(proxyRect.y), h: Math.round(proxyRect.height), w: Math.round(proxyRect.width) } : null,
          albumDisplay: album ? window.getComputedStyle(album).display : null,
          albumOpacity: album ? window.getComputedStyle(album).opacity : null,
          bookRect: bookRect ? { y: Math.round(bookRect.y), h: Math.round(bookRect.height), w: Math.round(bookRect.width) } : null,
          boxOpacity: box ? window.getComputedStyle(box).opacity : null,
          boxTransform: box ? window.getComputedStyle(box).transform : null,
        };
      });

      console.log(`t=${t}ms:`, JSON.stringify(state));
      await page.screenshot({ path: `test-results/envelope-transition/t-${t}ms.png` });
    }

    await browser.close();
  } catch (err) {
    console.error(err);
  } finally {
    server.close();
  }
});
