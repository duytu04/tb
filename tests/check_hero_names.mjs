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

// Test mobile viewport 390x844
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto('http://180.93.54.36:8080/');
await page.waitForSelector('html[data-silk-ready="true"]');

// Click seal to open envelope
await page.getByRole('button', { name: /Mở thiệp bằng con dấu sáp/ }).click();
await page.waitForFunction(() => window.SilkOpening.state === 'opened');
await page.waitForTimeout(500);

const nameSpans = await page.locator('.hero-names-display > *').all();
console.log('Total children in .hero-names-display:', nameSpans.length);

const childBoxes = [];
for (const span of nameSpans) {
  const box = await span.boundingBox();
  const text = await span.textContent();
  childBoxes.push({ text: text.trim(), x: box.x, y: box.y, width: box.width, height: box.height });
}

console.log('Mobile 390px children boxes:', childBoxes);
// Verify they are on the same horizontal line: y values should be within 10px
const yDiff = Math.abs(childBoxes[0].y - childBoxes[childBoxes.length - 1].y);
console.log('Y difference between first and last name:', yDiff);

await page.locator('.hero-copy').screenshot({ path: 'test-results/hero-names-mobile.png' });

await browser.close();
console.log('Hero names test completed!');
