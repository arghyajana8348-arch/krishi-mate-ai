import { createFileRoute, Link } from "@tanstack/react-router";
import { Cpu, Leaf, ShieldCheck, WifiOff } from "lucide-react";

import farmHero from "@/assets/farm-hero.jpg";
import { AppShell } from "@/components/app-shell";
import { Eyebrow, Pill, SectionTitle } from "@/components/kit";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About KrishiMitra AI — Offline Farming Intelligence" },
      { name: "description", content: "How KrishiMitra AI combines on-device crop disease models with ESP32 field sensors for smallholder farms." },
      { property: "og:title", content: "About KrishiMitra AI — Offline Farming Intelligence" },
      { property: "og:description", content: "How KrishiMitra AI combines on-device crop disease models with ESP32 field sensors for smallholder farms." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const pillars = [
  { icon: WifiOff, title: "Offline by design", body: "Diagnosis, advisory and logging all run on the phone. Connectivity is a bonus, never a requirement." },
  { icon: Cpu, title: "Sensors that survive", body: "Low-power ESP32 nodes buffer weeks of readings and sync the moment a signal appears." },
  { icon: Leaf, title: "Crop-first models", body: "38 disease classes trained on Indian field imagery, tuned for cheap cameras and harsh light." },
  { icon: ShieldCheck, title: "Farmer-owned data", body: "Your scans and yields belong to you — encrypted locally, exportable any time." },
];

function About() {
  return (
    <AppShell title="About" subtitle="Why KrishiMitra AI exists">
      <section className="surface overflow-hidden">
        <img src={farmHero} alt="Aerial view of farmland at sunrise" className="h-52 w-full object-cover sm:h-72" loading="lazy" />
        <div className="p-6">
          <Eyebrow>Our mission</Eyebrow>
          <h2 className="mt-1 max-w-2xl font-display text-3xl leading-tight font-bold">
            Put an agronomist in every smallholder's pocket — even where the network ends.
          </h2>
          <p className="text-accent-serif mt-3 max-w-2xl text-muted-foreground">
            Built for 4-acre farms in Purba Medinipur and beyond, KrishiMitra AI turns a low-cost phone and a handful
            of sensors into a full crop intelligence system.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Pill tone="primary">On-device AI</Pill>
            <Pill tone="info">ESP32 ready</Pill>
            <Pill tone="muted">3 languages</Pill>
          </div>
        </div>
      </section>

      <section className="mt-6">
        <SectionTitle title="What makes it different" />
        <div className="grid gap-3 sm:grid-cols-2">
          {pillars.map((p) => (
            <article key={p.title} className="surface p-5">
              <span className="grid size-10 place-items-center rounded-xl bg-primary-soft text-primary">
                <p.icon className="size-5" />
              </span>
              <h3 className="mt-3 font-display text-lg font-bold">{p.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="surface mt-6 flex flex-wrap items-center justify-between gap-4 p-6">
        <div>
          <p className="font-display text-xl font-bold">Version 2.4.1 · Offline models bundled</p>
          <p className="text-sm text-muted-foreground">Made with farmers in West Bengal, India.</p>
        </div>
        <Link to="/help" className="rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground">
          Get support
        </Link>
      </section>
    </AppShell>
  );
}
