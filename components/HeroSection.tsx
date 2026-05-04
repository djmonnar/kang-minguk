import Image from "next/image";
import { imagePaths } from "@/lib/images";

const navItems = ["소통지도", "정책현황", "의정활동", "민원제안"];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-navy-900 text-white">
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(8,31,61,0.96),rgba(24,59,107,0.88)_48%,rgba(238,242,247,0.12))]" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white to-transparent" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-5 py-5 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between gap-4">
          <a
            href="#top"
            className="rounded-md text-lg font-bold focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-navy-900"
            aria-label="국회의원 강민국 홈페이지 처음으로"
          >
            강민국
          </a>
          <nav className="hidden items-center gap-7 text-sm font-semibold text-white/78 md:flex">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item === "소통지도" ? "jinju-map" : item === "정책현황" ? "policies" : item === "의정활동" ? "activities" : "participation"}`}
                className="rounded-md transition hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-navy-900"
              >
                {item}
              </a>
            ))}
          </nav>
        </header>

        <div
          id="top"
          className="grid flex-1 items-center gap-12 py-16 md:grid-cols-[1.05fr_0.95fr] lg:py-20"
        >
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white/86">
              경남 진주시을 공식 의정활동 홈페이지
            </p>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              진주의 현장에서 듣고,
              <span className="block text-white">국회에서 답하다</span>
            </h1>
            <div className="mt-7 space-y-2">
              <p className="text-2xl font-bold sm:text-3xl">국회의원 강민국</p>
              <p className="max-w-2xl text-base leading-7 text-white/78 sm:text-lg">
                경남 진주시을 · 제21·22대 국회의원 · 국회 정무위원회 간사
              </p>
            </div>

            <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:flex lg:flex-wrap">
              {["프로필 보기", "진주 소통지도", "의정활동", "민원·제안하기"].map((label, index) => (
                <a
                  key={label}
                  href={
                    index === 1
                      ? "#jinju-map"
                      : index === 2
                        ? "#activities"
                        : index === 3
                          ? "#participation"
                          : "#profile"
                  }
                  className={
                    index === 0
                      ? "inline-flex min-h-12 items-center justify-center rounded-md bg-white px-5 py-3 text-sm font-bold text-navy-900 shadow-lg transition hover:bg-navy-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-navy-900"
                      : "inline-flex min-h-12 items-center justify-center rounded-md border border-white/24 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-navy-900"
                  }
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div id="profile" className="mx-auto w-full max-w-md md:max-w-lg">
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-white/18 bg-white/10 shadow-2xl">
              <Image
                src={imagePaths.hero}
                alt="국회의원 강민국 프로필 사진"
                fill
                priority
                sizes="(min-width: 1024px) 42vw, 90vw"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/76 via-navy-900/8 to-transparent" />
              <div className="absolute bottom-8 left-6 right-6 rounded-md border border-white/18 bg-navy-900/72 p-5 backdrop-blur">
                <p className="text-sm font-semibold text-white/70">진주와 국회를 잇는 의정활동</p>
                <p className="mt-2 text-xl font-bold">국회의원 강민국</p>
              </div>
            </div>
            <div className="mt-4 overflow-hidden rounded-lg border border-white/18 bg-white/10 shadow-xl">
              <Image
                src={imagePaths.heroCardNews}
                alt="강민국 의원 카드뉴스형 히어로 이미지"
                width={1200}
                height={420}
                sizes="(min-width: 1024px) 42vw, 90vw"
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
