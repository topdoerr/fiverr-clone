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
      className="group flex h-full w-full flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-md"
    >
      <span className="flex size-11 items-center justify-center rounded-xl bg-secondary text-foreground transition-colors group-hover:bg-electric/15 group-hover:text-electric">
        <Icon className="size-6" strokeWidth={1.75} />
      </span>
      <span className="text-sm font-medium leading-snug text-foreground">
        {label}
      </span>
    </Link>
  );
}
