import { SectionHeader } from "@/components/SectionHeader";

const profileFacts = [
  { label: "이름", value: "강민국 / 姜旻局 / KANG MINKUK" },
  { label: "소속", value: "국민의힘" },
  { label: "선거구", value: "경남 진주시을" },
  { label: "의정", value: "제21대·제22대 국회의원" },
  { label: "상임위", value: "국회 정무위원회 중심 의정활동" }
];

const educationItems = [
  "경남대학교 대학원 법학과 졸업, 법학박사"
];

const careerItems = [
  "제21대 국회의원",
  "제22대 국회의원",
  "국회 정무위원회 간사 이력",
  "국민의힘 원내대변인·원내부대표 이력",
  "제10대·제11대 경상남도의회의원",
  "경상남도의회 건설소방위원회 위원장 이력",
  "전 경상남도 정무보좌역"
];

const activityThemes = [
  {
    title: "금융·소비자 보호",
    description: "금융위원회·금융감독원 현안을 중심으로 금융질서와 소비자 권익을 점검합니다."
  },
  {
    title: "공정거래·플랫폼 공정",
    description: "공정거래와 디지털 플랫폼 이용자 보호, 개인정보 관련 제도 개선 과제를 다룹니다."
  },
  {
    title: "국정감사·민생 점검",
    description: "상임위 질의와 국정감사를 통해 정부 정책과 민생 현안을 점검합니다."
  },
  {
    title: "진주 지역 현안",
    description: "교육, 교통, 상권, 생활안전, 산업 기반 등 진주시을 현장 과제를 관리합니다."
  }
];

const contactItems = [
  { label: "의원실", value: "의원회관 1007호" },
  { label: "전화", value: "02-784-0797" },
  { label: "이메일", value: "strongwind01@naver.com" }
];

export function ProfileInfoSection() {
  return (
    <section id="profile-info" className="bg-slate-50 px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Profile Archive"
          title="강민국 의원 프로필"
          description="공개 프로필 기준의 약력, 학력, 주요 의정활동 주제를 홈페이지용으로 정리했습니다."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-sm font-black uppercase tracking-[0.28em] text-civic-red">Basic Information</p>
            <h3 className="mt-3 text-3xl font-black text-navy-900">강민국</h3>
            <div className="mt-7 grid gap-3">
              {profileFacts.map((item) => (
                <div key={item.label} className="grid gap-2 rounded-2xl bg-navy-50 p-4 sm:grid-cols-[90px_1fr]">
                  <span className="text-sm font-black text-civic-blue">{item.label}</span>
                  <span className="text-sm font-bold leading-6 text-navy-900">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-7 rounded-2xl border border-slate-200 p-5">
              <h4 className="text-base font-black text-navy-900">의원실 정보</h4>
              <div className="mt-4 grid gap-2">
                {contactItems.map((item) => (
                  <div key={item.label} className="flex justify-between gap-4 text-sm">
                    <span className="font-bold text-slate-500">{item.label}</span>
                    <span className="font-bold text-slate-800">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-5">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <p className="text-sm font-black uppercase tracking-[0.28em] text-civic-red">Education & Career</p>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <article>
                  <h4 className="text-xl font-black text-navy-900">학력</h4>
                  <ul className="mt-4 space-y-3">
                    {educationItems.map((item) => (
                      <li key={item} className="rounded-xl bg-slate-50 px-4 py-3 text-sm font-bold leading-6 text-slate-700">
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
                <article>
                  <h4 className="text-xl font-black text-navy-900">주요 약력</h4>
                  <ul className="mt-4 space-y-3">
                    {careerItems.map((item) => (
                      <li key={item} className="rounded-xl bg-slate-50 px-4 py-3 text-sm font-bold leading-6 text-slate-700">
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-navy-900 p-6 text-white shadow-civic sm:p-8">
              <p className="text-sm font-black uppercase tracking-[0.28em] text-red-100">Activity Themes</p>
              <h4 className="mt-3 text-2xl font-black">의정활동 핵심 주제</h4>
              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {activityThemes.map((theme) => (
                  <article key={theme.title} className="rounded-2xl border border-white/10 bg-white/10 p-5">
                    <h5 className="text-base font-black text-white">{theme.title}</h5>
                    <p className="mt-3 text-sm leading-6 text-white/72">{theme.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
