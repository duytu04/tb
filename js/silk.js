import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function createOpeningMotion(atmosphere) {
  const scene = document.querySelector('.envelope-scene');
  const overlay = document.getElementById('envelope-overlay');
  let timeline;

  return {
    open(done) {
      atmosphere?.burst?.();
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
  let lastScrollY = window.scrollY;
  let scrollVelocity = 0;

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
    petal.y = initial ? Math.random() * height : -26;
    petal.size = 5.5 + Math.random() * 6.5;
    petal.speed = 0.28 + Math.random() * 0.42;
    petal.sway = Math.random() * Math.PI * 2;
    petal.swaySpeed = 0.008 + Math.random() * 0.006;
    petal.spin = Math.random() * Math.PI * 2;
    petal.spinSpeed = 0.012 + Math.random() * 0.01;
    petal.opacity = 0.16 + Math.random() * 0.22;
    petal.colorType = Math.floor(Math.random() * 5);
    petal.flower = Math.random() < 0.22;
    if (petal.flower) {
      petal.size = 7 + Math.random() * 5;
      petal.speed *= 0.8;
      petal.spinSpeed *= 0.45;
      petal.opacity = 0.26 + Math.random() * 0.2;
    }
  }

  resize();
  const count = innerWidth < 768 ? 20 : 22;
  for (let index = 0; index < count; index++) {
    const petal = {};
    reset(petal, true);
    petals.push(petal);
  }

  // Smooth scroll and touch tracking to add subtle upward air current when scrolling/swiping
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    scrollVelocity = Math.max(-2, Math.min(2, (currentScrollY - lastScrollY) * 0.04));
    lastScrollY = currentScrollY;
  }, { passive: true });

  let lastTouchY = 0;
  window.addEventListener('touchstart', event => {
    if (event.touches?.length) lastTouchY = event.touches[0].clientY;
  }, { passive: true });

  window.addEventListener('touchmove', event => {
    if (event.touches?.length) {
      const diff = event.touches[0].clientY - lastTouchY;
      scrollVelocity = Math.max(-2.5, Math.min(2.5, -diff * 0.08));
      lastTouchY = event.touches[0].clientY;
    }
  }, { passive: true });

  const PETAL_COLORS = ['#E5C478', '#D4AF37', '#C5A059', '#F2C6C2', '#EBB3AE'];

  // Bông hoa 5 cánh: cánh hồng phấn, nhụy vàng
  function drawFlower(petal) {
    const size = petal.size;
    context.fillStyle = PETAL_COLORS[3 + (petal.colorType % 2)];
    for (let k = 0; k < 5; k++) {
      context.rotate((Math.PI * 2) / 5);
      context.beginPath();
      context.moveTo(0, 0);
      context.bezierCurveTo(size * 0.55, -size * 0.25, size * 0.5, -size * 0.95, 0, -size * 0.82);
      context.bezierCurveTo(-size * 0.5, -size * 0.95, -size * 0.55, -size * 0.25, 0, 0);
      context.fill();
    }
    context.fillStyle = '#D4AF37';
    context.beginPath();
    context.arc(0, 0, size * 0.2, 0, Math.PI * 2);
    context.fill();
  }

  function draw(now = 0) {
    if (document.hidden || reduced.matches) {
      frame = 0;
      return;
    }
    frame = requestAnimationFrame(draw);
    if (now - last < 30) return;
    last = now;

    // Decay scroll velocity gradually
    scrollVelocity *= 0.92;

    context.clearRect(0, 0, width, height);

    petals.forEach(petal => {
      petal.y += petal.speed + scrollVelocity * 0.25;
      petal.sway += petal.swaySpeed;
      petal.spin += petal.spinSpeed;
      petal.x += Math.sin(petal.sway) * 0.35;

      if (petal.y > height + 25) reset(petal);
      if (petal.y < -30) petal.y = height + 10;

      context.save();
      context.translate(petal.x, petal.y);
      context.rotate(petal.spin);

      if (petal.flower) {
        context.scale(1, Math.sin(petal.sway) * 0.18 + 0.82);
        context.globalAlpha = petal.opacity;
        drawFlower(petal);
        context.restore();
      } else {
        context.scale(Math.cos(petal.spin), Math.sin(petal.sway) * 0.35 + 0.65);
        context.globalAlpha = petal.opacity;
        context.fillStyle = PETAL_COLORS[petal.colorType];
        context.beginPath();
        context.moveTo(0, -petal.size);
        context.bezierCurveTo(petal.size * 0.95, -petal.size * 0.45, petal.size * 0.95, petal.size * 0.5, 0, petal.size);
        context.bezierCurveTo(-petal.size * 0.95, petal.size * 0.5, -petal.size * 0.95, -petal.size * 0.45, 0, -petal.size);
        context.fill();
        context.restore();
      }
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
  // Desktop mouse hover 3D tilt
  media.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
    const cards = document.querySelectorAll('.event-card, .family-card, .gallery-slide-card');
    const cleanups = [];
    cards.forEach(card => {
      const rotateX = gsap.quickTo(card, 'rotationX', { duration: 0.42, ease: 'power2.out' });
      const rotateY = gsap.quickTo(card, 'rotationY', { duration: 0.42, ease: 'power2.out' });
      const onMove = event => {
        const bounds = card.getBoundingClientRect();
        rotateX((0.5 - (event.clientY - bounds.top) / bounds.height) * 4.2);
        rotateY(((event.clientX - bounds.left) / bounds.width - 0.5) * 5.2);
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

  // Mobile tactile spring-back feel on touch
  media.add('(hover: none) and (pointer: coarse) and (prefers-reduced-motion: no-preference)', () => {
    const cards = document.querySelectorAll('.event-card, .family-card');
    const cleanups = [];
    cards.forEach(card => {
      const onTouchStart = () => {
        gsap.to(card, { scale: 0.982, duration: 0.18, ease: 'power2.out' });
      };
      const onTouchEnd = () => {
        gsap.to(card, { scale: 1, duration: 0.32, ease: 'back.out(1.4)' });
      };
      card.addEventListener('touchstart', onTouchStart, { passive: true });
      card.addEventListener('touchend', onTouchEnd, { passive: true });
      card.addEventListener('touchcancel', onTouchEnd, { passive: true });
      cleanups.push(() => {
        card.removeEventListener('touchstart', onTouchStart);
        card.removeEventListener('touchend', onTouchEnd);
        card.removeEventListener('touchcancel', onTouchEnd);
        gsap.set(card, { clearProps: 'scale' });
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
      ...from
    }, {
      x: 0,
      y: 0,
      z: 0,
      rotationX: 0,
      rotationY: 0,
      rotationZ: 0,
      scale: 1,
      stagger: options.stagger || 0,
      ease: 'none',
      scrollTrigger: {
        trigger,
        start: options.start || 'top 95%',
        end: options.end || 'top 45%',
        scrub: 0.15,
        invalidateOnRefresh: true
      }
    });
  };

  media.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
    document.documentElement.dataset.cinematicScroll = 'true';

    // 1. HERO 3D PARALLAX CAMERA
    const heroTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.2,
        invalidateOnRefresh: true
      }
    });
    heroTimeline
      .to('.hero-copy', { y: -36, z: -80, ease: 'none' }, 0)
      .to('.hero-photo-wrapper', { y: 28, z: 90, rotationY: -3, rotationX: 1.5, scale: 1.03, ease: 'none' }, 0)
      .to('.countdown-box', { y: 48, z: 60, rotationX: -1.8, ease: 'none' }, 0);

    // 2. FAMILY SECTION - 3D GATEWAY
    reveal('#family .invitation-intro-card > .section-subtitle, #family .invitation-intro-card > .section-title, #family .invitation-intro-card > .ornament-divider, #family .intro-lead-text', '#family',
      { y: 62, z: -115, rotationX: 7 }, { stagger: 0.035, start: 'top 95%', end: 'top 45%' });
    reveal('#family .family-card', '#family .families-grid',
      { y: 82, z: -145, rotationY: 7.5, rotationX: 2.5 }, { stagger: 0.08, start: 'top 95%', end: 'top 42%' });

    // 3. EVENTS SECTION - ISOMETRIC SHIFT
    reveal('#events .section-title-wrap', '#events',
      { y: 64, z: -125, rotationX: 8 }, { start: 'top 95%', end: 'top 50%' });
    reveal('#events .event-card', '#events .events-grid',
      { y: 92, z: -175, rotationX: 8.5, scale: 0.94 }, { stagger: 0.09, start: 'top 95%', end: 'top 35%' });

    // 4. LOVE STORY TIMELINE - 3D FILM STRIP RIBBON
    document.querySelectorAll('#story .timeline-item').forEach((item, index) => {
      gsap.fromTo(item, {
        x: index % 2 ? 60 : -60,
        y: 36,
        z: -120,
        rotationY: index % 2 ? -6 : 6,
        transformPerspective: 1500,
        transformOrigin: index % 2 ? '100% 50%' : '0% 50%'
      }, {
        x: 0,
        y: 0,
        z: 0,
        rotationY: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: item,
          start: 'top 95%',
          end: 'top 50%',
          scrub: 0.15,
          toggleClass: 'is-focused',
          invalidateOnRefresh: true
        }
      });
    });

    // 5. MEMORY FILM - CINEMATIC APERTURE REVEAL
    reveal('#memory-film .memory-film-copy', '#memory-film',
      { x: -70, z: -110, rotationY: 6 }, { start: 'top 95%', end: 'top 45%' });
    reveal('#memory-film .memory-film-player', '#memory-film',
      { x: 70, z: -140, rotationY: -6, scale: 0.95 }, { start: 'top 95%', end: 'top 40%' });

    // 6. PHOTO GALLERY - CURVED 3D EXHIBITION
    reveal('#gallery .section-title-wrap', '#gallery',
      { y: 50, z: -90, rotationX: 5 }, { start: 'top 95%', end: 'top 55%' });
    reveal('#gallery .gallery-slide-card', '#gallery .gallery-slider-wrapper',
      { y: 60, z: -140, rotationY: 7, scale: 0.93 }, { stagger: 0.04, start: 'top 95%', end: 'top 35%' });

    // 7. RSVP & GUESTBOOK & FOOTER
    reveal('#rsvp .section-title-wrap', '#rsvp',
      { y: 45, z: -90, rotationX: 5 }, { start: 'top 95%', end: 'top 55%' });
    reveal('#rsvp .rsvp-wrapper', '#rsvp .rsvp-wrapper',
      { y: 70, z: -140, rotationX: 7, scale: 0.96 }, { start: 'top 95%', end: 'top 35%' });
    reveal('#guestbook .section-title-wrap, #guestbook .wish-item', '#guestbook',
      { y: 55, z: -100, rotationX: 5 }, { stagger: 0.04, start: 'top 95%', end: 'top 40%' });
    reveal('.footer .footer-thank-you, .footer .footer-names, .footer .footer-quote', '.footer',
      { y: 55, z: -100, rotationX: 5, scale: 0.96 }, { stagger: 0.04, start: 'top 95%', end: 'top 50%' });
  });

  media.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
    document.documentElement.dataset.cinematicScroll = 'true';

    // 1. Mobile Hero Parallax & 3D Float
    const mobileHero = gsap.timeline({
      scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 0.15 }
    });
    mobileHero
      .to('.hero-copy', { y: -20, ease: 'none' }, 0)
      .to('.hero-photo-wrapper', { y: 16, scale: 1.025, rotationX: 1.8, ease: 'none' }, 0)
      .to('.countdown-box', { y: 22, scale: 0.98, ease: 'none' }, 0);

    // 2. Helper for Mobile 3D Perspective Reveal (instant visibility, zero flicker)
    const revealMobile = (selector, triggerSelector, fromOptions, scrollOpts = {}) => {
      document.querySelectorAll(selector).forEach(element => {
        gsap.fromTo(element, {
          transformPerspective: 1100,
          transformOrigin: '50% 50%',
          ...fromOptions
        }, {
          x: 0,
          y: 0,
          z: 0,
          rotationX: 0,
          rotationY: 0,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: triggerSelector || element,
            start: scrollOpts.start || 'top 95%',
            end: scrollOpts.end || 'top 65%',
            scrub: 0.15,
            invalidateOnRefresh: true
          }
        });
      });
    };

    // Family Cards 3D Entrance
    revealMobile('#family .family-card', '#family .families-grid',
      { y: 38, rotationX: 5, scale: 0.96 });

    // Events Cards 3D Elevation
    revealMobile('#events .event-card', '#events .events-grid',
      { y: 40, rotationX: 5.5, scale: 0.95 });

    // Story Timeline 3D Milestone Ribbon
    document.querySelectorAll('#story .timeline-item').forEach(item => {
      gsap.fromTo(item, {
        transformPerspective: 1100,
        transformOrigin: '50% 50%',
        y: 32,
        rotationX: 4,
        scale: 0.96
      }, {
        y: 0,
        rotationX: 0,
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: item,
          start: 'top 95%',
          end: 'top 65%',
          scrub: 0.15,
          toggleClass: 'is-focused',
          invalidateOnRefresh: true
        }
      });
    });

    // Memory Film Player 3D Cinema Widescreen Expand
    revealMobile('#memory-film .memory-film-player', '#memory-film',
      { y: 36, rotationX: 5, scale: 0.95 });

    // Gallery Slider 3D Presentation
    revealMobile('#gallery .gallery-slider-wrapper', '#gallery',
      { y: 32, rotationX: 4, scale: 0.96 });

    // RSVP & Guestbook & Footer 3D Lift
    revealMobile('#rsvp .rsvp-wrapper', '#rsvp',
      { y: 30, rotationX: 3.5, scale: 0.97 });
    revealMobile('#guestbook .wish-item', '#guestbook',
      { y: 24, rotationX: 3, scale: 0.97 });
    revealMobile('.footer .footer-thank-you', '.footer',
      { y: 22, rotationX: 3, scale: 0.97 });

    // Section Titles Soft Elevation
    const titleTargets = [
      '#family .invitation-intro-card',
      '#events .section-title-wrap',
      '#story .section-title-wrap',
      '#memory-film .memory-film-copy',
      '#gallery .section-title-wrap',
      '#rsvp .section-title-wrap',
      '#guestbook .section-title-wrap'
    ];
    titleTargets.forEach(selector => {
      document.querySelectorAll(selector).forEach(element => {
        gsap.fromTo(element, { y: 18 }, {
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start: 'top 95%',
            end: 'top 75%',
            scrub: 0.15,
            invalidateOnRefresh: true
          }
        });
      });
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
