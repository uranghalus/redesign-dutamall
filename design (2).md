---
version: alpha
name: 롯데월드타워 • 몰
description: '쇼핑, 먹거리, 볼거리 등 다양한 즐길거리가 가득한 서울 최대 복합쇼핑몰, 롯데월드타워 • 몰에서 특별한 경험을 만나보세요!'
sourceUrl: 'https://www.lwt.co.kr/'

colors:
  primary: '#f00808'
  on-primary: '#ffffff'
  background: '#ffffff'
  surface: '#ffffff'
  surface-inverse: '#000000'
  border: '#f00808'
  text: '#000000'
  text-inverse: '#ffffff'
  text-muted: '#666666'

typography:
  display:
    fontFamily: 'League Gothic, sans-serif'
    fontSize: 159px
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: -4.75999px
    textTransform: uppercase
  heading:
    fontFamily: 'League Gothic, sans-serif'
    fontSize: 159px
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: -4.75999px
    textTransform: uppercase
  nav:
    fontFamily: 'SUIT'
    fontSize: 14px
    fontWeight: 700
    lineHeight: 1
    letterSpacing: -0.28px
  body:
    fontFamily: 'SUIT'
    fontSize: 14px
    fontWeight: 700
    lineHeight: 1
    letterSpacing: -0.28px

spacing:
  base: 1px
  scale: [1, 2, 3, 5, 8, 9, 11, 12, 14, 15]

radius:
  none: 0px
  pill: 9999px

shadows:
  none: 'none'

motion:
  duration-fast: 200ms
  duration-base: 500ms
  duration-slow: 1500ms
  easing: 'cubic-bezier(0.19, 1, 0.22, 1)'

breakpoints: [680px, 1024px]

components:
  navbar:
    layout: horizontal
    background: surface
    itemSpacing: scale[7]
    activeIndicator: 'border-bottom, 2px, primary'
  hero:
    layout: 'split, 2-column'
    leftColumn: 'display typography, left-aligned, black text on white'
    rightColumn: 'full-bleed promotional image/banner'
  infoCards:
    style: 'flat monochrome icon tiles'
    background: surface-inverse (label tile) / surface (item tiles)
    iconStyle: 'flat, single-color line/glyph icons'
    layout: 'horizontal row, equal-width cells'
  buttons:
    shape: pill
    accent: primary
---

## Rationale

Design tokens extracted from https://www.lwt.co.kr/, reconstructed into a usable design system.

**Color** — Strict monochrome (black/white) base with a single high-saturation red (`#f00808`) reserved for the logo, borders, and accents. This "one accent color" strategy keeps the interface feeling premium and editorial rather than busy — the red is never diluted by being used for large surfaces.

**Typography** — The system leans on extreme scale contrast: a condensed, uppercase display face (League Gothic) at a very large size (~159px) with tight/negative letter-spacing carries brand statements as visual anchors, while all functional text (nav, body) drops to a small, bold, tightly-tracked sans (SUIT) at 14px. There is intentionally no "medium" heading size in between — the jump from headline to UI text is the point, giving pages an editorial/magazine feel instead of a conventional H1→H2→H3 hierarchy.

**Spacing** — A tight, low-value scale (1–15px units) suggests a dense, controlled grid rather than generous airy spacing; whitespace on the live page comes from layout composition (large empty margins around the giant headline) rather than large gap tokens.

**Shape & motion** — No border radius except full pills (used for buttons/badges like the language selector), and no shadows — flat design throughout. Motion uses a slow, eased curve (`cubic-bezier(0.19, 1, 0.22, 1)`) suited to deliberate, cinematic transitions (banner fades, reveal animations) rather than snappy micro-interactions.

**Components** — Hero sections favor a two-column split: bold declarative text on one side, a full-bleed promotional visual on the other. Utility navigation (floor guide, amenities, parking, hours, directions) is rendered as flat monochrome icon tiles in a single row, keeping informational UI visually subordinate to the brand typography above it.

**Accessibility note** — Black text on white and white text on black both pass contrast comfortably; the red accent (`#f00808`) on white is borderline for small text and should be reserved for large text, icons, or borders rather than body copy.
