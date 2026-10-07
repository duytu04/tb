/**
 * Wedding Website Application Logic
 * Couple: Tuấn Anh & Hoàng Thúy
 * Date: 20/10/2026
 */

// Ensure page always starts at top and ignores browser automatic scroll restoration
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

function forceScrollToTop() {
  const root = document.documentElement;
  const prevBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = 'auto';
  window.scrollTo(0, 0);
  root.scrollTop = 0;
  document.body.scrollTop = 0;
  requestAnimationFrame(() => {
    root.style.scrollBehavior = prevBehavior;
  });
}

// Reset immediately on script load
forceScrollToTop();

document.addEventListener('DOMContentLoaded', () => {
  forceScrollToTop();
  if (typeof window.getActiveWeddingConfig === 'function') {
    window.WEDDING_CONFIG = window.getActiveWeddingConfig();
  }
  applyDynamicContent(window.WEDDING_CONFIG);
  initEnvelope();
  initCountdown();
  initMusicController();
  initScrollReveal();
  initMapModal();
  initMemoryFilm();
  initGallerySlider();
  initRSVPForm();
  initGuestbook();
  initGiftModal();
  initLightbox();
  document.documentElement.dataset.weddingReady = 'true';
  document.dispatchEvent(new Event('wedding:ready'));
});

const appConfig = window.WEDDING_CONFIG || {};
let RSVP_ENDPOINT = (appConfig.rsvpEndpoint || appConfig.RSVP_ENDPOINT || '').trim();

/* ==========================================================================
   0. DYNAMIC CONTENT BINDING & PERSONALIZATION
   ========================================================================== */
function applyDynamicContent(config) {
  if (!config) return;

  // 0. Cá nhân hóa theo URL Parameter (?to=Anh+Nam hoặc ?guest=Bạn+Lan)
  const urlParams = new URLSearchParams(window.location.search);
  const rawGuestParam = urlParams.get('to') || urlParams.get('guest') || urlParams.get('name');
  if (rawGuestParam) {
    const guestName = rawGuestParam.trim();
    const openingGuest = document.getElementById('opening-guest');
    if (openingGuest) openingGuest.textContent = guestName;
    const pocketGuest = document.querySelector('.pocket-guest-val');
    if (pocketGuest) pocketGuest.textContent = guestName;
    const rsvpName = document.getElementById('rsvp-name');
    if (rsvpName && !rsvpName.value) rsvpName.value = guestName;
  }

  const openingCountdown = document.getElementById('opening-countdown');
  const openingDays = document.getElementById('opening-days-left');
  if (openingCountdown && openingDays && config.weddingDate?.targetIso) {
    const today = new Date();
    const weddingDay = new Date(config.weddingDate.targetIso);
    today.setHours(0, 0, 0, 0);
    weddingDay.setHours(0, 0, 0, 0);
    const daysLeft = Math.ceil((weddingDay.getTime() - today.getTime()) / 86400000);
    openingCountdown.hidden = !Number.isFinite(daysLeft) || daysLeft <= 0;
    if (daysLeft > 0) openingDays.textContent = String(daysLeft);
  }

  // 1. Tiêu đề trang & Thẻ Meta SEO/Social
  if (config.couple?.pageTitle) {
    document.title = config.couple.pageTitle;
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.content = config.couple.pageTitle;
  }
  if (config.couple?.metaDescription) {
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = config.couple.metaDescription;
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.content = config.couple.metaDescription;
  }
  if (config.couple?.ogImage) {
    const ogImg = document.querySelector('meta[property="og:image"]');
    if (ogImg) ogImg.content = config.couple.ogImage;
  }

  // 2. Màn hình mở phong bì 3D
  const openingKicker = document.querySelector('.opening-kicker');
  if (openingKicker && config.couple?.ceremonyType) openingKicker.textContent = config.couple.ceremonyType;

  const openingTitle = document.getElementById('opening-title');
  if (openingTitle && config.groom?.name && config.bride?.name) {
    openingTitle.innerHTML = `<span>${escapeHtml(config.groom.name)}</span> <span class="opening-ampersand" aria-hidden="true">&amp;</span> <span>${escapeHtml(config.bride.name)}</span>`;
  }

  const openingDateLine = document.querySelector('.opening-date-line');
  if (openingDateLine && config.weddingDate) {
    if (config.weddingDate.fullDateText) openingDateLine.setAttribute('aria-label', config.weddingDate.fullDateText);
    openingDateLine.innerHTML = `<span>${escapeHtml(config.weddingDate.dayOfWeek)}</span> <strong>${escapeHtml(config.weddingDate.day)}</strong> <span>${escapeHtml(config.weddingDate.monthYear)}</span>`;
  }

  // Thiệp nhỏ bên trong phong bì
  const letterNames = document.querySelector('.letter-names');
  if (letterNames && config.groom?.name && config.bride?.name) {
    letterNames.innerHTML = `${escapeHtml(config.groom.name)} <span class="letter-amp">&amp;</span> ${escapeHtml(config.bride.name)}`;
  }
  const letterDateBadge = document.querySelector('.letter-date-badge');
  if (letterDateBadge && config.weddingDate) {
    letterDateBadge.innerHTML = `
      <span class="letter-date-day">${escapeHtml(config.weddingDate.dayOfWeek)}</span>
      <span class="letter-date-num">${escapeHtml(config.weddingDate.day)}</span>
      <span class="letter-date-month">${escapeHtml(config.weddingDate.monthYear)}</span>
    `;
  }

  // Mặt trước túi phong bì
  const pocketNames = document.querySelector('.pocket-names');
  if (pocketNames && config.groom?.name && config.bride?.name) {
    pocketNames.innerHTML = `${escapeHtml(config.groom.name)} &amp; ${escapeHtml(config.bride.name)}`;
  }

  // 3. Thanh điều hướng Navbar
  const navBrandText = document.querySelector('.nav-brand-text');
  if (navBrandText && config.groom?.name && config.bride?.name) {
    navBrandText.innerHTML = `${escapeHtml(config.groom.name)} &amp; ${escapeHtml(config.bride.name)}`;
  }

  // 4. Hero Section
  const heroCeremonyType = document.querySelector('.hero-ceremony-type');
  if (heroCeremonyType && config.couple?.ceremonyType) heroCeremonyType.textContent = config.couple.ceremonyType;

  const heroNamesDisplay = document.querySelector('.hero-names-display');
  if (heroNamesDisplay && config.groom?.name && config.bride?.name) {
    heroNamesDisplay.innerHTML = `
      <span class="hero-name">${escapeHtml(config.groom.name)}</span>
      <span class="hero-ampersand" aria-hidden="true">&amp;</span>
      <span class="hero-name">${escapeHtml(config.bride.name)}</span>
    `;
  }

  const heroTimeNotice = document.querySelector('.hero-time-notice');
  if (heroTimeNotice && config.weddingDate?.timeText) heroTimeNotice.textContent = config.weddingDate.timeText;

  const dateDayText = document.querySelector('.date-day-text');
  if (dateDayText && config.weddingDate?.dayOfWeek) dateDayText.textContent = config.weddingDate.dayOfWeek;

  const dateNumber = document.querySelector('.date-number');
  if (dateNumber && config.weddingDate?.day) dateNumber.textContent = config.weddingDate.day;

  const dateYearText = document.querySelector('.date-year-text');
  if (dateYearText && config.weddingDate?.monthYear) dateYearText.textContent = config.weddingDate.monthYear;

  const heroLunarDate = document.querySelector('.hero-lunar-date');
  if (heroLunarDate && config.weddingDate?.lunarText) heroLunarDate.textContent = config.weddingDate.lunarText;

  const heroCoverSrc = config.couple?.ogImage || config.gallery?.[0]?.src || 'assets/images/hero_1791131600.webp';
  if (heroCoverSrc) {
    const heroImg = document.querySelector('.hero-photo-inner img');
    if (heroImg) {
      heroImg.src = heroCoverSrc;
      heroImg.alt = `Ảnh cưới ${config.groom?.name || ''} & ${config.bride?.name || ''}`;
    }
  }

  // 5. Phần Gia đình 2 bên
  const introLead = document.querySelector('.intro-lead-text');
  if (introLead && config.family?.introLead) {
    introLead.innerHTML = config.family.introLead.replace(/\n/g, '<br>');
  }

  const familyCards = document.querySelectorAll('.family-card');
  if (familyCards.length >= 2 && config.family) {
    // Card 0: Nhà Trai
    if (config.family.groom) {
      const gBadge = familyCards[0].querySelector('.family-badge');
      if (gBadge && config.family.groom.label) gBadge.textContent = config.family.groom.label;
      const gParents = familyCards[0].querySelector('.family-parents');
      if (gParents) {
        gParents.innerHTML = `<div>${escapeHtml(config.family.groom.father)}</div><div>${escapeHtml(config.family.groom.mother)}</div>`;
      }
      const gAddr = familyCards[0].querySelector('.family-address');
      if (gAddr) gAddr.innerHTML = stripPresentationIcon(config.family.groom.address);
    }
    // Card 1: Nhà Gái
    if (config.family.bride) {
      const bBadge = familyCards[1].querySelector('.family-badge');
      if (bBadge && config.family.bride.label) bBadge.textContent = config.family.bride.label;
      const bParents = familyCards[1].querySelector('.family-parents');
      if (bParents) {
        bParents.innerHTML = `<div>${escapeHtml(config.family.bride.father)}</div><div>${escapeHtml(config.family.bride.mother)}</div>`;
      }
      const bAddr = familyCards[1].querySelector('.family-address');
      if (bAddr) bAddr.innerHTML = stripPresentationIcon(config.family.bride.address);
    }
  }

  // 6. Lịch trình sự kiện
  const eventCards = document.querySelectorAll('.event-card');
  if (config.events && eventCards.length) {
    config.events.forEach((ev, idx) => {
      const card = eventCards[idx];
      if (!card) return;
      const tag = card.querySelector('.event-highlight-tag');
      if (tag && ev.tag) tag.textContent = ev.tag;
      const title = card.querySelector('.event-title');
      if (title && ev.title) title.textContent = ev.title;
      const host = card.querySelector('.event-host');
      if (host && ev.host) host.textContent = ev.host;

      const time = card.querySelector('.event-time');
      if (time && ev.time) time.textContent = ev.time;
      const date = card.querySelector('.event-date');
      if (date && ev.date) date.textContent = ev.date;
      const lunar = card.querySelector('.event-lunar');
      if (lunar && ev.lunarDate) lunar.textContent = ev.lunarDate;

      const locName = card.querySelector('.location-name');
      if (locName && ev.venueName) locName.textContent = stripPresentationIcon(ev.venueName);
      const locAddr = card.querySelector('.location-address');
      if (locAddr && ev.address) locAddr.textContent = ev.address;

      const btnCal = card.querySelector('.btn-event-outline');
      if (btnCal) {
        btnCal.onclick = () => {
          addToCalendar(
            `${ev.title} - ${config.groom.name} & ${config.bride.name}`,
            ev.address,
            ev.calendarStart,
            ev.calendarEnd,
            `${ev.title} tại ${ev.host}`
          );
        };
      }
    });
  }

  // 7. Câu chuyện tình yêu (Love Story Timeline)
  const timelineContainer = document.querySelector('.timeline-container');
  if (timelineContainer && Array.isArray(config.loveStory) && config.loveStory.length) {
    const existingLine = timelineContainer.querySelector('.timeline-line');
    timelineContainer.innerHTML = '';
    if (existingLine) {
      timelineContainer.appendChild(existingLine);
    } else {
      const line = document.createElement('div');
      line.className = 'timeline-line';
      timelineContainer.appendChild(line);
    }

    config.loveStory.forEach((item) => {
      const itemEl = document.createElement('div');
      itemEl.className = 'timeline-item is-revealed';
      itemEl.innerHTML = `
        <div class="timeline-node">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="8" />
          </svg>
        </div>
        <div class="timeline-content">
          <div class="timeline-date">${escapeHtml(item.date)}</div>
          <div class="timeline-title">${escapeHtml(item.title)}</div>
          <div class="timeline-desc">${escapeHtml(item.desc)}</div>
        </div>
      `;
      timelineContainer.appendChild(itemEl);
    });
  }

  // 8. Thước phim kỷ niệm (Memory Film)
  if (config.memoryFilm) {
    const mfKicker = document.querySelector('.memory-film-kicker');
    if (mfKicker && config.memoryFilm.kicker) mfKicker.textContent = config.memoryFilm.kicker;
    const mfTitle = document.getElementById('memory-film-title');
    if (mfTitle && config.memoryFilm.title) mfTitle.innerHTML = config.memoryFilm.title;
    const mfDesc = document.querySelector('.memory-film-description');
    if (mfDesc && config.memoryFilm.desc) mfDesc.textContent = config.memoryFilm.desc;
    const mfYears = document.querySelector('.memory-film-years');
    if (mfYears) {
      mfYears.innerHTML = `<span>${escapeHtml(config.memoryFilm.startYear || '2022')}</span><i aria-hidden="true"></i><span>${escapeHtml(config.memoryFilm.endYear || '2026')}</span>`;
    }
    const mfVideo = document.getElementById('memory-film-video');
    const mfPoster = config.memoryFilm?.posterSrc || heroCoverSrc;
    if (mfVideo) {
      if (config.memoryFilm?.videoSrc) mfVideo.dataset.src = config.memoryFilm.videoSrc;
      if (mfPoster) {
        mfVideo.poster = mfPoster;
        const mfPlaceholderImg = document.querySelector('#memory-film-placeholder img');
        if (mfPlaceholderImg) mfPlaceholderImg.src = mfPoster;
      }
    }
    const mfBg = document.querySelector('.memory-film-background');
    if (mfBg && heroCoverSrc) {
      mfBg.style.backgroundImage = `linear-gradient(180deg, rgba(19, 16, 13, 0.92), rgba(19, 16, 13, 0.8)), url('${heroCoverSrc}')`;
    }
  }

  // 9. Album Ảnh Cưới (Gallery Slider)
  const slider = document.getElementById('gallery-slider');
  if (slider && Array.isArray(config.gallery) && config.gallery.length) {
    slider.innerHTML = '';
    config.gallery.forEach((item, idx) => {
      const slide = document.createElement('div');
      slide.className = 'gallery-slide-card';
      slide.dataset.index = idx;
      slide.setAttribute('role', 'button');
      slide.setAttribute('tabindex', '0');
      slide.setAttribute('aria-label', `Mở ảnh ${idx + 1}: ${item.caption || 'Ảnh cưới'}`);
      slide.innerHTML = `
        <img src="${escapeHtml(item.src)}" alt="${escapeHtml(item.caption || 'Ảnh cưới')}" loading="lazy" decoding="async">
        <div class="gallery-overlay">
          <span class="gallery-caption">${escapeHtml(item.caption || '')}</span>
        </div>
      `;
      slider.appendChild(slide);
    });
  }

  // 10. Hộp mừng cưới & Mã VietQR tự động
  if (config.banking) {
    // Chú rể
    const tabGroom = document.getElementById('tab-groom');
    if (tabGroom && config.banking.groom) {
      const g = config.banking.groom;
      const bankInfo = tabGroom.querySelector('.bank-info-box');
      if (bankInfo) {
        bankInfo.innerHTML = `
          <div style="font-size: 0.85rem; color: var(--color-text-muted);">${escapeHtml(g.bankName)}</div>
          <div class="bank-account-num">${escapeHtml(g.accountNumberDisplay || g.accountNumber)}</div>
          <div style="font-weight: 600; color: var(--color-text-main);">${escapeHtml(g.accountHolder)}</div>
        `;
      }
      const copyBtn = tabGroom.querySelector('.btn-copy-account');
      if (copyBtn) copyBtn.dataset.account = g.accountNumber;

      const qrImg = tabGroom.querySelector('.qr-image-display');
      if (qrImg && g.bankCode && g.accountNumber) {
        const qrUrl = window.generateVietQRUrl
          ? window.generateVietQRUrl(g.bankCode, g.accountNumber, g.accountHolder, g.transferMemo || `Mung cuoi ${config.groom.name}`)
          : `https://img.vietqr.io/image/${g.bankCode}-${g.accountNumber}-compact2.png?accountName=${encodeURIComponent(g.accountHolder)}&addInfo=${encodeURIComponent(g.transferMemo || `Mung cuoi ${config.groom.name}`)}`;
        qrImg.src = qrUrl;
        qrImg.alt = `VietQR Mừng Chú Rể ${g.accountHolder}`;
      }
    }

    // Cô dâu
    const tabBride = document.getElementById('tab-bride');
    if (tabBride && config.banking.bride) {
      const b = config.banking.bride;
      const bankInfo = tabBride.querySelector('.bank-info-box');
      if (bankInfo) {
        bankInfo.innerHTML = `
          <div style="font-size: 0.85rem; color: var(--color-text-muted);">${escapeHtml(b.bankName)}</div>
          <div class="bank-account-num">${escapeHtml(b.accountNumberDisplay || b.accountNumber)}</div>
          <div style="font-weight: 600; color: var(--color-text-main);">${escapeHtml(b.accountHolder)}</div>
        `;
      }
      const copyBtn = tabBride.querySelector('.btn-copy-account');
      if (copyBtn) copyBtn.dataset.account = b.accountNumber;

      const qrImg = tabBride.querySelector('.qr-image-display');
      if (qrImg && b.bankCode && b.accountNumber) {
        const qrUrl = window.generateVietQRUrl
          ? window.generateVietQRUrl(b.bankCode, b.accountNumber, b.accountHolder, b.transferMemo || `Mung cuoi ${config.bride.name}`)
          : `https://img.vietqr.io/image/${b.bankCode}-${b.accountNumber}-compact2.png?accountName=${encodeURIComponent(b.accountHolder)}&addInfo=${encodeURIComponent(b.transferMemo || `Mung cuoi ${config.bride.name}`)}`;
        qrImg.src = qrUrl;
        qrImg.alt = `VietQR Mừng Cô Dâu ${b.accountHolder}`;
      }
    }
  }

  // 11. Modal Bản Đồ Chỉ Đường
  if (config.events && config.events.length) {
    const groomEv = config.events.find(e => e.mapTabTarget === 'modal-tab-groom') || config.events[1];
    const brideEv = config.events.find(e => e.mapTabTarget === 'modal-tab-bride') || config.events[0];

    const modalGroom = document.getElementById('modal-tab-groom');
    if (modalGroom && groomEv) {
      const info = modalGroom.querySelector('.map-modal-info-box');
      if (info) {
        info.innerHTML = `
          <div class="map-modal-event">${escapeHtml(groomEv.title)}</div>
          <div class="map-modal-venue">${escapeHtml(stripPresentationIcon(groomEv.venueName))}</div>
          <div class="map-modal-addr">${escapeHtml(stripPresentationIcon(groomEv.address))}</div>
          <div class="map-modal-time">${escapeHtml(stripPresentationIcon(groomEv.time))} • ${escapeHtml(groomEv.date)}</div>
        `;
      }
      const iframe = modalGroom.querySelector('iframe');
      if (iframe && groomEv.mapIframeSrc) iframe.src = groomEv.mapIframeSrc;
      const appLink = modalGroom.querySelector('.btn-modal-maps');
      if (appLink && groomEv.mapAppUrl) appLink.href = groomEv.mapAppUrl;
    }

    const modalBride = document.getElementById('modal-tab-bride');
    if (modalBride && brideEv) {
      const info = modalBride.querySelector('.map-modal-info-box');
      if (info) {
        info.innerHTML = `
          <div class="map-modal-event">${escapeHtml(brideEv.title)}</div>
          <div class="map-modal-venue">${escapeHtml(stripPresentationIcon(brideEv.venueName))}</div>
          <div class="map-modal-addr">${escapeHtml(stripPresentationIcon(brideEv.address))}</div>
          <div class="map-modal-time">${escapeHtml(stripPresentationIcon(brideEv.time))} • ${escapeHtml(brideEv.date)}</div>
        `;
      }
      const iframe = modalBride.querySelector('iframe');
      if (iframe && brideEv.mapIframeSrc) iframe.src = brideEv.mapIframeSrc;
      const appLink = modalBride.querySelector('.btn-modal-maps');
      if (appLink && brideEv.mapAppUrl) appLink.href = brideEv.mapAppUrl;
    }
  }

  // 12. Form RSVP
  const rsvpRadioGroom = document.querySelector('input[name="guest-side"][value="Khách Nhà Trai"]');
  if (rsvpRadioGroom && config.groom?.name) {
    const span = rsvpRadioGroom.parentElement?.querySelector('span');
    if (span) span.textContent = `Nhà Trai (${config.groom.name})`;
  }
  const rsvpRadioBride = document.querySelector('input[name="guest-side"][value="Khách Nhà Gái"]');
  if (rsvpRadioBride && config.bride?.name) {
    const span = rsvpRadioBride.parentElement?.querySelector('span');
    if (span) span.textContent = `Nhà Gái (${config.bride.name})`;
  }

  // 13. Chân trang Footer
  const footerNames = document.querySelector('.footer-names');
  if (footerNames && config.groom?.name && config.bride?.name) {
    footerNames.innerHTML = `${escapeHtml(config.groom.name)} &amp; ${escapeHtml(config.bride.name)}`;
  }
  const footerThankYou = document.querySelector('.footer-thank-you');
  if (footerThankYou && config.footer?.thankYou) footerThankYou.textContent = config.footer.thankYou;
  const footerQuote = document.querySelector('.footer-quote');
  if (footerQuote && config.footer?.quote) footerQuote.textContent = config.footer.quote;
  const footerCredit = document.querySelector('.footer-credit');
  if (footerCredit && config.footer?.credit) footerCredit.textContent = config.footer.credit;
}

/* ==========================================================================
   1. REALISTIC 3D ENVELOPE OPENING & INTERACTIVE UNBOXING
   ========================================================================== */
function initEnvelope() {
  if (window.SilkOpening) return window.SilkOpening.init();
  document.getElementById('envelope-overlay')?.classList.add('opened');
  document.body.classList.remove('invitation-locked');
  document.documentElement.classList.remove('invitation-locked');
}

/* ==========================================================================
   2. FALLING GOLDEN PETALS ANIMATION (3D ORGANIC FLUTTER)
   ========================================================================== */

/* ==========================================================================
   3. COUNTDOWN TIMER
   ========================================================================== */
function initCountdown() {
  // Wedding Date: Đọc từ cấu hình động
  const targetIso = window.WEDDING_CONFIG?.weddingDate?.targetIso || '2026-10-20T11:00:00+07:00';
  const targetDate = new Date(targetIso).getTime();

  const daysEl = document.getElementById('count-days');
  const hoursEl = document.getElementById('count-hours');
  const minsEl = document.getElementById('count-mins');
  const secsEl = document.getElementById('count-secs');

  if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

  function update() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      daysEl.innerText = '00';
      hoursEl.innerText = '00';
      minsEl.innerText = '00';
      secsEl.innerText = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.innerText = String(days).padStart(2, '0');
    hoursEl.innerText = String(hours).padStart(2, '0');
    minsEl.innerText = String(mins).padStart(2, '0');
    secsEl.innerText = String(secs).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

/* ==========================================================================
   4. FLOATING MUSIC TOGGLE & MOBILE CONTROLS
   ========================================================================== */
function initMusicController() {
  const musicBtn = document.getElementById('floating-music-btn');
  const dockMusicBtn = document.getElementById('dock-music-btn');

  function handleToggleMusic() {
    if (!window.weddingMusic) return;
    if (document.getElementById('memory-film')?.classList.contains('is-video-active')) {
      showToast('Nhạc nền tạm dừng trong lúc xem thước phim.');
      return;
    }
    const isPlaying = window.weddingMusic.toggle();
    if (isPlaying) {
      showToast('Đang phát: "I Do" - 911 x Đức Phúc 🎵');
    } else {
      showToast('Đã tạm dừng nhạc ⏸');
    }
  }

  if (musicBtn) {
    musicBtn.addEventListener('click', handleToggleMusic);
  }

  if (dockMusicBtn) {
    dockMusicBtn.addEventListener('click', handleToggleMusic);
  }
}

/* ==========================================================================
   4A. SCROLL REVEAL & 3D INTERACTIVE TILT
   ========================================================================== */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  if (!elements.length) return;
  elements.forEach(el => el.classList.add('is-revealed'));
}


/* ==========================================================================
   4B. MAP MODAL & INTERACTIVE MAP TABS (NHÀ TRAI & NHÀ GÁI)
   ========================================================================== */
function initMapModal() {
  const modal = document.getElementById('map-modal');
  const openBtns = document.querySelectorAll('.btn-open-map-modal');
  const closeBtn = document.getElementById('btn-close-map');
  const modalCard = modal?.querySelector('.map-modal-card');

  if (!modal) return;

  function setMapTab(targetId) {
    const tabBtns = modal.querySelectorAll('.map-modal-tab-btn');
    const tabContents = modal.querySelectorAll('.map-modal-tab-content');
    tabBtns.forEach(b => {
      const match = b.dataset.target === targetId;
      b.classList.toggle('active', match);
      b.setAttribute('aria-selected', match ? 'true' : 'false');
    });
    tabContents.forEach(c => {
      c.classList.toggle('active', c.id === targetId);
    });
  }

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (btn.dataset.tabTarget) {
        setMapTab(btn.dataset.tabTarget);
      }
      openModal(modal, modalCard);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      closeModal(modal);
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal(modal);
    }
  });

  // Switch tabs in Map Modal (Groom vs Bride)
  const tabBtns = modal.querySelectorAll('.map-modal-tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.target;
      if (target) {
        setMapTab(target);
      }
    });
  });
}

/* ==========================================================================
   5. RSVP FORM & STORAGE
   ========================================================================== */
function initRSVPForm() {
  const form = document.getElementById('rsvp-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');

    const name = document.getElementById('rsvp-name').value.trim();
    const phone = document.getElementById('rsvp-phone').value.trim();
    const side = form.elements['guest-side'].value;
    const guests = document.getElementById('rsvp-guests').value;
    const attending = form.elements['guest-attending'].value;
    const wish = document.getElementById('rsvp-wish').value.trim();

    if (!name) {
      showToast('Vui lòng nhập họ và tên của bạn!');
      return;
    }

    const rsvpData = {
      name,
      phone,
      side,
      guests,
      attending,
      wish,
      date: new Date().toLocaleString('vi-VN')
    };

    setSubmitState(submitBtn, true);

    const result = await submitRSVP(rsvpData);

    // If wish exists, append to Guestbook
    if (wish && (result.sent || result.localOnly)) {
      addWishToGuestbook(name, side, wish);
    }

    setSubmitState(submitBtn, false);
    const message = result.sent
      ? `Cảm ơn ${name}! Xác nhận tham dự đã được gửi.`
      : result.unverified
        ? 'Đã gửi yêu cầu. Chưa thể xác nhận đã nhận được; bạn có thể liên hệ trực tiếp với gia đình.'
        : result.localOnly
          ? 'Thông tin đã được lưu trên thiết bị này. Bạn vui lòng báo trực tiếp với gia đình để xác nhận tham dự.'
          : 'Chưa gửi được xác nhận. Thông tin vẫn được giữ lại để bạn thử lại.';
    const feedback = document.getElementById('rsvp-result');
    if (feedback) {
      feedback.hidden = false;
      feedback.textContent = message;
      feedback.classList.toggle('is-success', Boolean(result.sent));
    }
    if (result.sent) {
      form.reset();
      document.dispatchEvent(new CustomEvent('wedding:rsvp-success'));
    }
    showToast(message);

    // Scroll gently to guestbook if wish was entered
    if (wish) {
      setTimeout(() => {
        document.getElementById('guestbook')?.scrollIntoView({ behavior: 'smooth' });
      }, 1000);
    }
  });
}

function setSubmitState(button, isSubmitting) {
  if (!button) return;
  button.disabled = isSubmitting;
  button.dataset.originalText = button.dataset.originalText || button.textContent.trim();
  button.textContent = isSubmitting ? 'ĐANG GỬI...' : button.dataset.originalText;
}

async function submitRSVP(data) {
  saveLocalItem('wedding_rsvps', data);

  const endpoint = (window.WEDDING_CONFIG?.rsvpEndpoint || window.WEDDING_CONFIG?.RSVP_ENDPOINT || RSVP_ENDPOINT || '').trim();
  if (!endpoint) {
    return { sent: false, localOnly: true };
  }

  try {
    const isGoogleScript = endpoint.includes('script.google.com');
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    const response = await fetch(endpoint, {
      method: 'POST',
      mode: isGoogleScript ? 'no-cors' : 'cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(data),
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    if (!isGoogleScript && !response.ok) {
      throw new Error(`RSVP endpoint returned ${response.status}`);
    }
    return isGoogleScript ? { sent: false, unverified: true } : { sent: true };
  } catch (error) {
    console.warn('Không gửi được RSVP:', error);
    return { sent: false, error };
  }
}

/* ==========================================================================
   6. GUESTBOOK & WISHES
   ========================================================================== */
const defaultWishes = [
  {
    name: 'Gia đình Bác Hùng (Hà Nội)',
    side: 'Khách Nhà Trai',
    text: 'Chúc mừng hai cháu Tuấn Anh và Hoàng Thúy trăm năm hạnh phúc, răng long đầu bạc, sớm sinh quý tử nhé!'
  },
  {
    name: 'Cô Lan & Chú Tuấn (Thanh Hóa)',
    side: 'Khách Nhà Gái',
    text: 'Mừng hạnh phúc đôi bạn trẻ! Chúc hai con luôn yêu thương, nhường nhịn và đồng hành cùng nhau xây đắp tổ ấm vững bền.'
  },
  {
    name: 'Minh Trí & Hội Bạn Cấp 3',
    side: 'Bạn Cả Hai',
    text: 'Cuối cùng ngày này cũng tới! Chúc bạn thân của tao lấy được vợ hiền, chúc cô dâu luôn xinh đẹp rạng ngời!'
  }
];

function initGuestbook() {
  const container = document.getElementById('wishes-container');
  if (!container) return;

  const userWishes = getLocalArray('wedding_wishes');
  const allWishes = [...userWishes, ...defaultWishes];

  container.innerHTML = '';
  allWishes.forEach(item => {
    container.appendChild(createWishElement(item.name, item.side, item.text));
  });
}

function createWishElement(name, side, text) {
  const div = document.createElement('div');
  div.className = 'wish-item';
  div.innerHTML = `
    <div class="wish-header">
      <span class="wish-author">${escapeHtml(name)}</span>
      <span class="wish-tag">${escapeHtml(side || 'Khách Mời')}</span>
    </div>
    <p class="wish-text">“${escapeHtml(text)}”</p>
  `;
  return div;
}

function addWishToGuestbook(name, side, text) {
  const newWish = { name, side, text, time: Date.now() };
  saveLocalItem('wedding_wishes', newWish, true);

  const container = document.getElementById('wishes-container');
  if (container) {
    const el = createWishElement(name, side, text);
    el.classList.add('wish-new');
    el.addEventListener('animationend', () => el.classList.remove('wish-new'), { once: true });
    container.insertBefore(el, container.firstChild);
  }
}

/* ==========================================================================
   7. DIGITAL GIFT / QR MODAL
   ========================================================================== */
function initGiftModal() {
  const modal = document.getElementById('gift-modal');
  const openBtns = document.querySelectorAll('.btn-open-gift-modal');
  const closeBtn = document.getElementById('btn-close-gift');
  const modalCard = modal?.querySelector('.gift-modal-card');

  if (!modal) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      openModal(modal, modalCard);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      closeModal(modal);
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal(modal);
    }
  });

  // Switch Tabs (Groom vs Bride)
  const tabBtns = modal.querySelectorAll('.gift-tab-btn');
  const tabContents = modal.querySelectorAll('.gift-tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      tabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      document.getElementById(target)?.classList.add('active');
    });
  });

  // Copy Account Number
  const copyBtns = modal.querySelectorAll('.btn-copy-account');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const acc = btn.dataset.account;
      if (acc) {
        navigator.clipboard.writeText(acc).then(() => {
          showToast(`Đã sao chép STK: ${acc}`);
        }).catch(() => {
          showToast(`STK: ${acc}`);
        });
      }
    });
  });
}

/* ==========================================================================
   8. PHOTO GALLERY (HORIZONTAL SLIDER & LIGHTBOX)
   ========================================================================== */
function initGallerySlider() {
  const slider = document.getElementById('gallery-slider');
  if (!slider) return;
  const slides = [...slider.querySelectorAll('.gallery-slide-card')];
  if (!slides.length) return;
  const dotsContainer = document.getElementById('gallery-dots');
  let currentIndex = 0;
  let frame = 0;
  const dots = slides.map((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'slider-dot';
    dot.setAttribute('aria-label', `Xem ảnh ${index + 1}`);
    dot.addEventListener('click', () => goToSlide(index));
    return dot;
  });
  dotsContainer?.replaceChildren(...dots);
  const caption = document.getElementById('gallery-film-caption');
  slides.forEach((slide, index) => { slide.dataset.frame = String(index + 1).padStart(2, '0'); });

  function curve() {
    const center = slider.scrollLeft + slider.clientWidth / 2;
    const still = prefersReducedMotion();
    slides.forEach((slide) => {
      const width = slide.offsetWidth || 1;
      const distance = still
        ? 0
        : Math.max(-3, Math.min(3, (slide.offsetLeft + width / 2 - center) / width));
      const absoluteDistance = Math.abs(distance);
      slide.style.setProperty('--ry', `${distance * 24}deg`);
      slide.style.setProperty('--tz', `${-Math.pow(absoluteDistance, 1.25) * 70}px`);
      slide.style.setProperty('--dim', String(1 - Math.min(absoluteDistance, 2) * 0.24));
      slide.style.setProperty('--px', `${distance * -12}px`);
    });
  }

  function update(index) {
    if (caption && (index !== currentIndex || !caption.textContent)) {
      caption.textContent = slides[index].querySelector('.gallery-caption')?.textContent || '';
      caption.style.animation = 'none';
      void caption.offsetWidth;
      caption.style.animation = '';
    }
    currentIndex = index;
    slides.forEach((slide, i) => {
      slide.classList.toggle('is-current', i === index);
      slide.classList.toggle('is-before', i < index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
      dot.setAttribute('aria-pressed', String(i === index));
    });
  }
  function goToSlide(index, instant = false) {
    index = (index + slides.length) % slides.length;
    const slide = slides[index];
    const left = slide.offsetLeft - (slider.clientWidth - slide.offsetWidth) / 2;
    slider.scrollTo({ left, behavior: instant || prefersReducedMotion() ? 'instant' : 'smooth' });
    update(index);
  }
  document.getElementById('gallery-prev')?.addEventListener('click', () => goToSlide(currentIndex - 1));
  document.getElementById('gallery-next')?.addEventListener('click', () => goToSlide(currentIndex + 1));
  slider.addEventListener('scroll', () => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      curve();
      const center = slider.scrollLeft + slider.clientWidth / 2;
      let nearest = 0;
      slides.forEach((slide, index) => {
        const distance = Math.abs(slide.offsetLeft + slide.offsetWidth / 2 - center);
        const previous = Math.abs(slides[nearest].offsetLeft + slides[nearest].offsetWidth / 2 - center);
        if (distance < previous) nearest = index;
      });
      update(nearest);
    });
  }, { passive: true });
  const observer = new ResizeObserver(() => { goToSlide(currentIndex, true); curve(); });
  observer.observe(slider);
  update(0);
  curve();
}

/* ===========================================================================
   8A. MEMORY FILM / LOVE JOURNEY PLAYER
   =========================================================================== */
function initMemoryFilm() {
  const section = document.getElementById('memory-film');
  const player = document.getElementById('memory-film-player');
  const video = document.getElementById('memory-film-video');
  const placeholderText = document.getElementById('memory-film-placeholder-text');
  const unmuteBtn = document.getElementById('memory-film-unmute');
  const retryBtn = document.getElementById('memory-film-retry');

  if (!section || !player || !video) return;
  if (!window.WEDDING_CONFIG?.memoryFilm?.videoSrc) {
    section.hidden = true;
    return;
  }

  let inView = false;
  let unavailable = false;
  let musicWasPlaying = false;
  let musicPausedForVideo = false;
  let playbackRequest = 0;

  function pauseBackgroundMusic() {
    if (musicPausedForVideo) return;
    const music = window.weddingMusic;
    musicWasPlaying = Boolean(music && !music.audio.paused);
    musicPausedForVideo = true;
    section.classList.add('is-video-active');
    if (musicWasPlaying) music.pause();
  }

  function restoreBackgroundMusic() {
    section.classList.remove('is-video-active');
    if (musicPausedForVideo && musicWasPlaying) window.weddingMusic?.play();
    musicPausedForVideo = false;
    musicWasPlaying = false;
  }

  function showPlaybackFallback() {
    if (!inView || unavailable) return;
    player.dataset.state = 'ready';
    if (retryBtn) retryBtn.hidden = false;
  }

  async function startVideo(withSound = false) {
    if (!inView || unavailable || document.hidden) return;
    const request = ++playbackRequest;

    if (!video.src) {
      video.src = video.dataset.src;
      video.load();
    }

    if (video.ended) video.currentTime = 0;
    if (withSound) video.muted = false;
    pauseBackgroundMusic();

    try {
      await video.play();
    } catch (error) {
      if (request !== playbackRequest || !inView || unavailable) return;

      if (error.name === 'NotAllowedError' && !video.muted) {
        video.muted = true;
        try {
          await video.play();
        } catch (mutedError) {
          if (request === playbackRequest) showPlaybackFallback();
          return;
        }
      } else {
        showPlaybackFallback();
        return;
      }
    }

    if (request !== playbackRequest || !inView) {
      video.pause();
      return;
    }

    player.dataset.state = 'playing';
    if (retryBtn) retryBtn.hidden = true;
    if (unmuteBtn) unmuteBtn.hidden = !video.muted;
  }

  function stopVideo() {
    playbackRequest++;
    video.pause();
    if (!unavailable) player.dataset.state = 'ready';
    if (retryBtn) retryBtn.hidden = true;
    if (unmuteBtn) unmuteBtn.hidden = true;
    restoreBackgroundMusic();
  }

  video.addEventListener('playing', () => {
    if (!inView) return;
    pauseBackgroundMusic();
    player.dataset.state = 'playing';
    if (unmuteBtn) unmuteBtn.hidden = !video.muted;
    if (retryBtn) retryBtn.hidden = true;
  });

  video.addEventListener('loadedmetadata', () => {
    player.classList.toggle('is-portrait', video.videoHeight > video.videoWidth);
  });

  video.addEventListener('volumechange', () => {
    if (unmuteBtn) unmuteBtn.hidden = !inView || !video.muted;
  });

  video.addEventListener('error', () => {
    unavailable = true;
    playbackRequest++;
    video.pause();
    player.dataset.state = 'missing';
    if (placeholderText) placeholderText.textContent = 'Thước phim đang được chuẩn bị';
    if (retryBtn) retryBtn.hidden = true;
    if (unmuteBtn) unmuteBtn.hidden = true;
    restoreBackgroundMusic();
  });

  video.addEventListener('ended', () => {
    player.dataset.state = 'ready';
    if (unmuteBtn) unmuteBtn.hidden = true;
    restoreBackgroundMusic();
  });

  retryBtn?.addEventListener('click', () => startVideo(true));
  unmuteBtn?.addEventListener('click', () => {
    video.muted = false;
    unmuteBtn.hidden = true;
    if (video.paused) startVideo(true);
  });

  const observer = new IntersectionObserver((entries) => {
    const visible = entries[0]?.intersectionRatio >= 0.4;
    if (visible === inView) return;
    inView = visible;
    if (inView) {
      startVideo();
    } else {
      stopVideo();
    }
  }, { threshold: [0, 0.4, 1] });

  observer.observe(player);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      playbackRequest++;
      video.pause();
    } else if (inView && !unavailable) {
      startVideo();
    }
  });
}

function initLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.getElementById('btn-close-lightbox');
  const galleryCards = document.querySelectorAll('.gallery-slide-card');

  if (!modal || !lightboxImg) return;

  galleryCards.forEach(card => {
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        card.click();
      }
    });
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      if (img) {
        lightboxImg.src = img.src;
        openModal(modal, closeBtn || modal);
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => closeModal(modal));
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal(modal);
  });
}

/* ==========================================================================
   9. HELPER UTILITIES
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById('toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.className = 'toast-msg';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);
  }
  toast.innerText = message;
  toast.classList.add('show');

  clearTimeout(showToast._timeout);
  showToast._timeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

function stripPresentationIcon(value) {
  return String(value ?? '').replace(/^\s*(?:📍|🏛️?|⏰)\s*/u, '');
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

function prefersReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

function getLocalArray(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || '[]');
    return Array.isArray(value) ? value : [];
  } catch (error) {
    console.warn(`Không đọc được ${key} từ localStorage:`, error);
    return [];
  }
}

function saveLocalItem(key, item, prepend = false) {
  try {
    const items = getLocalArray(key);
    if (prepend) {
      items.unshift(item);
    } else {
      items.push(item);
    }
    localStorage.setItem(key, JSON.stringify(items));
  } catch (error) {
    console.warn(`Không lưu được ${key} vào localStorage:`, error);
  }
}

let activeModal = null;
let previousFocus = null;
let modalBackgroundState = [];

function setModalBackgroundInert(modal, inert) {
  if (inert) {
    modalBackgroundState = [...document.body.children]
      .filter(element => element !== modal && !['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(element.tagName))
      .map(element => ({ element, wasInert: element.inert }));
    modalBackgroundState.forEach(({ element }) => { element.inert = true; });
    return;
  }

  modalBackgroundState.forEach(({ element, wasInert }) => { element.inert = wasInert; });
  modalBackgroundState = [];
}

function openModal(modal, focusTarget) {
  if (!modal) return;
  previousFocus = document.activeElement;
  activeModal = modal;
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  setModalBackgroundInert(modal, true);

  const target = focusTarget || getFocusableElements(modal)[0] || modal;
  const focusInsideModal = () => {
    if (activeModal !== modal) return;
    target.focus?.({ preventScroll: true });
    if (!modal.contains(document.activeElement)) {
      (getFocusableElements(modal)[0] || modal).focus?.({ preventScroll: true });
    }
  };
  focusInsideModal();
  requestAnimationFrame(focusInsideModal);
  setTimeout(focusInsideModal, 50);
}

function closeModal(modal) {
  if (!modal) return;
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  setModalBackgroundInert(modal, false);

  if (activeModal === modal) {
    activeModal = null;
  }

  if (previousFocus && document.contains(previousFocus)) {
    previousFocus.focus?.();
  }
  previousFocus = null;
}

function getFocusableElements(container) {
  return Array.from(container.querySelectorAll(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  )).filter(el => el.offsetParent !== null || el === document.activeElement);
}

document.addEventListener('keydown', (event) => {
  if (!activeModal) return;

  if (event.key === 'Escape') {
    event.preventDefault();
    closeModal(activeModal);
    return;
  }

  if (event.key !== 'Tab') return;

  const focusable = getFocusableElements(activeModal);
  if (!focusable.length) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (!activeModal.contains(document.activeElement)) {
    event.preventDefault();
    (event.shiftKey ? last : first).focus();
  } else if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

// Add to Calendar helper
window.addToCalendar = function(title, location, startDate, endDate, description) {
  const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}&ctz=Asia/Ho_Chi_Minh`;
  window.open(googleCalUrl, '_blank');
};
