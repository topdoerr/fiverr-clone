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
import { cn } from "@/lib/utils";
import type { Brief } from "@/lib/dashboard/types";

const TOTAL = 7;

export default function NewBriefPage() {
  const { user, submitBrief, toast } = useApp();
  const router = useRouter();
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
      "Project brief submitted. TopDoerr will review and assign your delivery pod."
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
      <span className="text-sm text-forest/55">{label}</span>
      <span className="text-sm font-medium text-forest sm:max-w-[60%] sm:text-right">
        {value || "—"}
      </span>
    </div>
  );

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      {/* Header */}
      <div>
        <p className="text-sm font-medium text-cobalt">AI Brief Builder</p>
        <h1 className="mt-1 font-display text-2xl font-semibold tracking-tight text-forest sm:text-3xl">
          Tell us the outcome. We&apos;ll handle the rest.
        </h1>
        <p className="mt-2 text-sm text-forest/60">
          Answer a few questions and TopDoerr will scope, assign a delivery
          pod, and build the result.
        </p>
      </div>

      {/* Progress */}
      <div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-forest/50">
            Step {step} of {TOTAL}
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
                  What do you want AI to build, automate, or improve?
                </h2>
                <p className="mt-1 text-sm text-forest/55">
                  Pick the closest fit. We&apos;ll refine the scope with you.
                </p>
                <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {briefOptions.projectTypes.map((o) => (
                    <Pill
                      key={o}
                      active={projectType === o}
                      onClick={() => setProjectType(o)}
                    >
                      {o}
                    </Pill>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="font-display text-xl font-semibold text-forest">
                  Describe the project.
                </h2>
                <div className="mt-6 space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="title">Project title</Label>
                    <Input
                      id="title"
                      placeholder="e.g. AI voice agent for inbound calls"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="problem">
                      What problem are you trying to solve?
                    </Label>
                    <Textarea
                      id="problem"
                      placeholder="Describe the challenge or opportunity…"
                      value={problem}
                      onChange={(e) => setProblem(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="outcome">
                      What should the final result look like?
                    </Label>
                    <Textarea
                      id="outcome"
                      placeholder="Describe your ideal outcome…"
                      value={desiredOutcome}
                      onChange={(e) => setDesiredOutcome(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="audience">Who will use this?</Label>
                    <Input
                      id="audience"
                      placeholder="e.g. Customers, sales team, operations"
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
                  Current process
                </h2>
                <div className="mt-6 space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="today">How is this done today?</Label>
                    <Textarea
                      id="today"
                      placeholder="Describe the current workflow…"
                      value={processToday}
                      onChange={(e) => setProcessToday(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="ptools">What tools are involved?</Label>
                    <Textarea
                      id="ptools"
                      placeholder="List the tools, systems, or spreadsheets…"
                      value={processTools}
                      onChange={(e) => setProcessTools(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="broken">
                      What is broken, slow, expensive, or manual?
                    </Label>
                    <Textarea
                      id="broken"
                      placeholder="Tell us what isn't working…"
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
                  Tools and integrations
                </h2>
                <p className="mt-1 text-sm text-forest/55">
                  Select everything we may need to connect to.
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
                      {o}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 5 && (
              <div>
                <h2 className="font-display text-xl font-semibold text-forest">
                  Files and examples
                </h2>
                <p className="mt-1 text-sm text-forest/55">
                  Share anything that helps us understand the goal.
                </p>
                <div className="mt-6 space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="website">Website URL</Label>
                    <Input
                      id="website"
                      placeholder="https://"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="links">Reference links</Label>
                    <Input
                      id="links"
                      placeholder="Docs, examples, inspiration…"
                      value={links}
                      onChange={(e) => setLinks(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-forest/15 bg-cream/60 px-6 py-10 text-center">
                    <UploadCloud className="size-7 text-forest/40" />
                    <p className="mt-2 text-sm text-forest/60">
                      Drag &amp; drop files here, or upload after your brief is
                      submitted.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display text-xl font-semibold text-forest">
                    Budget
                  </h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {briefOptions.budgets.map((o) => (
                      <Pill
                        key={o}
                        active={budget === o}
                        onClick={() => setBudget(o)}
                      >
                        {o}
                      </Pill>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="font-display text-xl font-semibold text-forest">
                    Timeline
                  </h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {briefOptions.timelines.map((o) => (
                      <Pill
                        key={o}
                        active={timeline === o}
                        onClick={() => setTimeline(o)}
                      >
                        {o}
                      </Pill>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 7 && (
              <div>
                <h2 className="font-display text-xl font-semibold text-forest">
                  Review brief
                </h2>
                <p className="mt-1 text-sm text-forest/55">
                  Confirm the details below before submitting.
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
                    onClick={() => toast("Draft saved.")}
                  >
                    Save Draft
                  </Button>
                  <Button variant="lime" onClick={submit}>
                    Submit Brief
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
                Back
              </Button>
            ) : (
              <span />
            )}
            <Button variant="lime" onClick={next} disabled={!canContinue}>
              Continue
              <ArrowRight className="size-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
