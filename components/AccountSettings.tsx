"use client";

import Link from "next/link";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { onAuthStateChanged, signInWithPopup, signOut, type User } from "firebase/auth";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { getFirebaseAuth, getFirebaseDb, googleProvider, hasFirebaseConfig } from "@/lib/firebase";

type SubmitState = "idle" | "loading" | "success" | "error";

const partyOptions = [
  { label: "예", value: "yes" },
  { label: "아니오", value: "no" },
  { label: "응답하지 않음", value: "prefer_not_to_say" }
];

export function AccountSettings() {
  const isConfigured = useMemo(() => hasFirebaseConfig(), []);
  const [user, setUser] = useState<User | null>(null);
  const [hasMember, setHasMember] = useState(false);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    partyMember: "prefer_not_to_say",
    email: ""
  });

  useEffect(() => {
    if (!isConfigured) {
      setLoading(false);
      return;
    }

    const auth = getFirebaseAuth();
    return onAuthStateChanged(auth, async (nextUser) => {
      setUser(nextUser);
      setMessage("");

      if (!nextUser) {
        setHasMember(false);
        setLoading(false);
        return;
      }

      try {
        const db = getFirebaseDb();
        const snapshot = await getDoc(doc(db, "members", nextUser.uid));
        setHasMember(snapshot.exists());

        if (snapshot.exists()) {
          const data = snapshot.data();
          setForm({
            name: typeof data.name === "string" ? data.name : nextUser.displayName || "",
            phone: typeof data.phone === "string" ? data.phone : "",
            address: typeof data.address === "string" ? data.address : "",
            partyMember: typeof data.partyMember === "string" ? data.partyMember : "prefer_not_to_say",
            email: typeof data.email === "string" ? data.email : nextUser.email || ""
          });
        }
      } catch (error) {
        setMessage(error instanceof Error ? error.message : "회원 정보를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    });
  }, [isConfigured]);

  function updateField(name: string, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleLogin() {
    const auth = getFirebaseAuth();
    await signInWithPopup(auth, googleProvider);
  }

  async function handleLogout() {
    const auth = getFirebaseAuth();
    await signOut(auth);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!user) {
      setState("error");
      setMessage("로그인 후 수정할 수 있습니다.");
      return;
    }

    try {
      setState("loading");
      setMessage("");
      const db = getFirebaseDb();

      await setDoc(
        doc(db, "members", user.uid),
        {
          uid: user.uid,
          name: form.name.trim(),
          phone: form.phone.trim(),
          address: form.address.trim(),
          partyMember: form.partyMember,
          email: form.email.trim() || user.email || "",
          providerEmail: user.email || "",
          provider: "google",
          consent: {
            privacy: true,
            politicalInfo: true
          },
          updatedAt: serverTimestamp()
        },
        { merge: true }
      );

      setState("success");
      setMessage("회원 정보가 수정되었습니다.");
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "저장 중 오류가 발생했습니다.");
    }
  }

  return (
    <section className="bg-slate-50 px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.74fr_1.26fr] lg:items-start">
        <aside className="rounded-[2rem] bg-navy-900 p-6 text-white shadow-civic sm:p-8">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-red-100">Account</p>
          <h2 className="mt-3 text-3xl font-black leading-tight">내 정보 설정</h2>
          <p className="mt-4 text-sm font-bold leading-7 text-white/74">
            소통회원 정보와 민원 안내 연락처를 관리합니다.
          </p>
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/10 p-4">
            <p className="text-sm font-black">비밀번호 변경</p>
            <p className="mt-2 text-xs font-bold leading-5 text-white/74">
              비밀번호는 가입 계정의 보안 설정에서 변경할 수 있습니다.
            </p>
            <a
              href="https://myaccount.google.com/security"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex text-sm font-black text-white underline underline-offset-4"
            >
              보안 설정 열기
            </a>
          </div>
        </aside>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-civic sm:p-8">
          {loading ? (
            <p className="text-sm font-black text-navy-900">회원 정보를 확인하는 중입니다.</p>
          ) : !user ? (
            <div>
              <h3 className="text-2xl font-black text-navy-900">로그인이 필요합니다</h3>
              <p className="mt-3 text-sm font-bold leading-6 text-slate-600">
                가입 시 사용한 계정으로 로그인해주세요.
              </p>
              <button
                type="button"
                onClick={handleLogin}
                className="mt-6 min-h-12 rounded-full bg-civic-red px-6 text-sm font-black text-white shadow-civic transition hover:bg-red-700"
              >
                로그인하기
              </button>
            </div>
          ) : !hasMember ? (
            <div>
              <h3 className="text-2xl font-black text-navy-900">가입 정보가 없습니다</h3>
              <p className="mt-3 text-sm font-bold leading-6 text-slate-600">
                먼저 소통회원 가입을 완료하면 내 정보 설정을 이용할 수 있습니다.
              </p>
              <Link
                href="/signup"
                className="mt-6 inline-flex min-h-12 items-center rounded-full bg-civic-red px-6 text-sm font-black text-white shadow-civic transition hover:bg-red-700"
              >
                소통회원 가입하기
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-5">
              <div className="flex flex-col justify-between gap-3 border-b border-slate-100 pb-5 sm:flex-row sm:items-center">
                <div>
                  <p className="text-sm font-black text-civic-red">로그인 계정</p>
                  <p className="mt-1 text-sm font-bold text-slate-600">{user.email}</p>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="min-h-10 rounded-full border border-slate-200 px-4 text-sm font-black text-navy-900"
                >
                  로그아웃
                </button>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <label className="grid gap-2 text-sm font-black text-navy-900">
                  이름
                  <input
                    required
                    value={form.name}
                    onChange={(event) => updateField("name", event.target.value)}
                    className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-bold outline-none transition focus:border-civic-blue focus:ring-2 focus:ring-civic-blue/20"
                  />
                </label>
                <label className="grid gap-2 text-sm font-black text-navy-900">
                  전화번호
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(event) => updateField("phone", event.target.value)}
                    className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-bold outline-none transition focus:border-civic-blue focus:ring-2 focus:ring-civic-blue/20"
                  />
                </label>
                <label className="grid gap-2 text-sm font-black text-navy-900 md:col-span-2">
                  주소
                  <input
                    required
                    value={form.address}
                    onChange={(event) => updateField("address", event.target.value)}
                    className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-bold outline-none transition focus:border-civic-blue focus:ring-2 focus:ring-civic-blue/20"
                  />
                </label>
                <label className="grid gap-2 text-sm font-black text-navy-900">
                  이메일 주소
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(event) => updateField("email", event.target.value)}
                    className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-bold outline-none transition focus:border-civic-blue focus:ring-2 focus:ring-civic-blue/20"
                  />
                </label>
                <fieldset className="grid gap-2">
                  <legend className="text-sm font-black text-navy-900">국민의힘 당원 여부</legend>
                  <div className="grid grid-cols-3 gap-2">
                    {partyOptions.map((option) => (
                      <label key={option.value} className="cursor-pointer">
                        <input
                          required
                          type="radio"
                          name="partyMember"
                          value={option.value}
                          checked={form.partyMember === option.value}
                          onChange={(event) => updateField("partyMember", event.target.value)}
                          className="peer sr-only"
                        />
                        <span className="flex min-h-12 items-center justify-center rounded-xl border border-slate-200 px-2 text-xs font-black text-navy-900 transition peer-checked:border-civic-red peer-checked:bg-civic-red peer-checked:text-white">
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>

              <button
                type="submit"
                disabled={state === "loading"}
                className="min-h-13 rounded-full bg-civic-red px-6 py-4 text-sm font-black text-white shadow-civic transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {state === "loading" ? "저장 중..." : "정보 수정하기"}
              </button>
            </form>
          )}

          {message ? (
            <p className={state === "success" ? "mt-5 text-sm font-black text-civic-blue" : "mt-5 text-sm font-black text-civic-red"}>
              {message}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
