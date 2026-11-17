# MINDS website audit — 17 Nov 2026

**Site:** https://mindsstreet.com/es (with the English version at https://mindsstreet.com/ checked too)
**Platform:** Shopify, "Spotlight" theme v13.0.1
**Pages reviewed:** homepage, collection page (`/es/collections/minds-street`) and product page (`/es/products/minds-legacy-croc-jacket`), each at phone (390px) and desktop (1440px) widths.
**Screenshots:** [`screenshots/`](screenshots/) shows the site as it was on this date. Use them to compare before and after changes.

Almost every fix below is a setting in the Shopify admin (theme editor, Translate & Adapt, product editor). Only the tap-to-play option in item 13 may need a theme code change.

---

## Fix first (high impact, small effort)

### 1. The Spanish page title says "calle mental"
The browser tab, Google results and social previews for `/es` read **"calle mental – MINDS"**. That is "Minds street" machine-translated word for word. The English title is a third version, "Mindstreet".
- **Fix:** in Translate & Adapt, set the homepage title and og:title (Spanish and English) to one consistent brand name, for example *"MINDS — Streetwear | Florida & Puerto Rico"*.

### 2. The Spanish site is half English
On `/es`, these remain in English: *NEW ARRIVALS*, *SPOTLIGHT*, *VISIT OUR STORES*, *Get Directions*, *Subscribe to our community / Sign up & get 10% off*, *Contact us / Questions? Our team is here to help*, the hero button *SHOP ALL*, the quote, the *Size* label and every product description. Meanwhile buttons like *Ver todo* and *Agregar al carrito* are in Spanish. The mix looks unfinished.
- **Fix:** translate the theme sections and product descriptions in Translate & Adapt. Or, if the brand voice should stay English (common in streetwear), decide that on purpose and keep only checkout and system text in Spanish.

### 3. The sale banner doesn't match the products
The top bar says *"MINDS Sales 25% & 35% Off"*, but no product on the homepage shows a sale price.
- **Fix:** link the banner to a "Sale" collection, set compare-at prices so discounts show as crossed-out prices, and name what's on sale ("Hasta 35% en shorts y cargos").

### 4. Several products share the same name
"Minds Femme Noir Top", "Minds Femme Noir Short" and "MINDS Orbit 3/4 studs" each appear twice. They're different colors, but the names don't say so. Capitalization is also mixed ("MINDS" vs "Minds").
- **Fix:** add the color to each name ("Femme Noir Top — Sky Blue") or merge them into one product with color variants. Pick one spelling of the brand.

### 5. 12 of 23 homepage images have no alt text
This includes the hero photo, the Spotlight images and all store photos. Screen readers skip them and Google can't index them.
- **Fix:** add alt text for each image in the theme editor and in Files.

### 6. The meta description has grammar errors
English: *"Minds street fashion is a store that define the trending of a fashion street wear lifestyle"*.
- **Fix:** rewrite it, for example *"MINDS streetwear. Shop new drops online or visit our stores in Orlando, Miami, Kissimmee and San Juan."* Write a Spanish version too.

---

## Design improvements

### 7. Desktop hides the menu behind a hamburger icon
At 1440px there's room for the categories, yet they sit behind ☰. Shoppers on desktop expect to see *Shop All · New · Sale · Stores* at the top.
- **Fix:** Theme settings → Header → Desktop menu type: *Dropdown* (or *Mega menu*).

### 8. The hero has no headline
The opening image is strong, but it only carries a thin outlined "SHOP ALL" button. On the photo, that button sits over the model's lap.
- **Fix:** add the drop or season name as a headline, use a solid filled button, and move it to the lower-left so it clears the subject.

### 9. The fonts don't match the brand
The logo is a bold, condensed sans-serif. The site uses Playfair Display and Bodoni Moda, which are elegant, letter-spaced serifs that read more "luxury boutique" than streetwear. Bodoni at body size is also tiring to read in long product descriptions.
- **Fix:** Theme settings → Typography. Use a bold condensed sans for headings (close to the logo) and a clean sans for body text.

### 10. Product photos aren't consistent
In New Arrivals, some products are flat-lays on white with square corners, others are on-model shots on cream with rounded corners. The grid looks uneven.
- **Fix:** shoot or edit all catalog images on one background and set one corner style in the theme. Use model shots as the second image (shown on hover).

### 11. The $300 jacket has one photo and no size guide
The Legacy Croc Jacket page shows a single front image. There's no back view, no detail or fit shot and no size chart. That's the main reason shoppers hesitate on an expensive item.
- **Fix:** at least 4 images (front, back, texture close-up, on-model with height and size worn) and a size guide popup or tab.

### 12. The collection page has no filters or sorting
"Shop All" lists every product with no way to filter by size, category or price.
- **Fix:** install Shopify's free **Search & Discovery** app, turn on filters for Size, Product type and Price, and enable sorting in the collection section.

---

## Performance

### 13. The Spotlight video weighs 7.6 MB
It's a 1080p video at 3.3 Mbps that plays automatically. On desktop the homepage downloads about **9.3 MB** in total, mostly this video. On mobile data, that's slow and expensive for visitors.
- **Fix:** re-export it at 720p and about 1.5 Mbps (aim for under 2 MB), or show the poster image and play on tap on phones.

### 14. Image formats
- The hero is a PNG (`IMG_3110.png`, offered up to 3840px wide), and the jacket is also a PNG. Photos should be JPG or WebP, which are much smaller at the same quality.
- One store photo is a **`.heic`** file (`IMG_3109.heic`), an iPhone format. Check that it shows up on Android and in Chrome on Windows, and re-upload it as JPG if not.

---

## What's working
- Five physical stores with hours and directions. That's a real trust signal; consider linking it from the main menu.
- Good product photography on the model shots, plus an active social presence (Instagram, TikTok, Facebook).
- Product structured data is present, along with correct `hreflang` tags for English and Spanish and a valid sitemap.
- No horizontal scrolling on phones; the layout holds up at 390px.

## Not covered in this audit
- **Checkout, Shop Pay and tracking pixels:** this audit's network setup blocked Shopify's checkout scripts and the analytics hosts, so the cart → checkout flow wasn't tested.
- **Lighthouse scores:** not run, for the same reason (the numbers would be skewed).
- **Store cards:** in the full-page screenshots the store cards look faded. That's a scroll-in animation caught mid-fade, not a bug on the live site.
