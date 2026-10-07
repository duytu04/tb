import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { readdir, mkdir } from 'node:fs/promises';
import { chromium } from '@playwright/test';
import { PNG } from 'pngjs';

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

const PORT = 5196;
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

    page.on('console', msg => console.log('BROWSER LOG:', msg.text()));

    await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('html[data-silk-ready="true"]');

    // Instrument console.log on video play / class changes
    await page.evaluate(() => {
      const observer = new MutationObserver(mutations => {
        for (const m of mutations) {
          if (m.type === 'attributes' && m.attributeName === 'class') {
            console.log(`[DOM MUTATION] ${m.target.id || m.target.className} class changed to: ${m.target.className}`);
          }
        }
      });
      const overlay = document.getElementById('envelope-overlay');
      const video = document.querySelector('.album-invitation-video');
      if (overlay) observer.observe(overlay, { attributes: true });
      if (video) observer.observe(video, { attributes: true });
      if (video) {
        video.addEventListener('play', () => console.log('[VIDEO EVENT] play'));
        video.addEventListener('playing', () => console.log('[VIDEO EVENT] playing'));
        video.addEventListener('timeupdate', () => {
          if (video.currentTime > 0 && !video._loggedFirst) {
            video._loggedFirst = true;
            console.log(`[VIDEO EVENT] first frame rendered, currentTime: ${video.currentTime}`);
          }
        });
      }
    });

    await mkdir('test-results/flow-analysis', { recursive: true });

    const seal = page.getByRole('button', { name: /Mở thiệp bằng con dấu sáp/ });
    await seal.focus();
    const startTime = Date.now();
    await page.keyboard.press('Enter');
    console.log('Pressed enter at t=0');

    // Sample from 14.0s to 18.0s every 200ms
    await page.waitForTimeout(14000);

    const stats = [];
    for (let t = 14000; t <= 18000; t += 200) {
      const filename = `test-results/flow-analysis/t-${t}ms.png`;
      await page.screenshot({ path: filename });
      const data = fs.readFileSync(filename);
      const png = PNG.sync.read(data);
      let totalLum = 0, bgLum = 0, bgCount = 0, cardLum = 0, cardCount = 0;
      for (let y = 0; y < png.height; y++) {
        for (let x = 0; x < png.width; x++) {
          const idx = (png.width * y + x) << 2;
          const lum = 0.299 * png.data[idx] + 0.587 * png.data[idx + 1] + 0.114 * png.data[idx + 2];
          totalLum += lum;
          if (x < 60 && y < 200) { bgLum += lum; bgCount++; }
          if (x > 140 && x < 250 && y > 350 && y < 490) { cardLum += lum; cardCount++; }
        }
      }
      const item = {
        t,
        avg: (totalLum / (png.width * png.height)).toFixed(2),
        bg: (bgLum / bgCount).toFixed(2),
        card: (cardLum / cardCount).toFixed(2)
      };
      stats.push(item);
      console.log(`t=${t}ms: avg=${item.avg}, bg=${item.bg}, card=${item.card}`);
      await page.waitForTimeout(200);
    }

    await browser.close();
  } catch (err) {
    console.error(err);
  } finally {
    server.close();
  }
});
