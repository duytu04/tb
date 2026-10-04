import * as THREE from 'three';

function createGlowTexture(size = 64, innerColor = 'rgba(255, 250, 230, 1)', midColor = 'rgba(235, 195, 105, 0.85)', outerColor = 'rgba(197, 160, 89, 0)') {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const context = canvas.getContext('2d');
  const center = size / 2;
  const gradient = context.createRadialGradient(center, center, 0, center, center, center);
  gradient.addColorStop(0, innerColor);
  gradient.addColorStop(0.25, midColor);
  gradient.addColorStop(0.65, 'rgba(197, 160, 89, 0.2)');
  gradient.addColorStop(1, outerColor);
  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);
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

  const isMobile = innerWidth < 768;
  const count = isMobile ? 48 : 64;
  const positions = new Float32Array(count * 3);
  const basePositions = new Float32Array(count * 3);
  const speeds = new Float32Array(count);
  const phases = new Float32Array(count);
  const radialDirections = new Float32Array(count * 3);

  for (let index = 0; index < count; index++) {
    const offset = index * 3;
    const x = (Math.random() - 0.5) * (isMobile ? 8 : 11);
    const y = (Math.random() - 0.5) * 6.5;
    const z = (Math.random() - 0.5) * 4;

    positions[offset] = basePositions[offset] = x;
    positions[offset + 1] = basePositions[offset + 1] = y;
    positions[offset + 2] = basePositions[offset + 2] = z;

    speeds[index] = 0.08 + Math.random() * 0.14;
    phases[index] = Math.random() * Math.PI * 2;

    // Pre-calculate normalized radial direction for the burst transition
    const len = Math.hypot(x, y, z) || 1;
    radialDirections[offset] = (x / len) * (2.8 + Math.random() * 3.5);
    radialDirections[offset + 1] = (y / len) * (2.8 + Math.random() * 3.5);
    radialDirections[offset + 2] = ((z / len) || 0.5) * (2.0 + Math.random() * 3.0);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const glowTex = createGlowTexture(64);
  const material = new THREE.PointsMaterial({
    map: glowTex,
    color: 0xf6db94,
    size: isMobile ? 0.24 : 0.20,
    transparent: true,
    opacity: isMobile ? 0.92 : 0.82,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  let disposed = false;
  let frame = 0;
  let last = 0;
  let burstTriggered = false;
  let burstStartTime = 0;
  const pointer = { x: 0, y: 0 };
  const targetPointer = { x: 0, y: 0 };
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
    if (now - last < 30) return;
    last = now;

    const values = geometry.attributes.position.array;

    if (burstTriggered) {
      // Cinematic Stardust Burst sequence upon wax seal opening
      const elapsed = (now - burstStartTime) / 1000;
      const progress = Math.min(elapsed / 2.2, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // ease-out cubic

      for (let index = 0; index < count; index++) {
        const offset = index * 3;
        values[offset] = basePositions[offset] + radialDirections[offset] * easeProgress * 4.5;
        values[offset + 1] = basePositions[offset + 1] + radialDirections[offset + 1] * easeProgress * 4.5;
        values[offset + 2] = basePositions[offset + 2] + radialDirections[offset + 2] * easeProgress * 3.5;
      }

      // Smooth camera dolly-in & material fade out
      camera.position.z = 8 - easeProgress * 2.8;
      material.opacity = Math.max(0, 0.85 * (1 - progress * 1.15));
      particles.rotation.y += 0.008;
    } else {
      // Gentle ambient floating stardust with subtle wave motion
      for (let index = 0; index < count; index++) {
        const offset = index * 3;
        basePositions[offset + 1] += speeds[index] * 0.016;
        basePositions[offset] += Math.sin(now * 0.0006 + phases[index]) * 0.001;

        if (basePositions[offset + 1] > 3.4) {
          basePositions[offset + 1] = -3.4;
        }

        values[offset] = basePositions[offset];
        values[offset + 1] = basePositions[offset + 1];
        values[offset + 2] = basePositions[offset + 2];
      }

      // Smooth interpolation for mouse parallax
      pointer.x += (targetPointer.x - pointer.x) * 0.05;
      pointer.y += (targetPointer.y - pointer.y) * 0.05;

      particles.rotation.y = pointer.x * 0.12;
      particles.rotation.x = pointer.y * 0.08;
    }

    geometry.attributes.position.needsUpdate = true;
    renderer.render(scene, camera);
  }

  const observer = new ResizeObserver(resize);
  observer.observe(container);

  document.getElementById('envelope-overlay')?.addEventListener('pointermove', event => {
    targetPointer.x = event.clientX / innerWidth - 0.5;
    targetPointer.y = event.clientY / innerHeight - 0.5;
  }, { signal: controller.signal, passive: true });

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
    burst() {
      if (burstTriggered) return;
      burstTriggered = true;
      burstStartTime = performance.now();
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      controller.abort();
      geometry.dispose();
      glowTex.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    }
  };
}
