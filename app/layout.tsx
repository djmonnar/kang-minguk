import type { Metadata } from "next";
import { MobileFloatingBar } from "@/components/MobileFloatingBar";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const siteUrl = "https://xn--939anzp33a.com";
const title = "국회의원 강민국 공식 의정활동 홈페이지";
const description = "경남 진주시을 국회의원 강민국의 의정활동, 정책현황, 진주 소통지도";
const withSitePath = (path: string) => `${basePath}${path}`;
const absoluteUrl = (path: string) => `${siteUrl}${withSitePath(path)}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: "강민국",
  alternates: {
    canonical: absoluteUrl("/")
  },
  icons: {
    icon: [
      { url: withSitePath("/favicon.ico"), sizes: "32x32" },
      { url: withSitePath("/favicon-32.png"), type: "image/png", sizes: "32x32" },
      { url: withSitePath("/icon-192.png"), type: "image/png", sizes: "192x192" },
      { url: withSitePath("/icon-512.png"), type: "image/png", sizes: "512x512" }
    ],
    apple: [{ url: withSitePath("/apple-touch-icon.png"), sizes: "180x180" }]
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: absoluteUrl("/"),
    siteName: "국회의원 강민국",
    title,
    description,
    images: [
      {
        url: absoluteUrl("/images/link-preview.png"),
        width: 1200,
        height: 630,
        alt: "강한민국 대한민국 강민국"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [absoluteUrl("/images/link-preview.png")]
  },
  formatDetection: {
    telephone: true,
    address: true,
    email: true
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <SiteHeader />
        {children}
        <MobileFloatingBar />
      </body>
    </html>
  );
}
