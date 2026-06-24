import { AnomalousMatterHero } from "@/components/ui/anomalous-matter-hero";

export default function Home() {
  return (
    <main className="flex-1">
      <AnomalousMatterHero
        title="Strategy · Advisory · Transformation"
        subtitle="Turning complexity into clear, decisive action."
        description="Crestmont Consulting partners with ambitious organisations to sharpen strategy, unlock growth, and deliver change that lasts."
      />
    </main>
  );
}
