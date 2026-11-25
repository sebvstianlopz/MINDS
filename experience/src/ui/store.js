// Links from the experience to the MINDS store prototype.
//
// The experience runs two ways:
//  - store homepage: built into the store page itself (src/embed.jsx → ../prototype/mind.js).
//    Store links are plain hash routes on the same page (#p-<handle>, #shop, #new, #visit).
//  - standalone: its own artifact link. Store links point at the store artifact URL.
export const STORE_URL = 'https://claude.ai/artifact/DfHeg7AyNgYXgTWnWEntPH';

let HOME = false;
export function setHome() { HOME = true; }

// Props for an <a> that goes to a store route, in either mode.
export function storeLink(hash) {
  return { href: HOME ? hash : STORE_URL + hash };
}
