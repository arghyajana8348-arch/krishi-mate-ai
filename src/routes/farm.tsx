import { createFileRoute, Link } from "@tanstack/react-router";
import { Droplets, Leaf, Map as MapIcon, Ruler } from "lucide-react";

import fieldMap from "@/assets/field-map.jpg";
import { AppShell } from "@/components/app-shell";
import { Eyebrow, HealthRing, Pill, SectionTitle, StatTile } from "@/components/kit";
import { farmer, fields } from "@/lib/farm-data";

export const Route = createFileRoute("/farm")({
  head: () => ({
    meta: [
      { title: "Farm Overview — KrishiMitra AI" },
      { name: "description", content: "Block-by-block view of crop health, soil moisture and growth stage across your farm." },
      { property: "og:title", content: "Farm Overview — KrishiMitra AI" },
      { property: "og:description", content: "Block-by-block view of crop health, soil moisture and growth stage across your farm." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FarmOverview,
});

function FarmOverview() {
  const avg = Math.round(fields.reduce((s, f) => s + f.health, 0) / fields.length);

  return (
    <AppShell title="Farm Overview" subtitle="Every block, mapped and monitored">
      <div className="grid gap-4 lg:grid-cols-3">
        <section className="surface overflow-hidden lg:col-span-2">
          <img src={fieldMap} alt="Satellite plot map of the farm blocks" className="h-56 w-full object-cover sm:h-72" loading="lazy" />
          <div className="flex flex-wrap items-center justify-between gap-3 p-5">
            <div>
              <Eyebrow>{farmer.village}</Eyebrow>
              <h2 className="font-display text-2xl font-bold">{farmer.farmSize} · 4 active blocks</h2>
            </div>
            <Pill tone="primary">
              <MapIcon className="size-3.5" /> Mapped today
            </Pill>
          </div>
        </section>

        <section className="surface grid place-items-center p-6">
          <HealthRing score={avg} label="Average Block Health" />
        </section>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <StatTile icon={<Ruler className="size-4.5" />} label="Total Area" value="4.2" unit="acres" hint="Across 4 blocks" />
        <StatTile icon={<Leaf className="size-4.5" />} label="Crops" value="2" unit="types" hint="Tomato · Paddy" tone="info" />
        <StatTile icon={<Droplets className="size-4.5" />} label="Avg Moisture" value="59" unit="%" hint="A101 below target" tone="warning" />
      </div>

      <section className="mt-6">
        <SectionTitle title="Blocks" action={<Link to="/sensors" className="text-sm font-semibold text-primary">Live sensors</Link>} />
        <div className="grid gap-3 sm:grid-cols-2">
          {fields.map((f) => (
            <article key={f.id} className="surface p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-lg font-bold">{f.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {f.crop} · {f.area} · {f.stage}
                  </p>
                </div>
                <Pill tone={f.tone}>{f.health}% health</Pill>
              </div>
              <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-primary" style={{ width: `${f.health}%` }} />
              </div>
              <p className="mt-3 text-xs text-muted-foreground">Soil moisture {f.moisture}%</p>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
