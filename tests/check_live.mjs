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
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto('http://180.93.54.36:8080/');
await page.waitForSelector('html[data-silk-ready="true"]');
await page.getByRole('button', { name: /Mở thiệp bằng con dấu sáp/ }).click();
await page.waitForTimeout(3200);
await page.locator('#gallery').scrollIntoViewIfNeeded();
await page.waitForTimeout(1000);
await page.screenshot({ path: 'test-results/live-server-mobile-gallery.png' });
await browser.close();
console.log('Live server screenshot captured successfully!');
