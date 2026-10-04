import { chromium } from '@playwright/test';
import { access, readdir } from 'node:fs/promises';
import { join } from 'node:path';

let executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE;
try { await access(chromium.executablePath()); } catch {
  const cache = join(process.env.LOCALAPPDATA, 'ms-playwright');
  const installed = (await readdir(cache)).filter(name => /^chromium-\d+$/.test(name)).sort().at(-1);
  executablePath ||= join(cache, installed, 'chrome-win64', 'chrome.exe');
}

console.log('=== TEST SERVER PERSISTENCE & MULTI-DEVICE SYNC ===');
const browser = await chromium.launch({ executablePath, headless: true });

// CONTEXT A: Admin device
const adminContext = await browser.newContext({ viewport: { width: 1200, height: 900 } });
const adminPage = await adminContext.newPage();

adminPage.on('console', msg => console.log('[ADMIN LOG]:', msg.text()));
adminPage.on('pageerror', err => console.log('[ADMIN ERROR]:', err.message));

console.log('1. Loading Admin page on live server...');
await adminPage.goto('http://180.93.54.36:8080/admin.html');
await adminPage.fill('#pin-input', '2010');
await adminPage.click('.btn-login');
await adminPage.waitForTimeout(600);

console.log('2. Navigating to Tab Gallery...');
await adminPage.click('[data-tab="tab-gallery"]');
await adminPage.waitForTimeout(400);

console.log('3. Uploading test image to #input-gallery-batch...');
await adminPage.setInputFiles('#input-gallery-batch', 'test-results/current-mobile-gallery.png');
await adminPage.waitForTimeout(1000);

// Set caption on the last uploaded item
const lastCard = adminPage.locator('.gallery-admin-card').last();
const uniqueCaption = `SYNC SUCCESS AT ${Date.now()}`;
await lastCard.locator('.gallery-caption').fill(uniqueCaption);
console.log('Set caption:', uniqueCaption);

console.log('4. Clicking Save Changes...');
await adminPage.click('#btn-save-all');

// Wait for save animation and toast
await adminPage.waitForTimeout(2000);
await adminPage.screenshot({ path: 'test-results/sync-admin-saved.png' });

const toast = await adminPage.locator('#admin-toast');
const toastText = await toast.textContent();
console.log('Admin Toast Text:', toastText);

// Close admin context
await adminContext.close();
console.log('Admin context closed.');

// CONTEXT B: Guest on another device / clean phone (ZERO localStorage, ZERO cookies)
console.log('\n5. Opening Invitation in a brand new, clean Guest context (mobile phone)...');
const guestContext = await browser.newContext({
  viewport: { width: 390, height: 844 },
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148'
});
const guestPage = await guestContext.newPage();
guestPage.on('console', msg => console.log('[GUEST LOG]:', msg.text()));

await guestPage.goto('http://180.93.54.36:8080/');
await guestPage.waitForSelector('html[data-silk-ready="true"]');
await guestPage.waitForTimeout(1000);

// Check if the unique caption exists on the invitation!
const captions = await guestPage.locator('.gallery-slide-card .gallery-caption').allTextContents();
console.log('Guest Invitation Captions on phone:', captions);

const imageSources = await guestPage.locator('.gallery-slide-card img').evaluateAll(els => els.map(img => img.src));
console.log('Guest Invitation Image Sources:', imageSources);

const hasSyncCaption = captions.some(c => c.includes(uniqueCaption));
console.log('\n=============================================');
console.log('VERIFICATION RESULT:');
console.log('Did guest phone receive the new caption?', hasSyncCaption ? 'YES! SUCCESS!' : 'FAILED');
console.log('=============================================');

await guestPage.screenshot({ path: 'test-results/sync-guest-phone-verified.png', fullPage: false });

await browser.close();

if (!hasSyncCaption) {
  process.exit(1);
}
