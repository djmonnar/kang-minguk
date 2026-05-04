import { districts } from "@/lib/data";
import { SectionHeader } from "@/components/SectionHeader";

const districtGroups = [
  {
    title: "도심 생활권",
    items: ["중앙동", "상봉동", "상대동", "하대동", "상평동", "초장동"]
  },
  {
    title: "동부·북부 생활권",
    items: ["금산면", "집현면", "미천면", "대곡면"]
  },
  {
    title: "동부 5개면",
    items: ["진성면", "일반성면", "이반성면", "사봉면", "지수면"]
  }
];

const committeeItems = [
  "국무조정실·국무총리비서실",
  "금융위원회·금융감독원",
  "공정거래위원회",
  "국민권익위원회",
  "개인정보보호위원회",
  "국가보훈부"
];

export function ConstituencySection() {
  return (
    <section id="constituency" className="bg-white px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Jinju-eul Constituency"
          title="진주시을 지역구 안내"
          description="진주시을 생활권과 국회 정무위원회 주요 소관 분야를 함께 정리했습니다."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-navy-50 p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.28em] text-civic-red">Constituency</p>
                <h3 className="mt-3 text-3xl font-black text-navy-900">진주시을</h3>
              </div>
              <p className="text-sm font-bold text-slate-600">총 {districts.length}개 읍·면·동</p>
            </div>

            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {districtGroups.map((group) => (
                <article key={group.title} className="rounded-2xl border border-slate-200 bg-white p-5">
                  <h4 className="text-base font-black text-navy-900">{group.title}</h4>
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

            <p className="mt-6 text-xs leading-6 text-slate-500">
              진주시을 읍면동을 생활권 단위로 묶어 현장 방문, 민원, 정책 과제를 빠르게 확인할 수 있도록 정리했습니다.
            </p>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-navy-900 p-6 text-white shadow-civic sm:p-8">
            <p className="text-sm font-black uppercase tracking-[0.28em] text-red-100">Standing Committee</p>
            <h3 className="mt-3 text-3xl font-black">정무위원회 소관</h3>
            <p className="mt-4 text-sm leading-7 text-white/72">
              금융, 공정거래, 반부패, 보훈, 개인정보 등 시민 생활과 경제 전반에 닿아 있는 정부 기관을 다루는 상임위원회입니다.
            </p>
            <div className="mt-6 grid gap-2">
              {committeeItems.map((item) => (
                <div key={item} className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-bold text-white/88">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
