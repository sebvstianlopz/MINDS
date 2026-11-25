# MINDS — Inside Your Mind

A scroll-driven 3D experience for MINDS, built in stages. **All five scenes are built: "The Mind", "Enter the Mind", "Neural Universe", "Fashion Inside Your Mind" and "Discover MINDS".**
It runs in two places:
- **As the store homepage** (the main way in): the journey is the top of the store prototype's homepage, and the store continues below it on the same page. `npm run build:embed` builds `src/embed.jsx` into `../prototype/mind.js` (one ES module, its CSS scoped under `.mx` so it can't touch the store's styles) and copies `garments/` beside it. The store loads it on the homepage, pauses it on other pages and once you scroll past it into the store, and collapses the slot if WebGL or the module fails. In this mode the store supplies the header and everything after Scene 05, and "Shop the tee" is a plain `#p-…` link on the same page.
- **Standalone**, at its own artifact link (`npm run build` → `artifact/`): the full page with its own header, collection grid and footer. Its store links open the store artifact URL.

## Stack
- React 18 + Vite 5 (JavaScript/JSX; the repo has no TypeScript)
- Three.js 0.170, React Three Fiber 8, drei 9, @react-three/postprocessing
- GSAP 3 + ScrollTrigger

## Run and build
```bash
npm install
npm run dev      # local dev server
npm run build        # standalone: vite build (single file) + scripts/build-artifact.mjs → artifact/
npm run build:embed  # store homepage: src/embed.jsx → ../prototype/mind.js (+ garments/)
```
For the store homepage, run `npm run build:embed`, then publish `prototype/index.html` with `mind.js` and `garments/` beside it. `artifact/index.html` is the standalone page: a body fragment with inlined JS and CSS, with `logo-ink.webp` and `garments/` beside it.

## Architecture
| File | Role |
|---|---|
| `src/App.jsx` | Fixed full-screen `<Canvas>` behind the HTML. One GSAP ScrollTrigger scrubs Scene 01 and writes `progress.current` (0..1, a ref, so React doesn't re-render). The copy timeline rides the same trigger. |
| `src/three/SceneMind.jsx` | Scene 01: the void (background, fog, dust), lighting (warm key, cool rim, low fill, dim room environment), idle float and rotation, and the scroll-driven camera dolly and orbit. Everything is damped per frame, so scrubbing in either direction is smooth. |
| `src/three/Brain.jsx` | **Model switch.** Uses `BRAIN_GLB_URL` when it's set, otherwise the procedural placeholder. |
| `src/three/ProceduralBrain.jsx` | **PLACEHOLDER.** A brain generated in code: two hemispheres, warped-noise gyri and sulci, a lateral fissure and central sulcus, a cerebellum, a brainstem, and a wet physical material. |
| `src/three/NeuralFibers.jsx` | Scene 02's neural network: about 430 nodes in the brain volume plus a corridor beyond it along −Z (for Scene 03), joined by curved fibres. A GPU shader sends light pulses along each fibre, and synapse points glow. Opacity is driven by a ref. |
| `src/three/NeuralUniverse.jsx` | Scene 03: about 160 long organic fibres flowing along −Z, with light pulses. 38 of them turn into textile threads (plied, lit tubes in MINDS bone, green and black) as a glowing front travels along each one. The threads converge on `THREAD_FOCUS` (0, 0, −15.5), the loom for Scene 04. |
| `src/three/Garment.jsx` | Scene 04: the **real** MINDS Endless Shine Tee (Cobalt) product cut-out, given a cloth-like surface (body wrap, folds, a floating ripple, sheen) at the loom. A shader weaves it in: warp threads, then weft, then it closes into fabric. The converging threads are drawn into it as it forms. **The geometry is a placeholder, but the product is real.** |
| `src/three/Collection3D.jsx` | Scene 05: the other seven catalogue products as floating photo-cloth garments around the hero tee, each weaving in on its own delay. Desktop and tablet use one constellation (`SLOTS`, squeezed sideways on narrower screens). Portrait phones get their own column layout (`PHONE_SLOTS`) that stays between the header and the title. |
| `src/data/products.js` | **The product list** for Scenes 04–05 and the collection grid: handle (the storefront route), name, colour, price, cut-out image and aspect. The first entry is the Scene 04 hero. |
| `src/three/noise.js` | A small seeded 3D simplex noise. |
| `src/ui/store.js` | Store links: plain hash routes on the store homepage, the store artifact URL when standalone (`storeLink(hash)`). |
| `src/embed.jsx`, `src/embedState.js`, `vite.embed.config.js`, `scripts/build-embed.mjs` | The store-homepage build: `mount(el)` returns `setActive(on)`, `refresh()` and `destroy()`. |
| `src/ui/Overlay.jsx` | Header, the scene copy, the collection grid (`CollectionGrid`), the footer and the placeholder label. |
| `src/styles.css` | Dark editorial layout (Big Shoulders Display + Archivo). |

**Scroll map:** Scene 01 is a 220svh runway. Progress 0 → 1 moves the camera from z 6.4 to 4.1 with a slight orbit and lift, adds a quarter turn to the brain, and moves the two headline lines apart as they fade. The camera distance scales up on tall screens.

**Scene 02 scroll map** (a 300svh runway, `progress2`):

| Progress | What happens |
|---|---|
| 0 → 0.45 | The camera approaches until the brain fills the frame, and the brain squares up to the camera. |
| 0.2 → 0.42 | The fibres fade up and glow through the cortex. |
| 0.26 → 0.44 | The cortex dissolves. A depth pre-pass draws only its outer layer, so no inner walls show. |
| 0.45 → 0.8 | The camera passes inside the brain, and its gaze turns forward along −Z. |
| 0.58 → 0.78 | "RESET YOUR MIND." resolves. |
| 0.8 → 1 | The camera travels along the fibres toward Scene 03. |

Under reduced motion, Scene 02 cuts straight to its end frame when the section arrives.

**Scene 03 scroll map** (a 350svh runway, `progress3`):

| Progress | What happens |
|---|---|
| 0 → 1 | The camera flies from z −1.7 to −8.6 along a gently swaying path, looking ahead. |
| 0.25 → 0.6 | The brain's own fibres fall behind. |
| 0.12 → 0.95 | Fibres turn into thread, each with its own start delay, so the change spreads gradually. |

Under reduced motion, Scene 03 cuts to its end frame (all threads formed).

**Scene 04 scroll map** (a 320svh runway, `progress4`):

| Progress | What happens |
|---|---|
| 0 → 0.6 | The camera settles in front of the loom. |
| 0.12 → 0.8 | The tee weaves itself. |
| 0.1 → 0.78 | The threads are consumed into it. |
| 0.6 → 0.95 | The fibre field steps back. |
| 0.76 | "WEAR WHAT'S ON YOUR MIND." appears. |
| 0.84 | The product link appears (name, colour, price, "Shop the tee", linking to `#p-endlesshine-purple` on the storefront). |

Under reduced motion, it cuts to the finished tee.

**Scene 05 scroll map** (a 300svh runway, `progress5`):

| Progress | What happens |
|---|---|
| 0 → 0.12 | The Scene 04 copy clears. |
| 0 → 0.75 | The camera pulls back from the loom (shorter on tall screens), with a slight lift and a slow sideways drift. |
| 0 → 0.6 | The fibre field dims further. |
| 0.15 → 0.89 | The seven other garments weave in one after another, then keep their own idle float and sway. |
| 0.3 → 0.48 | "DISCOVER MINDS" resolves. |
| after the runway | **The collection** section scrolls up over the scene: a grid of the eight product cards (cut-out, name, colour, price), each linking to its storefront product, plus "Shop the full collection" and the footer. The 3D garments stay faintly visible behind it. |

Scrolling up reverses everything, so the garments un-weave and the camera returns to the tee. Under reduced motion, Scene 05 cuts to its end frame.

**Changing the featured products:** edit `src/data/products.js`. Put each product's transparent cut-out (WebP) in `public/garments/`, and set `aspect` to the image's width divided by its height. `handle` must match the storefront product route. Scene 05 shows up to seven products around the hero, and the grid shows every entry.

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
| Garment model (Scene 04) | **Placeholder shape, real product photo** | Export the tee as a GLB with its real textures and set `GARMENT_GLB_URL` in `src/three/Garment.jsx` (the photo cloth is used until then). To feature another product, change `GARMENT` (name, colour, price, image, handle). |
| Garment models (Scene 05) | **Placeholder shape, real product photos** | The same photo-cloth surface as Scene 04, built from the storefront's own cut-outs. Swap in GLBs per product when they exist. |
| Collection data (Scene 05) | **Real, static** (`src/data/products.js`, copied from the storefront catalogue) | Connect the Shopify Storefront API to keep names, prices and stock live. |

## Roadmap
1. ✅ **Scene 01, The Mind:** a floating brain hero, cinematic lighting, a scroll camera and the headline.
2. ✅ **Scene 02, Enter the Mind:** the camera approaches and enters the brain, neural fibres with light pulses, "RESET YOUR MIND."
3. ✅ **Scene 03, Neural Universe:** a flight through fibres, some turning into textile threads.
4. ✅ **Scene 04, Fashion Inside Your Mind:** threads weave into a MINDS garment (needs real assets), "WEAR WHAT'S ON YOUR MIND."
5. ✅ **Scene 05, Discover MINDS:** a pull-back to floating real MINDS garments, "DISCOVER MINDS", then a hand-off into the shoppable collection grid.
6. **Next:** real garment and brain GLBs, live Shopify product data, and a final quality pass (accessibility, SEO, performance on real devices).
