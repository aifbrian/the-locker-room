# The Locker Room — Premium Landing Page

A single-route landing page in Indonesian for an original football jersey store, built with Swiss Design discipline: asymmetric modular grid, dominant whitespace, typography-led hierarchy, white background with football-green and gold accents.

## Scope

- One route: `/` (replace placeholder in `src/routes/index.tsx`)
- Static marketing page only — no cart, auth, or backend
- All copy in Bahasa Indonesia per the brief
- Fully responsive, mobile-first, WCAG AA, semantic HTML, SEO meta on the route

## Design System (src/styles.css)

Tokens added via `@theme` + `:root` (oklch):
- `--pitch` Football Green `#1E7A3A`
- `--pitch-deep` Dark Green `#14532D`
- `--pitch-mist` Light Green `#DCFCE7`
- `--ink` `#111827`, `--bone` `#F5F5F5`, `--gold` `#D4AF37`
- Background pure white; green used as accent only
- Type scale: hero 72–88, h2 48–64, h3 28–36, body 18–20, caption 14–16
- Font: Manrope (display + body, weights 300–700), loaded via `<link>` in `__root.tsx` head
- 12-col grid, max container 1320px, section padding 120px (64px on mobile), gap 32px, radius 16–20px
- Decorative hairline pitch-lines as SVG background accents

## Sections (in order)

1. **Announcement bar** — green, single line, dismissible on desktop
2. **Sticky navbar** — transparent on top, solid white + hairline shadow on scroll; logo, menu (Beranda, Shop, Liga, Klub, Vintage, New Arrival, Sale, Blog, Tentang), icons (search, wishlist, cart, masuk), primary CTA
3. **Hero** — 2-col asymmetric; left: oversized headline "Home of Authentic Football Jerseys.", subheadline, primary + secondary CTA, social proof line; right: hero jersey image with floating trust badges, hairline pitch grid behind
4. **Brand trust strip** — monochrome wordmarks (Nike, Adidas, Puma, New Balance, Mizuno, Umbro, Kappa, Hummel)
5. **Featured Categories** — modular grid of 8 large category cards (Premier League, La Liga, Serie A, Bundesliga, UCL, Tim Nasional, Vintage, Retro) with hover zoom + green overlay
6. **Best Sellers** — 4-product grid; each card: image, name, season, price + strikethrough, badges (Best Seller, Original), wishlist + quick-view icons, add-to-cart CTA
7. **Vintage Collection** — editorial split: large image left, headline + paragraph + CTA right
8. **Shop by Club** — circular logos grid (Man Utd, Liverpool, Chelsea, Arsenal, Barça, Real Madrid, Juventus, Inter, Milan, Bayern, PSG, Ajax, Dortmund, Tottenham)
9. **Shop by National Team** — circular flag/crest grid (Argentina, Brazil, France, England, Germany, Spain, Portugal, Italy, Japan, Indonesia)
10. **Why Choose The Locker Room** — 4 Swiss-grid cards (100% Original, Garansi Keaslian, Pengiriman Cepat, Belanja Aman)
11. **Customer Reviews** — 4.9/5 rating header + 3 testimonial cards with customer photo, jersey photo, Verified Purchase chip
12. **Instagram Gallery** — 6-image grid, hover zoom
13. **Newsletter** — green band, headline, subheadline, email input + Berlangganan CTA
14. **Final CTA** — centered headline + dual CTAs
15. **Footer** — multi-column: brand, shop links, payment methods (QRIS, VA, Transfer Bank, E-Wallet), couriers (JNE, J&T, SiCepat, POS, Ninja), socials, copyright

## Interactions

- 300ms transitions; image hover zoom; button lift 2px; subtle shadow
- Scroll reveal (fade + slide-up) via IntersectionObserver hook
- Light parallax on hero image
- Sticky mobile CTA bar (Belanja Sekarang)
- Full focus rings, keyboard nav, lazy-loaded imagery

## Technical notes

- Componentize sections under `src/components/landing/` (AnnouncementBar, Navbar, Hero, BrandStrip, Categories, BestSellers, Vintage, Clubs, NationalTeams, WhyUs, Reviews, InstagramGrid, Newsletter, FinalCTA, Footer)
- One reusable `SectionHeader` + `Reveal` wrapper
- Route `head()` updated: title "The Locker Room — Jersey Bola Original", description, og:title, og:description, og:type, og:image (hero), twitter card
- Single `<main>` in index route; one `<h1>` in hero
- Imagery via `imagegen` (premium tier where text is on-image): hero jersey scene, 8 category covers, 4 best-seller jerseys, vintage editorial, 6 instagram tiles; brand wordmarks + club crests as inline SVG placeholders (text marks) to avoid trademark image issues
- Tailwind v4 tokens only — no hardcoded color classes in components

## Out of scope

- Cart, checkout, product detail pages, search functionality, auth, CMS, Lovable Cloud
- Real brand logos / club crests as raster images (use neutral text wordmarks / monogram circles)
