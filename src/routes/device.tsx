import { createFileRoute } from "@tanstack/react-router";
import { BatteryCharging, Cpu, HardDrive, RefreshCw, Signal } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { Eyebrow, Pill, SectionTitle, StatTile } from "@/components/kit";
import { deviceNodes, deviceStats } from "@/lib/farm-data";

export const Route = createFileRoute("/device")({
  head: () => ({
    meta: [
      { title: "Device Status — KrishiMitra AI" },
      { name: "description", content: "ESP32 gateway health, sensor node battery levels and offline sync queue." },
      { property: "og:title", content: "Device Status — KrishiMitra AI" },
      { property: "og:description", content: "ESP32 gateway health, sensor node battery levels and offline sync queue." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DeviceStatus,
});

function Bar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold">{label}</span>
        <span className="text-muted-foreground">{value}%</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-primary" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function DeviceStatus() {
  return (
    <AppShell title="Device Status" subtitle="Your field hardware, at a glance">
      <section className="surface p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="canopy grid size-12 place-items-center rounded-2xl">
              <Cpu className="size-5" />
            </span>
            <div>
              <Eyebrow>Gateway</Eyebrow>
              <h2 className="font-display text-2xl font-bold">{deviceStats.id}</h2>
              <p className="text-sm text-muted-foreground">
                Firmware {deviceStats.firmware} · uptime {deviceStats.uptime}
              </p>
            </div>
          </div>
          <Pill tone="primary">Online · synced {deviceStats.lastSync}</Pill>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Bar label="Battery" value={deviceStats.battery} />
          <Bar label="Signal" value={deviceStats.signal} />
          <Bar label="Storage used" value={deviceStats.storage} />
        </div>
      </section>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <StatTile icon={<RefreshCw className="size-4.5" />} label="Queued readings" value={String(deviceStats.queued)} hint="Will upload on next sync" tone="info" />
        <StatTile icon={<BatteryCharging className="size-4.5" />} label="Lowest node" value="22" unit="%" hint="Rain gauge · North" tone="warning" />
        <StatTile icon={<HardDrive className="size-4.5" />} label="Offline models" value="3" hint="Tomato, Paddy, Potato" />
      </div>

      <section className="mt-6">
        <SectionTitle title="Sensor nodes" action={<span className="text-sm font-semibold text-primary">Pair new node</span>} />
        <div className="surface divide-y divide-border">
          {deviceNodes.map((n) => (
            <div key={n.id} className="flex items-center justify-between gap-3 p-4">
              <div className="flex items-center gap-3">
                <Signal className="size-4.5 text-primary" />
                <div>
                  <p className="font-semibold">{n.name}</p>
                  <p className="text-xs text-muted-foreground">{n.status}</p>
                </div>
              </div>
              <Pill tone={n.tone}>{n.battery}%</Pill>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
