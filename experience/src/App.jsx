import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerformanceMonitor } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SceneMind } from './three/SceneMind.jsx';
import { Header, SceneOneCopy, SceneTwoCopy, PlaceholderTag, STORE_URL } from './ui/Overlay.jsx';

gsap.registerPlugin(ScrollTrigger);

const prefersReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const lowTier = () => window.matchMedia('(max-width: 760px), (pointer: coarse)').matches || (navigator.hardwareConcurrency || 8) <= 4;

export default function App() {
  const progress = useRef(0);           // Scene 01 scroll progress, 0..1 (no React re-render)
  const progress2 = useRef(0);          // Scene 02 scroll progress, 0..1
  const progress3 = useRef(0);          // Scene 03 scroll progress, 0..1
  const runway = useRef(null);
  const runway2 = useRef(null);
  const runway3 = useRef(null);
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
    if (reduced) {
      // no scrubbing: Scene 02 cuts straight to its end frame when its section arrives
      progress.current = 0;
      const st = ScrollTrigger.create({ trigger: runway2.current, start: 'top 60%', onEnter: () => { progress2.current = 1; }, onLeaveBack: () => { progress2.current = 0; } });
      const st3 = ScrollTrigger.create({ trigger: runway3.current, start: 'top 60%', onEnter: () => { progress3.current = 1; }, onLeaveBack: () => { progress3.current = 0; } });
      return () => { st.kill(); st3.kill(); };
    }
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
      // Scene 02: one trigger scrubs the camera (via progress2) and the "Reset your mind." reveal
      const tl2 = gsap.timeline({ defaults: { ease: 'none' } });
      tl2.fromTo('.s2-title', { autoAlpha: 0, scale: 1.12, letterSpacing: '0.12em' }, { autoAlpha: 1, scale: 1, letterSpacing: '0.005em', duration: 0.2 }, 0.58)
        .to('.s2-title', { duration: 0.22 }, 0.78);
      ScrollTrigger.create({
        trigger: runway2.current,
        start: 'top bottom',
        end: 'bottom bottom',
        scrub: 0.6,
        animation: tl2,
        onUpdate: (self) => { progress2.current = self.progress; },
      });
      // Scene 03: camera flight + fiber-to-thread transformation
      ScrollTrigger.create({
        trigger: runway3.current,
        start: 'top bottom',
        end: 'bottom bottom',
        scrub: 0.6,
        onUpdate: (self) => { progress3.current = self.progress; },
      });
    });
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
          <SceneMind progress={progress} progress2={progress2} progress3={progress3} reduced={reduced} quality={quality} onReady={() => setReady(true)} />
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

        {/* SCENE 02 — ENTER THE MIND: the camera closes in, the cortex turns to fibers, and we pass inside */}
        <section className="s2" ref={runway2} aria-labelledby="s2-title">
          <div className="s2-frame">
            <SceneTwoCopy />
          </div>
        </section>

        {/* SCENE 03 — NEURAL UNIVERSE: a flight through the fibers as some of them become thread */}
        <section className="s3" ref={runway3} aria-label="Neural universe">
          <h2 className="sr-only">Neural universe</h2>
        </section>

        {/* End of the built stages. Scene 04 (Fashion inside your mind) attaches here next. */}
        <section className="next">
          <h2 className="next-title">Fashion inside your mind</h2>
          <p className="next-copy">Scene 04 is in production. Until then, the collection is open.</p>
          <a className="btn" href={STORE_URL + '#new'}>Shop new arrivals</a>
        </section>
      </main>

      <PlaceholderTag />
    </>
  );
}
