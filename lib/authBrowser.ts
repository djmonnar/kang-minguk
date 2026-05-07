"use client";

import { signInWithPopup, type Auth, type GoogleAuthProvider, type UserCredential } from "firebase/auth";

export function isKakaoInAppBrowser() {
  if (typeof navigator === "undefined") {
    return false;
  }

  return /KAKAOTALK/i.test(navigator.userAgent);
}

export function getKakaoLoginGuideMessage() {
  return "카카오톡 안에서 열린 브라우저에서는 Google 로그인이 제한될 수 있습니다. 오른쪽 위 메뉴에서 '다른 브라우저로 열기'를 선택한 뒤 다시 로그인해주세요.";
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
