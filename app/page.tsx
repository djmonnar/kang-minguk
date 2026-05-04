import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { JinjuMapSection } from "@/components/JinjuMapSection";

export default function Home() {
  return (
    <main className="pb-28 md:pb-0">
      <HeroSection />
      <JinjuMapSection />
      <Footer />
    </main>
  );
}
