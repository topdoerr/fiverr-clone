import { Check, X } from "lucide-react";
import { comparison } from "@/lib/data";
import { Reveal } from "@/components/reveal";

export function ComparisonTable() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Reveal>
        <div className="h-full rounded-2xl border border-border bg-secondary/40 p-7">
          <h3 className="font-display text-lg font-semibold text-muted-foreground">
            Freelance marketplace
          </h3>
          <ul className="mt-5 space-y-3.5">
            {comparison.map((row) => (
              <li
                key={row.freelance}
                className="flex items-center gap-3 text-sm text-muted-foreground"
              >
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-foreground/5">
                  <X className="size-3" />
                </span>
                {row.freelance}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="relative h-full overflow-hidden rounded-2xl border border-foreground/15 bg-ink p-7 text-white">
          <div className="absolute -right-10 -top-10 size-40 rounded-full bg-electric/20 blur-3xl" />
          <h3 className="relative font-display text-lg font-semibold text-white">
            TopDoerr
          </h3>
          <ul className="relative mt-5 space-y-3.5">
            {comparison.map((row) => (
              <li
                key={row.topdoerr}
                className="flex items-center gap-3 text-sm text-white/90"
              >
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-electric text-white">
                  <Check className="size-3" strokeWidth={3} />
                </span>
                {row.topdoerr}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </div>
  );
}
