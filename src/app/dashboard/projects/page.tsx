"use client";

import { useState } from "react";
import Link from "next/link";
import { FolderKanban } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/dashboard/primitives";
import { ProjectCard } from "@/components/dashboard/project-card";
import { useApp } from "@/lib/dashboard/store";
import { cn } from "@/lib/utils";
import type { ProjectStatus } from "@/lib/dashboard/types";

type Filter = "All" | "Active" | "In Review" | "Completed";

const filters: Filter[] = ["All", "Active", "In Review", "Completed"];

const inactiveStatuses = new Set<ProjectStatus>([
  "Completed",
  "Cancelled",
  "Draft Brief",
]);

export default function ProjectsPage() {
  const { projects } = useApp();
  const [filter, setFilter] = useState<Filter>("All");

  const filtered = projects.filter((p) => {
    switch (filter) {
      case "Active":
        return !inactiveStatuses.has(p.status);
      case "In Review":
        return p.status === "In QA Review";
      case "Completed":
        return p.status === "Completed";
      default:
        return true;
    }
  });

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight text-forest">
            Projects
          </h1>
          <p className="mt-2 text-sm text-forest/60">
            Every project TopDoerr is delivering for you.
          </p>
        </div>
        <Button variant="lime" asChild>
          <Link href="/dashboard/briefs/new">Start Project</Link>
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm transition-colors",
              filter === f
                ? "border-lime-dim bg-lime/25 font-medium text-forest"
                : "border-forest/15 text-forest/60 hover:border-forest/30"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={FolderKanban}
          title="No projects here yet."
          description="Start your first project and TopDoerr will scope, assign, build, and deliver it."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      )}
    </div>
  );
}
