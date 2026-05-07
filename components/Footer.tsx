import Image from "next/image";
import Link from "next/link";
import { imagePaths } from "@/lib/images";

const footerLinks = [
  { label: "프로필", href: "/profile" },
  { label: "지역구", href: "/constituency" },
  { label: "정책현황", href: "/policies" },
  { label: "의정활동", href: "/activities" },
  { label: "자료실", href: "/media" },
  { label: "민원제안", href: "/participation" },
  { label: "로그인", href: "/login" },
  { label: "내 정보", href: "/account" },
  { label: "회원가입", href: "/signup" }
];

export function Footer() {
  return (
    <footer className="bg-white px-5 py-10 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl border-t border-slate-200 pt-8">
        <div className="flex flex-col gap-7 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xl">
            <div className="relative h-16 w-[360px] max-w-full overflow-hidden">
              <Image
                src={imagePaths.brandLogoWide}
                alt="강한민국 대한민국 강민국"
                fill
                sizes="360px"
                className="object-contain object-left"
              />
            </div>
            <p className="mt-3 text-sm font-bold text-slate-600">경남 진주시을 공식 의정활동 홈페이지</p>
            <p className="mt-4 text-xs leading-6 text-slate-500">
              본 홈페이지는 의정활동 소개와 지역 소통을 위한 공식 안내 채널입니다.
            </p>
            <p className="mt-3 text-xs font-semibold text-slate-500">
              Produced by <span className="font-black text-navy-900">Jitmarketing</span>
            </p>
          </div>

          <div className="flex flex-col gap-5 md:items-end">
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
