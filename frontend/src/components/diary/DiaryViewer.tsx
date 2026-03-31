export function DiaryViewer({ diaryId }: { diaryId: string }) {
  return (
    <article className="stack">
      <p className="muted">Diary ID: {diaryId}</p>
      <div className="placeholder-box">这里展示单篇日记内容和封面图。</div>
    </article>
  );
}
