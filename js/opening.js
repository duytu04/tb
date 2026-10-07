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
      if (!overlay) return;

      const open = document.getElementById('btn-open-envelope');
      const wax = document.getElementById('flap-wax-seal');
      const envelope = document.getElementById('envelope-3d-box');
      const sceneElement = document.querySelector('.envelope-scene');
      const hero = document.getElementById('hero');
      const background = [...overlay.parentElement.children].filter(element =>
        element !== overlay && !['SCRIPT', 'NOSCRIPT', 'STYLE'].includes(element.tagName));
      const cardSlot = overlay.querySelector('.album-card-slot');
      const albumImages = [...overlay.querySelectorAll('.album-opening img')];
      const cues = [];
      let timeout;

      background.forEach(element => { element.inert = true; });

      const setStatus = (text) => {
        const status = document.getElementById('opening-status');
        if (status) status.textContent = text;
      };
      const hideBackground = hidden => background.forEach(element => {
        element.style.visibility = hidden ? 'hidden' : '';
      });
      const invitationAnnouncement = () => {
        const config = window.WEDDING_CONFIG || {};
        const groom = config.groom?.name || 'Tuấn Anh';
        const bride = config.bride?.name || 'Hoàng Thúy';
        const date = config.weddingDate?.fullDateText || 'ngày 20 tháng 10 năm 2026';
        return `Trân trọng kính mời đến dự lễ thành hôn ${groom} và ${bride}, ${date}.`;
      };

      const finish = (target = hero) => {
        if (state === 'opened') return;
        state = 'opened';
        clearTimeout(timeout);
        cues.forEach(clearTimeout);
        cardSlot?.removeEventListener('animationstart', onFlightStart);
        cardSlot?.removeEventListener('animationend', onFlightEnd);
        scene?.dispose();
        overlay.classList.add('opened');
        overlay.inert = true;
        overlay.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('invitation-locked', 'invitation-opening');
        document.documentElement.classList.remove('invitation-locked', 'invitation-opening');
        background.forEach(element => { element.inert = false; });
        hideBackground(false);
        if (target) {
          target.setAttribute('tabindex', '-1');
          target.focus({ preventScroll: true });
          target.scrollIntoView({ behavior: 'instant', block: 'start' });
        }
        document.dispatchEvent(new Event('wedding:opened'));
      };
      finishOpening = finish;

      function onFlightEnd(event) {
        if (event.target === cardSlot && event.animationName === 'album-card-journey') finish();
      }

      function onFlightStart(event) {
        if (event.target === cardSlot && event.animationName === 'album-card-journey') {
          setStatus(invitationAnnouncement());
        }
      }

      const albumReady = Promise.allSettled(albumImages.map(image =>
        typeof image.decode === 'function' ? image.decode() : Promise.resolve()
      ));
      const prewarm = () => {
        if (state === 'opened' || overlay.classList.contains('is-album-prewarm')) return;
        hideBackground(true);
        overlay.classList.add('is-album-prewarm');
      };
      const idle = window.requestIdleCallback || (callback => setTimeout(callback, 200));
      albumReady.then(() => idle(prewarm, { timeout: 2000 }));
      const wait = milliseconds => new Promise(resolve => cues.push(setTimeout(resolve, milliseconds)));

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
        sceneElement?.classList.add('is-opening', 'is-unsealing');
        cues.push(setTimeout(() => sceneElement?.classList.add('is-flap-open'), 380));
        cues.push(setTimeout(() => sceneElement?.classList.add('is-letter-rising'), 900));
        cues.push(setTimeout(prewarm, 300));

        await Promise.all([wait(1700), Promise.race([albumReady, wait(3500)])]);
        if (state !== 'opening') return;
        cardSlot?.addEventListener('animationstart', onFlightStart);
        cardSlot?.addEventListener('animationend', onFlightEnd);
        overlay.classList.add('is-album-playing');
        if (document.documentElement.classList.contains('lite-motion')) {
          requestAnimationFrame(() => overlay.getAnimations({ subtree: true })
            .forEach(animation => animation.updatePlaybackRate(1.4)));
        }
        timeout = setTimeout(finish, 30000);
      };

      open?.addEventListener('click', start);
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
        if (event.key === 'Escape') {
          event.preventDefault();
          finish();
          return;
        }
        if (event.key !== 'Tab') return;

        const focusable = [...overlay.querySelectorAll('button:not(:disabled),[tabindex="0"]')]
          .filter(element => element.getClientRects().length);
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable.at(-1);
        if (!overlay.contains(document.activeElement)) {
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

      const hash = location.hash.slice(1);
      const target = hash && document.getElementById(hash);
      if (target) finish(target);
      else (open || wax)?.focus({ preventScroll: true });
    },
    skip() { finishOpening?.(); }
  };
})();
