import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const tones = [
  "from-[#2D5BD8] to-[#0A2A7A]",
  "from-charcoal to-ink",
  "from-slate-600 to-slate-900",
  "from-[#3B6FE6] to-[#13245C]",
  "from-stone-400 to-stone-700",
  "from-zinc-700 to-zinc-950",
];

export function OutcomeCard({
  label,
  vertical,
  icon: Icon,
  index,
}: {
  label: string;
  vertical: string;
  icon: LucideIcon;
  index: number;
}) {
  const tone = tones[index % tones.length];
  return (
    <Link
      href={`/marketplace/${vertical}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-[0_24px_60px_-30px_rgba(10,10,11,0.4)]"
    >
      {/* Visual thumbnail */}
      <div
        className={cn(
          "relative h-36 overflow-hidden bg-gradient-to-br",
          tone
        )}
      >
        <div className="bg-grid-dark absolute inset-0 opacity-40" />
        {/* large ghost icon */}
        <Icon
          className="absolute -right-3 -bottom-3 size-28 text-white/10 transition-transform duration-500 group-hover:scale-110"
          strokeWidth={1.25}
        />
        {/* foreground icon chip */}
        <span className="absolute left-4 top-4 inline-flex size-10 items-center justify-center rounded-xl border border-white/20 bg-white/15 text-white backdrop-blur-sm">
          <Icon className="size-5" />
        </span>
      </div>

      {/* Body */}
      <div className="flex items-center justify-between gap-2 px-5 py-4">
        <span className="text-sm font-semibold leading-snug">{label}</span>
        <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
      </div>
    </Link>
  );
}
