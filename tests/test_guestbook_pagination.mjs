import http from 'http';
import { readFile } from 'fs/promises';
import { extname, join } from 'path';
import { chromium } from 'playwright';

// Simple static server
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg'
};

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://127.0.0.1:5997');
    let filePath = join('d:/thuybeo', url.pathname === '/' ? 'index.html' : url.pathname);
    const content = await readFile(filePath);
    const ext = extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'text/plain' });
    res.end(content);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

await new Promise(resolve => server.listen(5997, '127.0.0.1', resolve));
console.log('Server running at http://127.0.0.1:5997');

const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE || 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const browser = await chromium.launch({ executablePath, headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

try {
  console.log('\n--- 1. Login to Admin and Open Tab Wishes ---');
  await page.goto('http://127.0.0.1:5997/admin.html');
  await page.fill('#pin-input', '2010');
  await page.click('.btn-login');
  await page.waitForTimeout(300);

  await page.click('[data-tab="tab-wishes"]');
  await page.waitForTimeout(300);

  console.log('\n--- 2. Inject 25 sample wishes to test pagination ---');
  await page.evaluate(() => {
    window.config.wishes = [];
    for (let i = 1; i <= 25; i++) {
      window.config.wishes.push({
        name: `Khách Mời #${i}`,
        side: i % 2 === 0 ? 'Khách Nhà Trai' : 'Khách Nhà Gái',
        text: `Lời chúc hạnh phúc trăm năm số ${i}!`
      });
    }
    window.renderWishesTable();
  });
  await page.waitForTimeout(300);

  // Check Page 1 (default 10 items)
  const rowsPage1 = await page.locator('#wishes-table-body tr').count();
  const infoText1 = await page.locator('#wishes-pagination-info').textContent();
  const firstStt = await page.locator('#wishes-table-body tr td').first().textContent();
  console.log(`Page 1 count: ${rowsPage1}, Info: "${infoText1}", First STT: ${firstStt}`);

  if (rowsPage1 !== 10) throw new Error(`Expected 10 rows on page 1, got ${rowsPage1}`);
  if (firstStt !== '1') throw new Error(`Expected first STT to be 1, got ${firstStt}`);

  // Check Page 2 by clicking page button 2
  console.log('\n--- 3. Navigating to Page 2 ---');
  await page.click('#btn-wish-next-page');
  await page.waitForTimeout(200);

  const rowsPage2 = await page.locator('#wishes-table-body tr').count();
  const infoText2 = await page.locator('#wishes-pagination-info').textContent();
  const page2FirstStt = await page.locator('#wishes-table-body tr td').first().textContent();
  const page2FirstAuthor = await page.locator('#wishes-table-body tr').first().textContent();
  console.log(`Page 2 count: ${rowsPage2}, Info: "${infoText2}", First STT: ${page2FirstStt}`);

  if (rowsPage2 !== 10) throw new Error(`Expected 10 rows on page 2, got ${rowsPage2}`);
  if (page2FirstStt !== '11') throw new Error(`Expected first STT on page 2 to be 11, got ${page2FirstStt}`);
  if (!page2FirstAuthor.includes('Khách Mời #11')) throw new Error('Expected Khách Mời #11 on page 2');

  // Check Page 3 by clicking page button 3
  console.log('\n--- 4. Navigating to Page 3 ---');
  await page.click('#btn-wish-last-page');
  await page.waitForTimeout(200);

  const rowsPage3 = await page.locator('#wishes-table-body tr').count();
  const infoText3 = await page.locator('#wishes-pagination-info').textContent();
  const page3FirstStt = await page.locator('#wishes-table-body tr td').first().textContent();
  console.log(`Page 3 count: ${rowsPage3}, Info: "${infoText3}", First STT: ${page3FirstStt}`);

  if (rowsPage3 !== 5) throw new Error(`Expected 5 rows on page 3, got ${rowsPage3}`);
  if (page3FirstStt !== '21') throw new Error(`Expected first STT on page 3 to be 21, got ${page3FirstStt}`);

  // Test Search Filter
  console.log('\n--- 5. Testing Search Keyword ---');
  await page.fill('#search-wish-input', 'số 15');
  await page.waitForTimeout(200);

  const searchRows = await page.locator('#wishes-table-body tr').count();
  const searchRowText = await page.locator('#wishes-table-body').textContent();
  console.log(`Search result rows: ${searchRows}`);

  if (searchRows !== 1) throw new Error(`Expected 1 row for search, got ${searchRows}`);
  if (!searchRowText.includes('Khách Mời #15')) throw new Error('Search result does not contain Khách Mời #15');

  // Clear search
  await page.fill('#search-wish-input', '');
  await page.waitForTimeout(200);

  // Test Page Size change to 25
  console.log('\n--- 6. Testing Page Size change to 25 ---');
  await page.selectOption('#wishes-per-page', '25');
  await page.waitForTimeout(200);

  const rowsPageSize25 = await page.locator('#wishes-table-body tr').count();
  console.log(`Rows with page size 25: ${rowsPageSize25}`);
  if (rowsPageSize25 !== 25) throw new Error(`Expected 25 rows, got ${rowsPageSize25}`);

  console.log('\n=============================================');
  console.log('>>> GUESTBOOK PAGINATION TEST PASSED 100%! <<<');
  console.log('=============================================');
} finally {
  await browser.close();
  server.close();
}
