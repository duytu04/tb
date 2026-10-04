import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createIcons, ArrowRight, ArrowUpRight, ArrowDown } from 'lucide';

gsap.registerPlugin(ScrollTrigger);
if (!document.documentElement.dataset.weddingReady) {
  await new Promise(resolve => document.addEventListener('wedding:ready', resolve, { once: true }));
}
createIcons({ icons: { ArrowRight, ArrowUpRight, ArrowDown } });
const config = window.WEDDING_CONFIG;
const hero = document.getElementById('hero');
const story = document.getElementById('story');
const countdown = document.querySelector('.countdown-box');
const band = document.createElement('div');
band.className = 'countdown-band';
band.append(countdown);
hero.after(band);
band.after(story);
document.querySelector('.hero-next').href = '#story';
document.querySelector('.footer-photo').src = config.gallery?.[1]?.src || config.gallery?.[0]?.src;
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
const ribbonHost = document.createElement('div');
ribbonHost.id = 'journey-ribbon';
ribbonHost.setAttribute('aria-hidden', 'true');
ribbonHost.hidden = true;
document.body.append(ribbonHost);
let journey, sceneModule;

async function startRibbon() {
  if (reduceMotion.matches || journey) return;
  try {
    sceneModule ||= await import('./silk-scene.js');
    if (reduceMotion.matches || journey) return;
    ribbonHost.hidden = false;
    journey = sceneModule.createJourneyRibbon(ribbonHost);
  } catch {
    ribbonHost.hidden = true;
  }
}
function opened() {
  if (!reduceMotion.matches) {
    gsap.fromTo('#hero .hero-copy', { y: 14, opacity: .4 }, { y: 0, opacity: 1, duration: .75, clearProps: 'transform,opacity' });
  }
  ScrollTrigger.refresh();
  startRibbon();
}
document.addEventListener('wedding:opened', opened);
if (window.SilkOpening.state === 'opened') opened();
else {
  try {
    sceneModule = await import('./silk-scene.js');
    await document.fonts.ready;
    if (window.SilkOpening.state === 'closed') {
      const envelope = await sceneModule.createEnvelope(document.getElementById('silk-stage'), config);
      window.SilkOpening.setScene(envelope);
    }
  } catch (error) {
    document.getElementById('envelope-overlay').classList.remove('webgl-ready');
    console.info('Thiệp dùng giao diện dự phòng.', error.message);
  }
}

const media = gsap.matchMedia();
media.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
  document.querySelectorAll('.story-photo').forEach((photo, index) => {
    gsap.fromTo(photo, { y: 36, rotationY: index % 2 ? -7 : 7, rotationZ: index % 2 ? 2 : -2 }, {
      y: -18, rotationY: 0, rotationZ: 0, ease: 'none',
      scrollTrigger: { trigger: photo.parentElement, start: 'top 85%', end: 'bottom 25%', scrub: .6 }
    });
  });
  return () => {};
});
media.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
  document.querySelectorAll('.story-photo').forEach(photo => {
    gsap.from(photo, { y: 18, opacity: .65, duration: .7, clearProps: 'transform,opacity',
      scrollTrigger: { trigger: photo, start: 'top 90%', once: true } });
  });
});
reduceMotion.addEventListener('change', () => {
  if (reduceMotion.matches) {
    journey?.dispose(); journey = null; ribbonHost.hidden = true;
    if (window.SilkOpening.state === 'opening') window.SilkOpening.skip();
  } else if (window.SilkOpening.state === 'opened') startRibbon();
});
document.addEventListener('wedding:rsvp-success', () => {
  if (reduceMotion.matches) return;
  gsap.fromTo('#rsvp-result', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .45, clearProps: 'transform,opacity' });
});
const viewport = window.visualViewport;
const checkKeyboard = () => document.body.classList.toggle('keyboard-open',
  Boolean(viewport && innerHeight - viewport.height > 140 && /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)));
viewport?.addEventListener('resize', checkKeyboard);
document.addEventListener('focusout', () => document.body.classList.remove('keyboard-open'));
document.addEventListener('visibilitychange', () => {
  if (document.hidden) gsap.globalTimeline.pause();
  else gsap.globalTimeline.resume();
});
document.documentElement.dataset.silkReady = 'true';
