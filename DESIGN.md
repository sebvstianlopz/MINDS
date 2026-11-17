---
name: MINDS
description: A plain white notebook page in graphite ink, with one ballpoint blue for actions and the mantra.
colors:
  paper: "#FFFFFF"
  wash: "#F2F4F7"
  ink: "#15171C"
  pencil: "#555B66"
  rule: "#D6DAE1"
  pen: "#2741C2"
  pen-deep: "#1C2F94"
  on-pen: "#FFFFFF"
typography:
  display:
    fontFamily: "Oswald, Arial Narrow, Helvetica Neue, sans-serif"
    fontSize: "clamp(44px, 5.4vw, 80px)"
    fontWeight: 700
    lineHeight: 0.94
    letterSpacing: "0.01em"
  display-mantra:
    fontFamily: "Oswald, Arial Narrow, Helvetica Neue, sans-serif"
    fontSize: "clamp(38px, 6.6vw, 92px)"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "0em"
  headline:
    fontFamily: "Oswald, Arial Narrow, Helvetica Neue, sans-serif"
    fontSize: "clamp(34px, 4.4vw, 56px)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.01em"
  headline-feature:
    fontFamily: "Oswald, Arial Narrow, Helvetica Neue, sans-serif"
    fontSize: "clamp(38px, 4.6vw, 60px)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.01em"
  title:
    fontFamily: "Oswald, Arial Narrow, Helvetica Neue, sans-serif"
    fontSize: "22px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.01em"
  body:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
  body-lead:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.55
  body-small:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.55
  product-name:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    lineHeight: 1.3
  label:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.06em"
  label-small:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "11px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.08em"
rounded:
  none: "0px"
spacing:
  gutter-mobile: "16px"
  gutter-desktop: "32px"
  page-max: "1320px"
  section: "clamp(56px, 8vw, 112px)"
  grid-column-gap: "24px"
  grid-row-gap: "40px"
  grid-column-gap-mobile: "12px"
  grid-row-gap-mobile: "28px"
components:
  button-primary:
    backgroundColor: "{colors.pen}"
    textColor: "{colors.on-pen}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 26px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.pen-deep}"
    textColor: "{colors.on-pen}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 26px"
    height: "48px"
  button-ghost-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  button-disabled:
    backgroundColor: "{colors.wash}"
    textColor: "{colors.pencil}"
  chip:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.body-small}"
    rounded: "{rounded.none}"
    padding: "0 14px"
    height: "38px"
  chip-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  size-pill:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.body-small}"
    rounded: "{rounded.none}"
    padding: "0 14px"
    height: "44px"
    width: "56px"
  size-pill-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  input-field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "0 16px"
    height: "52px"
  product-tag:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.label-small}"
    rounded: "{rounded.none}"
    padding: "6px 8px"
  cart-count:
    backgroundColor: "{colors.pen}"
    textColor: "{colors.on-pen}"
    rounded: "{rounded.none}"
    height: "18px"
  toast:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.body-small}"
    rounded: "{rounded.none}"
    padding: "12px 18px"
---

# Design System: MINDS

## Overview

**Creative North Star: "The Mindset Journal"**

The storefront is MINDS's own notebook. Every surface is a plain white page written in graphite ink, divided by hairline rules, with one ballpoint blue that appears only where the visitor can act, plus once at full size for the mantra. The clothes carry the brand; the page stays quiet around them. Headings are set in bold, uppercase Oswald so they echo the condensed logo. Reading text is set in Archivo.

Density is that of a well-kept retail page: 4-up product grids on desktop, 2-up on phones, generous section spacing, and images sitting in white, hairline-bordered wells. The world is flat. Depth comes from rules and from the photography, never from cards lifting off the page. The single shadow in the system belongs to the cart drawer, the one surface that genuinely slides over the page.

The system was built to be carried by Shopify's Spotlight 13 theme settings: color schemes, the Shopify font library (Oswald and Archivo), square buttons and cards, and section dividers. Each section below notes the Spotlight setting a token maps to where one exists, and says so plainly where one does not.

**Key Characteristics:**
- White paper (#FFFFFF) and graphite ink (#15171C), with ballpoint blue (#2741C2) reserved for actions, focus and the mantra.
- Oswald 700 uppercase for every heading; Archivo 400 to 600 for everything read.
- 1px graphite hairlines (#D6DAE1) separate sections, rows and image wells.
- Square corners everywhere (0px), including badges and the cart count.
- Flat surfaces; one drawer shadow.
- Motion is one calm route fade, a hover swap to the second product image, and nothing under reduced motion.

## Colors

A near-monochrome notebook: white paper, graphite ink and pencil, hairline rules, and one ballpoint blue.

### Primary
- **Ballpoint Blue** (pen): solid button fill, focus ring, text selection, cart count badge, pickup icon, link and icon hover, checkbox accent, and the mantra set at display size. 8.0:1 on paper. Spotlight: the scheme's "Solid button background", and the "Text" of the scheme assigned to the mantra (rich text) section.
- **Deep Ballpoint** (pen-deep): hover and pressed fill for solid buttons only. Spotlight: no separate setting; the theme derives its own hover state, so this value is the prototype's and may land slightly differently.
- **On Pen** (on-pen): label color on solid blue. Spotlight: "Solid button label".

### Neutral
- **Paper** (paper): the page, the header, the hero panel, product image wells, drawers and dialogs. Spotlight: scheme 1 "Background".
- **Graphite Ink** (ink): all body text and headings, ghost-button outline, selected chips and size pills, the newsletter field stroke, the toast. 17.9:1 on paper. Spotlight: scheme 1 "Text" and "Outline button"; the inverted ink scheme (Background ink, Text paper) carries the toast and selected states where the theme exposes them.
- **Pencil** (pencil): secondary text: colors, captions, counts, notes, breadcrumbs, placeholders, accordion bodies. 6.8:1 on paper, 6.2:1 on wash. Spotlight: no dedicated muted-text setting; the theme renders secondary text as a tint of the scheme "Text".
- **Hairline** (rule): every divider: section tops, header and announcement bottoms, accordion rows, cart lines, image-well borders, unselected chip and pill borders. Decorative separation only (1.4:1 on paper); never the sole boundary of a text field. Spotlight: section dividers and the card and pill border settings (thickness 1px, opacity set to match).
- **Wash** (wash): the quiet grey well behind standalone photography (feature product, store fronts, the Visit block) and behind "photo needed" placeholders and the disabled button. Spotlight: scheme 2 "Background", applied to the image-led sections.

### Named Rules
**The Ballpoint Rule.** Blue marks what can be done: a button, a focus ring, a hover, the cart count, and the store icon on the pickup line (the in-store action). Its one non-action use is the mantra. If a blue element is neither an action, a pointer to one, nor the mantra, it is wrong.

**The Graphite Hairline Rule.** Sections, rows and wells are separated by 1px rule lines, not by alternating fills. A section that needs separation gets a top hairline on white.

## Typography

**Display Font:** Oswald (with Arial Narrow, Helvetica Neue)
**Body Font:** Archivo (with Helvetica Neue, Arial)

**Character:** Oswald set bold and uppercase reads like the MINDS wordmark written large in a notebook; Archivo is a plain, sturdy grotesque that stays out of the way of prices and sizes. Both are in the Shopify font library; Spotlight's "Headings" font is Oswald and its "Body" font is Archivo.

### Hierarchy
- **Display** (Oswald 700, clamp(44px, 5.4vw, 80px), 0.94, uppercase): the hero H1 in the white page panel, and collection titles at clamp(44px, 6vw, 80px).
- **Display Mantra** (Oswald 700, clamp(38px, 6.6vw, 92px), 0.98, uppercase, ballpoint blue, max 14ch): the mantra band only.
- **Headline** (Oswald 700, clamp(34px, 4.4vw, 56px), 1, uppercase): section heads such as New arrivals, Shop by piece and Join the MINDS list.
- **Headline Feature** (Oswald 700, clamp(38px, 4.6vw, 60px), 1, uppercase): the featured product name and Visit MINDS Orlando; the product page H1 runs at clamp(38px, 4.4vw, 58px).
- **Title** (Oswald 700, 22px, 1, uppercase): store names; category tiles run at clamp(20px, 2.2vw, 28px); dialog and drawer titles at 26px to 32px.
- **Body** (Archivo 400, 16px, 1.55): all running text; product descriptions cap at 60ch.
- **Body Lead** (Archivo 400, 17px): the one supporting line under a hero or section headline, max 40ch.
- **Product Name** (Archivo 600, 15px, 1.3): card titles; prices sit in Archivo at 15px with tabular figures, 22px on product pages.
- **Label** (Archivo 600, 14px, 0.06em, uppercase): button labels and text links.
- **Label Small** (Archivo 600, 11px to 13px, 0.08em, uppercase): the "New" product tag and footer column heads.

Spotlight: heading and body scale settings move the whole ramp together; the uppercase and 0.06em tracking are not native settings and need the theme editor's Custom CSS field (see Do's and Don'ts).

### Named Rules
**The Logo Voice Rule.** Every heading is Oswald 700 uppercase. Nothing read at length (descriptions, hours, notes) is ever set in Oswald.

**The Tabular Price Rule.** Prices, counts, hours and phone numbers use tabular figures so columns of numbers line up.

## Layout

A single centered column of max 1320px, with 16px side gutters on phones and 32px from 750px up (both widened by safe-area insets). Sections are spaced at clamp(56px, 8vw, 112px) top and bottom; the mantra band takes more air, clamp(80px, 12vw, 168px). Spotlight: "Page width" (nearest step to 1320px) and "Spacing between template sections".

Product grids run 4 columns with 24px column and 40px row gaps; below 990px they drop to 2 columns with 12px and 28px gaps. Store and category grids follow the same 4-to-2 pattern. Two-part features (featured product, Visit block, newsletter, product page) are two columns that stack below 850px (750px for the newsletter). Spotlight: the collection and featured-collection "Products per row" (desktop 4, mobile 2) and the grid "Horizontal / Vertical spacing" settings (24px and 40px).

The opener is a full-bleed campaign photo, clamp(520px, 72vw, 820px) tall and capped at the viewport minus the header, with a white page panel (max 520px wide, 36px to 40px padding) anchored bottom-left. Below 750px the photo becomes a 4:5 frame and the panel drops beneath it on the white page. The header is sticky, 72px tall with an inline menu, and 60px with a centered logo and a menu drawer below 900px. The collection filter bar sticks directly under the header.

On product pages below 850px the gallery becomes a horizontal snap-scroll strip with slots of height min(36svh, 320px) and the breadcrumb is hidden, so Add to bag sits inside the first phone viewport. Breakpoints in use are 600px, 750px, 850px, 900px and 990px; 750px and 990px match Spotlight's own.

## Elevation & Depth

The system is flat. Depth comes from hairline rules, white image wells and the photography itself. Overlays (menu drawer, size guide, cart) sit over a graphite scrim of rgba(21, 23, 28, 0.35) to 0.4. Exactly one surface casts a shadow: the cart drawer, because it is the one sheet that slides over the page from the right.

### Shadow Vocabulary
- **Drawer** (`box-shadow: -12px 0 40px rgba(21, 23, 28, .12)`): the cart drawer only. Spotlight: the "Drawers" shadow settings.

### Named Rules
**The One Shadow Rule.** Cards, buttons, dialogs, the sticky header and the toast stay flat. Only the cart drawer casts a shadow. Spotlight: buttons, cards, inputs, pills and popups all at shadow opacity 0.

## Shapes

Every surface is square: 0px corners on buttons, cards, image wells, chips, size pills, inputs, the "New" tag, the cart count badge, dialogs and drawers. Borders are thin and graphite: 1px hairlines for wells and unselected controls, 1.5px ink or blue for buttons and the newsletter field. Product photos on white are contained with 8% padding inside a 4:5 well; model and campaign photos fill their frame. Category tiles are 1:1, store fronts 4:3, the Visit photo 4:5. Icons are 22px line drawings with a 1.5px round-capped stroke. Spotlight: corner radius 0 on buttons, cards, inputs, variant pills, badges and media; border thickness 1px on cards and pills.

**The Square Page Rule.** Nothing on the page is rounded. Curves belong only inside icon drawings and photography.

## Components

### Buttons
Solid and honest, like a stamped label.
- **Shape:** square (0px), 1.5px border, min height 48px (52px beside the newsletter field), 0 26px padding, 10px gap for an optional leading icon.
- **Primary:** ballpoint blue fill and border, white uppercase label (Archivo 600, 14px, 0.06em). Used for Shop new arrivals, Add to bag, Get directions, Subscribe and Checkout.
- **Hover / Focus:** fill and border darken to deep ballpoint over 0.2s ease; focus is a 2px ballpoint outline offset 3px.
- **Ghost:** transparent with a 1.5px ink outline and ink label; hover fills ink with a paper label. Used for the secondary action beside a primary one (Visit The Florida Mall, Shop for pickup).
- **Disabled:** wash fill, hairline border, pencil label.
- **Text link:** uppercase Archivo 600 14px, underlined 5px below; turns blue on hover.
- Spotlight: "Solid button" and "Outline button" from the color scheme, button corner radius 0, border thickness 1.5px equivalent, shadow 0.

### Chips (collection filters)
- **Style:** paper with a hairline border, Archivo 500 14px, 38px tall, 0 14px padding; hover borders in ink.
- **State:** selected (aria-pressed) fills ink with paper text. Spotlight: Search & Discovery filters, rendered by the theme's facet controls.

### Size Pills
- **Style:** min 56px by 44px, hairline border, Archivo 500 14px; hover borders in ink.
- **State:** selected fills ink with paper text; sold-out keeps pencil text over a 135-degree hairline hatch and cannot be chosen; focus shows the 2px blue outline. Spotlight: product "Variant picker" set to Pills, pill corner radius 0.

### Product Cards
- **Corner Style:** square (0px).
- **Background:** a paper well, 4:5, with a 1px hairline border; packshots contained at 8% padding, model shots cover the well.
- **Shadow Strategy:** none (see Elevation & Depth).
- **Content:** name (Archivo 600 15px), color in pencil (14px), price (15px, tabular), 12px gap below the image. A paper "New" tag with an ink border sits 10px from the top-left of the image.
- **Hover:** the second image fades in over 0.35s ease; the name underlines.
- Spotlight: product card style Standard, "Show second image on hover" on, image padding on, card corner radius 0, border thickness 1px, shadow 0; the "New" tag as a product badge.

### Inputs / Fields
- **Style:** paper, 1.5px ink stroke, square, 52px tall, 0 16px padding; pencil placeholder. The newsletter field joins its Subscribe button with no gap.
- **Focus:** 2px ballpoint outline offset 3px.
- Spotlight: input border thickness and corner radius 0; newsletter section.

### Navigation
- **Style:** announcement bar (13px, centered, hairline bottom), then a sticky white header with a hairline bottom: logo at 30px height and an inline menu in Archivo 500 15px.
- **States:** hover and current page show a 1.5px ink underline; icon buttons (44px targets) turn blue on hover; the cart count is a square blue badge.
- **Mobile:** below 900px the menu moves to a left drawer (min(86vw, 360px)) listing links in Oswald 600 26px uppercase, each over a hairline. Spotlight: Announcement bar and Header sections, menu type Drawer on mobile.

### Cart Drawer
A right-hand sheet, min(100vw, 440px) wide, over a graphite scrim, carrying the system's one shadow. It slides in 24px from the right over 0.35s cubic-bezier(.2, .8, .2, 1). Lines are 84px 4:5 thumbnails in hairline wells; the foot holds the subtotal, the pickup note with a blue store icon, and a full-width primary Checkout. Spotlight: Cart type Drawer.

### Mantra Band
The brand line set in ballpoint blue Oswald 700 at display size across a white band under a single top hairline, its clauses wrapping to a 14ch measure. It appears once, before the Visit block. Spotlight: a Rich text section on the mantra scheme, heading size Large.

### Accordions
Product details as hairline-separated rows, 52px tall, Archivo 600 15px; the plus icon rotates 45 degrees over 0.2s when open; bodies are pencil 15px. Spotlight: Collapsible content blocks on the product page.

## Do's and Don'ts

### Do:
- **Do** keep ballpoint blue (#2741C2) for pressable things, focus, hover and the mantra, and nowhere else.
- **Do** separate sections with a 1px hairline (#D6DAE1) on white rather than alternating background fills.
- **Do** set every heading in Oswald 700 uppercase and every reading line in Archivo.
- **Do** keep all corners at 0px, including badges, pills and the cart count.
- **Do** pair one solid primary with at most one ghost button in any button group.
- **Do** contain packshots at 8% padding inside white 4:5 hairline wells, and let model and campaign photos fill their frames.
- **Do** give text fields a 1.5px ink stroke so the field edge reads at full contrast.
- **Do** stop every animation and transition under prefers-reduced-motion.
- **Do** apply uppercase headings, label tracking and the mantra's measure through the theme editor's Custom CSS field when Spotlight has no setting for them, and note each such rule for the owner.

### Don't:
- **Don't** add shadows to cards, buttons, dialogs or the header; the cart drawer's is the only one.
- **Don't** use blue as a decorative fill, a section background, or for headings and running text other than the mantra.
- **Don't** round any surface corner.
- **Don't** use Oswald for descriptions, hours or notes.
- **Don't** rely on a hairline (#D6DAE1) as the only visible edge of a text field or select.
