"use client";

import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { NaverMap } from "@/components/NaverMap";
import { SectionHeader } from "@/components/SectionHeader";
import { SourceBadge, getSourceActionLabel } from "@/components/SourceBadge";
import { activities, activityFilters, districts, type Activity } from "@/lib/data";

const categoryStyles: Record<Activity["category"], string> = {
  현장방문: "bg-civic-blue text-white",
  민원: "bg-civic-red text-white",
  정책: "bg-navy-800 text-white",
  예산: "bg-red-100 text-civic-red",
  입법: "bg-blue-100 text-navy-800",
  일정: "bg-slate-700 text-white"
};

function ActivityDetail({ activity }: { activity: Activity }) {
  return (
    <article className="civic-card p-5 shadow-civic">
      <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-2xl bg-slate-100">
        <Image
          src={activity.image}
          alt={`${activity.title} 활동 사진`}
          fill
          sizes="(min-width: 1024px) 31vw, 90vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className={`rounded-full px-3 py-1 text-xs font-bold ${categoryStyles[activity.category]}`}>
          {activity.category}
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
          {activity.status}
        </span>
        <SourceBadge sourceType={activity.sourceType} sourceName={activity.sourceName} />
      </div>
      <h3 className="mt-4 text-xl font-black leading-tight text-navy-900">{activity.title}</h3>
      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="font-bold text-slate-500">지역</dt>
          <dd className="mt-1 text-navy-900">{activity.district}</dd>
        </div>
        <div>
          <dt className="font-bold text-slate-500">일자</dt>
          <dd className="mt-1 text-navy-900">{activity.date}</dd>
        </div>
      </dl>
      <p className="mt-4 text-sm leading-6 text-slate-600">{activity.summary}</p>
      {activity.sourceUrl ? (
        <a
          href={activity.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="civic-outline-button mt-5 min-h-10 px-4"
          aria-label={`${activity.title} ${getSourceActionLabel(activity.sourceType)}`}
        >
          {getSourceActionLabel(activity.sourceType)}
        </a>
      ) : null}
    </article>
  );
}

export function JinjuMapSection() {
  const [filter, setFilter] = useState<(typeof activityFilters)[number]>("전체");
  const [selectedId, setSelectedId] = useState(activities[0]?.id ?? "");

  const filteredActivities = useMemo(() => {
    if (filter === "전체") return activities;
    return activities.filter((activity) => activity.category === filter);
  }, [filter]);

  const selectedActivity =
    filteredActivities.find((activity) => activity.id === selectedId) ?? filteredActivities[0] ?? activities[0];

  const handleSelectActivity = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  function updateFilter(nextFilter: (typeof activityFilters)[number]) {
    setFilter(nextFilter);
    const nextActivity =
      nextFilter === "전체"
        ? activities[0]
        : activities.find((activity) => activity.category === nextFilter);
    if (nextActivity) {
      setSelectedId(nextActivity.id);
    }
  }

  return (
    <section id="jinju-map" className="bg-[linear-gradient(180deg,#f3f7fc_0%,#ffffff_100%)] px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Jinju Communication Map"
          title="진주 소통지도"
          description="진주의 현장, 민원, 정책, 예산 활동을 네이버 지도 위에서 한눈에 확인하세요."
        />

        <div className="mt-8 flex gap-2 overflow-x-auto pb-2" aria-label="활동 유형 필터">
          {activityFilters.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => updateFilter(item)}
              className={
                filter === item
                  ? "min-h-10 shrink-0 rounded-full bg-civic-red px-4 text-sm font-black text-white shadow-[0_10px_24px_rgba(230,30,43,0.18)] focus:outline-none focus:ring-2 focus:ring-civic-red focus:ring-offset-2"
                  : "min-h-10 shrink-0 rounded-full border border-slate-300 bg-white px-4 text-sm font-black text-slate-700 transition hover:border-civic-red hover:text-civic-red focus:outline-none focus:ring-2 focus:ring-civic-red focus:ring-offset-2"
              }
              aria-pressed={filter === item}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-7 grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
          <NaverMap
            activities={filteredActivities}
            selectedActivity={selectedActivity}
            onSelectActivity={handleSelectActivity}
          />

          <aside className="hidden lg:sticky lg:top-6 lg:block lg:self-start" aria-label="선택한 활동 상세">
            {selectedActivity ? <ActivityDetail activity={selectedActivity} /> : null}
            <div className="mt-4 civic-card p-5">
              <h3 className="text-base font-black text-navy-900">진주시을 행정구역</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{districts.join(", ")}</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
