"use client";

import { useEffect, useRef, useState } from "react";
import { JINJU_CENTER, NAVER_MAP_CLIENT_ID } from "@/lib/naverMap";
import type { Activity } from "@/lib/data";

type NaverMapProps = {
  activities: Activity[];
  selectedActivity?: Activity;
  onSelectActivity: (id: string) => void;
};

let scriptPromise: Promise<void> | null = null;

const markerColors: Record<Activity["category"], string> = {
  현장방문: "#004ea2",
  민원: "#e61e2b",
  정책: "#002b5c",
  예산: "#b91c1c",
  입법: "#1d4ed8",
  일정: "#334155"
};

function loadNaverMaps() {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.naver?.maps) return Promise.resolve();

  if (!scriptPromise) {
    scriptPromise = new Promise<void>((resolve, reject) => {
      const script = document.createElement("script");
      script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${NAVER_MAP_CLIENT_ID}`;
      script.async = true;
      script.onload = () => (window.naver?.maps ? resolve() : reject(new Error("Naver Maps SDK namespace missing")));
      script.onerror = () => reject(new Error("Naver Maps SDK failed to load"));
      document.head.appendChild(script);
    });
  }

  return scriptPromise;
}

function markerContent(activity: Activity, selected: boolean) {
  const bg = selected ? "#e61e2b" : markerColors[activity.category];
  const shadow = selected
    ? "0 14px 30px rgba(230,30,43,.36)"
    : "0 10px 24px rgba(0,27,68,.24)";

  return `
    <button type="button" aria-label="${activity.district} ${activity.title}" style="position:relative;width:36px;height:46px;border:0;background:transparent;padding:0;cursor:pointer;">
      <span style="position:absolute;left:4px;top:0;width:28px;height:28px;border-radius:50% 50% 50% 0;background:${bg};border:4px solid #fff;box-shadow:${shadow};transform:rotate(-45deg);">
        <span style="position:absolute;left:50%;top:50%;width:9px;height:9px;border-radius:9999px;background:#fff;transform:translate(-50%,-50%);"></span>
      </span>
    </button>
  `;
}

export function NaverMap({ activities, selectedActivity, onSelectActivity }: NaverMapProps) {
  const mapElementRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<InstanceType<NonNullable<typeof window.naver>["maps"]["Map"]> | null>(null);
  const markerRefs = useRef<Array<{ setMap: (map: unknown | null) => void }>>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;

    loadNaverMaps()
      .then(() => {
        if (cancelled || !mapElementRef.current || !window.naver?.maps) return;

        const naverMaps = window.naver.maps;
        const map = new naverMaps.Map(mapElementRef.current, {
          center: new naverMaps.LatLng(JINJU_CENTER.lat, JINJU_CENTER.lng),
          zoom: 11,
          minZoom: 9,
          mapTypeId: naverMaps.MapTypeId?.NORMAL,
          mapTypeControl: false,
          scaleControl: true,
          logoControl: true,
          mapDataControl: false,
          zoomControl: true,
          zoomControlOptions: naverMaps.Position?.TOP_RIGHT
        });

        mapRef.current = map;
        setStatus("ready");

        const refreshMap = () => {
          if (cancelled || !mapElementRef.current) return;
          naverMaps.Event.trigger?.(map, "resize");
          map.setCenter(new naverMaps.LatLng(JINJU_CENTER.lat, JINJU_CENTER.lng));
        };

        window.requestAnimationFrame(refreshMap);
        window.setTimeout(refreshMap, 100);
        window.setTimeout(refreshMap, 500);
      })
      .catch((error) => {
        console.error(error);
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (status !== "ready" || !window.naver?.maps || !mapRef.current) return;

    const naverMaps = window.naver.maps;
    markerRefs.current.forEach((marker) => marker.setMap(null));
    markerRefs.current = [];

    activities.forEach((activity) => {
      const marker = new naverMaps.Marker({
        position: new naverMaps.LatLng(activity.lat, activity.lng),
        map: mapRef.current,
        title: activity.title,
        icon: {
          content: markerContent(activity, selectedActivity?.id === activity.id),
          anchor: new naverMaps.Point(18, 34)
        }
      });

      naverMaps.Event.addListener(marker, "click", () => onSelectActivity(activity.id));
      markerRefs.current.push(marker);
    });
  }, [activities, onSelectActivity, selectedActivity?.id, status]);

  useEffect(() => {
    if (!window.naver?.maps || !mapRef.current || !selectedActivity) return;

    mapRef.current.setCenter(new window.naver.maps.LatLng(selectedActivity.lat, selectedActivity.lng));
    mapRef.current.setZoom(12);
  }, [selectedActivity]);

  return (
    <div className="relative h-[520px] min-h-[520px] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-civic">
      <div ref={mapElementRef} className="h-full w-full" aria-label="네이버 지도 기반 진주 소통지도" />

      {status === "loading" ? (
        <div className="absolute inset-0 flex items-center justify-center bg-navy-50 text-sm font-bold text-navy-900">
          네이버 지도를 불러오는 중입니다.
        </div>
      ) : null}

      {status === "error" ? (
        <div className="absolute inset-0 flex items-center justify-center bg-navy-50 p-6 text-center">
          <div className="max-w-md rounded-lg border border-slate-200 bg-white p-5 shadow-civic">
            <p className="text-base font-bold text-navy-900">지도를 불러오지 못했습니다.</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              네이버 클라우드 Maps Application의 Web 서비스 URL에 현재 도메인이 등록되어 있는지 확인해주세요.
            </p>
          </div>
        </div>
      ) : null}

      <div className="absolute bottom-4 left-4 right-4 rounded-lg border border-slate-200 bg-white/90 p-4 backdrop-blur">
        <p className="text-sm font-bold text-navy-900">표시 중인 활동 {activities.length}건</p>
        <p className="mt-1 text-xs leading-5 text-slate-600">
          진주의 현장, 민원, 정책, 예산 활동을 지역별로 확인할 수 있습니다.
        </p>
      </div>
    </div>
  );
}
