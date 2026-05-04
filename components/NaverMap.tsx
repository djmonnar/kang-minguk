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

function upgradeNaverAssetUrl(url: string) {
  return url
    .replace("http://nrbe.map.naver.net/styles/", "https://nrbe.pstatic.net/styles/")
    .replace("http://nrb.map.naver.net/styles/", "https://map.pstatic.net/nrb/styles/")
    .replace("http://static.naver.net/static/", "https://ssl.pstatic.net/static/");
}

function upgradeNaverMapAssets(root: ParentNode = document) {
  root.querySelectorAll("img").forEach((image) => {
    const nextSrc = upgradeNaverAssetUrl(image.src);
    if (nextSrc !== image.src) {
      image.setAttribute("src", nextSrc);
      image.src = nextSrc;
    }
  });
}

function loadNaverMaps() {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Browser environment is required."));
  }

  if (window.naver?.maps) {
    return Promise.resolve();
  }

  if (!scriptPromise) {
    scriptPromise = new Promise<void>((resolve, reject) => {
      const script = document.createElement("script");
      script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${NAVER_MAP_CLIENT_ID}`;
      script.async = true;
      script.onload = () => {
        if (window.naver?.maps) {
          resolve();
        } else {
          reject(new Error("Naver Maps SDK loaded without maps namespace."));
        }
      };
      script.onerror = () => reject(new Error("Failed to load Naver Maps SDK."));
      document.head.appendChild(script);
    });
  }

  return scriptPromise;
}

function markerContent(activity: Activity, selected: boolean) {
  const bg = selected ? "#e61e2b" : "#004ea2";
  return `
    <button
      type="button"
      aria-label="${activity.district} ${activity.title}"
      style="
        width: 34px;
        height: 34px;
        border-radius: 9999px;
        border: 4px solid white;
        background: ${bg};
        color: white;
        font-weight: 800;
        font-size: 12px;
        box-shadow: 0 8px 22px rgba(0,27,68,.24);
        cursor: pointer;
      "
    >
      ${activity.category.slice(0, 1)}
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
    let assetObserver: MutationObserver | null = null;
    let assetUpgradeInterval: number | null = null;

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
        upgradeNaverMapAssets();
        assetObserver = new MutationObserver(() => {
          upgradeNaverMapAssets();
        });
        assetObserver.observe(document.body, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ["src"]
        });
        assetUpgradeInterval = window.setInterval(() => {
          upgradeNaverMapAssets();
        }, 250);
        window.setTimeout(() => {
          if (assetUpgradeInterval) {
            window.clearInterval(assetUpgradeInterval);
            assetUpgradeInterval = null;
          }
        }, 5000);

        window.setTimeout(() => {
          if (!cancelled) {
            naverMaps.Event.trigger?.(map, "resize");
            map.setCenter(new naverMaps.LatLng(JINJU_CENTER.lat, JINJU_CENTER.lng));
          }
        }, 100);
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
      assetObserver?.disconnect();
      if (assetUpgradeInterval) {
        window.clearInterval(assetUpgradeInterval);
      }
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
          anchor: new naverMaps.Point(17, 17)
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
    <div className="relative min-h-[520px] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-civic">
      <div ref={mapElementRef} className="absolute inset-0" aria-label="네이버 지도 기반 진주 소통지도" />

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
          네이버 지도 API와 mock JSON 좌표 데이터를 연결했습니다. 필터와 마커 선택은 기존 데이터 구조를 그대로 사용합니다.
        </p>
      </div>
    </div>
  );
}
