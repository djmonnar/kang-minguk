import Image from "next/image";
import Link from "next/link";
import { activities } from "@/lib/data";
import { SectionHeader } from "@/components/SectionHeader";
import { SourceBadge, getSourceActionLabel } from "@/components/SourceBadge";

export function LatestActivities() {
  const latest = [...activities]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);

  return (
    <section id="activities" className="bg-slate-50 px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader
            eyebrow="Assembly Activities"
            title="최근 의정활동"
            description="진주 현장과 국회 활동을 날짜, 지역, 처리 상태 중심으로 정리합니다."
          />
          <Link
            href="/#jinju-map"
            className="civic-navy-button md:w-auto"
          >
            지도에서 보기
          </Link>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-4">
          {latest.map((activity) => (
            <article key={activity.id} className="group civic-card civic-card-hover overflow-hidden">
              <div className="relative aspect-[16/10] bg-slate-100">
                <Image
                  src={activity.image}
                  alt={`${activity.title} 활동 사진`}
                  fill
                  sizes="(min-width: 1024px) 25vw, 90vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-navy-50 px-3 py-1 text-xs font-bold text-navy-800">
                    {activity.category}
                  </span>
                  <time className="text-xs font-semibold text-slate-500" dateTime={activity.date}>
                    {activity.date}
                  </time>
                </div>
                <div className="mt-3 flex">
                  <SourceBadge sourceType={activity.sourceType} sourceName={activity.sourceName} />
                </div>
                <h3 className="mt-4 min-h-14 text-lg font-black leading-7 text-navy-900">
                  {activity.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{activity.summary}</p>
                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-sm">
                  <span className="font-bold text-slate-700">{activity.district}</span>
                  <span className="font-bold text-civic-red">{activity.status}</span>
                </div>
                {activity.sourceUrl ? (
                  <a
                    href={activity.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex rounded-md text-sm font-bold text-navy-900 transition hover:text-civic-red focus:outline-none focus:ring-2 focus:ring-civic-blue focus:ring-offset-2"
                    aria-label={`${activity.title} ${getSourceActionLabel(activity.sourceType)}`}
                  >
                    {getSourceActionLabel(activity.sourceType)}
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
