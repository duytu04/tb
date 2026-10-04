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
      const hero = document.getElementById('hero');
      const background = [...document.body.children].filter(el =>
        el !== overlay && !['SCRIPT', 'NOSCRIPT', 'STYLE'].includes(el.tagName));
      background.forEach(el => { el.inert = true; });
      let timeout;
      const finish = (target = hero) => {
        if (state === 'opened') return;
        state = 'opened';
        clearTimeout(timeout);
        scene?.dispose();
        overlay.classList.add('opened');
        overlay.inert = true;
        overlay.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('invitation-locked', 'invitation-opening');
        document.documentElement.classList.remove('invitation-locked', 'invitation-opening');
        background.forEach(el => { el.inert = false; });
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
        target.scrollIntoView({ behavior: 'instant', block: 'start' });
        document.dispatchEvent(new Event('wedding:opened'));
      };
      finishOpening = finish;
      const start = () => {
        if (state !== 'closed') return;
        state = 'opening';
        open.disabled = true;
        document.body.classList.add('invitation-opening');
        document.getElementById('opening-status').textContent = 'Đang mở lời hẹn ước.';
        window.weddingMusic?.play();
        if (matchMedia('(prefers-reduced-motion: reduce)').matches) return finish();
        timeout = setTimeout(finish, 3400);
        if (scene) {
          try { scene.open(finish); } catch { finish(); }
        } else {
          overlay.classList.add('silk-fallback-opening');
          timeout = setTimeout(finish, 800);
        }
      };
      open.addEventListener('click', start);
      skip.addEventListener('click', () => finish());
      document.getElementById('flap-wax-seal')?.addEventListener('click', start);
      overlay.addEventListener('keydown', event => {
        if (event.key === 'Escape') { event.preventDefault(); finish(); }
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
      else open.focus({ preventScroll: true });
    },
    skip() { finishOpening?.(); }
  };
})();
