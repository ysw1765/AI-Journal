import Link from "next/link";

export function Header() {
  return (
    <header className="site-header">
      <Link href="/" className="brand">
        AI Diary
      </Link>
      <nav className="site-nav">
        <Link href="/upload">上传</Link>
        <Link href="/diaries">日记</Link>
      </nav>
    </header>
  );
}
