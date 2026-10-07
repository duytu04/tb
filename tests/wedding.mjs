import assert from 'node:assert/strict';
import { access, mkdir, readdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { chromium } from '@playwright/test';

const base = process.env.WEDDING_TEST_URL || 'http://127.0.0.1:5173';
await mkdir('test-results', { recursive: true });
let executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE;
try { await access(chromium.executablePath()); } catch {
  const cache = join(process.env.LOCALAPPDATA, 'ms-playwright');
  const installed = (await readdir(cache)).filter(name => /^chromium-\d+$/.test(name)).sort().at(-1);
  executablePath ||= join(cache, installed, 'chrome-win64', 'chrome.exe');
}

const browser = await chromium.launch({ executablePath, headless: true });
const results = [];

async function prepare(options = {}) {
  const context = await browser.newContext(options);
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.route(/https:\/\/maps\.google\./, route => route.fulfill({ contentType: 'text/html', body: '<p>Map fixture</p>' }));
  return { context, page, errors };
}

async function noOverflow(page) {
  const size = await page.evaluate(() => ({ content: document.documentElement.scrollWidth, screen: innerWidth }));
  assert(size.content <= size.screen + 1, `Horizontal overflow: ${JSON.stringify(size)}`);
}

async function startOpening(page) {
  const seal = page.getByRole('button', { name: /Mở thiệp bằng con dấu sáp/ });
  await seal.focus();
  await page.keyboard.press('Enter');
}

async function finishOpening(page) {
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => window.SilkOpening.state === 'opened');
}

async function assertOriginalDesign(page) {
  const fingerprint = await page.evaluate(() => ({
    theme: document.querySelector('meta[name="theme-color"]').content,
    nextSection: document.querySelector('#hero').nextElementSibling.id,
    countdownInsideHero: Boolean(document.querySelector('#hero .countdown-box')),
    originalEnvelope: Boolean(document.querySelector('.envelope-front-pocket .pocket-floral')),
    addedNavigation: Boolean(document.querySelector('.silk-nav')),
    addedStoryPhotos: document.querySelectorAll('#story .story-photo').length,
    addedHeroCta: Boolean(document.querySelector('.hero-rsvp'))
  }));
  assert.deepEqual(fingerprint, {
    theme: '#FAF7F2',
    nextSection: 'family',
    countdownInsideHero: true,
    originalEnvelope: true,
    addedNavigation: false,
    addedStoryPhotos: 0,
    addedHeroCta: false
  });
}

try {
  const viewports = [[390, 844], [1440, 900], [320, 568], [360, 800], [768, 1024], [1920, 1080], [800, 390]];
  for (const [width, height] of viewports) {
    const { context, page, errors } = await prepare({ viewport: { width, height } });
    const size = `${width}x${height}`;
    await page.goto(base, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('html[data-silk-ready="true"]', { timeout: 30000 });
    await noOverflow(page);
    await assertOriginalDesign(page);

    const envelope = await page.locator('.envelope-3d-box').boundingBox();
    assert(Math.abs(envelope.x + envelope.width / 2 - width / 2) < 2, `${size}: envelope is not centered`);
    assert(envelope.x >= -1 && envelope.x + envelope.width <= width + 1, `${size}: envelope is clipped`);
    assert(await page.locator('#silk-stage canvas').count(), `${size}: missing Three.js atmosphere`);
    await page.screenshot({ path: `test-results/${size}-original-opening.png` });

    await startOpening(page);
    await page.waitForTimeout(1250);
    assert(await page.locator('.envelope-scene').evaluate(element => element.classList.contains('is-letter-rising')));
    await page.screenshot({ path: `test-results/${size}-original-unfold.png` });
    await finishOpening(page);
    await page.waitForTimeout(250);
    await noOverflow(page);
    await page.screenshot({ path: `test-results/${size}-original-hero.png` });

    if (width === 1440) {
      await page.evaluate(() => {
        const grid = document.querySelector('#family .families-grid');
        scrollTo(0, grid.getBoundingClientRect().top + scrollY - innerHeight * 0.64);
      });
      await page.waitForTimeout(450);
      const transform = await page.locator('#family .family-card').first().evaluate(element => getComputedStyle(element).transform);
      assert.notEqual(transform, 'none', 'Desktop cinematic depth did not activate');
      await noOverflow(page);
    }

    if (width === 390) {
      await page.evaluate(() => {
        const card = document.querySelector('#events .event-card');
        scrollTo(0, card.getBoundingClientRect().top + scrollY - innerHeight * 0.8);
      });
      await page.waitForTimeout(350);
      const transform = await page.locator('#events .event-card').first().evaluate(element => getComputedStyle(element).transform);
      assert.notEqual(transform, 'none', 'Mobile cinematic motion did not activate');
      await noOverflow(page);
    }

    assert.deepEqual(errors, [], `${size}: page errors`);
    results.push({ viewport: size, originalDesign: true, envelope: 'centered and animated', errors });
    await context.close();
    console.log(`PASS ${size}`);
  }

  const { context, page, errors } = await prepare({ viewport: { width: 390, height: 844 } });
  const guest = 'Gia đình Nguyễn Hoàng Anh & Trần Ngọc Minh 100%';
  await page.goto(`${base}/?to=${encodeURIComponent(guest)}`);
  await page.waitForSelector('html[data-silk-ready="true"]');
  assert.equal(await page.locator('.pocket-guest-val').textContent(), guest);
  await startOpening(page);
  await finishOpening(page);
  await page.locator('#gallery').scrollIntoViewIfNeeded();
  await page.evaluate(() => document.getElementById('gallery-next').click());
  await page.waitForTimeout(700);
  await page.locator('.gallery-slide-card').nth(1).focus();
  await page.keyboard.press('Enter');
  assert.equal(await page.locator('#lightbox-modal').getAttribute('aria-hidden'), 'false');
  await page.keyboard.press('Escape');
  await page.locator('#events .btn-open-map-modal').first().click();
  assert.equal(await page.locator('#map-modal').getAttribute('aria-hidden'), 'false');
  await page.keyboard.press('Escape');
  await page.locator('#mobile-bottom-dock .btn-open-gift-modal').click();
  assert.equal(await page.locator('#gift-modal').getAttribute('aria-hidden'), 'false');
  await page.keyboard.press('Escape');
  assert.deepEqual(errors, []);
  results.push({ interactions: 'personalization, envelope, gallery, lightbox, map and gift passed' });
  await context.close();

  for (const fallback of ['reduced', 'no-bundle', 'no-scene', 'no-webgl', 'hash']) {
    const { context, page, errors } = await prepare({
      viewport: { width: 390, height: 844 },
      reducedMotion: fallback === 'reduced' ? 'reduce' : 'no-preference'
    });
    if (fallback === 'no-bundle') await page.route('**/js/generated/**', route => route.abort());
    if (fallback === 'no-scene') await page.route('**/silk-scene-*.js', route => route.abort());
    if (fallback === 'no-webgl') {
      await page.addInitScript(() => {
        const original = HTMLCanvasElement.prototype.getContext;
        HTMLCanvasElement.prototype.getContext = function(type, ...args) {
          return /webgl/.test(type) ? null : original.call(this, type, ...args);
        };
      });
    }
    await page.goto(`${base}/${fallback === 'hash' ? '#events' : ''}`);
    if (fallback !== 'hash') {
      await startOpening(page);
      if (fallback !== 'reduced') await page.keyboard.press('Escape');
    }
    await page.waitForFunction(() => window.SilkOpening.state === 'opened', { timeout: 6000 });
    await noOverflow(page);
    await assertOriginalDesign(page);
    assert.deepEqual(errors, []);
    results.push({ fallback, status: 'passed' });
    await context.close();
  }

  await writeFile('test-results/report.json', JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results, null, 2));
} finally {
  await browser.close();
}
