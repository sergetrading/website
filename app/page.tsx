import { AnomalousMatterHero } from "@/components/ui/anomalous-matter-hero";
import { AboutSection } from "@/components/ui/about-section";
import { CredoSection } from "@/components/ui/credo-section";
import { ServicesSection } from "@/components/ui/services-section";
import { ContactSection } from "@/components/ui/contact-section";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import { ThreadedSections } from "@/components/ui/brass-thread";

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
        {/* The brass thread runs the literal length of the content, stitching
            the three sections into one continuous draw as you scroll. */}
        <ThreadedSections>
          <AboutSection />
          <CredoSection />
          <ServicesSection />
          <ContactSection />
        </ThreadedSections>
      </main>
      <SiteFooter />
    </>
  );
}
