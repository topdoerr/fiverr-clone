"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Check,
  MessageSquare,
  Upload,
  RefreshCw,
  Download,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ProgressBar,
  StatusBadge,
} from "@/components/dashboard/primitives";
import {
  MilestoneTimeline,
  AssignedPodCard,
} from "@/components/dashboard/project-bits";
import { MessageThread } from "@/components/dashboard/message-thread";
import {
  FileUploadModal,
  RevisionRequestModal,
} from "@/components/dashboard/modals";
import { useApp } from "@/lib/dashboard/store";
import { useT } from "@/lib/i18n/client";
import { cn } from "@/lib/utils";

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { getProject, messages, files, approveProject } = useApp();
  const t = useT();
  const project = getProject(id);

  const [uploadOpen, setUploadOpen] = useState(false);
  const [revisionOpen, setRevisionOpen] = useState(false);

  if (!project) {
    return (
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="mx-auto max-w-md rounded-2xl border border-forest/10 bg-white p-10 text-center">
          <h1 className="font-display text-xl font-semibold text-forest">
            {t("Project not found")}
          </h1>
          <p className="mt-2 text-sm text-forest/60">
            {t("We couldn't find that project. It may have been removed.")}
          </p>
          <Button asChild variant="lime" className="mt-6">
            <Link href="/dashboard/projects">{t("Back to projects")}</Link>
          </Button>
        </div>
      </div>
    );
  }

  const projectFiles = files.filter((f) => f.projectId === id);
  const projectMessages = messages.filter((m) => m.projectId === id);
  const showDelivery =
    project.status === "Delivered" || project.status === "Completed";

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <Link
          href="/dashboard/projects"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-cobalt hover:underline"
        >
          <ArrowLeft className="size-4" />
          {t("Back to projects")}
        </Link>

        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
          <div>
            <h1 className="font-display text-2xl font-semibold tracking-tight text-forest">
              {project.title}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-forest/60">
              <StatusBadge status={project.status} />
              <span>{project.category}</span>
              <span className="text-forest/30">·</span>
              <span>{project.packageName}</span>
              {project.startDate && (
                <>
                  <span className="text-forest/30">·</span>
                  <span>{t("Started")} {project.startDate}</span>
                </>
              )}
              <span className="text-forest/30">·</span>
              <span>{t("Est. delivery")} {project.dueDate}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button asChild variant="forest">
              <a href="#messages">
                <MessageSquare className="size-4" />
                {t("Message TopDoerr")}
              </a>
            </Button>
            <Button variant="outline" onClick={() => setUploadOpen(true)}>
              <Upload className="size-4" />
              {t("Upload File")}
            </Button>
            <Button variant="lime" onClick={() => setRevisionOpen(true)}>
              <RefreshCw className="size-4" />
              {t("Request Revision")}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* Main column */}
        <div className="space-y-8">
          {/* Progress */}
          <div className="rounded-2xl border border-forest/10 bg-white p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-sm font-semibold text-forest">
                {t("Overall progress")}
              </h2>
              <span className="text-sm font-medium text-forest">
                {project.progress}% {t("complete")}
              </span>
            </div>
            <ProgressBar
              value={project.progress}
              toneClass="bg-cobalt"
              className="mt-3"
            />
          </div>

          {/* Progress timeline */}
          <div className="rounded-2xl border border-forest/10 bg-white p-5">
            <h2 className="mb-4 font-display text-sm font-semibold text-forest">
              {t("Progress")}
            </h2>
            <MilestoneTimeline milestones={project.milestones} />
          </div>

          {/* Deliverables */}
          <div className="rounded-2xl border border-forest/10 bg-white p-5">
            <h2 className="mb-4 font-display text-sm font-semibold text-forest">
              {t("Deliverables")}
            </h2>
            <ul className="space-y-3">
              {project.deliverables.map((d) => (
                <li key={d.id} className="flex items-center gap-3">
                  <span
                    className={cn(
                      "flex size-5 shrink-0 items-center justify-center rounded-full border",
                      d.done
                        ? "border-lime-dim bg-lime-dim text-white"
                        : "border-forest/20 bg-white"
                    )}
                  >
                    {d.done && <Check className="size-3" strokeWidth={3} />}
                  </span>
                  <span
                    className={cn(
                      "text-sm",
                      d.done
                        ? "text-forest/45 line-through"
                        : "text-forest"
                    )}
                  >
                    {d.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Client actions needed */}
          <div className="rounded-2xl border border-forest/10 bg-white p-5">
            <h2 className="mb-4 font-display text-sm font-semibold text-forest">
              {t("Action needed from you")}
            </h2>
            <ul className="space-y-3">
              {project.clientActions.map((a) => (
                <li key={a.id} className="flex items-center gap-3">
                  {a.done ? (
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full border border-lime-dim bg-lime-dim text-white">
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                  ) : (
                    <span className="flex size-5 shrink-0 items-center justify-center">
                      <span className="size-2 rounded-full bg-amber-400" />
                    </span>
                  )}
                  <span
                    className={cn(
                      "text-sm",
                      a.done ? "text-forest/45 line-through" : "text-forest"
                    )}
                  >
                    {a.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Files */}
          <div className="rounded-2xl border border-forest/10 bg-white p-5">
            <h2 className="mb-4 font-display text-sm font-semibold text-forest">
              {t("Files")}
            </h2>
            {projectFiles.length ? (
              <ul className="space-y-2">
                {projectFiles.map((f) => (
                  <li
                    key={f.id}
                    className="flex items-center justify-between gap-4 rounded-xl border border-forest/10 bg-cream/40 px-4 py-3"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white text-forest">
                        <FileText className="size-4" />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-forest">
                          {f.name}
                        </p>
                        <p className="text-xs text-forest/55">
                          {f.type} · {f.size}
                        </p>
                      </div>
                    </div>
                    <span
                      className={cn(
                        "shrink-0 rounded-full border px-2 py-0.5 text-[11px] font-medium",
                        f.uploadedBy === "buyer"
                          ? "border-cobalt/20 bg-cobalt/10 text-cobalt"
                          : "border-forest/15 bg-forest/5 text-forest/70"
                      )}
                    >
                      {f.uploadedBy === "buyer" ? t("You") : "TopDoerr"}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-forest/50">
                  {t("No files yet for this project.")}
                </p>
                <Button variant="outline" onClick={() => setUploadOpen(true)}>
                  <Upload className="size-4" />
                  {t("Upload File")}
                </Button>
              </div>
            )}
          </div>

          {/* Messages */}
          <section id="messages" className="scroll-mt-24 space-y-4">
            <h2 className="font-display text-lg font-semibold text-forest">
              {t("Messages")}
            </h2>
            <MessageThread projectId={id} messages={projectMessages} />
          </section>

          {/* Final delivery area */}
          {showDelivery && (
            <div className="rounded-2xl border border-lime-dim/40 bg-lime/10 p-5">
              <h2 className="font-display text-base font-semibold text-forest">
                {t("Final delivery")}
              </h2>
              <p className="mt-1 text-sm text-forest/60">
                {t("Review your deliverables, approve the project, or request any last changes.")}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button variant="outline">
                  <Download className="size-4" />
                  {t("Download deliverables")}
                </Button>
                <Button variant="lime" onClick={() => approveProject(id)}>
                  <Check className="size-4" />
                  {t("Approve project")}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setRevisionOpen(true)}
                >
                  <RefreshCw className="size-4" />
                  {t("Request revision")}
                </Button>
                <Button asChild variant="forest">
                  <Link href="/dashboard/briefs/new">
                    {t("Start a follow-up project")}
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar column */}
        <div className="space-y-6">
          <AssignedPodCard pod={project.assignedPod} />

          <div className="rounded-2xl border border-forest/10 bg-white p-5">
            <h3 className="font-display text-sm font-semibold text-forest">
              {t("Current milestone")}
            </h3>
            <p className="mt-3 text-sm font-medium text-forest">
              {project.currentMilestone}
            </p>
            <p className="mt-1 text-xs text-forest/55">{t("Owner: TopDoerr Pod")}</p>
            <p className="mt-1 text-xs text-forest/55">
              {t("Due")} {project.dueDate}
            </p>
            <div className="mt-3">
              <StatusBadge status={project.status} />
            </div>
          </div>
        </div>
      </div>

      <FileUploadModal
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        projectId={id}
      />
      <RevisionRequestModal
        open={revisionOpen}
        onClose={() => setRevisionOpen(false)}
        projectId={id}
      />
    </div>
  );
}
