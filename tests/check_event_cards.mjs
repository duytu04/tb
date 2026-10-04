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

for (const width of [390, 1200]) {
  const page = await browser.newPage({ viewport: { width, height: 844 } });
  await page.goto('http://180.93.54.36:8080/');
  await page.waitForSelector('html[data-silk-ready="true"]');

  // Open envelope
  await page.getByRole('button', { name: /Mở thiệp bằng con dấu sáp/ }).click();
  await page.waitForFunction(() => window.SilkOpening.state === 'opened');
  await page.waitForTimeout(500);

  // Scroll to events
  await page.evaluate(() => document.querySelector('#events').scrollIntoView());
  await page.waitForTimeout(400);

  const cards = await page.locator('.event-card').all();
  console.log(`Checking ${cards.length} event cards on viewport ${width}px:`);

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    const tag = await card.locator('.event-highlight-tag').boundingBox();
    const icon = await card.locator('.event-icon-wrap').boundingBox();
    const tagText = await card.locator('.event-highlight-tag').textContent();

    console.log(`Card #${i+1} [${tagText.trim()}]:`);
    console.log(`  Tag bottom: ${tag.y + tag.height}, Icon top: ${icon.y}`);
    const clearance = icon.y - (tag.y + tag.height);
    console.log(`  Vertical clearance: ${clearance}px (positive means no overlap)`);
    if (clearance < 0) {
      console.error(`  ERROR: Overlap detected!`);
    } else {
      console.log(`  SUCCESS: Clear separation by ${clearance.toFixed(1)}px!`);
    }
  }

  if (width === 390) {
    await page.locator('#events').screenshot({ path: 'test-results/events-mobile.png' });
  }
}

await browser.close();
console.log('Event cards check finished!');
