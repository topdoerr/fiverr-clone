import type { Metadata } from "next";
import { Sparkles, Cpu, Eye } from "lucide-react";
import { Section, SectionHeading } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { DeliveryProcess } from "@/components/delivery-process";
import { ComparisonTable } from "@/components/comparison-table";
import { Badge } from "@/components/ui/badge";
import { CTASection } from "@/components/cta-section";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "From idea to deployed AI system. Choose the outcome, submit a brief, and TopDoerr assigns the internal pod that delivers it — with human review at every step.",
};

const reviewPillars = [
  {
    icon: Sparkles,
    title: "AI-assisted scoping",
    description:
      "Our brief builder turns vague ideas into clear project requirements, timelines, and delivery paths — so the work starts with a precise scope, not a guess.",
  },
  {
    icon: Cpu,
    title: "AI-accelerated build",
    description:
      "AI accelerates research, drafting, building, testing, and automation. Your project moves at marketplace speed without sacrificing structure.",
  },
  {
    icon: Eye,
    title: "Human review",
    description:
      "Before anything reaches you, human experts review strategy, brand, accuracy, and security. Every delivery passes a standardized quality gate.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      {/* Hero header band */}
      <Section className="bg-secondary/30">
        <div className="max-w-3xl">
          <Reveal>
            <span className="eyebrow">
              <span className="size-1.5 rounded-full bg-electric" />
              How it works
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              From idea to deployed AI system.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-lg font-medium text-foreground">
              Marketplace simplicity. Managed delivery.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground text-balance">
              You choose the outcome you want, submit a brief, and TopDoerr
              assigns the internal pod to deliver it. No comparing hundreds of
              sellers, no negotiating scope, no hoping the final delivery is
              good. You buy the outcome — we manage the work.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* 5-step delivery process */}
      <Section>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="The delivery process"
              title="Five steps from brief to final delivery."
              description="Marketplace simplicity on the front. A managed delivery standard behind it. Here is exactly what happens once you start."
            />
            <Reveal delay={0.1}>
              <div className="mt-8 flex flex-wrap gap-2">
                <Badge variant="electric">Internal talent. AI speed.</Badge>
                <Badge variant="electric">Human review.</Badge>
              </div>
            </Reveal>
          </div>
          <DeliveryProcess />
        </div>
      </Section>

      {/* Differentiation + comparison */}
      <Section className="bg-secondary/30">
        <SectionHeading
          align="center"
          eyebrow="Why not freelancers"
          title="Not a freelancer marketplace. A managed AI delivery system."
          description="Traditional marketplaces make you compare hundreds of sellers, negotiate scope, and hope the final delivery is good. TopDoerr works differently. You choose the outcome, submit your brief, and our internal team assigns the right combination of AI strategists, builders, designers, engineers, and agents to deliver the work."
          className="mb-12"
        />
        <ComparisonTable />
      </Section>

      {/* Internal talent. AI speed. Human review. */}
      <Section>
        <SectionHeading
          eyebrow="Quality standard"
          title="Internal talent. AI speed. Human review."
          description="Every project runs through the same standard: AI does the heavy lifting, and people own the judgment. That is how we keep marketplace speed without marketplace risk."
        />
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reviewPillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <Reveal key={pillar.title} delay={(i % 3) * 0.05}>
                <div className="h-full rounded-2xl border border-border bg-card p-6 transition-colors hover:border-foreground/20">
                  <div className="flex size-11 items-center justify-center rounded-xl border border-border bg-secondary">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-5 font-display text-base font-semibold">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {pillar.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <CTASection />
    </>
  );
}
