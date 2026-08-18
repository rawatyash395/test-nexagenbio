import Navigation from "@/components/ui/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import TechnologySection from "@/components/sections/TechnologySection";
import ProcessSection from "@/components/sections/ProcessSection";
import CapabilitiesSection from "@/components/sections/CapabilitiesSection";
import StatisticsSection from "@/components/sections/StatisticsSection";
import PublicationsSection from "@/components/sections/PublicationsSection";
import LnpCapsuleSection from "@/components/sections/LnpCapsuleSection";
import CtaSection from "@/components/sections/CtaSection";
import Footer from "@/components/sections/Footer";
import PageIntro from "@/components/ui/PageIntro";

export default function Home() {
  return (
    <>
      <PageIntro />

      {/* Primary Navigation & Section Pagination */}
      <Navigation />

      <main id="main-content" className="relative z-10">
        <HeroSection />
        <AboutSection />
        <TechnologySection />
        <ProcessSection />
        <CapabilitiesSection />
        <StatisticsSection />
        <LnpCapsuleSection />
        <PublicationsSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
