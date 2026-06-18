"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Plus,
  FileText,
  MessageSquare,
  Paperclip,
  CreditCard,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  LogOut,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/dashboard/primitives";
import { useApp } from "@/lib/dashboard/store";
import { useT } from "@/lib/i18n/client";
import { cn } from "@/lib/utils";

type NavItem = { label: string; href: string; icon: LucideIcon; match?: string };

const nav: NavItem[] = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Projects", href: "/dashboard/projects", icon: FolderKanban },
  { label: "Start New Project", href: "/dashboard/new-project", icon: Plus },
  { label: "Briefs", href: "/dashboard/briefs/new", icon: FileText, match: "/dashboard/briefs" },
  { label: "Messages", href: "/dashboard/messages", icon: MessageSquare },
  { label: "Files", href: "/dashboard/files", icon: Paperclip },
  { label: "Billing", href: "/dashboard/billing", icon: CreditCard },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function DashboardShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, company, logout } = useApp();
  const t = useT();
  const [open, setOpen] = useState(false);

  const isActive = (item: NavItem) => {
    const base = item.match ?? item.href;
    if (base === "/dashboard") return pathname === "/dashboard";
    return pathname === base || pathname.startsWith(`${base}/`);
  };

  const initials =
    (company?.name ?? user?.fullName ?? "TD")
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  const SidebarContent = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center justify-between px-5">
        <Link href="/dashboard" className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/td_primary_forest.svg" alt="TopDoerr" className="h-7 w-auto" />
        </Link>
        <button
          className="text-forest/50 lg:hidden"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        >
          <X className="size-5" />
        </button>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {nav.map((item) => {
          const active = isActive(item);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-lime/25 text-forest"
                  : "text-forest/70 hover:bg-cream hover:text-forest"
              )}
            >
              <Icon className={cn("size-5", active ? "text-forest" : "text-forest/50")} />
              {t(item.label)}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-forest/10 p-3">
        <button
          onClick={() => {
            logout();
            router.push("/");
          }}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-forest/60 transition-colors hover:bg-cream hover:text-forest"
        >
          <LogOut className="size-5 text-forest/50" />
          {t("Log out")}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-cream text-forest">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-forest/10 bg-white lg:block">
        {SidebarContent}
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-forest/40" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-64 bg-white shadow-xl">
            {SidebarContent}
          </aside>
        </div>
      )}

      <div className="lg:pl-64">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-forest/10 bg-cream/90 px-4 backdrop-blur-xl sm:px-6">
          <button
            className="text-forest/60 lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </button>

          <div className="relative hidden max-w-sm flex-1 sm:block">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-forest/40" />
            <input
              placeholder={t("Search projects…")}
              className="h-9 w-full rounded-full border border-forest/10 bg-white pl-9 pr-4 text-sm text-forest placeholder:text-forest/40 focus:border-cobalt/40 focus:outline-none"
            />
          </div>

          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <button
              className="relative flex size-9 items-center justify-center rounded-full border border-forest/10 bg-white text-forest/60 hover:text-forest"
              aria-label="Notifications"
            >
              <Bell className="size-4" />
              <span className="absolute right-2 top-2 size-1.5 rounded-full bg-cobalt" />
            </button>
            <Button asChild variant="lime" size="sm">
              <Link href="/dashboard/briefs/new">
                {t("Start Project")}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Avatar initials={initials} className="size-9 text-sm" />
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 sm:py-8">{children}</main>
      </div>
    </div>
  );
}
