import { Footer } from "@/components/Footer";
import { MediaGallery } from "@/components/MediaGallery";
import { PageHero } from "@/components/PageHero";

export default function MediaPage() {
  return (
    <main className="pb-28 md:pb-0">
      <PageHero
        eyebrow="Media"
        title="보도·사진자료"
        description="공식 발표, 현장 사진, 공지사항 성격의 자료를 분리해 확인할 수 있습니다."
      />
      <MediaGallery />
      <Footer />
    </main>
  );
}
