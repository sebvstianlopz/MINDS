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

const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const damp = THREE.MathUtils.damp;

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

export function SceneMind({ progress, reduced, quality, onReady }) {
  const brain = useRef();
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
    const p = reduced ? 0 : easeInOut(progress.current);
    const fit = Math.min(1.9, Math.max(1, 0.9 / aspect)); // pull back on tall screens so the brain fits the width
    const zStart = 6.4 * fit, zEnd = 4.1 * fit;
    // camera: dolly in with a slight orbit and lift
    const tx = Math.sin(p * Math.PI * 0.5) * 0.9 + pointer.current.x * 0.35;
    const ty = 0.25 - p * 0.35 - pointer.current.y * 0.2;
    const tz = THREE.MathUtils.lerp(zStart, zEnd, p);
    camera.position.x = damp(camera.position.x, tx, 3.2, dt);
    camera.position.y = damp(camera.position.y, ty, 3.2, dt);
    camera.position.z = damp(camera.position.z, tz, 3.2, dt);
    camera.lookAt(0, 0.02, 0);
    if (!brain.current) return;
    // idle: float + organic rotation; scroll adds a quarter turn
    const float = reduced ? 0 : Math.sin(t * 0.7) * 0.06 + Math.sin(t * 0.31) * 0.03;
    brain.current.position.y = damp(brain.current.position.y, float, 4, dt);
    const yaw = reduced ? -1.05 : -1.1 + Math.sin(t * 0.18) * 0.2 + p * 0.75;
    const pitch = reduced ? 0.22 : 0.2 + Math.sin(t * 0.23) * 0.05;
    const roll = reduced ? 0 : Math.sin(t * 0.15) * 0.03;
    brain.current.rotation.y = damp(brain.current.rotation.y, yaw, 2.5, dt);
    brain.current.rotation.x = damp(brain.current.rotation.x, pitch, 2.5, dt);
    brain.current.rotation.z = damp(brain.current.rotation.z, roll, 2.5, dt);
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
      </group>
      {quality === 'high' && <Dust />}
    </>
  );
}
