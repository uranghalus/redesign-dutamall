import SiteHeader from "@/components/layout/SiteHeader";
import BottomBar from "@/components/layout/BottomBar";
import SiteFooter from "@/components/layout/SiteFooter";
import Hero from "@/components/home/Hero";
import Tenants from "@/components/home/Tenants";
import DirectoryMap from "@/components/home/DirectoryMap";
import Cinema from "@/components/home/Cinema";
import FugoSpotlight from "@/components/home/FugoSpotlight";
import WhatsOn from "@/components/home/WhatsOn";
import Facilities from "@/components/home/Facilities";
import LocationSection from "@/components/home/LocationSection";
import { getDictionary, hasLocale } from "@/app/i18n/dictionaries";
import { notFound } from "next/navigation";
import type { Locale } from "@/app/i18n/config";

/* The Monolith order (mock Versi1.png): hero → §01 directory → §02 cinema
   → §03 FUGO → §04 what's on → §05 facilities → §06 concierge → footer.
   The dictionary is loaded once here and threaded through the sections. */
export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return (
    <div id="top" className="flex min-h-full flex-col">
      <SiteHeader dict={dict} lang={locale} />
      <main id="main" className="flex-1 pb-[60px] md:pb-0">
        <Hero dict={dict} />
        <Tenants dict={dict} />
      <DirectoryMap dict={dict} locale={locale} />
        <Cinema dict={dict} locale={locale} />
        <FugoSpotlight dict={dict} />
        <WhatsOn dict={dict} />
        <Facilities dict={dict} />
        <LocationSection dict={dict} />
      </main>
      <SiteFooter dict={dict} />
      <BottomBar dict={dict} />
    </div>
  );
}
