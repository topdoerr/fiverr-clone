"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InstallButton } from "@/components/install-button";
import { footerNav } from "@/lib/data";
import { useT } from "@/lib/i18n/client";

export function Footer() {
  const t = useT();
  return (
    <footer className="border-t border-white/10 bg-ink text-white">
      <div className="container-tight py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="space-y-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/td_primary_cream.svg"
              alt="TopDoerr"
              className="h-8 w-auto"
            />
            <p className="max-w-xs text-sm text-white/60">
              {t(
                "Buy AI outcomes. Delivered by TopDoerr. Internal talent, AI speed, human review."
              )}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button asChild variant="electric" size="sm">
                <Link href="/start">
                  {t("Start a Project")}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <InstallButton />
            </div>
          </div>

          {footerNav.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-white">{t(col.title)}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-electric"
                    >
                      {t(link.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/50 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} TopDoerr. {t("We Keep It Human.")}</p>
          <p className="font-mono text-xs uppercase tracking-widest text-white/40">
            {t("Spanish-first · Built for Puerto Rico & LATAM")}
          </p>
        </div>
      </div>
    </footer>
  );
}
