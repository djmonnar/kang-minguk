import activitiesData from "@/data/activities.json";
import newsData from "@/data/news.json";
import policiesData from "@/data/policies.json";

export type ActivityCategory =
  | "현장방문"
  | "민원"
  | "정책"
  | "예산"
  | "입법"
  | "일정";

export type Activity = {
  id: string;
  title: string;
  category: ActivityCategory;
  district: string;
  date: string;
  summary: string;
  image: string;
  lat: number;
  lng: number;
  sourceUrl: string;
  status: string;
};

export type Policy = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  relatedActivities: string[];
};

export type NewsItem = {
  id: string;
  title: string;
  date: string;
  category: string;
  thumbnail: string;
  url: string;
};

export const activities = activitiesData as Activity[];
export const policies = policiesData as Policy[];
export const news = newsData as NewsItem[];

export const districts = [
  "진성면",
  "일반성면",
  "이반성면",
  "사봉면",
  "지수면",
  "대곡면",
  "금산면",
  "집현면",
  "미천면",
  "중앙동",
  "상봉동",
  "상대동",
  "하대동",
  "상평동",
  "초장동"
];

export const activityFilters = [
  "전체",
  "현장방문",
  "민원",
  "정책",
  "예산",
  "입법",
  "일정"
] as const;
