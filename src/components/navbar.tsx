"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { navItems } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent bg-background/0"
      )}
    >
      <nav className="container-tight flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <Logo />
          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                      active
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild variant="ghost" size="sm">
            <Link href="/marketplace">Explore Services</Link>
          </Button>
          <Button asChild variant="electric" size="sm">
            <Link href="/start">
              Start a Project
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        <button
          aria-label="Toggle menu"
          className="inline-flex size-10 items-center justify-center rounded-full hover:bg-secondary lg:hidden"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="container-tight flex flex-col gap-1 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2">
              <Button asChild variant="outline">
                <Link href="/marketplace">Explore Services</Link>
              </Button>
              <Button asChild variant="electric">
                <Link href="/start">
                  Start a Project
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
