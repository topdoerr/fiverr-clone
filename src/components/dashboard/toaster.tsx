"use client";

import { CheckCircle2, X } from "lucide-react";
import { useApp } from "@/lib/dashboard/store";

export function Toaster() {
  const { toasts, dismissToast } = useApp();
  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-[100] flex w-full max-w-sm flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto flex items-start gap-3 rounded-xl border border-forest/10 bg-forest px-4 py-3 text-cream shadow-2xl"
        >
          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-lime" />
          <p className="flex-1 text-sm">{t.message}</p>
          <button
            onClick={() => dismissToast(t.id)}
            className="text-cream/60 hover:text-cream"
            aria-label="Dismiss"
          >
            <X className="size-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
