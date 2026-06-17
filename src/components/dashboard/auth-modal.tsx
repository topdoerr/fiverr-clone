"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Mail, Apple, Check, ArrowRight } from "lucide-react";
import { getSupabaseBrowser } from "@/lib/supabase/client";
import { useApp } from "@/lib/dashboard/store";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" className="size-5" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.4 29.3 35 24 35c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 5.1 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.6 20-21 0-1.2-.1-2.3-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 5.1 29.6 3 24 3 16 3 9.1 7.6 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 45c5.2 0 10-2 13.6-5.2l-6.3-5.2C29.2 36 26.7 37 24 37c-5.3 0-9.7-2.6-11.3-7l-6.6 5.1C9 40.4 16 45 24 45z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4 5.5l6.3 5.2C40.9 36.4 44 30.9 44 24c0-1.2-.1-2.3-.4-3.5z" />
    </svg>
  );
}

export function AuthModal({
  open,
  onClose,
  initialMode = "join",
}: {
  open: boolean;
  onClose: () => void;
  initialMode?: "join" | "signin";
}) {
  const router = useRouter();
  const { toast } = useApp();
  const [mode, setMode] = useState<"join" | "signin">(initialMode);

  if (!open) return null;

  const oauth = async (provider: "google" | "apple") => {
    const supabase = getSupabaseBrowser();
    if (!supabase) {
      toast("Social sign-in isn't available right now.");
      return;
    }
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/dashboard` },
    });
    if (error) {
      toast(
        `${provider === "google" ? "Google" : "Apple"} sign-in isn't enabled yet — use Continue with Email.`
      );
    }
  };

  const goEmail = () => {
    onClose();
    router.push(mode === "join" ? "/signup" : "/login");
  };

  return (
    <div className="fixed inset-0 z-[95] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-forest/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 grid w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-2">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-20 text-forest/50 transition-colors hover:text-forest"
        >
          <X className="size-5" />
        </button>

        {/* Brand panel */}
        <div className="relative hidden flex-col justify-center overflow-hidden bg-cobalt p-9 text-white md:flex">
          {/* Hero video background */}
          <video
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/hero/hero.mp4" type="video/mp4" />
          </video>
          {/* Cobalt overlay for legibility */}
          <div className="absolute inset-0 bg-gradient-to-br from-cobalt/90 via-cobalt/75 to-[#06173F]/90" />
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="relative">
            <h3 className="font-display text-2xl font-semibold leading-tight">
              AI execution starts here.
            </h3>
            <ul className="mt-6 space-y-3">
              {[
                "Internal AI talent — no freelancers",
                "Clear scopes, timelines, and packages",
                "Human-reviewed delivery, one partner",
              ].map((line) => (
                <li key={line} className="flex items-center gap-2.5 text-sm text-white/90">
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-lime text-forest">
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  {line}
                </li>
              ))}
            </ul>
            <p className="mt-8 font-display text-base font-semibold text-lime">
              Buy the Outcome. Not the Freelancer.
            </p>
          </div>
        </div>

        {/* Form panel */}
        <div className="p-8 sm:p-9">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-forest">
            {mode === "join" ? "Create your account" : "Sign in to your account"}
          </h2>
          <p className="mt-1.5 text-sm text-forest/60">
            {mode === "join" ? (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setMode("signin")}
                  className="font-medium text-cobalt hover:underline"
                >
                  Sign in
                </button>
              </>
            ) : (
              <>
                Don&apos;t have an account?{" "}
                <button
                  onClick={() => setMode("join")}
                  className="font-medium text-cobalt hover:underline"
                >
                  Join here
                </button>
              </>
            )}
          </p>

          <div className="mt-6 space-y-3">
            <button
              onClick={() => oauth("google")}
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-forest/15 bg-white px-4 py-2.5 text-sm font-medium text-forest transition-colors hover:bg-cream"
            >
              <GoogleIcon />
              Continue with Google
            </button>
            <button
              onClick={() => oauth("apple")}
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-forest/15 bg-white px-4 py-2.5 text-sm font-medium text-forest transition-colors hover:bg-cream"
            >
              <Apple className="size-5" />
              Continue with Apple
            </button>
          </div>

          <div className="my-5 flex items-center gap-3 text-xs font-medium text-forest/40">
            <span className="h-px flex-1 bg-forest/10" />
            OR
            <span className="h-px flex-1 bg-forest/10" />
          </div>

          <button
            onClick={goEmail}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-lime px-4 py-2.5 text-sm font-semibold text-forest transition-colors hover:bg-lime-soft"
          >
            <Mail className="size-4" />
            Continue with Email
            <ArrowRight className="size-4" />
          </button>

          <p className="mt-6 text-xs leading-relaxed text-forest/40">
            By continuing, you agree to TopDoerr&apos;s Terms of Service and
            Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
