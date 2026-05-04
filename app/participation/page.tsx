import { CitizenParticipation } from "@/components/CitizenParticipation";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { imagePaths } from "@/lib/images";

export default function ParticipationPage() {
  return (
    <main className="pb-28 md:pb-0">
      <PageHero
        eyebrow="Citizen Participation"
        title="민원·제안하기"
        description="주민 의견을 공식적으로 접수하고 처리 현황 안내로 이어지는 참여 창구입니다."
        imageSrc={imagePaths.civil}
        imageAlt="민원 소통 이미지"
      />
      <CitizenParticipation />
      <Footer />
    </main>
  );
}
