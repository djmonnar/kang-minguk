const links = [
  {
    title: "진주 소통지도",
    description: "현장, 민원, 정책 활동을 지역별로 확인",
    href: "#jinju-map"
  },
  {
    title: "정책현황",
    description: "정무위와 진주 현안을 함께 관리",
    href: "#policies"
  },
  {
    title: "의정활동",
    description: "최근 활동과 보도자료를 빠르게 조회",
    href: "#activities"
  },
  {
    title: "민원·제안",
    description: "주민 의견을 남기고 처리 상태 확인",
    href: "#participation"
  }
];

export function QuickLinks() {
  return (
    <section className="bg-white px-5 py-10 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {links.map((link) => (
          <a
            key={link.title}
            href={link.href}
            className="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-civic-red hover:shadow-civic focus:outline-none focus:ring-2 focus:ring-civic-red focus:ring-offset-2"
          >
            <span className="text-sm font-bold text-civic-red">바로가기</span>
            <h2 className="mt-3 text-xl font-bold text-navy-900">{link.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{link.description}</p>
            <span className="mt-5 inline-flex text-sm font-bold text-navy-800 group-hover:text-civic-red">
              자세히 보기
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
