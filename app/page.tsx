import ScrollProgress from "@/components/layout/ScrollProgress";
import TopBar from "@/components/layout/TopBar";
import SiteHeader from "@/components/layout/SiteHeader";
import BottomBar from "@/components/layout/BottomBar";
import SiteFooter from "@/components/layout/SiteFooter";
import HeroQuickNav from "@/components/home/HeroQuickNav";
import Hero from "@/components/home/Hero";
import Cinema from "@/components/home/Cinema";
import Facilities from "@/components/home/Facilities";
import Tenants from "@/components/home/Tenants";
import FugoSpotlight from "@/components/home/FugoSpotlight";
import WhatsOn from "@/components/home/WhatsOn";
import LocationSection from "@/components/home/LocationSection";

export default function Home() {
  return (
    <div id="top" className="flex min-h-full flex-col">
      <ScrollProgress />
      <TopBar />
      <SiteHeader />
      <main id="main" className="flex-1 pb-[76px] md:pb-0">
        <Hero />
        <Cinema />
        <Facilities />
        <Tenants />
        <FugoSpotlight />
        <WhatsOn />
        <LocationSection />
      </main>
      <SiteFooter />
      <HeroQuickNav />
      <BottomBar />
    </div>
  );
}
