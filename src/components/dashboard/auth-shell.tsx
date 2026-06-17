import Link from "next/link";
import type { ReactNode } from "react";
import { Check } from "lucide-react";

export function AuthShell({
  heading,
  subheading,
  children,
}: {
  heading: string;
  subheading: string;
  children: ReactNode;
}) {
  return (
    <div className="grid min-h-screen bg-cream lg:grid-cols-2">
      {/* Form side */}
      <div className="flex flex-col px-6 py-8 sm:px-10">
        <Link href="/" className="inline-flex">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/td_primary_forest.svg" alt="TopDoerr" className="h-8 w-auto" />
        </Link>
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-10">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-forest text-balance">
            {heading}
          </h1>
          <p className="mt-3 text-forest/60">{subheading}</p>
          <div className="mt-8">{children}</div>
        </div>
      </div>

      {/* Brand side */}
      <div className="relative hidden overflow-hidden bg-forest text-cream lg:flex lg:flex-col lg:justify-center lg:px-12">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #F5F4EE 1px, transparent 0)",
            backgroundSize: "26px 26px",
          }}
        />
        <div className="absolute -right-16 top-10 size-72 rounded-full bg-cobalt/30 blur-[100px]" />
        <div className="relative max-w-md">
          <p className="font-display text-4xl font-semibold leading-tight tracking-tight">
            Buy the Outcome.{" "}
            <span className="text-lime">Not the Freelancer.</span>
          </p>
          <p className="mt-4 text-cream/70">AI Execution, Delivered by TopDoerr.</p>
          <ul className="mt-10 space-y-4">
            {[
              "Internal AI talent — no freelancers to manage",
              "Clear scopes, timelines, and packages",
              "Human-reviewed delivery, one accountable partner",
              "Track every project in one managed workspace",
            ].map((line) => (
              <li key={line} className="flex items-center gap-3 text-sm text-cream/85">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-lime text-forest">
                  <Check className="size-3" strokeWidth={3} />
                </span>
                {line}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
