import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  Bell,
  Camera,
  CloudSun,
  Droplets,
  Gauge,
  Leaf,
  Sparkles,
  Thermometer,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import fieldMap from "@/assets/field-map.jpg";
import leafScan from "@/assets/leaf-scan.jpg";
import { AppShell } from "@/components/app-shell";
import { CheckLine, Eyebrow, HealthRing, Pill, SectionTitle, StatTile } from "@/components/kit";
import { alerts, healthScore, sensors, trend } from "@/lib/farm-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — KrishiMitra AI" },
      {
        name: "description",
        content: "Live farm health score, sensor readings, AI recommendations and recent crop scans.",
      },
      { property: "og:title", content: "Dashboard — KrishiMitra AI" },
      {
        property: "og:description",
        content: "Live farm health score, sensor readings and AI crop recommendations.",
      },
    ],
  }),
  component: Dashboard,
});

const quickActions = [
  { to: "/scan", label: "Scan Crop", icon: Camera },
  { to: "/sensors", label: "Live Sensors", icon: Gauge },
  { to: "/analytics", label: "Analytics", icon: Activity },
  { to: "/alerts", label: "Alerts", icon: Bell },
] as const;

const iconFor = { moisture: Droplets, temp: Thermometer, humidity: CloudSun, rain: CloudSun };

function Dashboard() {
  return (
    <AppShell title="Good Morning, Farmer" subtitle="Your farm is stable. Here's today's overview.">
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Hero health card */}
        <section className="canopy rise-in relative overflow-hidden rounded-3xl p-6 shadow-[var(--shadow-lift)] lg:col-span-2">
          <div
            className="pointer-events-none absolute -top-24 -right-16 size-72 rounded-full opacity-30 blur-3xl"
            style={{ background: "oklch(0.9 0.15 145)" }}
          />
          <div className="relative grid gap-6 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center">
            <HealthRing score={healthScore} variant="dark" label="out of 100" />
            <div className="min-w-0">
              <Eyebrow className="text-primary-foreground/70">🌾 Farm Health Score</Eyebrow>
              <h2 className="mt-2 font-display text-3xl leading-tight font-bold sm:text-4xl">
                Healthy Farm
              </h2>
              <p className="text-accent-serif mt-2 text-base opacity-85">
                Canopy vigour is up 4 points this week — nutrient balance holding steady.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="glass rounded-full px-3 py-1.5 text-xs font-semibold">
                  Tomato · Block A101
                </span>
                <span className="glass rounded-full px-3 py-1.5 text-xs font-semibold">
                  Last sync 2 min ago
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Recommendation */}
        <section className="surface-lift rise-in p-5">
          <div className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-lg bg-info/10 text-info">
              <Sparkles className="size-4" />
            </span>
            <h2 className="text-base font-bold">Today's Recommendation</h2>
          </div>
          <ul className="mt-4 space-y-3">
            <CheckLine>Irrigate tomorrow, 06:00 — 40 minutes</CheckLine>
            <CheckLine>Crop healthy — no fungicide required</CheckLine>
            <CheckLine>Weather safe — no rain for 48 hours</CheckLine>
          </ul>
          <Link
            to="/recommendations"
            className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            View full action plan
          </Link>
        </section>
      </div>

      {/* Quick actions */}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {quickActions.map((a) => (
          <Link
            key={a.to}
            to={a.to}
            className="surface flex flex-col gap-3 p-4 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
          >
            <span className="grid size-10 place-items-center rounded-xl bg-primary-soft text-primary">
              <a.icon className="size-5" />
            </span>
            <span className="text-sm font-semibold">{a.label}</span>
          </Link>
        ))}
      </div>

      {/* Sensors */}
      <div className="mt-6">
        <SectionTitle
          title="Live field sensors"
          action={
            <Link to="/sensors" className="text-sm font-semibold text-primary">
              View all
            </Link>
          }
        />
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {sensors.map((s) => {
            const Icon = iconFor[s.id];
            return (
              <StatTile
                key={s.id}
                icon={<Icon className="size-4.5" />}
                label={s.label}
                value={s.value}
                unit={s.unit}
                hint={s.status}
                tone={s.tone}
              />
            );
          })}
        </div>
      </div>

      {/* Charts + scan + map */}
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <section className="surface p-5 lg:col-span-2">
          <SectionTitle title="Farm health trend" />
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trend} margin={{ left: -20, right: 4, top: 8 }}>
                <defs>
                  <linearGradient id="healthFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="t" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis domain={[70, 100]} tickLine={false} axisLine={false} fontSize={12} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 14,
                    border: "1px solid var(--color-border)",
                    background: "var(--color-card)",
                    fontSize: 12,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="health"
                  stroke="var(--color-chart-1)"
                  strokeWidth={3}
                  fill="url(#healthFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="surface overflow-hidden">
          <img
            src={leafScan}
            alt="Most recent tomato leaf scan"
            loading="lazy"
            width={1024}
            height={1024}
            className="h-44 w-full object-cover"
          />
          <div className="p-5">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-display text-lg font-bold">Tomato</h3>
              <Pill tone="primary">
                <Leaf className="size-3" /> Healthy
              </Pill>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">98% confidence · today 07:12</p>
            <Link
              to="/result"
              className="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-border px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-accent"
            >
              Open latest report
            </Link>
          </div>
        </section>
      </div>

      {/* Alerts + field map */}
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <section className="surface p-5 lg:col-span-2">
          <SectionTitle
            title="Active alerts"
            action={
              <Link to="/alerts" className="text-sm font-semibold text-primary">
                All alerts
              </Link>
            }
          />
          <ul className="divide-y divide-border">
            {alerts.slice(0, 3).map((a) => (
              <li key={a.id} className="flex items-start gap-3 py-3">
                <span
                  className={`mt-1.5 size-2.5 shrink-0 rounded-full ${
                    a.severity === "critical"
                      ? "bg-destructive"
                      : a.severity === "warning"
                        ? "bg-warning"
                        : "bg-info"
                  }`}
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{a.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {a.time} · {a.action}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="surface overflow-hidden p-5">
          <SectionTitle title="Barkz Baritoz farmland" />
          <img
            src={fieldMap}
            alt="Aerial map of the farmland plots"
            loading="lazy"
            width={1024}
            height={1024}
            className="mx-auto h-40 w-auto object-contain"
          />
          <dl className="mt-4 grid grid-cols-3 gap-2 text-center">
            {[
              ["Plants", "3,256"],
              ["Harvest", "13,530"],
              ["Farmers", "32"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-xl bg-muted/60 py-2.5">
                <dt className="text-[11px] text-muted-foreground">{k}</dt>
                <dd className="font-display text-base font-bold">{v}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </AppShell>
  );
}
