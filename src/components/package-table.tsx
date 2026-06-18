import Link from "next/link";
import { Check, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/reveal";
import { packageTableRows, type Package } from "@/lib/data";
import { cn } from "@/lib/utils";
import { getT } from "@/lib/i18n/server";

const TIER_ORDER: Package["tier"][] = ["Starter", "Growth", "Scale"];

function sortPackages(packages: Package[]): Package[] {
  return [...packages].sort(
    (a, b) => TIER_ORDER.indexOf(a.tier) - TIER_ORDER.indexOf(b.tier)
  );
}

function BoolCell({ value }: { value: boolean }) {
  return value ? (
    <span className="inline-flex size-5 items-center justify-center rounded-full bg-electric text-white">
      <Check className="size-3" strokeWidth={3} />
    </span>
  ) : (
    <span className="inline-flex size-5 items-center justify-center rounded-full bg-foreground/5 text-muted-foreground">
      <X className="size-3" />
    </span>
  );
}

export async function PackageTable({ packages }: { packages: Package[] }) {
  const t = await getT();
  const ordered = sortPackages(packages);

  return (
    <div>
      {/* Package cards */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {ordered.map((pkg, i) => (
          <Reveal key={pkg.tier} delay={(i % 3) * 0.06}>
            <div
              className={cn(
                "relative flex h-full flex-col rounded-2xl border bg-card p-7 transition-colors",
                pkg.highlight
                  ? "border-electric/60 ring-2 ring-electric/40 shadow-[0_24px_60px_-30px_rgba(199,247,62,0.45)]"
                  : "border-border hover:border-foreground/20"
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <Badge variant={pkg.highlight ? "electric" : "muted"}>
                  {t(pkg.tier)}
                </Badge>
                {pkg.highlight && (
                  <span className="text-xs font-medium text-muted-foreground">
                    {t("Most popular")}
                  </span>
                )}
              </div>

              <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">
                {t(pkg.name)}
              </h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {t(pkg.bestFor)}
              </p>

              <div className="mt-5">
                <div className="font-display text-2xl font-semibold text-foreground">
                  {t(pkg.price)}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {t(pkg.deliveryTime)}
                </div>
              </div>

              <ul className="mt-6 space-y-3">
                {pkg.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-foreground"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-electric" />
                    <span className="leading-snug">{t(item)}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-7">
                <Button
                  asChild
                  variant={pkg.highlight ? "electric" : "outline"}
                  className="w-full"
                >
                  <Link href="/start">
                    {t("Start a Project")}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Comparison table */}
      <Reveal>
        <div className="mt-10 overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/40">
                <th className="w-48 px-5 py-4 text-left font-medium text-muted-foreground">
                  {t("Compare packages")}
                </th>
                {ordered.map((pkg) => (
                  <th
                    key={pkg.tier}
                    className="px-5 py-4 text-left align-bottom"
                  >
                    <span className="block font-display text-base font-semibold text-foreground">
                      {t(pkg.tier)}
                    </span>
                    <span className="mt-0.5 block text-xs font-normal text-muted-foreground">
                      {t(pkg.name)}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {packageTableRows.map((row) => {
                const key = row.key;
                if (key === "cta") {
                  return (
                    <tr key="cta" className="border-t border-border">
                      <td className="px-5 py-5" />
                      {ordered.map((pkg) => (
                        <td key={pkg.tier} className="px-5 py-5 align-top">
                          <Button
                            asChild
                            size="sm"
                            variant={pkg.highlight ? "electric" : "outline"}
                          >
                            <Link href="/start">{t("Start a Project")}</Link>
                          </Button>
                        </td>
                      ))}
                    </tr>
                  );
                }

                return (
                  <tr
                    key={row.key}
                    className="border-t border-border align-top"
                  >
                    <th
                      scope="row"
                      className="px-5 py-4 text-left font-medium text-muted-foreground"
                    >
                      {t(row.label)}
                    </th>
                    {ordered.map((pkg) => {
                      const value = pkg[key];
                      return (
                        <td
                          key={pkg.tier}
                          className="px-5 py-4 text-foreground"
                        >
                          {typeof value === "boolean" ? (
                            <BoolCell value={value} />
                          ) : Array.isArray(value) ? (
                            <ul className="space-y-1.5">
                              {value.map((item) => (
                                <li
                                  key={item}
                                  className="flex items-start gap-2 text-sm"
                                >
                                  <Check className="mt-0.5 size-3.5 shrink-0 text-electric" />
                                  <span className="leading-snug">{t(item)}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <span className="text-sm">{value ? t(value) : null}</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Reveal>
    </div>
  );
}
