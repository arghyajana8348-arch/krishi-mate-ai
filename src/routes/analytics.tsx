import { createFileRoute } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { AppShell } from "@/components/app-shell";
import { SectionTitle } from "@/components/kit";
import { diseaseHistory, trend } from "@/lib/farm-data";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — KrishiMitra AI" },
      { name: "description", content: "Temperature, humidity, soil moisture, disease history and health trends." },
      { property: "og:title", content: "Analytics — KrishiMitra AI" },
      { property: "og:description", content: "Interactive farm analytics and trend charts." },
    ],
  }),
  component: Analytics,
});

const tooltipStyle = {
  borderRadius: 14,
  border: "1px solid var(--color-border)",
  background: "var(--color-card)",
  fontSize: 12,
};

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="surface p-5">
      <SectionTitle title={title} />
      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {children as React.ReactElement}
        </ResponsiveContainer>
      </div>
    </section>
  );
}

function Analytics() {
  return (
    <AppShell title="Analytics" subtitle="Seven-day rolling window · sensor + scan telemetry">
      <div className="grid gap-4 lg:grid-cols-2">
        <ChartCard title="Temperature (°C)">
          <AreaChart data={trend} margin={{ left: -22, right: 4, top: 8 }}>
            <defs>
              <linearGradient id="tempFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-chart-4)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="var(--color-chart-4)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
            <XAxis dataKey="t" tickLine={false} axisLine={false} fontSize={12} />
            <YAxis tickLine={false} axisLine={false} fontSize={12} />
            <Tooltip contentStyle={tooltipStyle} />
            <Area type="monotone" dataKey="temp" stroke="var(--color-chart-4)" strokeWidth={3} fill="url(#tempFill)" />
          </AreaChart>
        </ChartCard>

        <ChartCard title="Humidity (%)">
          <LineChart data={trend} margin={{ left: -22, right: 4, top: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
            <XAxis dataKey="t" tickLine={false} axisLine={false} fontSize={12} />
            <YAxis tickLine={false} axisLine={false} fontSize={12} />
            <Tooltip contentStyle={tooltipStyle} />
            <Line type="monotone" dataKey="humidity" stroke="var(--color-chart-3)" strokeWidth={3} dot={false} />
          </LineChart>
        </ChartCard>

        <ChartCard title="Soil moisture (%)">
          <AreaChart data={trend} margin={{ left: -22, right: 4, top: 8 }}>
            <defs>
              <linearGradient id="moistFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
            <XAxis dataKey="t" tickLine={false} axisLine={false} fontSize={12} />
            <YAxis tickLine={false} axisLine={false} fontSize={12} />
            <Tooltip contentStyle={tooltipStyle} />
            <Area type="monotone" dataKey="moisture" stroke="var(--color-chart-1)" strokeWidth={3} fill="url(#moistFill)" />
          </AreaChart>
        </ChartCard>

        <ChartCard title="Disease cases detected">
          <BarChart data={diseaseHistory} margin={{ left: -22, right: 4, top: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
            <YAxis tickLine={false} axisLine={false} fontSize={12} />
            <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--color-muted)" }} />
            <Bar dataKey="cases" fill="var(--color-chart-5)" radius={[8, 8, 0, 0]} barSize={26} />
          </BarChart>
        </ChartCard>
      </div>

      <div className="mt-4">
        <ChartCard title="Farm health trend (0–100)">
          <AreaChart data={trend} margin={{ left: -22, right: 4, top: 8 }}>
            <defs>
              <linearGradient id="hFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-chart-2)" stopOpacity={0.45} />
                <stop offset="100%" stopColor="var(--color-chart-2)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
            <XAxis dataKey="t" tickLine={false} axisLine={false} fontSize={12} />
            <YAxis domain={[70, 100]} tickLine={false} axisLine={false} fontSize={12} />
            <Tooltip contentStyle={tooltipStyle} />
            <Area type="monotone" dataKey="health" stroke="var(--color-chart-2)" strokeWidth={3} fill="url(#hFill)" />
          </AreaChart>
        </ChartCard>
      </div>
    </AppShell>
  );
}
