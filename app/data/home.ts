export type TenantCategory =
  | "Semua"
  | "Beauty & Wellness"
  | "F&B & Coffee"
  | "Fashion & Lifestyle";

export interface Tenant {
  name: string;
  category: Exclude<TenantCategory, "Semua">;
  floor: string;
}

export interface Movie {
  title: string;
  rating: number;
  duration: string;
  age: "13+" | "17+" | "SU";
  formats: string[];
  showtimes: string[];
  gradient: string;
}

export const tenants: Tenant[] = [
  { name: "Erha Ultimate", category: "Beauty & Wellness", floor: "1st Fl - Unit 12" },
  { name: "Fore Coffee", category: "F&B & Coffee", floor: "Ground Fl - Main Atrium" },
  { name: "Kopi Kenangan", category: "F&B & Coffee", floor: "Ground Fl - Unit 05" },
  { name: "Guardian", category: "Beauty & Wellness", floor: "1st Fl - Unit 20" },
  { name: "Lascada", category: "Fashion & Lifestyle", floor: "2nd Fl - Unit 08" },
];

export const movies: Movie[] = [
  {
    title: "Petualangan Banjar",
    rating: 4.8,
    duration: "1j 52m",
    age: "13+",
    formats: ["Dolby Atmos", "D-BOX"],
    showtimes: ["11:00", "13:30", "16:00", "18:30", "21:00"],
    gradient: "from-red-900 via-crimson to-amber-600",
  },
  {
    title: "Nusa Bayang",
    rating: 4.6,
    duration: "2j 05m",
    age: "17+",
    formats: ["Premiere"],
    showtimes: ["12:00", "14:45", "17:30", "20:15"],
    gradient: "from-zinc-900 via-indigo-950 to-amber-700",
  },
  {
    title: "Sungai Martapura",
    rating: 4.9,
    duration: "1j 45m",
    age: "SU",
    formats: ["Dolby Atmos"],
    showtimes: ["10:30", "13:00", "15:30", "18:00", "20:30"],
    gradient: "from-emerald-950 via-cinema-card to-gold",
  },
];

export const facilities: { name: string; desc: string }[] = [
  { name: "Pusat Informasi", desc: "Concierge" },
  { name: "Lobi & Lift FUGO", desc: "Akses hotel" },
  { name: "ATM Center", desc: "Semua bank nasional" },
  { name: "Ladies Parking", desc: "Area khusus wanita" },
  { name: "Ramah Disabilitas", desc: "Ramp & kursi roda" },
  { name: "Ruang Medis", desc: "Klinik & P3K" },
  { name: "Nursery Room", desc: "Ruang laktasi & bayi" },
  { name: "Musholla", desc: "Nyaman P2 & L3" },
  { name: "Parkir Luas", desc: "2.500+ mobil & motor" },
  { name: "Toilet Touchless", desc: "Higienis" },
  { name: "Sitting Lounge", desc: "Area istirahat" },
  { name: "Smoking Terrace", desc: "Outdoor terdesignasi" },
];

export const promos = [
  { title: "Festival Belanja Budaya", desc: "Diskon tenant hingga 70% akhir pekan ini." },
  { title: "Festival Anak Ceria", desc: "Lomba & playground di Main Atrium." },
  { title: "Pameran Otomotif", desc: "Test drive & promo DP ringan di L1." },
];

export const events = [
  { title: "Donor Darah Rutin", desc: "Bakti sosial bersama PMI Banjarmasin." },
  { title: "Weekend Live Acoustic", desc: "Musik akustik tiap Sabtu malam di Food Court." },
  { title: "Komunitas Banjar Bersatu", desc: "Perayaan budaya & kuliner lokal." },
];
