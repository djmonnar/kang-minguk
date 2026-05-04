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
  field: withBasePath("/images/field.png")
} as const;
