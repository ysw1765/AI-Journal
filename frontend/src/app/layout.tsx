import "../styles/globals.css";
import type { Metadata } from "next";
import { AppFrame } from "@/components/common/AppFrame";

export const metadata: Metadata = {
  title: "Memory Universe",
  description: "Enter a surreal AI diary where memories bloom into conversations.",
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
