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
const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await context.newPage();

page.on('console', msg => console.log('[BROWSER LOG]:', msg.text()));
page.on('pageerror', err => console.log('[BROWSER ERR]:', err.message));

try {
  console.log('\n--- 1. Testing Admin Page: Verify NO "Duyệt Lên Thiệp" button ---');
  await page.goto('http://127.0.0.1:5998/admin.html');
  await page.fill('#pin-input', '2010');
  await page.click('.btn-login');
  await page.waitForTimeout(400);

  // Navigate to tab wishes
  await page.click('[data-tab="tab-wishes"]');
  await page.waitForTimeout(300);

  // Check if any "Duyệt Lên Thiệp" exists in the page
  const pageContent = await page.content();
  const hasApproveButton = pageContent.includes('Duyệt Lên Thiệp');
  console.log('Does "Duyệt Lên Thiệp" exist in Admin page?', hasApproveButton);
  if (hasApproveButton) {
    throw new Error('FAILED: "Duyệt Lên Thiệp" still exists in Admin page!');
  }

  // Count existing wishes
  const initialWishCount = await page.locator('#wishes-table-body tr').count();
  console.log('Initial wishes count in Admin:', initialWishCount);

  console.log('\n--- 2. Testing Index Page: Guest submits RSVP with a wish ---');
  await page.goto('http://127.0.0.1:5998/index.html');
  await page.waitForTimeout(500);
  await page.evaluate(() => {
    document.documentElement.classList.remove('invitation-locked');
    document.body.classList.remove('invitation-locked');
    const overlay = document.getElementById('envelope-overlay');
    if (overlay) overlay.remove();

    document.getElementById('rsvp-name').value = 'Anh Nam & Chị Mai';
    document.getElementById('rsvp-wish').value = 'Chúc hai em trăm năm hạnh phúc, sớm có quý tử đầu lòng!';
    const form = document.getElementById('rsvp-form');
    if (form) {
      if (form.elements['guest-side']) form.elements['guest-side'].value = 'Khách Nhà Trai';
      if (form.elements['guest-attending']) form.elements['guest-attending'].value = 'Chắc chắn tham dự';
    }
  });

  const formData = await page.evaluate(() => {
    const f = document.getElementById('rsvp-form');
    return {
      hasForm: !!f,
      name: document.getElementById('rsvp-name')?.value,
      wish: document.getElementById('rsvp-wish')?.value,
      side: f?.elements['guest-side']?.value,
      attending: f?.elements['guest-attending']?.value
    };
  });
  console.log('Form data before submit:', formData);

  // Submit RSVP
  await page.evaluate(() => {
    const form = document.getElementById('rsvp-form');
    console.log('Triggering submit event on rsvp-form...');
    form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
  });
  await page.waitForTimeout(1000);

  // Check guestbook in index.html immediately
  const guestbookWishes = await page.locator('#wishes-container .wish-item');
  const countInGuestbook = await guestbookWishes.count();
  console.log('Wishes in Guestbook after submission:', countInGuestbook);

  const firstAuthor = await page.locator('#wishes-container .wish-author').first().textContent();
  const firstText = await page.locator('#wishes-container .wish-text').first().textContent();
  console.log('First Wish in Guestbook:', firstAuthor, '|', firstText);

  if (!firstAuthor.includes('Anh Nam & Chị Mai')) {
    throw new Error(`Expected 'Anh Nam & Chị Mai' in guestbook, but got '${firstAuthor}'`);
  }
  if (!firstText.includes('Chúc hai em trăm năm hạnh phúc')) {
    throw new Error(`Expected wish text in guestbook, but got '${firstText}'`);
  }
  console.log('✔ Wish immediately appears on Invitation Site without any approval!');

  console.log('\n--- 3. Testing Admin Page: Verify new wish appears directly in Admin list ---');
  await page.goto('http://127.0.0.1:5998/admin.html');
  await page.waitForTimeout(400);
  if (await page.locator('#pin-input').isVisible()) {
    await page.fill('#pin-input', '2010');
    await page.click('.btn-login');
    await page.waitForTimeout(400);
  }

  await page.click('[data-tab="tab-wishes"]');
  await page.waitForTimeout(300);

  const updatedAdminCount = await page.locator('#wishes-table-body tr').count();
  console.log('Updated wishes count in Admin:', updatedAdminCount);

  const adminRowTexts = await page.locator('#wishes-table-body').textContent();
  console.log('Admin table includes guest wish?', adminRowTexts.includes('Anh Nam & Chị Mai'));

  if (!adminRowTexts.includes('Anh Nam & Chị Mai')) {
    throw new Error('FAILED: Guest wish was not automatically visible in Admin wishes table!');
  }
  console.log('✔ Guest wish is directly listed in Admin table!');

  console.log('\n--- 4. Testing Admin Delete: Remove unwanted wish ---');
  // Find row containing 'Anh Nam & Chị Mai'
  const rowLocator = page.locator('#wishes-table-body tr', { hasText: 'Anh Nam & Chị Mai' });
  page.once('dialog', async dialog => {
    console.log('Delete confirm dialog:', dialog.message());
    await dialog.accept();
  });
  await rowLocator.locator('.btn-tbl-delete').click();
  await page.waitForTimeout(300);

  const afterDeleteCount = await page.locator('#wishes-table-body tr').count();
  console.log('Wishes count in Admin after delete:', afterDeleteCount);

  // Click Save All
  await page.click('#btn-save-all');
  await page.waitForTimeout(400);

  // Return to index and verify wish was removed
  await page.goto('http://127.0.0.1:5998/index.html');
  await page.waitForTimeout(500);

  const finalGuestbookTexts = await page.locator('#wishes-container').textContent();
  const stillHasDeletedWish = finalGuestbookTexts.includes('Anh Nam & Chị Mai');
  console.log('Does guestbook still have deleted wish?', stillHasDeletedWish);

  if (stillHasDeletedWish) {
    throw new Error('FAILED: Deleted wish is still present in guestbook!');
  }
  console.log('✔ Deleted wish is successfully removed from invitation!');

  console.log('\n=========================================');
  console.log('>>> ALL VERIFICATION TESTS PASSED 100%! <<<');
  console.log('=========================================');

} finally {
  await browser.close();
  server.close();
}
