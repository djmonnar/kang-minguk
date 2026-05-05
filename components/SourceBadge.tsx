import type { SourceType } from "@/lib/data";

const sourceLabels: Record<SourceType, string> = {
  official: "공식자료",
  press: "언론자료"
};

const sourceStyles: Record<SourceType, string> = {
  official: "bg-navy-900 text-white",
  press: "bg-slate-100 text-slate-700"
};

export function getSourceActionLabel(sourceType?: SourceType) {
  return sourceType === "official" ? "공식자료 보기" : "관련 기사 보기";
}

export function SourceBadge({
  sourceType,
  sourceName
}: {
  sourceType?: SourceType;
  sourceName?: string;
}) {
  if (!sourceType && !sourceName) return null;

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-black ${
        sourceStyles[sourceType ?? "press"]
      }`}
    >
      {sourceLabels[sourceType ?? "press"]}
      {sourceName ? <span className="ml-1 opacity-80">· {sourceName}</span> : null}
    </span>
  );
}
