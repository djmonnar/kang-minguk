import Image from "next/image";
import { news } from "@/lib/data";
import { SectionHeader } from "@/components/SectionHeader";
import { SourceBadge, getSourceActionLabel } from "@/components/SourceBadge";

export function MediaGallery() {
  return (
    <section className="bg-white px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Media"
          title="보도자료·사진자료"
          description="공식 발표, 현장 사진, 공지사항을 한곳에서 확인할 수 있는 영역입니다."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {news.map((item) => (
            <article
              key={item.id}
              className="group civic-card civic-card-hover overflow-hidden"
            >
              <div className="relative aspect-[16/9] bg-slate-100">
                <Image
                  src={item.thumbnail}
                  alt={`${item.title} 썸네일`}
                  fill
                  sizes="(min-width: 1024px) 33vw, 90vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
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
