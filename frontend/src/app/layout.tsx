import "../styles/globals.css";
import type { Metadata } from "next";
import { AppFrame } from "@/components/common/AppFrame";

export const metadata: Metadata = {
  title: "AI Diary",
  description: "Turn image conversations into structured diaries.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>
        <AppFrame>{children}</AppFrame>
      </body>
    </html>
  );
}
