/*
 * SCENE 02 — neural fibers inside the brain.
 * Nodes are scattered through the brain volume (and a short corridor beyond it, which Scene 03
 * will fly through). Near neighbours are joined by gently curved fibers; a GPU shader sends
 * light pulses along each fiber, and soft synapse points glow at the nodes.
 * `opacity` is a ref (0..1) written by the scene each frame, so nothing re-renders.
 */
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

function mulberry32(a) {
  return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

function buildNetwork(quality) {
  const rnd = mulberry32(2026);
  const nodes = [];
  const inBrain = quality === 'high' ? 430 : 210;
  const corridor = quality === 'high' ? 140 : 70;
  // brain volume (matches the placeholder's proportions), slightly inside the cortex
  while (nodes.length < inBrain) {
    const x = rnd() * 2 - 1, y = rnd() * 2 - 1, z = rnd() * 2 - 1;
    if (x * x + y * y + z * z > 1) continue;
    nodes.push(new THREE.Vector3(x * 0.55, y * 0.58 + 0.02, z * 0.92));
  }
  // corridor beyond the brain along -Z (the camera's path after it enters)
  for (let i = 0; i < corridor; i++) {
    const a = rnd() * Math.PI * 2, r = 0.25 + rnd() * 1.3, z = -0.9 - rnd() * 5;
    nodes.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r * 0.8, z));
  }
  // join each node to its 2–3 nearest neighbours with a curved fiber
  const SEG = quality === 'high' ? 22 : 14;
  const pos = [], tAttr = [], seed = [];
  const seen = new Set();
  const tmp = new THREE.Vector3(), mid = new THREE.Vector3(), off = new THREE.Vector3();
  nodes.forEach((a, i) => {
    const near = nodes.map((b, j) => [j, a.distanceToSquared(b)]).filter(([j]) => j !== i).sort((p, q) => p[1] - q[1]).slice(0, 3 + Math.floor(rnd() * 2));
    near.forEach(([j, d2]) => {
      const key = i < j ? i + ':' + j : j + ':' + i;
      if (seen.has(key) || d2 > (i < inBrain ? 0.12 : 0.9)) return;
      seen.add(key);
      const b = nodes[j];
      mid.addVectors(a, b).multiplyScalar(0.5);
      off.set(rnd() - 0.5, rnd() - 0.5, rnd() - 0.5).multiplyScalar(Math.sqrt(d2) * 0.6);
      const curve = new THREE.QuadraticBezierCurve3(a.clone(), mid.clone().add(off), b.clone());
      const s = rnd();
      let prev = curve.getPoint(0);
      for (let k = 1; k <= SEG; k++) {
        const u = k / SEG;
        tmp.copy(curve.getPoint(u));
        pos.push(prev.x, prev.y, prev.z, tmp.x, tmp.y, tmp.z);
        tAttr.push((k - 1) / SEG, u);
        seed.push(s, s);
        prev = tmp.clone();
      }
    });
  });
  const lines = new THREE.BufferGeometry();
  lines.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  lines.setAttribute('aT', new THREE.Float32BufferAttribute(tAttr, 1));
  lines.setAttribute('aSeed', new THREE.Float32BufferAttribute(seed, 1));
  const pts = new THREE.BufferGeometry().setFromPoints(nodes);
  pts.setAttribute('aSeed', new THREE.Float32BufferAttribute(nodes.map(() => rnd()), 1));
  return { lines, pts };
}

const fiberVert = /* glsl */`
  attribute float aT; attribute float aSeed;
  varying float vT; varying float vSeed; varying float vFade;
  void main() {
    vT = aT; vSeed = aSeed;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vFade = smoothstep(0.02, 0.6, -mv.z) * (1.0 - smoothstep(4.0, 9.0, -mv.z)); // no clipping flare, fades with depth
    gl_Position = projectionMatrix * mv;
  }`;
const fiberFrag = /* glsl */`
  uniform float uTime; uniform float uOpacity; uniform vec3 uCool; uniform vec3 uWarm;
  varying float vT; varying float vSeed; varying float vFade;
  void main() {
    float speed = 0.18 + vSeed * 0.32;
    float head = fract(uTime * speed + vSeed * 7.0);
    float d = vT - head;
    float pulse = exp(-d * d * 900.0) + 0.6 * exp(-(d + 0.06) * (d + 0.06) * 260.0) * step(0.0, -d); // bright head, short tail
    vec3 col = mix(uCool, uWarm, vSeed) * (0.16 + pulse * 2.2);
    gl_FragColor = vec4(col, (0.3 + pulse) * uOpacity * vFade);
  }`;
const nodeVert = /* glsl */`
  attribute float aSeed; uniform float uTime; uniform float uPx; varying float vGlow; varying float vFade;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vGlow = 0.45 + 0.55 * pow(0.5 + 0.5 * sin(uTime * (0.8 + aSeed * 1.6) + aSeed * 40.0), 4.0);
    vFade = smoothstep(0.05, 0.7, -mv.z);
    gl_PointSize = uPx * (0.6 + aSeed) / max(0.35, -mv.z);
    gl_Position = projectionMatrix * mv;
  }`;
const nodeFrag = /* glsl */`
  uniform float uOpacity; uniform vec3 uWarm; varying float vGlow; varying float vFade;
  void main() {
    float r = length(gl_PointCoord - 0.5) * 2.0;
    float a = smoothstep(1.0, 0.0, r); a *= a;
    gl_FragColor = vec4(uWarm * (0.6 + vGlow * 1.6), a * vGlow * uOpacity * vFade);
  }`;

export function NeuralFibers({ opacity, quality, reduced }) {
  const { lines, pts } = useMemo(() => buildNetwork(quality), [quality]);
  const group = useRef();
  const uniforms = useMemo(() => ({
    uTime: { value: 0 }, uOpacity: { value: 0 }, uPx: { value: 14 * Math.min(2, window.devicePixelRatio || 1) },
    uCool: { value: new THREE.Color('#bcd0ff') }, uWarm: { value: new THREE.Color('#ffd8c8') },
  }), []);
  useFrame((state) => {
    const o = opacity.current;
    if (group.current) group.current.visible = o > 0.002;
    uniforms.uOpacity.value = o;
    if (!reduced) uniforms.uTime.value = state.clock.elapsedTime;
  });
  // depthTest off: the fibers glow through the cortex as it dissolves
  const common = { transparent: true, depthWrite: false, depthTest: false, blending: THREE.AdditiveBlending, uniforms };
  return (
    <group ref={group} visible={false}>
      <lineSegments geometry={lines} frustumCulled={false}>
        <shaderMaterial vertexShader={fiberVert} fragmentShader={fiberFrag} {...common} />
      </lineSegments>
      <points geometry={pts} frustumCulled={false}>
        <shaderMaterial vertexShader={nodeVert} fragmentShader={nodeFrag} {...common} />
      </points>
    </group>
  );
}
