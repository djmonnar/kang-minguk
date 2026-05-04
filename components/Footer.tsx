export function Footer() {
  return (
    <footer className="bg-white px-5 py-10 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl border-t border-slate-200 pt-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-lg font-bold text-navy-900">국회의원 강민국</p>
            <p className="mt-2 text-sm text-slate-600">
              경남 진주시을 공식 의정활동 홈페이지
            </p>
            <p className="mt-3 text-xs font-semibold text-slate-500">
              Produced by <span className="font-black text-navy-900">Jitmarketing</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm font-semibold text-slate-600">
            <a className="rounded-md focus:outline-none focus:ring-2 focus:ring-civic-blue" href="#profile">
              프로필
            </a>
            <a className="rounded-md focus:outline-none focus:ring-2 focus:ring-civic-blue" href="#jinju-map">
              소통지도
            </a>
            <a className="rounded-md focus:outline-none focus:ring-2 focus:ring-civic-blue" href="#policies">
              정책현황
            </a>
            <a className="rounded-md focus:outline-none focus:ring-2 focus:ring-civic-blue" href="#activities">
              의정활동
            </a>
            <a className="rounded-md focus:outline-none focus:ring-2 focus:ring-civic-blue" href="#participation">
              민원제안
            </a>
          </div>
        </div>
        <div className="mt-8 rounded-lg bg-slate-50 p-5 text-xs leading-6 text-slate-500">
          본 홈페이지는 의정활동 소개와 지역 소통을 위한 웹사이트 MVP이며, 공개 자료 검증 후 세부 링크와 최신 활동 자료를 순차 반영합니다.
        </div>
      </div>
    </footer>
  );
}
