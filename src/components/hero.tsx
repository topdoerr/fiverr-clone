"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, ArrowRight, Pause, Play } from "lucide-react";
import { searchChips } from "@/lib/data";
import { PartnerLogos } from "@/components/partner-logos";
import { useT } from "@/lib/i18n/client";

export function Hero() {
  const t = useT();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    // Respect users who prefer reduced motion
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      v.pause();
      setPlaying(false);
    }
  }, []);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="bg-background px-2 pt-2 sm:px-3 sm:pt-3 lg:px-4 lg:pt-4">
      <section className="relative flex min-h-[68vh] w-full items-center overflow-hidden rounded-[1.75rem] bg-ink text-white sm:rounded-[2.5rem]">
      {/* Background video */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src="/hero/hero.webm" type="video/webm" />
        <source src="/hero/hero.mp4" type="video/mp4" />
      </video>

      {/* Legibility overlays: dark on the left where the copy sits, lighter on the right */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/40" />

      {/* Main content */}
      <div className="container-tight relative w-full py-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-6xl">
            {t("Buy AI outcomes.")}
            <br />
            {t("Delivered by TopDoerr.")}
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            {t(
              "Choose the outcome. We assign the internal AI talent, systems, and agents to deliver it. No freelancers. No guessing. Just execution."
            )}
          </p>

          {/* Search */}
          <div className="mt-8 flex items-center gap-2 rounded-2xl bg-white p-1.5 shadow-2xl">
            <Search className="ml-3 size-5 shrink-0 text-muted-foreground" />
            <input
              className="h-11 w-full bg-transparent text-sm text-ink placeholder:text-muted-foreground focus:outline-none"
              placeholder={t(
                "What do you want AI to build, automate, or improve?"
              )}
            />
            <Link
              href="/marketplace"
              aria-label="Search services"
              className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-ink text-white transition-colors hover:bg-charcoal"
            >
              <Search className="size-5" />
            </Link>
          </div>

          {/* Suggested chips */}
          <div className="mt-5 flex flex-wrap gap-2.5">
            {searchChips.map((chip) => (
              <Link
                key={chip}
                href="/marketplace"
                className="group inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-medium text-white/85 backdrop-blur-sm transition-colors hover:border-electric/50 hover:bg-white/10"
              >
                {t(chip)}
                <ArrowRight className="size-3.5 text-white/50 transition-transform group-hover:translate-x-0.5 group-hover:text-electric" />
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom strip: trusted-by + video control */}
      <div className="absolute inset-x-0 bottom-0">
        <div className="container-tight flex items-center justify-between gap-4 py-7">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <span className="text-xs font-medium uppercase tracking-widest text-white/45">
              {t("In partnership with")}
            </span>
            <PartnerLogos />
          </div>

          <button
            onClick={toggle}
            aria-label={playing ? "Pause background video" : "Play background video"}
            className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 backdrop-blur-sm transition-colors hover:bg-white/15"
          >
            {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
          </button>
        </div>
      </div>
      </section>
    </div>
  );
}
