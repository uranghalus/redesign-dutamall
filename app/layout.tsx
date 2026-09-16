import type { Metadata, Viewport } from "next";
import "./globals.css";
import { leagueGothic, suit } from "./fonts";

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
      suppressHydrationWarning
      className={`${leagueGothic.variable} ${suit.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper font-sans text-ink">
        {/* Before first paint: (1) the .js motion gate — reveal start states
            only hide content under it, so a failed script can never blank the
            page; (2) --vw — a scrollbar-proof 1vw so the fluid type scale
            doesn't jump when the scrollbar appears, as on lwt.co.kr. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add("js");` +
              `try{var f=function(){document.documentElement.style.setProperty("--vw",document.documentElement.clientWidth+"px")};f();addEventListener("resize",f,{passive:true})}catch(e){}`,
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:font-sans focus:text-sm focus:font-bold focus:uppercase focus:text-paper"
        >
          Lewati ke konten utama
        </a>
        {children}
      </body>
    </html>
  );
}
