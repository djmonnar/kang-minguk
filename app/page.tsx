import { CitizenParticipation } from "@/components/CitizenParticipation";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { JinjuMapSection } from "@/components/JinjuMapSection";
import { LatestActivities } from "@/components/LatestActivities";
import { MediaGallery } from "@/components/MediaGallery";
import { MobileFloatingBar } from "@/components/MobileFloatingBar";
import { QuickLinks } from "@/components/QuickLinks";
import { TabbedInfoSection } from "@/components/TabbedInfoSection";

export default function Home() {
  return (
    <main className="pb-28 md:pb-0">
      <HeroSection />
      <QuickLinks />
      <TabbedInfoSection />
      <JinjuMapSection />
      <LatestActivities />
      <MediaGallery />
      <CitizenParticipation />
      <Footer />
      <MobileFloatingBar />
    </main>
  );
}
