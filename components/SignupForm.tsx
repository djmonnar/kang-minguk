"use client";

import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { getFirebaseAuth, getFirebaseDb, googleProvider, hasFirebaseConfig } from "@/lib/firebase";

type SubmitState = "idle" | "loading" | "success" | "error";

const partyOptions = [
  { label: "예", value: "yes" },
  { label: "아니오", value: "no" },
  { label: "응답하지 않음", value: "prefer_not_to_say" }
];

function getSignupErrorMessage(error: unknown) {
  if (error instanceof Error && error.message.includes("auth/configuration-not-found")) {
    return "Firebase Authentication이 아직 활성화되지 않았습니다. Firebase Console에서 Authentication 시작 후 Google 로그인을 사용 설정해주세요.";
  }

  if (error instanceof Error && error.message.includes("auth/unauthorized-domain")) {
    return "현재 도메인이 Firebase Authentication 승인 도메인에 등록되지 않았습니다.";
  }

  if (error instanceof Error && error.message.includes("permission-denied")) {
    return "Firestore 규칙 또는 회원 저장 권한을 확인해주세요.";
  }

  return error instanceof Error ? error.message : "저장 중 오류가 발생했습니다.";
}

export function SignupForm() {
  const router = useRouter();
  const isConfigured = useMemo(() => hasFirebaseConfig(), []);
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    partyMember: "",
    email: "",
    consent: false,
    politicalConsent: false
  });

  function updateField(name: string, value: string | boolean) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isConfigured) {
      setState("error");
      setMessage("Firebase 환경변수 설정 후 저장할 수 있습니다.");
      return;
    }

    if (!form.consent || !form.politicalConsent) {
      setState("error");
      setMessage("개인정보 수집 및 당원 여부 처리 동의가 필요합니다.");
      return;
    }

    try {
      setState("loading");
      setMessage("");
      const auth = getFirebaseAuth();
      const result = await signInWithPopup(auth, googleProvider);
      const db = getFirebaseDb();

      await setDoc(
        doc(db, "members", result.user.uid),
        {
          uid: result.user.uid,
          name: form.name.trim(),
          phone: form.phone.trim(),
          address: form.address.trim(),
          partyMember: form.partyMember,
          email: form.email.trim() || result.user.email || "",
          providerEmail: result.user.email || "",
          provider: "google",
          consent: {
            privacy: form.consent,
            politicalInfo: form.politicalConsent,
            consentedAt: serverTimestamp()
          },
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        },
        { merge: true }
      );

      setState("success");
      setMessage("신청 정보가 접수되었습니다.");
      router.replace("/signup/welcome");
    } catch (error) {
      setState("error");
      setMessage(getSignupErrorMessage(error));
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-civic sm:p-8">
      {!isConfigured ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-bold leading-6 text-amber-900">
          Firebase 환경변수가 아직 설정되지 않았습니다. 설정 후 Google 로그인과 Firestore 저장이 활성화됩니다.
        </div>
      ) : null}

      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-black text-navy-900">
          이름
          <input
            required
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-bold outline-none transition focus:border-civic-blue focus:ring-2 focus:ring-civic-blue/20"
            placeholder="홍길동"
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
            placeholder="010-0000-0000"
          />
        </label>

        <label className="grid gap-2 text-sm font-black text-navy-900 md:col-span-2">
          주소
          <input
            required
            value={form.address}
            onChange={(event) => updateField("address", event.target.value)}
            className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-bold outline-none transition focus:border-civic-blue focus:ring-2 focus:ring-civic-blue/20"
            placeholder="경남 진주시 ..."
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
            placeholder="name@example.com"
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

      <div className="grid gap-3 rounded-2xl bg-navy-50 p-4">
        <label className="flex items-start gap-3 text-sm font-bold leading-6 text-slate-700">
          <input
            required
            type="checkbox"
            checked={form.consent}
            onChange={(event) => updateField("consent", event.target.checked)}
            className="mt-1 h-4 w-4 rounded border-slate-300 text-civic-red"
          />
          개인정보 수집·이용에 동의합니다. 수집 항목은 이름, 전화번호, 주소, 이메일이며 민원·소통 안내 목적으로 사용됩니다.
        </label>
        <label className="flex items-start gap-3 text-sm font-bold leading-6 text-slate-700">
          <input
            required
            type="checkbox"
            checked={form.politicalConsent}
            onChange={(event) => updateField("politicalConsent", event.target.checked)}
            className="mt-1 h-4 w-4 rounded border-slate-300 text-civic-red"
          />
          당원 여부는 정치적 견해와 관련될 수 있는 민감정보이므로 별도 수집·처리에 동의합니다.
        </label>
      </div>

      <button
        type="submit"
        disabled={state === "loading"}
        className="min-h-13 rounded-full bg-civic-red px-6 py-4 text-sm font-black text-white shadow-civic transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        {state === "loading" ? "Google 로그인 및 저장 중..." : "Google로 로그인하고 신청하기"}
      </button>

      {message ? (
        <p className={state === "success" ? "text-sm font-black text-civic-blue" : "text-sm font-black text-civic-red"}>
          {message}
        </p>
      ) : null}
    </form>
  );
}
