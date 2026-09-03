import { createFileRoute } from "@tanstack/react-router";
import { BatteryCharging, CloudRain, Droplets, Gauge, RefreshCw, Thermometer, Wifi } from "lucide-react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { AppShell } from "@/components/app-shell";
import { Pill, SectionTitle, StatTile } from "@/components/kit";
import { useSensorHistory } from "@/lib/sensor-history";

export const Route = createFileRoute("/sensors")({
  head: () => ({
    meta: [
      { title: "Live Sensors — KrishiMitra AI" },
      { name: "description", content: "Live soil moisture, temperature, humidity and rainfall readings." },
      { property: "og:title", content: "Live Sensors — KrishiMitra AI" },
      { property: "og:description", content: "Live field sensor readings from your ESP32 node." },
    ],
  }),
  component: Sensors,
});

function Sensors() {
  const { readings, status, lastSyncedAt } = useSensorHistory();
  const latest = readings[readings.length - 1];

  const syncLabel =
    status === "syncing"
      ? "Syncing new readings…"
      : status === "offline"
        ? "Offline — buffering on device"
        : status === "error"
          ? "Sync retry pending"
          : lastSyncedAt
            ? `Synced ${lastSyncedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
            : "Device Connected";

  return (
    <AppShell
      title="Live Sensor Dashboard"
      subtitle="ESP32 node · Block A101 · merges buffered readings on reconnect"
      actions={
        <Pill tone={status === "offline" || status === "error" ? "warning" : "primary"}>
          <span className="flex items-center gap-1.5">
            <RefreshCw className={`size-3.5 ${status === "syncing" ? "animate-spin" : ""}`} />
            {syncLabel}
          </span>
        </Pill>
      }
    >
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatTile icon={<Droplets className="size-4.5" />} label="Soil Moisture" value={String(latest?.moisture ?? 42)} unit="%" hint="Below optimal (55%)" tone="warning" />
        <StatTile icon={<Thermometer className="size-4.5" />} label="Temperature" value={String(latest?.temp ?? 31)} unit="°C" hint="Within safe range" tone="primary" />
        <StatTile icon={<Gauge className="size-4.5" />} label="Humidity" value={String(latest?.humidity ?? 68)} unit="%" hint="Blight risk window" tone="info" />
        <StatTile icon={<CloudRain className="size-4.5" />} label="Rainfall" value="No" unit="Rain" hint="0 mm past 24h" tone="primary" />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <section className="surface p-5 lg:col-span-2">
          <SectionTitle title="24-hour sensor stream" />

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trend} margin={{ left: -20, right: 4, top: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="t" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 14,
                    border: "1px solid var(--color-border)",
                    background: "var(--color-card)",
                    fontSize: 12,
                  }}
                />
                <Line type="monotone" dataKey="temp" stroke="var(--color-chart-4)" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="humidity" stroke="var(--color-chart-3)" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="moisture" stroke="var(--color-chart-1)" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-2"><i className="size-2.5 rounded-full bg-chart-4" />Temperature</span>
            <span className="flex items-center gap-2"><i className="size-2.5 rounded-full bg-chart-3" />Humidity</span>
            <span className="flex items-center gap-2"><i className="size-2.5 rounded-full bg-chart-1" />Soil moisture</span>
          </div>
        </section>

        <section className="surface p-5">
          <SectionTitle title="Node health" />
          <div className="space-y-4">
            <Meter icon={<BatteryCharging className="size-4" />} label="Battery" value={78} caption="Solar charging · 6.1V" />
            <Meter icon={<Wifi className="size-4" />} label="Wi-Fi signal" value={64} caption="-67 dBm · stable" />
            <Meter icon={<Gauge className="size-4" />} label="Sensor health" value={96} caption="4 of 4 probes reporting" />
          </div>
          <div className="mt-5 rounded-2xl bg-primary-soft p-4">
            <p className="text-xs font-bold tracking-wide text-primary uppercase">Buffered offline</p>
            <p className="mt-1 text-sm text-muted-foreground">1,204 readings stored locally in SQLite.</p>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function Meter({
  icon,
  label,
  value,
  caption,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  caption: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center gap-2 font-semibold">
          <span className="text-primary">{icon}</span>
          {label}
        </span>
        <span className="font-display font-bold">{value}%</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-linear-to-r from-primary to-leaf" style={{ width: `${value}%` }} />
      </div>
      <p className="mt-1 text-xs text-muted-foreground">{caption}</p>
    </div>
  );
}
