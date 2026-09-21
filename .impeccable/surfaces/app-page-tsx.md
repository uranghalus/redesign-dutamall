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

### Hero facts row — useful facts replace coordinates (2026-09-19)
User request: the mock's "coordinates / civic scale" bottom row carried no visitor value.
Replaced with actionable facts only: street address (Jl. Ahmad Yani KM 2, Melayu,
Banjarmasin Tengah — matches LocationSection, rendered two-line via `whitespace-pre-line`)
and "200+ tenants" (official PRD figure) as a brass display value. Keys renamed in both
dictionaries (`addressLabel`, `directoryLabel`, `directoryValue`; `coordsValue` repurposed
as the address string). No other consumers of the old keys.

### IA day — nav/page alignment, /peta page, footer distill, ID copy (2026-09-19)
1. **Nav = page flow 1:1.** Header nav was tenants→facilities→cinema… while the
   page ran tenants→cinema→…→facilities. Reordered `SiteHeader` nav to mirror the
   page (facilities moved after whatson). Section indices 01–06 were already
   sequential; offcanvas already matched.
2. **Floor map is now its own page** at `/[lang]/peta` with per-locale metadata +
   hreflang (`/id/peta`, `/en/peta`). Removed from the homepage; Tenants'
   "Open the floor map" and Facilities' "View on floor map" link to it
   (relative `peta` hrefs resolve per-locale). Page pads under the fixed header.
3. **Footer distilled** from the 6-column link grid (12+ links) to
   luxury-minimal: monolith identity → one wayfinding line (6 nav anchors +
   brass PETA LANTAI link) → phone/hours/social + dispatch newsletter → single
   legal line. Footer dict restructured: `columns.*` → `exploreLabel`, `links[]`,
   `phone`, `hours`, `social[]`, `dispatchTitle`; legal tags folded into `legal`.
4. **Indonesian copy refined** — removed EN calque/loanwords: hero deck,
   cinema deck ("arsitektur audio"), FUGO story/body ("sophisticated",
   truncated sentences), whatson ("vibrant", title trimmed), facilities meta
   + "Zona Ladies"→"Zona Wanita", "Alamat Sipil"→"Alamat", location deck,
   "kapasitas pax"→"kapasitas tamu", "Event"→"Acara", "Live Music"→"Musik Live".
Verified: tsc + eslint clean; /id /en /id/peta /en/peta all 200; DOM order
hero→tenants→cinema→fugo→whatson→facilities→location; map renders 8 zones on
its own page; footer shows distilled layout (screenshot).

### Wayfinding permanen — /peta dari setiap layar (2026-09-21)

- **Topbar hitam (desktop ≥xl)**: tautan utilitas "PETA LANTAI" (ikon pin) → `/{lang}/peta`, di kiri nomor telepon. Sengaja BUKAN di nav putih — nav tetap struktural 1:1 dengan urutan halaman; topbar adalah baris layanan (jam, telepon, bahasa) dan wayfinding adalah layanan.
- **Bottom bar mobile**: item ke-5 "PETA" (ikon pin) di antara Hotel dan Rute; grid 4→5 kolom, label 12→11px. Terverifikasi di screenshot mobile: 5 sel rapi tanpa sesak.
- **Fix laten**: anchor bottom bar (`#cinema` dll.) mati di /peta (section tidak ada di halaman itu). BottomBar kini client component dengan `usePathname` — dari subpath mana pun anchor dinormalisasi ke `/{lang}#anchor`; di homepage tetap `#anchor` murni. Teruji: /id/peta → `/id#cinema`; /id → `#cinema`.
- Kamus: `nav.map` (Peta Lantai / Floor Map) + `bottomBar.map` (Peta / Map), kedua locale.

### Search → peta deep-link (2026-09-21)

- Hit tenant dengan pin di peta mendapat aksi kedua di baris hasil pencarian: chip pin "Lihat di peta lantai" → `/{lang}/peta?tenant=<slug>`. Direstrukturisasi dari satu `<a>` per baris jadi wrapper + dua anchor (nested `<a>` tidak valid HTML).
- Slug dimiliki `app/data/map.ts` (`MapTenantPin.slug`, 8 pin) — kecocokan hit→pin via nama tenant, tanpa duplikasi data.
- DirectoryMap membaca `?tenant=` sekali saat mount (rAF agar lolos aturan `set-state-in-effect`), fokus pin + zoom 1.9 + zona tersorot; query tetap di URL sehingga view shareable.
- Kamus: `search.mapAction` + `search.mapActionAria` (dengan placeholder `{name}`), kedua locale.
- Terverifikasi end-to-end di browser: cari "star" → chip muncul dengan aria "Lihat Starbucks di peta lantai interaktif" → klik → /id/peta?tenant=starbucks → zona timur tersorot, transform matrix(1.9…) presisi memusatkan pin (718,320).

### Rute jalan kaki di peta (2026-09-21)

- **Graf koridor di `app/data/map.ts`**: 22 node pada sirkulasi nyata (spine tengah utara-selatan, spur barat/timur/atrium, 3 pintu publik) + 21 tepi; `findRoute` = Dijkstra dengan bobot panjang tepi tergambar. Skala 1 unit ≈ 0.1 m (Aula Utama ≈ 20 m sebagai kalibrasi) — rute mengikuti koridor, tidak menembus dinding.
- **Pemilihan pintu masuk**: Gerbang Selatan / Rotunda Drop-off / Parkir Tenggara sebagai tombol aria-pressed di kartu rute; deep-link `?tenant=` memilih pintu terdekat ke pin otomatis (terbukti: Starbucks → Parkir Tenggara 76 m, Fore Coffee → Rotunda 27 m).
- **Kartu RUTE JALAN KAKI**: dari/ke, jarak display League Gothic (m), estimasi ± mnt (75 m/mnt), "via {zona}", pemilih pintu — semua terlokalisasi id/en + announce aria-live.
- **Layer SVG rute**: underglow kuningan + garis solid + dash `route-march` (marching ants 1.1s) + panah per segmen (rotate ke bearing) + cincin pintu berjalan + sonar `route-pulse` di tujuan. Keduanya dimatikan `prefers-reduced-motion`.
- **Pintu masuk digambar**: belah ketupat kuningan di 3 koordinat pintu; legenda bertambah (Rute dash + Pintu masuk).
- **Tombol rute per baris tenant** (ikon route, kolom kanan daftar) — memicu rute dari pintu default + announce.
- **Bug hydration tertangkap**: tombol rute awalnya disarangkan di dalam tombol baris (`<button>` dalam `<button>` = HTML invalid, hydration gagal, badge "2 Issues"). Direstrukturisasi jadi wrapper + dua tombol saudara (pola sama dengan baris hasil pencarian).
- **Bug uji**: klik tombol zona screen-reader (teks "Gerbang Selatan" identik) sempat salah sasaran — pembelajaran: gunakan selektor aria-pressed pada kartu.

### Titik awal bebas — "PILIH DI PETA" (2026-09-21)

- **Free-pick start**: tombol dashed "PILIH DI PETA" di kartu rute masuk mode pilih — kursor crosshair, banner bawah ("Ketuk lokasi Anda sekarang pada peta") + tombol batal, Escape membatalkan. Ketukan (bukan drag — ambang 6px) dikonversi screen→viewBox dengan koreksi pan/zoom, lalu `findRouteFromPoint` menautkan titik itu ke simpul koridor terdekat (`nearestNodeId`, batas 140 unit) sebagai kaki penyambung.
- **State start kini union**: `{kind:"node"}` (3 pintu preset) | `{kind:"free"}` (titik ketuk) — kartu menampilkan "Titik Anda / Your point" saat bebas, crosshair kuningan digambar di titik itu, tombol pintu tetap bisa dipakai kapan saja untuk kembali ke preset.
- Terverifikasi: ketuk dekat simpul timur → 51 m (vs 76 m dari Parkir Tenggara); ketuk dekat west-hub → 20 m EN "From Your point · via East Retail Wing"; transisi balik bebas→preset→bebas mulus; drag pan tidak memicu penempatan titik (ambang gerak).

### Geser titik Anda + pejalan kaki 3D (2026-09-21)

- **Marker dapat digeser**: pointerdown di dekat crosshair (radius grab 22/zoom + 6 unit) mengambil alih gesture dari pan (`markerDrag`); pointermove memindahkan titik bebas live (rute terhitung ulang tiap frame, tetap divalidasi `nearestNodeId`), pointerup mengumumkan jarak baru. Kursor berubah crosshair → grabbing. Tombol "Titik Anda" saat diklik lagi masuk mode pindah dengan hint "Geser silang untuk memindahkan titik Anda".
- **Trace uji geser**: crosshair 507→460→423 (mengikuti pointer dua langkah), bertahan di 423 saat dilepas; jarak 67 m → 59 m konsisten geometri.
- **Pejalan kaki pseudo-3D**: figur di `<g class="walker">` meluncur sepanjang rute via `animateMotion` (`rotate="auto"` menghadap arah jalan; durasi = meter/12, dibatasi 4–14 s). Volume 3D dari gradien lit-sphere (`walker-body`: highlight krem → kuningan → gelap), bayangan tanah elips di bawah kaki + bayangan pada 8 pin tenant, dan vignette radial lantai (`map-floor`) yang menenggelamkan tepi denah. Kaki: dua elips stride bergantian (`walker-stride` 0.55s). Semua animasi mati di prefers-reduced-motion.

### Footer disuling per markup klien (2026-09-21)

- **Dihapus** (tanda merah): blok identitas THE MONOLITH (kicker + display + descriptor), baris JELAJAH/EXPLORE (7 tautan), blok newsletter DISPATCH (judul + blurb + form email).
- **Dipindah** (tanda biru): TATA KELOLA KORPORAT / ANGGOTA GOVINDO GROUP kini di kolom kanan baris kontak (posisi bekas DISPATCH; `lg:text-right`, stack di mobile).
- **Struktur akhir**: kontak (telepon/jam/sosial) kiri + governance kanan → garis → legal satu baris. Komponen jadi server component (tanpa state/form); 9 kunci kamus footer yatim dihapus dari kedua locale; props `lang` tidak lagi diperlukan (2 call site diselaraskan).
