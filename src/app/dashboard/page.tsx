import type { Metadata } from "next";
import Link from "next/link";
import {
  LayoutGrid,
  FolderKanban,
  MessageSquare,
  FileText,
  CreditCard,
  Settings,
  Sparkles,
  Users,
  Clock,
  CalendarDays,
  ShieldCheck,
  Receipt,
  Paperclip,
  Info,
  ArrowRight,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { CTASection } from "@/components/cta-section";
import { Button } from "@/components/ui/button";
import { dashboardProjects } from "@/lib/data";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Dashboard",
};

type Tone = "amber" | "blue" | "gray";

const toneClasses: Record<Tone, string> = {
  amber: "bg-amber-100 text-amber-700 border-amber-200",
  blue: "bg-blue-100 text-blue-700 border-blue-200",
  gray: "bg-secondary text-muted-foreground border-border",
};

const toneBar: Record<Tone, string> = {
  amber: "bg-amber-500",
  blue: "bg-blue-500",
  gray: "bg-foreground/40",
};

const sidebarNav = [
  { label: "Overview", icon: LayoutGrid, href: "/dashboard", active: true },
  { label: "Projects", icon: FolderKanban, href: "#" },
  { label: "Messages", icon: MessageSquare, href: "#" },
  { label: "Files", icon: FileText, href: "#" },
  { label: "Billing", icon: CreditCard, href: "#" },
];

export default function DashboardPage() {
  const activeCount = dashboardProjects.length;
  const inReview = dashboardProjects.filter((p) => p.qa === "In review").length;
  const awaitingYou = dashboardProjects.filter(
    (p) => p.statusTone === "gray"
  ).length;
  const podsAssigned = new Set(dashboardProjects.map((p) => p.pod)).size;

  const stats = [
    { label: "Active projects", value: activeCount, icon: FolderKanban },
    { label: "In review", value: inReview, icon: ShieldCheck },
    { label: "Awaiting you", value: awaitingYou, icon: Clock },
    { label: "Pods assigned", value: podsAssigned, icon: Users },
  ];

  return (
    <>
      <div className="border-b border-border bg-secondary/30">
        <div className="container-tight flex min-h-[calc(100vh-4rem)] gap-0 lg:gap-8 lg:py-8">
          {/* Sidebar */}
          <aside className="hidden w-60 shrink-0 lg:block">
            <div className="sticky top-24 rounded-2xl border border-border bg-card p-4">
              <div className="flex items-center gap-2 px-2 py-1.5">
                <span className="flex size-8 items-center justify-center rounded-lg bg-ink text-electric">
                  <Sparkles className="size-4" />
                </span>
                <span className="font-display text-sm font-semibold">
                  Workspace
                </span>
              </div>
              <nav className="mt-4 space-y-1">
                {sidebarNav.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        item.active
                          ? "bg-ink text-white"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      )}
                    >
                      <Icon className="size-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
              <div className="mt-4 border-t border-border pt-4">
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  <Settings className="size-4" />
                  Settings
                </Link>
              </div>
              <div className="mt-4 rounded-xl border border-border bg-secondary/50 p-4">
                <p className="text-xs font-medium text-foreground">
                  Need something new?
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Start a brief and we&apos;ll scope it.
                </p>
                <Button asChild size="sm" variant="electric" className="mt-3 w-full">
                  <Link href="/start">New project</Link>
                </Button>
              </div>
            </div>
          </aside>

          {/* Main */}
          <main className="min-w-0 flex-1 py-8 lg:py-0">
            {/* Preview banner */}
            <Reveal>
              <div className="mb-6 flex items-center gap-2.5 rounded-xl border border-border bg-card px-4 py-3 text-sm text-muted-foreground">
                <Info className="size-4 shrink-0 text-foreground" />
                <span>
                  This is a product preview of the TopDoerr client dashboard.
                </span>
              </div>
            </Reveal>

            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                  Your projects
                </h1>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Track delivery, milestones, and what needs your input.
                </p>
              </div>
              <Button asChild>
                <Link href="/start">
                  Start a project
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <Reveal key={stat.label} delay={(i % 4) * 0.05}>
                    <div className="rounded-2xl border border-border bg-card p-5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-muted-foreground">
                          {stat.label}
                        </span>
                        <Icon className="size-4 text-muted-foreground" />
                      </div>
                      <div className="mt-3 font-display text-3xl font-semibold tracking-tight">
                        {stat.value}
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            {/* Project cards */}
            <div className="mt-6 space-y-4">
              {dashboardProjects.map((project, i) => {
                const tone = project.statusTone as Tone;
                return (
                  <Reveal key={project.title} delay={(i % 3) * 0.05}>
                    <div className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-foreground/20">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="font-display text-base font-semibold tracking-tight">
                            {project.title}
                          </h3>
                          <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                            <span className="inline-flex items-center gap-1.5">
                              <Users className="size-3.5" />
                              {project.pod}
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                              <CalendarDays className="size-3.5" />
                              Due {project.due}
                            </span>
                          </div>
                        </div>
                        <span
                          className={cn(
                            "inline-flex shrink-0 items-center rounded-full border px-2.5 py-1 text-xs font-medium",
                            toneClasses[tone]
                          )}
                        >
                          {project.status}
                        </span>
                      </div>

                      {/* Progress */}
                      <div className="mt-5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-medium text-foreground">
                            {project.nextMilestone}
                          </span>
                          <span className="text-muted-foreground">
                            {project.progress}%
                          </span>
                        </div>
                        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                          <div
                            className={cn(
                              "h-full rounded-full",
                              toneBar[tone]
                            )}
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>

                      {/* Meta row */}
                      <div className="mt-5 grid grid-cols-2 gap-4 border-t border-border pt-4 sm:grid-cols-4">
                        <Meta
                          icon={ShieldCheck}
                          label="QA"
                          value={project.qa}
                        />
                        <Meta
                          icon={Receipt}
                          label="Invoice"
                          value={project.invoice}
                        />
                        <Meta
                          icon={Paperclip}
                          label="Files"
                          value={String(project.files)}
                        />
                        <Meta
                          icon={MessageSquare}
                          label="Messages"
                          value={String(project.messages)}
                        />
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </main>
        </div>
      </div>

      <CTASection
        title="This is how delivery feels."
        description="One workspace. Clear scope, live progress, human-reviewed delivery. Start a project and watch it move."
      />
    </>
  );
}

function Meta({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof ShieldCheck;
  label: string;
  value: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Icon className="size-3.5" />
        {label}
      </div>
      <div className="mt-1 text-sm font-medium text-foreground">{value}</div>
    </div>
  );
}
