---
version: 1
slug: "components-home-hero-tsx"
primary_target: "components/home/Hero.tsx"
related_targets: ["components/home/HeroQuickNav.tsx"]
---

# Surface brief — Home hero (SCREEN_4, LWT restage)

## Scope & mode
Hero section only; rest of home unchanged from the committed stark world. Mode: Persuade.

## Direction contract (v2 — replaces the full-bleed staging)
THESIS: The LWT homepage grammar, translated to Duta Mall: a fixed editorial tagline owns the left half; the campaign poster carousel owns the right; navigation floats as mall signage.
OWN-WORLD: Stark tokens unchanged (ink/paper/#F00808, League Gothic 0.9 leading, SUIT, Space Mono). Posters use centered-kicker + display lines + date pill (LWT Godiva card grammar) on authored plate grounds; hard-offset shadows and 2px ink borders carry the neo-brutalist layer.
STORY: Visitor absorbs the city motto (identity), sees what's on now (poster), and acts via the poster pill or quick nav codes.
FIRST VIEWPORT (desktop): TopBar + header (~140px); below: left column = tagline "Gawi Sabumi / Kawa / Manuntung." at clamp(3.2rem,7.2vw,6.8rem) + hours/address mono line; right column = poster card (border-2, shadow-brutal) filling column height with 5 authored posters + control bar (red counter 01/05, title, pause, prev/next). Floating INFO quick-nav bottom-left over the hero.
MOBILE: card first (aspect 3/4), tagline below; quick-nav hidden (BottomBar covers wayfinding); header condensed.
FORM: v2 restage, brief-pinned by the user's two LWT reference captures; no seed roll.
SIGNATURE INTERACTION: The quick-nav state machine — full wayfinding bar over the hero; past it, collapses to a red current-section chip; hover or INFO tap re-expands; outside click/Escape closes; opacity/visibility cross-fade only (no layout-property animation).
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Memorable moment
Scrolling past the hero: the full INFO bar folds down to a live red section chip, then blooms back under the cursor.

## Unresolved decisions
Licensed poster artwork (image slots ready); whether the motto tagline should rotate campaigns later.
