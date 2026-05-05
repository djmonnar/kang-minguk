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
        className="hidden object-cover object-center md:block"
      />
      <Image
        src={imagePaths.heroTitleMobile}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-top md:hidden"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,15,38,0.08)_0%,rgba(0,15,38,0.04)_42%,rgba(0,27,68,0.72)_100%)] md:bg-[linear-gradient(90deg,rgba(0,11,29,0.08)_0%,rgba(0,11,29,0.02)_46%,rgba(0,11,29,0.26)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-navy-900 via-navy-900/58 to-transparent md:h-72 md:from-white md:via-white/46" />

      <div className="relative z-10 mx-auto flex min-h-[760px] max-w-7xl items-end px-5 pb-36 pt-12 sm:px-8 md:min-h-[680px] lg:min-h-[800px] lg:px-10 lg:pb-36">
        <div className="sr-only">
          <h1>진주의 현장에서 듣고 국회에서 답하다. 국회의원 강민국입니다.</h1>
          <p>경남 진주시을 공식 의정활동 홈페이지</p>
        </div>
      </div>

      <div className="absolute inset-x-5 bottom-5 z-20 md:hidden">
        <div className="rounded-[1.75rem] border border-white/20 bg-white/95 p-5 text-navy-900 shadow-[0_18px_60px_rgba(0,27,68,0.34)] backdrop-blur-xl">
          <p className="civic-eyebrow">Official Homepage</p>
          <h2 className="mt-2 text-xl font-black leading-tight">진주와 국회를 잇는 의정활동</h2>
          <p className="mt-2 text-xs font-bold leading-5 text-slate-600">
            프로필과 주요 의정활동을 확인하고, 민원·제안으로 의견을 남길 수 있습니다.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Link href="/profile" className="civic-red-button min-h-11 px-4 text-xs">
              프로필 보기
            </Link>
            <Link href="/activities" className="civic-navy-button min-h-11 px-4 text-xs">
              의정활동 보기
            </Link>
          </div>
        </div>
      </div>

      <div className="relative z-20 mx-auto hidden w-[calc(100%-64px)] max-w-7xl pb-8 md:block lg:absolute lg:bottom-8 lg:left-1/2 lg:w-[calc(100%-80px)] lg:-translate-x-1/2 lg:pb-0">
        <div className="grid overflow-hidden rounded-[2rem] border border-white/40 bg-white/95 shadow-[0_24px_80px_rgba(0,27,68,0.18)] backdrop-blur-xl md:grid-cols-3">
          {quickCards.map((card, index) => (
            <Link
              key={card.title}
              href={card.href}
              className={`group bg-white/88 p-6 transition duration-300 hover:bg-navy-50 ${index !== 0 ? "border-l border-slate-200" : ""}`}
            >
              <p className="text-sm font-black text-civic-red">{card.eyebrow}</p>
              <div className="mt-4 flex items-end justify-between gap-4">
                <p className="text-2xl font-black text-navy-900">{card.title}</p>
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-navy-900 text-white shadow-[0_12px_30px_rgba(0,27,68,0.18)] transition duration-300 group-hover:-translate-y-0.5 group-hover:bg-civic-red">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
