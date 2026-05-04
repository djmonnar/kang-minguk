import { ProposalBoard } from "@/components/ProposalBoard";
import { SectionHeader } from "@/components/SectionHeader";

export function CitizenParticipation() {
  return (
    <section id="participation" className="bg-slate-50 px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Citizen Participation"
          title="민원·제안하기"
          description="소통회원으로 로그인한 주민이 비공개로 민원과 정책 제안을 남길 수 있습니다."
        />

        <div className="mt-10">
          <ProposalBoard />
        </div>
      </div>
    </section>
  );
}
