import type { Metadata } from "next";
import {
  ShieldCheck,
  Sparkles,
  Boxes,
  Languages,
  MapPin,
  Building2,
  Rocket,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { CTASection } from "@/components/cta-section";
import { Badge } from "@/components/ui/badge";
import { keyPhrases } from "@/lib/data";
import { getT } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "About",
};

const values = [
  {
    icon: Boxes,
    title: "Internal talent only",
    description:
      "No public freelancers. Every project is delivered by TopDoerr's internal network of AI builders, strategists, engineers, creatives, and operators.",
  },
  {
    icon: Sparkles,
    title: "AI speed, human review",
    description:
      "AI accelerates research, building, and testing. Humans review strategy, brand, accuracy, and security before anything ships.",
  },
  {
    icon: ShieldCheck,
    title: "One accountable brand",
    description:
      "No chasing sellers or reconciling mixed standards. TopDoerr owns the delivery experience end to end.",
  },
  {
    icon: Languages,
    title: "Spanish-first",
    description:
      "Built bilingual from day one for Puerto Rico, LATAM, and companies serving Spanish-speaking markets.",
  },
];

const builtFor = [
  {
    icon: MapPin,
    title: "Puerto Rico",
    description:
      "Local, Spanish-first AI delivery for businesses ready to modernize operations.",
  },
  {
    icon: Building2,
    title: "LATAM",
    description:
      "One partner for AI across the region, with bilingual scope, delivery, and support.",
  },
  {
    icon: Rocket,
    title: "Growth & enterprise",
    description:
      "From a first scoped project to multi-department AI transformation under SLAs.",
  },
];

const team = [
  { initials: "ST", role: "Strategy" },
  { initials: "EN", role: "Engineering" },
  { initials: "CR", role: "Creative" },
  { initials: "OP", role: "Operations" },
  { initials: "AI", role: "AI / Agents" },
];

export default async function AboutPage() {
  const t = await getT();
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="bg-grid-dark absolute inset-0 opacity-50" />
        <div className="absolute -right-24 top-0 size-96 rounded-full bg-electric/10 blur-3xl" />
        <div className="container-tight relative py-24 sm:py-32">
          <div className="max-w-2xl">
            <Reveal>
              <span className="eyebrow text-white/50">
                <span className="size-1.5 rounded-full bg-electric" />
                {t("About TopDoerr")}
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                {t("Hire the result, not the freelancer.")}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-lg leading-relaxed text-white/60 text-balance">
                {t(
                  "TopDoerr is a managed AI outcomes platform — marketplace simplicity with internal talent, AI speed, and human review. You buy an outcome; we scope it, build it, review it, and deliver it under one standard. Spanish-first and built for Puerto Rico, LATAM, and growth companies."
                )}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-2">
                <Badge variant="dark">{t("Internal talent. AI speed.")}</Badge>
                <Badge variant="dark">{t("Human review.")}</Badge>
                <Badge variant="dark">{t("Spanish-first.")}</Badge>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <Section>
        <SectionHeading
          eyebrow={t("What makes us different")}
          title={t("A marketplace experience. A managed delivery standard.")}
          description={t(
            "The speed of an AI marketplace with the accountability of an internal delivery team."
          )}
        />
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {values.map((value, i) => {
            const Icon = value.icon;
            return (
              <Reveal key={value.title} delay={(i % 2) * 0.05}>
                <div className="h-full rounded-2xl border border-border bg-card p-6 transition-colors hover:border-foreground/20">
                  <div className="flex size-11 items-center justify-center rounded-xl border border-border bg-secondary">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-5 font-display text-base font-semibold">
                    {t(value.title)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {t(value.description)}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* What we believe */}
      <Section className="bg-secondary/30">
        <SectionHeading
          align="center"
          eyebrow={t("What we believe")}
          title={t("The principles behind every delivery.")}
          className="mb-12"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {keyPhrases.map((phrase, i) => (
            <Reveal key={phrase} delay={(i % 3) * 0.05}>
              <div className="flex h-full flex-col justify-between rounded-2xl border border-border bg-card p-7">
                <span className="font-display text-xs font-semibold text-electric">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-6 font-display text-xl font-semibold leading-snug tracking-tight text-balance">
                  {t(phrase)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Built for */}
      <Section>
        <SectionHeading
          eyebrow={t("Built for")}
          title={t("Where TopDoerr delivers.")}
          description={t(
            "From the Caribbean to growth companies scaling AI across departments."
          )}
        />
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {builtFor.map((item, i) => {
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

        {/* Team */}
        <div className="mt-16">
          <Reveal>
            <p className="text-sm font-medium text-muted-foreground">
              {t("One accountable team across every discipline.")}
            </p>
          </Reveal>
          <div className="mt-6 flex flex-wrap gap-4">
            {team.map((member, i) => (
              <Reveal key={member.role} delay={(i % 5) * 0.04}>
                <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3">
                  <span className="flex size-10 items-center justify-center rounded-full bg-ink text-sm font-semibold text-electric">
                    {member.initials}
                  </span>
                  <span className="text-sm font-medium">{t(member.role)}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <CTASection />
    </>
  );
}
