import Link from "next/link";
import { ArrowRight, CalendarDays, Flag } from "lucide-react";
import { Avatar, ProgressBar, StatusBadge } from "@/components/dashboard/primitives";
import { statusConfig, progressToneClass } from "@/lib/dashboard/status";
import type { Project } from "@/lib/dashboard/types";

export function ProjectCard({ project }: { project: Project }) {
  const tone = statusConfig[project.status].tone;
  return (
    <div className="flex flex-col rounded-2xl border border-forest/10 bg-white p-5 transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-base font-semibold leading-snug text-forest">
            {project.title}
          </h3>
          <p className="mt-1 text-xs text-forest/55">{project.category}</p>
        </div>
        <StatusBadge status={project.status} />
      </div>

      <div className="mt-4 space-y-2 text-sm">
        <div className="flex items-center gap-2 text-forest/70">
          <Flag className="size-4 text-forest/40" />
          <span className="text-forest/55">Milestone:</span> {project.currentMilestone}
        </div>
        <div className="flex items-center gap-2 text-forest/70">
          <CalendarDays className="size-4 text-forest/40" />
          <span className="text-forest/55">Due:</span> {project.dueDate}
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-1.5 flex items-center justify-between text-xs text-forest/55">
          <span>{project.currentMilestone}</span>
          <span className="font-medium text-forest">{project.progress}%</span>
        </div>
        <ProgressBar value={project.progress} toneClass={progressToneClass[tone]} />
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-forest/10 pt-4">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {project.assignedPod.slice(0, 4).map((m) => (
              <Avatar
                key={m.id}
                initials={m.initials}
                className="size-7 border-2 border-white text-[10px]"
              />
            ))}
          </div>
          <span className="text-xs text-forest/55">TopDoerr Pod</span>
        </div>
        <Link
          href={`/dashboard/projects/${project.id}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-cobalt hover:underline"
        >
          View Project
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}
