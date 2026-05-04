import { SectionHeader } from "@/components/SectionHeader";

const steps = [
  "민원·정책 제안 접수",
  "분야별 담당 분류",
  "관계기관 검토",
  "처리 현황 안내"
];

export function CitizenParticipation() {
  return (
    <section id="participation" className="bg-[linear-gradient(135deg,#001b44,#004ea2_58%,#e61e2b)] px-5 py-20 text-white sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <SectionHeader
          eyebrow="Citizen Participation"
          title="민원·제안하기"
          description="주민의 의견을 공식적으로 접수하고, 처리 현황을 투명하게 안내하는 참여 창구를 준비합니다."
          tone="dark"
        />

        <div className="grid gap-4 sm:grid-cols-2">
          {steps.map((step, index) => (
            <div key={step} className="rounded-lg border border-white/14 bg-white/8 p-5">
              <span className="text-sm font-bold text-white/60">0{index + 1}</span>
              <h3 className="mt-3 text-lg font-bold">{step}</h3>
              <p className="mt-3 text-sm leading-6 text-white/70">
                MVP 단계에서는 안내 카드로 제공하고, 추후 접수 폼과 관리자 처리 상태를 연결합니다.
              </p>
            </div>
          ))}
        </div>

        <div className="lg:col-span-2">
          <a
            href="#participation"
            className="inline-flex min-h-12 w-full items-center justify-center rounded-md bg-white px-5 text-sm font-bold text-navy-900 transition hover:bg-navy-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-navy-900 sm:w-auto"
            aria-label="민원 또는 정책 제안 접수 기능 준비 영역 보기"
          >
            민원·정책 제안 준비하기
          </a>
        </div>
      </div>
    </section>
  );
}
