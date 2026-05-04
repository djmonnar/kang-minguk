"use client";

import Link from "next/link";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { getFirebaseDb } from "@/lib/firebase";

type NewsPost = {
  id: string;
  title: string;
  category: string;
  summary: string;
  createdAt?: { seconds: number };
};

export function NewsPreview() {
  const [posts, setPosts] = useState<NewsPost[]>([]);

  useEffect(() => {
    let mounted = true;

    async function loadPosts() {
      try {
        const db = getFirebaseDb();
        const snapshot = await getDocs(query(collection(db, "newsPosts"), where("published", "==", true), limit(6)));
        const nextPosts = snapshot.docs.map((item) => ({
          id: item.id,
          ...(item.data() as Omit<NewsPost, "id">)
        }));

        nextPosts.sort((a, b) => (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0));

        if (mounted) {
          setPosts(nextPosts.slice(0, 3));
        }
      } catch {
        if (mounted) {
          setPosts([]);
        }
      }
    }

    loadPosts();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="bg-white px-5 py-12 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-civic-red">Notice</p>
            <h2 className="mt-2 text-2xl font-black text-navy-900 sm:text-3xl">최근 소식</h2>
          </div>
          <Link href="/media" className="text-sm font-black text-navy-900 transition hover:text-civic-red">
            전체 보기 →
          </Link>
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {posts.length ? posts.map((post) => (
            <article key={post.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <span className="rounded-full bg-navy-50 px-3 py-1 text-xs font-black text-civic-red">{post.category}</span>
              <h3 className="mt-4 line-clamp-2 text-lg font-black leading-7 text-navy-900">{post.title}</h3>
              <p className="mt-3 line-clamp-2 text-sm font-bold leading-6 text-slate-600">{post.summary}</p>
            </article>
          )) : (
            <article className="rounded-2xl border border-slate-200 bg-navy-50 p-5 md:col-span-3">
              <p className="text-sm font-black text-navy-900">등록된 공지사항과 소식이 이곳에 표시됩니다.</p>
            </article>
          )}
        </div>
      </div>
    </section>
  );
}
