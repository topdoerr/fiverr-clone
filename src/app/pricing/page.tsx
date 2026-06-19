import type { Metadata } from "next";
import { ShieldCheck, LayoutDashboard, FileCheck2 } from "lucide-react";
import { Section, SectionHeading } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { PricingCards } from "@/components/pricing-cards";
import { FaqAccordion } from "@/components/faq-accordion";
import { CTASection } from "@/components/cta-section";
import { globalFaq } from "@/lib/data";
import { getT } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Three ways to work with TopDoerr: scoped marketplace projects, recurring monthly AI ops, and enterprise partnerships. Transparent scopes, clear deliverables.",
};

const included = [
  {
    icon: FileCheck2,
    title: "Clear scope",
    description:
      "Every engagement starts with a defined scope, deliverables, and timeline — no vague briefs or moving targets.",
  },
  {
    icon: ShieldCheck,
    title: "Human QA",
    description:
      "All plans include a standardized human review for strategy, brand, accuracy, and security before delivery.",
  },
  {
    icon: LayoutDashboard,
    title: "Project workspace",
    description:
      "Track status, share files, message your pod, and request revisions from one managed workspace.",
  },
];

const pricingFaq = globalFaq.filter((item) =>
  [
    "What happens after I submit a brief?",
    "Can I request revisions?",
    "Can this support enterprise projects?",
    "Who works on my project?",
  ].includes(item.q)
);

export default async function PricingPage() {
  const t = await getT();
  return (
    <>
      {/* Header */}
      <Section className="bg-secondary/30">
        <div className="max-w-3xl">
          <Reveal>
            <span className="eyebrow">
              <span className="size-1.5 rounded-full bg-electric" />
              {t("Pricing")}
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              {t("Marketplace simplicity. Managed delivery.")}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground text-balance">
              {t(
                "Three ways to work with TopDoerr. Transparent scopes, clear deliverables."
              )}
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Pricing path cards */}
      <Section>
        <PricingCards />
      </Section>

      {/* How billing works */}
      <Section className="bg-secondary/30">
        <SectionHeading
          align="center"
          eyebrow={t("What's included")}
          title={t("One-time, recurring, or custom — same delivery standard.")}
          description={t(
            "Marketplace Projects are billed per scoped project. Monthly AI Ops is a recurring engagement with a continuous queue. Enterprise AI Partner is custom-scoped. Whatever the path, every plan ships under the same managed standard."
          )}
          className="mb-12"
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {included.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={(i % 3) * 0.05}>
                <div className="h-full rounded-2xl border border-border bg-card p-6">
                  <div className="flex size-11 items-center justify-center rounded-xl border border-border bg-secondary">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-5 font-display text-base font-semibold">
                    {t(item.title)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {t(item.description)}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading
            eyebrow={t("FAQ")}
            title={t("Pricing questions, answered.")}
            description={t(
              "Still curious about scope or billing? Reach out and TopDoerr will scope it with you."
            )}
          />
          <div>
            <FaqAccordion items={pricingFaq} />
          </div>
        </div>
      </Section>

      <CTASection />
    </>
  );
}
