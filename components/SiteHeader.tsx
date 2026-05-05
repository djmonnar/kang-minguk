"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type MouseEvent } from "react";
import { imagePaths } from "@/lib/images";

const navLinks = [
  { label: "홈", href: "/" },
  { label: "소통지도", href: "/#jinju-map" },
  { label: "프로필", href: "/profile" },
  { label: "지역구", href: "/constituency" },
  { label: "정책", href: "/policies" },
  { label: "의정활동", href: "/activities" },
  { label: "자료실", href: "/media" },
  { label: "민원제안", href: "/participation" }
];

const menuGroups = [
  {
    title: "공식 정보",
    items: [
      { label: "프로필", href: "/profile" },
      { label: "진주시을 지역구", href: "/constituency" },
      { label: "정책현황", href: "/policies" }
    ]
  },
  {
    title: "소통 채널",
    items: [
      { label: "진주 소통지도", href: "/#jinju-map" },
      { label: "의정활동", href: "/activities" },
      { label: "보도·사진자료", href: "/media" },
      { label: "민원·제안하기", href: "/participation" },
      { label: "로그인", href: "/login" },
      { label: "내 정보 설정", href: "/account" },
      { label: "회원가입", href: "/signup" }
    ]
  }
];

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("mobile-menu-open");

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.classList.remove("mobile-menu-open");
    };
  }, [isOpen]);

  function isActive(href: string) {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href;
  }

  function closeMenu() {
    setIsOpen(false);
  }

  function handleHeaderNavigation(event: MouseEvent<HTMLAnchorElement>, href: string) {
    const isHomePage = pathname === "/";

    if (isHomePage && href === "/") {
      event.preventDefault();
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
      closeMenu();
      return;
    }

    if (isHomePage && href === "/#jinju-map") {
      event.preventDefault();
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}#jinju-map`);
      document.getElementById("jinju-map")?.scrollIntoView({ behavior: "smooth", block: "start" });
      closeMenu();
      return;
    }

    closeMenu();
  }

  return (
    <header className="sticky top-0 z-[1000] border-b border-slate-200 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-8 sm:py-4 lg:px-10">
        <Link
          href="/"
          onClick={(event) => handleHeaderNavigation(event, "/")}
          className="group flex min-w-0 items-center"
          aria-label="국회의원 강민국 홈페이지 처음으로"
        >
          <span className="relative hidden h-14 w-[260px] overflow-hidden sm:block">
            <Image src={imagePaths.brandLogoWide} alt="강한민국 대한민국 강민국" fill priority sizes="260px" className="object-contain" />
          </span>
          <span className="relative h-12 w-[240px] max-w-[calc(100vw-104px)] overflow-hidden sm:hidden">
            <Image src={imagePaths.brandLogoMobile} alt="강한민국 대한민국 강민국" fill priority sizes="240px" className="object-contain object-left" />
          </span>
        </Link>

        <nav className="hidden items-center gap-4 whitespace-nowrap text-xs font-extrabold text-slate-700 xl:flex 2xl:gap-6 2xl:text-sm" aria-label="주요 메뉴">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={(event) => handleHeaderNavigation(event, item.href)}
              className={
                isActive(item.href)
                  ? "whitespace-nowrap text-civic-red"
                  : "whitespace-nowrap transition hover:text-civic-red focus:outline-none focus:ring-2 focus:ring-civic-blue focus:ring-offset-2"
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <div className="relative h-8 w-20 overflow-hidden rounded-md bg-white opacity-80">
            <Image src={imagePaths.jinjuLogo} alt="참진주 로고" fill sizes="96px" className="object-contain" />
          </div>
          <Link
            href="/login"
            className="whitespace-nowrap rounded-full border border-slate-200 px-4 py-2 text-sm font-black text-navy-900 transition hover:border-civic-red hover:text-civic-red focus:outline-none focus:ring-2 focus:ring-civic-blue focus:ring-offset-2"
          >
            로그인
          </Link>
          <Link
            href="/signup"
            className="whitespace-nowrap rounded-full bg-navy-900 px-4 py-2 text-sm font-black text-white transition hover:bg-civic-red focus:outline-none focus:ring-2 focus:ring-civic-blue focus:ring-offset-2 2xl:px-5"
          >
            회원가입
          </Link>
          <Link
            href="/account"
            className="whitespace-nowrap rounded-full border border-slate-200 px-4 py-2 text-sm font-black text-navy-900 transition hover:border-civic-red hover:text-civic-red focus:outline-none focus:ring-2 focus:ring-civic-blue focus:ring-offset-2 2xl:px-5"
          >
            내 정보
          </Link>
        </div>

        <button
          type="button"
          className="relative z-[1002] grid h-11 w-11 shrink-0 place-items-center rounded-full border border-slate-200 bg-white text-navy-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-civic-blue focus:ring-offset-2 xl:hidden"
          aria-label={isOpen ? "모바일 메뉴 닫기" : "모바일 메뉴 열기"}
          aria-controls="mobile-menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
        >
          <span className="flex w-5 flex-col gap-1.5">
            <span className={`h-0.5 rounded-full bg-current transition ${isOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-0.5 rounded-full bg-current transition ${isOpen ? "opacity-0" : ""}`} />
            <span className={`h-0.5 rounded-full bg-current transition ${isOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`fixed inset-x-0 bottom-0 top-[73px] z-[1001] touch-pan-y overflow-y-auto overscroll-contain bg-white transition xl:hidden ${
          isOpen ? "visible translate-y-0 opacity-100" : "invisible pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <div className="min-h-full border-t border-slate-200 bg-white px-5 pb-24 pt-4 shadow-[0_20px_50px_rgba(0,27,68,0.12)] sm:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center justify-between gap-4 rounded-2xl bg-navy-50 p-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-civic-red">Jinju-eul</p>
                <p className="mt-1 text-sm font-extrabold text-navy-900">경남 진주시을 공식 의정활동</p>
              </div>
              <div className="relative h-12 w-28 shrink-0 overflow-hidden rounded-md bg-white">
                <Image src={imagePaths.jinjuLogo} alt="참진주 로고" fill sizes="112px" className="object-contain" />
              </div>
            </div>

            <div className="mt-4 grid gap-4">
              {menuGroups.map((group) => (
                <section key={group.title} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <h2 className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">{group.title}</h2>
                  <div className="mt-3 grid gap-2">
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={(event) => handleHeaderNavigation(event, item.href)}
                        className="flex min-h-12 items-center justify-between rounded-xl bg-slate-50 px-4 text-sm font-black text-navy-900 transition hover:bg-navy-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-civic-blue focus:ring-offset-2"
                      >
                        {item.label}
                        <span aria-hidden="true">→</span>
                      </Link>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <a
                href="tel:027840797"
                onClick={closeMenu}
                className="flex min-h-12 items-center justify-center rounded-full bg-navy-900 px-4 text-sm font-black text-white focus:outline-none focus:ring-2 focus:ring-civic-blue focus:ring-offset-2"
              >
                전화하기
              </a>
              <Link
                href="/#jinju-map"
                onClick={(event) => handleHeaderNavigation(event, "/#jinju-map")}
                className="flex min-h-12 items-center justify-center rounded-full bg-civic-red px-4 text-sm font-black text-white focus:outline-none focus:ring-2 focus:ring-civic-red focus:ring-offset-2"
              >
                소통지도
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
