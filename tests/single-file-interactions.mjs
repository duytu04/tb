import { chromium } from '@playwright/test';

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
page.setDefaultTimeout(5000);

const pageErrors = [];
page.on('pageerror', (error) => pageErrors.push(error.message));
await page.route('https://**', (route) => route.abort());

try {
  await page.goto('http://127.0.0.1:5173/mobile-ui-single-file.html', {
    waitUntil: 'domcontentloaded',
    timeout: 15000,
  });

  const initial = await page.evaluate(() => ({
    weddingReady: document.documentElement.dataset.weddingReady,
    locked: document.body.classList.contains('invitation-locked'),
    imageCount: document.images.length,
    brokenImages: [...document.images].filter(
      (image) => image.getAttribute('src') && image.complete && image.naturalWidth === 0,
    ).length,
    musicControllerReady: Boolean(window.weddingMusic),
    audioEmbedded: window.weddingMusic?.audio?.src?.startsWith('data:audio/mpeg') || false,
  }));

  await page.locator('#flap-wax-seal').click({ force: true });
  await page.waitForFunction(
    () => document.querySelector('#envelope-overlay')?.getAttribute('aria-hidden') === 'true',
    null,
    { timeout: 5000 },
  );
  const opened = await page.evaluate(() => ({
    overlayHidden: document.querySelector('#envelope-overlay')?.getAttribute('aria-hidden'),
    locked: document.body.classList.contains('invitation-locked'),
  }));

  await page.locator('.mobile-bottom-dock .btn-open-map-modal').click({ force: true });
  await page.waitForTimeout(500);
  const mapOpen = await page.locator('#map-modal').evaluate((element) => element.classList.contains('active'));
  await page.locator('.map-modal-tab-btn[data-target="modal-tab-bride"]').click();
  const brideMapTab = await page.locator('#modal-tab-bride').evaluate(
    (element) => element.classList.contains('active'),
  );
  await page.locator('#btn-close-map').click();
  await page.waitForFunction(
    () => getComputedStyle(document.querySelector('#map-modal')).visibility === 'hidden',
  );

  await page.locator('.mobile-bottom-dock .btn-open-gift-modal').click();
  await page.waitForFunction(
    () => getComputedStyle(document.querySelector('#gift-modal')).visibility === 'visible',
  );
  const giftOpen = await page.locator('#gift-modal').evaluate((element) => element.classList.contains('active'));
  await page.locator('.gift-tab-btn').nth(1).click();
  const brideGiftTab = await page.locator('.gift-tab-content').nth(1).evaluate(
    (element) => element.classList.contains('active'),
  );
  await page.locator('#btn-close-gift').click();
  await page.waitForFunction(
    () => getComputedStyle(document.querySelector('#gift-modal')).visibility === 'hidden',
  );

  await page.locator('#gallery').scrollIntoViewIfNeeded();
  await page.locator('.slider-dot').nth(1).click();
  await page.waitForTimeout(500);
  const galleryIndex = await page.locator('.gallery-slide-card.is-current').getAttribute('data-index');
  await page.locator('.gallery-slide-card').first().click();
  const lightboxOpen = await page.locator('#lightbox-modal').evaluate(
    (element) => element.classList.contains('active'),
  );
  await page.locator('#btn-close-lightbox').click();

  await page.locator('#rsvp-name').fill('Kiểm thử UI');
  await page.locator('#rsvp-wish').fill('Chúc mừng hạnh phúc');
  await page.locator('#rsvp-form button[type="submit"]').click();
  await page.waitForTimeout(300);
  const rsvpMessage = await page.locator('#toast-notification').textContent();
  const wishCount = await page.locator('#wishes-container .wish-item').count();

  console.log(JSON.stringify({
    initial,
    opened,
    mapOpen,
    brideMapTab,
    giftOpen,
    brideGiftTab,
    galleryIndex,
    lightboxOpen,
    rsvpMessage,
    wishCount,
    pageErrors,
  }, null, 2));
} finally {
  await browser.close();
}
