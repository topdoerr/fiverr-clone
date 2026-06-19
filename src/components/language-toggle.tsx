"use client";

import { Globe } from "lucide-react";
import { useLocale } from "@/lib/i18n/client";
import { cn } from "@/lib/utils";

export function LanguageToggle({ className }: { className?: string }) {
  const { locale, setLocale } = useLocale();
  return (
    <button
      onClick={() => setLocale(locale === "es" ? "en" : "es")}
      aria-label="Toggle language"
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground",
        className
      )}
    >
      <Globe className="size-3.5" />
      {locale === "es" ? "ES" : "EN"}
    </button>
  );
}
