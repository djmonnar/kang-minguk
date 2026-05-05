"use client";

import { addDoc, collection, doc, getDoc, getDocs, limit, query, serverTimestamp } from "firebase/firestore";
import { signInWithPopup } from "firebase/auth";
import { FormEvent, useState } from "react";
import { getFirebaseAuth, getFirebaseDb, googleProvider } from "@/lib/firebase";

type ProposalItem = {
  id: string;
  title: string;
  category: string;
  status: string;
  content: string;
  uid: string;
  createdAt?: { seconds: number };
};

export function AdminDashboard() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [proposals, setProposals] = useState<ProposalItem[]>([]);
  const [newsForm, setNewsForm] = useState({
    title: "",
    category: "공지사항",
    summary: "",
    content: "",
    published: true
  });

  async function loadProposals() {
    const db = getFirebaseDb();
    const snapshot = await getDocs(query(collection(db, "proposals"), limit(50)));
    const nextItems = snapshot.docs.map((item) => ({
      id: item.id,
      ...(item.data() as Omit<ProposalItem, "id">)
    }));

    nextItems.sort((a, b) => (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0));
    setProposals(nextItems);
  }

  async function handleAdminLogin() {
    try {
      setLoading(true);
      setMessage("");
      const auth = getFirebaseAuth();
      const result = await signInWithPopup(auth, googleProvider);
      const db = getFirebaseDb();
      const adminDoc = await getDoc(doc(db, "admins", result.user.uid));

      if (!adminDoc.exists()) {
        setIsAdmin(false);
        setMessage("관리자 권한이 등록되지 않은 계정입니다. 권한 설정을 확인해주세요.");
        return;
      }

      setIsAdmin(true);
      setMessage("관리자 인증이 완료되었습니다.");
      await loadProposals();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "관리자 로그인 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }

  async function handleNewsSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isAdmin) {
      setMessage("관리자 인증 후 작성할 수 있습니다.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      const db = getFirebaseDb();

      await addDoc(collection(db, "newsPosts"), {
        title: newsForm.title.trim(),
        category: newsForm.category,
        summary: newsForm.summary.trim(),
        content: newsForm.content.trim(),
        published: newsForm.published,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      setNewsForm({
        title: "",
        category: "공지사항",
        summary: "",
        content: "",
        published: true
      });
      setMessage("소식이 등록되었습니다.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "소식 등록 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-slate-50 px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="rounded-[2rem] bg-navy-900 p-6 text-white shadow-civic sm:p-8">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-red-100">Admin Console</p>
          <h2 className="mt-3 text-3xl font-black">관리자 게시판</h2>
          <p className="mt-4 text-sm font-bold leading-7 text-white/74">
            관리자 권한이 등록된 계정만 민원 확인과 소식 작성을 할 수 있습니다.
          </p>
          <button
            type="button"
            onClick={handleAdminLogin}
            disabled={loading}
            className="mt-7 min-h-12 w-full rounded-full bg-white px-5 text-sm font-black text-navy-900 transition hover:bg-red-100 disabled:bg-slate-300"
          >
            관리자 확인하기
          </button>
          {message ? <p className="mt-4 text-sm font-black text-red-100">{message}</p> : null}
        </aside>

        <div className="grid gap-6">
          <form onSubmit={handleNewsSubmit} className="grid gap-4 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-civic sm:p-8">
            <h3 className="text-2xl font-black text-navy-900">공지사항·소식 작성</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-black text-navy-900">
                제목
                <input
                  required
                  value={newsForm.title}
                  onChange={(event) => setNewsForm((current) => ({ ...current, title: event.target.value }))}
                  className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-bold outline-none focus:border-civic-blue focus:ring-2 focus:ring-civic-blue/20"
                />
              </label>
              <label className="grid gap-2 text-sm font-black text-navy-900">
                분류
                <select
                  value={newsForm.category}
                  onChange={(event) => setNewsForm((current) => ({ ...current, category: event.target.value }))}
                  className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-bold outline-none focus:border-civic-blue focus:ring-2 focus:ring-civic-blue/20"
                >
                  <option>공지사항</option>
                  <option>의정소식</option>
                  <option>지역소식</option>
                </select>
              </label>
            </div>
            <label className="grid gap-2 text-sm font-black text-navy-900">
              요약
              <input
                required
                value={newsForm.summary}
                onChange={(event) => setNewsForm((current) => ({ ...current, summary: event.target.value }))}
                className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-bold outline-none focus:border-civic-blue focus:ring-2 focus:ring-civic-blue/20"
              />
            </label>
            <label className="grid gap-2 text-sm font-black text-navy-900">
              내용
              <textarea
                required
                rows={7}
                value={newsForm.content}
                onChange={(event) => setNewsForm((current) => ({ ...current, content: event.target.value }))}
                className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold leading-6 outline-none focus:border-civic-blue focus:ring-2 focus:ring-civic-blue/20"
              />
            </label>
            <label className="flex items-center gap-3 text-sm font-bold text-slate-700">
              <input
                type="checkbox"
                checked={newsForm.published}
                onChange={(event) => setNewsForm((current) => ({ ...current, published: event.target.checked }))}
                className="h-4 w-4 rounded border-slate-300 text-civic-red"
              />
              공개 상태로 등록
            </label>
            <button
              type="submit"
              disabled={loading || !isAdmin}
              className="min-h-12 rounded-full bg-civic-red px-5 text-sm font-black text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              소식 등록하기
            </button>
          </form>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-civic sm:p-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-2xl font-black text-navy-900">비공개 민원·제안</h3>
              <button
                type="button"
                onClick={loadProposals}
                disabled={!isAdmin || loading}
                className="min-h-10 rounded-full border border-navy-900 px-4 text-xs font-black text-navy-900 disabled:border-slate-300 disabled:text-slate-400"
              >
                새로고침
              </button>
            </div>

            <div className="mt-5 grid gap-3">
              {proposals.length ? proposals.map((item) => (
                <article key={item.id} className="rounded-2xl bg-navy-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-civic-red">{item.category}</span>
                    <span className="text-xs font-black text-navy-900">{item.status}</span>
                  </div>
                  <h4 className="mt-3 text-sm font-black text-navy-900">{item.title}</h4>
                  <p className="mt-2 line-clamp-3 text-sm font-bold leading-6 text-slate-600">{item.content}</p>
                </article>
              )) : (
                <p className="rounded-2xl bg-slate-50 p-4 text-sm font-bold text-slate-600">
                  관리자 인증 후 접수된 민원·제안이 표시됩니다.
                </p>
              )}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
