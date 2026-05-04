import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "국회의원 강민국 공식 의정활동 홈페이지",
  description: "경남 진주시을 국회의원 강민국의 의정활동, 정책현황, 진주 소통지도 MVP"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
