"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/dashboard/store";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { isAuthed, hydrated } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (hydrated && !isAuthed) {
      router.replace("/login");
    }
  }, [hydrated, isAuthed, router]);

  if (!hydrated || !isAuthed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <div className="size-6 animate-spin rounded-full border-2 border-forest/20 border-t-forest" />
      </div>
    );
  }

  return <DashboardShell>{children}</DashboardShell>;
}
