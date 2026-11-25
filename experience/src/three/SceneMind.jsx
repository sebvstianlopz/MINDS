/*
 * SCENE 01 — THE MIND
 * A brain floating in an infinite dark void. Idle float + organic rotation run continuously;
 * scroll progress (0..1, written by GSAP ScrollTrigger into `progress.current`) drives the
 * camera approach. Everything is damped per frame, so scrubbing in either direction is smooth.
 */
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Brain } from './Brain.jsx';
import { NeuralFibers } from './NeuralFibers.jsx';

const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const damp = THREE.MathUtils.damp;
const lerp = THREE.MathUtils.lerp;
const band = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

function DimEnvironment({ intensity = 0.14 }) {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = env;
    scene.environmentIntensity = intensity; // a whisper of reflections; the spots do the lighting
    return () => { scene.environment = null; env.dispose(); pmrem.dispose(); };
  }, [gl, scene, intensity]);
  return null;
}

// Faint motes drifting through the void — depth cue only, no interaction.
function Dust({ count = 700 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      a[i * 3] = (Math.random() - 0.5) * 16;
      a[i * 3 + 1] = (Math.random() - 0.5) * 10;
      a[i * 3 + 2] = (Math.random() - 0.5) * 14 - 2;
    }
    return a;
  }, [count]);
  useFrame((_, dt) => { if (ref.current) ref.current.rotation.y += dt * 0.008; });
  return (
    <points ref={ref}>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
      <pointsMaterial size={0.018} sizeAttenuation color="#d9d3c7" transparent opacity={0.32} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

export function SceneMind({ progress, progress2, reduced, quality, onReady }) {
  const brain = useRef();
  const fiberOpacity = useRef(0);
  const brainMats = useRef(null);
  const depthMeshes = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });
  const { camera, size } = useThree();
  const aspect = size.width / size.height;

  useEffect(() => {
    if (reduced || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const move = (e) => { pointer.current.x = e.clientX / window.innerWidth - 0.5; pointer.current.y = e.clientY / window.innerHeight - 0.5; };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, [reduced]);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    const k = reduced ? 1000 : 1;                       // reduced motion: snap, no easing
    const p = reduced ? 0 : easeInOut(progress.current); // Scene 01
    const q = progress2.current;                         // Scene 02 (0..1)
    const fit = Math.min(1.9, Math.max(1, 0.9 / aspect)); // pull back on tall screens so the brain fits the width
    const zStart = 6.4 * fit, zEnd = 4.1 * fit;
    // Scene 02 phases: approach until the brain fills the frame → pass through the cortex → travel the fibers
    const approach = band(0, 0.45, q), enter = band(0.45, 0.8, q), travel = band(0.8, 1, q);
    const calm = 1 - approach;                           // idle motion and parallax settle as we close in
    let tx = Math.sin(p * Math.PI * 0.5) * 0.9 + pointer.current.x * 0.35 * calm;
    let ty = 0.25 - p * 0.35 - pointer.current.y * 0.2 * calm;
    let tz = lerp(zStart, zEnd, p);
    tx = lerp(tx, 0, approach); ty = lerp(ty, 0.02, approach);
    const near = 2.3 * Math.min(fit, 1.4);             // the whole brain still fits as it dissolves into fibers
    tz = lerp(tz, near, approach); tz = lerp(tz, -0.3, enter); tz = lerp(tz, -1.7, travel);
    camera.position.x = damp(camera.position.x, tx, 3.2 * k, dt);
    camera.position.y = damp(camera.position.y, ty, 3.2 * k, dt);
    camera.position.z = damp(camera.position.z, tz, 3.2 * k, dt);
    camera.lookAt(0, 0.02, lerp(0, camera.position.z - 4, band(0.35, 0.6, q)));
    // fibers fade up as the cortex turns translucent
    fiberOpacity.current = band(0.2, 0.42, q);
    if (!brain.current) return;
    if (!brainMats.current) {                            // collect materials once (works for the GLB too)
      const mats = new Set(), meshes = [];
      brain.current.traverse((o) => { if (o.isMesh && o.material && !o.material.isShaderMaterial) { mats.add(o.material); meshes.push(o); } });
      if (mats.size) {
        brainMats.current = [...mats];
        brainMats.current.forEach((m) => { m.transparent = true; m.needsUpdate = true; });
        // depth pre-pass: while the cortex fades, only its outermost layer is drawn (no inner walls showing through)
        const depthOnly = new THREE.MeshBasicMaterial({ colorWrite: false });
        depthMeshes.current = meshes.map((o) => { const d = new THREE.Mesh(o.geometry, depthOnly); d.renderOrder = -1; o.add(d); return d; });
      }
    }
    const surface = 1 - band(0.26, 0.44, q);
    if (brainMats.current) brainMats.current.forEach((m) => { m.opacity = surface; m.visible = surface > 0.005; });
    if (depthMeshes.current) depthMeshes.current.forEach((d) => { d.visible = surface > 0.02; });
    // idle float + organic rotation; Scene 01 adds a quarter turn, Scene 02 squares the brain to the camera
    const float = reduced ? 0 : (Math.sin(t * 0.7) * 0.06 + Math.sin(t * 0.31) * 0.03) * calm;
    brain.current.position.y = damp(brain.current.position.y, float, 4 * k, dt);
    let yaw = reduced ? -1.05 : -1.1 + Math.sin(t * 0.18) * 0.2 + p * 0.75;
    let pitch = reduced ? 0.22 : 0.2 + Math.sin(t * 0.23) * 0.05;
    let roll = reduced ? 0 : Math.sin(t * 0.15) * 0.03;
    yaw = lerp(yaw, 0, approach); pitch = lerp(pitch, 0, approach); roll = lerp(roll, 0, approach);
    brain.current.rotation.y = damp(brain.current.rotation.y, yaw, 2.5 * k, dt);
    brain.current.rotation.x = damp(brain.current.rotation.x, pitch, 2.5 * k, dt);
    brain.current.rotation.z = damp(brain.current.rotation.z, roll, 2.5 * k, dt);
  });

  return (
    <>
      <color attach="background" args={['#050506']} />
      <fog attach="fog" args={['#050506', 12, 30]} />
      <DimEnvironment />
      <ambientLight intensity={0.06} />
      {/* key: warm, high and to the left */}
      <spotLight position={[-4.5, 5.5, 4.5]} angle={0.42} penumbra={0.9} intensity={75} distance={20} decay={2} color="#ffe6d8" castShadow={quality === 'high'} shadow-mapSize={[1024, 1024]} shadow-bias={-0.0004} />
      {/* rim: cool, from behind, carves the silhouette out of the void */}
      <spotLight position={[3.5, 2.5, -5]} angle={0.5} penumbra={1} intensity={130} distance={20} decay={2} color="#a9b8ff" />
      {/* low fill from below-right so the shadow side keeps its folds */}
      <pointLight position={[3, -2.5, 3]} intensity={6} distance={12} decay={2} color="#ffd2c4" />
      <group ref={brain} scale={1.05}>
        <Brain quality={quality} onReady={onReady} />
        <NeuralFibers opacity={fiberOpacity} quality={quality} reduced={reduced} />
      </group>
      {quality === 'high' && <Dust />}
    </>
  );
}
