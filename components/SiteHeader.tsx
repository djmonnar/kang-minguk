"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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
      { label: "민원·제안하기", href: "/participation" }
    ]
  }
];

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  function isActive(href: string) {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href;
  }

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-10">
        <Link href="/" className="group flex min-w-0 items-center gap-3" aria-label="국회의원 강민국 홈페이지 처음으로">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-civic-blue text-base font-black text-white shadow-civic">
            강
          </span>
          <span className="min-w-0">
            <span className="block truncate text-lg font-black tracking-tight text-navy-900">국회의원 강민국</span>
            <span className="block text-[10px] font-black tracking-[0.18em] text-civic-red sm:text-xs">
              JINJU COMMUNICATION
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-extrabold text-slate-700 xl:flex" aria-label="주요 메뉴">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                isActive(item.href)
                  ? "text-civic-red"
                  : "transition hover:text-civic-red focus:outline-none focus:ring-2 focus:ring-civic-blue focus:ring-offset-2"
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <div className="relative h-9 w-24 overflow-hidden rounded-md bg-white">
            <Image src={imagePaths.jinjuLogo} alt="참진주 로고" fill sizes="96px" className="object-contain" />
          </div>
          <Link
            href="/participation"
            className="rounded-full bg-navy-900 px-5 py-2 text-sm font-black text-white transition hover:bg-civic-red focus:outline-none focus:ring-2 focus:ring-civic-blue focus:ring-offset-2"
          >
            시민 제안하기
          </Link>
        </div>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-navy-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-civic-blue focus:ring-offset-2 xl:hidden"
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
        className={`xl:hidden ${isOpen ? "block" : "hidden"}`}
      >
        <div className="border-t border-slate-200 bg-white px-5 pb-6 pt-4 shadow-[0_20px_50px_rgba(0,27,68,0.12)] sm:px-8">
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
                        onClick={closeMenu}
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
                onClick={closeMenu}
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
