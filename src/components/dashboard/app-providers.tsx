"use client";

import type { ReactNode } from "react";
import { AppProvider } from "@/lib/dashboard/store";
import { Toaster } from "@/components/dashboard/toaster";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AppProvider>
      {children}
      <Toaster />
    </AppProvider>
  );
}
