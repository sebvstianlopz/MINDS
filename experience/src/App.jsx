import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerformanceMonitor } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SceneMind } from './three/SceneMind.jsx';
import { getActive, subscribeActive } from './embedState.js';
import { Header, SceneOneCopy, SceneTwoCopy, SceneFourCopy, SceneFiveCopy, CollectionGrid, Footer, PlaceholderTag } from './ui/Overlay.jsx';

gsap.registerPlugin(ScrollTrigger);

const prefersReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const lowTier = () => window.matchMedia('(max-width: 760px), (pointer: coarse)').matches || (navigator.hardwareConcurrency || 8) <= 4;

// mode 'standalone': the full page (header, collection grid, footer).
// mode 'home': the journey only, at the top of the store homepage (src/embed.jsx); the store supplies the rest.
export default function App({ mode = 'standalone', onReady }) {
  const home = mode === 'home';
  const active = useSyncExternalStore(subscribeActive, getActive);
  const journey = useRef(null);
  const [inView, setInView] = useState(true);
  const progress = useRef(0);           // Scene 01 scroll progress, 0..1 (no React re-render)
  const progress2 = useRef(0);          // Scene 02 scroll progress, 0..1
  const progress3 = useRef(0);          // Scene 03 scroll progress, 0..1
  const progress4 = useRef(0);          // Scene 04 scroll progress, 0..1
  const progress5 = useRef(0);          // Scene 05 scroll progress, 0..1
  const runway = useRef(null);
  const runway2 = useRef(null);
  const runway3 = useRef(null);
  const runway4 = useRef(null);
  const runway5 = useRef(null);
  const copy = useRef(null);
  const [reduced, setReduced] = useState(prefersReduced);
  const [quality] = useState(() => (lowTier() ? 'low' : 'high'));
  const [dpr, setDpr] = useState(() => Math.min(window.devicePixelRatio || 1, quality === 'high' ? 2 : 1.5));
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);

  // Store homepage: once the visitor scrolls past the journey into the store, the scene sleeps.
  useEffect(() => {
    if (!home) return undefined;
    const st = ScrollTrigger.create({ trigger: journey.current, start: 'top bottom', end: 'bottom top', onToggle: (self) => setInView(self.isActive) });
    setInView(st.isActive);
    return () => st.kill();
  }, [home]);

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
      const st4 = ScrollTrigger.create({ trigger: runway4.current, start: 'top 60%', onEnter: () => { progress4.current = 1; }, onLeaveBack: () => { progress4.current = 0; } });
      const st5 = ScrollTrigger.create({ trigger: runway5.current, start: 'top 60%', onEnter: () => { progress5.current = 1; }, onLeaveBack: () => { progress5.current = 0; } });
      return () => { st.kill(); st3.kill(); st4.kill(); st5.kill(); };
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
      // Scene 04: the garment weaves itself; copy and product link resolve once it is whole
      const tl4 = gsap.timeline({ defaults: { ease: 'none' } });
      tl4.fromTo('.s4-title', { autoAlpha: 0, yPercent: 30 }, { autoAlpha: 1, yPercent: 0, duration: 0.14 }, 0.76)
        .fromTo('.s4-shop', { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.1 }, 0.84)
        .to('.s4-copy', { duration: 0.06 }, 0.94);
      ScrollTrigger.create({
        trigger: runway4.current,
        start: 'top bottom',
        end: 'bottom bottom',
        scrub: 0.6,
        animation: tl4,
        onUpdate: (self) => { progress4.current = self.progress; },
      });
      // Scene 05: pull back, the collection weaves in, then hand off to the shop grid
      const tl5 = gsap.timeline({ defaults: { ease: 'none' } });
      tl5.to('.s4-copy', { autoAlpha: 0, duration: 0.12 }, 0)
        .fromTo('.s5-title', { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.18 }, 0.3)
        .to('.s5-copy', { duration: 0.1 }, 0.9);
      ScrollTrigger.create({
        trigger: runway5.current,
        start: 'top bottom',
        end: 'bottom bottom',
        scrub: 0.6,
        animation: tl5,
        onUpdate: (self) => { progress5.current = self.progress; },
      });
    });
    return () => ctx.revert();
  }, [reduced]);

  return (
    <>
      <div className={'stage' + (ready ? ' is-ready' : '') + (home && !inView ? ' is-away' : '')} aria-hidden="true">
        <Canvas
          dpr={dpr}
          shadows={quality === 'high'}
          frameloop={visible && active && inView ? 'always' : 'never'}
          gl={{ antialias: quality === 'high', powerPreference: 'high-performance', alpha: false }}
          camera={{ fov: 30, near: 0.1, far: 60, position: [0, 0.25, 7] }}
        >
          <PerformanceMonitor onDecline={() => setDpr((d) => Math.max(1, d - 0.5))} />
          <SceneMind progress={progress} progress2={progress2} progress3={progress3} progress4={progress4} progress5={progress5} reduced={reduced} quality={quality} onReady={() => { setReady(true); if (onReady) onReady(); }} />
          {quality === 'high' && (
            <EffectComposer multisampling={0}>
              <Bloom intensity={0.35} luminanceThreshold={0.72} luminanceSmoothing={0.2} mipmapBlur />
              <Noise opacity={0.035} premultiply />
              <Vignette offset={0.25} darkness={0.8} />
            </EffectComposer>
          )}
        </Canvas>
      </div>

      {!home && <Header />}

      <Main home={home} journey={journey}>
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

        {/* SCENE 04 — FASHION INSIDE YOUR MIND: the threads weave a real MINDS tee */}
        <section className="s4" ref={runway4} aria-labelledby="s4-title">
          <div className="s4-frame">
            <SceneFourCopy />
          </div>
        </section>

        {/* SCENE 05 — DISCOVER MINDS: the camera pulls back and the collection floats in the void */}
        <section className="s5" ref={runway5} aria-labelledby="s5-title">
          <div className="s5-frame">
            <SceneFiveCopy />
          </div>
        </section>

        {/* Hand-off from the 3D experience to the shop (on the store homepage, the store itself follows) */}
        {!home && <CollectionGrid />}
      </Main>

      {!home && <Footer />}

      {(!home || inView) && <PlaceholderTag />}
    </>
  );
}

// Standalone: the page's <main>. Store homepage: a plain block (the store owns <main>).
function Main({ home, journey, children }) {
  if (home) return <div className="mx-main" ref={journey}>{children}</div>;
  return <main id="main">{children}</main>;
}
