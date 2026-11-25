# MINDS — Inside Your Mind

A scroll-driven 3D experience for MINDS, built in stages. **Stage 1 (this build): Scene 01, "The Mind".**
It's separate from the storefront prototype (`../prototype/`). Its header links go to the storefront.

## Stack
- React 18 + Vite 5 (JavaScript/JSX; the repo has no TypeScript)
- Three.js 0.170, React Three Fiber 8, drei 9, @react-three/postprocessing
- GSAP 3 + ScrollTrigger

## Run and build
```bash
npm install
npm run dev      # local dev server
npm run build    # vite build (single file) + scripts/build-artifact.mjs → artifact/
```
`artifact/index.html` is the publishable page: a body fragment with inlined JS and CSS, with `logo-ink.webp` beside it.

## Architecture
| File | Role |
|---|---|
| `src/App.jsx` | Fixed full-screen `<Canvas>` behind the HTML. One GSAP ScrollTrigger scrubs Scene 01 and writes `progress.current` (0..1, a ref, so React doesn't re-render). The copy timeline rides the same trigger. |
| `src/three/SceneMind.jsx` | Scene 01: the void (background, fog, dust), lighting (warm key, cool rim, low fill, dim room environment), idle float and rotation, and the scroll-driven camera dolly and orbit. Everything is damped per frame, so scrubbing in either direction is smooth. |
| `src/three/Brain.jsx` | **Model switch.** Uses `BRAIN_GLB_URL` when it's set, otherwise the procedural placeholder. |
| `src/three/ProceduralBrain.jsx` | **PLACEHOLDER.** A brain generated in code: two hemispheres, warped-noise gyri and sulci, a lateral fissure and central sulcus, a cerebellum, a brainstem, and a wet physical material. |
| `src/three/noise.js` | A small seeded 3D simplex noise. |
| `src/ui/Overlay.jsx` | Header, the "What's on your mind?" copy and the placeholder label. |
| `src/styles.css` | Dark editorial layout (Big Shoulders Display + Archivo). |

**Scroll map:** Scene 01 is a 220svh runway. Progress 0 → 1 moves the camera from z 6.4 to 4.1 with a slight orbit and lift, adds a quarter turn to the brain, and moves the two headline lines apart as they fade. The camera distance scales up on tall screens.

**Performance:**
- Device pixel ratio is capped at 2, and lowered automatically under load (`PerformanceMonitor`).
- Rendering pauses when the tab is hidden.
- Phones and other low-power devices get a lighter brain mesh with no shadows, post effects or dust.
- The headline paints at once; the canvas fades in when the brain is ready.

**Reduced motion:** a static framing with no float, rotation or scroll scrub.

## Placeholder and missing assets
| Asset | Status | Replace by |
|---|---|---|
| Brain model | **Placeholder** (procedural) | Export a Draco-compressed GLB (aim for under 3 MB and about 100k triangles), centred at the origin, about 2 units long front to back, facing +Z. Save it as `public/models/brain.glb` and set `BRAIN_GLB_URL = 'models/brain.glb'` in `src/three/Brain.jsx`. The "Placeholder 3D brain" label disappears automatically. |
| Garment models (Scenes 04–05) | Missing | Real MINDS hoodie and tee scans or models (GLB), plus their real artwork. Product graphics will not be invented. |
| Collection data (Scene 05) | Missing | Reuse the storefront catalogue, or connect Shopify. |

## Roadmap
1. ✅ **Scene 01, The Mind:** a floating brain hero, cinematic lighting, a scroll camera and the headline.
2. **Scene 02, Enter the Mind:** the camera approaches and enters the brain, neural fibres with light pulses, "RESET YOUR MIND."
3. **Scene 03, Neural Universe:** a flight through fibres, some turning into textile threads.
4. **Scene 04, Fashion Inside Your Mind:** threads weave into a MINDS garment (needs real assets), "WEAR WHAT'S ON YOUR MIND."
5. **Scene 05, Discover MINDS:** a pull-back to floating garments, then a hand-off into the collection.
