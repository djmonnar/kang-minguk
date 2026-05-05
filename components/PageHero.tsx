import Image from "next/image";
import { imagePaths } from "@/lib/images";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-navy-900 px-5 py-16 text-white sm:px-8 lg:px-10 lg:py-20">
      <Image
        src={imagePaths.heroAssembly}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-[0.2]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(0,27,68,0.98)_0%,rgba(0,78,162,0.88)_50%,rgba(230,30,43,0.58)_100%)]" />
      <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(circle_at_65%_45%,rgba(255,255,255,0.16),transparent_42%)] lg:block" />
      <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_360px] lg:items-center">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-red-100">{eyebrow}</p>
          <h1 className="mt-4 max-w-3xl text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-sm font-bold leading-7 text-white/76 sm:text-base">{description}</p>
        </div>
        <div className="hidden justify-end lg:flex">
          <div className="relative h-20 w-[340px] overflow-hidden rounded-2xl bg-white/8 p-2 ring-1 ring-white/10">
            <Image
              src={imagePaths.brandLogoMobile}
              alt="강한민국 대한민국 강민국"
              fill
              sizes="340px"
              className="object-contain object-right brightness-0 invert"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
