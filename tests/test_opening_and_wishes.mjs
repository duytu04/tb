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

  // Tab Gallery: check opening album inputs
  console.log('Navigating to Tab Gallery...');
  await page.click('[data-tab="tab-gallery"]');
  await page.waitForTimeout(300);

  const mem0Cap = await page.inputValue('#cfg-opening-mem-0-caption');
  const mem0Date = await page.inputValue('#cfg-opening-mem-0-date');
  console.log('Initial Opening Memory 0 Caption:', mem0Cap);
  console.log('Initial Opening Memory 0 Date:', mem0Date);
  if (mem0Cap !== 'Ngày mình có nhau') {
    throw new Error(`Expected 'Ngày mình có nhau' but got '${mem0Cap}'`);
  }

  // Edit Opening Memory 0
  await page.fill('#cfg-opening-mem-0-caption', 'Khoảnh khắc định mệnh');
  await page.fill('#cfg-opening-mem-0-date', 'Tháng 10 · Khởi đầu duyên phận');

  // Tab Wishes: check wishes table
  console.log('\nNavigating to Tab Wishes...');
  await page.click('[data-tab="tab-wishes"]');
  await page.waitForTimeout(300);

  const wishRows = await page.locator('#wishes-table-body tr').count();
  console.log('Initial wishes row count:', wishRows);
  if (wishRows !== 3) {
    throw new Error(`Expected 3 wish rows but got ${wishRows}`);
  }

  // Delete wish #1 (Bác Hùng)
  console.log('Deleting first wish...');
  page.once('dialog', async dialog => {
    console.log('Confirm dialog text:', dialog.message());
    await dialog.accept();
  });
  await page.locator('#wishes-table-body tr').first().locator('.btn-tbl-delete').click();
  await page.waitForTimeout(300);

  const remainingWishes = await page.locator('#wishes-table-body tr').count();
  console.log('Remaining wishes count after delete:', remainingWishes);
  if (remainingWishes !== 2) {
    throw new Error(`Expected 2 wishes but got ${remainingWishes}`);
  }

  // Edit first remaining wish
  console.log('Editing first remaining wish...');
  await page.locator('#wishes-table-body tr').first().locator('.btn-tbl-action').first().click();
  await page.fill('#input-wish-name', 'Gia đình Bạn Thân');
  await page.selectOption('#input-wish-side', 'Bạn Cả Hai');
  await page.fill('#input-wish-text', 'Chúc hai bạn trăm năm viên mãn!');
  await page.click('#btn-save-wish');
  await page.waitForTimeout(300);

  const updatedWishesCount = await page.locator('#wishes-table-body tr').count();
  console.log('Updated wishes count after edit:', updatedWishesCount);
  if (updatedWishesCount !== 2) {
    throw new Error(`Expected 2 wishes but got ${updatedWishesCount}`);
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
  if (savedCfg.wishes.length !== 2) {
    throw new Error(`Expected 2 wishes in saved config!`);
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

  if (guestbookWishes !== 2) {
    throw new Error(`Expected 2 wishes in guestbook, got ${guestbookWishes}`);
  }

  console.log('\n>>> ALL AUTOMATED CHECKS PASSED PERFECTLY! <<<');
} finally {
  await browser.close();
  server.close();
}
