import { Footer } from "@/components/Footer";
import { LoginPanel } from "@/components/LoginPanel";
import { PageHero } from "@/components/PageHero";
import { imagePaths } from "@/lib/images";

export default function LoginPage() {
  return (
    <main className="pb-28 md:pb-0">
      <PageHero
        eyebrow="Login"
        title="소통회원 로그인"
        description="가입 시 사용한 Google 계정으로 로그인하고 민원·제안과 내 정보 설정을 이용하세요."
        imageSrc={imagePaths.civil}
        imageAlt="민원 소통 이미지"
      />
      <LoginPanel />
      <Footer />
    </main>
  );
}
