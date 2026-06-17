import Link from "next/link";
import {
  ArrowRight,
  Workflow,
  PhoneCall,
  BarChart3,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

type Guide = {
  title: string;
  blurb: string;
  href: string;
  icon: LucideIcon;
  tone: string;
};

const guides: Guide[] = [
  {
    title: "Where to start with AI automation",
    blurb: "Map the workflows worth automating first.",
    href: "/marketplace/ai-automation",
    icon: Workflow,
    tone: "from-[#2D5BD8] to-[#0A2A7A]",
  },
  {
    title: "Launch your first AI voice agent",
    blurb: "From call flow to a live, human-sounding agent.",
    href: "/marketplace/ai-voice-agents",
    icon: PhoneCall,
    tone: "from-slate-600 to-slate-900",
  },
  {
    title: "Turn spreadsheets into live dashboards",
    blurb: "Make your data decision-ready.",
    href: "/marketplace/data-intelligence",
    icon: BarChart3,
    tone: "from-stone-500 to-stone-800",
  },
];

export function GuidesSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-tight">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Guides to help you grow
          </h2>
          <Link
            href="/how-it-works"
            className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            See more guides
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {guides.map((guide, i) => {
            const Icon = guide.icon;
            return (
              <Reveal key={guide.title} delay={i * 0.06}>
                <Link href={guide.href} className="group block">
                  <div
                    className={cn(
                      "relative h-52 overflow-hidden rounded-2xl bg-gradient-to-br",
                      guide.tone
                    )}
                  >
                    <div className="bg-grid-dark absolute inset-0 opacity-40" />
                    <Icon
                      className="absolute -bottom-4 -right-4 size-40 text-white/10 transition-transform duration-500 group-hover:scale-105"
                      strokeWidth={1.1}
                    />
                    {/* faux content card */}
                    <div className="absolute left-5 top-5 right-16 rounded-xl border border-white/15 bg-white/10 p-3 backdrop-blur-sm">
                      <span className="flex size-9 items-center justify-center rounded-lg bg-white/15 text-white">
                        <Icon className="size-5" />
                      </span>
                      <div className="mt-3 h-2 w-2/3 rounded-full bg-white/25" />
                      <div className="mt-1.5 h-2 w-1/2 rounded-full bg-white/15" />
                    </div>
                  </div>
                  <h3 className="mt-3 text-sm font-semibold text-foreground group-hover:underline">
                    {guide.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {guide.blurb}
                  </p>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
