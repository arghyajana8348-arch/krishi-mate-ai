import { createFileRoute } from "@tanstack/react-router";
import { Bell, BellRing, CheckCheck } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { Pill, SectionTitle } from "@/components/kit";
import { notifications } from "@/lib/farm-data";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — KrishiMitra AI" },
      { name: "description", content: "Every disease detection, rain warning, irrigation reminder and device sync in one feed." },
      { property: "og:title", content: "Notifications — KrishiMitra AI" },
      { property: "og:description", content: "Every disease detection, rain warning, irrigation reminder and device sync in one feed." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Notifications,
});

function Notifications() {
  return (
    <AppShell title="Notifications" subtitle="Today's activity feed">
      <SectionTitle
        title="Today"
        action={
          <button className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
            <CheckCheck className="size-4" /> Mark all read
          </button>
        }
      />
      <div className="surface divide-y divide-border">
        {notifications.map((n) => (
          <div key={n.id} className="flex items-start gap-3 p-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
              {n.tone === "critical" ? <BellRing className="size-4.5" /> : <Bell className="size-4.5" />}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold">{n.title}</p>
                <span className="shrink-0 text-xs text-muted-foreground">{n.time}</span>
              </div>
              <p className="mt-0.5 text-sm text-muted-foreground">{n.body}</p>
              <div className="mt-2">
                <Pill tone={n.tone}>{n.tone}</Pill>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Older notifications are archived after 30 days.
      </p>
    </AppShell>
  );
}
