// Store-homepage build: the 3D journey mounted at the top of the MINDS store prototype's homepage.
// Built by `npm run build:embed` into ../prototype/mind.js. The store calls mount(el) once, then
// setActive(false/true) as the visitor leaves and returns to the homepage.
import { createRoot } from 'react-dom/client';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import App from './App.jsx';
import { setHome } from './ui/store.js';
import { setActive as setActiveState } from './embedState.js';
import css from './styles.css?inline';   // scoped under .mx at build time (vite.embed.config.js)

export function mount(el, { onReady } = {}) {
  setHome();
  if (!document.getElementById('mx-style')) {
    const style = document.createElement('style');
    style.id = 'mx-style';
    style.textContent = css;
    document.head.appendChild(style);
  }
  el.classList.add('mx');
  const root = createRoot(el);
  root.render(<App mode="home" onReady={onReady} />);
  return {
    setActive(on) {
      setActiveState(on);
      if (on) requestAnimationFrame(() => ScrollTrigger.refresh());
    },
    refresh() { ScrollTrigger.refresh(); },
    destroy() { root.unmount(); },
  };
}
