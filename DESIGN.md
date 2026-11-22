---
name: MINDS
description: A campaign studio on warm bone, with stone product tiles, tall condensed capitals and MINDS campaign green as the one accent.
colors:
  bone: "#ECE8E1"
  bone-hi: "#F6F3EE"
  stone: "#DCD6CB"
  rule: "#CDC6B9"
  ink: "#171613"
  ink-2: "#514E47"
  green: "#1F3D2B"
  green-deep: "#142A1D"
  satin: "#6E9456"
  night: "#0F1912"
  on-dark: "#F2EEE6"
  on-dark-2: "#B9B6AC"
typography:
  display:
    fontFamily: "Big Shoulders Display, Arial Narrow, Helvetica Neue, sans-serif"
    fontSize: "clamp(60px, 7.2vw, 96px)"
    fontWeight: 900
    lineHeight: 0.84
    letterSpacing: "0.005em"
  display-closer:
    fontFamily: "Big Shoulders Display, Arial Narrow, Helvetica Neue, sans-serif"
    fontSize: "clamp(52px, 8vw, 96px)"
    fontWeight: 900
    lineHeight: 0.86
    letterSpacing: "0.005em"
  headline:
    fontFamily: "Big Shoulders Display, Arial Narrow, Helvetica Neue, sans-serif"
    fontSize: "clamp(48px, 6vw, 88px)"
    fontWeight: 900
    lineHeight: 0.88
    letterSpacing: "0.005em"
  title:
    fontFamily: "Big Shoulders Display, Arial Narrow, Helvetica Neue, sans-serif"
    fontSize: "clamp(36px, 4vw, 60px)"
    fontWeight: 900
    lineHeight: 0.88
    letterSpacing: "0.005em"
  title-list:
    fontFamily: "Big Shoulders Display, Arial Narrow, Helvetica Neue, sans-serif"
    fontSize: "clamp(32px, 3.4vw, 48px)"
    fontWeight: 900
    lineHeight: 0.9
  interlude:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(28px, 3.6vw, 52px)"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "-0.015em"
  price:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "22px"
    fontWeight: 500
    lineHeight: 1.55
    fontFeature: "tnum"
  lead:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
  name-row:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    lineHeight: 1.55
  label:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.07em"
  small:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "0.02em"
rounded:
  none: "0px"
spacing:
  gutter: "16px"
  gutter-wide: "32px"
  container: "1320px"
  gap-xs: "8px"
  gap-sm: "12px"
  gap-md: "24px"
  grid-row: "44px"
  grid-col: "20px"
  section: "clamp(64px, 9vw, 128px)"
  interlude: "clamp(88px, 12vw, 176px)"
components:
  button-primary:
    backgroundColor: "{colors.green}"
    textColor: "{colors.on-dark}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 26px"
    height: "50px"
  button-primary-hover:
    backgroundColor: "{colors.green-deep}"
    textColor: "{colors.on-dark}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 26px"
    height: "50px"
  button-ghost-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.bone}"
  button-light:
    backgroundColor: "{colors.on-dark}"
    textColor: "{colors.green}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 26px"
    height: "50px"
  button-ghost-light:
    backgroundColor: "transparent"
    textColor: "{colors.on-dark}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 26px"
    height: "50px"
  button-ghost-light-hover:
    backgroundColor: "{colors.on-dark}"
    textColor: "{colors.night}"
  product-tile:
    backgroundColor: "{colors.stone}"
    rounded: "{rounded.none}"
    padding: "11%"
  size-pill:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 14px"
    height: "44px"
  size-pill-selected:
    backgroundColor: "{colors.green}"
    textColor: "{colors.on-dark}"
  filter-chip:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 14px"
    height: "38px"
  filter-chip-pressed:
    backgroundColor: "{colors.green}"
    textColor: "{colors.on-dark}"
  buy-card:
    backgroundColor: "{colors.bone-hi}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "clamp(24px, 3vw, 40px)"
  text-input:
    backgroundColor: "{colors.bone-hi}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 16px"
    height: "52px"
  announcement-bar:
    backgroundColor: "{colors.green}"
    textColor: "{colors.on-dark}"
    typography: "{typography.small}"
    height: "38px"
  header:
    backgroundColor: "{colors.bone}"
    textColor: "{colors.ink}"
    height: "70px"
  footer:
    backgroundColor: "{colors.night}"
    textColor: "{colors.on-dark}"
---

# Design System: MINDS

## Overview

**Creative North Star: "The Campaign Studio"**

MINDS is shown the way a label shows a season: campaign photography and tall condensed capitals carry the page, the clothes sit on warm studio stone, and the brand mantra runs from the hero to the footer. The page itself is a warm bone ground, quiet enough that the product reads first. Depth comes from the clothes (alpha cut-outs throwing a soft studio shadow onto stone), not from interface chrome.

Rhythm alternates between the light studio and cinematic dark bands. A deep forest-green split hero opens the page, product tiles sit on bone, a full-bleed row of colour-blocked "Shop by piece" panels breaks the grid, a green-black campaign band frames on-model photography, and a green-black footer closes the mantra in giant type. One-sentence interludes in large Archivo sit between sections as breaths. Everything is square-cornered and ruled with hairlines; actions are uppercase labels in solid or outline buttons, with an arrow wherever the action moves you somewhere.

The system refuses the stock streetwear grid: a black hero with a centred outline button, followed by equal white cards. Green is the only accent and is never used as a decorative tint.

**Key Characteristics:**
- Warm bone page (`bone`) with stone product tiles (`stone`) and near-black ink.
- MINDS campaign green as the one accent: forest `green` for actions, bars and bands, `satin` only as a colour-block.
- Green-black (`night`) for cinematic bands and the footer.
- Big Shoulders Display 900, uppercase and tightly leaded, for every heading; Archivo for reading and labels.
- Square corners everywhere; 1px hairline rules and 1.5px ink or green strokes.
- Product flats are alpha cut-outs with a soft drop-shadow on stone; on-model photos are multiplied onto stone.
- The mantra split in three: hero, campaign band, footer.

## Colors

A warm, desaturated studio palette (bone, stone, ink) with one deep campaign green and its satin and green-black relatives.

### Primary
- **Campaign Forest** (`green`): the action colour and the hero ground. Solid buttons, the announcement bar, the hero panel, selected size pills, pressed filter chips, the bag count badge, active nav underline, focus outlines and text selection.
- **Deep Forest** (`green-deep`): hover state of the solid forest button only.

### Secondary
- **Satin Green** (`satin`): the green of the satin campaign set, used only as a full colour-block (the "Caps" panel in Shop by piece). Text on it is `ink`, never `on-dark`.

### Tertiary
- **Green-Black** (`night`): cinematic bands and the footer. The Femme Noir campaign band, the footer, the toast, the "Tops" colour-block, and the frame around the campaign photo. Scrims and drawer shadows are `night` at 45% and 18% alpha.

### Neutral
- **Warm Bone** (`bone`): the page ground, the sticky header and the sticky filter bar.
- **Bone Light** (`bone-hi`): raised studio surfaces: the floating buy card, the PDP buy panel, dialogs, the bag sheet, the mobile nav drawer, text inputs, the Visit section ground, store-row hover.
- **Studio Stone** (`stone`): every product image tile (grid cards, feature tile, bag thumbnails, campaign picks) and the "Pants" colour-block.
- **Warm Rule** (`rule`): 1px hairlines: header bottom, section dividers, accordions, table rows, store rows, disabled pill hatch.
- **Ink** (`ink`): text, outline-button strokes, input strokes, the heavy top rule on the store list and filter bar.
- **Graphite** (`ink-2`): secondary text (colour names, place names, counts, helper text) and the idle border of pills and chips.
- **On Dark** (`on-dark`) / **On Dark Muted** (`on-dark-2`): primary and secondary text on `green` and `night`. Dark-band hairlines are `on-dark` at 22% alpha.

### Named Rules
**The One Accent Rule.** Green is the only hue. Forest carries actions and bands; satin appears only as a whole colour-block panel; green-black is a ground. No other accent colour enters the system.

**The Stone Tile Rule.** Product imagery always sits on `stone`, never on the bone page directly and never on white.

- **Satin Light (#B5D99A):** used only for the outlined hero row. It is a lighter tint of the campaign green, about 7.6:1 on forest.

## Typography

**Display Font:** Big Shoulders Display (with Arial Narrow, Helvetica Neue)
**Body Font:** Archivo (with Helvetica Neue, Arial)

**Character:** Tall condensed capitals at weight 900, leaded tighter than their size (0.84 to 0.9), give the campaign-poster voice; Archivo at 400 to 600 keeps names, prices and instructions calm and legible.

### Hierarchy
- **Display** (900, clamp(60px, 7.2vw, 96px), 0.84): the hero mantra line only, set as two stacked lines.
- **Display Closer** (900, clamp(52px, 8vw, 96px), 0.86, max 12ch): the footer's closing mantra line.
- **Headline** (900, clamp(48px, 6vw, 88px), 0.88): section heads. Campaign (up to 96px), Visit (88px), feature and newsletter (72 to 80px), and PDP title (76px) use nearby clamps in the same voice.
- **Title** (900, clamp(36px, 4vw, 60px)): colour-block panel labels. **Title List** (900, clamp(32px, 3.4vw, 48px), 0.9) for store-list city names; 34px for mobile drawer links.
- **Interlude** (Archivo 500, clamp(28px, 3.6vw, 52px), 1.12, -0.015em, max 20ch, centred): the one-sentence breaks between sections.
- **Lead** (Archivo 400, 17px, max 36 to 42ch): hero, campaign and visit body copy.
- **Body** (Archivo 400, 16px, 1.55): running text.
- **Name Row** (Archivo 600, 15px): product name and price on one row, colour below in 14px graphite.
- **Price** (Archivo 500, 22px, tabular): the price on the buy card and PDP.
- **Label** (Archivo 600, 14px, 0.07em, uppercase): buttons, text links and the store "Directions" action (13px). Footer column heads use 13px at 0.08em.
- **Small** (Archivo 400, 13px): announcement bar, piece counts, breadcrumbs.

### Named Rules
**The Capitals Rule.** Every h1, h2 and h3 is Big Shoulders Display 900, uppercase, balanced, with line-height under 0.9. Body copy is never set in the display face.

**The Tabular Price Rule.** Prices, counts, hours and phone numbers use tabular figures.

## Layout

Mobile-first, with a 16px gutter (respecting safe-area insets) widening to 32px from 750px, inside a 1320px container. Sections breathe with `section` vertical padding; interludes take the larger `interlude` padding. Full-bleed moments (hero, Shop by piece, campaign band, Visit, footer) break out of the container; everything else sits within it.

- **Split hero:** a 5/7 grid. The forest panel holds bottom-aligned type, its left padding aligned to the container edge; the portrait fills the right column at full height (clamp(560px, 100svh - 108px, 860px)). Below 900px it stacks with the photo first (44svh, max 440px), then the panel.
- **Product grid:** 4 columns with 44px row and 20px column gaps; 2 columns with 32px and 12px below 990px. Tiles are 4:5.
- **Shop by piece:** 4 edge-to-edge 3:4 panels with no gaps; 2 by 2 below 900px.
- **Feature:** a 12-column grid; the 5:4 stone tile spans 1 to 8 and the buy card overlaps it from 8 to 13. Below 900px the card sits under the tile, pulled up 48px and inset 12px.
- **Campaign, Visit, Newsletter:** two equal columns, stacking below 900px (750px for the newsletter).
- **Store list:** a ruled 4-column row (city, place, hours, action); below 750px, city and action share the first row and the details stack under the city. Day groups never break mid-phrase.
- **PDP:** 7/5 gallery and sticky buy panel; below 850px a horizontal snap gallery and a flat buy panel.
- **Breakpoints:** 600, 750, 850, 900 and 990px. No horizontal scroll at 360px.

**The Full-Bleed Break Rule.** The contained grid is interrupted only by full-bleed bands of photography or solid colour, never by inset cards with margins.

## Elevation & Depth

The interface is flat and tonal: bone, bone-light and stone layers, hairline rules, and dark bands. Shadow belongs to the product, not the interface. Alpha product cut-outs cast a soft studio drop-shadow onto stone; on-model photographs carry no shadow and are multiplied onto the stone instead. The one interface shadow is the bag sheet's, cast leftward over the page.

### Shadow Vocabulary
- **Studio cast** (`filter: drop-shadow(0 16px 18px rgba(23, 22, 19, .14))`): product cut-outs on stone tiles.
- **Panel cast** (`filter: drop-shadow(0 18px 24px rgba(0, 0, 0, .18))`): product cut-outs on colour-block panels.
- **Sheet** (`box-shadow: -16px 0 48px rgba(15, 25, 18, .18)`): the bag drawer only.
- **Scrim** (`rgba(15, 25, 18, .45)`): behind the drawer, the nav drawer and dialogs.

### Named Rules
**The Product Casts the Shadow Rule.** Cards, buttons and panels never carry a box-shadow. Depth comes from the cut-out's drop-shadow, the bone-light surface and its 1px rule.

**The Multiply Rule.** On-model photographs on stone use `mix-blend-mode: multiply`, cover-fit and no padding; alpha flats use contain-fit with 11% padding (12% on the feature tile) and the studio cast.

## Shapes

Every surface is a square-cornered rectangle: tiles, panels, buttons, pills, chips, inputs, dialogs, the bag badge. Image aspect ratios are fixed by role: 4:5 product tiles and thumbnails, 3:4 colour-block panels, 5:4 feature tile, 1:1 PDP main image, 4:3 store photo on phones. Strokes come in two weights: 1px `rule` hairlines for dividers and surfaces, 1.5px `ink` or `green` for interactive outlines and the heavy top edge of ruled lists. The campaign photo is framed by a clamp(12px, 1.4vw, 20px) `night` border so it sits inside the band like a print. Icons are 1.5px-stroke line drawings at 22px; arrows are 20px (28px on panels).

**The Square Corner Rule.** Border-radius is zero on every component.

## Components

### Buttons
Confident uppercase labels in solid or outline boxes.
- **Shape:** square (0px), minimum height 50px (52px beside the newsletter input), 26px side padding, 1.5px border, 12px icon gap.
- **Primary:** forest fill with on-dark label; hover deepens to deep forest. Used for Add to bag, Get directions, Subscribe.
- **Ghost:** transparent with ink stroke and label; hover fills ink with a bone label.
- **Light / Ghost Light:** on green and night grounds, a solid on-dark fill with a forest label, or an on-dark outline that fills on hover with a night label.
- **Arrow:** any button or link that takes you elsewhere ends in the line arrow, which nudges 4px right on hover (0.35s).
- **Text link:** the uppercase label with a 1.5px underline rule and an arrow ("Shop all new →", "Full details →").
- **Transitions:** background, colour and border at 0.25s.

### Chips and Size Pills
- **Filter chip:** 38px, transparent with a 1px graphite border; ink border on hover; pressed fills forest with on-dark text.
- **Size pill:** 44px by at least 54px, same idle treatment; selected fills forest; sold-out shows a 135° hairline hatch in `rule` with graphite text; focus draws a 2px forest outline.

### Product Card
- **Tile:** a 4:5 stone rectangle. Flats contain-fit with padding and the studio cast; on-model images multiplied and cover-fit.
- **Hover (hover devices):** the image scales 1.035 over 0.8s, a second view cross-fades in when one exists, and the product name underlines.
- **Meta:** name and price on one row (600, 15px), colour below (14px graphite).

### Cards / Containers
- **Buy card:** bone-light with a 1px rule border and clamp(24px, 3vw, 40px) padding; no shadow. It floats over the feature tile on desktop and becomes the sticky PDP buy panel.
- **Photo needed slot:** bone-light with a dashed graphite border, a camera icon and a label; a placeholder for owner-blocked photography, not a decorative device.

### Inputs / Fields
- **Style:** square, 1.5px ink stroke, bone-light fill, 52px tall (38px in the filter bar), graphite placeholder. The newsletter input butts directly against its button (no right border).
- **Focus:** the global 2px forest outline at 3px offset (on-dark inside dark bands).

### Navigation
- **Announcement bar:** forest, 13px on-dark text, centred, a bold store-hours link.
- **Header:** sticky bone bar, 70px (58px on phones), 1px rule beneath; the logo with four inline Archivo 500 links that take a 1.5px forest underline on hover and when current. Below 900px a burger opens a bone-light drawer of 34px display-capital links divided by rules.
- **Filter bar:** sticky under the header, bone, ink top rule and rule bottom.

### Shop by Piece Panels (signature)
Edge-to-edge 3:4 colour-blocks in forest, stone, green-black and satin, each with a centred product cut-out (scales 1.05 on hover over 0.9s), and the label laid over the bottom: a display-capital title, a small style count and an arrow.

### Campaign Band (signature)
A green-black two-column band: the on-model photo framed in night on the left, and on the right bottom-aligned copy with the mantra line as its headline, a light button, and a ruled list of picks (56px stone thumbnail, name, colour and price, arrow) divided by 22% on-dark hairlines.

### Ruled Store List (signature)
An ink top rule, then rows divided by hairlines: a display-capital city, place, tabular hours and an uppercase "Directions →" action. Rows take a bone-light hover.

### Footer Closer (signature)
A green-black footer opening with "And the world will be yours." in giant display capitals (max 12ch), then a rule and four columns of logo, Shop, Help and Contact.

### Hero: Opposing Scroll Type (signature)
The hero is a pinned frame inside a 250svh scroll runway.
- **Frame:** sticky under the header; its height is the viewport minus the header.
- **Photo:** the campaign photo sits behind the type. When the frame is wider than 6:5, the whole portrait is shown right-aligned at full frame height on the forest field. Narrower frames cover the frame with the photo.
- **Type rows:** two repeated display rows at 11% of frame width (container units), line-height 1, placed 39% down and starting 26% past the left edge.
  - "RESET YOUR ·" in solid on-dark.
  - "MINDSET." as a `satin-light` (#B5D99A) outline, max(1.75px, 0.022em), with a soft night drop-shadow (0 2px 10px at 45%) that follows the stroke so it reads over the photo.
- **Scroll mapping:** progress p = clamp01((stickyTop − runway.top) / (runway height − frame height)). Row 0 moves x = −(p − 0.5) × frameWidth × 0.8 and row 1 the mirror. It uses translate3d, a passive scroll listener with one requestAnimationFrame update, and measures the frame (ResizeObserver, `document.fonts.ready`).
- **Coverage:** whole repeats are prepended so both rows cover the frame at both endpoints.
- **Accessibility:** the rows are `aria-hidden`; "Reset your mindset." is the visually hidden H1. The intro line and the two CTAs sit top-left on wide frames and bottom-left over a dark gradient on narrow ones. A skip button jumps past the runway.
- **Reduced motion:** the runway collapses to one frame and the rows sit still, starting near the left edge.

### Motion
One easing (`cubic-bezier(.2, .8, .2, 1)`). The hero type is scroll-linked and has no timed autoplay. Images zoom slowly and arrows nudge on hover; the bag sheet slides in from the right (0.4s); routes fade in (0.45s). Under `prefers-reduced-motion`, all animation and transition is off and the hero is static.

## Do's and Don'ts

### Do:
- **Do** put every product image on a `stone` tile: alpha flats contain-fit with the studio drop-shadow, on-model photos multiplied and cover-fit.
- **Do** set all headings in Big Shoulders Display 900 uppercase with line-height 0.84 to 0.9.
- **Do** keep forest green for actions, bars and bands; use satin only as a full colour-block with ink text.
- **Do** alternate the bone studio with full-bleed green or green-black bands, and close every page with the green-black footer.
- **Do** show the name and price on one row, with tabular figures.
- **Do** end any link that moves you elsewhere with the line arrow.
- **Do** use 1px `rule` hairlines to divide lists, accordions and surfaces, and a 1px ink top rule to open a ruled list.

### Don't:
- **Don't** round corners on any component.
- **Don't** add box-shadows to cards, buttons or panels; the product casts the shadow.
- **Don't** introduce a second accent hue or tint the page with green.
- **Don't** place product flats on white or directly on the bone page.
- **Don't** build the stock streetwear grid: a black hero with a centred outline button followed by equal white cards.
- **Don't** set body copy, prices or instructions in the display face.

## Needs custom code in Shopify

The user chose "Design freely", so the prototype is not limited to Spotlight 13's settings. This conflicts with PRODUCT.md's "No custom code" stack constraint; the owner decides which items to commission. Spotlight 13 is a Dawn-family theme; the split below is against its built-in sections and theme settings.

### Maps to native settings
- **Colour schemes:** four schemes cover the palette: Bone (bone ground, ink text, forest solid button), Bone Light (bone-hi ground for the Visit section and drawers), Forest (green ground, on-dark text, light button) and Night (night ground, on-dark text, for the campaign band and footer).
- **Body font:** Archivo from Shopify's font library (confirm it is listed in the theme editor).
- **Buttons:** corner radius 0, no shadow, border thickness 1 to 2px (1.5px rounds to a whole pixel); solid and outline variants.
- **Product grid:** 4 columns on desktop and 2 on mobile; "show second image on hover" for the alt view; card style with a stone card colour scheme and image padding as an approximation of the tile.
- **Announcement bar:** forest scheme with a link.
- **Sticky header, menu drawer and cart drawer:** native, coloured by scheme.
- **Interlude lines:** a Rich text section with a large heading or text in the Bone scheme.
- **Newsletter:** the Email signup section.
- **Collection filters:** native faceted filtering (horizontal layout) and sort.
- **Size picker:** variant picker set to pills.
- **Visit section:** Image with text with the store photo, heading, hours as text and two buttons.

### Needs custom code
- **Uppercase display face:** Big Shoulders Display must be uploaded as a theme asset with an `@font-face` rule if it is not in Shopify's font library; uppercase headings, weight 900 and line-height under 0.9 need custom CSS regardless (Spotlight has no heading-case or heading line-height setting, and its heading scale stops short of 96px).
- **Opposing scroll type hero:** the pinned 250svh runway, the scroll-linked opposing rows, the right-aligned portrait on the forest field, and the reduced-motion static state. This needs a custom section (Liquid, CSS and a small script).
- **Alpha cut-outs on stone tiles:** the soft drop-shadow on product flats, the multiply blend for on-model photos, and contain-fit with percentage padding versus cover-fit chosen per product.
- **Name and price on one row:** native cards stack the price under the name.
- **Image zoom on hover:** the native hover effects lift the card; a slow image scale needs CSS.
- **Shop by piece colour-blocks:** per-tile background colours, the centred cut-out, and the label, count and arrow laid over each panel. Collection list cards cannot take a different scheme per tile or overlay the label this way.
- **Floating buy card:** the feature card overlapping the product tile (Featured product is native; the overlap is not).
- **Campaign band:** the night-framed photo and the ruled list of picks with thumbnails and prices.
- **Ruled store list:** display-capital city rows with hairlines, tabular hours and an arrowed directions link; Multicolumn renders cards, not ruled rows.
- **Mantra footer:** the giant "And the world will be yours." closer inside the footer. A Rich text section in the Night scheme placed just above the footer is the nearest native workaround.
- **Arrows on buttons and links, filter chip styling and the sold-out hatch on size pills.**
- **Motion:** the hero headline rise and the shared easing.
