"use client";

function copyCurrentUrl() {
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(window.location.href);
  }

  const textarea = document.createElement("textarea");
  textarea.value = window.location.href;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
  return Promise.resolve();
}

export function MobileFloatingBar() {
  async function handleShare() {
    const shareData = {
      title: "국회의원 강민국 공식 의정활동 홈페이지",
      text: "진주의 현장에서 듣고, 국회에서 답하는 의정활동 홈페이지입니다.",
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }

      await copyCurrentUrl();
    } catch {
      await copyCurrentUrl();
    }
  }

  return (
    <div className="fixed inset-x-0 bottom-4 z-50 px-4 md:hidden" aria-label="모바일 빠른 메뉴">
      <div className="mx-auto grid max-w-md grid-cols-3 gap-2 rounded-full border border-white/70 bg-white/95 p-2 shadow-[0_18px_50px_rgba(0,27,68,0.22)] backdrop-blur-xl">
        <a
          href="tel:027840797"
          className="flex min-h-12 items-center justify-center rounded-full bg-navy-900 px-3 text-xs font-black text-white focus:outline-none focus:ring-2 focus:ring-civic-blue focus:ring-offset-2"
          aria-label="의원실 전화하기"
        >
          전화하기
        </a>
        <button
          type="button"
          onClick={handleShare}
          className="min-h-12 rounded-full border border-slate-200 bg-white px-3 text-xs font-black text-navy-900 focus:outline-none focus:ring-2 focus:ring-civic-blue focus:ring-offset-2"
          aria-label="현재 페이지 공유하기"
        >
          공유하기
        </button>
        <a
          href="#jinju-map"
          className="flex min-h-12 items-center justify-center rounded-full bg-civic-red px-3 text-xs font-black text-white focus:outline-none focus:ring-2 focus:ring-civic-red focus:ring-offset-2"
          aria-label="진주 소통지도 보기"
        >
          소통지도
        </a>
      </div>
    </div>
  );
}
