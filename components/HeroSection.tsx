import Image from "next/image";
import Link from "next/link";
import { imagePaths } from "@/lib/images";

const quickCards = [
  { eyebrow: "현장에서 듣겠습니다", title: "진주 소통지도", href: "/#jinju-map" },
  { eyebrow: "국회에서 답하겠습니다", title: "의정활동", href: "/activities" },
  { eyebrow: "시민과 함께하겠습니다", title: "민원·제안", href: "/participation" }
];

export function HeroSection() {
  return (
    <section id="top" className="relative overflow-hidden bg-navy-900 text-white">
      <Image
        src={imagePaths.heroTitleWide}
        alt=""
        fill
        priority
        sizes="100vw"
        className="hidden object-cover md:block"
      />
      <Image
        src={imagePaths.heroTitleMobile}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-contain object-top md:hidden"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/16 to-transparent md:bg-[linear-gradient(90deg,rgba(0,11,29,0.14)_0%,rgba(0,11,29,0.03)_46%,rgba(0,11,29,0.34)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-navy-900 via-navy-900/56 to-transparent md:from-white md:via-white/42" />

      <div className="relative z-10 mx-auto flex min-h-[720px] max-w-7xl items-end px-5 pb-8 pt-12 sm:px-8 md:min-h-[680px] lg:min-h-[800px] lg:px-10 lg:pb-36">
        <div className="max-w-2xl">
          <h1 className="sr-only">
            진주의 현장에서 듣고 국회에서 답하다. 국회의원 강민국입니다.
          </h1>
          <p className="mt-5 hidden max-w-2xl text-base leading-8 text-white/72 md:block lg:text-lg">
            진주의 현장, 민원, 정책, 예산 활동을 시민이 한눈에 볼 수 있도록 소통 중심의 의정활동 홈페이지로 구성했습니다.
          </p>

          <div className="mt-10 hidden flex-wrap gap-3 md:flex">
            <Link href="/#jinju-map" className="inline-flex min-h-12 items-center rounded-full bg-civic-red px-7 text-sm font-black text-white shadow-2xl transition hover:bg-red-700">
              진주 소통지도 보기
            </Link>
            <Link href="/activities" className="inline-flex min-h-12 items-center rounded-full border border-white/35 bg-white/10 px-7 text-sm font-black text-white backdrop-blur transition hover:bg-white/18">
              의정활동 보기 →
            </Link>
          </div>
        </div>
      </div>

      <div className="relative z-20 mx-auto hidden w-[calc(100%-64px)] max-w-7xl pb-8 md:block lg:absolute lg:bottom-8 lg:left-1/2 lg:w-[calc(100%-80px)] lg:-translate-x-1/2 lg:pb-0">
        <div className="grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(0,27,68,0.18)] md:grid-cols-3 lg:border-white/18 lg:bg-white/90 lg:backdrop-blur-xl">
          {quickCards.map((card, index) => (
            <Link
              key={card.title}
              href={card.href}
              className={`group bg-white p-6 transition hover:bg-navy-50 ${index !== 0 ? "border-l border-slate-200" : ""}`}
            >
              <p className="text-sm font-bold text-civic-red">{card.eyebrow}</p>
              <div className="mt-3 flex items-end justify-between gap-4">
                <p className="text-2xl font-black text-navy-900">{card.title}</p>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-navy-900 text-white transition group-hover:bg-civic-red">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
