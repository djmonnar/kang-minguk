import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";
import { imagePaths } from "@/lib/images";

const profileFacts = [
  { label: "이름", value: "강민국 / 姜旻局 / KANG MINKUK" },
  { label: "소속", value: "국민의힘" },
  { label: "선거구", value: "경남 진주시을" },
  { label: "의정", value: "제21대·제22대 국회의원" },
  { label: "상임위", value: "국회 정무위원회 중심 의정활동" }
];

const educationItems = ["경남대학교 대학원 법학과 졸업, 법학박사"];

const careerItems = [
  "제21대 국회의원",
  "제22대 국회의원",
  "국회 정무위원회 간사 이력",
  "국민의힘 원내대변인·수석대변인 이력",
  "제10대·제11대 경상남도의회 의원",
  "경상남도의회 건설소방위원회 위원장 이력",
  "전 경상남도 정무보좌역"
];

const contactItems = [
  { label: "의원실", value: "의원회관 1007호" },
  { label: "전화", value: "02-784-0797" },
  { label: "이메일", value: "strongwind01@naver.com" }
];

const donationItems = [
  { label: "후원회명", value: "국회의원강민국후원회" },
  { label: "후원문의", value: "055-763-5999" },
  { label: "온라인 후원", value: "정치후원금센터 give.go.kr" },
  { label: "후원계좌", value: "농협 351-1126-2700-93" },
  { label: "예금주", value: "국회의원강민국후원회" }
];

const donationLimits = [
  "국회의원후원회 1인 연간 최대 500만원",
  "전체 후원회 합산 1인 연간 최대 2,000만원",
  "10만원 이하는 전액 세액공제",
  "10만원 초과분은 15%, 3,000만원 초과분은 25% 세액공제"
];

const donationNotices = [
  "개인만 후원 가능합니다.",
  "법인·단체 후원은 불가합니다.",
  "법인카드 결제는 불가합니다.",
  "타인 명의 후원은 불가합니다.",
  "세액공제는 본인 지출분만 가능합니다."
];

export function ProfileInfoSection() {
  return (
    <section id="profile-info" className="bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)] px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Official Profile"
          title="강민국 의원 프로필"
          description="경력, 학력, 의원실 정보와 후원회 안내를 정리했습니다."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="grid gap-5">
            <div className="civic-card overflow-hidden shadow-civic">
              <div className="relative mx-auto aspect-[4/5] max-w-[360px] bg-navy-50 lg:max-w-none">
                <Image
                  src={imagePaths.profileOfficial}
                  alt="국회의원 강민국 공식 프로필 사진"
                  fill
                  sizes="(min-width: 1024px) 34vw, 86vw"
                  className="object-cover object-top"
                />
              </div>
              <div className="border-t border-slate-100 p-6 sm:p-8">
                <p className="text-sm font-black uppercase tracking-[0.28em] text-civic-red">Official Profile</p>
                <h3 className="mt-3 text-3xl font-black text-navy-900">국회의원 강민국</h3>
                <p className="mt-3 text-sm font-bold leading-6 text-slate-600">
                  진주의 현장 목소리를 국회 의정활동과 정책 과제로 연결합니다.
                </p>
              </div>
            </div>

            <div className="civic-card p-6 sm:p-8">
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
            <div className="civic-card p-6 sm:p-8">
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
            </div>

            <div className="civic-card p-6 sm:p-8">
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

            <div className="civic-card overflow-hidden shadow-civic">
              <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="relative min-h-[520px] bg-navy-50 sm:min-h-[680px] lg:min-h-[760px]">
                  <Image
                    src={imagePaths.donationGuide}
                    alt="강민국 의원 후원회 안내 포스터"
                    fill
                    sizes="(min-width: 1024px) 36vw, 92vw"
                    className="object-contain"
                  />
                </div>
                <div className="bg-navy-900 p-6 text-white sm:p-8">
                  <p className="text-sm font-black uppercase tracking-[0.28em] text-red-100">Support Committee</p>
                  <h4 className="mt-3 text-2xl font-black">강민국 의원 후원회 안내</h4>
                  <p className="mt-3 text-sm font-bold leading-6 text-white/76">
                    깨끗한 정치와 투명한 후원을 위한 후원회 정보를 확인하실 수 있습니다.
                  </p>

                  <div className="mt-6 grid gap-3">
                    {donationItems.map((item) => (
                      <div key={item.label} className="rounded-2xl border border-white/10 bg-white/10 p-4">
                        <p className="text-xs font-black uppercase tracking-[0.18em] text-red-100">{item.label}</p>
                        <p className="mt-2 text-base font-black text-white">{item.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-2xl border border-white/10 bg-white/10 p-5">
                    <h5 className="text-base font-black text-white">후원 가능 금액 및 세액공제</h5>
                    <ul className="mt-4 space-y-2 text-sm font-bold leading-6 text-white/78">
                      {donationLimits.map((item) => (
                        <li key={item}>· {item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 rounded-2xl border border-white/10 bg-white/10 p-5">
                    <h5 className="text-base font-black text-white">확인사항</h5>
                    <ul className="mt-4 space-y-2 text-sm font-bold leading-6 text-white/78">
                      {donationNotices.map((item) => (
                        <li key={item}>· {item}</li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href="https://www.give.go.kr"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-civic-red px-6 text-sm font-black text-white shadow-civic transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-navy-900"
                  >
                    정치후원금센터 바로가기
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
