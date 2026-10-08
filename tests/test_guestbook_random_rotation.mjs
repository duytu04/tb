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
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost:6001').pathname);
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

await new Promise(resolve => server.listen(6001, '127.0.0.1', resolve));
console.log('Test server listening on http://127.0.0.1:6001');

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
  // Test scenario with 6 wishes
  console.log('\n--- 1. Testing Guestbook with 6 wishes: verify 3-item limit & 5s cycle ---');
  await page.goto('http://127.0.0.1:6001/index.html');
  await page.evaluate(() => {
    localStorage.clear();
    const mockWishes = [
      { name: 'Khách 1', side: 'Nhà Trai', text: 'Chúc mừng trăm năm hạnh phúc #1' },
      { name: 'Khách 2', side: 'Nhà Gái', text: 'Chúc mừng trăm năm hạnh phúc #2' },
      { name: 'Khách 3', side: 'Bạn Bè', text: 'Chúc mừng trăm năm hạnh phúc #3' },
      { name: 'Khách 4', side: 'Đồng Nghiệp', text: 'Chúc mừng trăm năm hạnh phúc #4' },
      { name: 'Khách 5', side: 'Họ Hàng', text: 'Chúc mừng trăm năm hạnh phúc #5' },
      { name: 'Khách 6', side: 'Bạn Cấp 3', text: 'Chúc mừng trăm năm hạnh phúc #6' }
    ];
    localStorage.setItem('wedding_wishes', JSON.stringify(mockWishes));
  });

  await page.reload();
  await page.waitForTimeout(600);

  // Check that exactly 3 wish items are rendered!
  const initialCount = await page.locator('#wishes-container .wish-item').count();
  console.log('Initial rendered wish count (out of 6 wishes in pool):', initialCount);
  if (initialCount !== 3) {
    throw new Error(`Expected exactly 3 wish items rendered, got ${initialCount}`);
  }

  const initialAuthors = await page.locator('#wishes-container .wish-author').allTextContents();
  console.log('Batch 1 authors:', initialAuthors);

  // Wait 5.5 seconds for random rotation to trigger
  console.log('Waiting 5.5s for 5-second random cycle to trigger...');
  await page.waitForTimeout(5600);

  const batch2Count = await page.locator('#wishes-container .wish-item').count();
  console.log('Rendered wish count after 5.5s cycle:', batch2Count);
  if (batch2Count !== 3) {
    throw new Error(`Expected exactly 3 wish items after cycle, got ${batch2Count}`);
  }

  const batch2Authors = await page.locator('#wishes-container .wish-author').allTextContents();
  console.log('Batch 2 authors:', batch2Authors);

  // Verify that the batch changed (not identical set of authors in identical order)
  const isIdentical = initialAuthors.join('::') === batch2Authors.join('::');
  console.log('Are Batch 1 and Batch 2 identical?', isIdentical);
  if (isIdentical) {
    // If by extreme random chance it rolled the same, wait another 5.5s
    console.log('Identical rolled by chance, waiting another 5.5s to re-verify rotation...');
    await page.waitForTimeout(5500);
    const batch3Authors = await page.locator('#wishes-container .wish-author').allTextContents();
    console.log('Batch 3 authors:', batch3Authors);
    if (initialAuthors.join('::') === batch3Authors.join('::')) {
      throw new Error('Guestbook wishes did not rotate after 11 seconds!');
    }
  }

  // Test submitting a brand new wish
  console.log('\n--- 2. Testing submitting a new wish: verify immediate slot #1 presentation ---');
  await page.evaluate(() => {
    addWishToGuestbook('Khách VIP Vừa Gửi', 'Khách Đặc Biệt', 'Lời chúc siêu nóng hổi vừa mới gửi!');
  });
  await page.waitForTimeout(300);

  const afterNewCount = await page.locator('#wishes-container .wish-item').count();
  console.log('Wish count after adding new wish:', afterNewCount);
  if (afterNewCount !== 3) {
    throw new Error(`Expected exactly 3 wish items after new submission, got ${afterNewCount}`);
  }

  const firstAuthor = await page.locator('#wishes-container .wish-author').first().textContent();
  console.log('First wish author after new submission:', firstAuthor);
  if (firstAuthor !== 'Khách VIP Vừa Gửi') {
    throw new Error(`Expected 'Khách VIP Vừa Gửi' at position 1, got '${firstAuthor}'`);
  }

  console.log('\n======================================================');
  console.log('🎉 ALL GUESTBOOK 3-WISH LIMIT & 5S ROTATION TESTS PASSED! 🎉');
  console.log('======================================================');
} finally {
  await browser.close();
  server.close();
}
