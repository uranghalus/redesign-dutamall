# Surface brief — app/page.tsx (The Monolith restage, 2026-09-18)

Mode: **Persuade** — the visitor decides and acts; design is the product.

## World

"The Monolith" — the user's full-page mock (Versi1.png, 1280×7250), followed
1:1. Blueprint language across the whole page: paper/ink/bone/platinum
grounds, hairline rules, brass-gold accents (text-safe `#8a6d2f`; decorative
`#B49B57` with ink text only), League Gothic display + SUIT labels, numbered
section indices 01–06. The mock's memorable moment — the hero's blueprint
split + 01–04 stats strip — carries the whole page's grammar.

## Section sequence (mock order)

1. Hero — bone blueprint column + photo carousel + 01–04 strip (controls)
2. §01 Directory/Tenants — paper; floor chips, numbered cards, meta strip
3. §02 Cinema XXI & The Premiere — black; Premiere info column, gold chips
4. §03 FUGO Hotel — paper; photo diptych, 180/02/300/25 stat grid, CTAs
5. §04 What's On — platinum; ruled event cards, venue tags, READ STORY
6. §05 Services & Concierge — platinum; icon cards with LOCATION footers
7. §06 Location — paper; ARRIVE AT THE LANDMARK + VIP Inquiry form
8. Footer — black; THE MONOLITH, 7-column gold-numbered grid, dispatch form

The Enter band (black 16:9 interstitial) was retired by the mock.

## Interactions kept live

Hero carousel (autoplay 6.5s, pause-on-hold, swipe, keys, tablist strip),
tenant search + floor/category filters + picked detail strip, cinema
segment tabs + showtime picks, FUGO nights/guests estimator (details drawer),
What's On filters + remind toggle, facilities detail readout, concierge
form with success state, header SEARCH overlay.

## Constraints

- React 19 / Next 16.3.5: no `<script>`/`<Script>` in components — boot
  flags live in `components/ui/MotionGate.tsx` (useInsertionEffect).
- Label ramp: 10px fine print / 12px labels; no 11px.
- `text-brass-soft` only ≥ text-base display or on ink; body-size text on
  brass fills is always ink.
- `--color-accent` is now `#8a6d2f`; red `#f00808` no longer appears.
- Scroll margin: 84px (124px ≥1280px for the black topbar).

## i18n overlay (2026-09-18)

All surface copy flows from `dict` (app/i18n/dictionaries/{id,en}.json).
The dictionary is loaded in app/[lang]/page.tsx and passed down; locale
formatting (durations, IDR prices) uses app/i18n/format.ts. Visual capture
fixtures must hit `/id` or `/en` — the bare `/` is a 307 to the negotiated
locale. Display headlines remain English per the mock's language.

## §02 Cinema — poster-card carousel (2026-09-18)

The user's new attachment replaces the blueprint row-cards: poster-first
cells (badge pill, duration·rating pill, genre kicker, serif title,
studios, showtime chips, BOOK SEATS) in a horizontal rail at
`lg`-breakpoint widths 262/300/318px. Interactions: mouse drag with snap
re-settle, touch swipe, arrow buttons, arrow keys on the focused rail,
live "4 dari 6 film" counter, brass progress rule. Poster art from
`/assets/banner-film` (300×441). Serif = self-hosted Playfair Display
(`--font-serif`). Rail bleeds to the right viewport edge per the mock.

### §01B DirectoryMap (2026-09-18)

Interactive blueprint floor plan per the user's CAD attachment: zones
(rotunda, oval atrium, main hall, west spine, east wing, south gate,
parking), tenant pins, amenity markers. Zoom/pan + click-to-spotlight with
bidirectional list sync. Geometry in `app/data/map.ts`; labels localized
(map.* keys, both locales). Verified mobile + 1440px desktop.

### §03 FUGO — booking handoff (2026-09-18)

Booking feature removed: the nights/guests rate-estimate widget is gone, and
the BOOK DIRECT CTA now links to the official hotel site
(https://fugohotels.com/banjarmasin/, new tab, rel noopener noreferrer).
URL lives in `fugo.bookingUrl` (app/data/home.ts). Orphaned dictionary keys
(estimate, nights, guests*, reduceNights, addNights, illustrative,
estimateLine) pruned from both locales; `FugoSpotlight` no longer needs the
`locale` prop. VIP CONCIERGE still drops to #location. Verified both
locales via curl + browser: CTA href/aria correct, no estimate remnants.
