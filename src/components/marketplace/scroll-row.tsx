"use client";

import { useRef, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function ScrollRow({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) =>
    ref.current?.scrollBy({ left: dir * 420, behavior: "smooth" });

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h2>
        <div className="flex items-center gap-2">
          <button
            aria-label="Scroll left"
            onClick={() => scroll(-1)}
            className="flex size-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-secondary"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            aria-label="Scroll right"
            onClick={() => scroll(1)}
            className="flex size-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-secondary"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
      <div
        ref={ref}
        className="mt-6 flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
    </div>
  );
}
