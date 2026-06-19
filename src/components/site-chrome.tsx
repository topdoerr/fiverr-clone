"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AuthModal } from "@/components/dashboard/auth-modal";
import { useApp } from "@/lib/dashboard/store";

const BARE_PREFIXES = ["/dashboard", "/login", "/signup", "/onboarding"];

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { isAuthed, hydrated } = useApp();
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"join" | "signin">("join");

  const bare = BARE_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );

  // Greet signed-out visitors with the auth modal on first landing (per session).
  useEffect(() => {
    if (bare || !hydrated || isAuthed) return;
    try {
      if (!sessionStorage.getItem("td_auth_seen")) {
        setAuthMode("join");
        setAuthOpen(true);
        sessionStorage.setItem("td_auth_seen", "1");
      }
    } catch {
      /* ignore */
    }
  }, [bare, hydrated, isAuthed]);

  // Allow the navbar (or anything) to open the modal on demand.
  useEffect(() => {
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent).detail as { mode?: "join" | "signin" };
      setAuthMode(detail?.mode ?? "join");
      setAuthOpen(true);
    };
    window.addEventListener("td:open-auth", onOpen);
    return () => window.removeEventListener("td:open-auth", onOpen);
  }, []);

  if (bare) return <>{children}</>;

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <AuthModal
        key={authMode}
        open={authOpen}
        initialMode={authMode}
        onClose={() => setAuthOpen(false)}
      />
    </>
  );
}
