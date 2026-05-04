import Image from "next/image";
import { imagePaths } from "@/lib/images";

const navItems = [
  { label: "강민국", href: "#profile" },
  { label: "진주 소통지도", href: "#jinju-map" },
  { label: "정책현황", href: "#policies" },
  { label: "의정활동", href: "#activities" },
  { label: "민원제안", href: "#participation" }
];

const quickCards = [
  { eyebrow: "현장에서 듣겠습니다", title: "진주 소통지도", href: "#jinju-map" },
  { eyebrow: "국회에서 답하겠습니다", title: "의정활동", href: "#activities" },
  { eyebrow: "시민과 함께하겠습니다", title: "민원·제안", href: "#participation" }
];

const socialItems = ["YouTube", "Blog", "SNS"];

export function HeroSection() {
  return (
    <section id="top" className="relative overflow-hidden bg-white text-navy-900">
      <header className="relative z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-2 text-xs font-semibold text-slate-500 sm:px-8 lg:px-10">
          <span>국회의원 강민국 공식 의정활동 홈페이지</span>
          <div className="hidden items-center gap-4 sm:flex">
            <a href="#activities" className="transition hover:text-civic-blue">의정소식</a>
            <a href="#participation" className="transition hover:text-civic-blue">응답소</a>
            <a href="#jinju-map" className="transition hover:text-civic-blue">소통지도</a>
          </div>
        </div>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
          <a href="#top" className="group flex items-center gap-3" aria-label="국회의원 강민국 홈페이지 처음으로">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-civic-blue text-base font-black text-white shadow-civic">
              강
            </span>
            <span>
              <span className="block text-lg font-black tracking-tight text-navy-900">국회의원 강민국</span>
              <span className="block text-xs font-bold tracking-[0.18em] text-civic-red">JINJU COMMUNICATION</span>
            </span>
          </a>

          <nav className="hidden items-center gap-9 text-base font-extrabold text-slate-800 lg:flex">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="relative transition hover:text-civic-red">
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href="#participation"
            className="hidden rounded-full border border-navy-900 px-5 py-2 text-sm font-black transition hover:bg-navy-900 hover:text-white md:inline-flex"
          >
            시민 제안하기
          </a>
        </div>
      </header>

      <div className="relative min-h-[760px] overflow-hidden bg-navy-900 text-white lg:min-h-[820px]">
        <Image
          src={imagePaths.jinju}
          alt="진주를 상징하는 배경 이미지"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_20%,rgba(0,78,162,0.68),transparent_32%),linear-gradient(100deg,rgba(0,11,29,0.96)_0%,rgba(0,27,68,0.84)_48%,rgba(0,0,0,0.55)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/45 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-white to-transparent" />

        <div className="relative z-10 mx-auto grid min-h-[760px] max-w-7xl grid-cols-1 items-center gap-8 px-5 pb-32 pt-12 sm:px-8 lg:min-h-[820px] lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:pb-36 lg:pt-16">
          <div id="profile" className="relative order-2 mx-auto w-full max-w-[520px] self-end lg:order-1 lg:mx-0">
            <div className="absolute -left-10 bottom-8 h-64 w-64 rounded-full bg-civic-red/35 blur-3xl" />
            <div className="absolute -right-8 top-12 h-52 w-52 rounded-full bg-civic-blue/40 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/15 bg-white/10 shadow-[0_38px_90px_rgba(0,0,0,0.38)] backdrop-blur-sm">
              <div className="relative aspect-[4/5]">
                <Image
                  src={imagePaths.hero}
                  alt="국회의원 강민국 프로필 사진"
                  fill
                  priority
                  sizes="(min-width: 1024px) 38vw, 90vw"
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <p className="text-sm font-bold text-red-100">진주와 국회를 잇는 사람</p>
                <p className="mt-2 text-3xl font-black tracking-tight">강민국</p>
              </div>
            </div>
          </div>

          <div className="order-1 max-w-3xl lg:order-2">
            <div className="mb-9 flex items-center gap-3">
              {socialItems.map((item) => (
                <span key={item} className="grid h-12 w-12 place-items-center rounded-full bg-white/16 text-[11px] font-black text-white ring-1 ring-white/20 backdrop-blur">
                  {item}
                </span>
              ))}
            </div>

            <p className="mb-5 text-sm font-black uppercase tracking-[0.38em] text-red-100 sm:text-base">
              Jinju with Kang Minguk
            </p>
            <h1 className="text-4xl font-black leading-[1.08] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
              진주의 오늘을 듣고,
              <span className="mt-3 block">대한민국의 내일을</span>
              <span className="mt-3 block text-red-100">만듭니다.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-xl font-bold leading-9 text-white/88 sm:text-2xl">
              국회의원 강민국입니다.
            </p>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
              진주의 현장, 민원, 정책, 예산 활동을 시민이 한눈에 볼 수 있도록 소통 중심의 의정활동 홈페이지로 구성했습니다.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#jinju-map" className="inline-flex min-h-12 items-center rounded-full bg-civic-red px-7 text-sm font-black text-white shadow-2xl transition hover:bg-red-700">
                진주 소통지도 보기
              </a>
              <a href="#activities" className="inline-flex min-h-12 items-center rounded-full border border-white/35 bg-white/10 px-7 text-sm font-black text-white backdrop-blur transition hover:bg-white/18">
                의정활동 보기 →
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 z-20 w-[calc(100%-40px)] max-w-7xl -translate-x-1/2 px-0 sm:w-[calc(100%-64px)] lg:w-[calc(100%-80px)]">
          <div className="grid overflow-hidden rounded-[2rem] border border-white/18 bg-white/88 shadow-[0_24px_80px_rgba(0,27,68,0.18)] backdrop-blur-xl md:grid-cols-3">
            {quickCards.map((card, index) => (
              <a
                key={card.title}
                href={card.href}
                className={`group p-6 transition hover:bg-white ${index !== 0 ? "border-t border-slate-200 md:border-l md:border-t-0" : ""}`}
              >
                <p className="text-sm font-bold text-civic-red">{card.eyebrow}</p>
                <div className="mt-3 flex items-end justify-between gap-4">
                  <p className="text-2xl font-black text-navy-900">{card.title}</p>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-navy-900 text-white transition group-hover:bg-civic-red">→</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
