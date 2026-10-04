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

await page.goto('http://180.93.54.36:8080/admin.html');
await page.fill('#pin-input', '2010');
await page.click('.btn-login');
await page.waitForTimeout(500);

await page.click('[data-tab="tab-gallery"]');
await page.waitForTimeout(400);

// Click bottom save button inside Tab 7
const saveBtns = await page.locator('.btn-save');
console.log('Save buttons count:', await saveBtns.count());

await page.locator('#btn-save-all').click();
await page.waitForTimeout(300);

const toast = page.locator('#admin-toast');
const toastClass = await toast.getAttribute('class');
const toastOpacity = await toast.evaluate(el => window.getComputedStyle(el).opacity);
console.log('Live server toast class:', toastClass);
console.log('Live server toast opacity:', toastOpacity);

await page.screenshot({ path: 'test-results/live-admin-toast-verified.png' });
await browser.close();
console.log('Live server verification complete!');
