type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light"
}: SectionHeaderProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? (
        <p
          className={
            tone === "dark"
              ? "mb-3 text-sm font-bold uppercase tracking-[0.16em] text-white/68"
              : "mb-3 text-sm font-bold uppercase tracking-[0.16em] text-civic-red"
          }
        >
          {eyebrow}
        </p>
      ) : null}
      <h2 className={tone === "dark" ? "text-3xl font-bold text-white sm:text-4xl" : "text-3xl font-bold text-navy-900 sm:text-4xl"}>
        {title}
      </h2>
      {description ? (
        <p
          className={
            tone === "dark"
              ? "mt-4 text-base leading-7 text-white/72 sm:text-lg"
              : "mt-4 text-base leading-7 text-slate-600 sm:text-lg"
          }
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
