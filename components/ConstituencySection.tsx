import Image from "next/image";
import Link from "next/link";
import { districts } from "@/lib/data";
import { imagePaths } from "@/lib/images";
import { SectionHeader } from "@/components/SectionHeader";

const districtGroups = [
  {
    title: "도심 생활권",
    description: "상권, 공동주택, 생활민원, 통학·보행 현안이 밀집된 중심 권역입니다.",
    items: ["중앙동", "상봉동", "상대동", "하대동", "상평동", "초장동"]
  },
  {
    title: "동부·북부 생활권",
    description: "정주 여건, 교통 접근성, 농촌 생활기반 개선 과제를 함께 봅니다.",
    items: ["금산면", "집현면", "미천면", "대곡면"]
  },
  {
    title: "동부 5개면",
    description: "면 단위 현장 방문과 주민 소통 일정을 촘촘하게 연결합니다.",
    items: ["진성면", "일반성면", "이반성면", "사봉면", "지수면"]
  }
];

const priorities = [
  "현장 방문과 민원 접수 이력 관리",
  "생활권별 교통·안전·정주 과제 정리",
  "지도 기반 활동 기록과 처리 현황 연결"
];

export function ConstituencySection() {
  return (
    <section id="constituency" className="bg-white px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Jinju-eul Constituency"
          title="진주시을 지역구 안내"
          description="진주시을 읍면동을 생활권별로 나누어 현장 소통과 지역 현안을 보기 쉽게 정리했습니다."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="civic-card bg-navy-50 p-6 sm:p-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.28em] text-civic-red">Constituency</p>
                <h3 className="mt-3 text-3xl font-black text-navy-900">진주시을</h3>
              </div>
              <p className="text-sm font-bold text-slate-600">총 {districts.length}개 읍·면·동</p>
            </div>

            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {districtGroups.map((group) => (
                <article key={group.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(0,27,68,0.06)]">
                  <h4 className="text-base font-black text-navy-900">{group.title}</h4>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{group.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span key={item} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="civic-card overflow-hidden shadow-civic">
            <div className="relative min-h-[230px] bg-navy-900">
              <Image
                src={imagePaths.jinjuWide}
                alt="진주성과 남강이 보이는 진주 전경"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover opacity-82"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/82 via-navy-900/10 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="relative h-14 w-36 overflow-hidden rounded-md bg-white/94 p-2">
                  <Image src={imagePaths.jinjuLogo} alt="참진주 로고" fill sizes="144px" className="object-contain" />
                </div>
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <p className="text-sm font-black uppercase tracking-[0.24em] text-civic-red">Local Brief</p>
              <h3 className="mt-3 text-2xl font-black text-navy-900">지역 현안 소통 기준</h3>
              <div className="mt-5 grid gap-3">
                {priorities.map((item) => (
                  <div key={item} className="rounded-2xl bg-navy-50 px-4 py-3 text-sm font-bold leading-6 text-navy-900">
                    {item}
                  </div>
                ))}
              </div>
              <Link
                href="/#jinju-map"
                className="civic-navy-button mt-6"
              >
                소통지도에서 보기 →
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
