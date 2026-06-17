import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Check,
  Clock,
  ChevronRight,
  ShieldCheck,
  Eye,
  Flag,
  BadgeCheck,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { DeliveryProcess } from "@/components/delivery-process";
import { FaqAccordion } from "@/components/faq-accordion";
import { CTASection } from "@/components/cta-section";
import { PackageTable } from "@/components/package-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { verticals, getVertical } from "@/lib/data";

export function generateStaticParams() {
  return verticals.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const v = getVertical(params.slug);
  if (!v) {
    return { title: "Service not found" };
  }
  return {
    title: v.name,
    description: v.description,
  };
}

const qaStandards = [
  {
    icon: BadgeCheck,
    title: "Standardized QA gate",
    description:
      "Every delivery passes the same structured review before it reaches you — no uneven seller quality.",
  },
  {
    icon: Eye,
    title: "Human review of what matters",
    description:
      "Humans review strategy, brand, accuracy, and security. AI accelerates the work; people own the standard.",
  },
  {
    icon: Flag,
    title: "Milestone reviews for larger work",
    description:
      "Bigger engagements run on milestone reviews and SLAs so quality is checked throughout, not just at the end.",
  },
  {
    icon: ShieldCheck,
    title: "One accountable brand",
    description:
      "TopDoerr owns the outcome end to end. No chasing freelancers, no mixed standards, one point of accountability.",
  },
];

export default function ServiceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const v = getVertical(params.slug);
  if (!v) notFound();

  const Icon = v.icon;

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-border bg-background">
        <div className="container-tight">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-1.5 py-4 text-sm text-muted-foreground"
          >
            <Link href="/" className="transition-colors hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="size-3.5" />
            <Link
              href="/marketplace"
              className="transition-colors hover:text-foreground"
            >
              Explore Services
            </Link>
            <ChevronRight className="size-3.5" />
            <span className="text-foreground">{v.name}</span>
          </nav>
        </div>
      </div>

      {/* Service hero */}
      <section className="py-12 sm:py-16">
        <div className="container-tight">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-ink px-6 py-12 text-white sm:px-12 sm:py-14">
              <div className="bg-grid-dark absolute inset-0 opacity-50" />
              <div className="absolute -right-20 top-0 size-80 rounded-full bg-electric/10 blur-3xl" />
              <div className="relative max-w-3xl">
                <div className="flex size-14 items-center justify-center rounded-2xl border border-white/15 bg-white/5">
                  <Icon className="size-7 text-electric" />
                </div>
                <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                  {v.name}
                </h1>
                <p className="mt-4 text-lg leading-relaxed text-white/65 text-balance">
                  {v.description}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/80">
                  <span className="font-semibold text-white">
                    {v.startingPrice}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-4 text-electric" />
                    {v.deliveryTime}
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {v.tags.map((tag) => (
                    <Badge key={tag} variant="dark">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button asChild variant="electric" size="lg">
                    <Link href="/start">
                      Start a Project
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    className="bg-white/10 text-white hover:bg-white/20"
                  >
                    <Link href="#packages">View packages</Link>
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Category description + services offered */}
      <Section className="py-16 sm:py-20">
        <SectionHeading
          eyebrow="What's offered"
          title={`Inside ${v.name}`}
          description={v.shortDescription}
        />
        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {v.services.map((service, i) => (
            <Reveal key={service} delay={(i % 3) * 0.04}>
              <div className="flex items-start gap-3 rounded-xl border border-border bg-card px-5 py-4">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-electric/15">
                  <Check className="size-3 text-electric" strokeWidth={3} />
                </span>
                <span className="text-sm font-medium leading-snug">
                  {service}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Package comparison */}
      <div id="packages" className="scroll-mt-24">
        <Section className="bg-secondary/30 py-16 sm:py-20">
          <SectionHeading
            eyebrow="Packages"
            title="Choose your package"
            description="Transparent tiers with clear deliverables. Start where you are and scale into recurring delivery."
          />
          <div className="mt-12">
            <PackageTable packages={v.packages} />
          </div>
        </Section>
      </div>

      {/* Popular use cases */}
      <Section className="py-16 sm:py-20">
        <SectionHeading
          eyebrow="Use cases"
          title="Popular use cases"
          description="A few of the outcomes clients ask TopDoerr to deliver in this category."
        />
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {v.useCases.map((useCase, i) => (
            <Reveal key={useCase} delay={(i % 2) * 0.05}>
              <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-6">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-ink text-electric">
                  <ArrowRight className="size-3.5" />
                </span>
                <p className="text-sm leading-relaxed text-foreground">
                  {useCase}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* What's included + what TopDoerr needs */}
      <Section className="bg-secondary/30 py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <div className="h-full rounded-2xl border border-border bg-card p-8">
              <SectionHeading eyebrow="Included" title="What's included" />
              <ul className="mt-7 space-y-4">
                {v.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-electric" />
                    <span className="leading-relaxed text-foreground">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="h-full rounded-2xl border border-border bg-card p-8">
              <SectionHeading
                eyebrow="From you"
                title="What TopDoerr needs from you"
              />
              <ul className="mt-7 space-y-4">
                {v.clientNeeds.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-border bg-secondary text-[11px] font-semibold text-foreground">
                      {v.clientNeeds.indexOf(item) + 1}
                    </span>
                    <span className="leading-relaxed text-foreground">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Delivery process */}
      <Section className="py-16 sm:py-20">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="How it works"
              title="From brief to deployed delivery."
              description="Marketplace simplicity on the front. A managed delivery standard behind it."
            />
          </div>
          <DeliveryProcess />
        </div>
      </Section>

      {/* QA & review standards */}
      <Section className="bg-secondary/30 py-16 sm:py-20">
        <SectionHeading
          eyebrow="Quality control"
          title="QA and review standards"
          description="Internal talent. AI speed. Human review. Every engagement is held to one standard."
        />
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {qaStandards.map((standard, i) => {
            const StandardIcon = standard.icon;
            return (
              <Reveal key={standard.title} delay={(i % 2) * 0.05}>
                <div className="h-full rounded-2xl border border-border bg-card p-6">
                  <div className="flex size-11 items-center justify-center rounded-xl border border-border bg-secondary">
                    <StandardIcon className="size-5" />
                  </div>
                  <h3 className="mt-5 font-display text-base font-semibold">
                    {standard.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {standard.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Add-ons */}
      <Section className="py-16 sm:py-20">
        <SectionHeading
          eyebrow="Add-ons"
          title="Extend your package"
          description="Optional add-ons to tailor the delivery to your needs."
        />
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {v.addOns.map((addOn, i) => (
            <Reveal key={addOn.name} delay={(i % 3) * 0.04}>
              <div className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-6">
                <span className="text-sm font-medium leading-snug text-foreground">
                  {addOn.name}
                </span>
                <span className="shrink-0 text-sm font-semibold text-foreground">
                  {addOn.price}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section className="bg-secondary/30 py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading
            eyebrow="FAQ"
            title="Questions, answered."
            description="Still curious? Reach out and TopDoerr will scope it with you."
          />
          <div>
            <FaqAccordion items={v.faq} />
          </div>
        </div>
      </Section>

      <CTASection />
    </>
  );
}
