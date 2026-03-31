import { DiaryViewer } from "@/components/diary/DiaryViewer";

export default function DiaryDetailPage({
  params,
}: {
  params: { diaryId: string };
}) {
  return (
    <section className="page-card">
      <p className="eyebrow">Diary Detail</p>
      <h1>日记 #{params.diaryId}</h1>
      <DiaryViewer diaryId={params.diaryId} />
    </section>
  );
}
