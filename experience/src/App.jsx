import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerformanceMonitor } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SceneMind } from './three/SceneMind.jsx';
import { Header, SceneOneCopy, PlaceholderTag, STORE_URL } from './ui/Overlay.jsx';

gsap.registerPlugin(ScrollTrigger);

const prefersReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const lowTier = () => window.matchMedia('(max-width: 760px), (pointer: coarse)').matches || (navigator.hardwareConcurrency || 8) <= 4;

export default function App() {
  const progress = useRef(0);           // Scene 01 scroll progress, 0..1 (no React re-render)
  const runway = useRef(null);
  const copy = useRef(null);
  const [reduced, setReduced] = useState(prefersReduced);
  const [quality] = useState(() => (lowTier() ? 'low' : 'high'));
  const [dpr, setDpr] = useState(() => Math.min(window.devicePixelRatio || 1, quality === 'high' ? 2 : 1.5));
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduced(mq.matches);
    mq.addEventListener('change', on);
    const vis = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', vis);
    return () => { mq.removeEventListener('change', on); document.removeEventListener('visibilitychange', vis); };
  }, []);

  // Scroll → scene. One ScrollTrigger scrubs Scene 01; the copy timeline rides the same trigger.
  useLayoutEffect(() => {
    if (reduced) { progress.current = 0; return; }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'none' } });
      tl.to('.s1-a', { xPercent: -18, yPercent: -30, autoAlpha: 0 }, 0)
        .to('.s1-b', { xPercent: 18, yPercent: 30, autoAlpha: 0 }, 0)
        .to('.s1-cue', { autoAlpha: 0, duration: 0.25 }, 0);
      ScrollTrigger.create({
        trigger: runway.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6,
        animation: tl,
        onUpdate: (self) => { progress.current = self.progress; },
      });
    }, copy);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <>
      <div className={'stage' + (ready ? ' is-ready' : '')} aria-hidden="true">
        <Canvas
          dpr={dpr}
          shadows={quality === 'high'}
          frameloop={visible ? 'always' : 'never'}
          gl={{ antialias: quality === 'high', powerPreference: 'high-performance', alpha: false }}
          camera={{ fov: 30, near: 0.1, far: 60, position: [0, 0.25, 7] }}
        >
          <PerformanceMonitor onDecline={() => setDpr((d) => Math.max(1, d - 0.5))} />
          <SceneMind progress={progress} reduced={reduced} quality={quality} onReady={() => setReady(true)} />
          {quality === 'high' && (
            <EffectComposer multisampling={0}>
              <Bloom intensity={0.35} luminanceThreshold={0.72} luminanceSmoothing={0.2} mipmapBlur />
              <Noise opacity={0.035} premultiply />
              <Vignette offset={0.25} darkness={0.8} />
            </EffectComposer>
          )}
        </Canvas>
      </div>

      <Header />

      <main id="main">
        {/* SCENE 01 — THE MIND: a 220vh scroll runway; the pinned copy sits in a sticky frame */}
        <section className="s1" ref={runway} aria-labelledby="s1-title">
          <div className="s1-frame">
            <SceneOneCopy ref={copy} />
          </div>
        </section>

        {/* End of Stage 1. Scene 02 (Enter the mind) attaches here next. */}
        <section className="next">
          <h2 className="next-title">Enter the mind</h2>
          <p className="next-copy">Scene 02 is in production. Until then, the collection is open.</p>
          <a className="btn" href={STORE_URL + '#new'}>Shop new arrivals</a>
        </section>
      </main>

      <PlaceholderTag />
    </>
  );
}
