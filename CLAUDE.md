# MINDS — online shop

## Standing instruction

For all work on this project, use every available skill and plugin that improves website design and quality. Don't hand-roll a step that one of these covers. Pick the skills by phase:

### 1. Direction and brand
- `impeccable:impeccable`: the main design skill. Use it for direction, building, critique, audit, polish and DESIGN.md. Its sub-agents (`impeccable-finish-reviewer`, `impeccable-motion-reviewer`, `impeccable-documenter`, `impeccable-asset-producer`) review and document the build.
- `frontend-design:frontend-design`: production frontend craft.
- `anthropic-skills:taste-high-end-visual-design`, `taste-design-taste-frontend`, `taste-brandkit`, `taste-minimalist-ui` (choose the taste variant that fits the brand), and `taste-redesign-existing-projects` once pages exist.
- `small-business:brand-style`: captures the brand look from a website link or a plain description.

### 2. Design system
- `design:design-system`: tokens, naming and component documentation.
- `design:design-handoff`: specs for components and breakpoints.

### 3. Motion and interaction
- `anthropic-skills:emil-design-eng`, `emil-animate`, `emil-find-animation-opportunities`, `emil-improve-animations` and `emil-animation-performance`.
- `anthropic-skills:emil-apple-design`: polished interaction details.

### 4. Copy and content
- `design:ux-copy`: CTAs, empty states, errors and checkout microcopy.
- `marketing:content-creation` / `marketing:draft-content`: landing and product page copy.
- `marketing:brand-review`: checks copy against the brand voice.

### 5. Quality gates (run before every merge)
- `design:accessibility-review`: WCAG 2.1 AA.
- `design:design-critique` and `impeccable` critique/audit.
- `anthropic-skills:emil-break-ui`: stress-tests edge cases and long content.
- The Playwright plugin: screenshots at phone, tablet and desktop widths, plus console checks.
- `marketing:seo-audit` and `small-business:seo-ai-visibility`.
- `security-review` and `code-review`, especially for cart, checkout and auth.

### Connected services for the shop
- **Stripe** MCP: products, prices, checkout.
- **Supabase** MCP: database, auth, orders.
- **Canva** MCP: social and marketing images, product graphics.
- **Hostinger** (proxy-connected), **Cloudflare** and **Webflow** MCPs: hosting and deploy options.
- **Figma** plugin: currently fails to connect from the cloud environment (proxy 403). Use it once it's reachable.

## Conventions
- Develop on the session's `claude/*` branch. Never push to `main` without permission.
- Mobile-first. No horizontal scroll at 360px. Respect `prefers-reduced-motion` and `prefers-color-scheme`.
