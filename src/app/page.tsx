import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Gauge,
  Eye,
  Boxes,
  BadgeCheck,
  TrendingUp,
} from "lucide-react";
import { Hero } from "@/components/hero";
import { Section, SectionHeading } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { ServiceCard } from "@/components/service-card";
import { OutcomeCard } from "@/components/outcome-card";
import { ComparisonTable } from "@/components/comparison-table";
import { DeliveryProcess } from "@/components/delivery-process";
import { FaqAccordion } from "@/components/faq-accordion";
import { CTASection } from "@/components/cta-section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  verticals,
  popularOutcomes,
  whyFeatures,
  enterpriseFeatures,
  globalFaq,
  testimonials,
} from "@/lib/data";

const whyIcons = [Boxes, Gauge, Eye, BadgeCheck, ShieldCheck, TrendingUp];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Popular AI outcomes */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto w-full max-w-7xl px-6">
          <SectionHeading
            eyebrow="Popular AI outcomes"
            title="What do you want AI to do?"
            description="Start from an outcome. We handle the scope, the build, and the review."
          />
          <div className="mt-10 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12">
            {popularOutcomes.map((outcome) => (
              <Reveal key={outcome.label}>
                <OutcomeCard
                  label={outcome.label}
                  vertical={outcome.vertical}
                  icon={outcome.icon}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Service verticals grid */}
      <Section className="bg-secondary/30 py-20 sm:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Marketplace"
            title="One marketplace for AI projects"
            description="Browse AI services like a marketplace — delivered by internal experts and AI agents."
          />
          <Reveal>
            <Button asChild variant="outline">
              <Link href="/marketplace">
                View all services
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </Reveal>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {verticals.slice(0, 6).map((v) => (
            <Reveal key={v.slug}>
              <ServiceCard vertical={v} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* How TopDoerr delivers */}
      <Section>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="How TopDoerr delivers"
              title="From idea to deployed AI system."
              description="Marketplace simplicity on the front. A managed delivery standard behind it."
            />
            <Reveal delay={0.1}>
              <div className="mt-8 flex flex-wrap gap-2">
                <Badge variant="electric">Internal talent. AI speed.</Badge>
                <Badge variant="electric">Human review.</Badge>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <Button asChild className="mt-8">
                <Link href="/how-it-works">
                  See how it works
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
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

      {/* Why TopDoerr feature cards */}
      <Section>
        <SectionHeading
          eyebrow="Why TopDoerr"
          title="A marketplace experience. A managed delivery standard."
          description="TopDoerr gives you the speed of an AI marketplace with the accountability of an internal delivery team. Every service is scoped, routed, built, reviewed, and delivered under one standard."
        />
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyFeatures.map((f, i) => {
            const Icon = whyIcons[i % whyIcons.length];
            return (
              <Reveal key={f.title} delay={(i % 3) * 0.05}>
                <div className="h-full rounded-2xl border border-border bg-card p-6 transition-colors hover:border-foreground/20">
                  <div className="flex size-11 items-center justify-center rounded-xl border border-border bg-secondary">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-5 font-display text-base font-semibold">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {f.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Enterprise */}
      <Section className="bg-secondary/30">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-ink p-8 text-white sm:p-14">
            <div className="bg-grid-dark absolute inset-0 opacity-50" />
            <div className="absolute -right-20 top-0 size-80 rounded-full bg-electric/10 blur-3xl" />
            <div className="relative grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <span className="eyebrow text-white/50">
                  <span className="size-1.5 rounded-full bg-electric" />
                  Enterprise
                </span>
                <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                  For companies that need more than one AI project.
                </h2>
                <p className="mt-4 text-white/60 text-balance">
                  TopDoerr Enterprise helps teams plan, build, and manage AI
                  across departments. From voice agents and automation to
                  dashboards, internal assistants, and AI governance, we provide
                  one operating partner for AI transformation.
                </p>
                <Button asChild variant="electric" className="mt-8">
                  <Link href="/enterprise">
                    Talk to Enterprise
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {enterpriseFeatures.map((feat) => (
                  <div
                    key={feat}
                    className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85"
                  >
                    <BadgeCheck className="size-4 shrink-0 text-electric" />
                    {feat}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Quality control / SLA */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
          <SectionHeading
            eyebrow="Quality control & SLA"
            title="Internal talent. AI speed. Human review."
            description="Every delivery passes a standardized review for strategy, brand, accuracy, and security before it reaches you. Larger engagements run on SLAs with milestone reviews."
          />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {[
              { value: "100%", label: "Human-reviewed delivery" },
              { value: "1", label: "Accountable brand" },
              { value: "0", label: "Random freelancers" },
              { value: "QA", label: "Standardized review gate" },
              { value: "SLA", label: "Enterprise delivery" },
              { value: "ES", label: "Spanish-first" },
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={(i % 3) * 0.05}>
                <div className="rounded-2xl border border-border bg-card p-5">
                  <div className="font-display text-2xl font-semibold text-foreground">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs leading-snug text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Testimonials */}
      <Section className="bg-secondary/30">
        <SectionHeading
          align="center"
          eyebrow="Testimonials"
          title="One accountable AI partner."
          className="mb-12"
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={(i % 2) * 0.06}>
              <figure className="h-full rounded-2xl border border-border bg-card p-7">
                <blockquote className="text-base leading-relaxed text-foreground">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-full bg-ink text-sm font-semibold text-electric">
                    {t.initials}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold">{t.name}</span>
                    <span className="block text-xs text-muted-foreground">
                      {t.role}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading
            eyebrow="FAQ"
            title="Questions, answered."
            description="Still curious? Reach out and TopDoerr will scope it with you."
          />
          <div>
            <FaqAccordion items={globalFaq} />
          </div>
        </div>
      </Section>

      <CTASection />
    </>
  );
}
