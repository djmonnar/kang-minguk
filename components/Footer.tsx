import Image from "next/image";
import Link from "next/link";
import { imagePaths } from "@/lib/images";

const footerLinks = [
  { label: "프로필", href: "/profile" },
  { label: "지역구", href: "/constituency" },
  { label: "정책현황", href: "/policies" },
  { label: "의정활동", href: "/activities" },
  { label: "자료실", href: "/media" },
  { label: "민원제안", href: "/participation" }
];

export function Footer() {
  return (
    <footer className="bg-white px-5 py-10 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl border-t border-slate-200 pt-8">
        <div className="flex flex-col gap-7 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xl">
            <div className="flex items-center gap-4">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-civic-blue text-base font-black text-white">
                강
              </div>
              <div>
                <p className="text-lg font-black text-navy-900">국회의원 강민국</p>
                <p className="mt-1 text-sm font-bold text-slate-600">경남 진주시을 공식 의정활동 홈페이지</p>
              </div>
            </div>
            <p className="mt-4 text-xs leading-6 text-slate-500">
              본 홈페이지는 의정활동 소개와 지역 소통을 위한 공식 안내 채널입니다.
            </p>
            <p className="mt-3 text-xs font-semibold text-slate-500">
              Produced by <span className="font-black text-navy-900">Jitmarketing</span>
            </p>
          </div>

          <div className="flex flex-col gap-5 md:items-end">
            <div className="relative h-14 w-36 overflow-hidden rounded-md bg-white">
              <Image src={imagePaths.jinjuLogo} alt="참진주 로고" fill sizes="144px" className="object-contain" />
            </div>
            <nav className="flex flex-wrap gap-4 text-sm font-bold text-slate-600 md:justify-end" aria-label="하단 메뉴">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  className="rounded-md transition hover:text-civic-red focus:outline-none focus:ring-2 focus:ring-civic-blue focus:ring-offset-2"
                  href={link.href}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
