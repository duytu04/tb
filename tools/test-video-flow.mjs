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

const server = http.createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const filename = path.resolve(root, `.${pathname.endsWith('/') ? `${pathname}index.html` : pathname}`);
    const relative = path.relative(root, filename);
    if (relative.startsWith('..') || path.isAbsolute(relative) || !types[path.extname(filename)]) {
      res.writeHead(403).end(); return;
    }
    if (!fs.existsSync(filename)) {
      res.writeHead(404, { 'Content-Type': 'text/plain' }).end('Not found');
      return;
    }
    const stat = fs.statSync(filename);
    const range = req.headers.range;
    const contentType = types[path.extname(filename)];

    if (range && (contentType.startsWith('video/') || contentType.startsWith('audio/'))) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;
      const chunksize = (end - start) + 1;
      const file = fs.createReadStream(filename, { start, end });
      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${stat.size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': contentType,
      });
      file.pipe(res);
    } else {
      res.writeHead(200, {
        'Content-Length': stat.size,
        'Content-Type': contentType,
        'Accept-Ranges': 'bytes',
      });
      fs.createReadStream(filename).pipe(res);
    }
  } catch (e) {
    res.writeHead(500).end();
  }
});

const PORT = 5179;
server.listen(PORT, async () => {
  try {
    const cache = path.join(process.env.LOCALAPPDATA, 'ms-playwright');
    const installed = (await readdir(cache)).filter(name => /^chromium-\d+$/.test(name)).sort().at(-1);
    const executablePath = path.join(cache, installed, 'chrome-win64', 'chrome.exe');
    const browser = await chromium.launch({ executablePath, headless: true });

    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.route(/https:\/\/maps\.google\./, route => route.fulfill({ contentType: 'text/html', body: '<p>Map</p>' }));

    await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('html[data-silk-ready="true"]');

    await mkdir('test-results/video-flow', { recursive: true });

    // Click seal to open
    const seal = page.getByRole('button', { name: /Mở thiệp bằng con dấu sáp/ });
    await seal.focus();
    await page.keyboard.press('Enter');
    console.log('Opened envelope via wax seal...');

    // 14.8s is when flight completes and video starts
    await page.waitForTimeout(14700);
    await page.screenshot({ path: 'test-results/video-flow/flow-14.7s-before.png' });
    await page.waitForTimeout(400);
    await page.screenshot({ path: 'test-results/video-flow/flow-15.1s-after.png' });
    console.log('Saved handover screenshots (14.7s & 15.1s)');

    // +3s into video (17.8s)
    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'test-results/video-flow/flow-17.8s-untying.png' });
    console.log('Saved flow-17.8s-untying.png');

    // +3s into video (20.8s) - doors opening
    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'test-results/video-flow/flow-20.8s-doors.png' });
    console.log('Saved flow-20.8s-doors.png');

    // +3s into video (23.8s) - card revealed
    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'test-results/video-flow/flow-23.8s-revealed.png' });
    console.log('Saved flow-23.8s-revealed.png');

    // +2.5s - video ends, transition to hero
    await page.waitForTimeout(2500);
    await page.screenshot({ path: 'test-results/video-flow/flow-26.3s-hero.png' });
    console.log('Saved flow-26.3s-hero.png');

    await browser.close();
    console.log('Video flow test completed successfully!');
  } catch (err) {
    console.error('Error in test:', err);
  } finally {
    server.close();
  }
});
