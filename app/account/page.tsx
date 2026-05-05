import { AccountSettings } from "@/components/AccountSettings";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";

export default function AccountPage() {
  return (
    <main className="pb-28 md:pb-0">
      <PageHero
        eyebrow="My Page"
        title="내 정보 설정"
        description="소통회원 연락처, 주소, 이메일, 당원 여부 등 민원 안내에 필요한 정보를 관리합니다."
      />
      <AccountSettings />
      <Footer />
    </main>
  );
}
