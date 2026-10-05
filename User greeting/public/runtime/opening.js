
/* The opening controls work independently of WebGL and the animation bundle. */
window.SilkOpening = (() => {
  let scene;
  let state = 'closed';
  let finishOpening;
  return {
    get state() { return state; },
    setScene(value) {
      if (state !== 'closed') { value.dispose(); return; }
      scene = value;
    },
    init() {
      const overlay = document.getElementById('envelope-overlay');
      const open = document.getElementById('btn-open-envelope');
      const skip = document.getElementById('skip-opening');
      const wax = document.getElementById('flap-wax-seal');
      const envelope = document.getElementById('envelope-3d-box');
      const sceneElement = document.querySelector('.envelope-scene');
      const hero = document.getElementById('hero');
      const background = [...overlay.parentElement.children].filter(el =>
        el !== overlay && !['SCRIPT', 'NOSCRIPT', 'STYLE'].includes(el.tagName));
      background.forEach(el => { el.inert = true; });
      let timeout;
      const cues = [];
      const cardSlot = overlay.querySelector('.album-card-slot');
      const albumImages = [...overlay.querySelectorAll('.album-opening img')];
      const setStatus = text => { document.getElementById('opening-status').textContent = text; };
      const finish = (target = hero) => {
        if (state === 'opened') return;
        state = 'opened';
        clearTimeout(timeout);
        cues.forEach(clearTimeout);
        cardSlot?.removeEventListener('animationend', onFlightEnd);
        scene?.dispose();
        overlay.classList.add('opened');
        overlay.inert = true;
        overlay.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('invitation-locked', 'invitation-opening');
        document.documentElement.classList.remove('invitation-locked', 'invitation-opening');
        background.forEach(el => { el.inert = false; });
        hideBackground(false);
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
        target.scrollIntoView({ behavior: 'instant', block: 'start' });
        document.dispatchEvent(new Event('wedding:opened'));
      };
      finishOpening = finish;
      function onFlightEnd(event) {
        if (event.target === cardSlot && event.animationName === 'album-card-journey') finish();
      }
      function onFlightStart(event) {
        if (event.target === cardSlot && event.animationName === 'album-card-journey') {
          setStatus('Trân trọng kính mời đến dự lễ thành hôn Tuấn Anh và Hoàng Thúy, ngày 20 tháng 10 năm 2026.');
        }
      }
      // Giải mã ảnh ngay khi trang rảnh, để lúc chạm dấu không phải chờ
      const albumReady = Promise.allSettled(albumImages.map(img => img.decode()));
      const hideBackground = hidden => background.forEach(el => { el.style.visibility = hidden ? 'hidden' : ''; });
      // Lúc thiệp còn đóng (màn phủ đã che kín trang chính): ẩn trang chính và dựng sẵn album khi trình duyệt rảnh,
      // để từ lúc chạm dấu tới lúc lật không còn khung hình nào phải gánh việc nặng
      const prewarm = () => {
        if (state === 'opened' || overlay.classList.contains('is-album-prewarm')) return;
        hideBackground(true);
        overlay.classList.add('is-album-prewarm');
      };
      const idle = window.requestIdleCallback || (cb => setTimeout(cb, 200));
      albumReady.then(() => idle(prewarm, { timeout: 2000 }));
      const wait = ms => new Promise(resolve => cues.push(setTimeout(resolve, ms)));
      const start = async () => {
        if (state !== 'closed') return;
        state = 'opening';
        if (open) open.disabled = true;
        wax?.setAttribute('aria-disabled', 'true');
        document.body.classList.add('invitation-opening');
        setStatus('Album kỷ niệm đang mở, tiếp theo là lời mời dự lễ thành hôn.');
        window.weddingMusic?.play();
        if (matchMedia('(prefers-reduced-motion: reduce)').matches) return finish();
        scene?.dispose();
        scene = undefined;
        overlay.classList.add('is-album-opening');
        sceneElement.classList.add('is-opening', 'is-unsealing');
        cues.push(setTimeout(() => sceneElement.classList.add('is-flap-open'), 380));
        cues.push(setTimeout(() => sceneElement.classList.add('is-letter-rising'), 900));
        // Dự phòng nếu chưa kịp dựng sẵn lúc rảnh
        cues.push(setTimeout(prewarm, 300));
        // Album chỉ chạy khi ảnh đã giải mã (tối đa 3.5s) để không lật ra trang trống
        await Promise.all([wait(1700), Promise.race([albumReady, wait(3500)])]);
        if (state !== 'opening') return;
        cardSlot?.addEventListener('animationstart', onFlightStart);
        cardSlot?.addEventListener('animationend', onFlightEnd);
        overlay.classList.add('is-album-playing');
        if (document.documentElement.classList.contains('lite-motion')) {
          requestAnimationFrame(() => overlay.getAnimations({ subtree: true }).forEach(a => a.updatePlaybackRate(1.4)));
        }
        // Lưới an toàn nếu animationend không đến (tab bị ẩn, trình duyệt cũ)
        timeout = setTimeout(finish, 30000);
      };
      open?.addEventListener('click', start);
      skip?.addEventListener('click', () => finish());
      wax?.addEventListener('click', start);
      wax?.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          start();
        }
      });
      envelope?.addEventListener('click', event => {
        if (!event.target.closest('#flap-wax-seal')) start();
      });
      overlay.addEventListener('keydown', event => {
        if (event.key !== 'Tab') return;
        const focusable = [...overlay.querySelectorAll('button:not(:disabled),[tabindex="0"]')]
          .filter(el => el.getClientRects().length);
        const first = focusable[0];
        const last = focusable.at(-1);
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      });
      const hash = location.hash.slice(1);
      const target = hash && document.getElementById(hash);
      if (target) finish(target);
      else (open || wax)?.focus({ preventScroll: true });
    },
    skip() { finishOpening?.(); }
  };
})();
