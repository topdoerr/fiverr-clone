import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Play,
  Check,
  ShieldCheck,
  Workflow,
  Briefcase,
  PhoneCall,
  Bot,
  AppWindow,
  BarChart3,
  TrendingUp,
  ShieldCheck as ShieldIcon,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { CTASection } from "@/components/cta-section";
import { ScrollRow } from "@/components/marketplace/scroll-row";
import { verticals } from "@/lib/data";
import { cn } from "@/lib/utils";
import { getT } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "Explore AI Services",
  description:
    "Browse AI services like a marketplace — delivered by internal experts and AI agents. No random freelancers.",
};

const exploreGroups: {
  title: string;
  tone: string;
  icons: LucideIcon[];
  links: { label: string; href: string }[];
}[] = [
  {
    title: "Automate & operate",
    tone: "from-[#2D5BD8] to-[#0A2A7A]",
    icons: [Workflow, Briefcase],
    links: [
      { label: "AI Automation", href: "/marketplace/ai-automation" },
      { label: "AI Business Operations", href: "/marketplace/ai-business-operations" },
      { label: "CRM automation", href: "/marketplace/ai-automation" },
      { label: "Workflow automation", href: "/marketplace/ai-automation" },
      { label: "SOP automation", href: "/marketplace/ai-business-operations" },
    ],
  },
  {
    title: "Agents & assistants",
    tone: "from-slate-600 to-slate-900",
    icons: [PhoneCall, Bot],
    links: [
      { label: "AI Voice Agents", href: "/marketplace/ai-voice-agents" },
      { label: "AI Chatbots & Assistants", href: "/marketplace/ai-chatbots" },
      { label: "Appointment booking agents", href: "/marketplace/ai-voice-agents" },
      { label: "Website chatbot", href: "/marketplace/ai-chatbots" },
      { label: "WhatsApp assistant", href: "/marketplace/ai-chatbots" },
    ],
  },
  {
    title: "Build & ship",
    tone: "from-stone-500 to-stone-800",
    icons: [AppWindow, BarChart3],
    links: [
      { label: "AI Websites & Apps", href: "/marketplace/ai-websites-apps" },
      { label: "Data, Dashboards & Intelligence", href: "/marketplace/data-intelligence" },
      { label: "AI landing pages", href: "/marketplace/ai-websites-apps" },
      { label: "AI MVP sprint", href: "/marketplace/ai-websites-apps" },
      { label: "KPI dashboards", href: "/marketplace/data-intelligence" },
    ],
  },
  {
    title: "Grow & govern",
    tone: "from-[#3B6FE6] to-[#13245C]",
    icons: [TrendingUp, ShieldIcon],
    links: [
      { label: "AI Marketing & Growth", href: "/marketplace/ai-marketing-growth" },
      { label: "AI Creative Studio", href: "/marketplace/ai-creative-studio" },
      { label: "AI Strategy & Consulting", href: "/marketplace/ai-strategy-consulting" },
      { label: "AI Security & Compliance", href: "/marketplace/ai-security-compliance" },
      { label: "AI roadmap", href: "/marketplace/ai-strategy-consulting" },
    ],
  },
];

const managers = [
  { name: "Marisol Rivera", role: "AI Strategist", initials: "MR", tone: "from-[#2D5BD8] to-[#0A2A7A]" },
  { name: "Daniel Ortiz", role: "Automation Lead", initials: "DO", tone: "from-slate-500 to-slate-800" },
  { name: "Priya Nair", role: "Product Designer", initials: "PN", tone: "from-zinc-600 to-zinc-900" },
];

export default async function MarketplacePage() {
  const t = await getT();
  return (
    <>
      {/* Category nav */}
      <div className="sticky top-16 z-30 border-b border-border bg-background/90 backdrop-blur-xl">
        <div className="container-tight flex items-center gap-6 overflow-x-auto py-3.5 text-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <span className="shrink-0 font-semibold text-foreground">
            {t("Popular 🔥")}
          </span>
          {verticals.map((v) => (
            <Link
              key={v.slug}
              href={`/marketplace/${v.slug}`}
              className="shrink-0 whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground"
            >
              {t(v.name)}
            </Link>
          ))}
        </div>
      </div>

      <div className="container-tight space-y-16 py-10 sm:space-y-20">
        {/* Hero banner */}
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#10316F] via-[#0B1F4D] to-ink px-6 py-16 text-center text-white sm:py-20">
            <div className="bg-grid-dark absolute inset-0 opacity-30" />
            <div className="absolute -left-10 top-1/2 size-64 -translate-y-1/2 rounded-full bg-electric/10 blur-3xl" />
            <div className="absolute -right-10 top-0 size-64 rounded-full bg-[#5A82EA]/10 blur-3xl" />
            <div className="relative">
              <span className="eyebrow justify-center text-white/55">
                <span className="size-1.5 rounded-full bg-electric" />
                {t("Marketplace")}
              </span>
              <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                {t("Explore AI Services")}
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-white/70 text-balance">
                {t("Buy AI outcomes. Delivered by TopDoerr. No random freelancers — every service is scoped, built, and human-reviewed.")}
              </p>
              <Button asChild variant="invert" className="mt-8">
                <Link href="/how-it-works">
                  <Play className="size-4" />
                  {t("How TopDoerr works")}
                </Link>
              </Button>
            </div>
          </div>
        </Reveal>

        {/* Most popular */}
        <ScrollRow title="Most popular AI services">
          {verticals.map((v) => {
            const Icon = v.icon;
            return (
              <Link
                key={v.slug}
                href={`/marketplace/${v.slug}`}
                className="group flex w-64 shrink-0 items-center justify-between gap-3 rounded-xl border border-border bg-card px-5 py-4 transition-all hover:border-foreground/20 hover:shadow-md"
              >
                <span className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-secondary text-foreground">
                    <Icon className="size-5" />
                  </span>
                  <span className="text-sm font-semibold leading-tight">
                    {t(v.name)}
                  </span>
                </span>
                <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
              </Link>
            );
          })}
        </ScrollRow>

        {/* Managed project promo */}
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-border bg-gradient-to-r from-secondary/60 via-background to-electric/10 p-8 sm:p-12">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                  {t("Big AI project?")}{" "}
                  <span className="text-electric">{t("We'll handle it")}</span>
                </h2>
                <p className="mt-3 max-w-md text-sm text-muted-foreground">
                  {t("From scoping to execution, work with a TopDoerr delivery pod that:")}
                </p>
                <ul className="mt-5 space-y-2.5">
                  {[
                    "Consistently delivers large and small projects",
                    "Is assigned and managed entirely by TopDoerr",
                    "Has proven expertise in your project's domain",
                  ].map((line) => (
                    <li key={line} className="flex items-center gap-2.5 text-sm">
                      <Check className="size-4 shrink-0 text-electric" strokeWidth={3} />
                      {t(line)}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-wrap items-center gap-5">
                  <Button asChild>
                    <Link href="/start">{t("Book a free consultation")}</Link>
                  </Button>
                  <span className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ShieldCheck className="size-4" />
                    {t("Money-back guarantee")}
                  </span>
                </div>
              </div>

              <div>
                <div className="flex items-end justify-center gap-3">
                  {managers.map((m, i) => (
                    <div
                      key={m.name}
                      className={cn(
                        "w-36 rounded-2xl border border-border bg-card p-4 text-center shadow-lg",
                        i === 1 ? "z-10 -translate-y-3" : ""
                      )}
                    >
                      <div
                        className={cn(
                          "mx-auto flex size-16 items-center justify-center rounded-full bg-gradient-to-br font-display text-lg font-semibold text-white",
                          m.tone
                        )}
                      >
                        {m.initials}
                      </div>
                      <div className="mt-3 text-sm font-semibold leading-tight">
                        {m.name}
                      </div>
                      <div className="mt-0.5 text-xs text-muted-foreground">
                        {t(m.role)}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-5 text-center text-sm text-muted-foreground">
                  {t("Our delivery pods,")}{" "}
                  <span className="font-semibold text-foreground">
                    {t("managed by TopDoerr")}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Explore grid */}
        <div>
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            {t("Explore AI Services")}
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {exploreGroups.map((group, gi) => (
              <Reveal key={group.title} delay={(gi % 4) * 0.05}>
                <div>
                  <div
                    className={cn(
                      "relative h-44 overflow-hidden rounded-2xl bg-gradient-to-br",
                      group.tone
                    )}
                  >
                    <div className="bg-grid-dark absolute inset-0 opacity-40" />
                    {group.icons.map((Icon, ii) => (
                      <Icon
                        key={ii}
                        className={cn(
                          "absolute text-white/15",
                          ii === 0
                            ? "left-5 top-5 size-12"
                            : "-bottom-4 -right-4 size-32"
                        )}
                        strokeWidth={1.2}
                      />
                    ))}
                  </div>
                  <h3 className="mt-4 font-display text-base font-semibold">
                    {t(group.title)}
                  </h3>
                  <ul className="mt-3 space-y-2.5">
                    {group.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-sm text-muted-foreground transition-colors hover:text-foreground hover:underline"
                        >
                          {t(link.label)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <CTASection />
    </>
  );
}
