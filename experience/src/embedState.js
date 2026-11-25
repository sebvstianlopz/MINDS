// Host-controlled state for the store-homepage build (src/embed.jsx): the store pauses the scene
// when the visitor leaves the homepage, and resumes it on return.
let active = true;
const subs = new Set();
export const getActive = () => active;
export function setActive(v) { if (v === active) return; active = v; subs.forEach((fn) => fn()); }
export function subscribeActive(fn) { subs.add(fn); return () => subs.delete(fn); }
