import { chromium } from '@playwright/test';
import { access, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

// 1. Launch local test server
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
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost:5999').pathname);
    const filename = path.resolve(root, `.${pathname.endsWith('/') ? `${pathname}index.html` : pathname}`);
    if (!fs.existsSync(filename) || fs.statSync(filename).isDirectory()) {
      res.writeHead(404).end('Not found');
      return;
    }
    const contentType = types[path.extname(filename)] || 'text/plain';
    res.writeHead(200, { 'Content-Type': contentType, 'Cache-Control': 'no-store' });
    fs.createReadStream(filename).pipe(res);
  } catch (e) {
    res.writeHead(500).end(String(e));
  }
});

await new Promise(resolve => server.listen(5999, '127.0.0.1', resolve));
console.log('Test server listening on http://127.0.0.1:5999');

// 2. Launch browser
let executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE;
try { await access(chromium.executablePath()); } catch {
  const cache = join(process.env.LOCALAPPDATA, 'ms-playwright');
  const installed = (await readdir(cache)).filter(name => /^chromium-\d+$/.test(name)).sort().at(-1);
  executablePath ||= join(cache, installed, 'chrome-win64', 'chrome.exe');
}

const browser = await chromium.launch({ executablePath, headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

page.on('console', msg => console.log('[BROWSER LOG]:', msg.text()));
page.on('pageerror', err => console.log('[BROWSER ERR]:', err.message));

try {
  // Test 1: Admin page
  console.log('\n--- 1. Testing Admin Page ---');
  await page.goto('http://127.0.0.1:5999/admin.html');
  await page.fill('#pin-input', '2010');
  await page.click('.btn-login');
  await page.waitForTimeout(400);

  // Tab Gallery: check opening album starts clean
  console.log('Navigating to Tab Gallery...');
  await page.click('[data-tab="tab-gallery"]');
  await page.waitForTimeout(300);

  const initBadge = await page.locator('#opening-memories-count-badge').textContent();
  console.log('Initial Opening Memories Badge:', initBadge);
  if (!initBadge.includes('0 Trang')) {
    throw new Error(`Expected '0 Trang' initially but got '${initBadge}'`);
  }

  // Add Page 1
  console.log('Adding Page 1...');
  await page.click('#btn-add-opening-memory');
  await page.waitForTimeout(300);

  // Edit Opening Memory 0
  await page.fill('#cfg-opening-mem-0-caption', 'Khoảnh khắc định mệnh');
  await page.fill('#cfg-opening-mem-0-date', 'Tháng 10 · Khởi đầu duyên phận');
  await page.evaluate(() => {
    window.config.openingMemories[0].src = 'assets/images/gallery_1791131928_0.webp';
  });

  // Tab Wishes: check wishes table starts clean
  console.log('\nNavigating to Tab Wishes...');
  await page.click('[data-tab="tab-wishes"]');
  await page.waitForTimeout(300);

  // Add wish via Admin
  console.log('Adding wish via Admin...');
  await page.evaluate(() => {
    window.config.wishes = [{
      name: 'Gia đình Bạn Thân',
      side: 'Bạn Cả Hai',
      text: 'Chúc hai bạn trăm năm viên mãn!'
    }];
    renderWishesTable();
  });
  await page.waitForTimeout(300);

  const wishRows = await page.locator('#wishes-table-body tr').count();
  console.log('Wishes row count after adding:', wishRows);
  if (wishRows !== 1) {
    throw new Error(`Expected 1 wish row but got ${wishRows}`);
  }

  // Click Save All
  console.log('Saving all configuration...');
  await page.click('#btn-save-all');
  await page.waitForTimeout(500);

  // Check localStorage in Admin
  const savedCfg = await page.evaluate(() => JSON.parse(localStorage.getItem('wedding_custom_config')));
  console.log('Saved opening memories 0:', savedCfg.openingMemories[0]);
  console.log('Saved wishes count:', savedCfg.wishes.length);

  if (savedCfg.openingMemories[0].caption !== 'Khoảnh khắc định mệnh') {
    throw new Error(`Expected caption 'Khoảnh khắc định mệnh' in saved config!`);
  }
  if (savedCfg.wishes.length !== 1) {
    throw new Error(`Expected 1 wish in saved config, got ${savedCfg.wishes.length}!`);
  }

  // Test 2: Index page with updated configuration
  console.log('\n--- 2. Testing Index Page with Saved Config ---');
  await page.goto('http://127.0.0.1:5999/index.html');
  await page.waitForTimeout(800);

  // Check opening album mini caption in DOM
  const albumCaption0 = await page.locator('.album-leaf-front .album-caption-title').first().textContent();
  const albumMeta0 = await page.locator('.album-leaf-front .album-caption-meta').first().textContent();
  console.log('Rendered Album Page 1 Caption:', albumCaption0);
  console.log('Rendered Album Page 1 Meta:', albumMeta0);

  if (albumCaption0 !== 'Khoảnh khắc định mệnh') {
    throw new Error(`Expected album caption 'Khoảnh khắc định mệnh', got '${albumCaption0}'`);
  }

  // Check wishes in guestbook
  const guestbookWishes = await page.locator('#wishes-container .wish-item').count();
  console.log('Rendered Guestbook wishes count:', guestbookWishes);
  const firstWishAuthor = await page.locator('#wishes-container .wish-author').first().textContent();
  console.log('First Wish Author in Guestbook:', firstWishAuthor);

  if (guestbookWishes !== 1) {
    throw new Error(`Expected 1 wish in guestbook, got ${guestbookWishes}`);
  }

  console.log('\n>>> ALL AUTOMATED CHECKS PASSED PERFECTLY! <<<');
} finally {
  await browser.close();
  server.close();
}
