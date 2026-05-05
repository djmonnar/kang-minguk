import Link from "next/link";
import Image from "next/image";
import { policies } from "@/lib/data";
import { SectionHeader } from "@/components/SectionHeader";
import { SourceBadge, getSourceActionLabel } from "@/components/SourceBadge";

export function PolicyCards() {
  return (
    <section id="policies" className="bg-white px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Policy Agenda"
          title="정책현황"
          description="국회 정무위원회 현안과 진주 지역 과제를 함께 연결해 관리합니다."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {policies.map((policy) => (
            <article
              key={policy.id}
              className="group civic-card civic-card-hover overflow-hidden"
            >
              <div className="relative aspect-[4/3] bg-navy-50">
                <Image
                  src={policy.image}
                  alt={`${policy.title} 정책 이미지`}
                  fill
                  sizes="(min-width: 1280px) 31vw, (min-width: 768px) 45vw, 90vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white/90 to-transparent" />
              </div>
              <div className="p-6 pt-5">
                <SourceBadge sourceType={policy.sourceType} sourceName={policy.sourceName} />
                <h3 className="mt-4 text-xl font-black leading-tight text-navy-900">{policy.title}</h3>
                <p className="mt-2 text-sm font-bold text-civic-blue">{policy.subtitle}</p>
                <p className="mt-4 text-sm leading-6 text-slate-600">{policy.description}</p>
                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-xs font-bold text-slate-500">
                    관련 활동 {policy.relatedActivities.length}건
                  </span>
                  {policy.sourceUrl?.startsWith("/") ? (
                    <Link
                      href={policy.sourceUrl}
                      className="rounded-md text-sm font-black text-navy-900 transition hover:text-civic-red focus:outline-none focus:ring-2 focus:ring-civic-blue focus:ring-offset-2"
                      aria-label={`${policy.title} ${getSourceActionLabel(policy.sourceType)}`}
                    >
                      {getSourceActionLabel(policy.sourceType)}
                    </Link>
                  ) : policy.sourceUrl ? (
                    <a
                      href={policy.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-md text-sm font-black text-navy-900 transition hover:text-civic-red focus:outline-none focus:ring-2 focus:ring-civic-blue focus:ring-offset-2"
                      aria-label={`${policy.title} ${getSourceActionLabel(policy.sourceType)}`}
                    >
                      {getSourceActionLabel(policy.sourceType)}
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
