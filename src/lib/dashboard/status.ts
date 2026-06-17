import type { ProjectStatus } from "./types";

export type StatusTone =
  | "gray"
  | "cobalt"
  | "amber"
  | "lime"
  | "orange"
  | "red";

export const statusConfig: Record<
  ProjectStatus,
  { tone: StatusTone; className: string }
> = {
  "Draft Brief": { tone: "gray", className: "bg-forest/5 text-forest/60 border-forest/10" },
  Submitted: { tone: "cobalt", className: "bg-cobalt/10 text-cobalt border-cobalt/20" },
  Scoping: { tone: "cobalt", className: "bg-cobalt/10 text-cobalt border-cobalt/20" },
  "Waiting for Payment": { tone: "amber", className: "bg-amber-100 text-amber-700 border-amber-200" },
  Assigned: { tone: "cobalt", className: "bg-cobalt/10 text-cobalt border-cobalt/20" },
  Building: { tone: "cobalt", className: "bg-cobalt/10 text-cobalt border-cobalt/20" },
  "In QA Review": { tone: "lime", className: "bg-lime/25 text-forest border-lime-dim/40" },
  "Awaiting Client": { tone: "amber", className: "bg-amber-100 text-amber-700 border-amber-200" },
  "Revision Requested": { tone: "orange", className: "bg-orange-100 text-orange-700 border-orange-200" },
  Delivered: { tone: "lime", className: "bg-lime/25 text-forest border-lime-dim/40" },
  Completed: { tone: "lime", className: "bg-lime/25 text-forest border-lime-dim/40" },
  Paused: { tone: "gray", className: "bg-forest/5 text-forest/60 border-forest/10" },
  Cancelled: { tone: "red", className: "bg-red-100 text-red-700 border-red-200" },
};

/** Bar fill color by tone, used by progress bars. */
export const progressToneClass: Record<StatusTone, string> = {
  gray: "bg-forest/30",
  cobalt: "bg-cobalt",
  amber: "bg-amber-400",
  lime: "bg-lime-dim",
  orange: "bg-orange-400",
  red: "bg-red-400",
};
