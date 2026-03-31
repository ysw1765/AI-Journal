import Link from "next/link";

export function DiaryCard({
  id,
  title,
  date,
}: {
  id: string;
  title: string;
  date: string;
}) {
  return (
    <Link href={`/diaries/${id}`} className="nav-card">
      <strong>{title}</strong>
      <span className="muted">{date}</span>
    </Link>
  );
}
