import { DiaryCard } from "@/components/diary/DiaryCard";

const mockItems = [
  { id: "demo-1", title: "第一次 AI 日记", date: "2026-03-29" },
  { id: "demo-2", title: "雨后散步的照片", date: "2026-03-28" },
];

export function DiaryList() {
  return (
    <div className="link-grid">
      {mockItems.map((item) => (
        <DiaryCard key={item.id} id={item.id} title={item.title} date={item.date} />
      ))}
    </div>
  );
}
