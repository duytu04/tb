import { chromium } from '@playwright/test';
import { access, readdir } from 'node:fs/promises';
import { join } from 'node:path';

let executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE;
try { await access(chromium.executablePath()); } catch {
  const cache = join(process.env.LOCALAPPDATA, 'ms-playwright');
  const installed = (await readdir(cache)).filter(name => /^chromium-\d+$/.test(name)).sort().at(-1);
  executablePath ||= join(cache, installed, 'chrome-win64', 'chrome.exe');
}

console.log('=== VERIFYING LIVE IMAGES ON INVITATION ===');

const browser = await chromium.launch({ executablePath, headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto('http://180.93.54.36:8080/');
await page.waitForSelector('html[data-silk-ready="true"]');

const heroImgSrc = await page.locator('.hero-photo-inner img').getAttribute('src');
const ogImg = await page.locator('meta[property="og:image"]').getAttribute('content');
const videoPoster = await page.locator('#memory-film-video').getAttribute('poster');
const placeholderImg = await page.locator('#memory-film-placeholder img').getAttribute('src');
const memoryBgStyle = await page.locator('.memory-film-background').getAttribute('style');

console.log('1. Hero Photo Inner IMG src:', heroImgSrc);
console.log('2. Meta og:image:', ogImg);
console.log('3. Memory Film video.poster:', videoPoster);
console.log('4. Memory Film placeholder img:', placeholderImg);
console.log('5. Memory Film dynamic background style:', memoryBgStyle);

await browser.close();
