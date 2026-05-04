import { Footer } from "@/components/Footer";
import { LatestActivities } from "@/components/LatestActivities";
import { PageHero } from "@/components/PageHero";
import { imagePaths } from "@/lib/images";

export default function ActivitiesPage() {
  return (
    <main className="pb-28 md:pb-0">
      <PageHero
        eyebrow="Assembly Activities"
        title="의정활동"
        description="진주 현장과 국회 활동을 날짜, 지역, 처리 상태 중심으로 확인할 수 있습니다."
        imageSrc={imagePaths.field}
        imageAlt="현장 의정활동 이미지"
      />
      <LatestActivities />
      <Footer />
    </main>
  );
}
