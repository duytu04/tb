import * as THREE from 'three';
import { gsap } from 'gsap';

function makeRenderer(container, shadows = false) {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, innerWidth < 768 ? 1.35 : 1.75));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.35;
  renderer.shadowMap.enabled = shadows;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.domElement.setAttribute('aria-hidden', 'true');
  container.append(renderer.domElement);
  return renderer;
}

function lightScene(scene, shadows) {
  scene.add(new THREE.AmbientLight(0xffffff, 1.9));
  const key = new THREE.DirectionalLight(0xfff7e9, 3.6);
  key.position.set(-4, 6, 9);
  key.castShadow = shadows;
  key.shadow.mapSize.set(1024, 1024);
  Object.assign(key.shadow.camera, { left: -8, right: 8, top: 8, bottom: -8 });
  key.shadow.normalBias = .025;
  key.shadow.bias = -.0001;
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xd5e6dc, 1.8);
  fill.position.set(5, -2, 5);
  scene.add(fill);
}

// A ruled strip along a spline gives the silk a changing normal and a satin highlight.
function ribbonGeometry(points, width, phase = 0) {
  const curve = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p)));
  const count = 96;
  const vertices = [], uv = [], indices = [];
  for (let i = 0; i <= count; i++) {
    const t = i / count;
    const p = curve.getPoint(t);
    const tangent = curve.getTangent(t);
    const side = new THREE.Vector3(-tangent.y, tangent.x, 0).normalize();
    const twist = Math.sin(t * Math.PI * 3 + phase) * .8;
    side.applyAxisAngle(tangent, twist);
    for (const sign of [-1, 1]) {
      const edge = p.clone().addScaledVector(side, sign * width * .5);
      vertices.push(edge.x, edge.y, edge.z);
      uv.push(t, sign < 0 ? 0 : 1);
    }
    if (i < count) {
      const a = i * 2;
      indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function silkMaterial() {
  return new THREE.MeshPhysicalMaterial({
    color: 0x7c1734, roughness: .32, metalness: .22, side: THREE.DoubleSide,
    sheen: 1, sheenColor: new THREE.Color(0xd87183), sheenRoughness: .45,
    clearcoat: .25, clearcoatRoughness: .3
  });
}

function disposeScene(scene, renderer) {
  const materials = new Set(), geometries = new Set(), textures = new Set();
  scene.traverse(object => {
    if (object.geometry) geometries.add(object.geometry);
    for (const material of [object.material].flat().filter(Boolean)) {
      materials.add(material);
      for (const value of Object.values(material)) if (value?.isTexture) textures.add(value);
    }
  });
  geometries.forEach(item => item.dispose());
  textures.forEach(item => item.dispose());
  materials.forEach(item => item.dispose());
  renderer.dispose();
  renderer.domElement.remove();
}

function textTexture(text, color, background = null) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (background) { ctx.fillStyle = background; ctx.fillRect(0, 0, 1024, 512); }
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = color;
  const lines = text.split('\n');
  lines.forEach((line, index) => {
    let size = 98;
    do { ctx.font = `${size--}px "Cormorant Garamond", Georgia, serif`; }
    while (ctx.measureText(line).width > 950 && size > 20);
    ctx.fillText(line, 512, 256 + (index - (lines.length - 1) / 2) * 116);
  });
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export async function createEnvelope(container, config) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const renderer = makeRenderer(container, true);
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-5, 5, 3, -3, .1, 100);
  camera.position.z = 15;
  lightScene(scene, true);
  const root = new THREE.Group();
  scene.add(root);
  const grain = document.createElement('canvas');
  grain.width = grain.height = 256;
  const ctx = grain.getContext('2d');
  const data = ctx.createImageData(256, 256);
  for (let i = 0; i < data.data.length; i += 4) {
    const shade = 220 + Math.floor(Math.random() * 35);
    data.data.set([shade, shade, shade, 255], i);
  }
  ctx.putImageData(data, 0, 0);
  const paperMap = new THREE.CanvasTexture(grain);
  paperMap.wrapS = paperMap.wrapT = THREE.RepeatWrapping;
  paperMap.repeat.set(5, 3);
  const paper = new THREE.MeshStandardMaterial({ color: 0xf6f4eb, roughness: .88, bumpMap: paperMap, bumpScale: .018 });
  const lining = new THREE.MeshStandardMaterial({ color: 0x365446, roughness: .9 });
  const silk = silkMaterial();
  function mesh(geometry, material, parent, position = [0, 0, 0]) {
    const result = new THREE.Mesh(geometry, material);
    result.position.set(...position);
    result.castShadow = true;
    result.receiveShadow = true;
    parent.add(result);
    return result;
  }
  mesh(new THREE.BoxGeometry(5.1, 3.1, .07), paper, root, [0, 0, -.10]);
  mesh(new THREE.PlaneGeometry(5.02, 3.02), lining, root, [0, 0, -.058]);

  const letter = new THREE.Group();
  root.add(letter);
  letter.position.set(0, -.08, -.014);
  mesh(new THREE.BoxGeometry(4.6, 2.75, .035), paper, letter);
  const names = `${config.groom?.name || ''}\n&\n${config.bride?.name || ''}`;
  mesh(new THREE.PlaneGeometry(2.2, 1.45), new THREE.MeshBasicMaterial({ map: textTexture(names, '#274637'), transparent: true }), letter, [1.03, .16, .023]);
  const date = config.weddingDate;
  mesh(new THREE.PlaneGeometry(1.7, .4), new THREE.MeshBasicMaterial({ map: textTexture(`${date?.day} . ${date?.monthYear}`, '#842d42'), transparent: true }), letter, [1.04, -.95, .026]);
  const photoMaterial = new THREE.MeshBasicMaterial({ color: 0xe3e7dd });
  const photo = mesh(new THREE.PlaneGeometry(1.82, 2.45), photoMaterial, letter, [-1.18, 0, .025]);
  const photoSrc = config.gallery?.[0]?.src || 'assets/images/hero.jpg';
  let disposed = false;
  new THREE.TextureLoader().load(photoSrc, texture => {
    if (disposed) { texture.dispose(); return; }
    texture.colorSpace = THREE.SRGBColorSpace;
    photoMaterial.map = texture;
    photoMaterial.color.set(0xffffff);
    photoMaterial.needsUpdate = true;
    render();
  }, undefined, () => {});

  const pocket = new THREE.Shape();
  pocket.moveTo(-2.55, 1.55); pocket.lineTo(-2.55, -1.55);
  pocket.lineTo(2.55, -1.55); pocket.lineTo(2.55, 1.55);
  pocket.lineTo(0, -.18); pocket.closePath();
  mesh(new THREE.ExtrudeGeometry(pocket, { depth: .035, bevelEnabled: false }), paper, root, [0, 0, .075]);
  const creaseMaterial = new THREE.LineBasicMaterial({ color: 0xc9bfaa, transparent: true, opacity: .6 });
  for (const sign of [-1, 1]) {
    const geo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(sign * 2.53, -1.52, .116), new THREE.Vector3(0, .15, .116)]);
    root.add(new THREE.Line(geo, creaseMaterial));
  }
  const flap = new THREE.Group();
  flap.position.set(0, 1.55, .14);
  root.add(flap);
  const flapShape = new THREE.Shape();
  flapShape.moveTo(-2.55, 0); flapShape.lineTo(2.55, 0);
  flapShape.lineTo(.12, -1.8); flapShape.quadraticCurveTo(0, -1.87, -.12, -1.8); flapShape.closePath();
  mesh(new THREE.ExtrudeGeometry(flapShape, { depth: .025, bevelEnabled: true, bevelSize: .008, bevelThickness: .008, bevelSegments: 1, steps: 1 }), paper, flap);

  const band = mesh(ribbonGeometry([[-2.65, -.1, .25], [-1.3, -.17, .27], [0, -.2, .29], [1.3, -.12, .27], [2.65, -.16, .25]], .2), silk, root);
  const bow = new THREE.Group();
  root.add(bow);
  bow.position.set(0, -.14, .32);
  const leftLoop = mesh(ribbonGeometry([[0, 0, 0], [-.5, .45, .09], [-1.15, .5, .05], [-1.05, .04, .13], [0, 0, .15]], .19), silk, bow);
  const rightLoop = mesh(ribbonGeometry([[0, 0, .09], [.55, .43, .11], [1.18, .39, .02], [.91, -.04, .13], [0, 0, .16]], .19, 1.6), silk, bow);
  const leftTail = mesh(ribbonGeometry([[0, 0, .03], [-.4, -.52, .13], [-1.0, -.93, .15], [-1.7, -1.7, .01], [-2.15, -1.79, .12]], .2), silk, bow);
  const rightTail = mesh(ribbonGeometry([[0, 0, .02], [.52, -.49, .19], [1.38, -.79, .13], [1.5, -1.5, .03], [2.12, -1.69, .13]], .2, 1.2), silk, bow);

  const seal = new THREE.Group();
  seal.position.set(0, -.12, .56);
  root.add(seal);
  const wax = new THREE.MeshStandardMaterial({ color: 0x762139, roughness: .37, metalness: .12 });
  const waxBody = mesh(new THREE.CylinderGeometry(.34, .37, .085, 48), wax, seal);
  waxBody.rotation.x = Math.PI / 2;
  mesh(new THREE.TorusGeometry(.285, .012, 8, 64), new THREE.MeshStandardMaterial({ color: 0xc8a56d, roughness: .35, metalness: .6 }), seal, [0, 0, .054]);
  mesh(new THREE.PlaneGeometry(.44, .22), new THREE.MeshBasicMaterial({ map: textTexture(config.couple?.monogram || 'AT', '#e9d7b0'), transparent: true, depthWrite: false }), seal, [0, 0, .061]);
  const ground = mesh(new THREE.PlaneGeometry(100, 100), new THREE.ShadowMaterial({ opacity: .12 }), scene, [0, 0, -.32]);
  ground.castShadow = false;
  const pointer = { x: 0, y: 0 };
  const motion = { opening: false };
  let raf = 0, last = 0, timeline;
  const signal = new AbortController();
  function render() { if (!disposed) renderer.render(scene, camera); }
  function resize() {
    const { width, height } = container.getBoundingClientRect();
    if (!width || !height) return;
    const aspect = width / height;
    const viewHeight = Math.max(4.7, 6.4 / aspect);
    camera.left = -viewHeight * aspect / 2; camera.right = -camera.left;
    camera.top = viewHeight / 2; camera.bottom = -camera.top;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    if (!motion.opening) {
      root.rotation.set(innerWidth < 768 ? -.035 : -.12, innerWidth < 768 ? 0 : -.14, innerWidth < 768 ? -.025 : -.065);
    }
    render();
  }
  const observer = new ResizeObserver(resize);
  observer.observe(container);
  function tick(now) {
    if (disposed || document.hidden) { raf = 0; return; }
    raf = requestAnimationFrame(tick);
    if (now - last < 32) return;
    last = now;
    if (!motion.opening && !reduced.matches) {
      root.rotation.y += ((innerWidth < 768 ? 0 : -.14) + pointer.x - root.rotation.y) * .07;
      root.rotation.x += ((innerWidth < 768 ? -.035 : -.12) + pointer.y - root.rotation.x) * .07;
      leftTail.rotation.x = Math.sin(now * .0009) * .025;
      rightTail.rotation.y = Math.cos(now * .0008) * .018;
    }
    render();
  }
  document.getElementById('envelope-overlay').addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse' || reduced.matches) return;
    pointer.x = (event.clientX / innerWidth - .5) * .10;
    pointer.y = (event.clientY / innerHeight - .5) * .08;
  }, { signal: signal.signal });
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && !raf && !reduced.matches) raf = requestAnimationFrame(tick);
  }, { signal: signal.signal });
  renderer.domElement.addEventListener('webglcontextlost', event => {
    event.preventDefault();
    document.getElementById('envelope-overlay').classList.remove('webgl-ready');
    window.SilkOpening.skip();
  }, { signal: signal.signal });
  resize();
  if (!reduced.matches) raf = requestAnimationFrame(tick);
  document.getElementById('envelope-overlay').classList.add('webgl-ready');
  let portal;
  function makePortal(done) {
    render();
    photo.updateWorldMatrix(true, false);
    const rect = renderer.domElement.getBoundingClientRect();
    const corners = [[-.91, -1.225], [.91, -1.225], [-.91, 1.225], [.91, 1.225]].map(([x, y]) => {
      const p = photo.localToWorld(new THREE.Vector3(x, y, 0)).project(camera);
      return { x: rect.left + (p.x + 1) * rect.width / 2, y: rect.top + (1 - p.y) * rect.height / 2 };
    });
    const left = Math.min(...corners.map(p => p.x)), top = Math.min(...corners.map(p => p.y));
    const width = Math.max(...corners.map(p => p.x)) - left;
    const height = Math.max(...corners.map(p => p.y)) - top;
    const target = document.querySelector('#hero .hero-photo-inner').getBoundingClientRect();
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    portal = document.createElement('img');
    portal.src = photoSrc;
    portal.alt = '';
    Object.assign(portal.style, { position: 'fixed', left: `${left}px`, top: `${top}px`, width: `${width}px`, height: `${height}px`, objectFit: 'cover', objectPosition: '50% 26%', zIndex: '10002', pointerEvents: 'none' });
    document.body.append(portal);
    gsap.to(portal, { left: 0, top: navbarHeight, width: innerWidth, height: target.height, duration: .85, ease: 'power3.inOut', onComplete: done });
    gsap.to(container, { opacity: 0, duration: .6 });
    gsap.to('.opening-copy, .envelope-action-prompt', { opacity: 0, duration: .4 });
  }
  return {
    open(done) {
      motion.opening = true;
      timeline = gsap.timeline();
      timeline.to(leftLoop.scale, { x: .01, y: .4, duration: .45 }, 0)
        .to(rightLoop.scale, { x: .01, y: .4, duration: .45 }, 0)
        .to(leftTail.position, { x: -4, y: -.5, duration: .7, ease: 'power2.inOut' }, .1)
        .to(rightTail.position, { x: 4, y: -.4, duration: .7, ease: 'power2.inOut' }, .1)
        .to(band.scale, { x: 2.7, y: .01, duration: .6 }, .1)
        .to(seal.position, { z: 1, x: .6, y: -.9, duration: .5 }, .15)
        .to(seal.scale, { x: 0, y: 0, z: 0, duration: .2 }, .55)
        .to(flap.rotation, { x: -3.04, duration: .8, ease: 'power2.inOut' }, .45)
        .to(letter.position, { y: 1.8, duration: .85, ease: 'power2.inOut' }, 1.0)
        .to(root.rotation, { x: 0, y: 0, z: 0, duration: .85 }, 1.0)
        .call(() => makePortal(done), [], 1.85);
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      cancelAnimationFrame(raf);
      timeline?.kill();
      if (portal) { gsap.killTweensOf(portal); portal.remove(); }
      observer.disconnect(); signal.abort();
      disposeScene(scene, renderer);
    }
  };
}

export function createJourneyRibbon(container) {
  const renderer = makeRenderer(container);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.25));
  const scene = new THREE.Scene();
  lightScene(scene, false);
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, .1, 100);
  camera.position.z = 20;
  const ribbon = new THREE.Mesh(new THREE.BufferGeometry(), silkMaterial());
  scene.add(ribbon);
  let scheduled = 0, disposed = false;
  const controller = new AbortController();
  function draw() {
    scheduled = 0;
    if (disposed || document.hidden || document.body.classList.contains('modal-open')) return;
    const w = innerWidth, h = innerHeight;
    camera.left = -w / 2; camera.right = w / 2; camera.top = h / 2; camera.bottom = -h / 2; camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
    const points = [];
    for (let i = 0; i <= 16; i++) {
      const y = -h * .65 + i / 16 * h * 1.3;
      const phase = (scrollY + h / 2 - y) * .005;
      const edge = w < 768 ? 7 : 19;
      const wave = w < 768 ? 4 : 9;
      points.push([w / 2 - edge - Math.sin(phase) * wave, y, Math.cos(phase) * .3]);
    }
    ribbon.geometry.dispose();
    ribbon.geometry = ribbonGeometry(points, w < 768 ? 4 : 8, scrollY * .0005);
    renderer.render(scene, camera);
  }
  const schedule = () => { if (!scheduled && !disposed) scheduled = requestAnimationFrame(draw); };
  addEventListener('scroll', schedule, { passive: true, signal: controller.signal });
  addEventListener('resize', schedule, { passive: true, signal: controller.signal });
  document.addEventListener('visibilitychange', schedule, { signal: controller.signal });
  const observer = new MutationObserver(schedule);
  observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  draw();
  return { dispose() { disposed = true; cancelAnimationFrame(scheduled); controller.abort(); observer.disconnect(); disposeScene(scene, renderer); } };
}
