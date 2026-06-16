import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Users,
  ShieldCheck,
  GitBranch,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { DeliveryProcess } from "@/components/delivery-process";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/cta-section";
import { enterpriseFeatures, testimonials } from "@/lib/data";

export const metadata: Metadata = {
  title: "Enterprise",
  description:
    "TopDoerr Enterprise helps teams plan, build, and manage AI across departments — one operating partner for AI transformation with dedicated pods, SLAs, and governance.",
};

const valuePillars = [
  {
    icon: Users,
    title: "Dedicated delivery pod",
    description:
      "A dedicated AI strategist and internal pod that learns your business and delivers across departments — not a rotating cast of freelancers.",
  },
  {
    icon: ShieldCheck,
    title: "SLAs & governance",
    description:
      "SLA-based delivery, milestone reviews, and security, privacy, and compliance review built into every engagement.",
  },
  {
    icon: GitBranch,
    title: "Multi-project roadmap",
    description:
      "One coordinated roadmap across voice agents, automation, dashboards, internal assistants, and AI governance.",
  },
];

const enterpriseTestimonials = testimonials.slice(2, 4);

export default function EnterprisePage() {
  return (
    <>
      {/* Dark hero */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="bg-grid-dark absolute inset-0 opacity-60" />
        <div className="absolute -right-24 top-0 size-96 rounded-full bg-electric/10 blur-[120px]" />
        <div className="absolute -left-24 bottom-0 size-80 rounded-full bg-electric/5 blur-[120px]" />
        <div className="container-tight relative py-24 sm:py-32">
          <div className="max-w-3xl">
            <Reveal>
              <span className="eyebrow text-white/50">
                <span className="size-1.5 rounded-full bg-electric" />
                TopDoerr Enterprise
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
                For companies that need more than one AI project.
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-base leading-relaxed text-white/60 text-balance sm:text-lg">
                TopDoerr Enterprise helps teams plan, build, and manage AI across
                departments. From voice agents and automation to dashboards,
                internal assistants, and AI governance, we provide one operating
                partner for AI transformation.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="electric" size="lg">
                  <Link href="/start">
                    Talk to Enterprise
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="bg-white/10 text-white hover:bg-white/20"
                >
                  <Link href="/marketplace">Explore Services</Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Enterprise features grid */}
      <Section>
        <SectionHeading
          eyebrow="What's included"
          title="Everything an AI operating partner should bring."
          description="Enterprise engagements run on a managed standard built for scale, security, and accountability across your organization."
        />
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {enterpriseFeatures.map((feat, i) => (
            <Reveal key={feat} delay={(i % 4) * 0.05}>
              <div className="flex h-full items-start gap-3 rounded-2xl border border-border bg-card p-5">
                <BadgeCheck className="mt-0.5 size-5 shrink-0 text-electric" />
                <span className="text-sm font-medium leading-snug">{feat}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Value pillars */}
      <Section className="bg-secondary/30">
        <SectionHeading
          eyebrow="Why Enterprise"
          title="One accountable partner for AI across the org."
          description="Stop coordinating vendors and freelancers. Run every AI initiative through a single managed standard."
        />
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {valuePillars.map((pillar, i) => {
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

      {/* Roadmap / process */}
      <Section>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="How we deliver"
              title="From AI roadmap to delivered systems."
              description="Enterprise engagements run on the same managed delivery process — scoped, routed, built, and human-reviewed — coordinated across multiple projects and departments."
            />
          </div>
          <DeliveryProcess />
        </div>
      </Section>

      {/* Testimonials strip */}
      <Section className="bg-secondary/30">
        <SectionHeading
          align="center"
          eyebrow="Testimonials"
          title="Trusted as an internal AI team."
          className="mb-12"
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {enterpriseTestimonials.map((t, i) => (
            <Reveal key={t.name} delay={(i % 2) * 0.06}>
              <figure className="h-full rounded-2xl border border-border bg-card p-7">
                <blockquote className="text-base leading-relaxed text-foreground">
                  &ldquo;{t.quote}&rdquo;
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

      <CTASection
        title="Plan your AI transformation with one partner."
        description="From a single department to an org-wide roadmap, TopDoerr Enterprise plans, builds, and manages your AI under one accountable standard."
        primary={{ label: "Talk to Enterprise", href: "/start" }}
        secondary={{ label: "Explore Services", href: "/marketplace" }}
      />
    </>
  );
}
