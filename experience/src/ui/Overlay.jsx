import { forwardRef } from 'react';
import { BRAIN_IS_PLACEHOLDER } from '../three/Brain.jsx';
import { GARMENT, GARMENT_IS_PLACEHOLDER } from '../three/Garment.jsx';

export const STORE_URL = 'https://claude.ai/artifact/DfHeg7AyNgYXgTWnWEntPH';

export function Header() {
  return (
    <header className="hdr">
      <a className="hdr-logo" href={STORE_URL} aria-label="MINDS store home"><img src="logo-ink.webp" alt="MINDS" width="132" height="37" /></a>
      <nav className="hdr-nav" aria-label="Main">
        <a href={STORE_URL + '#shop'}>Shop</a>
        <a href={STORE_URL + '#new'}>New arrivals</a>
        <a href={STORE_URL + '#visit'}>Stores</a>
      </nav>
    </header>
  );
}

// Scene 01 copy. Lines are split so GSAP can move them apart on scroll.
export const SceneOneCopy = forwardRef(function SceneOneCopy(_, ref) {
  return (
    <div className="s1-copy" ref={ref}>
      <h1 className="s1-title" id="s1-title" aria-label="What's on your mind?">
        <span className="s1-line s1-a" aria-hidden="true">What&rsquo;s on</span>
        <span className="s1-line s1-b" aria-hidden="true">your mind?</span>
      </h1>
      <p className="s1-cue" aria-hidden="true"><span className="s1-cue-bar" />Scroll</p>
    </div>
  );
});

// Scene 02 copy: appears once the camera is inside the brain.
export function SceneTwoCopy() {
  return (
    <div className="s2-copy">
      <h2 className="s2-title" id="s2-title">Reset your mind.</h2>
    </div>
  );
}

// Scene 04 copy: the statement plus the real product it shows.
export function SceneFourCopy() {
  return (
    <div className="s4-copy">
      <h2 className="s4-title" id="s4-title">Wear what&rsquo;s on your mind.</h2>
      <a className="s4-shop" href={STORE_URL + '#p-' + GARMENT.handle}>
        <span className="s4-name">{GARMENT.name}<span className="s4-meta"> · {GARMENT.color}</span></span>
        <span className="s4-price">{GARMENT.price}</span>
        <span className="s4-cta">Shop the tee</span>
      </a>
    </div>
  );
}

export function PlaceholderTag() {
  if (!BRAIN_IS_PLACEHOLDER && !GARMENT_IS_PLACEHOLDER) return null;
  const what = BRAIN_IS_PLACEHOLDER && GARMENT_IS_PLACEHOLDER ? '3D models' : BRAIN_IS_PLACEHOLDER ? '3D brain' : 'garment model';
  return <p className="ph-tag">Placeholder {what}<span className="ph-more"> · final models pending</span></p>;
}
