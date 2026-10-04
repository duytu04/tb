import { chromium } from '@playwright/test';
import { access, readdir } from 'node:fs/promises';
import { join } from 'node:path';

let executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE;
try { await access(chromium.executablePath()); } catch {
  const cache = join(process.env.LOCALAPPDATA, 'ms-playwright');
  const installed = (await readdir(cache)).filter(name => /^chromium-\d+$/.test(name)).sort().at(-1);
  executablePath ||= join(cache, installed, 'chrome-win64', 'chrome.exe');
}

const browser = await chromium.launch({ executablePath, headless: true });
const context = await browser.newContext({ viewport: { width: 1200, height: 900 } });
const page = await context.newPage();

await page.goto('http://180.93.54.36:8080/admin.html');
await page.fill('#pin-input', '2010');
await page.click('.btn-login');
await page.waitForTimeout(500);

await page.click('[data-tab="tab-gallery"]');
await page.waitForTimeout(400);

console.log('Uploading test image to #input-gallery-batch...');
// Set file to #input-gallery-batch
await page.setInputFiles('#input-gallery-batch', 'test-results/current-mobile-gallery.png');
await page.waitForTimeout(1500);

// Check if gallery cards increased
const countAfter = await page.locator('.gallery-admin-card').count();
console.log('Gallery cards count after batch upload:', countAfter);

// Click Save
console.log('Clicking Save...');
await page.click('#btn-save-all');
await page.waitForTimeout(1000);

// Check localStorage
const localData = await page.evaluate(() => localStorage.getItem('wedding_custom_config'));
console.log('localStorage length:', localData?.length);

// Now open invitation in same browser
const invite = await context.newPage();
await invite.goto('http://180.93.54.36:8080/');
await invite.waitForSelector('html[data-silk-ready="true"]');

const imgs = await invite.locator('.gallery-slide-card img').evaluateAll(els => els.map(el => ({ srcLength: el.src.length, isDataUrl: el.src.startsWith('data:') })));
console.log('Invitation rendered slides count:', imgs.length);
console.log('Slides details:', imgs);

await page.screenshot({ path: 'test-results/test-upload-admin.png' });
await invite.screenshot({ path: 'test-results/test-upload-invite.png' });
await browser.close();
