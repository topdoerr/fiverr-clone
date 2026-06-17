import Link from "next/link";
import { Check } from "lucide-react";
import { pricingPaths } from "@/lib/data";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function PricingCards() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-stretch">
      {pricingPaths.map((path, i) => (
        <Reveal key={path.name} delay={(i % 3) * 0.06} className="h-full">
          <div
            className={cn(
              "relative flex h-full flex-col rounded-2xl border bg-card p-7 transition-colors",
              path.highlight
                ? "border-electric/60 ring-2 ring-electric/40 lg:scale-[1.03] lg:shadow-[0_30px_80px_-40px_rgba(199,247,62,0.5)]"
                : "border-border hover:border-foreground/20"
            )}
          >
            {path.highlight && (
              <Badge variant="electric" className="absolute right-6 top-6">
                Most popular
              </Badge>
            )}

            <h3 className="font-display text-lg font-semibold tracking-tight">
              {path.name}
            </h3>
            <p className="mt-1.5 text-sm text-muted-foreground">
              {path.tagline}
            </p>

            <div className="mt-6 flex items-baseline gap-2">
              <span className="font-display text-3xl font-semibold tracking-tight">
                {path.price}
              </span>
              {path.priceSuffix && (
                <span className="text-sm text-muted-foreground">
                  {path.priceSuffix}
                </span>
              )}
            </div>

            <ul className="mt-7 space-y-3">
              {path.includes.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-electric text-white">
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  <span className="text-foreground/90">{item}</span>
                </li>
              ))}
            </ul>

            <Button
              asChild
              variant={path.highlight ? "electric" : "outline"}
              className="mt-8 w-full"
            >
              <Link href={path.href}>{path.cta}</Link>
            </Button>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
