/* ============================================================
   CONTENT — Duta Mall Banjarmasin
   Facts from PRD §5.3–§5.8. Banner photos supplied under /assets/banner-film;
   poster colorways remain the fallback plate for titles without a photo.
   ============================================================ */

export type MovieRating = "SU" | "13+" | "17+";
export type TheaterBadge = "Dolby Atmos" | "D-BOX" | "The Premiere";

export interface Movie {
  id: string;
  title: "Regular" | "Premiere";
  /** two-letter studio code for the typographic poster */
  code: string;
  rating: MovieRating;
  duration: string;
  genre: string;
  badges: TheaterBadge[];
  /** authored poster colorway — fallback when no photo is supplied */
  poster: { bg: string; fg: string; accent?: boolean };
  /** supplied banner photo under /assets/banner-film (optional; falls back to the typographic plate) */
  image?: string;
  /** new = released within this week */
  fresh?: boolean;
  showtimes: string[];
}

export const movies: Movie[] = [
  {
    id: "regular-01",
    title: "Regular",
    code: "MUNAFIK",
    rating: "17+",
    duration: "2j 8m",
    genre: "Horror",
    badges: ["Dolby Atmos", "D-BOX"],
    poster: { bg: "#000000", fg: "#ffffff", accent: true },
    image: "/assets/banner-film/16MMIS.jpg",
    fresh: true,
    showtimes: ["12:40", "15:10", "17:45", "20:15", "22:50"],
  },
  {
    id: "regular-02",
    title: "Regular",
    code: "SUANGGI",
    rating: "17+",
    duration: "1j 47m",
    genre: "Horror",
    badges: ["Dolby Atmos"],
    poster: { bg: "#ffffff", fg: "#000000" },
    image: "/assets/banner-film/16SIKN.jpg",
    showtimes: ["11:20", "13:55", "16:30", "19:00"],
  },
  {
    id: "regular-03",
    title: "Regular",
    code: "HOPE",
    rating: "13+",
    duration: "1j 52m",
    genre: "Thriller",
    badges: ["Dolby Atmos"],
    poster: { bg: "#000000", fg: "#ffffff" },
    image: "/assets/banner-film/26HOPE.jpg",
    showtimes: ["12:10", "14:45", "17:20", "21:35"],
  },
  {
    id: "regular-04",
    title: "Regular",
    code: "RUNNER",
    rating: "17+",
    duration: "2j 21m",
    genre: "Aksi",
    badges: ["D-BOX"],
    poster: { bg: "#ffffff", fg: "#000000", accent: true },
    image: "/assets/banner-film/26RUNR.jpg",
    fresh: true,
    showtimes: ["13:30", "16:05", "18:55", "21:40"],
  },
  {
    id: "premiere-01",
    title: "Premiere",
    code: "RESIDENT EVIL",
    rating: "17+",
    duration: "2j 4m",
    genre: "Horror",
    badges: ["The Premiere", "Dolby Atmos"],
    poster: { bg: "#000000", fg: "#ffffff", accent: true },
    image: "/assets/banner-film/26REVL.jpg",
    fresh: true,
    showtimes: ["14:00", "16:45", "19:30", "22:15"],
  },
  {
    id: "premiere-02",
    title: "Premiere",
    code: "BABY UDON",
    rating: "13+",
    duration: "1j 39m",
    genre: "Keluarga",
    badges: ["The Premiere"],
    poster: { bg: "#ffffff", fg: "#000000" },
    image: "/assets/banner-film/16BUDN.jpg",
    showtimes: ["11:45", "14:20", "17:00", "19:45"],
  },
];

export type FacilityId =
  | "concierge"
  | "fugo-lobby"
  | "atm"
  | "ladies-parking"
  | "disability"
  | "clinic"
  | "nursery"
  | "musholla"
  | "parking"
  | "toilet"
  | "lounge"
  | "smoking";

export interface Facility {
  id: FacilityId;
  name: string;
  detail: string;
  floor: string;
  grid: [number, number];
}

export const facilities: Facility[] = [
  {
    id: "concierge",
    name: "Pusat Informasi",
    detail: "Concierge & layanan tamu",
    floor: "GF",
    grid: [1, 1],
  },
  {
    id: "fugo-lobby",
    name: "Lobi & Lift FUGO Hotel",
    detail: "Akses langsung ke hotel",
    floor: "GF",
    grid: [1, 2],
  },
  { id: "atm", name: "ATM Center", detail: "Semua bank nasional", floor: "GF", grid: [1, 3] },
  {
    id: "ladies-parking",
    name: "Ladies Parking",
    detail: "Area parkir khusus wanita",
    floor: "P1",
    grid: [2, 1],
  },
  {
    id: "disability",
    name: "Ramah Disabilitas",
    detail: "Ramp & kursi roda",
    floor: "Semua",
    grid: [2, 2],
  },
  {
    id: "clinic",
    name: "Ruang Medis",
    detail: "Pertolongan pertama",
    floor: "GF",
    grid: [2, 3],
  },
  {
    id: "nursery",
    name: "Ruang Laktasi & Bayi",
    detail: "Nursery room",
    floor: "L1",
    grid: [3, 1],
  },
  {
    id: "musholla",
    name: "Musholla",
    detail: "Nyaman & ber-AC",
    floor: "P2 & L3",
    grid: [3, 2],
  },
  {
    id: "parking",
    name: "Parkir Luas",
    detail: "Kapasitas 2.500+ mobil & motor",
    floor: "P1–P4",
    grid: [3, 3],
  },
  {
    id: "toilet",
    name: "Toilet Higienis",
    detail: "Touchless & air hangat",
    floor: "Semua",
    grid: [4, 1],
  },
  {
    id: "lounge",
    name: "Area Duduk",
    detail: "Sitting lounge",
    floor: "Semua",
    grid: [4, 2],
  },
  {
    id: "smoking",
    name: "Smoking Terrace",
    detail: "Area khusus outdoor",
    floor: "Rooftop",
    grid: [4, 3],
  },
];

export type TenantCategory =
  | "Semua"
  | "Beauty & Wellness"
  | "F&B & Coffee"
  | "Fashion & Lifestyle";

export const tenantCategories: TenantCategory[] = [
  "Semua",
  "Beauty & Wellness",
  "F&B & Coffee",
  "Fashion & Lifestyle",
];

export interface Tenant {
  name: string;
  category: Exclude<TenantCategory, "Semua">;
  floor: string;
  unit: string;
  /** supplied logo photo under /assets/tenant-photo (optional; falls back to the letter tile) */
  image?: string;
}

export const tenants: Tenant[] = [
  {
    name: "Erha Ultimate",
    category: "Beauty & Wellness",
    floor: "1st Fl",
    unit: "12",
    image: "/assets/tenant-photo/Erha-Ultimate.png",
  },
  { name: "Guardian", category: "Beauty & Wellness", floor: "GF", unit: "08" },
  { name: "Watsons", category: "Beauty & Wellness", floor: "GF", unit: "21" },
  {
    name: "Beauty Haul",
    category: "Beauty & Wellness",
    floor: "1st Fl",
    unit: "19",
    image: "/assets/tenant-photo/Beauty-Haul.png",
  },
  {
    name: "Fore Coffee",
    category: "F&B & Coffee",
    floor: "Ground Fl",
    unit: "A-01",
    image: "/assets/tenant-photo/FORE.png",
  },
  {
    name: "Kopi Kenangan",
    category: "F&B & Coffee",
    floor: "Ground Fl",
    unit: "A-07",
    image: "/assets/tenant-photo/Kopi-Kenangan.png",
  },
  { name: "Starbucks", category: "F&B & Coffee", floor: "1st Fl", unit: "22" },
  {
    name: "Excelso",
    category: "F&B & Coffee",
    floor: "Ground Fl",
    unit: "A-15",
    image: "/assets/tenant-photo/Excelso.png",
  },
  {
    name: "Everbest",
    category: "F&B & Coffee",
    floor: "P2",
    unit: "F-03",
    image: "/assets/tenant-photo/Everbest.png",
  },
  {
    name: "Sushi OK",
    category: "F&B & Coffee",
    floor: "P2",
    unit: "F-08",
    image: "/assets/tenant-photo/Sushi-OK.png",
  },
  {
    name: "Willie's Bakery",
    category: "F&B & Coffee",
    floor: "Ground Fl",
    unit: "A-21",
    image: "/assets/tenant-photo/Willies-Bakery.png",
  },
  { name: "Owned By Unicorn", category: "F&B & Coffee", floor: "Ground Fl", unit: "A-12" },
  {
    name: "Marugame Udon",
    category: "F&B & Coffee",
    floor: "2nd Fl",
    unit: "28",
    image: "/assets/tenant-photo/Marugame-Udon.png",
  },
  {
    name: "Lascada",
    category: "Fashion & Lifestyle",
    floor: "1st Fl",
    unit: "15",
    image: "/assets/tenant-photo/Lascada.png",
  },
  { name: "Regatta", category: "Fashion & Lifestyle", floor: "1st Fl", unit: "18" },
  { name: "Eiger", category: "Fashion & Lifestyle", floor: "2nd Fl", unit: "31" },
  { name: "Grand 99", category: "Fashion & Lifestyle", floor: "GF", unit: "05" },
  {
    name: "New Balance",
    category: "Fashion & Lifestyle",
    floor: "1st Fl",
    unit: "24",
    image: "/assets/tenant-photo/New-Balance.png",
  },
  {
    name: "Garmin",
    category: "Fashion & Lifestyle",
    floor: "2nd Fl",
    unit: "33",
    image: "/assets/tenant-photo/Garmin.png",
  },
];

export const fugo = {
  name: "FUGO Hotel & Suites Banjarmasin",
  stars: 4,
  tagline: "Hotel bintang 4 di lantai teratas Duta Mall",
  highlights: [
    { label: "Kamar", value: "180", unit: "Deluxe & Suite" },
    { label: "Restoran", value: "2", unit: "Fine Dining" },
    { label: "Ballroom", value: "300", unit: "pax capacity" },
    { label: "Ke Bandara", value: "25", unit: "menit — Samsudin Noor" },
  ],
  phone: "(0511) 327-8888",
};

export interface Event {
  id: string;
  date: string;
  category: "Event" | "CSR" | "Live Music";
  title: string;
  excerpt: string;
  accent?: boolean;
}

export const events: Event[] = [
  {
    id: "ev-1",
    date: "19–21 SEP",
    category: "Event",
    title: "Festival Belanja Budaya Banjar",
    excerpt:
      "Pameran kerajinan tangan, kuliner lokal, dan diskon hingga 50% di seluruh tenant.",
    accent: true,
  },
  {
    id: "ev-2",
    date: "28 SEP",
    category: "CSR",
    title: "Bakti Sosial & Donor Darah",
    excerpt:
      "Donor darah bersama PMI Kalimantan Selatan di Ground Floor, 10.00–15.00 WITA.",
  },
  {
    id: "ev-3",
    date: "SETIAP SABTU",
    category: "Live Music",
    title: "Weekend Live Acoustic",
    excerpt: "Musik akustik live di Main Atrium, 19.00–21.00 WITA. Gratis untuk pengunjung.",
  },
  {
    id: "ev-4",
    date: "05 OKT",
    category: "Event",
    title: "Pameran Otomotif & Festival Anak",
    excerpt:
      "Kendaraan modifikasi, test ride, dan zona bermain anak di area parkir P1.",
  },
];

/* wayfinding — the mall's structural truth, in wayfinding codes */

export interface WayfindingItem {
  code: string;
  label: string;
  floor: string;
  hours: string;
  href: string;
  accent?: boolean;
}

export const wayfinding: WayfindingItem[] = [
  { code: "C21", label: "Cinema XXI & The Premiere", floor: "L3", hours: "10:00–24:00", href: "#cinema" },
  { code: "FGO", label: "FUGO Hotel & Suites", floor: "L8–L12", hours: "24 jam", href: "#fugo" },
  { code: "FNB", label: "Food Court & Coffee", floor: "P2", hours: "10:00–22:00", href: "#tenants" },
  { code: "RET", label: "Retail & Fashion", floor: "GF–L2", hours: "10:00–22:00", href: "#tenants" },
  { code: "PRK", label: "Parkir 2.500+ mobil", floor: "P1–P4", hours: "24 jam", href: "#facilities" },
  { code: "INF", label: "Concierge & Information", floor: "GF", hours: "10:00–22:00", href: "#facilities", accent: true },
];
