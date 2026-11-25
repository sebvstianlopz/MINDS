/*
 * PLACEHOLDER ASSET — procedural brain.
 * A code-generated stand-in until the production brain model (brain.glb) is supplied.
 * Replace it by setting BRAIN_GLB_URL in ./Brain.jsx; nothing else needs to change.
 */
import { useMemo } from 'react';
import * as THREE from 'three';
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { createNoise3D } from './noise.js';

export const IS_PLACEHOLDER = true;

const TISSUE = new THREE.Color('#d4a99e');
const SULCUS = new THREE.Color('#3f2422');
const smooth = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

// One cerebral hemisphere: an ellipsoid shaped to brain proportions, then carved with
// maze-like sulci (zero-crossings of domain-warped simplex noise) over broad gyri.
function buildHemisphere(side, detail, seed) {
  const noise = createNoise3D(seed);
  const warp = createNoise3D(seed + 101);
  let g = new THREE.IcosahedronGeometry(1, detail);
  g.deleteAttribute('normal'); g.deleteAttribute('uv');
  g = mergeVertices(g);
  const pos = g.attributes.position;
  const colors = new Float32Array(pos.count * 3);
  const base = new Float32Array(pos.count * 3), dirs = new Float32Array(pos.count * 3), depthA = new Float32Array(pos.count);
  const v = new THREE.Vector3(), n = new THREE.Vector3(), c = new THREE.Color();
  for (let i = 0; i < pos.count; i++) {
    n.fromBufferAttribute(pos, i).normalize();
    // base shape: long front-to-back (z), narrower frontal pole, flatter underside, flat medial wall
    const medial = smooth(0.0, 0.55, -n.x * side);           // 1 on the inner face
    let sx = 0.6 * (1 - 0.72 * medial);
    const sy = n.y < 0 ? 0.6 : 0.7;
    let sz = 1.0;
    if (n.z > 0) sx *= 1 - 0.18 * n.z;                       // frontal lobe narrows
    const temporal = Math.exp(-(((n.z - 0.12) / 0.32) ** 2)) * smooth(0.05, 0.6, -n.y) * smooth(0.1, 0.7, n.x * side);
    v.set(n.x * sx, n.y * sy - 0.1 * temporal, n.z * sz);
    v.x += 0.06 * temporal * side;
    // folds: worm-like gyri with narrow sulci at the zero-crossings of mildly warped noise
    const k = 4.6;
    const wx = n.x * k + 0.4 * warp(n.x * 1.3, n.y * 1.3, n.z * 1.3);
    const wy = n.y * k + 0.4 * warp(n.y * 1.3 + 7.1, n.z * 1.3, n.x * 1.3);
    const wz = n.z * k + 0.4 * warp(n.z * 1.3, n.x * 1.3 + 3.3, n.y * 1.3);
    const a = Math.abs(noise(wx, wy, wz));
    const b = Math.abs(noise(wx * 2.2 + 11, wy * 2.2, wz * 2.2));
    let gyrus = smooth(0.0, 0.24, a) * (0.78 + 0.22 * smooth(0.0, 0.2, b));
    // anatomical landmarks: lateral (Sylvian) fissure and central sulcus on the outer face
    const lateral = smooth(0.15, 0.5, n.x * side);
    const sylv = Math.exp(-(((n.y - (-0.12 + 0.28 * n.z)) / 0.05) ** 2)) * smooth(-0.55, -0.35, n.z) * (1 - smooth(0.35, 0.55, n.z)) * lateral;
    const central = Math.exp(-(((n.z - (0.18 - 0.22 * n.y)) / 0.035) ** 2)) * smooth(-0.15, 0.15, n.y);
    gyrus *= (1 - 0.95 * sylv) * (1 - 0.9 * central);
    const crown = Math.pow(gyrus, 0.65);                            // rounded tubes, steep sulcal walls
    const depth = 0.07 * crown * (1 - 0.85 * medial);
    base[i * 3] = v.x + side * 0.03; base[i * 3 + 1] = v.y; base[i * 3 + 2] = v.z;
    dirs[i * 3] = n.x; dirs[i * 3 + 1] = n.y; dirs[i * 3 + 2] = n.z;
    depthA[i] = depth;
  }
  // round the gyri: average the fold height over neighbouring vertices
  const idx = g.index.array, sum = new Float32Array(pos.count), cnt = new Uint16Array(pos.count);
  for (let pass = 0; pass < 2; pass++) {
    sum.fill(0); cnt.fill(0);
    for (let t = 0; t < idx.length; t += 3) {
      const a0 = idx[t], a1 = idx[t + 1], a2 = idx[t + 2];
      sum[a0] += depthA[a1] + depthA[a2]; cnt[a0] += 2;
      sum[a1] += depthA[a0] + depthA[a2]; cnt[a1] += 2;
      sum[a2] += depthA[a0] + depthA[a1]; cnt[a2] += 2;
    }
    for (let i = 0; i < pos.count; i++) depthA[i] = 0.5 * depthA[i] + 0.5 * (sum[i] / cnt[i]);
  }
  for (let i = 0; i < pos.count; i++) {
    const d = depthA[i];
    pos.setXYZ(i, base[i * 3] + dirs[i * 3] * (d - 0.05), base[i * 3 + 1] + dirs[i * 3 + 1] * (d - 0.05), base[i * 3 + 2] + dirs[i * 3 + 2] * (d - 0.05));
    c.copy(SULCUS).lerp(TISSUE, 0.18 + 0.82 * Math.min(1, d / 0.07));
    colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
  }
  g.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  g.computeVertexNormals();
  return g;
}

// Cerebellum: a flattened ellipsoid with fine horizontal folia.
function buildCerebellum(detail) {
  const noise = createNoise3D(77);
  let g = new THREE.IcosahedronGeometry(1, detail);
  g.deleteAttribute('normal'); g.deleteAttribute('uv');
  g = mergeVertices(g);
  const pos = g.attributes.position;
  const colors = new Float32Array(pos.count * 3);
  const n = new THREE.Vector3(), c = new THREE.Color();
  for (let i = 0; i < pos.count; i++) {
    n.fromBufferAttribute(pos, i).normalize();
    const vermis = Math.exp(-((n.x / 0.12) ** 2));
    const folia = Math.abs(Math.sin(n.y * 26 + noise(n.x * 3, n.y * 3, n.z * 3) * 1.4));
    const f = smooth(0.0, 0.35, folia);
    const r = 1 + 0.035 * f - 0.05 * vermis;
    pos.setXYZ(i, n.x * 0.5 * r, n.y * 0.27 * r, n.z * 0.34 * r);
    c.copy(SULCUS).lerp(TISSUE, 0.3 + 0.7 * f);
    colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
  }
  g.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  g.computeVertexNormals();
  return g;
}

export function ProceduralBrain({ quality = 'high', onReady }) {
  const { left, right, cerebellum, stem, material, stemMaterial } = useMemo(() => {
    const d = quality === 'high' ? 92 : 56;
    const out = {
      left: buildHemisphere(-1, d, 11),
      right: buildHemisphere(1, d, 29),
      cerebellum: buildCerebellum(quality === 'high' ? 40 : 24),
      stem: new THREE.CylinderGeometry(0.12, 0.08, 0.55, 32, 1),
      material: new THREE.MeshPhysicalMaterial({
        vertexColors: true, roughness: 0.46, metalness: 0,
        clearcoat: 0.55, clearcoatRoughness: 0.32,
        sheen: 0.5, sheenRoughness: 0.55, sheenColor: new THREE.Color('#ffd6cc'),
        envMapIntensity: 1,
      }),
      stemMaterial: new THREE.MeshPhysicalMaterial({ color: '#b48f86', roughness: 0.5, clearcoat: 0.4, clearcoatRoughness: 0.4 }),
    };
    if (onReady) queueMicrotask(onReady);
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quality]);

  return (
    <group rotation={[0.12, 0, 0]}>
      <mesh geometry={left} material={material} castShadow receiveShadow />
      <mesh geometry={right} material={material} castShadow receiveShadow />
      <mesh geometry={cerebellum} material={material} position={[0, -0.36, -0.66]} rotation={[0.25, 0, 0]} />
      <mesh geometry={stem} material={stemMaterial} position={[0, -0.6, -0.32]} rotation={[0.35, 0, 0]} />
    </group>
  );
}
