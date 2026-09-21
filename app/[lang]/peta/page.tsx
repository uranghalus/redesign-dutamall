import type { Metadata } from "next";
import SiteHeader from "@/components/layout/SiteHeader";
import BottomBar from "@/components/layout/BottomBar";
import SiteFooter from "@/components/layout/SiteFooter";
import DirectoryMap from "@/components/home/DirectoryMap";
import { getDictionary, hasLocale } from "@/app/i18n/dictionaries";
import { notFound } from "next/navigation";
import type { Locale } from "@/app/i18n/config";

/* /id/peta & /en/peta — the interactive floor plan as its own destination.
   Lifted off the homepage (2026-09-19): the homepage tells the story top-down;
   wayfinding is a task, and tasks deserve a direct URL. Tenants' "Open the
   floor map" and Facilities' "View on floor map" links land here.

   Desktop-only (2026-09-21): the zoom/pan stage does not survive a phone
   viewport, so mobile gets an honest notice card (no dead ends — a Google
   Maps escape hatch) while desktop keeps the full plan. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = hasLocale(lang) ? lang : "id";
  const id = locale === "id";

  const title = id
    ? "Peta Lantai Interaktif | Duta Mall Banjarmasin"
    : "Interactive Floor Map | Duta Mall Banjarmasin";
  const description = id
    ? "Denah lantai 1 Duta Mall Banjarmasin — klik zona untuk melihat tenant, cari pintu eskalator, lift, musholla, ATM, dan fasilitas lain. Interaktif, bisa diperbesar."
    : "Floor 1 plan of Duta Mall Banjarmasin — click a zone to see its tenants, locate escalators, lifts, musholla, ATMs, and other amenities. Interactive and zoomable.";

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/peta`,
      languages: { id: "/id/peta", en: "/en/peta" },
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: id ? "id_ID" : "en_US",
      alternateLocale: id ? "en_US" : "id_ID",
    },
  };
}

export default async function PetaPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const notice = dict.map.mobileNotice;

  return (
    <div id="top" className="flex min-h-full flex-col bg-ink">
      <SiteHeader dict={dict} lang={locale} />
      {/* fixed header clearance: topbar + nav (~100px mobile / 112px desktop) */}
      <main
        id="main"
        className="flex-1 bg-ink pt-[100px] pb-[60px] md:pb-0 xl:pt-[112px]"
      >
        {/* mobile — honest notice card, Google Maps as the escape hatch */}
        <section
          className="flex min-h-[calc(100svh-160px)] items-center justify-center px-4 py-14 md:hidden"
          aria-labelledby="map-mobile-title"
        >
          <div className="w-full max-w-md border border-paper/20 bg-ink p-8 text-paper">
            <span
              aria-hidden="true"
              className="block h-1 w-10 bg-brass-soft"
            />
            <h1
              id="map-mobile-title"
              className="mt-5 font-display text-4xl uppercase leading-[0.95]"
            >
              {notice.title}
            </h1>
            <p className="mt-4 font-sans text-sm leading-relaxed text-paper/65">
              {notice.body}
            </p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Duta+Mall+Banjarmasin"
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex min-h-[48px] items-center gap-2 bg-paper px-5 font-sans text-xs font-bold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-brass-soft"
              aria-label={notice.fallbackAria}
            >
              {dict.location.mapsCta}
            </a>
          </div>
        </section>

        {/* md+ — the full interactive plan */}
        <div className="hidden md:block">
          <DirectoryMap dict={dict} locale={locale} />
        </div>
      </main>
      <SiteFooter dict={dict} />
      <BottomBar dict={dict} lang={locale} />
    </div>
  );
}
