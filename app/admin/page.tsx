import { AdminDashboard } from "@/components/AdminDashboard";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";

export default function AdminPage() {
  return (
    <main className="pb-28 md:pb-0">
      <PageHero
        eyebrow="Admin"
        title="관리자 콘솔"
        description="회원 정보, 민원 게시판, 앨범 사진과 공지사항을 한 곳에서 관리합니다."
      />
      <AdminDashboard />
      <Footer />
    </main>
  );
}
