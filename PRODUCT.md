# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack
Shopify, on the free "Spotlight" theme (v13.0.1). Live at https://mindsstreet.com. The store owner applies all changes through the Shopify admin. The live store is not edited from this project. Since 22 Nov the owner has chosen "Design freely" for the redesign prototype (`prototype/`): it doesn't have to fit Spotlight's built-in settings, and `DESIGN.md` lists which parts would need custom theme code when MINDS moves it to Shopify.

## Users
Mainly local Orlando youth, roughly 16–30. They follow MINDS on Instagram and TikTok, check the site when something new drops, and either buy online or go to the store to see it and try it on.

## Product Purpose
MINDS is a streetwear label with its own stores. The website shows each seasonal release and the current inventory. Its single job is to turn a visit into a purchase online or a visit to the store. Success means more add-to-carts and checkouts, plus more people using "Get directions" and in-store pickup for the Orlando store.

## Positioning
MINDS is its own label. Every piece is designed by MINDS and sold in MINDS stores, so the site sells the brand itself, not a mix of other brands.

## Operating Context
- **Primary store:** MINDS Orlando at The Florida Mall. It's the main destination for "visit the store".
- **Other stores, listed with less emphasis:** Plaza del Sol (Kissimmee), International Mall (Miami), Wynwood (Miami) and Plaza las Américas (Puerto Rico).
- **In-store pickup:** live on Shopify, usually ready in about 24 hours.
- **Social channels:** Instagram, TikTok and Facebook.
- **Sales:** a 10% newsletter discount, and periodic sales (25%/35% at the time of the audit).

## Capabilities and Constraints
- **Language:** the site is English only, and the Spanish version is to be unpublished.
- **Releases:** they aren't named. Use "New Season" / "New Arrivals".
- **Catalog:** cargo pants and shorts, tops, shorts, outerwear and studded "Orbit" pieces, priced roughly $75–$300.
- **Custom code:** allowed for the redesign, per the owner's 22 Nov "Design freely" choice. `DESIGN.md` lists which parts need it, so the owner can decide what to build.
- **Hostinger:** never use the Hostinger connection; it belongs to an unrelated client.

## Brand Commitments
- **Name:** MINDS, written in capitals in running text.
- **Logo:** a bold condensed wordmark, with a brain glyph in place of the "D".
- **Message:** "Reset your mindset, focus on your vision and the World will be yours."
- **Owner's taste, from 5 reference sites shared 22 Nov 2026** (inspiration only, never to be copied):
  - photography leads, with studio and campaign shots of people in the clothes
  - a warm neutral base plus one rich accent taken from the clothes
  - tall condensed uppercase headlines
  - image tiles with labels and arrows laid over them, ruled lists, and the name and price on one row
  - one-sentence breaks between sections, and a dark footer
- **Decisions confirmed 22 Nov:**
  - Accent: MINDS's own campaign green.
  - Ground: warm light page with cinematic photo or deep-colour bands and a dark footer.
  - Headlines: tall condensed capitals.
  - Design freely, marking what would need custom Shopify code.

## Evidence on Hand
- Product and campaign photography on the live site, plus photos of each store's front.
- The 17 Nov 2026 audit and baseline screenshots in `audit/2026-11-17/`.
- **Store hours and directions:** taken from the "Visit our stores" section of the live homepage (https://mindsstreet.com/) on 17 Nov 2026.
  - Florida Mall: Mon–Sat 9am–8pm, Sun 11am–7pm.
  - Plaza las Américas: Mon–Sat 9am–9pm, Sun 11am–7pm.
  - International Mall: Mon–Sat 10am–9pm, Sun 11am–7pm.
  - Plaza del Sol: Mon–Sat 10am–8pm, Sun 11am–7pm.
  - Wynwood: no hours listed.
- **Social profiles,** from the live site footer: Instagram @minds_tm, TikTok @minds__tm, and a Facebook profile page.
- **Hero photo:** since 22 Nov, the hero uses the owner-supplied studio campaign frame (`prototype/img/hero-studio.webp`, 1536 × 1024). It's sharp on a 1440px screen. For large and high-density displays, a version at least 2560px wide is still the target.
- **What doesn't exist yet, and must not be invented:** testimonials, review counts, press, sales figures and drop names.

## Product Principles
1. Every screen points to one of two actions: buy it, or come see it in Orlando.
2. The product is the hero. The interface stays quiet so the clothes carry the brand.
3. Keep the season current: new arrivals first, older stock reachable through filters.
4. Treat the store as part of the site: pickup, hours and directions are always one tap away.
5. Make only changes the owner can apply and keep up in the Shopify admin.

## Accessibility & Inclusion
WCAG 2.1 AA: contrast, alt text on all images, touch targets at least 24px, and `prefers-reduced-motion` respected for video and animation.
