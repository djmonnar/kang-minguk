import { withBasePath } from "@/lib/paths";

export const imagePaths = {
  hero: withBasePath("/images/hero.png"),
  heroCardNews: withBasePath("/images/hero-card-news.png"),
  marketGreeting: withBasePath("/images/market-greeting.png"),
  civil: withBasePath("/images/civil-complaint.png"),
  jinju: withBasePath("/images/jinju.png"),
  rail: withBasePath("/images/rail.png"),
  aerospace: withBasePath("/images/aerospace.png"),
  assembly: withBasePath("/images/assembly.png"),
  field: withBasePath("/images/field.png"),
  heroAssembly: withBasePath("/images/hero-assembly.png"),
  heroTitleWide: withBasePath("/images/hero-title-wide.png"),
  heroTitleMobile: withBasePath("/images/hero-title-mobile.png"),
  brandLogoWide: withBasePath("/images/brand-logo-wide.png"),
  brandLogoMobile: withBasePath("/images/brand-logo-mobile.png"),
  jinjuWide: withBasePath("/images/jinju-wide.png"),
  profileOfficial: withBasePath("/images/profile-official.png"),
  donationGuide: withBasePath("/images/donation-guide.png")
} as const;
