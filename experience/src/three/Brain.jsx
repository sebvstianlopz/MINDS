/*
 * Brain model switch — the ONE place to swap the placeholder for the production asset.
 *
 * To use the real brain:
 *   1. Export it as a Draco-compressed GLB (aim for < 3 MB, ~100k triangles), centred at the
 *      origin, about 2 units long front-to-back, +Z facing the viewer.
 *   2. Put it at experience/public/models/brain.glb.
 *   3. Set BRAIN_GLB_URL = 'models/brain.glb' below.
 */
import { Suspense } from 'react';
import { useGLTF } from '@react-three/drei';
import { ProceduralBrain, IS_PLACEHOLDER as PROCEDURAL_IS_PLACEHOLDER } from './ProceduralBrain.jsx';

export const BRAIN_GLB_URL = null; // e.g. 'models/brain.glb'
export const BRAIN_IS_PLACEHOLDER = !BRAIN_GLB_URL && PROCEDURAL_IS_PLACEHOLDER;

function GlbBrain({ url, onReady }) {
  const { scene } = useGLTF(url, true);
  if (onReady) queueMicrotask(onReady);
  return <primitive object={scene} />;
}

export function Brain({ quality, onReady }) {
  if (!BRAIN_GLB_URL) return <ProceduralBrain quality={quality} onReady={onReady} />;
  return (
    <Suspense fallback={null}>
      <GlbBrain url={BRAIN_GLB_URL} onReady={onReady} />
    </Suspense>
  );
}
