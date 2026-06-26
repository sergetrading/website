import { AnomalousMatterHero } from "@/components/ui/anomalous-matter-hero";
import { AboutSection } from "@/components/ui/about-section";
import { CredoSection } from "@/components/ui/credo-section";
import { ServicesSection } from "@/components/ui/services-section";
import { MethodSection } from "@/components/ui/method-section";
import { ContactSection } from "@/components/ui/contact-section";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import { ThreadNav } from "@/components/ui/brass-thread";

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <SiteHeader />
        {/* The brass thread, now the site's spine and wayfinding — fades in
            once the hero is behind you. */}
        <ThreadNav />
        <AnomalousMatterHero
          title="Strategy · Advisory · Transformation"
          subtitle="Turning complexity into clear, decisive action."
          description="Crestmont Consulting partners with ambitious organisations to sharpen strategy, unlock growth, and deliver change that lasts."
        />
        <AboutSection />
        <CredoSection />
        <ServicesSection />
        <MethodSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
