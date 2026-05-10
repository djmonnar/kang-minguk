import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { JinjuMapSection } from "@/components/JinjuMapSection";
import { NewsPreview } from "@/components/NewsPreview";
import { YoutubeDailyPopup } from "@/components/YoutubeDailyPopup";

export default function Home() {
  return (
    <main className="pb-28 md:pb-0">
      <YoutubeDailyPopup />
      <HeroSection />
      <NewsPreview />
      <JinjuMapSection />
      <Footer />
    </main>
  );
}
