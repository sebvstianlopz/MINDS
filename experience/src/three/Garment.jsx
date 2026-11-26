/*
 * Garment (Scene 04).
 *
 * PLACEHOLDER GEOMETRY, REAL PRODUCTS: each garment is a cloth-like surface built from the real
 * MINDS product cut-out photo (see src/data/products.js). No artwork is invented. Replace with
 * garment GLBs by setting GARMENT_GLB_URL (see README).
 *
 * PhotoGarment weaves itself into existence (warp → weft → closed cloth) as its `weave` ref goes
 * 0 → 1. GarmentLights is one shared studio rig for every garment around the loom.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { THREAD_FOCUS } from './NeuralUniverse.jsx';
import { PRODUCTS } from '../data/products.js';

export const GARMENT = PRODUCTS[0];        // Scene 04 hero product
export const GARMENT_GLB_URL = null;
export const GARMENT_IS_PLACEHOLDER = !GARMENT_GLB_URL;

// Cloth surface: gentle body wrap, soft folds, hem ripples. Normals follow the folds.
function buildCloth(aspect, quality, width) {
  const W = width, H = W / aspect;
  const g = new THREE.PlaneGeometry(W, H, quality === 'high' ? 150 : 80, quality === 'high' ? 130 : 70);
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const nx = p.getX(i) / (W / 2), ny = p.getY(i) / (H / 2);
    let z = -0.2 * nx * nx;
    z += 0.05 * Math.sin(nx * 4.2 + ny * 1.3) * (0.6 + 0.4 * (1 - ny));
    z += 0.035 * Math.sin(ny * 7.5 - nx * 2.0) * Math.max(0, -ny + 0.2);
    z += 0.08 * Math.max(0, Math.abs(nx) - 0.55) * (ny > 0.1 ? 1 : 0.3);
    p.setZ(i, z * (W / 2.3));
  }
  g.computeVertexNormals();
  return g;
}

function useTextureOnce(url) {
  const [tex, setTex] = useState(null);
  useEffect(() => {
    let dead = false;
    new THREE.TextureLoader().load(url, (t) => {
      if (dead) { t.dispose(); return; }
      t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8;
      setTex(t);
    });
    return () => { dead = true; };
  }, [url]);
  return tex;
}

// Weave reveal shader patch (shared program across all garments).
function weavePatch(s) {
  s.uniforms.uWeave = { value: 0 }; s.uniforms.uTime = { value: 0 }; s.uniforms.uSeed = { value: 0 };
  s.vertexShader = s.vertexShader
    .replace('#include <common>', '#include <common>\nuniform float uTime; uniform float uSeed;')
    .replace('#include <begin_vertex>', `#include <begin_vertex>
      transformed.z += 0.025 * sin(uTime * 1.1 + uSeed * 6.0 + position.x * 2.2 + position.y * 1.4) + 0.015 * sin(uTime * 0.7 + position.y * 3.0);`);
  s.fragmentShader = s.fragmentShader
    .replace('#include <common>', `#include <common>
      uniform float uWeave;
      float wHash(vec2 c) { return fract(sin(dot(c, vec2(12.9898, 78.233))) * 43758.5453); }`)
    .replace('#include <map_fragment>', `#include <map_fragment>
      vec2 wg = vMapUv * vec2(150.0, 130.0);
      vec2 wc = floor(wg), wf = fract(wg);
      float h = wHash(wc);
      float warpT = (1.0 - vMapUv.y) * 0.62 + h * 0.08;
      float weftT = 0.22 + abs(vMapUv.x - 0.5) * 0.8 + h * 0.07;
      float w = uWeave * 1.12;
      float warpOn = step(abs(wf.x - 0.5), 0.36) * step(warpT, w);
      float weftOn = step(abs(wf.y - 0.5), 0.36) * step(weftT, w - 0.12);
      float closed = smoothstep(0.86, 1.0, uWeave);
      float shown = max(max(warpOn, weftOn), closed);
      if (shown < 0.5) discard;
      float over = mod(wc.x + wc.y, 2.0);
      float crossing = warpOn * weftOn * (1.0 - closed);
      diffuseColor.rgb *= 1.0 - 0.28 * crossing * over;
      float edge = max(exp(-pow((warpT - w) * 45.0, 2.0)) * warpOn, exp(-pow((weftT - w + 0.12) * 45.0, 2.0)) * weftOn) * (1.0 - closed);`)
    .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
      totalEmissiveRadiance += vec3(1.0, 0.92, 0.8) * edge * 0.75;`);
}

export function PhotoGarment({ product, weave, quality, reduced, position = [0, 0, 0], width = 2.3, seed = 0, swing = 0.16 }) {
  const geo = useMemo(() => buildCloth(product.aspect, quality, width), [product.aspect, quality, width]);
  const tex = useTextureOnce(product.image);
  const group = useRef();
  const shader = useRef(null);
  const onBeforeCompile = useMemo(() => (s) => { weavePatch(s); s.uniforms.uSeed.value = seed; shader.current = s; }, [seed]);
  useFrame((state) => {
    const w = weave.current;
    if (!group.current) return;
    group.current.visible = w > 0.001 && !!tex;
    const t = state.clock.elapsedTime + seed * 10;
    group.current.rotation.y = reduced ? 0 : Math.sin(t * 0.32) * swing;
    group.current.rotation.z = reduced ? 0 : Math.sin(t * 0.25) * 0.025;
    group.current.position.y = position[1] + (reduced ? 0 : Math.sin(t * 0.6) * 0.05);
    if (shader.current) {
      shader.current.uniforms.uWeave.value = w;
      if (!reduced) shader.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });
  return (
    <group ref={group} position={position} visible={false}>
      {tex && (
        <mesh geometry={geo}>
          <meshPhysicalMaterial map={tex} alphaTest={0.5} side={THREE.DoubleSide} roughness={0.86} sheen={0.6} sheenRoughness={0.7} sheenColor="#9fb6ff" onBeforeCompile={onBeforeCompile} customProgramCacheKey={() => 'minds-weave'} />
        </mesh>
      )}
    </group>
  );
}

// One studio rig for the loom area: warm key, cool rim, soft fill — aimed at the loom.
export function GarmentLights() {
  const target = useMemo(() => new THREE.Object3D(), []);
  const f = THREAD_FOCUS;
  return (
    <>
      <primitive object={target} position={[f.x, f.y, f.z - 1.5]} />
      <spotLight position={[f.x - 4.2, f.y + 4.5, f.z + 6]} target={target} angle={0.75} penumbra={0.9} intensity={95} distance={26} decay={2} color="#fff1e6" />
      <spotLight position={[f.x + 4.5, f.y + 2.5, f.z - 8]} target={target} angle={0.8} penumbra={1} intensity={70} distance={24} decay={2} color="#a9b8ff" />
      <pointLight position={[f.x + 2.5, f.y - 2.5, f.z + 4]} intensity={5} distance={14} decay={2} color="#ffd2c4" />
    </>
  );
}

// Scene 04 hero: the garment woven at the loom.
export function Garment({ weave, quality, reduced }) {
  return <PhotoGarment product={GARMENT} weave={weave} quality={quality} reduced={reduced} position={[THREAD_FOCUS.x, THREAD_FOCUS.y, THREAD_FOCUS.z]} />;
}
