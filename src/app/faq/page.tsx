import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { FaqAccordion } from "@/components/faq-accordion";
import { CTASection } from "@/components/cta-section";
import { Button } from "@/components/ui/button";
import { globalFaq } from "@/lib/data";

export const metadata: Metadata = {
  title: "FAQ",
};

export default function FaqPage() {
  return (
    <>
      <Section>
        <SectionHeading
          align="center"
          eyebrow="FAQ"
          title="Questions, answered."
          description="Everything you need to know about how TopDoerr scopes, builds, reviews, and delivers AI outcomes."
          className="mb-12"
        />

        <div className="mx-auto max-w-3xl">
          <Reveal>
            <FaqAccordion items={globalFaq} />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-2xl border border-border bg-secondary/40 p-6 sm:flex-row sm:items-center">
              <div>
                <h3 className="font-display text-base font-semibold">
                  Still have questions?
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Start a brief and TopDoerr will scope it with you — no
                  commitment.
                </p>
              </div>
              <Button asChild className="shrink-0">
                <Link href="/start">
                  Start a Project
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>

      <CTASection />
    </>
  );
}
