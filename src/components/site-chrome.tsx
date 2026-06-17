"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const BARE_PREFIXES = ["/dashboard", "/login", "/signup", "/onboarding"];

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const bare = BARE_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );

  if (bare) return <>{children}</>;

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
