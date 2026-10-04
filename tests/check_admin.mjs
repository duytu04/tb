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
const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
await page.goto('http://127.0.0.1:5173/admin.html');

// Enter PIN 2010
await page.fill('#pin-input', '2010');
await page.click('.btn-login');
await page.waitForTimeout(500);

// Switch to Tab 7
await page.click('[data-tab="tab-gallery"]');
await page.waitForTimeout(500);

// Verify elements
const dropzone = await page.locator('#gallery-dropzone').isVisible();
const batchInput = await page.locator('#input-gallery-batch').count();
const videoPicker = await page.locator('#input-video-file').count();
const posterPicker = await page.locator('#input-poster-file').count();
const galleryCards = await page.locator('.gallery-admin-card').count();
const thumbs = await page.locator('.gallery-thumb-preview').count();

console.log('Admin Tab 7 Test Results:');
console.log('Dropzone visible:', dropzone);
console.log('Batch input count:', batchInput);
console.log('Video picker count:', videoPicker);
console.log('Poster picker count:', posterPicker);
console.log('Gallery cards count:', galleryCards);
console.log('Thumbnails count:', thumbs);

await page.screenshot({ path: 'test-results/admin-tab-gallery.png', fullPage: true });

// Also test mobile viewport for admin
await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(300);
await page.screenshot({ path: 'test-results/admin-tab-gallery-mobile.png', fullPage: true });

await browser.close();
console.log('Admin test completed!');
