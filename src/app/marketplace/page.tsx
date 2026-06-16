import type { Metadata } from "next";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { MarketplaceExplorer } from "@/components/marketplace-explorer";
import { CTASection } from "@/components/cta-section";

export const metadata: Metadata = {
  title: "Explore AI Services",
  description:
    "Browse AI services like a marketplace — delivered by internal experts and AI agents.",
};

export default function MarketplacePage() {
  return (
    <>
      {/* Header band */}
      <Section className="pb-12 pt-16 sm:pb-14 sm:pt-24">
        <div className="max-w-3xl">
          <Reveal>
            <span className="eyebrow">
              <span className="size-1.5 rounded-full bg-electric" />
              Marketplace
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              Explore AI Services
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground text-balance">
              Choose the outcome you want, not a random freelancer. Every
              service is scoped, built, and human-reviewed by TopDoerr&apos;s
              internal experts and AI agents — one accountable partner from brief
              to delivery.
            </p>
          </Reveal>
        </div>

        <div className="mt-12">
          <MarketplaceExplorer />
        </div>
      </Section>

      <CTASection />
    </>
  );
}
