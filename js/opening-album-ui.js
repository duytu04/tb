/* Builds the decorative opening album from the existing wedding configuration. */
(() => {
  const mount = document.getElementById('opening-album-root');
  if (!mount) return;

  const config = window.WEDDING_CONFIG || {};
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
  const fallbackPhotos = Array.from(
    { length: 6 },
    (_, index) => `assets/images/gallery_1791131928_${index}.webp`
  );
  const photos = fallbackPhotos.map((fallback, index) =>
    escapeHtml(config.gallery?.[index]?.src || fallback)
  );
  const memories = [
    {
      photo: photos[0],
      caption: 'Ngày mình có nhau',
      date: 'Tháng 10 · Khởi đầu duyên nợ'
    },
    {
      photo: photos[1],
      caption: 'Thương nhau một đời',
      date: 'Bình yên những sớm mai'
    },
    {
      photo: photos[2],
      caption: 'Và hôm nay, chung đôi',
      date: 'Khoảnh khắc trọn vẹn'
    }
  ];

  const photoCorners = () => `
    <span class="photo-corner corner-tl"></span>
    <span class="photo-corner corner-tr"></span>
    <span class="photo-corner corner-bl"></span>
    <span class="photo-corner corner-br"></span>`;

  const leafFaces = (memory, index) => `
    <div class="album-segment-face album-segment-front">
      <div class="album-leaf-front">
        <div class="album-paper-texture"></div>
        <div class="album-page-header">
          <span class="album-page-label">${groom.toUpperCase()} &amp; ${bride.toUpperCase()}</span>
          <span class="album-page-number">0${index + 1} / 03</span>
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
        <div class="album-under-shade"></div>
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
            <div class="album-under-shade"></div>
          </div>
          ${memories.map((memory, index) => `
            <div class="album-leaf album-leaf-${index + 1}">
              <div class="album-paper-segment album-paper-upper">
                ${leafFaces(memory, index)}
              </div>
              ${curlStrip(memory, index)}
            </div>`).join('')}
          <div class="album-binding">
            ${Array.from({ length: 17 }, () => '<span class="album-ring"></span>').join('')}
          </div>
          <div class="album-leaf album-cover">
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
          <video id="album-invitation-video" class="album-invitation-video" src="assets/video/gemini_generated_video_b7de137a.mp4" playsinline muted preload="auto"></video>
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
