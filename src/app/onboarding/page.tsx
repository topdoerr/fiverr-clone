"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApp } from "@/lib/dashboard/store";
import { onboardingOptions } from "@/lib/dashboard/mock-data";
import { useT } from "@/lib/i18n/client";
import { cn } from "@/lib/utils";

const TOTAL = 6;

export default function OnboardingPage() {
  const { user, hydrated, completeOnboarding, company } = useApp();
  const router = useRouter();
  const t = useT();
  const [step, setStep] = useState(1);

  const [profile, setProfile] = useState({
    name: company?.name ?? "",
    website: company?.website ?? "",
    industry: "",
    size: "",
    location: "",
  });
  const [goals, setGoals] = useState<string[]>([]);
  const [tools, setTools] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [urgency, setUrgency] = useState("");

  useEffect(() => {
    if (hydrated && !user) router.replace("/signup");
  }, [hydrated, user, router]);

  const toggle = (
    list: string[],
    set: (v: string[]) => void,
    value: string
  ) => {
    set(list.includes(value) ? list.filter((x) => x !== value) : [...list, value]);
  };

  const recommendation = useMemo(() => {
    if (goals.includes("Answer calls"))
      return t("an AI Voice Agent Pilot to start answering and booking calls automatically");
    if (goals.includes("Automate workflows") || goals.includes("Improve sales"))
      return t("an AI Automation Sprint to remove your most manual, repetitive work");
    if (goals.includes("Build dashboards"))
      return t("an AI Dashboard Starter to turn your data into live, decision-ready views");
    if (goals.includes("Build a chatbot") || goals.includes("Improve customer support"))
      return t("an AI Chatbot Starter trained on your business and embedded on your site");
    return t("an AI Strategy Roadmap to map the highest-impact place to start");
  }, [goals, t]);

  const finish = () => {
    completeOnboarding({
      name: profile.name,
      website: profile.website,
      industry: profile.industry,
      size: profile.size,
      location: profile.location,
      goals,
      tools,
    });
  };

  const next = () => {
    if (step === TOTAL - 1) finish();
    setStep((s) => Math.min(TOTAL, s + 1));
  };
  const back = () => setStep((s) => Math.max(1, s - 1));

  const Pill = ({
    active,
    onClick,
    children,
  }: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-xl border px-4 py-3 text-left text-sm transition-colors",
        active
          ? "border-lime-dim bg-lime/25 font-medium text-forest"
          : "border-forest/15 bg-white text-forest/70 hover:border-forest/30"
      )}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-cream px-6 py-8">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center justify-between">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/td_primary_forest.svg" alt="TopDoerr" className="h-7 w-auto" />
          <span className="text-sm text-forest/50">
            {t("Step")} {Math.min(step, TOTAL)} {t("of")} {TOTAL}
          </span>
        </div>
        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-forest/10">
          <div
            className="h-full rounded-full bg-lime-dim transition-all duration-500"
            style={{ width: `${(step / TOTAL) * 100}%` }}
          />
        </div>

        <div className="mt-10 rounded-3xl border border-forest/10 bg-white p-6 sm:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              {step === 1 && (
                <div className="text-center">
                  <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-lime/25">
                    <Sparkles className="size-6 text-forest" />
                  </div>
                  <h1 className="mt-5 font-display text-2xl font-semibold text-forest sm:text-3xl">
                    {t("Welcome to TopDoerr.")}
                  </h1>
                  <p className="mx-auto mt-3 max-w-md text-forest/60">
                    {t("Let's understand your business so we can recommend the right AI services and delivery path.")}
                  </p>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="font-display text-xl font-semibold text-forest">
                    {t("Company profile")}
                  </h2>
                  <div className="mt-6 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label>{t("Company name")}</Label>
                        <Input
                          value={profile.name}
                          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label>{t("Website")}</Label>
                        <Input
                          value={profile.website}
                          onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                          placeholder="https://"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label>{t("Industry")}</Label>
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                        {onboardingOptions.industries.map((o) => (
                          <Pill
                            key={o}
                            active={profile.industry === o}
                            onClick={() => setProfile({ ...profile, industry: o })}
                          >
                            {t(o)}
                          </Pill>
                        ))}
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label>{t("Company size")}</Label>
                        <div className="flex flex-wrap gap-2">
                          {onboardingOptions.companySizes.map((o) => (
                            <Pill
                              key={o}
                              active={profile.size === o}
                              onClick={() => setProfile({ ...profile, size: o })}
                            >
                              {t(o)}
                            </Pill>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label>{t("Location")}</Label>
                        <Input
                          value={profile.location}
                          onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                          placeholder="City, Country"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h2 className="font-display text-xl font-semibold text-forest">
                    {t("What do you want AI to help with?")}
                  </h2>
                  <p className="mt-1 text-sm text-forest/55">{t("Select all that apply.")}</p>
                  <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {onboardingOptions.goals.map((o) => (
                      <Pill
                        key={o}
                        active={goals.includes(o)}
                        onClick={() => toggle(goals, setGoals, o)}
                      >
                        {t(o)}
                      </Pill>
                    ))}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div>
                  <h2 className="font-display text-xl font-semibold text-forest">
                    {t("Current tools")}
                  </h2>
                  <p className="mt-1 text-sm text-forest/55">
                    {t("What does your team already use?")}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {onboardingOptions.tools.map((o) => (
                      <Pill
                        key={o}
                        active={tools.includes(o)}
                        onClick={() => toggle(tools, setTools, o)}
                      >
                        {t(o)}
                      </Pill>
                    ))}
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-display text-xl font-semibold text-forest">
                      {t("Budget")}
                    </h2>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {onboardingOptions.budgets.map((o) => (
                        <Pill key={o} active={budget === o} onClick={() => setBudget(o)}>
                          {t(o)}
                        </Pill>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-semibold text-forest">
                      {t("Urgency")}
                    </h2>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {onboardingOptions.urgency.map((o) => (
                        <Pill key={o} active={urgency === o} onClick={() => setUrgency(o)}>
                          {t(o)}
                        </Pill>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 6 && (
                <div className="text-center">
                  <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-lime text-forest">
                    <Check className="size-6" strokeWidth={3} />
                  </div>
                  <h2 className="mt-5 font-display text-2xl font-semibold text-forest">
                    {t("You're all set.")}
                  </h2>
                  <p className="mx-auto mt-3 max-w-md text-forest/60">
                    {t("Based on your answers, we recommend starting with")}{" "}
                    <span className="font-medium text-forest">{recommendation}</span>.
                  </p>
                  <div className="mt-8 flex flex-col gap-3">
                    <Button asChild variant="lime" size="lg">
                      <Link href="/dashboard/briefs/new">{t("Start a Project Brief")}</Link>
                    </Button>
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Button asChild variant="outline" className="flex-1">
                        <Link href="/marketplace">{t("Explore AI Services")}</Link>
                      </Button>
                      <Button asChild variant="forest" className="flex-1">
                        <Link href="/dashboard">{t("Go to Dashboard")}</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {step < TOTAL && (
            <div className="mt-8 flex items-center justify-between">
              {step > 1 ? (
                <Button variant="ghost" onClick={back}>
                  <ArrowLeft className="size-4" />
                  {t("Back")}
                </Button>
              ) : (
                <span />
              )}
              <Button variant="lime" onClick={next}>
                {step === 1 ? t("Get Started") : step === TOTAL - 1 ? t("See recommendation") : t("Continue")}
                <ArrowRight className="size-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
