import * as THREE from 'three';

function glowTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 64;
  const context = canvas.getContext('2d');
  const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255, 248, 220, 1)');
  gradient.addColorStop(0.22, 'rgba(239, 201, 111, .82)');
  gradient.addColorStop(1, 'rgba(197, 160, 89, 0)');
  context.fillStyle = gradient;
  context.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(canvas);
}

export function createEnvelopeAtmosphere(container) {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(devicePixelRatio, innerWidth < 768 ? 1.15 : 1.4));
  renderer.domElement.setAttribute('aria-hidden', 'true');
  container.append(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 40);
  camera.position.z = 8;
  const count = innerWidth < 768 ? 34 : 58;
  const positions = new Float32Array(count * 3);
  const speeds = new Float32Array(count);

  for (let index = 0; index < count; index++) {
    const offset = index * 3;
    positions[offset] = (Math.random() - 0.5) * 10;
    positions[offset + 1] = (Math.random() - 0.5) * 6;
    positions[offset + 2] = (Math.random() - 0.5) * 4;
    speeds[index] = 0.08 + Math.random() * 0.13;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const material = new THREE.PointsMaterial({
    map: glowTexture(),
    color: 0xe7c879,
    size: innerWidth < 768 ? 0.15 : 0.18,
    transparent: true,
    opacity: 0.8,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });
  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  let disposed = false;
  let frame = 0;
  let last = 0;
  const pointer = { x: 0, y: 0 };
  const controller = new AbortController();

  function resize() {
    const bounds = container.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    renderer.setSize(bounds.width, bounds.height, false);
    camera.aspect = bounds.width / bounds.height;
    camera.updateProjectionMatrix();
  }

  function render(now = 0) {
    if (disposed || document.hidden) {
      frame = 0;
      return;
    }
    frame = requestAnimationFrame(render);
    if (now - last < 33) return;
    last = now;
    const values = geometry.attributes.position.array;
    for (let index = 0; index < count; index++) {
      const offset = index * 3;
      values[offset + 1] += speeds[index] * 0.018;
      values[offset] += Math.sin(now * 0.0005 + index) * 0.0008;
      if (values[offset + 1] > 3.2) values[offset + 1] = -3.2;
    }
    geometry.attributes.position.needsUpdate = true;
    particles.rotation.y += (pointer.x * 0.08 - particles.rotation.y) * 0.035;
    particles.rotation.x += (pointer.y * 0.05 - particles.rotation.x) * 0.035;
    renderer.render(scene, camera);
  }

  const observer = new ResizeObserver(resize);
  observer.observe(container);
  document.getElementById('envelope-overlay')?.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse') return;
    pointer.x = event.clientX / innerWidth - 0.5;
    pointer.y = event.clientY / innerHeight - 0.5;
  }, { signal: controller.signal });
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && !frame) frame = requestAnimationFrame(render);
  }, { signal: controller.signal });
  renderer.domElement.addEventListener('webglcontextlost', event => {
    event.preventDefault();
    container.hidden = true;
  }, { signal: controller.signal });

  resize();
  frame = requestAnimationFrame(render);

  return {
    dispose() {
      if (disposed) return;
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      controller.abort();
      geometry.dispose();
      material.map.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    }
  };
}
