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
      className="group flex h-full w-full flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-md"
    >
      <span className="flex size-9 items-center justify-center rounded-lg bg-secondary text-foreground transition-colors group-hover:bg-electric/15 group-hover:text-electric">
        <Icon className="size-5" strokeWidth={1.75} />
      </span>
      <span className="text-xs font-medium leading-snug text-foreground">
        {label}
      </span>
    </Link>
  );
}
