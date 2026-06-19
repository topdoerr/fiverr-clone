"use client";

import { useMemo, useState } from "react";
import { Search, SearchX } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Reveal } from "@/components/reveal";
import { ServiceCard } from "@/components/service-card";
import { verticals } from "@/lib/data";
import { useT } from "@/lib/i18n/client";
import { cn } from "@/lib/utils";

const ALL_TAG = "All";

export function MarketplaceExplorer() {
  const t = useT();
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string>(ALL_TAG);

  const tags = useMemo(() => {
    const unique = new Set<string>();
    verticals.forEach((v) => v.tags.forEach((tag) => unique.add(tag)));
    return [ALL_TAG, ...Array.from(unique).sort((a, b) => a.localeCompare(b))];
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return verticals.filter((v) => {
      const matchesTag = activeTag === ALL_TAG || v.tags.includes(activeTag);
      if (!matchesTag) return false;
      if (!q) return true;
      const haystack = [
        v.name,
        v.shortDescription,
        ...v.services,
        ...v.tags,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [query, activeTag]);

  return (
    <div>
      {/* Search */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("Search AI services, outcomes, or tools…")}
          aria-label={t("Search AI services")}
          className="h-12 pl-11"
        />
      </div>

      {/* Filter chips */}
      <div className="mt-5 flex flex-wrap gap-2">
        {tags.map((tag) => {
          const active = tag === activeTag;
          return (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              aria-pressed={active}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                active
                  ? "border-electric/40 bg-electric/15 text-ink"
                  : "border-border bg-card text-muted-foreground hover:border-foreground/20 hover:text-foreground"
              )}
            >
              {t(tag)}
            </button>
          );
        })}
      </div>

      {/* Results meta */}
      <p className="mt-8 text-sm text-muted-foreground">
        {results.length} {results.length === 1 ? t("service") : t("services")}
        {activeTag !== ALL_TAG && (
          <>
            {" "}
            {t("in")} <span className="text-foreground">{t(activeTag)}</span>
          </>
        )}
      </p>

      {/* Grid / empty state */}
      {results.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((v, i) => (
            <Reveal key={v.slug} delay={(i % 3) * 0.05}>
              <ServiceCard vertical={v} />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-secondary/30 px-6 py-20 text-center">
          <div className="flex size-12 items-center justify-center rounded-2xl border border-border bg-card">
            <SearchX className="size-5 text-muted-foreground" />
          </div>
          <h3 className="mt-5 font-display text-lg font-semibold">
            {t("No services match your search")}
          </h3>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {t(
              "Try a different keyword or clear the filters. If you can't find it, TopDoerr can still scope it with you."
            )}
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setActiveTag(ALL_TAG);
            }}
            className="mt-6 text-sm font-medium text-foreground underline-offset-4 hover:underline"
          >
            {t("Clear search and filters")}
          </button>
        </div>
      )}
    </div>
  );
}
