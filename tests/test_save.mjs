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

page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));

await page.goto('http://127.0.0.1:5173/admin.html');
await page.fill('#pin-input', '2010');
await page.click('.btn-login');
await page.waitForTimeout(500);

// Check current couple names
const coupleName = await page.inputValue('#cfg-groom-name');
console.log('Groom name before:', coupleName);

// Click Save
console.log('Clicking btn-save-all...');
await page.click('#btn-save-all');
await page.waitForTimeout(300);
await page.screenshot({ path: 'test-results/admin-toast-success.png' });

// Check toast
const toast = await page.locator('#admin-toast');
const toastClass = await toast.getAttribute('class');
const toastVisible = await toast.isVisible();
const toastOpacity = await toast.evaluate(el => window.getComputedStyle(el).opacity);
const toastTransform = await toast.evaluate(el => window.getComputedStyle(el).transform);
console.log('Toast class:', toastClass);
console.log('Toast isVisible:', toastVisible);
console.log('Toast computed opacity:', toastOpacity);
console.log('Toast computed transform:', toastTransform);

// Check localStorage
const savedData = await page.evaluate(() => localStorage.getItem('wedding_custom_config'));
console.log('Saved data in localStorage:', savedData ? 'EXISTS (length: ' + savedData.length + ')' : 'NULL');

await browser.close();
