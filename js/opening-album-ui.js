/* Builds the decorative opening album from the existing wedding configuration. */
(() => {
  const mount = document.getElementById('opening-album-root');
  if (!mount) return;

  const config = (typeof window.getActiveWeddingConfig === 'function' ? window.getActiveWeddingConfig() : null) || window.WEDDING_CONFIG || {};
  const escapeHtml = (value) => String(value ?? '').replace(/[&<>'"]/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[character]));

  const groom = escapeHtml(config.groom?.name || 'Tuấn Anh');
  const bride = escapeHtml(config.bride?.name || 'Hoàng Thúy');
  const day = escapeHtml(config.weddingDate?.day || '20');
  const monthYear = escapeHtml(config.weddingDate?.monthYear || '10 . 2026');
  const weddingDate = `${day} . ${monthYear}`.replace(/\s+/g, ' ').trim();
  const monogram = 'assets/icons/monogram.svg';
  const ornament = 'assets/icons/ornament.svg';
  const rawAlbumConfig = Array.isArray(config.openingMemories)
    ? config.openingMemories
    : (Array.isArray(config.openingAlbum) ? config.openingAlbum : []);

  const memories = rawAlbumConfig
    .filter(item => item && (item.src || item.caption || item.date))
    .map((item, index) => {
      const photo = escapeHtml((item && typeof item.src === 'string') ? item.src.trim() : '');
      const caption = escapeHtml((item && typeof item.caption === 'string') ? item.caption.trim() : '');
      const date = escapeHtml((item && typeof item.date === 'string') ? item.date.trim() : '');
      return {
        photo,
        caption,
        date
      };
    });

  const totalPages = memories.length;
  const totalPagesStr = String(totalPages).padStart(2, '0');
  const cardRevealDelay = totalPages > 0 ? (2 + totalPages * 3 + 1.8) : 2.5;
  const captionRetireDelay = cardRevealDelay + 0.5;
  const albumSceneFadeDelay = cardRevealDelay + 0.7;
  const dissolveVeilDelay = cardRevealDelay + 12.2;
  const baseUnderDelay = 2 + (totalPages - 1) * 3;

  const photoCorners = () => `
    <span class="photo-corner corner-tl"></span>
    <span class="photo-corner corner-tr"></span>
    <span class="photo-corner corner-bl"></span>
    <span class="photo-corner corner-br"></span>`;

  const leafFaces = (memory, index) => {
    const pageIndexStr = String(index + 1).padStart(2, '0');
    return `
    <div class="album-segment-face album-segment-front">
      <div class="album-leaf-front">
        <div class="album-paper-texture"></div>
        <div class="album-page-header">
          <span class="album-page-label">${groom.toUpperCase()} &amp; ${bride.toUpperCase()}</span>
          <span class="album-page-number">${pageIndexStr} / ${totalPagesStr}</span>
        </div>
        <figure class="album-photo-mount">
          <div class="album-photo-frame">
            <img src="${memory.photo}" alt="" decoding="async">
            <div class="album-photo-glare"></div>
            ${photoCorners()}
          </div>
          <figcaption>
            <span class="album-caption-title">${memory.caption}</span>
            <span class="album-caption-meta">${memory.date}</span>
          </figcaption>
        </figure>
        <span class="album-filigree">❦</span>
        <div class="album-under-shade" style="--under-delay: ${2 + index * 3}s;"></div>
        <div class="album-turn-shade"></div>
      </div>
    </div>
    <div class="album-segment-face album-segment-back">
      <div class="album-leaf-back">
        <div class="album-paper-texture"></div>
        <div class="album-back-clean">
          <div class="album-back-border">
            <img src="${monogram}" alt="" class="album-back-monogram" aria-hidden="true">
            <span class="album-back-brand">${groom} &amp; ${bride}</span>
            <span class="album-back-quote">✦ Kỷ niệm tình yêu ✦</span>
          </div>
        </div>
        <div class="album-turn-shade"></div>
      </div>
    </div>`;
  };

  const curlStrip = (memory, index, level = 0) => `
    <div class="album-paper-segment album-paper-strip album-strip-${level}">
      ${leafFaces(memory, index)}
      ${level < 3 ? curlStrip(memory, index, level + 1) : ''}
    </div>`;

  const wing = (side, includeBack = true) => `
    <div class="album-invitation-wing album-invitation-${side}">
      <div class="wing-face wing-front">
        <div class="wing-inner-crease"></div>
        <div class="wing-medallion"><img src="${monogram}" alt=""></div>
      </div>
      ${includeBack ? '<div class="wing-face wing-back"><div class="wing-back-border"></div></div>' : ''}
    </div>`;

  const album = document.createElement('div');
  album.className = 'album-opening';
  album.setAttribute('aria-hidden', 'true');

  const timingVars = {
    '--card-reveal-delay': `${cardRevealDelay}s`,
    '--card-retire-delay': `${cardRevealDelay}s`,
    '--caption-retire-delay': `${captionRetireDelay}s`,
    '--album-scene-fade-delay': `${albumSceneFadeDelay}s`,
    '--dissolve-veil-delay': `${dissolveVeilDelay}s`,
    '--total-album-pages': `${totalPages}`
  };

  const overlay = document.getElementById('envelope-overlay');
  for (const [key, value] of Object.entries(timingVars)) {
    document.documentElement.style.setProperty(key, value);
    if (overlay) overlay.style.setProperty(key, value);
    album.style.setProperty(key, value);
  }

  album.innerHTML = `
    <div class="album-eyebrow-wrap">
      <span class="album-badge-pill">KỶ NIỆM TÌNH YÊU</span>
      <p class="album-eyebrow">MỘT CHUYỆN TÌNH · MỘT ĐỜI BÊN NHAU</p>
    </div>
    <div class="album-camera">
      <div class="album-scene">
        <div class="album-table-shadow"></div>
        <div class="opening-album-book">
          <div class="album-page-block"></div>
          <div class="album-base">
            <div class="album-paper-texture"></div>
            <div class="album-ribbon-bookmark"></div>
            <div class="album-pocket-mount">
              <span class="album-base-seal-text">✦ Trân quý từng khoảnh khắc ✦</span>
            </div>
            <div class="album-mounted-card">
              <div class="album-flying-invitation">
                <div class="album-mounted-card-paper"></div>
                ${wing('left', false)}
                ${wing('right', false)}
                <div class="album-card-corners">${photoCorners()}</div>
              </div>
            </div>
            <div class="album-under-shade" style="--under-delay: ${baseUnderDelay}s;"></div>
          </div>
          ${memories.map((memory, index) => {
            const turnDelay = 2 + (index + 1) * 3;
            const underDelay = 2 + index * 3;
            const endDeg = (318 + ((index + 1) / totalPages) * 24).toFixed(1);
            const z0 = Math.max(1, Math.round(((totalPages - index) / totalPages) * 8) + 1);
            return `
            <div class="album-leaf album-leaf-${index + 1}" style="--z0: ${z0}px; --end: ${endDeg}deg; --turn-delay: ${turnDelay}s; --under-delay: ${underDelay}s;">
              <div class="album-paper-segment album-paper-upper">
                ${leafFaces(memory, index)}
              </div>
              ${curlStrip(memory, index)}
            </div>`;
          }).join('')}
          <div class="album-binding">
            ${Array.from({ length: 17 }, () => '<span class="album-ring"></span>').join('')}
          </div>
          <div class="album-leaf album-cover" style="--z0: 10px; --end: 318deg; --turn-delay: 2s;">
            <div class="album-leaf-front album-cover-front">
              <div class="album-leather-texture"></div>
              <div class="album-cover-border">
                <img src="${monogram}" alt="" class="album-cover-monogram">
                <span class="album-cover-badge">OUR LOVE STORY</span>
                <strong class="album-cover-title">
                  ${groom}<span class="album-cover-amp">&amp;</span>${bride}
                </strong>
                <div class="album-cover-divider"></div>
                <span class="album-cover-date">${weddingDate}</span>
              </div>
              <div class="album-cover-sheen"></div>
              <div class="album-turn-shade"></div>
            </div>
            <div class="album-leaf-back album-cover-back">
              <div class="album-paper-texture"></div>
              <img src="${ornament}" alt="" class="album-cover-back-ornament">
              <span class="album-cover-back-quote">“Hành trình của tình yêu và sự gắn kết trọn đời”</span>
              <span class="album-cover-back-names">${groom} &amp; ${bride}</span>
              <div class="album-turn-shade"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="album-card-slot">
        <div class="album-flying-invitation">
          <div class="album-invitation-core">
            <div class="invitation-gold-border"></div>
            <span class="invitation-kicker">TRÂN TRỌNG KÍNH MỜI</span>
            <img src="${monogram}" alt="" class="invitation-monogram">
            <div class="invitation-names-block">
              <strong>${groom}</strong><em>&amp;</em><strong>${bride}</strong>
            </div>
            <div class="invitation-date-pill"><span>${weddingDate}</span></div>
            <span class="invitation-subtext">Trân trọng báo tin vui</span>
          </div>
          ${wing('left')}
          ${wing('right')}
          <video id="album-invitation-video" class="album-invitation-video" data-src="assets/video/gemini_generated_video_b7de137a.mp4" playsinline muted preload="none"></video>
          <div class="album-card-corners">${photoCorners()}</div>
        </div>
      </div>
    </div>
    <div class="album-caption-wrap">
      <p class="album-opening-caption">Từng trang kỷ niệm, một lời hẹn trăm năm</p>
      <p class="album-speed-hint">Một lời mời, gửi trọn yêu thương</p>
    </div>`;

  mount.replaceWith(album);
})();
