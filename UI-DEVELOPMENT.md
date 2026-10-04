# Wedding Invitation Motion Upgrade

The invitation remains a static site. `index.html` loads the built animation
entry at `js/generated/silk.js`; the admin and editable `js/config.js` retain
their existing paths. Publish the generated directory together with HTML,
CSS, JavaScript, and media.

## Local UI Work

- Install dependencies: `npm install --ignore-scripts`.
- Compile animations only: `npm run build:ui`.
- Start the local preview: `npm run dev:ui` (http://127.0.0.1:5173).
- Run browser checks with the preview running: `npm run test:ui`.
- After changing `js/silk.js` or `js/silk-scene.js`, rebuild and refresh.

The existing `npm run build` and `npm run deploy` commands belong to the
deployment workflow and may publish to the remote server. Use `build:ui`
for local UI compilation.

## Implementation

- `css/style.css`: the original invitation design and responsive layout.
- `css/silk.css`: a deliberately small integration layer; it must not restyle the invitation.
- `js/opening.js`: accessible opening controls, independent of WebGL.
- `js/silk-scene.js`: subtle Three.js gold light behind the original envelope.
- `js/silk.js`: opening timeline, scroll-scrubbed cinematic scenes, depth interactions, petals, and reduced-motion handling.
- `js/app.js`: original content bindings and invitation functions.

The Three.js atmosphere stops and disposes when the invitation opens. The
envelope itself remains the original HTML/CSS artwork; GSAP only sequences its
existing flap, letter, and portal states. Reduced motion bypasses the sequence.

Desktop cinematic depth starts at 1024px. Tablets and phones use shorter
translate/scale scenes to avoid horizontal overflow and reduce GPU work. The
motion follows scroll position, so it never traps the user in a timed sequence.

The original memory-film path and all original content remain unchanged.
Without an RSVP endpoint, submissions remain local and the UI says so.
Opaque Google Apps Script responses are shown as unverified, not confirmed.

## Verification

`tests/wedding.mjs` checks seven viewport sizes, overflow, personalization,
opening motion, desktop/mobile cinematic transforms, gallery controls, modal keyboard behavior, reduced motion,
and failed animation imports. It also asserts the original theme, section
order, hero countdown, envelope artwork, and absence of redesign-only UI.
Results and screenshots are in
`test-results/` (ignored by Git).

Browser emulation is not a real-device performance benchmark. Map embeds
are mocked in automated tests. In-app Zalo browsers and physical phones
still need device testing before declaring production performance.

## Technical References

- [Three.js responsive rendering](https://threejs.org/manual/pages/responsive.html): canvas sizing and pixel-density tradeoffs.
- [Three.js rendering on demand](https://threejs.org/manual/pages/rendering-on-demand.html): render the page ribbon only after a visual change.
- [GSAP matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/): separate desktop/mobile choreography and revert animations when queries change.
- [MDN reduced motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion): respect the operating-system motion preference.
