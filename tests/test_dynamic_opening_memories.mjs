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
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost:5998').pathname);
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

await new Promise(resolve => server.listen(5998, '127.0.0.1', resolve));
console.log('Test server listening on http://127.0.0.1:5998');

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
  // Clear any existing localStorage first
  await page.goto('http://127.0.0.1:5998/admin.html');
  await page.evaluate(() => localStorage.clear());
  await page.reload();

  console.log('\n--- 1. Testing Admin Page: Login & Opening Memories Tab ---');
  await page.fill('#pin-input', '2010');
  await page.click('.btn-login');
  await page.waitForTimeout(400);

  // Navigate to Tab Gallery
  await page.click('[data-tab="tab-gallery"]');
  await page.waitForTimeout(300);

  // Check initial count badge and cards (clean state, no mock data)
  const badgeText = await page.locator('#opening-memories-count-badge').textContent();
  console.log('Initial Opening Memories Badge:', badgeText);
  if (!badgeText.includes('0 Trang')) {
    throw new Error(`Expected '0 Trang', got '${badgeText}'`);
  }

  const initialCardsCount = await page.locator('#opening-memories-container .opening-memory-card').count();
  console.log('Initial Opening Memories Cards:', initialCardsCount);
  if (initialCardsCount !== 0) {
    throw new Error(`Expected 0 cards, got ${initialCardsCount}`);
  }

  // Click "+ Thêm Trang Mới Vào Album Mini" 4 times
  console.log('\n--- 2. Testing Adding 4 Pages from clean state ---');
  await page.click('#btn-add-opening-memory');
  await page.waitForTimeout(200);
  await page.click('#btn-add-opening-memory');
  await page.waitForTimeout(200);
  await page.click('#btn-add-opening-memory');
  await page.waitForTimeout(200);
  await page.click('#btn-add-opening-memory');
  await page.waitForTimeout(300);

  const updatedBadge = await page.locator('#opening-memories-count-badge').textContent();
  console.log('Updated Badge after adding 4 pages:', updatedBadge);
  if (!updatedBadge.includes('4 Trang')) {
    throw new Error(`Expected '4 Trang', got '${updatedBadge}'`);
  }

  const cardsCountAfterAdd = await page.locator('#opening-memories-container .opening-memory-card').count();
  console.log('Cards count after add:', cardsCountAfterAdd);
  if (cardsCountAfterAdd !== 4) {
    throw new Error(`Expected 4 cards, got ${cardsCountAfterAdd}`);
  }

  // Set image and captions for all 4 pages
  console.log('Setting photos & captions for 4 pages...');
  await page.evaluate(() => {
    window.config.openingMemories[0].src = 'assets/images/gallery_1791131928_0.webp';
    window.config.openingMemories[0].caption = 'Ngày mình có nhau';
    window.config.openingMemories[1].src = 'assets/images/gallery_1791131928_1.webp';
    window.config.openingMemories[1].caption = 'Thương nhau một đời';
    window.config.openingMemories[2].src = 'assets/images/gallery_1791131928_2.webp';
    window.config.openingMemories[2].caption = 'Và hôm nay, chung đôi';
    window.config.openingMemories[3].src = 'assets/images/gallery_1791131928_4.webp';
  });
  await page.fill('#cfg-opening-mem-3-caption', 'Kỷ niệm trang thứ tư');
  await page.fill('#cfg-opening-mem-3-date', 'Năm 2026 · Hạnh phúc sum vầy');

  // Save All
  console.log('Clicking Save All...');
  await page.click('#btn-save-all');
  await page.waitForTimeout(500);

  // Check saved localStorage
  const savedCfg = await page.evaluate(() => JSON.parse(localStorage.getItem('wedding_custom_config')));
  console.log('Saved openingMemories length:', savedCfg.openingMemories.length);
  console.log('Saved Page 4 item:', savedCfg.openingMemories[3]);

  if (savedCfg.openingMemories.length !== 4) {
    throw new Error(`Expected 4 openingMemories in saved config, got ${savedCfg.openingMemories.length}`);
  }
  if (savedCfg.openingMemories[3].caption !== 'Kỷ niệm trang thứ tư') {
    throw new Error(`Expected caption 'Kỷ niệm trang thứ tư' in saved config!`);
  }
  if (savedCfg.openingMemories[3].src !== 'assets/images/gallery_1791131928_4.webp') {
    throw new Error(`Expected custom src for page 4!`);
  }

  // --- 3. Test Index Page with 4 Dynamic Pages ---
  console.log('\n--- 3. Testing Index Page Dynamic Leaves & Timing ---');
  await page.goto('http://127.0.0.1:5998/index.html');
  await page.waitForTimeout(800);

  // Count leaves in album-opening
  const leavesCount = await page.locator('.album-opening .album-leaf:not(.album-cover)').count();
  console.log('Rendered Album Leaf Count:', leavesCount);
  if (leavesCount !== 4) {
    throw new Error(`Expected 4 leaves in album, got ${leavesCount}`);
  }

  // Check page number formatting: Page 1 should be "01 / 04", Page 4 should be "04 / 04"
  const page1Num = await page.locator('.album-leaf-1 .album-page-number').first().textContent();
  const page4Num = await page.locator('.album-leaf-4 .album-page-number').first().textContent();
  console.log('Page 1 number indicator:', page1Num.trim());
  console.log('Page 4 number indicator:', page4Num.trim());

  if (page1Num.trim() !== '01 / 04') {
    throw new Error(`Expected '01 / 04', got '${page1Num.trim()}'`);
  }
  if (page4Num.trim() !== '04 / 04') {
    throw new Error(`Expected '04 / 04', got '${page4Num.trim()}'`);
  }

  // Check captions
  const page4Caption = await page.locator('.album-leaf-4 .album-caption-title').first().textContent();
  const page4Meta = await page.locator('.album-leaf-4 .album-caption-meta').first().textContent();
  console.log('Page 4 Caption in DOM:', page4Caption.trim());
  console.log('Page 4 Meta in DOM:', page4Meta.trim());

  if (page4Caption.trim() !== 'Kỷ niệm trang thứ tư') {
    throw new Error(`Expected 'Kỷ niệm trang thứ tư', got '${page4Caption.trim()}'`);
  }

  // Check CSS timing variables
  const albumElem = page.locator('.album-opening');
  const cardRevealDelay = await albumElem.evaluate(el => el.style.getPropertyValue('--card-reveal-delay'));
  console.log('--card-reveal-delay on album:', cardRevealDelay);
  // For 4 pages: 2 + 4 * 3 + 1.8 = 15.8s
  if (cardRevealDelay !== '15.8s') {
    throw new Error(`Expected '--card-reveal-delay' to be '15.8s', got '${cardRevealDelay}'`);
  }

  const leaf4Elem = page.locator('.album-leaf-4');
  const leaf4TurnDelay = await leaf4Elem.evaluate(el => el.style.getPropertyValue('--turn-delay'));
  console.log('--turn-delay on leaf 4:', leaf4TurnDelay);
  // For leaf 4 (index 3): 2 + (3 + 1) * 3 = 14s
  if (leaf4TurnDelay !== '14s') {
    throw new Error(`Expected '--turn-delay' on leaf 4 to be '14s', got '${leaf4TurnDelay}'`);
  }

  // --- 4. Test Deleting a Page ---
  console.log('\n--- 4. Testing Deleting Page in Admin ---');
  await page.goto('http://127.0.0.1:5998/admin.html');
  await page.waitForTimeout(400);

  // Tab Gallery
  await page.click('[data-tab="tab-gallery"]');
  await page.waitForTimeout(300);

  // Delete page 2
  await page.locator('#opening-memories-container .opening-memory-card').nth(1).locator('button[title="Xóa trang này"]').click();
  await page.waitForTimeout(300);

  const badgeAfterDelete = await page.locator('#opening-memories-count-badge').textContent();
  console.log('Badge after deleting 1 page:', badgeAfterDelete);
  if (!badgeAfterDelete.includes('3 Trang')) {
    throw new Error(`Expected '3 Trang' after delete, got '${badgeAfterDelete}'`);
  }

  // Save All
  await page.click('#btn-save-all');
  await page.waitForTimeout(500);

  // Check Index again
  await page.goto('http://127.0.0.1:5998/index.html');
  await page.waitForTimeout(800);

  const leavesAfterDelete = await page.locator('.album-opening .album-leaf:not(.album-cover)').count();
  console.log('Leaves count on index after deletion:', leavesAfterDelete);
  if (leavesAfterDelete !== 3) {
    throw new Error(`Expected 3 leaves after delete, got ${leavesAfterDelete}`);
  }

  const page1NumAfterDelete = await page.locator('.album-leaf-1 .album-page-number').first().textContent();
  console.log('Page 1 number indicator after delete:', page1NumAfterDelete.trim());
  if (page1NumAfterDelete.trim() !== '01 / 03') {
    throw new Error(`Expected '01 / 03', got '${page1NumAfterDelete.trim()}'`);
  }

  console.log('\n=============================================');
  console.log('🎉 ALL DYNAMIC OPENING MEMORIES TESTS PASSED! 🎉');
  console.log('=============================================');

} finally {
  await browser.close();
  server.close();
}
