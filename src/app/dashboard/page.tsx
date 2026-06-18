"use client";

import Link from "next/link";
import {
  FolderKanban,
  Eye,
  Clock,
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  Upload,
  CalendarClock,
  Rocket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MetricCard, EmptyState } from "@/components/dashboard/primitives";
import { ProjectCard } from "@/components/dashboard/project-card";
import { RecommendedServiceCard } from "@/components/dashboard/project-bits";
import { useApp } from "@/lib/dashboard/store";
import { recommendedServices } from "@/lib/dashboard/mock-data";
import { useT } from "@/lib/i18n/client";

export default function DashboardPage() {
  const { user, projects, messages, invoices } = useApp();
  const t = useT();

  const firstName = (user?.fullName ?? "there").split(" ")[0];
  const activeStatuses = new Set([
    "Submitted",
    "Scoping",
    "Waiting for Payment",
    "Assigned",
    "Building",
    "In QA Review",
    "Awaiting Client",
    "Revision Requested",
    "Delivered",
  ]);
  const active = projects.filter((p) => activeStatuses.has(p.status));
  const inReview = projects.filter((p) => p.status === "In QA Review").length;
  const awaiting = projects.filter((p) => p.status === "Awaiting Client").length;
  const completed = projects.filter((p) => p.status === "Completed").length;

  const latestMessage = messages[messages.length - 1];
  const filesNeeded = projects
    .flatMap((p) =>
      p.clientActions.filter((a) => !a.done).map((a) => ({ ...a, project: p.title }))
    )
    .slice(0, 4);
  const paidInvoice = invoices.find((i) => i.status === "paid");

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* Welcome header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm text-forest/55">{t("Good to see you,")} {firstName}.</p>
          <h1 className="mt-1 font-display text-2xl font-semibold tracking-tight text-forest sm:text-3xl">
            {t("Your AI work, managed in one place.")}
          </h1>
          <p className="mt-2 max-w-xl text-sm text-forest/60">
            {t("Track projects, milestones, files, messages, and deliverables from your TopDoerr delivery pod.")}
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <Button asChild variant="lime">
            <Link href="/dashboard/briefs/new">
              {t("Start New Project")}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/marketplace">{t("View Services")}</Link>
          </Button>
        </div>
      </div>

      {projects.length === 0 ? (
        <EmptyState
          icon={Rocket}
          title="Your AI workspace is ready."
          description="Start your first project and TopDoerr will help scope, assign, build, and deliver the outcome."
          actionLabel="Start Your First Project"
        />
      ) : (
        <>
          {/* Metrics */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <MetricCard label="Active Projects" value={active.length} icon={FolderKanban} />
            <MetricCard label="In Review" value={inReview} icon={Eye} />
            <MetricCard label="Awaiting Client" value={awaiting} icon={Clock} />
            <MetricCard label="Completed" value={completed} icon={CheckCircle2} />
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            {/* Main column */}
            <div className="space-y-8">
              <section>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-display text-lg font-semibold text-forest">
                    {t("Current projects")}
                  </h2>
                  <Link
                    href="/dashboard/projects"
                    className="text-sm font-medium text-cobalt hover:underline"
                  >
                    {t("View all")}
                  </Link>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {active.map((p) => (
                    <ProjectCard key={p.id} project={p} />
                  ))}
                </div>
              </section>

              <section>
                <h2 className="mb-4 font-display text-lg font-semibold text-forest">
                  {t("Recommended AI services")}
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {recommendedServices.slice(0, 3).map((s) => (
                    <RecommendedServiceCard key={s.id} service={s} />
                  ))}
                </div>
              </section>
            </div>

            {/* Side column */}
            <div className="space-y-6">
              {/* Timeline */}
              <div className="rounded-2xl border border-forest/10 bg-white p-5">
                <div className="flex items-center gap-2">
                  <CalendarClock className="size-4 text-cobalt" />
                  <h3 className="font-display text-sm font-semibold text-forest">
                    {t("Project timeline")}
                  </h3>
                </div>
                <ul className="mt-4 space-y-3 text-sm">
                  {[
                    ["Today", "TopDoerr reviewing project brief"],
                    ["Tomorrow", "Internal pod assignment"],
                    ["Friday", "First delivery review"],
                    ["Next week", "Final delivery"],
                  ].map(([when, what]) => (
                    <li key={when} className="flex gap-3">
                      <span className="w-20 shrink-0 font-medium text-forest">{t(when)}</span>
                      <span className="text-forest/60">{t(what)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Messages preview */}
              <div className="rounded-2xl border border-forest/10 bg-white p-5">
                <div className="flex items-center gap-2">
                  <MessageSquare className="size-4 text-cobalt" />
                  <h3 className="font-display text-sm font-semibold text-forest">
                    {t("Latest message")}
                  </h3>
                </div>
                {latestMessage ? (
                  <div className="mt-3">
                    <p className="text-xs font-medium text-forest/70">
                      {latestMessage.senderName}
                    </p>
                    <p className="mt-1 line-clamp-3 text-sm text-forest/60">
                      {latestMessage.body}
                    </p>
                  </div>
                ) : (
                  <p className="mt-3 text-sm text-forest/50">{t("No messages yet.")}</p>
                )}
                <Button asChild variant="ghost" size="sm" className="mt-3 -ml-2">
                  <Link href="/dashboard/messages">
                    {t("Open Messages")}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>

              {/* Files needed */}
              <div className="rounded-2xl border border-forest/10 bg-white p-5">
                <div className="flex items-center gap-2">
                  <Upload className="size-4 text-cobalt" />
                  <h3 className="font-display text-sm font-semibold text-forest">
                    {t("Action needed")}
                  </h3>
                </div>
                {filesNeeded.length ? (
                  <ul className="mt-3 space-y-2 text-sm">
                    {filesNeeded.map((a) => (
                      <li key={a.id} className="flex items-start gap-2 text-forest/70">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-amber-400" />
                        {a.label}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm text-forest/50">
                    {t("You're all caught up.")}
                  </p>
                )}
                <Button asChild variant="ghost" size="sm" className="mt-3 -ml-2">
                  <Link href="/dashboard/files">
                    {t("Upload Files")}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>

              {/* Billing preview */}
              <div className="rounded-2xl border border-forest/10 bg-white p-5">
                <h3 className="font-display text-sm font-semibold text-forest">
                  {t("Billing")}
                </h3>
                <div className="mt-3 space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-forest/55">{t("Current package")}</span>
                    <span className="font-medium text-forest">
                      {paidInvoice?.packageName ?? "—"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-forest/55">{t("Invoice")}</span>
                    <span className="font-medium text-forest">
                      {paidInvoice ? t("Paid") : "—"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-forest/55">{t("Balance")}</span>
                    <span className="font-medium text-forest">$0</span>
                  </div>
                </div>
                <Button asChild variant="ghost" size="sm" className="mt-3 -ml-2">
                  <Link href="/dashboard/billing">
                    {t("View billing")}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
