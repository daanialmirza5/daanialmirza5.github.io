import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

export interface SceneNode {
  id: string;
  name: string;
  color: string;
  ring: number;
  featured: boolean;
}

export interface SceneOptions {
  reducedMotion: boolean;
  onSelect: (id: string) => void;
}

const APERTURE = 2.0; // radius of the opening
const PLATE_OUTER = 4.3;
const PETALS = 10;
const RING_BASE = 5.4;
const RING_STEP = 0.72;

const smooth = (a: number, b: number, t: number) => {
  const x = Math.min(1, Math.max(0, (t - a) / (b - a)));
  return x * x * (3 - 2 * x);
};

function glowTexture(): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const g = c.getContext('2d')!;
  const grad = g.createRadialGradient(128, 128, 0, 128, 128, 128);
  grad.addColorStop(0, 'rgba(120,235,245,0.95)');
  grad.addColorStop(0.25, 'rgba(40,190,210,0.55)');
  grad.addColorStop(0.6, 'rgba(20,120,170,0.12)');
  grad.addColorStop(1, 'rgba(20,120,170,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 256, 256);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function irisTexture(): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = c.height = 512;
  const g = c.getContext('2d')!;
  const bg = g.createRadialGradient(256, 256, 60, 256, 256, 256);
  bg.addColorStop(0, '#0d3b52');
  bg.addColorStop(0.45, '#14637a');
  bg.addColorStop(0.8, '#0f2c3f');
  bg.addColorStop(1, '#0a1622');
  g.fillStyle = bg;
  g.fillRect(0, 0, 512, 512);
  // radial fibres
  for (let i = 0; i < 360; i++) {
    const a = (i / 360) * Math.PI * 2 + Math.sin(i * 12.9898) * 0.01;
    const r0 = 70 + (Math.sin(i * 78.233) * 0.5 + 0.5) * 30;
    const r1 = 200 + (Math.sin(i * 3.7) * 0.5 + 0.5) * 50;
    g.strokeStyle = `rgba(${110 + (i % 5) * 20},${210 + (i % 3) * 10},230,${0.08 + (i % 7) * 0.025})`;
    g.lineWidth = 1 + (i % 4) * 0.4;
    g.beginPath();
    g.moveTo(256 + Math.cos(a) * r0, 256 + Math.sin(a) * r0);
    g.lineTo(256 + Math.cos(a) * r1, 256 + Math.sin(a) * r1);
    g.stroke();
  }
  // collarette ring
  g.strokeStyle = 'rgba(160,240,250,0.35)';
  g.lineWidth = 3;
  g.beginPath();
  g.arc(256, 256, 118, 0, Math.PI * 2);
  g.stroke();
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function petalGeometry(): THREE.ShapeGeometry {
  const span = ((Math.PI * 2) / PETALS) * 1.12;
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.absarc(0, 0, APERTURE * 1.06, -span / 2, span / 2, false);
  shape.lineTo(0, 0);
  return new THREE.ShapeGeometry(shape, 24);
}

export function createEyeScene(container: HTMLElement, labelLayer: HTMLElement, nodes: SceneNode[], opts: SceneOptions) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.domElement.setAttribute('aria-hidden', 'true');
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTex;

  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 200);
  camera.position.set(0, 0, 20);

  scene.add(new THREE.HemisphereLight(0xffffff, 0xd9e1ea, 0.6));
  const key = new THREE.DirectionalLight(0xffffff, 1.6);
  key.position.set(6, 8, 10);
  scene.add(key);

  const disposables: { dispose: () => void }[] = [pmrem, envTex];
  const track = <T extends { dispose: () => void }>(x: T) => {
    disposables.push(x);
    return x;
  };

  // ---------------------------------------------------------------- eye
  const eye = new THREE.Group();
  scene.add(eye);

  const metal = track(new THREE.MeshStandardMaterial({ color: 0xc7ced8, metalness: 0.85, roughness: 0.28 }));
  const darkMetal = track(new THREE.MeshStandardMaterial({ color: 0x27313d, metalness: 0.7, roughness: 0.4 }));
  const petalMat = track(new THREE.MeshStandardMaterial({ color: 0x2a3441, metalness: 0.75, roughness: 0.32, side: THREE.DoubleSide }));

  // iris (behind the petals)
  const irisTex = track(irisTexture());
  const iris = new THREE.Mesh(track(new THREE.CircleGeometry(APERTURE * 1.02, 96)), track(new THREE.MeshBasicMaterial({ map: irisTex })));
  iris.position.z = -0.35;
  eye.add(iris);

  const pupilMat = track(new THREE.MeshBasicMaterial({ color: 0x050a10 }));
  const pupil = new THREE.Mesh(track(new THREE.CircleGeometry(0.62, 64)), pupilMat);
  pupil.position.z = -0.3;
  eye.add(pupil);

  const glowTex = track(glowTexture());
  const glowMat = track(new THREE.SpriteMaterial({ map: glowTex, transparent: true, depthWrite: false, opacity: 0 }));
  const glow = new THREE.Sprite(glowMat);
  glow.scale.set(3.4, 3.4, 1);
  glow.position.z = -0.25;
  eye.add(glow);

  const catchMat = track(new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 }));
  const catchlight = new THREE.Mesh(track(new THREE.CircleGeometry(0.16, 24)), catchMat);
  catchlight.position.set(-0.32, 0.34, -0.2);
  eye.add(catchlight);

  // aperture petals
  const petalGeo = track(petalGeometry());
  const petals: THREE.Mesh[] = [];
  for (let i = 0; i < PETALS; i++) {
    const pivot = new THREE.Group();
    pivot.rotation.z = (i / PETALS) * Math.PI * 2;
    const petal = new THREE.Mesh(petalGeo, petalMat);
    petal.position.z = -0.1 + i * 0.012;
    pivot.add(petal);
    eye.add(pivot);
    petals.push(petal);
  }

  // faceplate in front of the petals hides them as they slide outward
  const plate = new THREE.Mesh(track(new THREE.RingGeometry(APERTURE, PLATE_OUTER, 128, 1)), metal);
  plate.position.z = 0.15;
  eye.add(plate);

  const lip = new THREE.Mesh(track(new THREE.TorusGeometry(APERTURE, 0.12, 24, 128)), darkMetal);
  lip.position.z = 0.17;
  eye.add(lip);

  const bezel = new THREE.Mesh(track(new THREE.TorusGeometry(PLATE_OUTER, 0.22, 32, 160)), metal);
  bezel.position.z = 0.12;
  eye.add(bezel);

  const signalMat = track(new THREE.MeshBasicMaterial({ color: 0x20c3d4, transparent: true, opacity: 0.15 }));
  const signal = new THREE.Mesh(track(new THREE.TorusGeometry(APERTURE + 0.32, 0.025, 8, 160)), signalMat);
  signal.position.z = 0.2;
  eye.add(signal);

  // engraved ticks
  const tickGeo = track(new THREE.BoxGeometry(0.035, 0.24, 0.02));
  const ticks = new THREE.InstancedMesh(tickGeo, darkMetal, 72);
  const m = new THREE.Matrix4();
  for (let i = 0; i < 72; i++) {
    const a = (i / 72) * Math.PI * 2;
    const r = PLATE_OUTER - 0.42 - (i % 6 === 0 ? 0.08 : 0);
    const len = i % 6 === 0 ? 1.7 : 1;
    m.compose(
      new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0.17),
      new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), a - Math.PI / 2),
      new THREE.Vector3(1, len, 1),
    );
    ticks.setMatrixAt(i, m);
  }
  eye.add(ticks);

  // screws
  const screwGeo = track(new THREE.CylinderGeometry(0.11, 0.11, 0.08, 20));
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2 + Math.PI / 6;
    const s = new THREE.Mesh(screwGeo, darkMetal);
    s.rotation.x = Math.PI / 2;
    s.position.set(Math.cos(a) * (PLATE_OUTER - 0.95), Math.sin(a) * (PLATE_OUTER - 0.95), 0.2);
    eye.add(s);
  }

  // ---------------------------------------------------------------- orbits + project nodes
  const rings = Array.from(new Set(nodes.map((n) => n.ring))).sort((a, b) => a - b);
  const ringGroups = new Map<number, THREE.Group>();
  const orbitLines: THREE.LineLoop[] = [];
  for (const r of rings) {
    const g = new THREE.Group();
    g.rotation.x = 1.18 + r * 0.06;
    g.rotation.y = (r % 2 === 0 ? 1 : -1) * 0.12 * r;
    scene.add(g);
    ringGroups.set(r, g);
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 128; i++) {
      const a = (i / 128) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a), Math.sin(a), 0));
    }
    const color = nodes.find((n) => n.ring === r)?.color ?? '#888888';
    const line = new THREE.LineLoop(
      track(new THREE.BufferGeometry().setFromPoints(pts)),
      track(new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0, depthWrite: false })),
    );
    g.add(line);
    orbitLines.push(line);
  }

  const sphereGeo = track(new THREE.SphereGeometry(1, 32, 16));
  type NodeObj = { spec: SceneNode; mesh: THREE.Mesh; base: number; label: HTMLButtonElement; index: number; mat: THREE.MeshStandardMaterial };
  const nodeObjs: NodeObj[] = [];
  const perRing = new Map<number, number>();
  nodes.forEach((n) => perRing.set(n.ring, (perRing.get(n.ring) ?? 0) + 1));
  const seen = new Map<number, number>();
  nodes.forEach((spec, index) => {
    const k = seen.get(spec.ring) ?? 0;
    seen.set(spec.ring, k + 1);
    const count = perRing.get(spec.ring) ?? 1;
    const mat = track(
      new THREE.MeshStandardMaterial({
        color: spec.color,
        emissive: new THREE.Color(spec.color),
        emissiveIntensity: 0.35,
        metalness: 0.2,
        roughness: 0.35,
      }),
    );
    const mesh = new THREE.Mesh(sphereGeo, mat);
    mesh.userData.id = spec.id;
    ringGroups.get(spec.ring)!.add(mesh);

    const label = document.createElement('button');
    label.type = 'button';
    label.className = `eye-label${spec.featured ? ' is-featured' : ''}`;
    label.textContent = spec.name;
    label.style.setProperty('--dot', spec.color);
    label.tabIndex = spec.featured ? 0 : -1;
    if (!spec.featured) label.setAttribute('aria-hidden', 'true');
    label.addEventListener('click', () => opts.onSelect(spec.id));
    label.addEventListener('mouseenter', () => (hovered = spec.id));
    label.addEventListener('mouseleave', () => (hovered = null));
    label.addEventListener('focus', () => (hovered = spec.id));
    label.addEventListener('blur', () => (hovered = null));
    labelLayer.appendChild(label);

    nodeObjs.push({ spec, mesh, base: (k / count) * Math.PI * 2 + spec.ring * 0.7, label, index, mat });
  });

  // ---------------------------------------------------------------- interaction
  let hovered: string | null = null;
  const pointer = new THREE.Vector2(0, 0);
  const pointerTarget = new THREE.Vector2(0, 0);
  const raycaster = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  let pointerInside = false;

  const onMove = (e: PointerEvent) => {
    const rect = renderer.domElement.getBoundingClientRect();
    ndc.set(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
    pointerTarget.set(ndc.x, ndc.y);
    pointerInside = true;
    raycaster.setFromCamera(ndc, camera);
    const hit = raycaster.intersectObjects(nodeObjs.map((n) => n.mesh), false)[0];
    hovered = hit ? (hit.object.userData.id as string) : null;
    renderer.domElement.style.cursor = hovered ? 'pointer' : '';
    if (opts.reducedMotion) renderFrame(performance.now());
  };
  const onLeave = () => {
    pointerInside = false;
    pointerTarget.set(0, 0);
    hovered = null;
    renderer.domElement.style.cursor = '';
  };
  const onClick = () => {
    if (hovered) opts.onSelect(hovered);
  };
  renderer.domElement.addEventListener('pointermove', onMove);
  renderer.domElement.addEventListener('pointerleave', onLeave);
  renderer.domElement.addEventListener('click', onClick);

  // ---------------------------------------------------------------- layout
  let width = 1;
  let height = 1;
  let ringScale = 1;
  const resize = () => {
    width = Math.max(1, container.clientWidth);
    height = Math.max(1, container.clientHeight);
    const aspect = width / height;
    renderer.setSize(width, height, false);
    camera.aspect = aspect;
    ringScale = Math.min(1, Math.max(0.5, aspect / 1.75));
    const outer = (RING_BASE + RING_STEP * (rings.length - 1)) * ringScale + 0.6;
    const tanHalf = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const needH = Math.max(PLATE_OUTER + 0.6, 2.9) / tanHalf;
    const needW = outer / (tanHalf * aspect);
    camera.position.z = Math.max(needH, needW, 14);
    camera.updateProjectionMatrix();
    if (opts.reducedMotion) renderFrame(performance.now());
  };
  const ro = new ResizeObserver(resize);
  ro.observe(container);

  // ---------------------------------------------------------------- animation
  const start = performance.now();
  const world = new THREE.Vector3();
  const tmp = new THREE.Vector3();

  function renderFrame(now: number) {
    const t = opts.reducedMotion ? 10 : (now - start) / 1000;
    const open = smooth(0.35, 2.3, t);
    const emerge = smooth(1.5, 3.6, t);

    pointer.lerp(pointerTarget, opts.reducedMotion ? 1 : 0.06);
    eye.rotation.y = pointer.x * 0.28;
    eye.rotation.x = -pointer.y * 0.22;

    for (let i = 0; i < PETALS; i++) {
      const p = petals[i];
      p.position.x = open * (APERTURE * 1.08);
      p.rotation.z = open * 0.42;
    }
    const breathe = opts.reducedMotion ? 0 : Math.sin(t * 1.4) * 0.04;
    pupil.scale.setScalar(0.85 + open * 0.25 + breathe + (hovered ? 0.18 : 0) + (pointerInside ? 0.05 : 0));
    iris.rotation.z = opts.reducedMotion ? 0 : t * 0.04;
    glowMat.opacity = open * 0.9;
    catchMat.opacity = open * 0.85;
    signalMat.opacity = 0.12 + open * 0.55 + (opts.reducedMotion ? 0 : Math.sin(t * 2.2) * 0.08 * open);

    orbitLines.forEach((line, i) => {
      const r = rings[i];
      const radius = (RING_BASE + RING_STEP * r) * ringScale * emerge;
      line.scale.setScalar(Math.max(radius, 0.001));
      (line.material as THREE.LineBasicMaterial).opacity = 0.22 * emerge;
    });

    const occludeR = PLATE_OUTER + 0.2;
    for (const n of nodeObjs) {
      const stagger = smooth(1.4 + n.index * 0.05, 3.2 + n.index * 0.05, t);
      const radius = (RING_BASE + RING_STEP * n.spec.ring) * ringScale * stagger;
      const speed = opts.reducedMotion ? 0 : 0.055 - n.spec.ring * 0.006;
      const a = n.base + t * speed;
      n.mesh.position.set(Math.cos(a) * radius, Math.sin(a) * radius, 0);
      const isHover = hovered === n.spec.id;
      const size = (n.spec.featured ? 0.24 : 0.17) * (isHover ? 1.45 : 1) * Math.max(stagger, 0.001);
      n.mesh.scale.setScalar(size);
      n.mat.emissiveIntensity = isHover ? 0.9 : 0.35;

      n.mesh.getWorldPosition(world);
      tmp.copy(world).project(camera);
      const x = (tmp.x * 0.5 + 0.5) * width;
      const y = (-tmp.y * 0.5 + 0.5) * height;
      const behindEye = world.z < 0 && Math.hypot(world.x, world.y) < occludeR;
      const visible = stagger > 0.85 && !behindEye && (n.spec.featured || isHover);
      n.label.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
      n.label.classList.toggle('is-visible', visible);
      n.label.classList.toggle('is-flipped', x > width * 0.68);
      n.label.classList.toggle('is-active', isHover);
      n.mesh.visible = !behindEye || stagger < 1;
    }

    renderer.render(scene, camera);
  }

  let raf = 0;
  let running = false;
  const loop = (now: number) => {
    renderFrame(now);
    raf = requestAnimationFrame(loop);
  };
  const play = () => {
    if (running || opts.reducedMotion) return;
    running = true;
    raf = requestAnimationFrame(loop);
  };
  const pause = () => {
    running = false;
    cancelAnimationFrame(raf);
  };

  let onScreen = true;
  const io = new IntersectionObserver(([entry]) => {
    onScreen = entry.isIntersecting;
    if (onScreen && !document.hidden) play();
    else pause();
  });
  io.observe(container);
  const onVisibility = () => (document.hidden || !onScreen ? pause() : play());
  document.addEventListener('visibilitychange', onVisibility);

  resize();
  if (opts.reducedMotion) renderFrame(performance.now());
  else play();

  return {
    dispose() {
      pause();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      renderer.domElement.removeEventListener('pointermove', onMove);
      renderer.domElement.removeEventListener('pointerleave', onLeave);
      renderer.domElement.removeEventListener('click', onClick);
      nodeObjs.forEach((n) => n.label.remove());
      ticks.dispose();
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
