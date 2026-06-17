"use client";

import { CreditCard, Wallet, FileText } from "lucide-react";
import { MetricCard, EmptyState } from "@/components/dashboard/primitives";
import { InvoiceCard } from "@/components/dashboard/project-bits";
import { useApp } from "@/lib/dashboard/store";

function formatUsd(amount: number) {
  return `$${amount.toLocaleString("en-US")}`;
}

export default function BillingPage() {
  const { invoices, projects } = useApp();

  const totalPaid = invoices
    .filter((i) => i.status === "paid")
    .reduce((sum, i) => sum + i.amount, 0);
  const outstanding = invoices
    .filter((i) => i.status === "sent" || i.status === "overdue")
    .reduce((sum, i) => sum + i.amount, 0);

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-forest">
          Billing
        </h1>
        <p className="mt-2 text-sm text-forest/60">
          Invoices, payments, and package history.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <MetricCard label="Total paid" value={formatUsd(totalPaid)} icon={Wallet} />
        <MetricCard
          label="Outstanding"
          value={formatUsd(outstanding)}
          icon={CreditCard}
        />
        <MetricCard label="Projects billed" value={invoices.length} icon={FileText} />
      </div>

      <section>
        <h2 className="mb-4 font-display text-lg font-semibold text-forest">
          Invoices
        </h2>
        {invoices.length === 0 ? (
          <EmptyState
            icon={CreditCard}
            title="No invoices yet."
            description="Start a project and your invoices and package history will appear here."
          />
        ) : (
          <div className="space-y-3">
            {invoices.map((inv) => (
              <InvoiceCard
                key={inv.id}
                invoice={inv}
                projectTitle={projects.find((p) => p.id === inv.projectId)?.title}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
