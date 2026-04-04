import { DiaryViewer } from "@/components/diary/DiaryViewer";

type DiaryDetailPageProps = {
  params: Promise<{ diaryId: string }>;
};

export default async function DiaryDetailPage({
  params,
}: DiaryDetailPageProps) {
  const { diaryId } = await params;

  return (
    <section className="page-card">
      <p className="eyebrow">Diary Detail</p>
      <h1>日记 #{diaryId}</h1>
      <DiaryViewer diaryId={diaryId} />
    </section>
  );
}
