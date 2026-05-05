import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { ProfileInfoSection } from "@/components/ProfileInfoSection";

export default function ProfilePage() {
  return (
    <main className="pb-28 md:pb-0">
      <PageHero
        eyebrow="Profile"
        title="강민국 의원 프로필"
        description="기본정보, 학력, 주요 약력, 의원실 정보를 한 페이지에서 확인할 수 있습니다."
      />
      <ProfileInfoSection />
      <Footer />
    </main>
  );
}
