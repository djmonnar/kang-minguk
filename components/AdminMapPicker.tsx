"use client";

import { useEffect, useRef, useState } from "react";
import { JINJU_CENTER, NAVER_MAP_CLIENT_ID } from "@/lib/naverMap";

type AdminMapPickerProps = {
  lat: number;
  lng: number;
  onChange: (position: { lat: number; lng: number }) => void;
};

let adminMapScriptPromise: Promise<void> | null = null;

function loadNaverMaps() {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.naver?.maps) return Promise.resolve();

  if (!adminMapScriptPromise) {
    adminMapScriptPromise = new Promise<void>((resolve, reject) => {
      const script = document.createElement("script");
      script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${NAVER_MAP_CLIENT_ID}`;
      script.async = true;
      script.onload = () => (window.naver?.maps ? resolve() : reject(new Error("Naver Maps SDK namespace missing")));
      script.onerror = () => reject(new Error("Naver Maps SDK failed to load"));
      document.head.appendChild(script);
    });
  }

  return adminMapScriptPromise;
}

function markerContent() {
  return `
    <span style="display:block;width:34px;height:44px;position:relative;">
      <span style="position:absolute;left:3px;top:0;width:28px;height:28px;border-radius:50% 50% 50% 0;background:#e61e2b;border:4px solid #fff;box-shadow:0 14px 30px rgba(230,30,43,.36);transform:rotate(-45deg);">
        <span style="position:absolute;left:50%;top:50%;width:9px;height:9px;border-radius:9999px;background:#fff;transform:translate(-50%,-50%);"></span>
      </span>
    </span>
  `;
}

export function AdminMapPicker({ lat, lng, onChange }: AdminMapPickerProps) {
  const mapElementRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<InstanceType<NonNullable<typeof window.naver>["maps"]["Map"]> | null>(null);
  const markerRef = useRef<{ setMap: (map: unknown | null) => void } | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;

    loadNaverMaps()
      .then(() => {
        if (cancelled || !mapElementRef.current || !window.naver?.maps) return;

        const naverMaps = window.naver.maps;
        const center = new naverMaps.LatLng(lat || JINJU_CENTER.lat, lng || JINJU_CENTER.lng);
        const map = new naverMaps.Map(mapElementRef.current, {
          center,
          zoom: 12,
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

        (naverMaps.Event.addListener as unknown as (
          target: unknown,
          eventName: string,
          listener: (event: { coord?: { lat: () => number; lng: () => number } }) => void
        ) => void)(map, "click", (event) => {
          const coord = event.coord;
          if (!coord) return;
          onChange({ lat: coord.lat(), lng: coord.lng() });
        });
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (status !== "ready" || !window.naver?.maps || !mapRef.current) return;

    const naverMaps = window.naver.maps;
    const position = new naverMaps.LatLng(lat, lng);

    markerRef.current?.setMap(null);
    markerRef.current = new naverMaps.Marker({
      position,
      map: mapRef.current,
      title: "선택한 지도 핀",
      icon: {
        content: markerContent(),
        anchor: new naverMaps.Point(17, 34)
      }
    });

    mapRef.current.setCenter(position);
  }, [lat, lng, status]);

  return (
    <div className="relative h-[320px] overflow-hidden rounded-2xl border border-slate-200 bg-navy-50">
      <div ref={mapElementRef} className="h-full w-full" aria-label="관리자 지도 핀 위치 선택" />
      {status === "loading" ? (
        <div className="absolute inset-0 grid place-items-center bg-navy-50 text-sm font-black text-navy-900">
          지도를 불러오는 중입니다.
        </div>
      ) : null}
      {status === "error" ? (
        <div className="absolute inset-0 grid place-items-center bg-navy-50 p-5 text-center text-sm font-bold leading-6 text-navy-900">
          지도를 불러오지 못했습니다. 네이버 지도 도메인 설정을 확인해주세요.
        </div>
      ) : null}
      <div className="absolute left-3 top-3 rounded-full bg-white/95 px-4 py-2 text-xs font-black text-navy-900 shadow-civic-soft backdrop-blur">
        지도를 클릭하면 좌표가 입력됩니다.
      </div>
    </div>
  );
}
