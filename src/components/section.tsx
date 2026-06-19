import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  dark = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <Reveal>
          <span
            className={cn(
              "eyebrow",
              align === "center" && "justify-center",
              dark && "text-white/50"
            )}
          >
            <span className="size-1.5 rounded-full bg-electric" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2
          className={cn(
            "mt-4 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl",
            dark ? "text-white" : "text-foreground"
          )}
        >
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "mt-4 text-base leading-relaxed text-balance",
              dark ? "text-white/60" : "text-muted-foreground"
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}

export function Section({
  children,
  className,
  containerClassName,
}: {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}) {
  return (
    <section className={cn("py-20 sm:py-28", className)}>
      <div className={cn("container-tight", containerClassName)}>{children}</div>
    </section>
  );
}
