"use client";

import { useEffect, useState } from "react";
import { copyCurrentUrl, getKakaoLoginGuideMessage, isKakaoInAppBrowser, openInExternalBrowser } from "@/lib/authBrowser";

export function KakaoLoginNotice() {
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setVisible(isKakaoInAppBrowser());
  }, []);

  async function handleCopy() {
    const ok = await copyCurrentUrl();
    setCopied(ok);
  }

  if (!visible) {
    return null;
  }

  return (
    <div className="mb-6 rounded-2xl border border-civic-red/20 bg-red-50 p-4 text-sm font-bold leading-6 text-navy-900">
      <p>{getKakaoLoginGuideMessage()}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={openInExternalBrowser}
          className="inline-flex min-h-10 items-center justify-center rounded-full bg-civic-red px-4 text-xs font-black text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-civic-red focus:ring-offset-2"
        >
          외부 브라우저로 열기
        </button>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex min-h-10 items-center justify-center rounded-full bg-navy-900 px-4 text-xs font-black text-white transition hover:bg-navy-800 focus:outline-none focus:ring-2 focus:ring-civic-red focus:ring-offset-2"
        >
          {copied ? "주소 복사됨" : "주소 복사"}
        </button>
      </div>
    </div>
  );
}
