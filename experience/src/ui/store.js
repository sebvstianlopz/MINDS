// Links between the experience and the MINDS store prototype.
//
// The experience runs two ways:
//  - embedded: inside the store artifact, as experience.html in a full-screen overlay (store route #mind).
//    The store sets window.MINDS_STORE = true. Store links then tell the parent store to navigate,
//    and the store's router closes the overlay and shows that page.
//  - standalone: its own artifact link. Store links point at the store artifact URL.
export const STORE_URL = 'https://claude.ai/artifact/DfHeg7AyNgYXgTWnWEntPH';

function storeWindow() {
  try {
    if (window.parent && window.parent !== window && window.parent.MINDS_STORE) return window.parent;
  } catch (e) { /* cross-origin parent: not the store */ }
  return null;
}

export const EMBEDDED = typeof window !== 'undefined' && !!storeWindow();

// Navigate the parent store to a hash route (e.g. '#p-minds-jorts', '#shop'). The #mind history entry is
// replaced, so Back from the product returns to the page the visitor opened the experience from.
export function goToStore(hash) {
  const store = storeWindow();
  if (!store) return false;
  store.location.replace(store.location.href.split('#')[0] + hash);
  return true;
}

// Close the overlay and return to wherever the visitor was in the store.
export function closeToStore() {
  const store = storeWindow();
  if (!store) return false;
  if (store.MINDS_MIND_PUSHED) store.history.back();
  else store.location.hash = '#home';
  return true;
}

// Props for an <a> that goes to a store route, in either mode.
export function storeLink(hash) {
  return {
    href: STORE_URL + hash,
    onClick: (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (goToStore(hash)) e.preventDefault();
    },
  };
}

// Tell the store the experience has painted (it hides its loading state).
export function signalReady() {
  const store = storeWindow();
  if (store) store.postMessage({ type: 'minds-mind-ready' }, window.location.origin);
}
