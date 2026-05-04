import { ConstituencySection } from "@/components/ConstituencySection";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { imagePaths } from "@/lib/images";

export default function ConstituencyPage() {
  return (
    <main className="pb-28 md:pb-0">
      <PageHero
        eyebrow="Jinju-eul"
        title="진주시을 지역구"
        description="진성면부터 초장동까지 진주시을 읍면동과 생활권 정보를 보기 쉽게 정리했습니다."
        imageSrc={imagePaths.jinjuWide}
        imageAlt="진주성과 남강이 보이는 진주 전경"
      />
      <ConstituencySection />
      <Footer />
    </main>
  );
}
