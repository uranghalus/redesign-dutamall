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
   floor map" and Facilities' "View on floor map" links land here. */
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

  return (
    <div id="top" className="flex min-h-full flex-col bg-ink">
      <SiteHeader dict={dict} lang={locale} />
      {/* fixed header clearance: topbar + nav (~100px mobile / 112px desktop) */}
      <main id="main" className="flex-1 bg-ink pt-[100px] pb-[60px] md:pb-0 xl:pt-[112px]">
        <DirectoryMap dict={dict} locale={locale} />
      </main>
      <SiteFooter dict={dict} />
      <BottomBar dict={dict} lang={locale} />
    </div>
  );
}
