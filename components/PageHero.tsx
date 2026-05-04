import Image from "next/image";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
};

export function PageHero({ eyebrow, title, description, imageSrc, imageAlt = "" }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-navy-900 px-5 py-16 text-white sm:px-8 lg:px-10 lg:py-20">
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.26]"
        />
      ) : null}
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(0,27,68,0.96),rgba(0,78,162,0.82)_58%,rgba(230,30,43,0.62))]" />
      <div className="relative mx-auto max-w-7xl">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-red-100">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-sm font-bold leading-7 text-white/76 sm:text-base">{description}</p>
      </div>
    </section>
  );
}
