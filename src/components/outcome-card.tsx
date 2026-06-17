import Link from "next/link";
import { type LucideIcon } from "lucide-react";

export function OutcomeCard({
  label,
  vertical,
  icon: Icon,
}: {
  label: string;
  vertical: string;
  icon: LucideIcon;
}) {
  return (
    <Link
      href={`/marketplace/${vertical}`}
      className="group relative flex h-full w-full flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-electric/40 hover:shadow-md"
    >
      {/* Hover gradient wash */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-electric/5 via-electric/10 to-electric/25 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <span className="relative flex size-11 items-center justify-center rounded-xl bg-secondary text-foreground transition-colors group-hover:bg-electric/20 group-hover:text-electric">
        <Icon className="size-6" strokeWidth={1.75} />
      </span>
      <span className="relative text-sm font-medium leading-snug text-foreground">
        {label}
      </span>
    </Link>
  );
}
