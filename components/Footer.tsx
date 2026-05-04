export function Footer() {
  return (
    <footer className="bg-white px-5 py-10 sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 border-t border-slate-200 pt-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-bold text-navy-900">국회의원 강민국</p>
          <p className="mt-2 text-sm text-slate-600">
            경남 진주시을 공식 의정활동 홈페이지 MVP
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
          <a className="rounded-md focus:outline-none focus:ring-2 focus:ring-civic-blue" href="#participation">
            민원제안
          </a>
        </div>
      </div>
    </footer>
  );
}
