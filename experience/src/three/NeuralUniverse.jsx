/*
 * SCENE 03 — NEURAL UNIVERSE
 * Long organic fibers flow along the camera's path (−Z). A subset of them gradually turn into
 * textile threads: a transformation front travels along each fiber; behind it the glowing neural
 * line gives way to a solid twisted thread (plied tube, matte, lit). Threads converge toward a
 * point far ahead — the loom for Scene 04.
 * `opacity` and `morph` are refs (0..1) written by the scene each frame.
 */
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

export const THREAD_FOCUS = new THREE.Vector3(0, 0, -15.5);
const THREAD_COLORS = ['#ebe4d6', '#ebe4d6', '#2c5a3b', '#1d3d2a', '#b5d99a', '#151515'];

function mulberry32(a) {
  return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
const sm = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

function buildUniverse(quality) {
  const rnd = mulberry32(303);
  const N = quality === 'high' ? 160 : 85, T = quality === 'high' ? 38 : 20;
  const LSEG = quality === 'high' ? 220 : 130, TSEG = quality === 'high' ? 180 : 100;
  const linePos = [], lineT = [], lineSeed = [], lineThread = [], lineThr = [];
  const tubes = [];
  for (let i = 0; i < N; i++) {
    const thread = i < T;
    const angle = rnd() * Math.PI * 2;
    const r = thread ? 0.6 + rnd() * 1.3 : 0.25 + Math.pow(rnd(), 0.8) * 2.4;   // threads keep clear of the camera path
    const ph1 = rnd() * 6.28, ph2 = rnd() * 6.28, amp = 0.15 + rnd() * 0.45;
    const pts = [];
    const K = 11;
    for (let k = 0; k <= K; k++) {
      const z = 0.6 - k * 1.47;
      let x = Math.cos(angle) * r + Math.sin(k * 0.8 + ph1) * amp;
      let y = (Math.sin(angle) * r + Math.cos(k * 0.65 + ph2) * amp) * 0.8;
      if (thread) {                       // threads gather toward the loom far ahead
        const f = sm(0.6, 1, k / K);
        x = THREE.MathUtils.lerp(x, THREAD_FOCUS.x + Math.cos(angle * 2) * 0.16, f);
        y = THREE.MathUtils.lerp(y, THREAD_FOCUS.y + Math.sin(angle * 2) * 0.12, f);
      }
      pts.push(new THREE.Vector3(x, y, z));
    }
    const curve = new THREE.CatmullRomCurve3(pts, false, 'centripetal');
    const seed = rnd(), thr = thread ? rnd() * 0.55 : 2;
    const sp = curve.getSpacedPoints(LSEG);
    for (let k = 1; k <= LSEG; k++) {
      const a = sp[k - 1], b = sp[k];
      linePos.push(a.x, a.y, a.z, b.x, b.y, b.z);
      lineT.push((k - 1) / LSEG, k / LSEG); lineSeed.push(seed, seed);
      lineThread.push(thread ? 1 : 0, thread ? 1 : 0); lineThr.push(thr, thr);
    }
    if (thread) {
      const g = new THREE.TubeGeometry(curve, TSEG, 0.011 + rnd() * 0.006, 7, false);
      const n = g.attributes.position.count;
      const col = new THREE.Color(THREAD_COLORS[Math.floor(rnd() * THREAD_COLORS.length)]);
      g.setAttribute('aThr', new THREE.Float32BufferAttribute(new Float32Array(n).fill(thr), 1));
      g.setAttribute('aSeed', new THREE.Float32BufferAttribute(new Float32Array(n).fill(seed), 1));
      const cols = new Float32Array(n * 3); for (let v = 0; v < n; v++) { cols[v * 3] = col.r; cols[v * 3 + 1] = col.g; cols[v * 3 + 2] = col.b; }
      g.setAttribute('aColor', new THREE.Float32BufferAttribute(cols, 3));
      g.deleteAttribute('normal'); g.computeVertexNormals();
      tubes.push(g);
    }
  }
  const lines = new THREE.BufferGeometry();
  lines.setAttribute('position', new THREE.Float32BufferAttribute(linePos, 3));
  lines.setAttribute('aT', new THREE.Float32BufferAttribute(lineT, 1));
  lines.setAttribute('aSeed', new THREE.Float32BufferAttribute(lineSeed, 1));
  lines.setAttribute('aThread', new THREE.Float32BufferAttribute(lineThread, 1));
  lines.setAttribute('aThr', new THREE.Float32BufferAttribute(lineThr, 1));
  const threads = mergeGeometries(tubes, false);
  return { lines, threads };
}

const MORPH_GLSL = /* glsl */`
  float frontAt(float morph, float thr) { return clamp((morph - thr) / 0.45, 0.0, 1.0) * 1.04; }`;

const lineVert = /* glsl */`
  attribute float aT; attribute float aSeed; attribute float aThread; attribute float aThr;
  varying float vT; varying float vSeed; varying float vThread; varying float vThr; varying float vFade;
  void main() {
    vT = aT; vSeed = aSeed; vThread = aThread; vThr = aThr;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vFade = smoothstep(0.05, 0.8, -mv.z) * (1.0 - smoothstep(7.0, 12.0, -mv.z));
    gl_Position = projectionMatrix * mv;
  }`;
const lineFrag = /* glsl */`
  uniform float uTime; uniform float uOpacity; uniform float uMorph; uniform vec3 uCool; uniform vec3 uWarm;
  varying float vT; varying float vSeed; varying float vThread; varying float vThr; varying float vFade;
  ${MORPH_GLSL}
  void main() {
    float head = fract(uTime * (0.05 + vSeed * 0.08) + vSeed * 9.0);
    float d = vT - head;
    float pulse = exp(-d * d * 5000.0) + 0.5 * exp(-(d + 0.02) * (d + 0.02) * 1500.0) * step(0.0, -d);
    float f = frontAt(uMorph, vThr);
    float converted = vThread * (1.0 - smoothstep(f - 0.012, f, vT));            // behind the front: now a thread
    float spark = vThread * exp(-pow((vT - f) * 70.0, 2.0)) * step(0.001, f) * step(f, 1.0); // the transformation front glows
    vec3 col = mix(uCool, uWarm, vSeed) * (0.14 + pulse * 2.0) + vec3(1.0, 0.93, 0.82) * spark * 2.6;
    float a = ((0.32 + pulse) * (1.0 - converted) + spark) * uOpacity * vFade;
    gl_FragColor = vec4(col, a);
  }`;
const threadVert = /* glsl */`
  attribute float aThr; attribute float aSeed; attribute vec3 aColor;
  varying vec2 vUv2; varying float vThr; varying float vSeed; varying vec3 vCol; varying vec3 vN; varying vec3 vV; varying float vDepth;
  void main() {
    vUv2 = uv; vThr = aThr; vSeed = aSeed; vCol = aColor;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz); vDepth = -mv.z;
    gl_Position = projectionMatrix * mv;
  }`;
const threadFrag = /* glsl */`
  uniform float uMorph; uniform float uOpacity; uniform vec3 uBg;
  varying vec2 vUv2; varying float vThr; varying float vSeed; varying vec3 vCol; varying vec3 vN; varying vec3 vV; varying float vDepth;
  ${MORPH_GLSL}
  void main() {
    float f = frontAt(uMorph, vThr);
    if (vUv2.x > f || uOpacity < 0.01) discard;
    // three twisted plies: helical grooves along the thread, plus fine fibre hairs
    float twist = fract(vUv2.x * 900.0 + vUv2.y * 3.0);
    float ply = smoothstep(0.0, 0.18, twist) * smoothstep(1.0, 0.72, twist);
    float hair = fract(sin(dot(floor(vec2(vUv2.x * 6000.0, vUv2.y * 24.0)), vec2(12.9898, 78.233))) * 43758.5453);
    vec3 n = normalize(vN);
    vec3 L1 = normalize(vec3(-0.5, 0.8, 0.6)), L2 = normalize(vec3(0.6, -0.2, -0.8));
    float diff = max(dot(n, L1), 0.0) * 0.9 + max(dot(n, L2), 0.0) * 0.35 + 0.18;
    float rim = pow(1.0 - max(dot(n, normalize(vV)), 0.0), 3.0) * 0.22;
    vec3 col = vCol * diff * (0.78 + 0.22 * ply) * (0.9 + 0.1 * hair) + vec3(0.85, 0.88, 1.0) * rim * (0.7 + 0.3 * ply);
    float tip = 1.0 - smoothstep(f - 0.01, f, vUv2.x);
    col += vec3(1.0, 0.9, 0.78) * (1.0 - tip) * 1.5;                              // still-warm end at the front
    col = mix(col, uBg, smoothstep(6.0, 13.0, vDepth));                           // sink into the void
    gl_FragColor = vec4(col, uOpacity);
  }`;

export function NeuralUniverse({ opacity, morph, quality, reduced }) {
  const { lines, threads } = useMemo(() => buildUniverse(quality), [quality]);
  const group = useRef();
  const uniforms = useMemo(() => ({
    uTime: { value: 0 }, uOpacity: { value: 0 }, uMorph: { value: 0 },
    uCool: { value: new THREE.Color('#bcd0ff') }, uWarm: { value: new THREE.Color('#ffd8c8') }, uBg: { value: new THREE.Color('#050506') },
  }), []);
  useFrame((state) => {
    const o = opacity.current;
    if (group.current) group.current.visible = o > 0.002;
    uniforms.uOpacity.value = o;
    uniforms.uMorph.value = morph.current;
    if (!reduced) uniforms.uTime.value = state.clock.elapsedTime;
  });
  return (
    <group ref={group} visible={false}>
      <mesh geometry={threads} frustumCulled={false}>
        <shaderMaterial vertexShader={threadVert} fragmentShader={threadFrag} uniforms={uniforms} transparent />
      </mesh>
      <lineSegments geometry={lines} frustumCulled={false}>
        <shaderMaterial vertexShader={lineVert} fragmentShader={lineFrag} uniforms={uniforms} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </lineSegments>
    </group>
  );
}
