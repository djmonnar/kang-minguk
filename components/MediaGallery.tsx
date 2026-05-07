"use client";

import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { getFirebaseDb } from "@/lib/firebase";
import { news } from "@/lib/data";
import { SectionHeader } from "@/components/SectionHeader";
import { SourceBadge, getSourceActionLabel } from "@/components/SourceBadge";

type TimestampLike = {
  seconds: number;
};

type AlbumPost = {
  id: string;
  title: string;
  caption: string;
  imageUrl: string;
  published: boolean;
  createdAt?: TimestampLike;
};

function formatDate(value?: TimestampLike) {
  if (!value?.seconds) {
    return "";
  }

  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date(value.seconds * 1000));
}

export function MediaGallery() {
  const [albumPosts, setAlbumPosts] = useState<AlbumPost[]>([]);

  useEffect(() => {
    let mounted = true;

    async function loadAlbums() {
      try {
        const db = getFirebaseDb();
        const snapshot = await getDocs(query(collection(db, "albumPosts"), where("published", "==", true), limit(30)));
        const nextPosts = snapshot.docs.map((item) => ({
          id: item.id,
          ...(item.data() as Omit<AlbumPost, "id">)
        }));

        nextPosts.sort((a, b) => (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0));

        if (mounted) {
          setAlbumPosts(nextPosts);
        }
      } catch {
        if (mounted) {
          setAlbumPosts([]);
        }
      }
    }

    loadAlbums();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="bg-white px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Media"
          title="보도자료·사진자료"
          description="공식 발표, 현장 사진, 공지사항을 한 곳에서 확인할 수 있습니다."
        />

        {albumPosts.length ? (
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {albumPosts.map((item) => (
              <article key={item.id} className="group civic-card civic-card-hover overflow-hidden">
                <div className="relative aspect-[16/9] bg-slate-100">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-bold text-civic-red">사진자료</span>
                    <time className="text-xs font-semibold text-slate-500">{formatDate(item.createdAt)}</time>
                  </div>
                  <h3 className="mt-3 text-lg font-black leading-7 text-navy-900">{item.title}</h3>
                  <p className="mt-3 line-clamp-3 text-sm font-bold leading-6 text-slate-600">{item.caption}</p>
                </div>
              </article>
            ))}
          </div>
        ) : null}

        <div className={albumPosts.length ? "mt-10 grid gap-5 lg:grid-cols-3" : "mt-10 grid gap-5 lg:grid-cols-3"}>
          {news.map((item) => (
            <article key={item.id} className="group civic-card civic-card-hover overflow-hidden">
              <div className="relative aspect-[16/9] bg-slate-100">
                <img
                  src={item.thumbnail}
                  alt={`${item.title} 썸네일`}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-bold text-civic-red">{item.category}</span>
                  <time className="text-xs font-semibold text-slate-500" dateTime={item.date}>
                    {item.date}
                  </time>
                </div>
                <div className="mt-3 flex">
                  <SourceBadge sourceType={item.sourceType} sourceName={item.sourceName} />
                </div>
                <h3 className="mt-3 text-lg font-black leading-7 text-navy-900">{item.title}</h3>
                {item.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex rounded-md text-sm font-bold text-navy-900 focus:outline-none focus:ring-2 focus:ring-civic-blue focus:ring-offset-2"
                    aria-label={`${item.title} ${getSourceActionLabel(item.sourceType)}`}
                  >
                    {getSourceActionLabel(item.sourceType)}
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
