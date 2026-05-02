"use client";

import { Footer } from "@/components/common/Footer";
import { Header } from "@/components/common/Header";
import { usePathname } from "next/navigation";

export function AppFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isImmersiveScene = pathname === "/" || pathname.startsWith("/chat/");
  const isAuthLanding = pathname === "/login";

  if (isImmersiveScene || isAuthLanding) {
    return children;
  }

  return (
    <div className="app-shell">
      <Header />
      <main className="app-main">{children}</main>
      <Footer />
    </div>
  );
}
