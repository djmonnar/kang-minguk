"use client";

import Link from "next/link";
import { addDoc, collection, doc, getDoc, getDocs, limit, query, serverTimestamp, where } from "firebase/firestore";
import { signInWithPopup } from "firebase/auth";
import { FormEvent, useState } from "react";
import { getFirebaseAuth, getFirebaseDb, googleProvider } from "@/lib/firebase";

type ProposalItem = {
  id: string;
  title: string;
  category: string;
  status: string;
  createdAt?: { seconds: number };
};

const categories = ["생활민원", "교통·안전", "지역경제", "교육·복지", "정책제안", "기타"];

export function ProposalBoard() {
  const [uid, setUid] = useState("");
  const [isMember, setIsMember] = useState(false);
  const [items, setItems] = useState<ProposalItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    title: "",
    category: categories[0],
    content: ""
  });

  async function loadMyProposals(currentUid: string) {
    const db = getFirebaseDb();
    const snapshot = await getDocs(query(collection(db, "proposals"), where("uid", "==", currentUid), limit(30)));
    const nextItems = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<ProposalItem, "id">)
    }));

    nextItems.sort((a, b) => (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0));
    setItems(nextItems);
  }

  async function handleLogin() {
    try {
      setLoading(true);
      setMessage("");
      const auth = getFirebaseAuth();
      const result = await signInWithPopup(auth, googleProvider);
      const db = getFirebaseDb();
      const memberDoc = await getDoc(doc(db, "members", result.user.uid));

      setUid(result.user.uid);
      setIsMember(memberDoc.exists());

      if (!memberDoc.exists()) {
        setMessage("소통회원 가입 후 민원·제안을 작성할 수 있습니다.");
        return;
      }

      await loadMyProposals(result.user.uid);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "로그인 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!uid || !isMember) {
      setMessage("소통회원 로그인 후 작성할 수 있습니다.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      const db = getFirebaseDb();

      await addDoc(collection(db, "proposals"), {
        uid,
        title: form.title.trim(),
        category: form.category,
        content: form.content.trim(),
        status: "접수",
        private: true,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      setForm({ title: "", category: categories[0], content: "" });
      setMessage("비공개 민원·제안이 접수되었습니다.");
      await loadMyProposals(uid);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "접수 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
      <section className="rounded-[2rem] bg-navy-900 p-6 text-white shadow-civic sm:p-8">
        <p className="text-sm font-black uppercase tracking-[0.24em] text-red-100">Private Board</p>
        <h2 className="mt-3 text-3xl font-black">비공개 민원·제안 게시판</h2>
        <p className="mt-4 text-sm font-bold leading-7 text-white/74">
          작성한 내용은 본인과 관리자만 확인할 수 있도록 Firestore 규칙을 분리했습니다.
        </p>
        <div className="mt-6 grid gap-3 text-sm font-bold leading-6 text-white/82">
          <div className="rounded-2xl border border-white/10 bg-white/10 p-4">소통회원 가입 후 작성할 수 있습니다.</div>
          <div className="rounded-2xl border border-white/10 bg-white/10 p-4">게시글은 공개 목록에 노출되지 않습니다.</div>
          <div className="rounded-2xl border border-white/10 bg-white/10 p-4">관리자 계정만 전체 민원을 확인할 수 있습니다.</div>
        </div>

        <button
          type="button"
          onClick={handleLogin}
          disabled={loading}
          className="mt-7 min-h-12 w-full rounded-full bg-white px-5 text-sm font-black text-navy-900 transition hover:bg-red-100 disabled:bg-slate-300"
        >
          Google로 회원 확인하기
        </button>

        {!isMember && uid ? (
          <Link href="/signup" className="mt-3 flex min-h-12 items-center justify-center rounded-full border border-white/20 px-5 text-sm font-black text-white">
            소통회원 가입으로 이동
          </Link>
        ) : null}
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-civic sm:p-8">
        <form onSubmit={handleSubmit} className="grid gap-4">
          <label className="grid gap-2 text-sm font-black text-navy-900">
            제목
            <input
              required
              value={form.title}
              onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
              className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-bold outline-none focus:border-civic-blue focus:ring-2 focus:ring-civic-blue/20"
              placeholder="제목을 입력하세요"
            />
          </label>

          <label className="grid gap-2 text-sm font-black text-navy-900">
            분야
            <select
              value={form.category}
              onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}
              className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-bold outline-none focus:border-civic-blue focus:ring-2 focus:ring-civic-blue/20"
            >
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </label>

          <label className="grid gap-2 text-sm font-black text-navy-900">
            내용
            <textarea
              required
              rows={8}
              value={form.content}
              onChange={(event) => setForm((current) => ({ ...current, content: event.target.value }))}
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold leading-6 outline-none focus:border-civic-blue focus:ring-2 focus:ring-civic-blue/20"
              placeholder="민원 또는 정책 제안 내용을 입력하세요"
            />
          </label>

          <button
            type="submit"
            disabled={loading || !isMember}
            className="min-h-12 rounded-full bg-civic-red px-5 text-sm font-black text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            비공개로 접수하기
          </button>
        </form>

        {message ? <p className="mt-4 text-sm font-black text-civic-red">{message}</p> : null}

        <div className="mt-8 border-t border-slate-200 pt-6">
          <h3 className="text-lg font-black text-navy-900">내 접수 내역</h3>
          <div className="mt-4 grid gap-3">
            {items.length ? items.map((item) => (
              <article key={item.id} className="rounded-2xl bg-navy-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-civic-red">{item.category}</span>
                  <span className="text-xs font-black text-navy-900">{item.status}</span>
                </div>
                <h4 className="mt-3 text-sm font-black text-navy-900">{item.title}</h4>
              </article>
            )) : (
              <p className="rounded-2xl bg-slate-50 p-4 text-sm font-bold text-slate-600">
                로그인 후 작성한 민원·제안 내역이 표시됩니다.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
