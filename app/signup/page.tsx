import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { SignupForm } from "@/components/SignupForm";

export default function SignupPage() {
  return (
    <main className="pb-28 md:pb-0">
      <PageHero
        eyebrow="Citizen Membership"
        title="소통회원 가입"
        description="Google 로그인 후 이름, 연락처, 주소, 당원 여부를 입력해 지역 소통 안내를 신청할 수 있습니다."
      />
      <section className="bg-slate-50 px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="rounded-[2rem] bg-navy-900 p-6 text-white shadow-civic sm:p-8">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-red-100">Firebase Auth</p>
            <h2 className="mt-3 text-3xl font-black">Google 로그인 기반으로 시작합니다</h2>
            <p className="mt-4 text-sm font-bold leading-7 text-white/74">
              자체 비밀번호를 보관하지 않고 Google 인증 후 추가 정보를 Firestore에 저장하는 방식입니다.
            </p>
            <div className="mt-6 grid gap-3 text-sm font-bold leading-6 text-white/82">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">비밀번호 관리 부담을 줄입니다.</div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">전화번호와 주소는 별도 동의 후 저장합니다.</div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">당원 여부는 민감정보로 별도 동의가 필요합니다.</div>
            </div>
          </div>

          <SignupForm />
        </div>
      </section>
      <Footer />
    </main>
  );
}
