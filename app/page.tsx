import { AnomalousMatterHero } from "@/components/ui/anomalous-matter-hero";
import { AboutSection } from "@/components/ui/about-section";
import { ServicesSection } from "@/components/ui/services-section";
import { ContactSection } from "@/components/ui/contact-section";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <SiteHeader />
        <AnomalousMatterHero
          title="Strategy · Advisory · Transformation"
          subtitle="Turning complexity into clear, decisive action."
          description="Crestmont Consulting partners with ambitious organisations to sharpen strategy, unlock growth, and deliver change that lasts."
        />
        <AboutSection />
        <ServicesSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
