import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { JinjuMapSection } from "@/components/JinjuMapSection";
import { NewsPreview } from "@/components/NewsPreview";

export default function Home() {
  return (
    <main className="pb-28 md:pb-0">
      <HeroSection />
      <NewsPreview />
      <JinjuMapSection />
      <Footer />
    </main>
  );
}
