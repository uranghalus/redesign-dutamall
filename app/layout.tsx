import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Duta Mall Banjarmasin | Belanja, Cinema XXI & FUGO Hotel",
  description:
    "Duta Mall Banjarmasin — pusat belanja, hiburan & gaya hidup terbesar di Kalimantan Selatan. Cek tenant, jadwal Cinema XXI Banjarmasin, fasilitas mall, dan FUGO Hotel Banjarmasin. Gawi Sabumi Kawa Manuntung.",
  keywords: [
    "Duta Mall Banjarmasin",
    "Cinema XXI Banjarmasin",
    "FUGO Hotel Banjarmasin",
    "Jadwal Bioskop Banjarmasin",
    "Mall Banjarmasin",
  ],
  openGraph: {
    title: "Duta Mall Banjarmasin — Gawi Sabumi Kawa Manuntung",
    description:
      "Belanja, nonton Cinema XXI, dan menginap di FUGO Hotel dalam satu destinasi. Open Daily 10:00–22:00 WITA.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* League Gothic — display/heading 159px/400 */}
        <link href="https://fonts.googleapis.com/css2?family=League+Gothic&display=swap" rel="stylesheet" />
        {/* SUIT — nav/body 14px/700 — CDN resmi */}
        <link href="https://cdn.jsdelivr.net/gh/sun-typeface/SUIT@2/fonts/static/woff2/SUIT.css" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col bg-background text-text selection:bg-primary selection:text-on-primary" style={{ fontFamily: "var(--font-body)" }}>
        {children}
      </body>
    </html>
  );
}
