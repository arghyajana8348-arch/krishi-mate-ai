import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, Download, FileText, Share2 } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { Pill, SectionTitle } from "@/components/kit";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Reports — KrishiMitra AI" },
      { name: "description", content: "Daily and weekly farm reports with PDF export and sharing." },
      { property: "og:title", content: "Reports — KrishiMitra AI" },
      { property: "og:description", content: "Daily and weekly farm reports, exportable as PDF." },
    ],
  }),
  component: Reports;
});

const daily = [
  { id: "d1", title: "Daily field report", date: "25 August 2026", stat: "Health 92 · 1 scan · 3 alerts" },
  { id: "d2", title: "Daily field report", date: "24 August 2026", stat: "Health 91 · 2 scans · 1 alert" },
  { id: "d3", title: "Daily field report", date: "23 August 2026", stat: "Health 90 · 1 scan · 2 alerts" },
];

const weekly = [
  { id: "w1", title: "Weekly summary — Week 34", date: "19–25 August", stat: "Avg health 90 · 4 diseases · 18% water saved" },
  { id: "w2", title: "Weekly summary — Week 33", date: "12–18 August", stat: "Avg health 88 · 2 diseases · 12% water saved" },
];

function Reports() {
  return (
    <AppShell
      title="Reports"
      subtitle="Auto-generated summaries you can export or share"
      actions={
        <button className="hidden items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground sm:flex">
          <Download className="size-4" /> Export PDF
        </button>
      }
    >
      <section className="canopy rounded-3xl p-6">
        <p className="eyebrow text-primary-foreground/70">This week</p>
        <h2 className="mt-2 font-display text-3xl font-bold">Week 34 · Farm performance</h2>
        <p className="text-accent-serif mt-2 text-lg opacity-85">
          Yield forecast up 6.4% versus last cycle, with two disease events contained early.
        </p>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            ["Avg health", "90"],
            ["Scans", "9"],
            ["Alerts", "11"],
            ["Water saved", "18%"],
          ].map(([k, v]) => (
            <div key={k} className="glass rounded-2xl p-3">
              <p className="text-xs opacity-80">{k}</p>
              <p className="font-display text-2xl font-bold">{v}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <section>
          <SectionTitle title="Daily reports" />
          <ul className="space-y-3">
            {daily.map((r) => (
              <ReportRow key={r.id} {...r} tag="Daily" />
            ))}
          </ul>
        </section>
        <section>
          <SectionTitle title="Weekly reports" />
          <ul className="space-y-3">
            {weekly.map((r) => (
              <ReportRow key={r.id} {...r} tag="Weekly" />
            ))}
          </ul>
        </section>
      </div>
    </AppShell>
  );
}

function ReportRow({
  title,
  date,
  stat,
  tag,
}: {
  title: string;
  date: string;
  stat: string;
  tag: string;
}) {
  return (
    <li className="surface grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-4">
      <div className="flex min-w-0 items-center gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
          <FileText className="size-5" />
        </span>
        <div className="min-w-0">
          <p className="truncate font-semibold">{title}</p>
          <p className="truncate text-xs text-muted-foreground">
            <CalendarDays className="mr-1 inline size-3" />
            {date} · {stat}
          </p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <Pill tone="muted">{tag}</Pill>
        <button className="grid size-9 place-items-center rounded-xl border border-border transition-colors hover:bg-accent" aria-label="Download PDF">
          <Download className="size-4" />
        </button>
        <button className="grid size-9 place-items-center rounded-xl border border-border transition-colors hover:bg-accent" aria-label="Share report">
          <Share2 className="size-4" />
        </button>
      </div>
    </li>
  );
}
