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

page.on('console', msg => console.log('PAGE LOG:', msg.text()));

console.log('--- Step 1: Open admin and change gallery caption & photo ---');
await page.goto('http://180.93.54.36:8080/admin.html');
await page.fill('#pin-input', '2010');
await page.click('.btn-login');
await page.waitForTimeout(500);

await page.click('[data-tab="tab-gallery"]');
await page.waitForTimeout(400);

// Change caption of first photo
const firstCaption = page.locator('.gallery-caption').first();
await firstCaption.fill('CAPTION TEST 9999');

// Also toggle first src
const firstSrc = page.locator('.gallery-src').first();
console.log('First photo src before:', await firstSrc.inputValue());

// Click Save
console.log('--- Step 2: Clicking btn-save-all ---');
await page.click('#btn-save-all');
await page.waitForTimeout(1000);

// Check localStorage in this context
const localData = await page.evaluate(() => localStorage.getItem('wedding_custom_config'));
console.log('localStorage wedding_custom_config exists:', !!localData);
if (localData) {
  const parsed = JSON.parse(localData);
  console.log('Saved gallery in localStorage count:', parsed.gallery?.length);
  console.log('Saved first caption:', parsed.gallery?.[0]?.caption);
}

console.log('--- Step 3: Open invitation page (index.html) in SAME browser context ---');
const invitePage = await context.newPage();
invitePage.on('console', msg => console.log('INVITE LOG:', msg.text()));
await invitePage.goto('http://180.93.54.36:8080/');
await invitePage.waitForSelector('html[data-silk-ready="true"]');

// Check what gallery cards are rendered
const renderedCaptions = await invitePage.locator('.gallery-slide-card .gallery-caption').allInnerTexts();
console.log('Rendered captions on index.html in same browser:', renderedCaptions);

const renderedImgs = await invitePage.locator('.gallery-slide-card img').evaluateAll(imgs => imgs.map(img => img.src));
console.log('Rendered img src count:', renderedImgs.length);
console.log('First img src:', renderedImgs[0]?.slice(0, 50));

console.log('--- Step 4: Open invitation page in a NEW CLEAN browser context (representing another device or guest) ---');
const cleanContext = await browser.newContext();
const cleanPage = await cleanContext.newPage();
await cleanPage.goto('http://180.93.54.36:8080/');
await cleanPage.waitForSelector('html[data-silk-ready="true"]');
const cleanCaptions = await cleanPage.locator('.gallery-slide-card .gallery-caption').allInnerTexts();
console.log('Rendered captions on clean context (other device):', cleanCaptions);

await browser.close();
console.log('Diagnosis completed!');
