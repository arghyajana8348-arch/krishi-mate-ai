import { createFileRoute } from "@tanstack/react-router";
import { Bell, CloudDownload, Globe, Moon, Shield, WifiOff } from "lucide-react";
import { useState } from "react";

import { AppShell } from "@/components/app-shell";
import { Pill, SectionTitle } from "@/components/kit";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — KrishiMitra AI" },
      { name: "description", content: "Control language, offline AI models, alerts, sync behaviour and privacy for KrishiMitra AI." },
      { property: "og:title", content: "Settings — KrishiMitra AI" },
      { property: "og:description", content: "Control language, offline AI models, alerts, sync behaviour and privacy for KrishiMitra AI." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SettingsPage,
});

function Toggle({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${on ? "bg-primary" : "bg-muted"}`}
    >
      <span
        className={`absolute top-0.5 size-5 rounded-full bg-card shadow transition-all ${on ? "left-[22px]" : "left-0.5"}`}
      />
    </button>
  );
}

const items = [
  { key: "offline", icon: WifiOff, label: "Offline AI mode", hint: "Run disease detection without network" },
  { key: "sync", icon: CloudDownload, label: "Auto-sync on Wi-Fi", hint: "Upload queued readings automatically" },
  { key: "alerts", icon: Bell, label: "Critical alerts", hint: "Push notifications for urgent field risks" },
  { key: "dark", icon: Moon, label: "Night field mode", hint: "Dim interface for evening use" },
] as const;

function SettingsPage() {
  const [state, setState] = useState<Record<string, boolean>>({
    offline: true,
    sync: true,
    alerts: true,
    dark: false,
  });

  return (
    <AppShell title="Settings" subtitle="Tune the app to your farm">
      <SectionTitle title="Preferences" />
      <div className="surface divide-y divide-border">
        {items.map((i) => (
          <div key={i.key} className="flex items-center gap-3 p-4">
            <span className="grid size-9 place-items-center rounded-xl bg-primary-soft text-primary">
              <i.icon className="size-4.5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold">{i.label}</p>
              <p className="text-xs text-muted-foreground">{i.hint}</p>
            </div>
            <Toggle on={!!state[i.key]} onClick={() => setState((s) => ({ ...s, [i.key]: !s[i.key] }))} />
          </div>
        ))}
      </div>

      <SectionTitle className="mt-6" title="Language" />
      <div className="surface flex flex-wrap items-center gap-3 p-4">
        <span className="grid size-9 place-items-center rounded-xl bg-primary-soft text-primary">
          <Globe className="size-4.5" />
        </span>
        {["English", "বাংলা", "हिन्दी"].map((l, idx) => (
          <button
            key={l}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${idx === 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
          >
            {l}
          </button>
        ))}
      </div>

      <SectionTitle className="mt-6" title="Data & privacy" />
      <div className="surface p-5">
        <div className="flex items-start gap-3">
          <Shield className="mt-0.5 size-5 text-primary" />
          <div>
            <p className="font-semibold">On-device first</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Scans and sensor logs are stored encrypted on your phone. Cloud sync is optional and can be cleared at
              any time.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Pill tone="primary">Encrypted</Pill>
              <Pill tone="muted">No ads</Pill>
              <Pill tone="info">Export CSV</Pill>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
