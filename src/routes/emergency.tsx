import { createFileRoute } from "@tanstack/react-router";
import { Phone, ShieldAlert } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { CheckLine, Eyebrow, Pill, SectionTitle } from "@/components/kit";
import { emergencyContacts, emergencyPlaybooks } from "@/lib/farm-data";

export const Route = createFileRoute("/emergency")({
  head: () => ({
    meta: [
      { title: "Emergency Help — KrishiMitra AI" },
      { name: "description", content: "One-tap helplines and rapid response playbooks for pest outbreaks, flooding and heat stress." },
      { property: "og:title", content: "Emergency Help — KrishiMitra AI" },
      { property: "og:description", content: "One-tap helplines and rapid response playbooks for pest outbreaks, flooding and heat stress." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Emergency,
});

function Emergency() {
  return (
    <AppShell title="Emergency" subtitle="Fast help when the field can't wait">
      <section className="surface bg-destructive/5 p-6">
        <Eyebrow>Rapid response</Eyebrow>
        <h2 className="mt-1 font-display text-2xl font-bold">Report a farm emergency</h2>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Sends your last scan, GPS block and sensor snapshot to the nearest agriculture officer — works offline and
          queues until network returns.
        </p>
        <button className="mt-5 inline-flex items-center gap-2 rounded-full bg-destructive px-6 py-3 font-semibold text-destructive-foreground shadow-[var(--shadow-lift)]">
          <ShieldAlert className="size-4.5" /> Raise SOS alert
        </button>
      </section>

      <section className="mt-6">
        <SectionTitle title="Helplines" />
        <div className="grid gap-3 sm:grid-cols-2">
          {emergencyContacts.map((c) => (
            <a key={c.id} href={`tel:${c.phone.replace(/\s/g, "")}`} className="surface flex items-center justify-between gap-3 p-4">
              <div>
                <p className="font-semibold">{c.name}</p>
                <p className="text-xs text-muted-foreground">{c.role}</p>
                <p className="mt-1 text-sm text-primary">{c.phone}</p>
              </div>
              <span className="grid size-10 place-items-center rounded-full bg-primary-soft text-primary">
                <Phone className="size-4.5" />
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <SectionTitle title="Playbooks" />
        <div className="grid gap-3 lg:grid-cols-3">
          {emergencyPlaybooks.map((p) => (
            <article key={p.id} className="surface p-5">
              <Pill tone="warning">Protocol</Pill>
              <h3 className="mt-3 font-display text-lg font-bold">{p.title}</h3>
              <ul className="mt-3 space-y-2">
                {p.steps.map((s) => (
                  <CheckLine key={s}>{s}</CheckLine>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
