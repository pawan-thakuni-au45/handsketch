// components/LayoutWrapper.tsx
"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Show header ONLY on the homepage
  const showHeader = pathname === "/";

  return (
    <>
      {showHeader && <Header />}
      {children}
    </>
  );
}
