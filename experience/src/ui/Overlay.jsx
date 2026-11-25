import { forwardRef } from 'react';
import { BRAIN_IS_PLACEHOLDER } from '../three/Brain.jsx';
import { GARMENT, GARMENT_IS_PLACEHOLDER } from '../three/Garment.jsx';
import { PRODUCTS } from '../data/products.js';
import { EMBEDDED, closeToStore, storeLink } from './store.js';

export { STORE_URL } from './store.js';

export function Header() {
  return (
    <header className="hdr">
      <a className="hdr-logo" {...storeLink('#home')} aria-label="MINDS store home"><img src="logo-ink.webp" alt="MINDS" width="132" height="37" /></a>
      <nav className="hdr-nav" aria-label="Main">
        <a {...storeLink('#shop')}>Shop</a>
        <a className="hdr-opt" {...storeLink('#new')}>New arrivals</a>
        {EMBEDDED
          ? <button type="button" className="hdr-back" onClick={closeToStore}><span aria-hidden="true">✕</span> Back to store</button>
          : <a {...storeLink('#visit')}>Stores</a>}
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
      <a className="s4-shop" {...storeLink('#p-' + GARMENT.handle)}>
        <span className="s4-name">{GARMENT.name}<span className="s4-meta"> · {GARMENT.color}</span></span>
        <span className="s4-price">{GARMENT.price}</span>
        <span className="s4-cta">Shop the tee</span>
      </a>
    </div>
  );
}

// Scene 05 copy.
export function SceneFiveCopy() {
  return (
    <div className="s5-copy">
      <h2 className="s5-title" id="s5-title">Discover MINDS</h2>
    </div>
  );
}

// The shop hand-off: the same real products, as a browsable grid linking into the storefront.
export function CollectionGrid() {
  return (
    <section className="coll" aria-labelledby="coll-title">
      <div className="coll-head">
        <h2 className="coll-title" id="coll-title">The collection</h2>
        <a className="btn" {...storeLink('#shop')}>Shop the full collection</a>
      </div>
      <ul className="coll-grid">
        {PRODUCTS.map((p) => (
          <li key={p.handle}>
            <a className="coll-card" {...storeLink('#p-' + p.handle)}>
              <span className="coll-tile"><img src={p.image} alt={p.name + ', ' + p.color} loading="lazy" width="600" height={Math.round(600 / p.aspect)} /></span>
              <span className="coll-row"><span className="coll-name">{p.name}</span><span className="coll-price">{p.price}</span></span>
              <span className="coll-color">{p.color}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="foot">
      <img src="logo-ink.webp" alt="MINDS" width="110" height="31" />
      <nav aria-label="Footer">
        <a {...storeLink('#shop')}>Shop</a>
        <a {...storeLink('#new')}>New arrivals</a>
        <a {...storeLink('#visit')}>Stores</a>
        <a href="https://www.instagram.com/minds_tm">Instagram</a>
      </nav>
      <p>© 2026 MINDS · Prototype experience</p>
    </footer>
  );
}

export function PlaceholderTag() {
  if (!BRAIN_IS_PLACEHOLDER && !GARMENT_IS_PLACEHOLDER) return null;
  const what = BRAIN_IS_PLACEHOLDER && GARMENT_IS_PLACEHOLDER ? '3D models' : BRAIN_IS_PLACEHOLDER ? '3D brain' : 'garment model';
  return <p className="ph-tag">Placeholder {what}<span className="ph-more"> · final models pending</span></p>;
}
