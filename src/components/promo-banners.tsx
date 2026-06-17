import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Check,
  MoreHorizontal,
  MousePointer2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

/* ---- avatar helpers ---------------------------------------------------- */

const avatarTones = [
  "from-[#2D5BD8] to-[#0A2A7A]",
  "from-slate-500 to-slate-800",
  "from-zinc-600 to-zinc-900",
  "from-[#3B6FE6] to-[#13245C]",
  "from-stone-500 to-stone-800",
];

function Avatar({
  initials,
  tone,
  className,
}: {
  initials: string;
  tone: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-gradient-to-br font-display font-semibold text-white",
        avatarTones[tone % avatarTones.length],
        className
      )}
    >
      {initials}
    </div>
  );
}

/* ---- pod cluster (banner A) -------------------------------------------- */

const pod = [
  { name: "Marisol", role: "AI Strategist", initials: "MR" },
  { name: "Daniel", role: "Automation Eng.", initials: "DA" },
  { name: "Priya", role: "Product Designer", initials: "PR" },
];

function PodCluster() {
  return (
    <div className="relative mx-auto h-[300px] w-full max-w-sm">
      {/* chat pill */}
      <div className="absolute left-1/2 top-0 z-30 flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 backdrop-blur-sm">
        <MoreHorizontal className="size-4 text-white/80" />
      </div>

      {/* back-left */}
      <div className="absolute left-2 top-14 z-10 w-40 -rotate-6 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm">
        <Avatar initials={pod[1].initials} tone={1} className="h-28 w-full rounded-xl text-2xl" />
      </div>
      {/* back-right */}
      <div className="absolute right-2 top-14 z-10 w-40 rotate-6 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm">
        <Avatar initials={pod[2].initials} tone={3} className="h-28 w-full rounded-xl text-2xl" />
      </div>

      {/* featured */}
      <div className="absolute left-1/2 top-10 z-20 w-48 -translate-x-1/2 rounded-2xl border border-white/15 bg-white/10 p-3 shadow-2xl backdrop-blur-md">
        <Avatar initials={pod[0].initials} tone={0} className="h-44 w-full rounded-xl text-4xl" />
        <div className="mt-3 flex items-center gap-2 rounded-xl bg-white p-2.5">
          <Avatar initials={pod[0].initials} tone={0} className="size-8 rounded-lg text-xs" />
          <div className="leading-tight">
            <div className="text-sm font-semibold text-ink">{pod[0].name}</div>
            <div className="text-[11px] text-muted-foreground">{pod[0].role}</div>
          </div>
        </div>
      </div>

      {/* cursor */}
      <MousePointer2 className="absolute bottom-6 right-10 z-30 size-7 fill-electric text-electric drop-shadow-lg" />
    </div>
  );
}

/* ---- specialists row (banner B) --------------------------------------- */

const specialists = [
  { name: "Lucas Vega", role: "Voice AI Lead", initials: "LV", rot: "-rotate-6" },
  { name: "Ana Ruiz", role: "Growth Lead", initials: "AR", rot: "rotate-3" },
  { name: "Marco Díaz", role: "AI Engineer", initials: "MD", rot: "rotate-0" },
  { name: "Sofía León", role: "Creative Dir.", initials: "SL", rot: "-rotate-3" },
  { name: "Tomás Rey", role: "Data Lead", initials: "TR", rot: "rotate-6" },
];

function SpecialistsRow() {
  return (
    <div className="flex items-end justify-center">
      {specialists.map((s, i) => {
        const featured = i === 2;
        return (
          <div
            key={s.name}
            className={cn(
              "relative -ml-3 first:ml-0",
              s.rot,
              featured ? "z-20 -translate-y-3" : "z-10"
            )}
          >
            <div
              className={cn(
                "relative w-24 overflow-hidden rounded-2xl border border-white/15 bg-charcoal shadow-xl sm:w-28",
                featured && "ring-2 ring-electric/60"
              )}
            >
              <Avatar
                initials={s.initials}
                tone={i}
                className="h-32 w-full text-3xl sm:h-36"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/95 to-transparent p-2.5 pt-6">
                <div className="text-[11px] font-semibold leading-tight text-white">
                  {s.name}
                </div>
                <div className="text-[10px] leading-tight text-white/60">
                  {s.role}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---- banners ----------------------------------------------------------- */

export function PromoBanners() {
  return (
    <div className="container-tight space-y-6 py-10">
      {/* Banner A — assign the pod */}
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#10316F] via-[#0B1F4D] to-ink p-8 text-white sm:p-12 lg:p-14">
          <div className="bg-grid-dark absolute inset-0 opacity-30" />
          <div className="absolute -right-24 top-1/2 size-80 -translate-y-1/2 rounded-full bg-electric/10 blur-3xl" />
          <div className="relative grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="eyebrow text-white/55">
                <span className="size-1.5 rounded-full bg-electric" />
                TopDoerr Pods
              </span>
              <h3 className="mt-4 font-display text-3xl font-semibold leading-[1.1] tracking-tight text-balance sm:text-4xl">
                Let TopDoerr assign the right pod for you
              </h3>
              <ul className="mt-6 space-y-3">
                {[
                  "We source, scope, and assign the right internal team",
                  "Get a clear scope, timeline, and price",
                  "Delivered under one standard with human review",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-2.5 text-sm text-white/80">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-electric text-white">
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    {line}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap items-center gap-5">
                <Button asChild variant="invert">
                  <Link href="/how-it-works">
                    See how delivery works
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <span className="flex items-center gap-2 text-sm text-white/70">
                  <ShieldCheck className="size-4 text-electric" />
                  100% human-reviewed delivery
                </span>
              </div>
            </div>
            <PodCluster />
          </div>
        </div>
      </Reveal>

      {/* Banner B — the managed AI era */}
      <Reveal delay={0.05}>
        <div className="relative overflow-hidden rounded-[2rem] bg-ink p-8 text-white sm:p-12 lg:p-14">
          <div className="bg-grid-dark absolute inset-0 opacity-25" />
          <div className="relative grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h3 className="font-display text-3xl font-semibold leading-[1.1] tracking-tight text-balance sm:text-4xl">
                The managed AI era has arrived
              </h3>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-white/65 sm:text-base">
                From idea to deployed AI system, work with TopDoerr&apos;s internal
                strategists, builders, designers, engineers, and AI agents to ship
                outcomes that drive real impact.
              </p>
              <Button asChild variant="invert" className="mt-8">
                <Link href="/start">
                  Start a Project
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
            <SpecialistsRow />
          </div>
        </div>
      </Reveal>
    </div>
  );
}
