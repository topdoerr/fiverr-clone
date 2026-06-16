import type { Metadata } from "next";
import { BriefBuilder } from "@/components/brief-builder";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Start a Project",
  description:
    "Build your AI brief and let TopDoerr assign the right internal delivery pod.",
};

export default function StartPage() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto w-full max-w-2xl px-4 sm:px-6">
        <div className="text-center">
          <Reveal>
            <span className="eyebrow justify-center">
              <span className="size-1.5 rounded-full bg-electric" />
              AI Brief Builder
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Tell us the outcome. We&apos;ll handle the rest.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-muted-foreground text-balance">
              Answer a few quick questions. Our AI brief builder turns your idea
              into a clear scope, then routes it to the right internal delivery
              pod.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="mt-10">
          <BriefBuilder />
        </Reveal>
      </div>
    </section>
  );
}
