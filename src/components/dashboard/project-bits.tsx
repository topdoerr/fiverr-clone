"use client";

import Link from "next/link";
import { Check, ArrowRight, Clock, ShieldCheck, FileText, CreditCard } from "lucide-react";
import { Avatar, StatusBadge } from "@/components/dashboard/primitives";
import { Button } from "@/components/ui/button";
import { useT } from "@/lib/i18n/client";
import { cn } from "@/lib/utils";
import type {
  Milestone,
  PodMember,
  RecommendedService,
  Invoice,
} from "@/lib/dashboard/types";

export function MilestoneTimeline({ milestones }: { milestones: Milestone[] }) {
  const t = useT();
  return (
    <ol className="relative space-y-5 pl-2">
      <span className="absolute left-[11px] top-2 bottom-2 w-px bg-forest/10" />
      {milestones.map((m) => (
        <li key={m.id} className="relative flex gap-4">
          <span
            className={cn(
              "relative z-10 mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border-2",
              m.status === "done"
                ? "border-lime-dim bg-lime-dim text-white"
                : m.status === "active"
                  ? "border-cobalt bg-white text-cobalt"
                  : "border-forest/20 bg-white"
            )}
          >
            {m.status === "done" ? (
              <Check className="size-3" strokeWidth={3} />
            ) : m.status === "active" ? (
              <span className="size-2 rounded-full bg-cobalt" />
            ) : null}
          </span>
          <div className="-mt-0.5">
            <p
              className={cn(
                "text-sm font-medium",
                m.status === "upcoming" ? "text-forest/45" : "text-forest"
              )}
            >
              {m.title}
            </p>
            {m.owner && m.status !== "upcoming" && (
              <p className="text-xs text-forest/50">{t(m.owner)}</p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

export function AssignedPodCard({ pod }: { pod: PodMember[] }) {
  const t = useT();
  return (
    <div className="rounded-2xl border border-forest/10 bg-white p-5">
      <div className="flex items-center gap-2">
        <ShieldCheck className="size-4 text-cobalt" />
        <h3 className="font-display text-sm font-semibold text-forest">
          {t("Your TopDoerr Pod")}
        </h3>
      </div>
      <p className="mt-1 text-xs text-forest/55">
        {t("Internal delivery team — assigned and managed by TopDoerr.")}
      </p>
      <ul className="mt-4 space-y-3">
        {pod.map((m) => (
          <li key={m.id} className="flex items-center gap-3">
            <Avatar initials={m.initials} className="size-9 text-xs" />
            <div>
              <p className="text-sm font-medium text-forest">{m.name}</p>
              <p className="text-xs text-forest/55">{m.role}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function RecommendedServiceCard({
  service,
}: {
  service: RecommendedService;
}) {
  const t = useT();
  return (
    <div className="flex h-full flex-col rounded-2xl border border-forest/10 bg-white p-5">
      <h3 className="font-display text-sm font-semibold text-forest">
        {service.name}
      </h3>
      <p className="mt-1.5 flex-1 text-sm text-forest/60">{service.description}</p>
      <div className="mt-3 flex items-center gap-3 text-xs text-forest/55">
        <span className="font-semibold text-forest">{service.startingPrice}</span>
        <span className="inline-flex items-center gap-1">
          <Clock className="size-3.5" />
          {service.timeline}
        </span>
      </div>
      <Button asChild variant="lime" size="sm" className="mt-4 w-full">
        <Link href="/dashboard/briefs/new">
          {t("Start Brief")}
          <ArrowRight className="size-4" />
        </Link>
      </Button>
    </div>
  );
}

const invoiceStatusClass: Record<Invoice["status"], string> = {
  draft: "bg-forest/5 text-forest/60 border-forest/10",
  sent: "bg-amber-100 text-amber-700 border-amber-200",
  paid: "bg-lime/25 text-forest border-lime-dim/40",
  overdue: "bg-red-100 text-red-700 border-red-200",
};

export function InvoiceCard({
  invoice,
  projectTitle,
}: {
  invoice: Invoice;
  projectTitle?: string;
}) {
  const t = useT();
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-forest/10 bg-white p-5">
      <div className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl bg-cream text-forest">
          <CreditCard className="size-5" />
        </span>
        <div>
          <p className="text-sm font-semibold text-forest">{invoice.packageName}</p>
          {projectTitle && (
            <p className="text-xs text-forest/55">{projectTitle}</p>
          )}
        </div>
      </div>
      <div className="text-right">
        <p className="font-display text-base font-semibold text-forest">
          {invoice.amount > 0 ? `$${invoice.amount.toLocaleString()}` : "—"}
        </p>
        <span
          className={cn(
            "mt-1 inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium capitalize",
            invoiceStatusClass[invoice.status]
          )}
        >
          {t(invoice.status)}
        </span>
      </div>
    </div>
  );
}

export { FileText, StatusBadge };
