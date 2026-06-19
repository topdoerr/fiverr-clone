"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { statusConfig } from "@/lib/dashboard/status";
import type { ProjectStatus } from "@/lib/dashboard/types";
import { useT } from "@/lib/i18n/client";
import { cn } from "@/lib/utils";

export function ProgressBar({
  value,
  toneClass = "bg-cobalt",
  className,
}: {
  value: number;
  toneClass?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "h-2 w-full overflow-hidden rounded-full bg-forest/10",
        className
      )}
    >
      <div
        className={cn("h-full rounded-full transition-all duration-500", toneClass)}
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}

export function StatusBadge({ status }: { status: ProjectStatus }) {
  const c = statusConfig[status];
  const t = useT();
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-medium",
        c.className
      )}
    >
      <span className="size-1.5 rounded-full bg-current opacity-70" />
      {t(status)}
    </span>
  );
}

export function MetricCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: ReactNode;
  icon?: LucideIcon;
}) {
  const t = useT();
  return (
    <div className="rounded-2xl border border-forest/10 bg-white p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-forest/60">{t(label)}</span>
        {Icon && <Icon className="size-4 text-forest/35" />}
      </div>
      <div className="mt-3 font-display text-3xl font-semibold text-forest">
        {value}
      </div>
    </div>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel = "Start a Project",
  actionHref = "/dashboard/briefs/new",
}: {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}) {
  const t = useT();
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-forest/15 bg-white/70 px-6 py-16 text-center">
      {Icon && (
        <div className="flex size-12 items-center justify-center rounded-full bg-cream">
          <Icon className="size-6 text-forest/50" />
        </div>
      )}
      <h3 className="mt-4 font-display text-lg font-semibold text-forest">
        {t(title)}
      </h3>
      <p className="mt-1 max-w-sm text-sm text-forest/60">{t(description)}</p>
      <Button asChild variant="lime" className="mt-6">
        <Link href={actionHref}>{t(actionLabel)}</Link>
      </Button>
    </div>
  );
}

export function Avatar({
  initials,
  className,
}: {
  initials: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "flex items-center justify-center rounded-full bg-cobalt font-display text-xs font-semibold text-white",
        className
      )}
    >
      {initials}
    </span>
  );
}
