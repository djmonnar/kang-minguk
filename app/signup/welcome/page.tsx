import Link from "next/link";
import { Footer } from "@/components/Footer";

export default function SignupWelcomePage() {
  return (
    <main className="bg-slate-50 pb-28 md:pb-0">
      <section className="px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-civic">
          <div className="bg-[linear-gradient(135deg,#002b5c,#004ea2_56%,#e61e2b)] px-6 py-12 text-white sm:px-10">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-red-100">Welcome</p>
            <h1 className="mt-4 text-3xl font-black leading-tight sm:text-5xl">
              소통회원 가입이 완료되었습니다
            </h1>
            <p className="mt-5 max-w-2xl text-sm font-bold leading-7 text-white/80 sm:text-base">
              접수된 정보는 민원·소통 안내와 지역 의정활동 알림을 위해 확인됩니다.
            </p>
          </div>

          <div className="grid gap-6 p-6 sm:p-10">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-navy-50 p-5">
                <p className="text-sm font-black text-civic-red">01</p>
                <h2 className="mt-2 text-lg font-black text-navy-900">정보 접수</h2>
                <p className="mt-2 text-sm font-bold leading-6 text-slate-600">
                  입력한 정보가 접수되었습니다.
                </p>
              </div>
              <div className="rounded-2xl bg-navy-50 p-5">
                <p className="text-sm font-black text-civic-red">02</p>
                <h2 className="mt-2 text-lg font-black text-navy-900">민원·제안 가능</h2>
                <p className="mt-2 text-sm font-bold leading-6 text-slate-600">
                  로그인 후 비공개 민원·제안 게시판을 이용할 수 있습니다.
                </p>
              </div>
              <div className="rounded-2xl bg-navy-50 p-5">
                <p className="text-sm font-black text-civic-red">03</p>
                <h2 className="mt-2 text-lg font-black text-navy-900">소식 확인</h2>
                <p className="mt-2 text-sm font-bold leading-6 text-slate-600">
                  의정활동과 공지사항을 홈페이지에서 확인해주세요.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/participation"
                className="flex min-h-12 items-center justify-center rounded-full bg-civic-red px-6 text-sm font-black text-white shadow-civic transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-civic-red focus:ring-offset-2"
              >
                민원·제안 작성하기
              </Link>
              <Link
                href="/"
                className="flex min-h-12 items-center justify-center rounded-full bg-navy-900 px-6 text-sm font-black text-white transition hover:bg-navy-800 focus:outline-none focus:ring-2 focus:ring-civic-blue focus:ring-offset-2"
              >
                홈페이지로 이동
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
