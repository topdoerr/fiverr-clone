import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Vertical } from "@/lib/data";

export function ServiceCard({ vertical }: { vertical: Vertical }) {
  const Icon = vertical.icon;
  return (
    <Link
      href={`/marketplace/${vertical.slug}`}
      className="group relative flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-[0_24px_60px_-30px_rgba(10,10,11,0.35)]"
    >
      <div className="flex items-center justify-between">
        <div className="flex size-11 items-center justify-center rounded-xl border border-border bg-secondary text-foreground transition-colors group-hover:border-electric group-hover:bg-electric/15">
          <Icon className="size-5" />
        </div>
        <span className="text-sm font-semibold text-foreground">
          {vertical.startingPrice}
        </span>
      </div>

      <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">
        {vertical.name}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {vertical.shortDescription}
      </p>

      <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
        <Clock className="size-3.5" />
        {vertical.deliveryTime}
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {vertical.tags.map((tag) => (
          <Badge key={tag} variant="muted">
            {tag}
          </Badge>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-1.5 text-sm font-medium text-foreground">
        View packages
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
