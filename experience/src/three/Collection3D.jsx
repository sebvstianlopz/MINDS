/*
 * SCENE 05 — DISCOVER MINDS
 * The rest of the collection weaves itself in around the hero tee as the camera pulls back:
 * real MINDS products (src/data/products.js) floating at different depths in the void.
 * Each garment's weave is staggered from the scene's `reveal` ref (0..1).
 */
import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PRODUCTS } from '../data/products.js';
import { THREAD_FOCUS } from './NeuralUniverse.jsx';
import { PhotoGarment } from './Garment.jsx';

// [x, y, z offset from the loom, width] — a loose constellation around the hero (which stays at the loom).
const SLOTS = [
  [-2.9, 0.95, -1.6, 1.7],
  [2.95, 0.8, -2.0, 1.7],
  [-3.6, -1.25, -0.8, 1.75],
  [3.5, -1.15, -1.1, 1.75],
  [-1.35, 2.15, -3.6, 1.3],
  [1.55, -2.3, -3.0, 1.35],
  [0.4, 2.55, -4.6, 1.25],
];

// Phones (portrait): a tall column composition that stays between the header and the scene title.
const PHONE_SLOTS = [
  [-0.95, 1.7, -1.6, 1.12],
  [1.0, 1.6, -2.0, 1.12],
  [-1.0, -1.5, -0.8, 1.05],
  [1.02, -1.45, -1.1, 1.05],
  [-0.55, 2.95, -3.6, 0.92],
  [-1.6, 0.25, -3.0, 0.8],
  [0.8, 3.05, -4.6, 0.92],
];

const band = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

export function Collection3D({ reveal, quality, reduced }) {
  const { size } = useThree();
  const aspect = size.width / size.height;
  const phone = aspect < 0.75;
  // in-between screens: pull the constellation in sideways and stretch it a little vertically
  const sx = Math.min(1, Math.max(0.5, aspect / 1.5)), sy = Math.min(1.3, 1 / Math.sqrt(sx));
  const items = useMemo(() => PRODUCTS.slice(1).map((product, i) => {
    if (phone) {
      const [x, y, dz, w] = PHONE_SLOTS[i % PHONE_SLOTS.length];
      return { product, i, pos: [THREAD_FOCUS.x + x, THREAD_FOCUS.y + y, THREAD_FOCUS.z + dz], w };
    }
    const [x, y, dz, w] = SLOTS[i % SLOTS.length];
    return { product, i, pos: [THREAD_FOCUS.x + x * sx, THREAD_FOCUS.y + y * sy, THREAD_FOCUS.z + dz], w: w * (0.75 + 0.25 * sx) };
  }), [phone, sx, sy]);
  const weaves = useRef(items.map(() => ({ current: 0 })));
  useFrame(() => {
    const r = reveal.current;
    weaves.current.forEach((wr, i) => { const start = 0.15 + i * 0.07; wr.current = band(start, start + 0.32, r); });
  });
  return (
    <>
      {items.map(({ product, i, pos, w }) => (
        <PhotoGarment key={product.handle} product={product} weave={weaves.current[i]} quality={quality} reduced={reduced} position={pos} width={w} seed={i + 1} swing={0.12} />
      ))}
    </>
  );
}
