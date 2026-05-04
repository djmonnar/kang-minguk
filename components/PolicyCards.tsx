import { policies } from "@/lib/data";
import { SectionHeader } from "@/components/SectionHeader";

const iconLabels: Record<string, string> = {
  finance: "금",
  shield: "보",
  asset: "자",
  space: "우",
  rail: "철",
  people: "민"
};

export function PolicyCards() {
  return (
    <section id="policies" className="bg-white px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Policy Agenda"
          title="정책현황"
          description="국회 정무위원회 현안과 진주 지역 과제를 함께 연결해 관리합니다."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {policies.map((policy) => (
            <article
              key={policy.id}
              className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-civic"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-civic-red text-lg font-black text-white">
                {iconLabels[policy.icon] ?? "정"}
              </div>
              <h3 className="mt-5 text-xl font-bold text-navy-900">{policy.title}</h3>
              <p className="mt-2 text-sm font-bold text-civic-blue">{policy.subtitle}</p>
              <p className="mt-4 text-sm leading-6 text-slate-600">{policy.description}</p>
              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="text-xs font-bold text-slate-500">
                  관련 활동 {policy.relatedActivities.length}건
                </span>
                <a
                  href="#activities"
                  className="rounded-md text-sm font-bold text-navy-900 focus:outline-none focus:ring-2 focus:ring-civic-blue focus:ring-offset-2"
                  aria-label={`${policy.title} 관련 활동 보기`}
                >
                  활동 보기
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
