---
version: 3
slug: "components-home-hero-tsx"
primary_target: "components/home/Hero.tsx"
related_targets: ["components/home/HeroQuickNav.tsx"]
---

# Surface brief — Home hero (SCREEN_4, LWT restage)

## Scope & mode
Hero section only; rest of home unchanged from the committed stark world. Mode: Persuade.
Audience: weekend shoppers, filmgoers, hotel guests on the mall's front door. Job: absorb identity, see what's on, act. Proof: real events, real cinema, real hours/address.

## Direction contract (v3 — wayfinding field on paper; replaces v2 flat staging)
THESIS: The hero IS the mall map margin — the paper ground carries the mall's own wayfinding codes as oversized knockout signage, and the whole section answers the visitor (pointer parallax, proximity glow, keyboard arrows) instead of offering dead space. Refuses the category-default static white hero.
OWN-WORLD: Stark tokens unchanged (ink/paper/#F00808, League Gothic 0.9 leading, SUIT, Space Mono). Field devices are LWT-native: `.text-outline-accent` ghost codes, red structural band + vertical rule, `.checker-band` floor strip. Content sits z-10 above; nothing behind it competes at full ink.
STORY: Visitor reads the city motto (identity), sees the current campaign (poster card), acts via poster pill, quick-nav codes, or arrow keys — the hero itself is a control surface.
FIRST VIEWPORT (desktop): TopBar + header (~140px); red 6px field band; left column = tagline "Gawi Sabumi / Kawa / Manuntung." at clamp(3.2rem,7.2vw,6.8rem) + motto line + hours/address mono row (address links #location); right column = poster card (border-2, shadow-brutal, ~0.85fr) with control bar. Ghost codes C21 (top-right), FGO (left), PRK (center), FNB (bottom-left) bleed behind content.
FORM: v3 evolution of the user-brief-pinned LWT restage (no seed roll); field direction chosen by the user from three options.
MOBILE (<md): card first (4/5), tagline + motto hidden by user decision (motto still in the red ticker and footer); field ghosts hidden, red band + checker remain; BottomBar covers wayfinding; quick-nav hidden.
SIGNATURE INTERACTION: Two-handed hero — the wayfinding field breathes with the cursor (parallax ±10px, ghosts brighten within ~440px), and ←/→ anywhere in the hero drives the carousel. Quick-nav fold past the hero is a discrete cut (zero-footprint hidden branch + @starting-style fade-in), no layout-property animation.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Memorable moment
Moving the cursor across the hero: the paper ground comes alive — ghost mall codes wake toward your pointer and the whole field leans with it, like reading the mall's map under a moving light.

## Unresolved decisions
Licensed poster artwork (image slots ready); whether the motto tagline returns to mobile later (currently hidden by user choice); field density on ultrawide (>1600px) viewports.

## System notes (2026-09-14)
- `.cell-checker` sets `position: relative` unlayered, so it beats Tailwind's layered `absolute` — absolute checker placements must use `.checker-band` (this also fixed the festival poster's floor strip, which had been silently static-flowing).
- v3.1: the poster card is full-bleed edge-to-edge below `md` (negative -mx-4 against the grid padding); poster content rescales for the wider frame (type floor 2.4rem/8.5vw, larger pill, px-6). Hero grid tracks are `minmax(0,…)` — without them the implicit track sizes to the control bar's min-content and the nowrap slide title ("FUGO HOTEL & SUITES BANJARMASIN") widens the card past the viewport, slide-dependently.
- v3.2: the poster card sheds the brutalist layer (border-2 + shadow-brutal removed; control bar seams reduced to hairlines `border-ink/15`; `overflow-hidden` keeps the plate flush) — it reads as artwork; brutalism stays on buttons, chips, and the quick-nav bar. Quick-nav collapse is a smooth fold: each branch is measured into `--fold-w`
and its track transitions `width → 0` (dur-md) with content fading + 6px nudge
(`.quicknav-fold`; the 0fr-grid approach is structurally impossible in a flex
row, and inline widths outrank the folded rule — the custom property is the
correct hook); re-measures on md-breakpoint crossing and font settle;
supersedes the v3 discrete-cut contract line.
- Site-wide elevation audit (2026-09-14): the hero plate is codified as the
  artwork exception; every static card site-wide (Facilities, WhatsOn, Tenants,
  Location) is border-emphasis, flat, fill-inversion hover. Decision recorded in
  DESIGN.md (canonical layer §6 + project layer elevation bullet).
- v3.3 (user-directed re-scope): the de-brutalization is **mobile-only**. At `md+`
  the carousel regains `border-2 border-ink shadow-brutal` and 2px control-bar
  seams; below `md` the card stays a flush full-bleed plate but gains a 1px
  `max-md:border` boundary so it still reads as a carousel, with hairline
  (1px/15%) seams. Cinema + FUGO cards follow the same split. Supersedes the
  v3.2 "plate at all sizes" claim and the site-wide elevation audit's desktop
  assumption for these three surfaces.
