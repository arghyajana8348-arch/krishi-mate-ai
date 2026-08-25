import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, Languages, MapPin, Phone, Ruler, Sprout } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { Eyebrow, Pill, SectionTitle, StatTile } from "@/components/kit";
import { farmer, scans } from "@/lib/farm-data";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Farmer Profile — KrishiMitra AI" },
      { name: "description", content: "Your farmer identity, land details, crop mix and scanning activity summary." },
      { property: "og:title", content: "Farmer Profile — KrishiMitra AI" },
      { property: "og:description", content: "Your farmer identity, land details, crop mix and scanning activity summary." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Profile,
});

const rows = [
  { icon: MapPin, label: "Village", value: farmer.village },
  { icon: Ruler, label: "Farm size", value: farmer.farmSize },
  { icon: Sprout, label: "Crops", value: farmer.crop },
  { icon: Languages, label: "Language", value: farmer.language },
  { icon: Phone, label: "Phone", value: farmer.phone },
];

function Profile() {
  return (
    <AppShell title="Profile" subtitle="Your farmer and farm details">
      <section className="surface canopy p-6">
        <div className="flex flex-wrap items-center gap-4">
          <span className="grid size-16 place-items-center rounded-2xl bg-white/15 font-display text-2xl font-bold">
            AJ
          </span>
          <div className="min-w-0">
            <Eyebrow className="opacity-80">Verified farmer</Eyebrow>
            <h2 className="font-display text-3xl font-bold">{farmer.name}</h2>
            <p className="text-accent-serif text-sm opacity-85">{farmer.village}</p>
          </div>
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold uppercase">
            <Award className="size-3.5" /> Gold grower
          </span>
        </div>
      </section>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <StatTile icon={<Sprout className="size-4.5" />} label="Total scans" value={String(scans.length * 23)} hint="Since March 2026" />
        <StatTile icon={<Award className="size-4.5" />} label="Healthy rate" value="86" unit="%" hint="Above district average" tone="info" />
        <StatTile icon={<Ruler className="size-4.5" />} label="Blocks managed" value="4" hint="4.2 acres total" />
      </div>

      <section className="mt-6">
        <SectionTitle title="Details" action={<span className="text-sm font-semibold text-primary">Edit</span>} />
        <div className="surface divide-y divide-border">
          {rows.map((r) => (
            <div key={r.label} className="flex items-center gap-3 p-4">
              <span className="grid size-9 place-items-center rounded-xl bg-primary-soft text-primary">
                <r.icon className="size-4.5" />
              </span>
              <span className="text-sm font-semibold text-muted-foreground">{r.label}</span>
              <span className="ml-auto text-right text-sm font-semibold">{r.value}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <SectionTitle title="Recent scans" action={<Link to="/history" className="text-sm font-semibold text-primary">View all</Link>} />
        <div className="grid gap-3 sm:grid-cols-2">
          {scans.slice(0, 2).map((s) => (
            <article key={s.id} className="surface p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold">{s.crop} · {s.result}</p>
                <Pill tone={s.healthy ? "primary" : "critical"}>{s.confidence}%</Pill>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{s.date}</p>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
