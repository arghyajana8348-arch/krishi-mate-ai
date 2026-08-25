import { Link, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  Bell,
  BookOpen,
  Camera,
  Cpu,
  FileText,
  Gauge,
  History,
  Info,
  LayoutDashboard,
  LifeBuoy,
  Map,
  ScanLine,
  Settings,
  ShieldAlert,
  Sparkles,
  User,
} from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const nav = [
  {
    group: "Overview",
    items: [
      { to: "/", label: "Dashboard", icon: LayoutDashboard },
      { to: "/farm", label: "Farm Overview", icon: Map },
      { to: "/sensors", label: "Live Sensors", icon: Gauge },
    ],
  },
  {
    group: "Intelligence",
    items: [
      { to: "/scan", label: "Disease Scan", icon: ScanLine },
      { to: "/recommendations", label: "AI Advisory", icon: Sparkles },
      { to: "/analytics", label: "Analytics", icon: Activity },
      { to: "/history", label: "Crop History", icon: History },
    ],
  },
  {
    group: "Operations",
    items: [
      { to: "/alerts", label: "Alerts", icon: Bell },
      { to: "/emergency", label: "Emergency", icon: ShieldAlert },
      { to: "/reports", label: "Reports", icon: FileText },
      { to: "/device", label: "Device Status", icon: Cpu },
    ],
  },
  {
    group: "Account",
    items: [
      { to: "/profile", label: "Profile", icon: User },
      { to: "/settings", label: "Settings", icon: Settings },
      { to: "/help", label: "Help Center", icon: LifeBuoy },
      { to: "/about", label: "About", icon: Info },
    ],
  },
] as const;

const tabs = [
  { to: "/", label: "Home", icon: LayoutDashboard },
  { to: "/scan", label: "Scan", icon: Camera },
  { to: "/reports", label: "Reports", icon: BookOpen },
  { to: "/profile", label: "Profile", icon: User },
] as const;

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex min-w-0 items-center gap-2.5">
      <span className="canopy grid size-9 shrink-0 place-items-center rounded-xl shadow-[var(--shadow-soft)]">
        <Sparkles className="size-4.5" />
      </span>
      <span className="min-w-0">
        <span className="block truncate font-display text-base leading-tight font-bold">KrishiMitra AI</span>
        {!compact && (
          <span className="text-accent-serif block truncate text-xs text-muted-foreground">
            Offline AI Farming Assistant
          </span>
        )}
      </span>
    </Link>
  );
}

export function AppShell({
  title,
  subtitle,
  actions,
  children,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen w-full bg-background">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[264px] flex-col border-r border-sidebar-border bg-sidebar lg:flex">
        <div className="px-5 py-5">
          <Brand />
        </div>
        <nav className="flex-1 space-y-5 overflow-y-auto px-3 pb-6">
          {nav.map((group) => (
            <div key={group.group}>
              <p className="eyebrow px-3 pb-2">{group.group}</p>
              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  const active = pathname === item.to;
                  return (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        className={cn(
                          "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                          active
                            ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
                            : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
                        )}
                      >
                        <item.icon className="size-4 shrink-0" />
                        <span className="truncate">{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      <div className="lg:pl-[264px]">
        {/* Header */}
        <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur-xl">
          <div className="mx-auto grid max-w-[1400px] grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6">
            <div className="min-w-0">
              <div className="lg:hidden">
                <Brand compact />
              </div>
              <h1 className="mt-1.5 truncate font-display text-xl font-bold sm:text-2xl lg:mt-0">{title}</h1>
              {subtitle ? (
                <p className="truncate text-xs text-muted-foreground sm:text-sm">{subtitle}</p>
              ) : null}
            </div>
            <div className="flex shrink-0 items-center gap-2">
              {actions}
              <Link
                to="/notifications"
                className="relative grid size-10 place-items-center rounded-xl border border-border bg-card transition-colors hover:bg-accent"
                aria-label="Notifications"
              >
                <Bell className="size-4.5" />
                <span className="absolute top-2 right-2.5 size-2 rounded-full bg-destructive" />
              </Link>
              <Link
                to="/profile"
                className="canopy hidden size-10 place-items-center rounded-xl font-semibold sm:grid"
                aria-label="Profile"
              >
                AJ
              </Link>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1400px] px-4 pt-5 pb-32 sm:px-6 lg:pb-16">{children}</main>

        {/* Desktop status bar */}
        <div className="fixed right-0 bottom-0 left-[264px] z-20 hidden border-t border-border bg-card/85 px-6 py-2 backdrop-blur-xl lg:block">
          <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-6 gap-y-1 text-xs text-muted-foreground">
            <StatusDot tone="success" label="ESP32 Connected" />
            <StatusDot tone="info" label="AI Engine Running" />
            <StatusDot tone="primary" label="Offline Mode Enabled" />
            <StatusDot tone="success" label="SQLite Synced · 1,204 rows" />
            <span className="ml-auto">v2.4.0 · Edge Inference</span>
          </div>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden">
        <ul className="grid grid-cols-4">
          {tabs.map((tab) => {
            const active = pathname === tab.to;
            return (
              <li key={tab.to}>
                <Link
                  to={tab.to}
                  className={cn(
                    "flex flex-col items-center gap-1 py-2.5 text-[11px] font-semibold transition-colors",
                    active ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  <span
                    className={cn(
                      "grid h-7 w-12 place-items-center rounded-full transition-colors",
                      active && "bg-primary-soft",
                    )}
                  >
                    <tab.icon className="size-4.5" />
                  </span>
                  {tab.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

function StatusDot({ tone, label }: { tone: "success" | "info" | "primary"; label: string }) {
  const color =
    tone === "success" ? "bg-success" : tone === "info" ? "bg-info" : "bg-leaf";
  return (
    <span className="flex items-center gap-2">
      <span className={cn("size-2 rounded-full soft-pulse", color)} />
      {label}
    </span>
  );
}
