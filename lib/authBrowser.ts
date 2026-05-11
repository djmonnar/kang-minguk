"use client";

import { signInWithPopup, type Auth, type GoogleAuthProvider, type UserCredential } from "firebase/auth";

export function isKakaoInAppBrowser() {
  if (typeof navigator === "undefined") {
    return false;
  }

  return /KAKAOTALK/i.test(navigator.userAgent);
}

export function isIOS() {
  if (typeof navigator === "undefined") return false;
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

export function getKakaoLoginGuideMessage() {
  return "카카오톡 안에서 열린 브라우저에서는 Google 로그인이 제한됩니다. 아래 버튼을 눌러 외부 브라우저에서 열어주세요.";
}

export function openInExternalBrowser() {
  if (typeof window === "undefined") return;

  const url = window.location.href;

  if (isIOS()) {
    // iOS: 카카오톡 딥링크로 Safari에서 열기
    window.location.href = `kakaotalk://web/openExternal?url=${encodeURIComponent(url)}`;
  } else {
    // Android: intent 스킴으로 Chrome에서 열기
    window.location.href = `intent://${url.replace(/^https?:\/\//, "")}#Intent;scheme=https;package=com.android.chrome;end`;
  }
}

export function getAuthErrorMessage(error: unknown) {
  const message = error instanceof Error ? error.message : "";
  const lowerMessage = message.toLowerCase();

  if (
    isKakaoInAppBrowser() ||
    lowerMessage.includes("disallowed_useragent") ||
    lowerMessage.includes("operation-not-supported") ||
    lowerMessage.includes("popup") ||
    lowerMessage.includes("cancelled-popup")
  ) {
    return getKakaoLoginGuideMessage();
  }

  if (lowerMessage.includes("auth/unauthorized-domain") || lowerMessage.includes("unauthorized-domain")) {
    return "현재 접속 도메인이 Firebase Authentication 승인된 도메인에 등록되어 있는지 확인해주세요.";
  }

  if (lowerMessage.includes("auth/configuration-not-found") || lowerMessage.includes("configuration-not-found")) {
    return "Firebase Authentication의 Google 로그인 제공업체 설정을 확인해주세요.";
  }

  return message || "로그인 중 오류가 발생했습니다.";
}

export async function signInWithGoogle(auth: Auth, provider: GoogleAuthProvider): Promise<UserCredential> {
  if (isKakaoInAppBrowser()) {
    throw new Error(getKakaoLoginGuideMessage());
  }

  return signInWithPopup(auth, provider);
}

export async function copyCurrentUrl() {
  if (typeof window === "undefined" || typeof navigator === "undefined" || !navigator.clipboard) {
    return false;
  }

  try {
    await navigator.clipboard.writeText(window.location.href);
    return true;
  } catch {
    return false;
  }
}
