import SiteHeader from "@/components/layout/SiteHeader";
import BottomBar from "@/components/layout/BottomBar";
import SiteFooter from "@/components/layout/SiteFooter";
import Hero from "@/components/home/Hero";
import Enter from "@/components/home/Enter";
import Cinema from "@/components/home/Cinema";
import Facilities from "@/components/home/Facilities";
import Tenants from "@/components/home/Tenants";
import FugoSpotlight from "@/components/home/FugoSpotlight";
import WhatsOn from "@/components/home/WhatsOn";
import LocationSection from "@/components/home/LocationSection";

export default function Home() {
  return (
    <div id="top" className="flex min-h-full flex-col">
      <SiteHeader />
      <main id="main" className="flex-1 pb-[60px] md:pb-0">
        <Hero />
        <Enter />
        <Cinema />
        <Facilities />
        <Tenants />
        <FugoSpotlight />
        <WhatsOn />
        <LocationSection />
      </main>
      <SiteFooter />
      <BottomBar />
    </div>
  );
}
