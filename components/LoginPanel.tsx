"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signInWithPopup, signOut, type User } from "firebase/auth";
import { useEffect, useMemo, useState } from "react";
import { getFirebaseAuth, googleProvider, hasFirebaseConfig } from "@/lib/firebase";

export function LoginPanel() {
  const router = useRouter();
  const isConfigured = useMemo(() => hasFirebaseConfig(), []);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!isConfigured) {
      setLoading(false);
      return;
    }

    const auth = getFirebaseAuth();
    return onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      setLoading(false);
    });
  }, [isConfigured]);

  async function handleLogin() {
    if (!isConfigured) {
      setMessage("Firebase 설정 후 로그인할 수 있습니다.");
      return;
    }

    try {
      setMessage("");
      const auth = getFirebaseAuth();
      await signInWithPopup(auth, googleProvider);
      router.push("/account");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "로그인 중 오류가 발생했습니다.");
    }
  }

  async function handleLogout() {
    const auth = getFirebaseAuth();
    await signOut(auth);
    setMessage("로그아웃되었습니다.");
  }

  return (
    <section className="bg-slate-50 px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch">
        <div className="rounded-[2rem] bg-navy-900 p-6 text-white shadow-civic sm:p-8">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-red-100">Member Login</p>
          <h2 className="mt-3 text-3xl font-black leading-tight">소통회원 로그인</h2>
          <p className="mt-4 text-sm font-bold leading-7 text-white/74">
            가입 시 사용한 Google 계정으로 로그인하면 비공개 민원·제안과 내 정보 설정을 이용할 수 있습니다.
          </p>
          <div className="mt-6 grid gap-3 text-sm font-bold leading-6 text-white/82">
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4">비밀번호는 Google 계정에서 관리합니다.</div>
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4">주소, 전화번호, 이메일은 내 정보 설정에서 수정할 수 있습니다.</div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-civic sm:p-8">
          {loading ? (
            <p className="text-sm font-black text-navy-900">로그인 상태를 확인하는 중입니다.</p>
          ) : user ? (
            <div>
              <p className="text-sm font-black text-civic-red">로그인됨</p>
              <h3 className="mt-2 text-2xl font-black text-navy-900">{user.displayName || user.email}</h3>
              <p className="mt-3 text-sm font-bold leading-6 text-slate-600">{user.email}</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/account"
                  className="flex min-h-12 items-center justify-center rounded-full bg-civic-red px-6 text-sm font-black text-white shadow-civic transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-civic-red focus:ring-offset-2"
                >
                  내 정보 설정
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="min-h-12 rounded-full border border-slate-200 px-6 text-sm font-black text-navy-900 transition hover:border-navy-900 focus:outline-none focus:ring-2 focus:ring-civic-blue focus:ring-offset-2"
                >
                  로그아웃
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-sm font-black text-civic-red">Google Auth</p>
              <h3 className="mt-2 text-2xl font-black text-navy-900">Google 계정으로 로그인하세요</h3>
              <p className="mt-3 text-sm font-bold leading-6 text-slate-600">
                아직 가입하지 않았다면 먼저 소통회원 가입을 완료해주세요.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleLogin}
                  className="min-h-12 rounded-full bg-civic-red px-6 text-sm font-black text-white shadow-civic transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-civic-red focus:ring-offset-2"
                >
                  Google로 로그인
                </button>
                <Link
                  href="/signup"
                  className="flex min-h-12 items-center justify-center rounded-full border border-slate-200 px-6 text-sm font-black text-navy-900 transition hover:border-navy-900 focus:outline-none focus:ring-2 focus:ring-civic-blue focus:ring-offset-2"
                >
                  소통회원 가입
                </Link>
              </div>
            </div>
          )}

          {message ? <p className="mt-5 text-sm font-black text-civic-red">{message}</p> : null}
        </div>
      </div>
    </section>
  );
}
