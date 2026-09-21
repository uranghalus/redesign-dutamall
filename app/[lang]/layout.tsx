import type { Metadata, Viewport } from "next";
import MotionGate from "@/components/ui/MotionGate";
import { locales, type Locale } from "@/app/i18n/config";
import { hasLocale } from "@/app/i18n/dictionaries";
import { notFound } from "next/navigation";
import "../globals.css";
import { leagueGothic, suit, playfair } from "../fonts";

/* Static locale routes — /id and /en (official i18n guide pattern) */
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const skipToLabel: Record<Locale, string> = {
  id: "Lewati ke konten utama",
  en: "Skip to main content",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = hasLocale(lang) ? lang : "id";
  const id = locale === "id";

  const title = id
    ? "Duta Mall Banjarmasin | Belanja, Cinema XXI & FUGO Hotel"
    : "Duta Mall Banjarmasin | Shopping, Cinema XXI & FUGO Hotel";
  const description = id
    ? "Duta Mall Banjarmasin — pusat belanja, hiburan & gaya hidup terbesar di Kalimantan Selatan. Cek tenant, jadwal Cinema XXI Banjarmasin, fasilitas mall, dan FUGO Hotel Banjarmasin. Gawi Sabumi Kawa Manuntung."
    : "Duta Mall Banjarmasin — South Kalimantan's largest shopping, entertainment & lifestyle destination. Browse tenants, Cinema XXI showtimes, mall facilities, and FUGO Hotel Banjarmasin. Gawi Sabumi Kawa Manuntung.";

  return {
    title,
    description,
    keywords: [
      "Duta Mall Banjarmasin",
      "Cinema XXI Banjarmasin",
      "FUGO Hotel Banjarmasin",
      id ? "Jadwal Bioskop Banjarmasin" : "Banjarmasin cinema showtimes",
      id ? "Mall Banjarmasin" : "Banjarmasin mall",
    ],
    alternates: {
      canonical: `/${locale}`,
      languages: { id: "/id", en: "/en" },
    },
    openGraph: {
      title: "Duta Mall Banjarmasin — Gawi Sabumi Kawa Manuntung",
      description: id
        ? "Belanja, nonton Cinema XXI, dan menginap di FUGO Hotel dalam satu destinasi. Open Daily 10:00–22:00 WITA."
        : "Shop, watch Cinema XXI, and stay at FUGO Hotel in one destination. Open daily 10:00–22:00 WITA.",
      type: "website",
      locale: id ? "id_ID" : "en_US",
      alternateLocale: id ? "en_US" : "id_ID",
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const locale = lang as Locale;

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${leagueGothic.variable} ${suit.variable} ${playfair.variable} h-full antialiased`}
    >
      {/* suppressHydrationWarning: browser extensions (e.g. Grammarly's
          data-new-gr-c-s-check-loaded / data-gr-ext-installed on <body>)
          mutate the DOM before React hydrates; the app's own markup is clean. */}
      <body
        suppressHydrationWarning
        className="flex min-h-full flex-col bg-paper font-sans text-ink"
      >
        {/* Motion gate & fluid-viewport flag, without a <script> tag: React 19
            forbids script tags inside components (Next 16.3.5 surfaces it as
            a blocking dev error), and next/script executes too late for
            pre-paint state. The gate component adds `.js` during the commit
            phase (before paint) and keeps --vw current; without JS the page
            renders fully visible (start-states are opt-in CSS under `.js`). */}
        <MotionGate />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:font-sans focus:text-sm focus:font-bold focus:uppercase focus:text-paper"
        >
          {skipToLabel[locale]}
        </a>
        {children}
      </body>
    </html>
  );
}
