"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Search, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { searchChips, trustPoints } from "@/lib/data";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div className="bg-grid-dark absolute inset-0 opacity-70" />
      <div className="absolute -top-40 left-1/2 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-electric/10 blur-[120px]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="container-tight relative pb-20 pt-20 sm:pb-28 sm:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/80">
            <Sparkles className="size-3.5 text-electric" />
            A managed AI delivery system — not a freelancer marketplace
          </div>

          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-6xl">
            Buy AI outcomes.
            <br />
            <span className="text-electric">Delivered by TopDoerr.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/65 text-balance sm:text-lg">
            Browse AI services, choose a package, and let TopDoerr assign the
            right internal AI talent, systems, and agents to deliver the work. No
            freelancers. No guessing. Just execution.
          </p>

          {/* Search */}
          <div className="mx-auto mt-9 max-w-2xl">
            <div className="flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 p-2 backdrop-blur-sm focus-within:border-electric/50">
              <Search className="ml-3 size-5 shrink-0 text-white/50" />
              <input
                className="h-11 w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
                placeholder="What do you want AI to build, automate, or improve?"
              />
              <Button asChild variant="electric" className="shrink-0">
                <Link href="/marketplace">
                  Search
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              {searchChips.map((chip) => (
                <Link
                  key={chip}
                  href="/marketplace"
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 transition-colors hover:border-electric/40 hover:text-white"
                >
                  {chip}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild variant="electric" size="lg">
              <Link href="/start">
                Start a Project
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-white/10 text-white hover:bg-white/20"
            >
              <Link href="/marketplace">Explore Services</Link>
            </Button>
          </div>
        </motion.div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mt-16 flex max-w-4xl flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-white/10 pt-8"
        >
          {trustPoints.map((point) => (
            <div
              key={point}
              className="flex items-center gap-2 text-xs text-white/55"
            >
              <span className="size-1.5 rounded-full bg-electric" />
              {point}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
