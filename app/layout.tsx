import type { Metadata, Viewport } from "next";
import "./globals.css";
import { leagueGothic, suit, spaceMono } from "./fonts";

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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${leagueGothic.variable} ${suit.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper font-sans text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:border-2 focus:border-ink focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:font-bold focus:uppercase focus:text-ink"
        >
          Lewati ke konten utama
        </a>
        {children}
      </body>
    </html>
  );
}
