import { chromium } from '@playwright/test';
import { access, readdir } from 'node:fs/promises';
import { join } from 'node:path';

let executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE;
try { await access(chromium.executablePath()); } catch {
  const cache = join(process.env.LOCALAPPDATA, 'ms-playwright');
  const installed = (await readdir(cache)).filter(name => /^chromium-\d+$/.test(name)).sort().at(-1);
  executablePath ||= join(cache, installed, 'chrome-win64', 'chrome.exe');
}

console.log('=== AUDITING LIVE SERVER DATA PIPELINE ===');

// 1. Fetch live config via API
const apiResp = await fetch('http://180.93.54.36:8080/api/get-config');
const apiData = await apiResp.json();
console.log('1. API /api/get-config status:', apiResp.status, 'success:', apiData.success);
const liveConfig = apiData.config;

// 2. Open live invitation page
const browser = await chromium.launch({ executablePath, headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto('http://180.93.54.36:8080/');
await page.waitForSelector('html[data-silk-ready="true"]');

// 3. Inspect DOM elements against liveConfig
const audit = await page.evaluate((cfg) => {
  const heroNames = document.querySelector('.hero-names-display')?.textContent.trim().replace(/\s+/g, ' ');
  const ceremony = document.querySelector('.hero-ceremony-type')?.textContent.trim();
  const timeText = document.querySelector('.hero-time-notice')?.textContent.trim();
  const dateDay = document.querySelector('.date-number')?.textContent.trim();
  const dateMonthYear = document.querySelector('.date-year-text')?.textContent.trim();
  const lunar = document.querySelector('.hero-lunar-date')?.textContent.trim();
  
  const gFather = document.querySelector('.family-card .family-parents div:first-child')?.textContent.trim();
  const gMother = document.querySelector('.family-card .family-parents div:last-child')?.textContent.trim();
  
  const event1Title = document.querySelectorAll('.event-card .event-title')[0]?.textContent.trim();
  const event2Title = document.querySelectorAll('.event-card .event-title')[1]?.textContent.trim();

  const galleryCaptions = Array.from(document.querySelectorAll('.gallery-slide-card .gallery-caption')).map(el => el.textContent.trim());
  const galleryImages = Array.from(document.querySelectorAll('.gallery-slide-card img')).map(el => el.getAttribute('src'));

  const groomBankAcc = document.querySelector('#tab-groom .bank-account-num')?.textContent.trim();
  const brideBankAcc = document.querySelector('#tab-bride .bank-account-num')?.textContent.trim();

  return {
    heroNamesMatch: heroNames?.includes(cfg.groom.name) && heroNames?.includes(cfg.bride.name),
    ceremonyMatch: ceremony === cfg.couple.ceremonyType,
    timeTextMatch: timeText === cfg.weddingDate.timeText,
    dateDayMatch: dateDay === cfg.weddingDate.day,
    lunarMatch: lunar === cfg.weddingDate.lunarText,
    gFatherMatch: gFather === cfg.family.groom.father,
    gMotherMatch: gMother === cfg.family.groom.mother,
    event1Match: event1Title === cfg.events[0].title,
    event2Match: event2Title === cfg.events[1].title,
    galleryCount: galleryImages.length,
    galleryMatchesConfig: galleryImages.length === cfg.gallery.length,
    bankGroomMatch: groomBankAcc?.replace(/\s+/g, '') === cfg.banking.groom.accountNumber,
    bankBrideMatch: brideBankAcc?.replace(/\s+/g, '') === cfg.banking.bride.accountNumber,
    renderedData: {
      heroNames,
      ceremony,
      timeText,
      date: `${dateDay} ${dateMonthYear}`,
      lunar,
      groomParents: `${gFather} & ${gMother}`,
      events: [event1Title, event2Title],
      galleryCaptions,
      galleryImages,
      groomBankAcc,
      brideBankAcc
    }
  };
}, liveConfig);

console.log('2. Live Audit Verification Results:');
console.log(JSON.stringify(audit, null, 2));

await browser.close();
