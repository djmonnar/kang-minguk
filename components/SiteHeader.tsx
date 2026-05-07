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

const authLinks = [
  { label: "로그인", href: "/login", style: "outline" },
  { label: "회원가입", href: "/signup", style: "primary" },
  { label: "내 정보", href: "/account", style: "outline" },
  { label: "관리자", href: "/admin", style: "admin" }
];

const menuGroups = [
  {
    title: "공식 정보",
    items: [
      { label: "프로필", href: "/profile" },
      { label: "진주시을 지역구", href: "/constituency" },
      { label: "정책현황", href: "/policies" },
      { label: "자료실", href: "/media" }
    ]
  },
  {
    title: "소통 채널",
    items: [
      { label: "진주 소통지도", href: "/#jinju-map" },
      { label: "의정활동", href: "/activities" },
      { label: "민원·제안하기", href: "/participation" },
      { label: "로그인", href: "/login" },
      { label: "회원가입", href: "/signup" },
      { label: "내 정보 설정", href: "/account" },
      { label: "관리자 콘솔", href: "/admin" }
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

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.classList.remove("mobile-menu-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  function isActive(href: string) {
    if (href === "/") {
      return pathname === "/";
    }

    if (href.startsWith("/#")) {
      return false;
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
    <header className="sticky top-0 z-[1000] border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[74px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-8 lg:px-10">
        <Link
          href="/"
          onClick={(event) => handleHeaderNavigation(event, "/")}
          className="group flex min-w-0 shrink-0 items-center"
          aria-label="국회의원 강민국 홈페이지 처음으로"
        >
          <span className="relative hidden h-12 w-[250px] overflow-hidden lg:block">
            <Image
              src={imagePaths.brandLogoWide}
              alt="강한민국 대한민국 강민국"
              fill
              priority
              sizes="250px"
              className="object-contain object-left transition duration-300 group-hover:scale-[1.02]"
            />
          </span>
          <span className="relative h-11 w-[235px] max-w-[calc(100vw-92px)] overflow-hidden lg:hidden">
            <Image
              src={imagePaths.brandLogoMobile}
              alt="강한민국 대한민국 강민국"
              fill
              priority
              sizes="235px"
              className="object-contain object-left"
            />
          </span>
        </Link>

        <nav
          className="hidden min-w-0 flex-1 items-center justify-center gap-3 whitespace-nowrap text-[13px] font-black text-slate-700 xl:flex 2xl:gap-5"
          aria-label="주요 메뉴"
        >
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={(event) => handleHeaderNavigation(event, item.href)}
              className={
                isActive(item.href)
                  ? "rounded-full bg-red-50 px-2.5 py-2 text-civic-red"
                  : "rounded-full px-2.5 py-2 transition duration-300 hover:bg-navy-50 hover:text-civic-red focus:outline-none focus:ring-2 focus:ring-civic-blue focus:ring-offset-2"
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 md:flex">
          {authLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                item.style === "admin"
                  ? "min-h-10 rounded-full bg-civic-red px-4 text-xs font-black text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-civic-red focus:ring-offset-2 2xl:px-5 2xl:text-sm"
                  : item.style === "primary"
                  ? "civic-navy-button min-h-10 px-4 text-xs 2xl:px-5 2xl:text-sm"
                  : "civic-outline-button min-h-10 px-4 text-xs 2xl:px-5 2xl:text-sm"
              }
            >
              {item.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          className="relative z-[1003] grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-full border border-slate-200 bg-white text-navy-900 shadow-sm transition hover:border-navy-100 hover:shadow-civic-soft focus:outline-none focus:ring-2 focus:ring-civic-blue focus:ring-offset-2 xl:hidden"
          aria-label={isOpen ? "모바일 메뉴 닫기" : "모바일 메뉴 열기"}
          aria-controls="mobile-menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
        >
          <span className="flex w-5 flex-col gap-1.5">
            <span className={`h-0.5 rounded-full bg-current transition duration-300 ${isOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-0.5 rounded-full bg-current transition duration-300 ${isOpen ? "opacity-0" : ""}`} />
            <span className={`h-0.5 rounded-full bg-current transition duration-300 ${isOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`${isOpen ? "block" : "hidden"} fixed inset-x-0 top-[74px] z-[1001] h-[calc(100dvh-74px)] overflow-y-auto overscroll-contain bg-white xl:hidden`}
      >
        <div className="min-h-full bg-[linear-gradient(180deg,#ffffff_0%,#f3f7fc_100%)] px-5 pb-28 pt-5 shadow-[0_24px_70px_rgba(0,27,68,0.16)] sm:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="civic-dark-card bg-[linear-gradient(135deg,#001b44_0%,#003a7a_62%,#e61e2b_145%)] p-5">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-red-100">Jinju-eul</p>
              <h2 className="mt-2 text-xl font-black">진주와 국회를 잇는 의정활동</h2>
              <p className="mt-2 text-sm font-bold leading-6 text-white/76">
                필요한 메뉴를 선택하면 바로 해당 페이지로 이동합니다.
              </p>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {menuGroups.map((group) => (
                <section key={group.title} className="civic-card p-4">
                  <h2 className="civic-eyebrow">{group.title}</h2>
                  <div className="mt-3 grid gap-2">
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={(event) => handleHeaderNavigation(event, item.href)}
                        className="flex min-h-12 items-center justify-between rounded-2xl bg-slate-50 px-4 text-sm font-black text-navy-900 transition duration-300 hover:bg-navy-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-civic-blue focus:ring-offset-2"
                      >
                        <span>{item.label}</span>
                        <span aria-hidden="true">→</span>
                      </Link>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <a href="tel:027840797" onClick={closeMenu} className="civic-navy-button">
                전화하기
              </a>
              <Link
                href="/#jinju-map"
                onClick={(event) => handleHeaderNavigation(event, "/#jinju-map")}
                className="civic-red-button"
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
