import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { getT } from "@/lib/i18n/server";

export async function BigCta() {
  const t = await getT();
  return (
    <section className="py-12 sm:py-16">
      <div className="container-tight">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#0047AB] via-[#0A2A7A] to-[#06122E] px-6 py-16 text-center sm:py-20">
            <div className="bg-grid-dark absolute inset-0 opacity-25" />
            <div className="absolute left-1/2 top-0 h-40 w-[40rem] -translate-x-1/2 rounded-full bg-[#5A82EA]/20 blur-[100px]" />
            <div className="relative">
              <h2 className="mx-auto max-w-3xl font-display text-3xl font-semibold leading-[1.1] tracking-tight text-white text-balance sm:text-5xl">
                {t("Buy the outcome,")}{" "}
                <span className="text-[#A9C4FF]">{t("not the freelancer.")}</span>
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base text-white/70 text-balance">
                {t(
                  "Start with one project. TopDoerr scopes it, assigns the right internal pod, and delivers the result."
                )}
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button asChild variant="invert" size="lg">
                  <Link href="/start">
                    {t("Start a Project")}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="bg-white/10 text-white hover:bg-white/20"
                >
                  <Link href="/marketplace">{t("Explore Services")}</Link>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
