---
version: alpha
name: Lwt
description: |
  Lotte World Tower • Mall's design system embodies a bold, contemporary luxury
  aesthetic that prioritizes clarity and dramatic visual hierarchy. The palette
  is starkly minimalist—a high-contrast interplay between crisp blacks and pure
  whites—allowing the brand's signature red accent to command attention as a
  primary call-to-action signal. Typography is authoritative and geometric, with
  display typefaces rendered in tall, compressed letterforms that demand
  presence. The overall mood is premium yet accessible, emphasizing
  straightforward navigation and confident visual statements. Sharp corners and
  clean lines throughout reinforce a modern, no-frills approach to wayfinding
  and e-commerce functionality.
source:
  url: 'https://www.lwt.co.kr/'
  pagesAnalyzed: 6
  extractedAt: 2026-09-13
  tokensMeasured: true
colors:
  primary: '#F00808'
  canvas: '#000000'
  surface-alt: '#FFFFFF'
  on-primary: '#FFFFFF'
  ink: '#FFFFFF'
  body: '#999999'
  hairline: '#E5E5E5'
  neutral-1: '#737373'
  neutral-2: '#BDBDBD'
  neutral-3: '#666666'
typography:
  display-xxl:
    fontFamily: 'League Gothic'
    fontSize: 178.5px
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: -5.35px
  display-xl:
    fontFamily: 'League Gothic'
    fontSize: 153px
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: -4.59px
  display-lg:
    fontFamily: 'League Gothic'
    fontSize: 97.4995px
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: -2.92px
    textTransform: uppercase
  display-md:
    fontFamily: SUIT
    fontSize: 68px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -1.76px
  display-sm:
    fontFamily: 'League Gothic'
    fontSize: 41.2502px
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: -0.83px
  display-sm-uppercase:
    fontFamily: 'League Gothic'
    fontSize: 41.2502px
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: -0.83px
    textTransform: uppercase
  heading-xxl:
    fontFamily: SUIT
    fontSize: 36px
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: -0.72px
  heading-xl:
    fontFamily: SUIT
    fontSize: 27px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -0.54px
  heading-lg:
    fontFamily: SUIT
    fontSize: 18px
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: -0.36px
  heading-md:
    fontFamily: SUIT
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.7
    letterSpacing: -0.28px
  heading-sm:
    fontFamily: SUIT
    fontSize: 13px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: -0.26px
  heading-xs:
    fontFamily: SUIT
    fontSize: 12px
    fontWeight: 700
    lineHeight: 1
    letterSpacing: 0px
  body-lg:
    fontFamily: SUIT
    fontSize: 18px
    fontWeight: 700
    lineHeight: 1.5
    letterSpacing: -0.36px
  body-md:
    fontFamily: SUIT
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.7
    letterSpacing: -0.32px
  body-md-strong:
    fontFamily: SUIT
    fontSize: 16px
    fontWeight: 600
    letterSpacing: -0.36px
  body-sm:
    fontFamily: SUIT
    fontSize: 14px
    fontWeight: 700
    lineHeight: 1.8
    letterSpacing: -0.32px
  body-xs:
    fontFamily: SUIT
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.8
    letterSpacing: -0.28px
  body-xs-strong:
    fontFamily: SUIT
    fontSize: 13px
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: -0.26px
  button-md:
    fontFamily: 'League Gothic'
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: -0.83px
    textTransform: uppercase
  button-md-strong:
    fontFamily: SUIT
    fontSize: 16px
    fontWeight: 600
    letterSpacing: 0px
  button-sm:
    fontFamily: SUIT
    fontSize: 14px
    fontWeight: 700
    lineHeight: 1
    letterSpacing: -0.28px
  button-xs:
    fontFamily: SUIT
    fontSize: 13px
    fontWeight: 500
    letterSpacing: 0px
  button-xs-strong:
    fontFamily: SUIT
    fontSize: 13px
    fontWeight: 700
    letterSpacing: 0px
  label-xl:
    fontFamily: 'League Gothic'
    fontSize: 74px
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: -1.48px
    textTransform: uppercase
  label-lg:
    fontFamily: SUIT
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1
    letterSpacing: 0px
  caption-sm:
    fontFamily: SUIT
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1
    letterSpacing: 0px
  caption-sm-strong:
    fontFamily: SUIT
    fontSize: 12px
    fontWeight: 700
    lineHeight: 1
    letterSpacing: -0.12px
    textTransform: uppercase
  caption-xs:
    fontFamily: SUIT
    fontSize: 10px
    fontWeight: 400
    lineHeight: 1
    letterSpacing: 0px
rounded:
  none: 0px
  full: 9999px
spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 20px
  xl: 24px
  xxl: 28px
  xxxl: 32px
  section: 36px
  band: 44px
borderWidths:
  thin: 1px
  medium: 2px
elevationStrategy: color-blocking
themes:
  derived: light # the other theme is the site's measured palette
  light:
    bg: '#FFF7F7'
    surface: '#F5EDED'
    surfaceRaised: '#EDE6E6'
    text: '#1C1111'
    textMuted: '#706868'
    border: '#DBD4D4'
    accent: '#DC0707'
    accentFg: '#FFFFFF'
    focusRing: '#F00808'
    elevation: shadow
  dark:
    bg: '#000000'
    surface: '#FFFFFF'
    surfaceRaised: '#FFFFFF'
    text: '#FFFFFF'
    textMuted: '#999999'
    border: '#E5E5E5'
    accent: '#F00808'
    accentFg: '#0B0B0C'
    focusRing: '#F00808'
    elevation: 'border+surface'
  contrastFailures:
    - 'dark: text on surface = 1:1 (needs 4.5:1)'
    - 'dark: accentFg on accent = 4.44:1 (needs 4.5:1)'
components:
  button-outline:
    textColor: '{colors.primary}'
    border: '1px solid {colors.primary}'
    height: 56.4688px
    fontSize: 16px
    fontFamily: SUIT
    fontWeight: 700
    lineHeight: 1
  button-outline-sm:
    typography: '{typography.button-sm}'
    textColor: '{colors.primary}'
    border: '1px solid {colors.primary}'
    height: 50px
  button-text:
    typography: '{typography.button-sm}'
    textColor: '{colors.canvas}'
    height: 55px
  button-text-sm:
    textColor: '{colors.canvas}'
    height: 41.3125px
    fontSize: 10px
    fontFamily: SUIT
    fontWeight: 400
  button-icon:
    textColor: '{colors.canvas}'
    height: 41.3594px
    padding: '9.81818px 6.54545px 9.81818px 6.54545px'
    fontSize: 18px
    fontFamily: SUIT
    fontWeight: 700
  card:
    textColor: '{colors.ink}'
    fontSize: 94.5px
    fontFamily: 'League Gothic'
    fontWeight: 400
    lineHeight: 0.9
  badge-filled:
    typography: '{typography.heading-xs}'
    textColor: '{colors.ink}'
    height: 26px
    padding: '7px 8px 7px 8px'
    backgroundColor: '{colors.canvas}'
  footer:
    typography: '{typography.caption-xs}'
    textColor: '{colors.ink}'
    padding: '24.0005px 24.0005px 36px 24.0005px'
    backgroundColor: '{colors.canvas}'
  link:
    textColor: '{colors.ink}'
    padding: '0px 0px 29.4px 0px'
    fontSize: 14px
    fontFamily: 'League Gothic'
    fontWeight: 500
    lineHeight: 1.7
  link-sm:
    typography: '{typography.caption-xs}'
    textColor: '{colors.ink}'
  navigation:
    typography: '{typography.caption-xs}'
    textColor: '{colors.canvas}'
    height: 72px
states:
  button-disabled:
    target: button
    state: disabled
    opacity: 0.5
  button-hover:
    target: button
    state: hover
    transform: 'scaleX(1)'
  other-hover:
    target: other
    state: hover
    transform: 'scale(1.1)'
  other-focus:
    target: other
    state: focus
    outline: none
    backgroundColor: 'rgb(244, 244, 244)'
  nav-hover:
    target: nav
    state: hover
    transform: 'scale(1.1)'
  link-hover:
    target: link
    state: hover
    textColor: '{colors.primary}'
  input-focus:
    target: input
    state: focus
    outline: none
  other-active:
    target: other
    state: active
    opacity: 0.5
breakpoints:
  - width: 375
    containerWidth: 375
    gridColumns: 0
    navLinksVisible: 0
    menuToggleVisible: false
    headingPx: 0
    bodyPx: 10
    sectionPaddingX: 0
  - width: 768
    containerWidth: 768
    gridColumns: 0
    navLinksVisible: 0
    menuToggleVisible: false
    headingPx: 0
    bodyPx: 10
    sectionPaddingX: 0
  - width: 1024
    containerWidth: 1024
    gridColumns: 0
    navLinksVisible: 0
    menuToggleVisible: false
    headingPx: 0
    bodyPx: 10
    sectionPaddingX: 0
  - width: 1280
    containerWidth: 1280
    gridColumns: 0
    navLinksVisible: 0
    menuToggleVisible: false
    headingPx: 0
    bodyPx: 10
    sectionPaddingX: 0
  - width: 1440
    containerWidth: 1440
    gridColumns: 0
    navLinksVisible: 0
    menuToggleVisible: false
    headingPx: 0
    bodyPx: 10
    sectionPaddingX: 0
coverage:
  statesFound: 30
  gradientsFound: 0
  rolesUnassigned: 3
  archetypesUnnamed: 0
  archetypesDetected: 0
  responsiveMeasured: true
  stylesheetsBlocked: false
  semanticRampDeclared: false
---

# Design System Inspired by Lotte World Tower • Mall

## 1. Visual Theme & Atmosphere

Lotte World Tower • Mall's design system embodies a **bold, contemporary luxury** aesthetic that prioritizes clarity and dramatic visual hierarchy. The palette is starkly minimalist—a high-contrast interplay between crisp blacks and pure whites—allowing the brand's signature red accent to command attention as a primary call-to-action signal. Typography is authoritative and geometric, with display typefaces rendered in tall, compressed letterforms that demand presence. The overall mood is **premium yet accessible**, emphasizing straightforward navigation and confident visual statements. Sharp corners and clean lines throughout reinforce a modern, no-frills approach to wayfinding and e-commerce functionality.

**Key Characteristics**

- High-contrast black-and-white foundation with a singular red brand accent
- Geometric, display-heavy typography with compressed letterforms
- Sharp corners and borderless components (0px radius across interactive elements)
- Minimalist surface treatment; depth via color-blocking rather than shadows
- Strong, confident visual hierarchy with generous use of whitespace
- Modern luxury retail aesthetic targeting urban, design-conscious audiences

## 2. Color Palette & Roles

### Primary

- **Primary / Brand** (`{colors.primary}` — `#F00808`): Primary CTA fills, brand accent, active link states, hero accents, and key interactive indicators. Applied to buttons, badges, and navigation highlights.

### Neutral Scale

- **Canvas** (`{colors.canvas}` — `#000000`): Default page background, footer, and dark sections. Establishes the primary surface for light-on-dark content hierarchy.
- **Surface Alt / Ink** (`{colors.surface-alt}` — `#FFFFFF`): Alternating section bands, primary text color (headings), and label text on brand surfaces. The key high-contrast counterpoint to canvas.
- **Body** (`{colors.body}` — `#999999`): Body copy and secondary text; mid-tone for supporting content that should read clearly but not compete with primary text.
- **Hairline** (`{colors.hairline}` — `#E5E5E5`): 1px borders, dividers, and subtle rule lines. Provides barely-visible structure without visual noise.

### Decorative Neutrals

- **Neutral 1** (`{colors.neutral-1}` — `#737373`): Unassigned; observed in component fills and hover states.
- **Neutral 2** (`{colors.neutral-2}` — `#BDBDBD`): Unassigned; decorative neutral used in transitions and backgrounds.
- **Neutral 3** (`{colors.neutral-3}` — `#666666`): Unassigned; decorative neutral in supporting UI areas.

## 3. Typography Rules

### Font Family

- **Primary**: SUIT (geometric sans-serif; used for body, buttons, navigation, and most UI text)
- **Display**: League Gothic (tall, compressed display typeface; used for headings, cards, and hero statements)
- **Fallback stack**: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`

### Hierarchy

| Role            | Font          | Size   | Weight | Line Height | Letter Spacing | Notes                                              |
| --------------- | ------------- | ------ | ------ | ----------- | -------------- | -------------------------------------------------- |
| Display XL      | League Gothic | 94.5px | 400    | 85.05px     | Not specified  | Hero page titles; extreme scale commands attention |
| Link Large      | League Gothic | 14px   | 500    | 23.8px      | Not specified  | Primary link component; mid-weight for legibility  |
| Link Small      | SUIT          | 10px   | 400    | 10px        | Not specified  | Secondary link; compact footer context             |
| Heading (Badge) | SUIT          | 12px   | 700    | 12px        | Not specified  | Labels and badge text; bold weight for prominence  |
| Body            | SUIT          | 14px   | 700    | 14px        | Not specified  | Button text and secondary headings                 |
| Body Small      | SUIT          | 10px   | 400    | 10px        | Not specified  | Footer copy and fine print                         |
| Button Icon     | SUIT          | 18px   | 700    | normal      | Not specified  | Icon buttons and compact actions                   |
| Navigation      | SUIT          | 10px   | 400    | 10px        | Not specified  | Nav links and menu text                            |

### Principles

- **Display/Impact**: League Gothic is reserved for hero moments and large-scale hierarchy; its extreme compression creates visual drama and commanding presence.
- **Utility & Clarity**: SUIT is used for all functional UI (buttons, navigation, body copy) because its geometric construction ensures legibility at all scales.
- **Weight Hierarchy**: Bold (700) signals interactive affordance and primary content; regular (400) for secondary information. Mid-weight (500) used sparingly for link distinction.
- **Line Height**: Generous leading (especially on display sizes) supports readability and elegance; compact leading on small text maximizes density without sacrificing clarity.

## 4. Component Stylings

### Buttons

**Outline (Primary)**

- Font Family: SUIT
- Font Size: 16px
- Font Weight: 700
- Text Color: `{colors.primary}` (`#F00808`)
- Background: `rgba(0, 0, 0, 0)` (transparent)
- Border: `1px solid {colors.primary}` (`1px solid #F00808`)
- Border Radius: `{rounded.none}` (0px)
- Line Height: 16px
- Height: 56.47px
- Width: 304.52px (full-width reference)
- Padding: 0px
- Box Shadow: none
- Hover State: Color becomes `#F00808`, opacity 1, no background change (outline remains bold)

**Outline Small**

- Font Family: SUIT
- Font Size: 14px
- Font Weight: 700
- Text Color: `{colors.primary}` (`#F00808`)
- Background: `rgba(0, 0, 0, 0)` (transparent)
- Border: `1px solid {colors.primary}` (`1px solid #F00808`)
- Border Radius: `{rounded.none}` (0px)
- Line Height: 14px
- Height: 50px
- Width: 171.88px (reference)
- Padding: 0px
- Box Shadow: none
- Hover State: Outline remains visible; text color sharpens

**Text (Secondary)**

- Font Family: SUIT
- Font Size: 14px
- Font Weight: 700
- Text Color: `{colors.canvas}` (`#000000`)
- Background: `rgba(0, 0, 0, 0)` (transparent)
- Border: none
- Border Radius: `{rounded.none}` (0px)
- Line Height: 14px
- Height: 55px
- Width: 304.52px (reference)
- Padding: 0px
- Box Shadow: none
- Hover State: Background becomes `rgb(229, 229, 229)`, text color remains `#000000`
- Disabled State: Opacity `0.4`, grayscale `0.4` applied

**Text Small**

- Font Family: SUIT
- Font Size: 10px
- Font Weight: 400
- Text Color: `{colors.canvas}` (`#000000`)
- Background: `rgba(0, 0, 0, 0)` (transparent)
- Border: none
- Border Radius: `{rounded.none}` (0px)
- Line Height: normal
- Height: 41.31px
- Width: 110.17px (reference)
- Padding: 0px
- Box Shadow: none

**Icon Button**

- Font Family: SUIT
- Font Size: 18px
- Font Weight: 700
- Text Color: `{colors.canvas}` (`#000000`)
- Background: `rgba(0, 0, 0, 0)` (transparent)
- Border: none
- Border Radius: `{rounded.none}` (0px)
- Line Height: normal
- Height: 41.36px
- Width: 36.97px
- Padding: 9.82px 6.55px 9.82px 6.55px
- Box Shadow: none
- Hover State: Transform scale(1.1)

### Cards & Containers

**Display Card (Large)**

- Font Family: League Gothic
- Font Size: 94.5px
- Font Weight: 400
- Text Color: `{colors.surface-alt}` (`#FFFFFF`)
- Background: `rgba(0, 0, 0, 0)` (transparent; overlaid on photographic or dark backgrounds)
- Border: none
- Border Radius: `{rounded.none}` (0px)
- Line Height: 85.05px
- Height: 85.05px (reference)
- Width: 583.31px (reference)
- Padding: 0px
- Box Shadow: none

### Badges

**Filled Badge**

- Font Family: SUIT
- Font Size: 12px
- Font Weight: 700
- Text Color: `{colors.surface-alt}` (`#FFFFFF`)
- Background: `{colors.canvas}` (`#000000`)
- Border: none
- Border Radius: `{rounded.none}` (0px)
- Line Height: 12px
- Height: 26px
- Width: 117.45px (reference)
- Padding: `{spacing.sm}` top/bottom (8px), `{spacing.xs}` left/right (8px)
- Box Shadow: none

### Navigation

**Header Navigation**

- Font Family: SUIT
- Font Size: 10px
- Font Weight: 400
- Text Color: `{colors.canvas}` (`#000000`)
- Background: `rgba(0, 0, 0, 0)` (transparent)
- Border: none
- Border Radius: `{rounded.none}` (0px)
- Line Height: 10px
- Height: 72px
- Width: 717.91px (reference)
- Padding: 0px
- Box Shadow: none
- Hover State: Transform scale(1.1), text color becomes `{colors.canvas}` (`#000000`)

### Links

**Link Default (Large)**

- Font Family: League Gothic
- Font Size: 14px
- Font Weight: 500
- Text Color: `{colors.surface-alt}` (`#FFFFFF`)
- Background: `rgba(0, 0, 0, 0)` (transparent)
- Border: none
- Border Radius: `{rounded.none}` (0px)
- Line Height: 23.8px
- Height: 48.33px (reference)
- Width: 583.31px (reference)
- Padding: 0px 0px 29.4px 0px
- Box Shadow: none
- Hover State: Color becomes `{colors.primary}` (`#F00808`), opacity 1, transform scale(1.1)

**Link Small**

- Font Family: SUIT
- Font Size: 10px
- Font Weight: 400
- Text Color: `{colors.surface-alt}` (`#FFFFFF`)
- Background: `rgba(0, 0, 0, 0)` (transparent)
- Border: none
- Border Radius: `{rounded.none}` (0px)
- Line Height: 10px
- Height: 28px
- Width: 277px (reference)
- Padding: 0px
- Box Shadow: none
- Hover State: Color becomes `{colors.primary}` (`#F00808`), opacity 1

### Footer

**Footer Container**

- Font Family: SUIT
- Font Size: 10px
- Font Weight: 400
- Text Color: `{colors.surface-alt}` (`#FFFFFF`)
- Background: `{colors.canvas}` (`#000000`)
- Border: none
- Border Radius: `{rounded.none}` (0px)
- Line Height: 10px
- Height: 216.61px
- Width: 1440px (full-width)
- Padding: `{spacing.xl}` (24px) on sides and top, `{spacing.section}` (36px) on bottom
- Box Shadow: none

## 5. Layout Principles

### Spacing System

Base unit: **4px** (`{spacing.xxs}`)

Spacing scale:

- `{spacing.xxs}` = 4px — micro-adjust between tightly coupled elements
- `{spacing.xs}` = 8px — button padding, compact spacing
- `{spacing.sm}` = 12px — small gaps between related sections
- `{spacing.md}` = 16px — standard spacing between components
- `{spacing.lg}` = 20px — generous spacing between major sections
- `{spacing.xl}` = 24px — footer padding, hero spacing
- `{spacing.xxl}` = 28px — large gap before new logical section
- `{spacing.xxxl}` = 32px — page-level padding and breathing room
- `{spacing.section}` = 36px — footer bottom padding, major section dividers
- `{spacing.band}` = 44px — horizontal band/stripe spacing

### Grid & Container

- **Max Width**: 1440px (measured full-width on desktop)
- **Columns**: Single-column responsive layout; no multi-column grid observed across measured breakpoints
- **Section Pattern**: Full-width bands alternate between light (`{colors.surface-alt}` `#FFFFFF`) and dark (`{colors.canvas}` `#000000`) backgrounds. Content centers within viewport width.
- **Horizontal Padding**: 10px observed consistently across all viewport sizes (375px through 1440px)

### Whitespace Philosophy

The design employs **aggressive, strategic whitespace** to emphasize hierarchy and luxury. Large display headings float in generous negative space; card content is surrounded by breathing room. Sections are tall and airy, with substantial top/bottom padding, preventing visual clutter. This restraint creates a premium, editorial quality and ensures focal points dominate the viewer's attention.

### Border Radius Scale

- `{rounded.none}` = 0px — applied to all interactive components (buttons, cards, badges, navigation). Sharp corners are a defining system trait.
- `{rounded.full}` = 9999px — reserved for pill/circle elements (not measured in components; present as a fallback scale value)

### Border Widths

- **Thin**: 1px — outlines on primary and secondary buttons; subtle dividers
- **Medium**: 2px — not explicitly used in measured components; reserved for potential emphasis borders

## 6. Depth & Elevation

### Shadow Strategy

This design system uses **color-blocking** for depth rather than multi-layered shadows. Elevation is communicated through surface color changes:

- **Base/Flat**: Components sit flush on their canvas (no box-shadow)
- **Raised**: Alternate background colors (`{colors.surface-alt}` or `{colors.canvas}`) create layering perception without box-shadow
- **Interactive Feedback**: Hover and active states use opacity shifts and transform (scale/translate) rather than shadow lift

**Philosophy**: Shadows are omitted entirely. Depth derives from stark color contrast and scale transforms. This maintains the system's clean, modernist aesthetic and ensures legibility on varied backgrounds.

### Opacity Levels

- **60%** (0.60) — Not explicitly used; reserved for soft hover or disabled states
- **40%** (0.40) — Disabled button state; visual indication of unavailability

### Z-index / Layering

- **Base**: z-index 1–2 — Standard component layer
- **Dropdown**: z-index 10, 99 — Menus, modals, and overlays
- **Toast**: z-index 99998, 99999, 999999 — Notifications and alerts; extreme stacking to always float above page content

## 7. Do's and Don'ts

### Do

- Use sharp corners (`{rounded.none}` 0px) on all interactive elements to maintain system cohesion
- Apply `{colors.primary}` (`#F00808`) as the sole brand accent; use it for CTAs, active states, and focal accents
- Leverage high contrast between `{colors.canvas}` and `{colors.surface-alt}` to communicate hierarchy and section boundaries
- Stack full-width color bands (alternating black/white) for section division; this is the primary depth mechanism
- Scale typography aggressively: use League Gothic for display/hero scale, SUIT for utility and body
- Add generous whitespace around headings and key content; let negative space amplify focus
- Use `{colors.body}` (`#999999`) for body copy and supporting text; ensure it reads clearly against white backgrounds
- Apply `{colors.hairline}` (`#E5E5E5`) for subtle dividers and 1px rule lines
- Employ opacity shifts and transform: scale/translate on hover for interactive feedback instead of shadows
- Test all UI across the full measured breakpoint range (375px–1440px); maintain 10px horizontal padding throughout

### Don't

- Do not introduce rounded corners on buttons or badges; the system is uniformly sharp
- Do not use drop shadows or blur effects for elevation; color-blocking is the depth strategy
- Do not apply secondary or tertiary brand colors outside the provided palette; `{colors.primary}` is singular
- Do not scale body text below 10px (League Gothic) or 10px (SUIT) for readability
- Do not add gradients or mesh backgrounds; the system relies on flat, solid colors
- Do not use error/success/warning state colors; none are declared in the system
- Do not add padding inside buttons beyond 0px unless explicitly specified per variant
- Do not reduce the line height on display headings; the tall, airy leading is essential to the aesthetic
- Do not introduce animations longer than brief hover transforms; keep motion minimal and purposeful
- Do not deviate from the 10px horizontal padding on sections; maintain responsive consistency

## 8. Responsive Behavior

### Breakpoints

| Viewport | Section Padding-X | Grid Columns | Body Font Size | Heading Size | Navigation Visible |
| -------- | ----------------- | ------------ | -------------- | ------------ | ------------------ |
| 375px    | 10px              | 1            | 10px           | 0px          | Full               |
| 768px    | 10px              | 1            | 10px           | 0px          | Full               |
| 1024px   | 10px              | 1            | 10px           | 0px          | Full               |
| 1280px   | 10px              | 1            | 10px           | 0px          | Full               |
| 1440px   | 10px              | 1            | 10px           | 0px          | Full               |

**Observed Behavior**: The site maintains a **single-column responsive layout** across all measured breakpoints (375px to 1440px). Horizontal padding remains constant at 10px. Typography sizes and heading presence show no variation across the breakpoint range, indicating a uniform typographic hierarchy regardless of device.

### Touch Targets

Minimum touch target size: **48px** (as measured on button components like text-sm at 41.31px and icon buttons at 41.36px; rounded up for accessible touch interaction on mobile). Padding around interactive elements should maintain at least 48×48px in dense layouts.

### Collapsing Strategy

- **Mobile (375px–768px)**: Single column, full-width sections with 10px padding. Navigation links remain visible; no hamburger menu toggle observed. Text and button sizes remain unchanged.
- **Tablet (768px–1024px)**: No layout change; maintains single-column structure. Spacing and padding consistent with mobile.
- **Desktop (1024px–1440px)**: Full-width sections maintain single-column structure. Content does not reflow into multi-column grids. Consistent 10px horizontal padding.

**Strategy**: The layout prioritizes consistency over breakpoint-specific optimization. Content scales uniformly, and the full-width band approach (alternating colors) ensures visual hierarchy remains strong at all sizes.

## 9. Agent Prompt Guide

### Quick Color Reference

- **Primary CTA & Brand Accent**: Primary (`#F00808`) — use on button outlines, active links, and hero accents
- **Page Background / Dark Section**: Canvas (`#000000`) — full-width bands, footer
- **Light Section / Primary Text**: Surface Alt (`#FFFFFF`) — alternating bands, headings, on-dark labels
- **Body Copy**: Body (`#999999`) — supporting text, less prominent content
- **Dividers & Hairlines**: Hairline (`#E5E5E5`) — 1px rule lines, subtle borders
- **Decorative Neutrals**: Neutral 1 (`#737373`), Neutral 2 (`#BDBDBD`), Neutral 3 (`#666666`) — hover states, transitions, non-critical fills

### Iteration Guide

1. **Start with color bands**: Build sections as full-width alternating blocks of `{colors.canvas}` and `{colors.surface-alt}`; this establishes visual hierarchy without shadows.
2. **Typography contrast**: Use League Gothic for display/hero headings (94.5px+, `{colors.surface-alt}`). Use SUIT for all functional text (buttons, nav, body). Ensure bold weight (700) on CTAs.
3. **Sharp corners**: Apply 0px border-radius to all interactive elements (buttons, badges, cards). Never round corners; maintain the system's sharp, modern aesthetic.
4. **Accent sparingly**: Apply `{colors.primary}` only to primary CTAs, active states, and link hover. Do not overuse; let it command attention.
5. **Whitespace first**: Add generous padding around headings and key content. Sections should feel tall and airy. Use `{spacing.section}` (36px) as baseline section padding.
6. **Hover feedback via transform**: Scale, rotate, or translate on hover (no shadows). Use opacity shifts (0.4–0.7) for disabled or secondary states.
7. **Responsive consistency**: Maintain 10px horizontal padding across all viewport sizes (375px–1440px). No multi-column layouts; single column throughout.
8. **Padding inside components**: Button padding is 0px unless specified. Use line-height and font-size for visual mass, not padding inflation.
9. **Text hierarchy**: Body copy uses `{colors.body}` (`#999999`). Headings use `{colors.surface-alt}` (`#FFFFFF`) on dark, `{colors.canvas}` (`#000000`) on light.
10. **Border treatment**: Use `{colors.hairline}` (`#E5E5E5`) for 1px dividers. Thick borders (2px) are available but unused in measured components; reserve for emphasis if needed.

## 10. Known Gaps

- **No semantic status colors**: The site does not expose error, success, warning, or info states. Do not invent a semantic status ramp; the system is color-neutral with only primary brand accent.
- **No gradient or mesh backgrounds**: No decorative gradients, meshes, or complex backgrounds were observed. All surfaces are flat, solid colors.
- **Three decorative neutrals remain unassigned**: `{colors.neutral-1}` (`#737373`), `{colors.neutral-2}` (`#BDBDBD`), and `{colors.neutral-3}` (`#666666`) were measured in components and interactions but have no explicit semantic role. They are used for transitional hover states and non-critical fills.
- **No explicit letter-spacing values**: Typography entries do not include letter-spacing adjustments beyond default. The system may use tracking on display sizes, but specific values were not extracted.
- **Interaction states: limited data**: Hover and active states were extracted from stylesheets, but focus states, error states, and loading states were not explicitly measured. Only implement states documented in Section 4.
- **No dark/light mode observed**: The extraction covered 6 pages across the live site. A single light/dark theme exists; no theme toggling or derived dark mode was detected.
- **Coverage**: 6 pages analysed. Surfaces behind authentication were not visited; premium or account-restricted content may use different components or colors.
- **No animation timing or easing data**: Hover transforms are noted, but CSS animation properties (duration, easing function) were not extracted. Implement transforms with standard timing (e.g., 0.2s ease).
- **No explicit focus or accessibility indicators**: Focus states on inputs show `outline: none`, but alternative focus indicators (e.g., box-shadow on focus, border-color change) were not measured. Ensure keyboard navigation is visually clear via custom focus styles.

---

_This design system document was derived from automated extraction of 6 pages of https://www.lwt.co.kr/ and is complete as of the measurement date. It is sufficient for building UI components and layouts that match the observed brand. For features or states not listed, consult the Known Gaps section._

---

## Project Layer — Duta Mall Neo-Brutalist Extension (2026-09-14)

The extraction above is the pinned foundation. The Duta Mall build extends it with an
earned neo-brutalist layer (user brief: "a touch of neo-brutalism"):

- **Hard-offset block shadows** (zero blur): `6px 6px 0 #000` (shadow-brutal), `3px` (-sm),
  `2px` (-xs); hover lifts to the 6px offset, active presses to 0. Buttons/cards only.
- **Checker hover fill**: `.cell-checker` — 45° repeating hairline diagonal on row hover.
- **Knockout type**: `.text-outline-paper` / `.text-outline-ink` (1.5px stroke) for ghost
  wayfinding words on plates and the footer identity line.
- **Accent-on-ink text rule**: white text never sits on #F00808 below display scale
  (4.4:1). Ink (#000) is the accent-fill foreground at label sizes; white-on-red only at
  display scale where 3:1 applies.
- **Ticker**: red marquee band under the status row, pauses on hover, static under
  reduced motion.
- **Swap rule**: campaign/cinema artwork ships as authored typographic plates until
  licensed assets land; every plate is a labeled placeholder with real PRD copy.
