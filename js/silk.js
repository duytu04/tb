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
    petal.colorType = Math.floor(Math.random() * 3);
  }

  resize();
  const count = innerWidth < 768 ? 14 : 22;
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
      // Realistic 3D leaf flutter along both X and Y axes
      context.scale(Math.cos(petal.spin), Math.sin(petal.sway) * 0.35 + 0.65);
      context.globalAlpha = petal.opacity;

      // Soft metallic gold gradient
      const grad = context.createLinearGradient(0, -petal.size, 0, petal.size);
      if (petal.colorType === 0) {
        grad.addColorStop(0, '#FFE8B3');
        grad.addColorStop(0.5, '#D4AF37');
        grad.addColorStop(1, '#B38B29');
      } else if (petal.colorType === 1) {
        grad.addColorStop(0, '#FFFDF5');
        grad.addColorStop(0.7, '#E5C478');
        grad.addColorStop(1, '#C5A059');
      } else {
        grad.addColorStop(0, '#FFEFCC');
        grad.addColorStop(1, '#D8A843');
      }

      context.fillStyle = grad;
      context.beginPath();
      context.moveTo(0, -petal.size);
      context.bezierCurveTo(petal.size * 0.95, -petal.size * 0.45, petal.size * 0.95, petal.size * 0.5, 0, petal.size);
      context.bezierCurveTo(-petal.size * 0.95, petal.size * 0.5, -petal.size * 0.95, -petal.size * 0.45, 0, -petal.size);
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

    // 1. HERO 3D PARALLAX CAMERA
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
      .to('.hero-copy', { y: -54, z: -100, opacity: 0.36, ease: 'none' }, 0)
      .to('.hero-photo-wrapper', { y: 34, z: 110, rotationY: -3.8, rotationX: 1.8, scale: 1.038, ease: 'none' }, 0)
      .to('.countdown-box', { y: 64, z: 75, rotationX: -2.4, ease: 'none' }, 0);

    // 2. FAMILY SECTION - 3D GATEWAY
    reveal('#family .invitation-intro-card > .section-subtitle, #family .invitation-intro-card > .section-title, #family .invitation-intro-card > .ornament-divider, #family .intro-lead-text', '#family',
      { y: 62, z: -115, rotationX: 7 }, { stagger: 0.035, start: 'top 92%', end: 'top 42%' });
    reveal('#family .family-card', '#family .families-grid',
      { y: 82, z: -145, rotationY: 7.5, rotationX: 2.5 }, { stagger: 0.08, start: 'top 92%', end: 'top 38%' });

    // 3. EVENTS SECTION - ISOMETRIC SHIFT
    reveal('#events .section-title-wrap', '#events',
      { y: 64, z: -125, rotationX: 8 }, { start: 'top 92%', end: 'top 48%' });
    reveal('#events .event-card', '#events .events-grid',
      { y: 92, z: -175, rotationX: 8.5, scale: 0.94 }, { stagger: 0.09, start: 'top 90%', end: 'top 26%', scrub: 0.8 });

    // 4. LOVE STORY TIMELINE - 3D FILM STRIP RIBBON
    document.querySelectorAll('#story .timeline-item').forEach((item, index) => {
      gsap.fromTo(item, {
        x: index % 2 ? 74 : -74,
        y: 44,
        z: -145,
        rotationY: index % 2 ? -8 : 8,
        opacity: 0.22,
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
          toggleClass: 'is-focused',
          invalidateOnRefresh: true
        }
      });
    });

    // 5. MEMORY FILM - CINEMATIC APERTURE REVEAL
    reveal('#memory-film .memory-film-copy', '#memory-film',
      { x: -84, z: -135, rotationY: 7 }, { start: 'top 90%', end: 'top 36%' });
    reveal('#memory-film .memory-film-player', '#memory-film',
      { x: 88, z: -180, rotationY: -8, scale: 0.94 }, { start: 'top 86%', end: 'top 30%', scrub: 0.8 });

    // 6. PHOTO GALLERY - CURVED 3D EXHIBITION
    reveal('#gallery .section-title-wrap', '#gallery',
      { y: 58, z: -105, rotationX: 6 }, { start: 'top 92%', end: 'top 50%' });
    reveal('#gallery .gallery-slide-card', '#gallery .gallery-slider-wrapper',
      { y: 76, z: -190, rotationY: 9, scale: 0.9 }, { stagger: 0.055, start: 'top 94%', end: 'top 28%', scrub: 0.85 });

    // 7. RSVP & GUESTBOOK & FOOTER
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

    // 1. Mobile Hero Parallax & 3D Float
    const mobileHero = gsap.timeline({
      scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 0.5 }
    });
    mobileHero
      .to('.hero-copy', { y: -36, opacity: 0.34, ease: 'none' }, 0)
      .to('.hero-photo-wrapper', { y: 28, scale: 1.045, rotationX: 2.8, ease: 'none' }, 0)
      .to('.countdown-box', { y: 38, scale: 0.965, ease: 'none' }, 0);

    // 2. Helper for Mobile 3D Perspective Reveal (vertical rotationX avoids any horizontal overflow)
    const revealMobile = (selector, triggerSelector, fromOptions, scrollOpts = {}) => {
      document.querySelectorAll(selector).forEach(element => {
        gsap.fromTo(element, {
          transformPerspective: 1100,
          transformOrigin: '50% 50%',
          opacity: 0.32,
          ...fromOptions
        }, {
          x: 0,
          y: 0,
          z: 0,
          rotationX: 0,
          rotationY: 0,
          scale: 1,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: triggerSelector || element,
            start: scrollOpts.start || 'top 93%',
            end: scrollOpts.end || 'top 65%',
            scrub: scrollOpts.scrub || 0.42,
            invalidateOnRefresh: true
          }
        });
      });
    };

    // Family Cards 3D Entrance
    revealMobile('#family .family-card', '#family .families-grid',
      { y: 52, rotationX: 6.8, scale: 0.94 }, { scrub: 0.45 });

    // Events Cards 3D Elevation
    revealMobile('#events .event-card', '#events .events-grid',
      { y: 56, rotationX: 7.2, scale: 0.93 }, { scrub: 0.45 });

    // Story Timeline 3D Milestone Ribbon
    document.querySelectorAll('#story .timeline-item').forEach(item => {
      gsap.fromTo(item, {
        transformPerspective: 1100,
        transformOrigin: '50% 50%',
        y: 44,
        rotationX: 5.5,
        scale: 0.94,
        opacity: 0.32
      }, {
        y: 0,
        rotationX: 0,
        scale: 1,
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: item,
          start: 'top 92%',
          end: 'top 60%',
          scrub: 0.42,
          toggleClass: 'is-focused',
          invalidateOnRefresh: true
        }
      });
    });

    // Memory Film Player 3D Cinema Widescreen Expand
    revealMobile('#memory-film .memory-film-player', '#memory-film',
      { y: 48, rotationX: 6.5, scale: 0.92 }, { scrub: 0.45 });

    // Gallery Slider 3D Presentation
    revealMobile('#gallery .gallery-slider-wrapper', '#gallery',
      { y: 45, rotationX: 5.5, scale: 0.93 }, { scrub: 0.45 });

    // RSVP & Guestbook & Footer 3D Lift
    revealMobile('#rsvp .rsvp-wrapper', '#rsvp',
      { y: 42, rotationX: 4.5, scale: 0.95 });
    revealMobile('#guestbook .wish-item', '#guestbook',
      { y: 34, rotationX: 4, scale: 0.96 });
    revealMobile('.footer .footer-thank-you', '.footer',
      { y: 32, rotationX: 4, scale: 0.96 });

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
        gsap.fromTo(element, { y: 26, opacity: 0.45 }, {
          y: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start: 'top 94%',
            end: 'top 70%',
            scrub: 0.35,
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
