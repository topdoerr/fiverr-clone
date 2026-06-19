"use client";

import Link from "next/link";
import { FileText, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RecommendedServiceCard } from "@/components/dashboard/project-bits";
import { recommendedServices } from "@/lib/dashboard/mock-data";
import { useT } from "@/lib/i18n/client";

export default function NewProjectPage() {
  const t = useT();
  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-forest">
          {t("Start a new project")}
        </h1>
        <p className="mt-2 text-sm text-forest/60">
          {t("Submit a brief or browse AI services — TopDoerr handles the rest.")}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex h-full flex-col rounded-2xl border border-forest/10 bg-white p-6">
          <span className="flex size-11 items-center justify-center rounded-xl bg-lime/25 text-forest">
            <FileText className="size-5" />
          </span>
          <h2 className="mt-4 font-display text-lg font-semibold text-forest">
            {t("Submit an AI Brief")}
          </h2>
          <p className="mt-1.5 flex-1 text-sm text-forest/60">
            {t("Answer a few questions and we'll scope it.")}
          </p>
          <Button variant="lime" asChild className="mt-5 w-full sm:w-auto">
            <Link href="/dashboard/briefs/new">
              {t("Start a Brief")}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        <div className="flex h-full flex-col rounded-2xl border border-forest/10 bg-white p-6">
          <span className="flex size-11 items-center justify-center rounded-xl bg-cobalt/10 text-cobalt">
            <Sparkles className="size-5" />
          </span>
          <h2 className="mt-4 font-display text-lg font-semibold text-forest">
            {t("Browse AI Services")}
          </h2>
          <p className="mt-1.5 flex-1 text-sm text-forest/60">
            {t("Explore the marketplace of AI outcomes.")}
          </p>
          <Button variant="outline" asChild className="mt-5 w-full sm:w-auto">
            <Link href="/marketplace">
              {t("Explore Services")}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>

      <section>
        <h2 className="mb-4 font-display text-lg font-semibold text-forest">
          {t("Recommended for you")}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recommendedServices.map((s) => (
            <RecommendedServiceCard key={s.id} service={s} />
          ))}
        </div>
      </section>
    </div>
  );
}
