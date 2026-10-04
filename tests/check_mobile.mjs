import { access, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { chromium } from '@playwright/test';

let executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE;
try { await access(chromium.executablePath()); } catch {
  const cache = join(process.env.LOCALAPPDATA, 'ms-playwright');
  const installed = (await readdir(cache)).filter(name => /^chromium-\d+$/.test(name)).sort().at(-1);
  executablePath ||= join(cache, installed, 'chrome-win64', 'chrome.exe');
}

const browser = await chromium.launch({ executablePath, headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.route(/https:\/\/maps\.google\./, route => route.fulfill({ contentType: 'text/html', body: '<p>Map fixture</p>' }));

await page.goto('http://127.0.0.1:5173/');
await page.waitForSelector('html[data-silk-ready="true"]');
await page.getByRole('button', { name: /Mở thiệp bằng con dấu sáp/ }).click();
await page.waitForTimeout(3200);
await page.locator('#gallery').scrollIntoViewIfNeeded();
await page.waitForTimeout(1000);
await page.screenshot({ path: 'test-results/current-mobile-gallery.png' });
await page.locator('#family').scrollIntoViewIfNeeded();
await page.waitForTimeout(500);
await page.screenshot({ path: 'test-results/current-mobile-family.png' });
await page.locator('#story').scrollIntoViewIfNeeded();
await page.waitForTimeout(500);
await page.screenshot({ path: 'test-results/current-mobile-story.png' });
await browser.close();
console.log('Screenshots completed!');
