import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";

export function CTASection({
  title = "Ready to turn AI into real work?",
  description = "Start with one project. TopDoerr will help scope it, assign the right internal team, and deliver the outcome.",
  primary = { label: "Start a Project", href: "/start" },
  secondary = { label: "Explore Services", href: "/marketplace" },
}: {
  title?: string;
  description?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-tight">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-ink px-6 py-16 text-center sm:px-16 sm:py-20">
            <div className="bg-grid-dark absolute inset-0 opacity-60" />
            <div className="absolute left-1/2 top-0 h-40 w-[36rem] -translate-x-1/2 rounded-full bg-electric/20 blur-[100px]" />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold tracking-tight text-white text-balance sm:text-4xl">
                {title}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-white/60 text-balance">
                {description}
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button asChild variant="electric" size="lg">
                  <Link href={primary.href}>
                    {primary.label}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="bg-white/10 text-white hover:bg-white/20"
                >
                  <Link href={secondary.href}>{secondary.label}</Link>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
