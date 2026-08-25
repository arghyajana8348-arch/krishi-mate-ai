import { createFileRoute, Link } from "@tanstack/react-router";
import { Camera, Image as ImageIcon, Info, Sun, Focus } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { SectionTitle } from "@/components/kit";

export const Route = createFileRoute("/scan")({
  head: () => ({
    meta: [
      { title: "Scan Crop — KrishiMitra AI" },
      { name: "description", content: "Capture a crop leaf photo for offline AI disease detection." },
      { property: "og:title", content: "Scan Crop — KrishiMitra AI" },
      { property: "og:description", content: "Capture a leaf photo for offline AI disease detection." },
    ],
  }),
  component: Scan,
});

const tips = [
  { icon: Sun, text: "Use natural daylight, avoid harsh shadows" },
  { icon: Focus, text: "Fill the frame with one leaf, keep it in focus" },
  { icon: Info, text: "Capture the underside if spots are visible" },
];

function Scan() {
  return (
    <AppShell title="Scan Crop" subtitle="Capture a clear image of a single crop leaf.">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
        <section className="surface-lift relative grid place-items-center overflow-hidden p-6">
          <div className="relative grid aspect-square w-full max-w-md place-items-center rounded-3xl bg-muted/70">
            <div className="absolute inset-8 rounded-2xl border-2 border-dashed border-primary/40" />
            <div className="absolute inset-x-8 top-8 h-16 bg-linear-to-b from-primary/25 to-transparent scan-sweep" />
            <div className="relative text-center">
              <span className="canopy mx-auto grid size-20 place-items-center rounded-full shadow-[var(--shadow-lift)]">
                <Camera className="size-9" />
              </span>
              <p className="mt-4 text-sm font-semibold">Position the leaf inside the frame</p>
              <p className="text-accent-serif text-base text-muted-foreground">
                Offline model · 1.8s average inference
              </p>
            </div>
          </div>

          <div className="mt-6 flex w-full max-w-md items-center gap-3">
            <button className="grid size-14 shrink-0 place-items-center rounded-2xl border border-border bg-card transition-colors hover:bg-accent">
              <ImageIcon className="size-5" />
            </button>
            <Link
              to="/analyzing"
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Camera className="size-5" /> Capture & Analyse
            </Link>
          </div>
        </section>

        <section className="surface p-5">
          <SectionTitle title="Capture guidance" />
          <ul className="space-y-4">
            {tips.map((t) => (
              <li key={t.text} className="flex items-start gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                  <t.icon className="size-4.5" />
                </span>
                <p className="text-sm text-muted-foreground">{t.text}</p>
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-2xl bg-info/8 p-4">
            <p className="text-xs font-bold tracking-wide text-info uppercase">Supported crops</p>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Tomato, Paddy, Potato, Chilli, Brinjal, Maize — 38 disease classes on-device.
            </p>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
