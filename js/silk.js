import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function createOpeningMotion(atmosphere) {
  const scene = document.querySelector('.envelope-scene');
  const overlay = document.getElementById('envelope-overlay');
  let timeline;

  return {
    open(done) {
      timeline = gsap.timeline({ defaults: { ease: 'power2.inOut' } });
      timeline
        .call(() => scene.classList.add('is-opening', 'is-unsealing'))
        .call(() => scene.classList.add('is-flap-open'), [], 0.38)
        .call(() => scene.classList.add('is-letter-rising'), [], 1.05)
        .call(() => {
          scene.classList.add('is-portal');
          overlay.classList.add('is-transitioning');
        }, [], 2.02)
        .call(done, [], 2.92);
    },
    dispose() {
      timeline?.kill();
      atmosphere?.dispose();
    }
  };
}

function startGoldenPetals() {
  const canvas = document.getElementById('petals-canvas');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  if (!canvas || reduced.matches) return;
  const context = canvas.getContext('2d');
  const petals = [];
  let width = 0;
  let height = 0;
  let frame = 0;
  let last = 0;

  function resize() {
    const ratio = Math.min(devicePixelRatio, 1.5);
    width = innerWidth;
    height = innerHeight;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function reset(petal, initial = false) {
    petal.x = Math.random() * width;
    petal.y = initial ? Math.random() * height : -24;
    petal.size = 5 + Math.random() * 7;
    petal.speed = 0.25 + Math.random() * 0.45;
    petal.sway = Math.random() * Math.PI * 2;
    petal.spin = Math.random() * Math.PI * 2;
    petal.opacity = 0.14 + Math.random() * 0.2;
  }

  resize();
  for (let index = 0; index < (innerWidth < 768 ? 12 : 20); index++) {
    const petal = {};
    reset(petal, true);
    petals.push(petal);
  }

  function draw(now = 0) {
    if (document.hidden || reduced.matches) {
      frame = 0;
      return;
    }
    frame = requestAnimationFrame(draw);
    if (now - last < 33) return;
    last = now;
    context.clearRect(0, 0, width, height);
    petals.forEach((petal, index) => {
      petal.y += petal.speed;
      petal.sway += 0.008 + index * 0.00008;
      petal.spin += 0.015;
      petal.x += Math.sin(petal.sway) * 0.2;
      if (petal.y > height + 20) reset(petal);
      context.save();
      context.translate(petal.x, petal.y);
      context.rotate(petal.spin);
      context.scale(Math.cos(petal.spin), 1);
      context.globalAlpha = petal.opacity;
      context.fillStyle = index % 3 ? '#d4af55' : '#fff7e4';
      context.beginPath();
      context.moveTo(0, -petal.size);
      context.bezierCurveTo(petal.size, -petal.size / 2, petal.size, petal.size / 2, 0, petal.size);
      context.bezierCurveTo(-petal.size, petal.size / 2, -petal.size, -petal.size / 2, 0, -petal.size);
      context.fill();
      context.restore();
    });
  }

  addEventListener('resize', resize, { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && !frame && !reduced.matches) frame = requestAnimationFrame(draw);
  });
  frame = requestAnimationFrame(draw);
}

function addDepthInteraction() {
  const media = gsap.matchMedia();
  media.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
    const cards = document.querySelectorAll('.event-card, .family-card, .gallery-slide-card');
    const cleanups = [];
    cards.forEach(card => {
      const rotateX = gsap.quickTo(card, 'rotationX', { duration: 0.42, ease: 'power2.out' });
      const rotateY = gsap.quickTo(card, 'rotationY', { duration: 0.42, ease: 'power2.out' });
      const onMove = event => {
        const bounds = card.getBoundingClientRect();
        rotateX((0.5 - (event.clientY - bounds.top) / bounds.height) * 3.5);
        rotateY(((event.clientX - bounds.left) / bounds.width - 0.5) * 4.5);
      };
      const onLeave = () => { rotateX(0); rotateY(0); };
      card.addEventListener('pointermove', onMove);
      card.addEventListener('pointerleave', onLeave);
      cleanups.push(() => {
        card.removeEventListener('pointermove', onMove);
        card.removeEventListener('pointerleave', onLeave);
        gsap.set(card, { clearProps: 'rotationX,rotationY' });
      });
    });

    return () => cleanups.forEach(cleanup => cleanup());
  });
}

function setupCinematicScroll() {
  const media = gsap.matchMedia();
  const sceneSelectors = ['#hero', '#family', '#events', '#story', '#memory-film', '#gallery', '#rsvp', '#guestbook'];
  sceneSelectors.forEach(selector => document.querySelector(selector)?.classList.add('cinematic-scene'));

  const reveal = (targets, trigger, from, options = {}) => {
    if (!document.querySelector(targets)) return null;
    return gsap.fromTo(targets, {
      transformPerspective: 1400,
      transformOrigin: '50% 50%',
      opacity: 0.28,
      ...from
    }, {
      x: 0,
      y: 0,
      z: 0,
      rotationX: 0,
      rotationY: 0,
      rotationZ: 0,
      scale: 1,
      opacity: 1,
      stagger: options.stagger || 0,
      ease: 'none',
      scrollTrigger: {
        trigger,
        start: options.start || 'top 90%',
        end: options.end || 'top 34%',
        scrub: options.scrub || 0.65,
        invalidateOnRefresh: true
      }
    });
  };

  media.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
    document.documentElement.dataset.cinematicScroll = 'true';

    const heroTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.8,
        invalidateOnRefresh: true
      }
    });
    heroTimeline
      .to('.hero-copy', { y: -52, z: -95, opacity: 0.38, ease: 'none' }, 0)
      .to('.hero-photo-wrapper', { y: 32, z: 105, rotationY: -3.8, rotationX: 1.6, scale: 1.035, ease: 'none' }, 0)
      .to('.countdown-box', { y: 62, z: 72, rotationX: -2.2, ease: 'none' }, 0);

    reveal('#family .invitation-intro-card > .section-subtitle, #family .invitation-intro-card > .section-title, #family .invitation-intro-card > .ornament-divider, #family .intro-lead-text', '#family',
      { y: 62, z: -115, rotationX: 7 }, { stagger: 0.035, start: 'top 92%', end: 'top 42%' });
    reveal('#family .family-card', '#family .families-grid',
      { y: 82, z: -145, rotationY: 7.5, rotationX: 2.5 }, { stagger: 0.08, start: 'top 92%', end: 'top 38%' });

    reveal('#events .section-title-wrap', '#events',
      { y: 64, z: -125, rotationX: 8 }, { start: 'top 92%', end: 'top 48%' });
    reveal('#events .event-card', '#events .events-grid',
      { y: 92, z: -175, rotationX: 8.5, scale: 0.94 }, { stagger: 0.09, start: 'top 90%', end: 'top 26%', scrub: 0.8 });

    document.querySelectorAll('#story .timeline-item').forEach((item, index) => {
      gsap.fromTo(item, {
        x: index % 2 ? 72 : -72,
        y: 42,
        z: -145,
        rotationY: index % 2 ? -8 : 8,
        opacity: 0.24,
        transformPerspective: 1500,
        transformOrigin: index % 2 ? '100% 50%' : '0% 50%'
      }, {
        x: 0,
        y: 0,
        z: 0,
        rotationY: 0,
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: item,
          start: 'top 92%',
          end: 'top 43%',
          scrub: 0.7,
          invalidateOnRefresh: true
        }
      });
    });

    reveal('#memory-film .memory-film-copy', '#memory-film',
      { x: -82, z: -135, rotationY: 7 }, { start: 'top 90%', end: 'top 36%' });
    reveal('#memory-film .memory-film-player', '#memory-film',
      { x: 88, z: -180, rotationY: -8, scale: 0.94 }, { start: 'top 86%', end: 'top 30%', scrub: 0.8 });

    reveal('#gallery .section-title-wrap', '#gallery',
      { y: 58, z: -105, rotationX: 6 }, { start: 'top 92%', end: 'top 50%' });
    reveal('#gallery .gallery-slide-card', '#gallery .gallery-slider-wrapper',
      { y: 76, z: -190, rotationY: 9, scale: 0.9 }, { stagger: 0.055, start: 'top 94%', end: 'top 28%', scrub: 0.85 });

    reveal('#rsvp .section-title-wrap', '#rsvp',
      { y: 52, z: -105, rotationX: 6 }, { start: 'top 92%', end: 'top 52%' });
    reveal('#rsvp .rsvp-wrapper', '#rsvp .rsvp-wrapper',
      { y: 92, z: -190, rotationX: 8.5, scale: 0.955 }, { start: 'top 94%', end: 'top 28%', scrub: 0.8 });
    reveal('#guestbook .section-title-wrap, #guestbook .wish-item', '#guestbook',
      { y: 70, z: -120, rotationX: 6 }, { stagger: 0.045, start: 'top 92%', end: 'top 32%' });
    reveal('.footer .footer-thank-you, .footer .footer-names, .footer .footer-quote', '.footer',
      { y: 72, z: -130, rotationX: 7, scale: 0.95 }, { stagger: 0.045, start: 'top 94%', end: 'top 44%' });
  });

  media.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
    document.documentElement.dataset.cinematicScroll = 'true';
    const targets = [
      '#family .invitation-intro-card',
      '#events .event-card',
      '#story .timeline-item',
      '#memory-film .memory-film-copy',
      '#memory-film .memory-film-player',
      '#gallery .section-title-wrap',
      '#gallery .gallery-slider-wrapper',
      '#rsvp .section-title-wrap',
      '#rsvp .rsvp-wrapper',
      '#guestbook .wish-item',
      '.footer .footer-thank-you'
    ];
    targets.forEach(selector => {
      document.querySelectorAll(selector).forEach(element => {
        gsap.fromTo(element, { y: 28, scale: 0.985, opacity: 0.5 }, {
          y: 0,
          scale: 1,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start: 'top 94%',
            end: 'top 69%',
            scrub: 0.35,
            invalidateOnRefresh: true
          }
        });
      });
    });

    gsap.to('.hero-photo-wrapper', {
      y: -12,
      ease: 'none',
      scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 0.45 }
    });
  });

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.dataset.cinematicScroll = 'reduced';
  }
}

async function initSilk() {
  if (!document.documentElement.dataset.weddingReady) {
    await new Promise(resolve => document.addEventListener('wedding:ready', resolve, { once: true }));
  }

  let atmosphere;
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    try {
      const { createEnvelopeAtmosphere } = await import('./silk-scene.js');
      atmosphere = createEnvelopeAtmosphere(document.getElementById('silk-stage'));
    } catch (error) {
      console.info('Không tải được lớp ánh sáng 3D, thiệp vẫn dùng chuyển động gốc.', error.message);
    }
  }

  window.SilkOpening.setScene(createOpeningMotion(atmosphere));
  startGoldenPetals();
  addDepthInteraction();
  setupCinematicScroll();
  document.addEventListener('wedding:opened', () => {
    ScrollTrigger.refresh();
    requestAnimationFrame(() => ScrollTrigger.update());
  });
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
  addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) gsap.globalTimeline.pause();
    else gsap.globalTimeline.resume();
  });
  document.documentElement.dataset.silkReady = 'true';
}

initSilk().catch(error => console.info('Thiệp dùng chuyển động dự phòng.', error.message));
