"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { activities, activityFilters, type Activity } from "@/lib/data";
import { SectionHeader } from "@/components/SectionHeader";

const bounds = {
  minLat: 35.15,
  maxLat: 35.27,
  minLng: 128.06,
  maxLng: 128.18
};

const categoryStyles: Record<Activity["category"], string> = {
  현장방문: "bg-civic-blue text-white",
  민원: "bg-civic-red text-white",
  정책: "bg-navy-800 text-white",
  예산: "bg-red-100 text-civic-red",
  입법: "bg-blue-100 text-navy-800",
  일정: "bg-slate-700 text-white"
};

function pinPosition(activity: Activity) {
  const x = ((activity.lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * 100;
  const y = 100 - ((activity.lat - bounds.minLat) / (bounds.maxLat - bounds.minLat)) * 100;

  return {
    left: `${Math.min(92, Math.max(8, x))}%`,
    top: `${Math.min(88, Math.max(12, y))}%`
  };
}

function ActivityDetail({ activity }: { activity: Activity }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-civic">
      <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-md bg-slate-100">
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
      </div>
      <h3 className="mt-4 text-xl font-bold text-navy-900">{activity.title}</h3>
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
      <a
        href={activity.sourceUrl}
        className="mt-5 inline-flex min-h-10 items-center rounded-md border border-navy-800 px-4 text-sm font-bold text-navy-900 transition hover:bg-navy-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-civic-blue focus:ring-offset-2"
        aria-label={`${activity.title} 상세 자료 보기`}
      >
        상세 자료 보기
      </a>
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
    <section id="jinju-map" className="bg-navy-50 px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Jinju Communication Map"
          title="진주 소통지도"
          description="진주의 현장, 민원, 정책, 예산 활동을 한눈에 확인하세요."
        />

        <div className="mt-8 flex gap-2 overflow-x-auto pb-2" aria-label="활동 유형 필터">
          {activityFilters.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => updateFilter(item)}
              className={
                filter === item
                  ? "min-h-10 shrink-0 rounded-md bg-civic-red px-4 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-civic-red focus:ring-offset-2"
                  : "min-h-10 shrink-0 rounded-md border border-slate-300 bg-white px-4 text-sm font-bold text-slate-700 transition hover:border-civic-red hover:text-civic-red focus:outline-none focus:ring-2 focus:ring-civic-red focus:ring-offset-2"
              }
              aria-pressed={filter === item}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-7 grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="relative min-h-[520px] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-civic">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,78,162,0.16),transparent_25%),radial-gradient(circle_at_76%_28%,rgba(230,30,43,0.13),transparent_24%),linear-gradient(135deg,#f8fafc,#e6eef8)]" />
            <div className="absolute inset-5 rounded-[32px] border border-dashed border-navy-700/20" />
            <div className="absolute left-[8%] top-[12%] h-[72%] w-[82%] rounded-[45%_55%_48%_52%] border-2 border-navy-700/18 bg-white/58 shadow-inner" />
            <div className="absolute left-[17%] top-[20%] rounded-md bg-white/78 px-3 py-2 text-xs font-bold text-slate-600">
              집현면 · 미천면
            </div>
            <div className="absolute right-[15%] top-[23%] rounded-md bg-white/78 px-3 py-2 text-xs font-bold text-slate-600">
              대곡면
            </div>
            <div className="absolute left-[26%] bottom-[26%] rounded-md bg-white/78 px-3 py-2 text-xs font-bold text-slate-600">
              중앙동
            </div>
            <div className="absolute right-[18%] bottom-[29%] rounded-md bg-white/78 px-3 py-2 text-xs font-bold text-slate-600">
              초장동 · 금산면
            </div>

            {filteredActivities.map((activity) => (
              <button
                key={activity.id}
                type="button"
                onClick={() => setSelectedId(activity.id)}
                className={`absolute z-10 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white text-xs font-black shadow-lg transition hover:scale-110 focus:outline-none focus:ring-4 focus:ring-civic-blue/35 ${categoryStyles[activity.category]} ${
                  selectedActivity?.id === activity.id ? "scale-110 ring-4 ring-civic-blue/35" : ""
                }`}
                style={pinPosition(activity)}
                aria-label={`${activity.district} ${activity.title} 보기`}
              >
                {activity.category.slice(0, 1)}
              </button>
            ))}

            <div className="absolute bottom-4 left-4 right-4 rounded-lg border border-slate-200 bg-white/90 p-4 backdrop-blur">
              <p className="text-sm font-bold text-navy-900">
                표시 중인 활동 {filteredActivities.length}건
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-600">
                mock map component입니다. 좌표 기반 데이터 구조는 추후 네이버지도 또는 카카오맵 API로 교체할 수 있습니다.
              </p>
            </div>
          </div>

          <aside className="lg:sticky lg:top-6 lg:self-start" aria-label="선택한 활동 상세">
            {selectedActivity ? <ActivityDetail activity={selectedActivity} /> : null}
            <div className="mt-4 rounded-lg border border-slate-200 bg-white p-5">
              <h3 className="text-base font-bold text-navy-900">진주시을 행정구역</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                진성면, 일반성면, 이반성면, 사봉면, 지수면, 대곡면, 금산면, 집현면, 미천면, 중앙동,
                상봉동, 상대동, 하대동, 상평동, 초장동
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
