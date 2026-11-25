/*
 * SCENE 04 — FASHION INSIDE YOUR MIND
 * The converging threads weave a real MINDS garment into existence at the loom (THREAD_FOCUS).
 *
 * PLACEHOLDER GEOMETRY, REAL PRODUCT: the garment shape is a cloth-like surface built from the
 * real product cut-out photo (Endless Shine Tee, Cobalt — from the MINDS catalogue). No artwork
 * is invented. Replace with a garment GLB by setting GARMENT_GLB_URL (see README).
 *
 * `weave` and `opacity` are refs (0..1) written by the scene each frame.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { THREAD_FOCUS } from './NeuralUniverse.jsx';

export const GARMENT = {
  name: 'Endless Shine Tee', color: 'Cobalt', price: '$80',
  image: 'garments/endless-shine-tee-cobalt.webp', aspect: 896 / 778,
  handle: 'endlesshine-purple', // storefront product route
};
export const GARMENT_GLB_URL = null;
export const GARMENT_IS_PLACEHOLDER = !GARMENT_GLB_URL;

// Cloth surface: gentle body wrap, sleeves easing forward, soft folds. Normals follow the folds.
function buildCloth(quality) {
  const W = 2.3, H = W / GARMENT.aspect;
  const g = new THREE.PlaneGeometry(W, H, quality === 'high' ? 150 : 90, quality === 'high' ? 130 : 78);
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i);
    const nx = x / (W / 2), ny = y / (H / 2);
    let z = -0.2 * nx * nx;                                    // wraps around a body
    z += 0.05 * Math.sin(nx * 4.2 + ny * 1.3) * (0.6 + 0.4 * (1 - ny));
    z += 0.035 * Math.sin(ny * 7.5 - nx * 2.0) * Math.max(0, -ny + 0.2); // hem ripples
    z += 0.08 * Math.max(0, Math.abs(nx) - 0.55) * (ny > 0.1 ? 1 : 0.3); // sleeves come forward
    p.setZ(i, z);
  }
  g.computeVertexNormals();
  return g;
}

export function Garment({ weave, opacity, quality, reduced }) {
  const geo = useMemo(() => buildCloth(quality), [quality]);
  const group = useRef(), mat = useRef();
  const [tex, setTex] = useState(null);
  const shader = useRef(null);

  useEffect(() => {
    let dead = false;
    new THREE.TextureLoader().load(GARMENT.image, (t) => {
      if (dead) return;
      t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8;
      setTex(t);
    });
    return () => { dead = true; };
  }, []);

  // Weave reveal: warp threads grow top→bottom, weft fills centre→out, then the cloth closes up.
  const onBeforeCompile = useMemo(() => (s) => {
    s.uniforms.uWeave = { value: 0 }; s.uniforms.uTime = { value: 0 };
    s.vertexShader = s.vertexShader
      .replace('#include <common>', '#include <common>\nuniform float uTime;')
      .replace('#include <begin_vertex>', `#include <begin_vertex>
        transformed.z += 0.025 * sin(uTime * 1.1 + position.x * 2.2 + position.y * 1.4) + 0.015 * sin(uTime * 0.7 + position.y * 3.0);`);
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
        diffuseColor.rgb *= 1.0 - 0.28 * crossing * over;              // over/under shading while the weave is open
        float edge = max(exp(-pow((warpT - w) * 45.0, 2.0)) * warpOn, exp(-pow((weftT - w + 0.12) * 45.0, 2.0)) * weftOn) * (1.0 - closed);`)
      .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
        totalEmissiveRadiance += vec3(1.0, 0.92, 0.8) * edge * 0.75;`);
    shader.current = s;
  }, []);

  useFrame((state) => {
    const o = opacity.current;
    if (group.current) {
      group.current.visible = o > 0.002 && !!tex;
      const t = state.clock.elapsedTime;
      group.current.rotation.y = reduced ? 0 : Math.sin(t * 0.32) * 0.16;
      group.current.rotation.z = reduced ? 0 : Math.sin(t * 0.25) * 0.025;
      group.current.position.y = THREAD_FOCUS.y + (reduced ? 0 : Math.sin(t * 0.6) * 0.04);
    }
    if (shader.current) {
      shader.current.uniforms.uWeave.value = weave.current;
      if (!reduced) shader.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <group ref={group} position={[THREAD_FOCUS.x, THREAD_FOCUS.y, THREAD_FOCUS.z]} visible={false}>
      {/* studio lights for the garment, which sits far from the brain's key light */}
      <spotLight position={[-2.6, 2.8, 3.2]} angle={0.55} penumbra={0.8} intensity={34} distance={12} decay={2} color="#fff1e6" />
      <spotLight position={[2.4, 1.6, -2.5]} angle={0.7} penumbra={1} intensity={26} distance={10} decay={2} color="#a9b8ff" />
      <pointLight position={[1.8, -1.5, 2.5]} intensity={2.2} distance={8} decay={2} color="#ffd2c4" />
      {tex && (
        <mesh geometry={geo}>
          <meshPhysicalMaterial ref={mat} map={tex} alphaTest={0.5} side={THREE.DoubleSide} roughness={0.86} sheen={0.6} sheenRoughness={0.7} sheenColor="#9fb6ff" onBeforeCompile={onBeforeCompile} />
        </mesh>
      )}
    </group>
  );
}
