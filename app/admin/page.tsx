import { AdminDashboard } from "@/components/AdminDashboard";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";

export default function AdminPage() {
  return (
    <main className="pb-28 md:pb-0">
      <PageHero
        eyebrow="Admin"
        title="관리자 게시판"
        description="관리자 계정으로 공지사항과 소식을 작성하고 비공개 민원·제안을 확인합니다."
      />
      <AdminDashboard />
      <Footer />
    </main>
  );
}
