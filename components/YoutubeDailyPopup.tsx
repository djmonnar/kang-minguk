"use client";

import { useEffect, useState } from "react";

const POPUP_STORAGE_KEY = "kang-minguk-youtube-popup-hidden-date";
const VIDEO_ID = "-A04XWlSk1M";
const VIDEO_TITLE = "민생 100℃ 민심을 듣고, 개혁으로 답하다 [경남 김해편] 국민의힘 경남도당 l 강민국TV";

function getTodayKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const date = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${date}`;
}

export function YoutubeDailyPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hiddenDate = window.localStorage.getItem(POPUP_STORAGE_KEY);

    if (hiddenDate !== getTodayKey()) {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsVisible(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  const videoSrc = `https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1`;

  function closeForToday() {
    window.localStorage.setItem(POPUP_STORAGE_KEY, getTodayKey());
    setIsVisible(false);
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-900/72 px-4 py-6 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="youtube-popup-title">
      <div className="w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/20 bg-white shadow-civic-strong">
        <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-civic-red px-5 py-4 text-white sm:px-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-white/70">Kang Minguk TV</p>
              <h2 id="youtube-popup-title" className="mt-2 text-xl font-black leading-snug sm:text-2xl">
                {VIDEO_TITLE}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setIsVisible(false)}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/30 bg-white/10 text-2xl font-light text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="영상 팝업 닫기"
            >
              ×
            </button>
          </div>
        </div>

        <div className="bg-slate-950">
          <div className="aspect-video w-full">
            <iframe
              className="h-full w-full"
              src={videoSrc}
              title={VIDEO_TITLE}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <p className="text-sm font-bold leading-6 text-slate-600">
            강민국TV 영상으로 지역 민심과 의정활동 소식을 확인하세요.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={closeForToday}
              className="min-h-11 rounded-full border border-slate-200 px-5 text-sm font-black text-navy-900 transition hover:border-navy-900 focus:outline-none focus:ring-2 focus:ring-civic-blue focus:ring-offset-2"
            >
              오늘 하루 보지 않기
            </button>
            <button
              type="button"
              onClick={() => setIsVisible(false)}
              className="min-h-11 rounded-full bg-civic-red px-5 text-sm font-black text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-civic-red focus:ring-offset-2"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
