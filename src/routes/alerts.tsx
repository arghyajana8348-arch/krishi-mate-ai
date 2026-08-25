import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Bell, CloudRain, Info } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { Pill } from "@/components/kit";
import { alerts } from "@/lib/farm-data";

export const Route = createFileRoute("/alerts")({
  head: () => ({
    meta: [
      { title: "Alerts — KrishiMitra AI" },
      { name: "description", content: "Prioritised farm alerts with severity, timing and suggested action." },
      { property: "og:title", content: "Alerts — KrishiMitra AI" },
      { property: "og:description", content: "Farm alerts with severity and suggested action." },
    ],
  }),
  component: Alerts,
});

const meta = {
  critical: { icon: AlertTriangle, tone: "critical" as const, label: "Critical", bar: "bg-destructive" },
  warning: { icon: Bell, tone: "warning" as const, label: "Warning", bar: "bg-warning" },
  info: { icon: CloudRain, tone: "info" as const, label: "Info", bar: "bg-info" },
};

function Alerts() {
  const counts = {
    critical: alerts.filter((a) => a.severity === "critical").length,
    warning: alerts.filter((a) => a.severity === "warning").length,
    info: alerts.filter((a) => a.severity === "info").length,
  };

  return (
    <AppShell title="Alerts" subtitle={`${alerts.length} active alerts across your farm`}>
      <div className="grid grid-cols-3 gap-3">
        {(["critical", "warning", "info"] as const).map((k) => (
          <div key={k} className="surface p-4">
            <p className="eyebrow">{meta[k].label}</p>
            <p className="mt-2 font-display text-3xl font-bold">{counts[k]}</p>
          </div>
        ))}
      </div>

      <ul className="mt-4 space-y-3">
        {alerts.map((a) => {
          const m = meta[a.severity];
          return (
            <li key={a.id} className="surface relative overflow-hidden p-5 pl-6">
              <span className={`absolute inset-y-0 left-0 w-1.5 ${m.bar}`} />
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                <div className="flex min-w-0 items-start gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-muted">
                    <m.icon className="size-5" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-base font-bold">{a.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      <Info className="mr-1 inline size-3.5" />
                      {a.action}
                    </p>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <Pill tone={m.tone}>{m.label}</Pill>
                  <p className="mt-2 text-xs text-muted-foreground">{a.time}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </AppShell>
  );
}
