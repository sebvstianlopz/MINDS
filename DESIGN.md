---
name: MINDS
description: A quiet lookbook you can shop. Full-bleed MINDS photography on a warm bone page, concrete product tiles, Host Grotesk in sentence case, and white pills as the only rounded shape.
colors:
  bone: "#ECE8E1"
  bone-hi: "#F6F3EE"
  concrete: "#D5D2CC"
  concrete-lit: "#E0DDD7"
  rule: "#CDC6B9"
  ink: "#171613"
  ink-hover: "#2E2C27"
  ink-2: "#56524A"
  peach: "#F3E2D2"
  green: "#1F3D2B"
  signal-green: "#2F7A4B"
  white: "#FFFFFF"
  night: "#121513"
  on-dark: "#F4F1EB"
  on-dark-2: "#B5B1A8"
typography:
  display:
    fontFamily: "Host Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(54px, 7.6vw, 96px)"
    fontWeight: 600
    lineHeight: 0.92
    letterSpacing: "-0.04em"
  display-closer:
    fontFamily: "Host Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(44px, 6.4vw, 96px)"
    fontWeight: 600
    lineHeight: 0.95
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Host Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(44px, 6vw, 80px)"
    fontWeight: 600
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  headline-photo:
    fontFamily: "Host Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(40px, 4.6vw, 68px)"
    fontWeight: 600
    lineHeight: 0.95
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Host Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(36px, 4.4vw, 60px)"
    fontWeight: 600
    lineHeight: 0.98
    letterSpacing: "-0.035em"
  title-product:
    fontFamily: "Host Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(36px, 3.8vw, 56px)"
    fontWeight: 600
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  title-sheet:
    fontFamily: "Host Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "30px"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.035em"
  title-list:
    fontFamily: "Host Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "24px"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  price:
    fontFamily: "Host Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "20px"
    fontWeight: 500
    lineHeight: 1.5
    fontFeature: "tnum"
  lead:
    fontFamily: "Host Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.45
  body:
    fontFamily: "Host Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "-0.005em"
  action:
    fontFamily: "Host Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.005em"
  name-row:
    fontFamily: "Host Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 500
    lineHeight: 1.5
  category-label:
    fontFamily: "Host Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.05em"
  small:
    fontFamily: "Host Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  none: "0px"
  pill: "999px"
  dot: "50%"
spacing:
  gutter: "16px"
  gutter-wide: "32px"
  container: "1320px"
  hairline-gap: "2px"
  grid-row: "40px"
  grid-col: "12px"
  grid-row-compact: "28px"
  grid-col-compact: "8px"
  photo-inset: "clamp(16px, 2.4vw, 36px)"
  section: "clamp(64px, 9vw, 128px)"
components:
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.bone}"
    typography: "{typography.action}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "48px"
  button-ink-hover:
    backgroundColor: "{colors.ink-hover}"
    textColor: "{colors.bone}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.action}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "48px"
  button-ghost-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.bone}"
  button-light:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    typography: "{typography.action}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "48px"
  button-light-hover:
    backgroundColor: "{colors.bone}"
    textColor: "{colors.ink}"
  button-ghost-light:
    backgroundColor: "transparent"
    textColor: "{colors.white}"
    typography: "{typography.action}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "48px"
  button-ghost-light-hover:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
  size-pill:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "44px"
  size-pill-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.bone}"
  quick-add-size:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 10px"
    height: "32px"
  filter-chip:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "38px"
  filter-chip-pressed:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.bone}"
  open-pill:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 14px"
    height: "30px"
  newsletter-pill:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "4px"
    width: "min(100%, 440px)"
  bag-count:
    backgroundColor: "{colors.green}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.pill}"
    height: "18px"
  product-tile:
    backgroundColor: "{colors.concrete}"
    rounded: "{rounded.none}"
    padding: "11%"
  category-tile:
    backgroundColor: "{colors.concrete}"
    textColor: "{colors.ink}"
    typography: "{typography.category-label}"
    rounded: "{rounded.none}"
  buy-panel:
    backgroundColor: "{colors.bone-hi}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "clamp(24px, 3vw, 40px)"
  announcement-strip:
    backgroundColor: "{colors.peach}"
    textColor: "{colors.ink}"
    typography: "{typography.small}"
    height: "36px"
  header:
    backgroundColor: "{colors.bone}"
    textColor: "{colors.ink}"
    height: "70px"
  header-over-photo:
    backgroundColor: "transparent"
    textColor: "{colors.white}"
    height: "70px"
  footer:
    backgroundColor: "{colors.night}"
    textColor: "{colors.on-dark}"
---

# Design System: MINDS

## Overview

**Creative North Star: "The Shoppable Lookbook"**

MINDS is shown the way a lookbook shows a season: one photograph per idea, edge to edge, with the interface stepping back to a few words and white pills. The page is a warm bone ground; the clothes sit on soft concrete-grey tiles, each flat casting its own contact shadow. Type is a single grotesk (Host Grotesk) at 600 with tight negative tracking, always in sentence case, laid bottom-left over photographs on a soft dark fade.

The homepage reads top to bottom as photo, tiles, grid, photo, photo: a full-screen campaign photo under a transparent header, four edge-to-edge category tiles, a contained grid of new arrivals, a 2-up pair of full-bleed portraits, and a 2-up pair of story cards (the Orlando store and the newsletter), then a ruled list of the other stores and a dark footer. Full-bleed blocks are separated by 2px hairline gaps of the bone page, never by margins. MINDS green has shrunk to a signal: the bag count and the pickup store icon, with a brighter signal green for the live "Open now" dot.

The system refuses the dense streetwear homepage of colour-block bands, badges and stacked banners. It replaces the earlier "Campaign Studio" world (condensed capitals, forest-green bands, square buttons), which was retired on 27 Nov 2026.

**Key Characteristics:**
- Warm bone page (`bone`), concrete product and category tiles (`concrete`), near-black ink.
- Photography carries every feature moment, full-bleed, with words and pills bottom-left.
- Host Grotesk only: 600 for headings with -0.035 to -0.04em tracking, sentence case.
- Pills (999px) are the only rounded shape; images, tiles, cards, panels and dialogs are square.
- Full-bleed blocks meet with 2px hairline gaps.
- A pale peach announcement strip, a transparent header over the hero that turns solid bone, and a `night` footer.
- Green is a small signal, never a surface.

## Colors

A warm, desaturated studio palette (bone, concrete, ink) with a pale peach strip, white for everything laid on photographs, and green held back to signals.

### Primary
- **Ink** (`ink`): the action colour on light grounds. Solid pill buttons, selected size pills, pressed filter chips, the checked state of every control, text, focus outlines, text selection. Hover deepens to **Ink Lifted** (`ink-hover`).
- **Photo White** (`white`): the action colour on photographs. Light pills, the outline of ghost-light pills, the open-status pill, the newsletter pill, the header's logo and type while it sits over the hero, focus outlines on photos and in the footer.

### Secondary
- **Pickup Peach** (`peach`): the announcement strip only, with ink text. It is the one warm tint in the interface.

### Tertiary
- **MINDS Green** (`green`): small signals only. The bag count badge on the solid header and the store icon beside pickup lines. While the header is over the hero, the count turns white with ink text.
- **Signal Green** (`signal-green`): the live "Open now" dot and its pulse inside the open-status pill. Closed shows the dot in `ink-2`.

### Neutral
- **Warm Bone** (`bone`): the page ground, the solid header, the sticky filter bar, the colour of the 2px gaps between full-bleed blocks, and the view-transition ground.
- **Bone Light** (`bone-hi`): raised surfaces. The PDP buy panel, dialogs, the bag sheet, the mobile nav drawer, filter inputs and selects, the store-row hover wipe, the quick-add bar (at 95%), the photo-needed slot.
- **Concrete** (`concrete`) with **Concrete Lit** (`concrete-lit`): every product and category tile, bag thumbnails and PDP gallery frames. Concrete Lit is the soft top light: a radial gradient (110% by 85% at 50% 36%) fading to concrete by 72%, over a fine SVG grain.
- **Warm Rule** (`rule`): 1px hairlines. Header bottom, filter bar edges, store rows, accordions, table rows, bag lines, and the hatch on sold-out sizes.
- **Graphite** (`ink-2`): secondary text (colours, places, counts, helper text, breadcrumbs) and the idle 1px border of pills, chips and selects.
- **Night** (`night`), **On Dark** (`on-dark`), **On Dark Muted** (`on-dark-2`): the footer and the toast. Footer hairlines are `on-dark` at 20%.

Scrims, photo fades and interface shadows are all drawn from one warm black, `rgb(18, 17, 15)` (`--shade`), at stated alphas; see Elevation & Depth.

### Named Rules
**The Signal Green Rule.** Green never fills a button, band, strip or panel. It marks state: how many things are in the bag, where pickup happens, whether the store is open.

**The White-on-Photo Rule.** Anything laid on a photograph is white: headline, line, pills, status pill, newsletter field. Ink pills appear on photographs only inside a white container (the newsletter pill's Subscribe button).

**The Concrete Tile Rule.** Product imagery sits on concrete, never directly on the bone page and never on white.

## Typography

**Display and Body Font:** Host Grotesk (with Helvetica Neue, Arial), weights 400, 500, 600 and 700 loaded.

**Character:** One grotesk does everything. Headings at 600 with tight negative tracking and sub-1 leading read as a fashion headline; the same face at 400 and 500 keeps names, prices and instructions calm. Hierarchy comes from size and tracking, never from a second family or from capitals.

### Hierarchy
- **Display** (600, clamp(54px, 7.6vw, 96px), 0.92, -0.04em): the hero headline only ("New season").
- **Display Closer** (600, clamp(44px, 6.4vw, 96px), 0.95, -0.04em, max 13ch): the footer line "And the world will be yours." in `on-dark`.
- **Headline** (600, clamp(44px, 6vw, 80px)): collection page titles.
- **Headline Photo** (600, clamp(40px, 4.6vw, 68px), 0.95): headlines on full-bleed photo cards, with a faint 28px text shadow from `--shade` at 30%.
- **Title** (600, clamp(36px, 4.4vw, 60px), 0.98, -0.035em): section heads on the bone page ("New arrivals", "More MINDS stores", "More shorts").
- **Title Product** (600, clamp(36px, 3.8vw, 56px)): the PDP product name.
- **Title Sheet** (600, 28 to 30px): dialog, bag and mobile-drawer headings and drawer links.
- **Title List** (500, 24px, 1.1, -0.02em): city names in the store list.
- **Price** (500, 20px, tabular): the PDP price.
- **Lead** (400, 17px, 1.45, max 40ch): the hero line, in white at 90%; photo-card lines use 16px.
- **Body** (400, 16px, 1.5, -0.005em): running text.
- **Action** (500, 15px, 1): pill buttons, text links, nav links, "Directions".
- **Name Row** (500, 15px): product name and price on one row; colour below at 14px in graphite.
- **Category Label** (600, 14px, 0.05em, uppercase, 1.5px underline at 7px offset; 13px under 600px): category tiles only.
- **Small** (400, 13px): announcement strip, breadcrumbs, quick-add sizes; footer column heads at 500 and 0.02em in `on-dark-2`.

### Named Rules
**The Sentence Case Rule.** Every heading, button and nav link is sentence case. The only uppercase in the system is the category tile label.

**The Line Beneath Rule.** Supporting copy sits under its heading, never above it. There are no eyebrows or kickers.

**The Tabular Figures Rule.** Prices, counts, hours and phone numbers use tabular figures.

## Layout

Mobile-first. A 16px gutter (respecting safe-area insets) widens to 32px from 750px, inside a 1320px container. Bone-page sections take `section` vertical padding. Photography and tiles break out of the container to the viewport edge; grids, section heads and the store list stay inside it.

- **Hero:** full viewport height minus the announcement strip (min 560px), pulled up under the header so the header floats over its top edge. Copy is pinned bottom-left at clamp(24px, 6svh, 56px) from the bottom, max 760px wide: headline, one line, a row of pills. The photo is cover-fit, focused at 62% 42% (68% 30% under 750px).
- **Category tiles:** four edge-to-edge 3:4 tiles with 2px gaps, 2 by 2 under 900px. The flat is contained at 70% by 66%, centred slightly above middle; the label sits bottom-left.
- **Product grid:** 4 columns with 40px rows and 12px columns; 2 columns with 28px and 8px under 990px. Tiles are 4:5.
- **Femme Noir pair:** two 4:5 full-bleed portraits, 2px apart (max 112svh tall), stacking under 750px. Each ends in its own headline, line and pill.
- **Story cards:** two 5:4 full-bleed cards, 2px apart, stacking and turning 4:5 under 850px. Copy sits bottom-left at `photo-inset`.
- **Store list:** a ruled four-column row (city, place, hours, action) inside the container; under 750px the city and "Directions" share the first row and details stack beneath. Day groups never break mid-phrase.
- **Collection:** breadcrumbs, a title with the product count at right, then a sticky filter bar under the header.
- **PDP:** a 7/5 gallery and sticky buy panel; under 850px a horizontal snap gallery (78% slides) and a flat buy panel.
- **Breakpoints:** 600, 750, 850, 900 and 990px. No horizontal scroll at 360px.

**The Hairline Gap Rule.** Full-bleed blocks meet with a 2px gap of bone. They are never inset with margins or rounded into cards.

## Elevation & Depth

The interface is flat and tonal: bone, bone-light and concrete layers, hairline rules and photographs. Depth belongs to the clothes and the photographs. Alpha flats cast a soft contact shadow onto concrete; on-model photos on concrete are multiplied and carry none. Photographs take a warm dark fade from the bottom so white copy reads. Only two interface layers cast a shadow: the bag sheet over the page and the cursor-following store photo.

### Shadow Vocabulary
- **Contact cast** (`filter: drop-shadow(0 16px 18px rgba(23, 22, 19, .14))`): product flats on product tiles.
- **Category cast** (`filter: drop-shadow(0 22px 22px rgba(23, 22, 19, .2))`): flats on category tiles.
- **Photo fade** (`linear-gradient(to top, rgba(18,17,15,.82) 0, .55 at 38%, .14 at 64%, 0 at 80%)`): under copy on photo cards; stronger stops on phones and story cards. The hero adds a 34% top fade for the header.
- **Sheet** (`box-shadow: -16px 0 48px rgba(18, 17, 15, .18)`): the bag drawer.
- **Peek** (`box-shadow: 0 24px 48px rgba(18, 17, 15, .22)`): the store photo that follows the cursor.
- **Scrim** (`rgba(18, 17, 15, .45)`): behind the bag, the nav drawer and dialogs.

### Named Rules
**The Product Casts the Shadow Rule.** Pills, tiles, cards and panels never carry a box-shadow. Depth comes from the flat's drop-shadow, the photo fade, or a bone-light surface with a 1px rule.

**The Multiply Rule.** On-model photos on concrete use `mix-blend-mode: multiply`, cover-fit and no padding; flats use contain-fit, 11% padding and the contact cast.

## Shapes

Two shapes only. Every pill (buttons, size pills, chips, quick-add sizes, filter inputs and selects, the open-status pill, the newsletter field, the bag count) is fully rounded at 999px. Everything else is a square-cornered rectangle: photographs, tiles, cards, the buy panel, dialogs, the bag sheet, the drawer, the toast. The status dot is the one circle. Aspect ratios are fixed by role: 4:5 product tiles, thumbnails and Femme Noir portraits; 3:4 category tiles; 5:4 story cards (4:5 on phones); 1:1 PDP main image; 4:3 store peek. Strokes are 1px: `rule` hairlines for dividers and `ink-2` or `ink` for interactive outlines. Icons are 1.5px-stroke line drawings at 22px; arrows are 18px.

**The Only Curve Rule.** If it is not a pill or the status dot, its corners are square.

## Components

### Buttons
Quiet pills; the photograph or the product does the shouting.
- **Shape:** pill (999px), 48px tall, 24px side padding, 1px border, 10px icon gap, Action type.
- **Ink:** ink fill, bone label; hover lifts to `ink-hover`. Add to bag, Check out, Subscribe.
- **Ghost:** transparent, ink stroke and label; hover fills ink. Empty-state recoveries.
- **Light:** white fill, ink label; hover turns bone. The primary pill on photographs ("Shop now", "Femme Noir", "Shop the top", "Get directions").
- **Ghost Light:** transparent, white label, white stroke at 85%; hover fills white. The quiet second action on photos ("Shop for pickup").
- **Press:** every pill scales to 0.98 on `:active`. Colour transitions take 0.25s.
- **Text link:** Action type with a 1px underline at 6px offset that thickens to 2px on hover, ending in the arrow ("Shop all new"). Arrows nudge 4px right on hover.

### Chips and Size Pills
- **Filter chip:** 38px pill, 1px graphite border; ink border on hover; pressed fills ink with a bone label.
- **Size pill:** 44px by at least 54px. Selected fills ink from the bottom up (0.3s); sold-out shows a 135° hairline hatch in `rule` with graphite text and a visually hidden "(sold out)"; focus draws a 2px ink outline.
- **Quick-add size:** 32px pill in the quick-add bar; hover fills ink; sold-out hatched.

### Product Card
- **Tile:** a 4:5 concrete rectangle. Flats contained with padding and the contact cast; on-model images multiplied and cover-fit.
- **Hover (hover devices):** the image scales 1.035 over 0.8s, a second view cross-fades in where one exists, and the name underlines.
- **Meta:** name and price on one row (Name Row), colour below in graphite.
- **Quick add:** on hover or focus a bone-light bar (95%) rises over the bottom of the tile with "Quick add" and a pill per size. One-size items show "Add". Hidden on touch devices.

### Cards / Containers
- **Photo card ("shot"):** square-cornered, full-bleed photograph with the photo fade; copy bottom-left in white: Headline Photo, a 16px line, pills. The image eases to 1.025 on hover over 1.4s.
- **Buy panel:** bone-light with a 1px rule border and clamp(24px, 3vw, 40px) padding; sticky beside the PDP gallery, flat and borderless on phones.
- **Photo-needed slot:** bone-light with a dashed graphite border, a camera icon and a label. A placeholder for photography the owner has not supplied, not a decorative device.

### Inputs / Fields
- **Newsletter pill:** a white pill (4px padding, max 440px) holding a borderless 44px field and an ink Subscribe pill; focus-within draws a 2px white outline at 3px. Success swaps the label for a check and "Done"; an invalid address shakes the field once and shows a line beneath.
- **Filter controls:** 38px pills in bone-light with a 1px graphite border; checkboxes take an ink accent.
- **Focus:** the global 2px ink outline at 3px offset; white on photographs, over the hero header and in the footer.

### Navigation
- **Announcement strip:** pale peach, 36px, centred 13px ink text with a 600-weight "Store hours" link; the second clause hides under 600px.
- **Header:** sticky, 70px (58px on phones). Over the hero it is transparent with a white (inverted) logo, white links and icons, and a white bag count; once the hero's bottom passes under it, it turns solid bone with a 1px rule (0.35s). It hides on scroll down after the hero and returns on scroll up, never while focused or while a drawer is open.
- **Links:** Action type, sentence case, a 1px current-colour underline on hover and when current. Under 900px a burger opens a bone-light drawer of 30px 600 links divided by rules.
- **Filter bar:** sticky under the header, bone, rules top and bottom.

### Category Tiles (signature)
Four edge-to-edge 3:4 concrete tiles, 2px apart, each a real MINDS flat with the category cast and one underlined uppercase label bottom-left. The flat scales 1.045 on hover over 1s.

### Open-Status Pill (signature)
A 30px white pill beneath the Orlando store heading: a status dot and "Open now · closes 8pm" or "Closed · opens 9am", computed from Florida Mall hours in Orlando time and repainted every minute. While open, the dot is signal green and pulses three times.

### Ruled Store List (signature)
A rule above, then rows divided by hairlines that draw in from the left with an 80ms stagger: a 24px city, place in graphite, tabular hours in one "10am to 8pm" format, and "Directions" with an arrow. Hover wipes in bone-light from the left and shifts the city 4px; on mouse devices a store photo follows the cursor with eased lag.

### Footer
A `night` footer opening with the Display Closer line, then an `on-dark` 20% rule and four columns: logo with a one-line description and social icons, Shop, Help and Contact. A legal row in `on-dark-2` closes it.

### Motion
One calm grammar. CSS uses one easing, `cubic-bezier(.16, 1, .3, 1)`; script-driven moves (grid FLIP, gallery crossfade, product morph) use `cubic-bezier(.2, .8, .2, 1)`, and the fly-to-bag arc uses `cubic-bezier(.5, 0, .2, 1)` because a travel path needs an ease-in.
- **Hero:** the photo settles from 1.06 over 2.2s; headline, line and pills rise 16px from 40% opacity, staggered 90ms.
- **Reveals:** sections, tiles, cards and photo cards fade and rise 18px over 0.9s, staggered 70ms per row. JS marks only elements that start below the fold, so content shows without JS, and anything skipped by an anchor jump is revealed at once.
- **Header handover:** transparent to solid bone over 0.35s as the hero leaves.
- **Product morph:** the product tile morphs into the PDP gallery frame (View Transitions, `prod`, 0.6s) and back; the old page fades out in 0.14s before the new one fades in. Without support, routes fade in (0.45s).
- **Shop grid:** FLIP on filter or sort changes (480ms); the product count rolls (380ms).
- **Bag:** a ghost of the product arcs into the header bag (650ms), then the count pops; buy forms open the bag after the flight, quick add shows a toast. Bag lines stagger in (50ms) and the subtotal counts.
- **Reduced motion:** nothing is marked for reveal, there is no fly, morph, count roll or header hiding, and all CSS animation and transition is off.

### Homepage opening
The homepage opens directly on the full-screen hero photograph, with no moving text. There is no loading screen and no 3D intro: the line-art intro loader and the 3D "Inside your mind" journey with its brain-shaped reveal were both removed at the owner's request. The journey's code is kept in `experience/` but is no longer published anywhere.

## Do's and Don'ts

### Do:
- **Do** let one MINDS photograph carry each feature moment, full-bleed, with a headline, one line and pills bottom-left over the photo fade.
- **Do** put every product image on a concrete tile: flats contained with the contact cast, on-model photos multiplied and cover-fit.
- **Do** set every heading in Host Grotesk 600, sentence case, tracked -0.035 to -0.04em, leading under 1.
- **Do** make every action a pill: ink on light grounds, white on photographs, an outline for the quieter second action.
- **Do** join full-bleed blocks with 2px bone gaps.
- **Do** keep green to the bag count, the pickup icon and the open dot.
- **Do** show the name and price on one row, with tabular figures, and write hours in one "10am to 8pm" format.

### Don't:
- **Don't** round anything that is not a pill or the status dot: photos, tiles, cards, panels and dialogs stay square.
- **Don't** add eyebrows or kickers above headings; supporting lines go beneath.
- **Don't** fill buttons, strips, bands or panels with green, or add colour-block bands to the homepage.
- **Don't** set headings in capitals or in a second typeface; uppercase is reserved for category tile labels.
- **Don't** add box-shadows to pills, tiles, cards or panels.
- **Don't** place product flats on white or directly on the bone page.
- **Don't** use photography that is not MINDS's own.

## Needs custom code in Shopify

The owner chose "Design freely", so the prototype is not limited to Spotlight 13's settings (PRODUCT.md records this). The owner decides which items to commission. Spotlight 13 is a Dawn-family theme; the split below is against its built-in sections and theme settings.

### Maps to native settings
- **Colour schemes:** four schemes cover the palette. Bone (bone ground, ink text, ink solid button), Bone Light (drawers and the buy panel), Peach (the announcement bar) and Night (the footer).
- **Body and heading font:** Host Grotesk, if it is in Shopify's font library (confirm in the theme editor); otherwise it must be uploaded (see below).
- **Buttons:** a large corner radius gives pills, no shadow, 1px border; solid and outline variants.
- **Product grid:** 4 columns on desktop and 2 on mobile; "show second image on hover" for the alt view; a concrete card scheme with image padding as an approximation of the tile.
- **Announcement bar:** the Peach scheme with a link.
- **Sticky header, menu drawer and cart drawer:** native, coloured by scheme.
- **Collection filters:** native faceted filtering (horizontal layout) and sort.
- **Size picker:** variant picker set to pills (sold-out styling differs).
- **Footer:** native columns in the Night scheme.

### Needs custom code
- **Display type:** Host Grotesk as a theme asset with `@font-face` if Shopify does not list it; headings at 600 with -0.04em tracking, leading under 1, and the 96px top of the scale need custom CSS (Spotlight has no heading tracking or line-height setting).
- **Transparent-over-hero header:** the header floating over the hero with a white (inverted) logo and white type, turning solid bone once the hero scrolls away, plus hide-on-scroll-down. Spotlight's header is always solid.
- **Full-bleed hero with overlay copy:** a full-viewport photo pulled up under the header, the bottom fade, and the headline, line and two white pills pinned bottom-left. Image banner gets close, but not the pull-up under the header or the exact fade and type.
- **Edge-to-edge category tiles:** four tiles with 2px gaps, the centred flat with its drop-shadow, and the underlined uppercase label laid bottom-left. Collection list cards add padding, rounded or framed cards and labels beneath.
- **Concrete tile surface:** the concrete ground with its radial top light and grain, the contact drop-shadow on flats, the multiply blend for on-model photos, and contain-with-padding versus cover-fit chosen per product.
- **2-up photo cards with overlay pills:** two full-bleed portraits (and the two story cards) 2px apart, each with a bottom fade, a headline, line and white pill laid bottom-left. Native Collage or Image with text cards do not overlay copy this way.
- **Inline pill newsletter in a photo card:** the email field and Subscribe button inside one white pill, laid over the newsletter photo, with the success swap and error shake. The native Email signup section renders a separate field and button on a plain ground.
- **Live open-status pill:** the Orlando open or closed status from store hours in Orlando time, repainted every minute, with the pulsing dot. Needs a small script.
- **Quick add:** the size pills that rise over the bottom of a product tile on hover and add without leaving the grid. Spotlight's quick add opens a modal.
- **Product morph and fly-to-bag:** the View Transitions morph from tile to PDP gallery, the ghost that arcs into the header bag, the count pop, the grid FLIP and the count rolls.
- **Pill size selectors:** the bottom-up ink fill on selection and the hatched sold-out state; the quick-add size pills.
- **Ruled store list:** city rows with hairlines that draw in, tabular hours, an arrowed Directions link, the hover wipe and the cursor-following store photo. Multicolumn renders cards, not ruled rows.
- **Name and price on one row:** native cards stack the price under the name.
- **Footer closer:** the large "And the world will be yours." line inside the footer. A Rich text section in the Night scheme just above the footer is the nearest native workaround.
- **Motion system:** the reveal observer, the shared scroll engine, the hero settle and copy rise, and the reduced-motion handling. A few hundred lines of vanilla JS loaded once in `theme.liquid`; sections then carry `data-reveal` attributes.
