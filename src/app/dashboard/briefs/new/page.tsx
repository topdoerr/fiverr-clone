"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useApp } from "@/lib/dashboard/store";
import { briefOptions } from "@/lib/dashboard/mock-data";
import { useT } from "@/lib/i18n/client";
import { cn } from "@/lib/utils";
import type { Brief } from "@/lib/dashboard/types";

const TOTAL = 7;

export default function NewBriefPage() {
  const { user, submitBrief, toast } = useApp();
  const router = useRouter();
  const t = useT();
  const [step, setStep] = useState(1);

  // Answers
  const [projectType, setProjectType] = useState("");
  const [title, setTitle] = useState("");
  const [problem, setProblem] = useState("");
  const [desiredOutcome, setDesiredOutcome] = useState("");
  const [audience, setAudience] = useState("");
  const [processToday, setProcessToday] = useState("");
  const [processTools, setProcessTools] = useState("");
  const [processBroken, setProcessBroken] = useState("");
  const [tools, setTools] = useState<string[]>([]);
  const [website, setWebsite] = useState("");
  const [links, setLinks] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");

  const toggleTool = (value: string) => {
    setTools((list) =>
      list.includes(value) ? list.filter((x) => x !== value) : [...list, value]
    );
  };

  const canContinue =
    step === 1 ? projectType !== "" : step === 2 ? title.trim() !== "" : true;

  const next = () => setStep((s) => Math.min(TOTAL, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  const buildBrief = (): Brief => ({
    id: `brief_${Math.random().toString(36).slice(2, 9)}`,
    userId: user?.id ?? "usr",
    projectType,
    title,
    problem,
    desiredOutcome,
    audience,
    currentProcess: [processToday, processTools, processBroken]
      .filter(Boolean)
      .join(" | "),
    tools,
    files: [website, links].filter(Boolean),
    budgetRange: budget,
    timeline,
    status: "submitted",
    createdAt: new Date().toISOString(),
  });

  const submit = () => {
    const projectId = submitBrief(buildBrief());
    toast(
      t("Project brief submitted. TopDoerr will review and assign your delivery pod.")
    );
    router.push(`/dashboard/projects/${projectId}`);
  };

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

  const SummaryRow = ({
    label,
    value,
  }: {
    label: string;
    value: string;
  }) => (
    <div className="flex flex-col gap-0.5 border-b border-forest/10 py-3 sm:flex-row sm:justify-between sm:gap-4">
      <span className="text-sm text-forest/55">{t(label)}</span>
      <span className="text-sm font-medium text-forest sm:max-w-[60%] sm:text-right">
        {value || "—"}
      </span>
    </div>
  );

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      {/* Header */}
      <div>
        <p className="text-sm font-medium text-cobalt">{t("AI Brief Builder")}</p>
        <h1 className="mt-1 font-display text-2xl font-semibold tracking-tight text-forest sm:text-3xl">
          {t("Tell us the outcome. We'll handle the rest.")}
        </h1>
        <p className="mt-2 text-sm text-forest/60">
          {t("Answer a few questions and TopDoerr will scope, assign a delivery pod, and build the result.")}
        </p>
      </div>

      {/* Progress */}
      <div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-forest/50">
            {t("Step")} {step} {t("of")} {TOTAL}
          </span>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-forest/10">
          <div
            className="h-full rounded-full bg-lime-dim transition-all duration-500"
            style={{ width: `${(step / TOTAL) * 100}%` }}
          />
        </div>
      </div>

      {/* Card */}
      <div className="rounded-3xl border border-forest/10 bg-white p-6 sm:p-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            {step === 1 && (
              <div>
                <h2 className="font-display text-xl font-semibold text-forest">
                  {t("What do you want AI to build, automate, or improve?")}
                </h2>
                <p className="mt-1 text-sm text-forest/55">
                  {t("Pick the closest fit. We'll refine the scope with you.")}
                </p>
                <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {briefOptions.projectTypes.map((o) => (
                    <Pill
                      key={o}
                      active={projectType === o}
                      onClick={() => setProjectType(o)}
                    >
                      {t(o)}
                    </Pill>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="font-display text-xl font-semibold text-forest">
                  {t("Describe the project.")}
                </h2>
                <div className="mt-6 space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="title">{t("Project title")}</Label>
                    <Input
                      id="title"
                      placeholder={t("e.g. AI voice agent for inbound calls")}
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="problem">
                      {t("What problem are you trying to solve?")}
                    </Label>
                    <Textarea
                      id="problem"
                      placeholder={t("Describe the challenge or opportunity…")}
                      value={problem}
                      onChange={(e) => setProblem(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="outcome">
                      {t("What should the final result look like?")}
                    </Label>
                    <Textarea
                      id="outcome"
                      placeholder={t("Describe your ideal outcome…")}
                      value={desiredOutcome}
                      onChange={(e) => setDesiredOutcome(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="audience">{t("Who will use this?")}</Label>
                    <Input
                      id="audience"
                      placeholder={t("e.g. Customers, sales team, operations")}
                      value={audience}
                      onChange={(e) => setAudience(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="font-display text-xl font-semibold text-forest">
                  {t("Current process")}
                </h2>
                <div className="mt-6 space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="today">{t("How is this done today?")}</Label>
                    <Textarea
                      id="today"
                      placeholder={t("Describe the current workflow…")}
                      value={processToday}
                      onChange={(e) => setProcessToday(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="ptools">{t("What tools are involved?")}</Label>
                    <Textarea
                      id="ptools"
                      placeholder={t("List the tools, systems, or spreadsheets…")}
                      value={processTools}
                      onChange={(e) => setProcessTools(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="broken">
                      {t("What is broken, slow, expensive, or manual?")}
                    </Label>
                    <Textarea
                      id="broken"
                      placeholder={t("Tell us what isn't working…")}
                      value={processBroken}
                      onChange={(e) => setProcessBroken(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h2 className="font-display text-xl font-semibold text-forest">
                  {t("Tools and integrations")}
                </h2>
                <p className="mt-1 text-sm text-forest/55">
                  {t("Select everything we may need to connect to.")}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {briefOptions.tools.map((o) => (
                    <button
                      key={o}
                      type="button"
                      onClick={() => toggleTool(o)}
                      className={cn(
                        "rounded-full border px-4 py-2 text-sm transition-colors",
                        tools.includes(o)
                          ? "border-lime-dim bg-lime/25 font-medium text-forest"
                          : "border-forest/15 bg-white text-forest/70 hover:border-forest/30"
                      )}
                    >
                      {t(o)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 5 && (
              <div>
                <h2 className="font-display text-xl font-semibold text-forest">
                  {t("Files and examples")}
                </h2>
                <p className="mt-1 text-sm text-forest/55">
                  {t("Share anything that helps us understand the goal.")}
                </p>
                <div className="mt-6 space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="website">{t("Website URL")}</Label>
                    <Input
                      id="website"
                      placeholder="https://"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="links">{t("Reference links")}</Label>
                    <Input
                      id="links"
                      placeholder={t("Docs, examples, inspiration…")}
                      value={links}
                      onChange={(e) => setLinks(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-forest/15 bg-cream/60 px-6 py-10 text-center">
                    <UploadCloud className="size-7 text-forest/40" />
                    <p className="mt-2 text-sm text-forest/60">
                      {t("Drag & drop files here, or upload after your brief is submitted.")}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display text-xl font-semibold text-forest">
                    {t("Budget")}
                  </h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {briefOptions.budgets.map((o) => (
                      <Pill
                        key={o}
                        active={budget === o}
                        onClick={() => setBudget(o)}
                      >
                        {t(o)}
                      </Pill>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="font-display text-xl font-semibold text-forest">
                    {t("Timeline")}
                  </h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {briefOptions.timelines.map((o) => (
                      <Pill
                        key={o}
                        active={timeline === o}
                        onClick={() => setTimeline(o)}
                      >
                        {t(o)}
                      </Pill>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 7 && (
              <div>
                <h2 className="font-display text-xl font-semibold text-forest">
                  {t("Review brief")}
                </h2>
                <p className="mt-1 text-sm text-forest/55">
                  {t("Confirm the details below before submitting.")}
                </p>
                <div className="mt-5">
                  <SummaryRow label="Project type" value={projectType} />
                  <SummaryRow label="Project title" value={title} />
                  <SummaryRow label="Problem" value={problem} />
                  <SummaryRow label="Desired outcome" value={desiredOutcome} />
                  <SummaryRow label="Who will use it" value={audience} />
                  <SummaryRow label="Tools" value={tools.join(", ")} />
                  <SummaryRow label="Budget" value={budget} />
                  <SummaryRow label="Timeline" value={timeline} />
                </div>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
                  <Button
                    variant="outline"
                    onClick={() => toast(t("Draft saved."))}
                  >
                    {t("Save Draft")}
                  </Button>
                  <Button variant="lime" onClick={submit}>
                    {t("Submit Brief")}
                    <ArrowRight className="size-4" />
                  </Button>
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
            <Button variant="lime" onClick={next} disabled={!canContinue}>
              {t("Continue")}
              <ArrowRight className="size-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
