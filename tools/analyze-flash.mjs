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
  const range = req.headers.range;
  const contentType = types[path.extname(filename)];
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (range && contentType?.startsWith('video/')) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;
    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${stat.size}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': (end - start) + 1,
      'Content-Type': contentType,
    });
    fs.createReadStream(filename, { start, end }).pipe(res);
  } else {
    res.writeHead(200, {
      'Content-Length': stat.size,
      'Content-Type': contentType,
    });
    fs.createReadStream(filename).pipe(res);
  }
});

const PORT = 5192;
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

    await mkdir('test-results/flash-analysis', { recursive: true });

    const seal = page.getByRole('button', { name: /Mở thiệp bằng con dấu sáp/ });
    await seal.focus();
    await page.keyboard.press('Enter');

    // Wait until 14.4s
    await page.waitForTimeout(14400);

    for (let t = 14500; t <= 15500; t += 100) {
      await page.waitForTimeout(100);
      await page.screenshot({ path: `test-results/flash-analysis/frame-${t}ms.png` });
    }

    console.log('Saved 11 frames from 14500ms to 15500ms!');
    await browser.close();
  } catch (err) {
    console.error(err);
  } finally {
    server.close();
  }
});
