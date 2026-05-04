import { CitizenParticipation } from "@/components/CitizenParticipation";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { JinjuMapSection } from "@/components/JinjuMapSection";
import { LatestActivities } from "@/components/LatestActivities";
import { MediaGallery } from "@/components/MediaGallery";
import { PolicyCards } from "@/components/PolicyCards";
import { QuickLinks } from "@/components/QuickLinks";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <QuickLinks />
      <JinjuMapSection />
      <PolicyCards />
      <LatestActivities />
      <MediaGallery />
      <CitizenParticipation />
      <Footer />
    </main>
  );
}
