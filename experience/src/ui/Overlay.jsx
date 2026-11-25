import { forwardRef } from 'react';
import { BRAIN_IS_PLACEHOLDER } from '../three/Brain.jsx';

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

export function PlaceholderTag() {
  if (!BRAIN_IS_PLACEHOLDER) return null;
  return <p className="ph-tag">Placeholder 3D brain<span className="ph-more"> · final model pending</span></p>;
}
