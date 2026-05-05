import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { PolicyCards } from "@/components/PolicyCards";

export default function PoliciesPage() {
  return (
    <main className="pb-28 md:pb-0">
      <PageHero
        eyebrow="Policy Agenda"
        title="정책현황"
        description="금융, 소비자 보호, 우주항공, 교통 인프라, 생활민원까지 핵심 정책 과제를 정리합니다."
      />
      <PolicyCards />
      <Footer />
    </main>
  );
}
