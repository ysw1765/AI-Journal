import { DiaryList } from "@/components/diary/DiaryList";

export default function DiariesPage() {
  return (
    <section className="page-card">
      <p className="eyebrow">Diary</p>
      <h1>历史日记</h1>
      <DiaryList />
    </section>
  );
}
