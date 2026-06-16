"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  RotateCcw,
  UploadCloud,
} from "lucide-react";
import { briefSteps } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const TOTAL_STEPS = 6;

const stepTitles = [
  "What do you want to build or improve?",
  "What industry are you in?",
  "What tools do you currently use?",
  "How urgent is this?",
  "What is your budget range?",
  "Upload files & add context",
];

interface Answers {
  goal: string;
  industry: string;
  tools: string[];
  urgency: string;
  budget: string;
  website: string;
  notes: string;
  name: string;
  email: string;
}

const initialAnswers: Answers = {
  goal: "",
  industry: "",
  tools: [],
  urgency: "",
  budget: "",
  website: "",
  notes: "",
  name: "",
  email: "",
};

function OptionGrid({
  options,
  value,
  onSelect,
  columns = 2,
}: {
  options: string[];
  value: string;
  onSelect: (v: string) => void;
  columns?: 2 | 3;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-3",
        columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"
      )}
    >
      {options.map((option) => {
        const selected = value === option;
        return (
          <button
            key={option}
            type="button"
            onClick={() => onSelect(option)}
            className={cn(
              "group flex items-center justify-between gap-3 rounded-xl border px-5 py-4 text-left text-sm font-medium transition-all",
              selected
                ? "border-ink bg-ink text-white shadow-sm ring-2 ring-electric"
                : "border-border bg-card text-foreground hover:border-foreground/20 hover:bg-secondary/50"
            )}
          >
            {option}
            <span
              className={cn(
                "flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors",
                selected
                  ? "border-electric bg-electric text-ink"
                  : "border-border text-transparent group-hover:border-foreground/30"
              )}
            >
              <Check className="size-3" strokeWidth={3} />
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function BriefBuilder() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState<Answers>(initialAnswers);

  const update = <K extends keyof Answers>(key: K, val: Answers[K]) =>
    setAnswers((a) => ({ ...a, [key]: val }));

  const toggleTool = (tool: string) =>
    setAnswers((a) => ({
      ...a,
      tools: a.tools.includes(tool)
        ? a.tools.filter((t) => t !== tool)
        : [...a.tools, tool],
    }));

  const canContinue = (() => {
    switch (step) {
      case 1:
        return answers.goal !== "";
      case 2:
        return answers.industry !== "";
      case 3:
        return true; // tools optional
      case 4:
        return answers.urgency !== "";
      case 5:
        return answers.budget !== "";
      case 6:
        return true; // context optional
      default:
        return false;
    }
  })();

  const goNext = () => {
    if (!canContinue) return;
    if (step === TOTAL_STEPS) {
      setSubmitted(true);
      return;
    }
    setDirection(1);
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  };

  const goBack = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 1));
  };

  const reset = () => {
    setAnswers(initialAnswers);
    setStep(1);
    setDirection(1);
    setSubmitted(false);
  };

  const progress = submitted ? 100 : (step / TOTAL_STEPS) * 100;

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 24 : -24 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -24 : 24 }),
  };

  if (submitted) {
    return (
      <div className="rounded-3xl border border-border bg-card p-8 sm:p-12">
        <div className="mx-auto max-w-xl text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-electric text-ink">
            <CheckCircle2 className="size-8" strokeWidth={2.5} />
          </div>
          <h2 className="mt-6 font-display text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            Your AI project brief is ready.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground text-balance">
            TopDoerr will review your brief, confirm the scope, and assign the
            right internal delivery pod.
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-border bg-secondary/40 p-6 text-left">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Your brief
          </h3>
          <dl className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
            <SummaryRow label="Goal" value={answers.goal} />
            <SummaryRow label="Industry" value={answers.industry} />
            <SummaryRow
              label="Tools"
              value={answers.tools.length ? answers.tools.join(", ") : "—"}
            />
            <SummaryRow label="Urgency" value={answers.urgency} />
            <SummaryRow label="Budget" value={answers.budget} />
            {answers.website && (
              <SummaryRow label="Website" value={answers.website} />
            )}
            {answers.name && <SummaryRow label="Name" value={answers.name} />}
            {answers.email && <SummaryRow label="Email" value={answers.email} />}
          </dl>
          {answers.notes && (
            <div className="mt-4 border-t border-border pt-4">
              <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Notes
              </dt>
              <dd className="mt-1 text-sm leading-relaxed text-foreground">
                {answers.notes}
              </dd>
            </div>
          )}
        </div>

        <div className="mx-auto mt-8 flex max-w-xl flex-col items-center justify-center gap-3 sm:flex-row">
          <Button variant="electric" size="lg" className="w-full sm:w-auto">
            Submit Project
            <ArrowRight className="size-4" />
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            <Link href="/start">Book a Strategy Call</Link>
          </Button>
        </div>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <RotateCcw className="size-3.5" />
            Start over
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
      {/* Progress */}
      <div className="flex items-center justify-between gap-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Step {step} of {TOTAL_STEPS}
        </span>
        <span className="text-xs font-medium text-muted-foreground">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        <motion.div
          className="h-full rounded-full bg-electric"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <h2 className="mt-7 font-display text-xl font-semibold tracking-tight text-balance sm:text-2xl">
        {stepTitles[step - 1]}
      </h2>

      <div className="relative mt-6 min-h-[260px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {step === 1 && (
              <OptionGrid
                options={briefSteps.goals}
                value={answers.goal}
                onSelect={(v) => update("goal", v)}
              />
            )}

            {step === 2 && (
              <OptionGrid
                options={briefSteps.industries}
                value={answers.industry}
                onSelect={(v) => update("industry", v)}
                columns={3}
              />
            )}

            {step === 3 && (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {briefSteps.tools.map((tool) => {
                  const id = `tool-${tool}`;
                  const checked = answers.tools.includes(tool);
                  return (
                    <label
                      key={tool}
                      htmlFor={id}
                      className={cn(
                        "flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition-all",
                        checked
                          ? "border-ink bg-secondary/60"
                          : "border-border bg-card hover:border-foreground/20 hover:bg-secondary/40"
                      )}
                    >
                      <Checkbox
                        id={id}
                        checked={checked}
                        onCheckedChange={() => toggleTool(tool)}
                      />
                      <Label
                        htmlFor={id}
                        className="cursor-pointer font-medium"
                      >
                        {tool}
                      </Label>
                    </label>
                  );
                })}
              </div>
            )}

            {step === 4 && (
              <OptionGrid
                options={briefSteps.urgency}
                value={answers.urgency}
                onSelect={(v) => update("urgency", v)}
              />
            )}

            {step === 5 && (
              <OptionGrid
                options={briefSteps.budgets}
                value={answers.budget}
                onSelect={(v) => update("budget", v)}
              />
            )}

            {step === 6 && (
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="website">Website URL</Label>
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://yourcompany.com"
                    value={answers.website}
                    onChange={(e) => update("website", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes &amp; context</Label>
                  <Textarea
                    id="notes"
                    placeholder="Tell us anything that helps us scope the work — goals, constraints, examples you like…"
                    value={answers.notes}
                    onChange={(e) => update("notes", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Files</Label>
                  <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-secondary/30 px-6 py-8 text-center">
                    <UploadCloud className="size-6 text-muted-foreground" />
                    <p className="mt-3 text-sm font-medium text-foreground">
                      Drag &amp; drop files here
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Briefs, brand assets, spreadsheets, screenshots — optional
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      value={answers.name}
                      onChange={(e) => update("name", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@company.com"
                      value={answers.email}
                      onChange={(e) => update("email", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nav */}
      <div className="mt-8 flex items-center justify-between gap-3 border-t border-border pt-6">
        <Button
          type="button"
          variant="ghost"
          onClick={goBack}
          disabled={step === 1}
          className={cn(step === 1 && "invisible")}
        >
          <ArrowLeft className="size-4" />
          Back
        </Button>
        <Button
          type="button"
          variant="electric"
          onClick={goNext}
          disabled={!canContinue}
        >
          {step === TOTAL_STEPS ? "Review brief" : "Continue"}
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-0.5 text-sm font-medium text-foreground">{value}</dd>
    </div>
  );
}
