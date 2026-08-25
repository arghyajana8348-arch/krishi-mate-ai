import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, Download, RefreshCw } from "lucide-react";

import leafBlight from "@/assets/leaf-blight.jpg";
import { AppShell } from "@/components/app-shell";
import { CheckLine, Eyebrow, Pill, SectionTitle } from "@/components/kit";

export const Route = createFileRoute("/result")({
  head: () => ({
    meta: [
      { title: "Disease Result — KrishiMitra AI" },
      { name: "description", content: "AI disease detection result with confidence score and treatment plan." },
      { property: "og:title", content: "Disease Result — KrishiMitra AI" },
      { property: "og:description", content: "Disease prediction, risk level and treatment recommendations." },
    ],
  }),
  component: Result,
});

function Result() {
  return (
    <AppShell title="Disease Result" subtitle="Tomato · Block A101 · 17 June, 07:12">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_380px]">
        <section className="surface-lift overflow-hidden">
          <div className="relative">
            <img
              src={leafBlight}
              alt="Tomato leaf showing late blight lesions"
              loading="lazy"
              width={1024}
              height={1024}
              className="h-72 w-full object-cover sm:h-96"
            />
            <div className="absolute top-4 left-4">
              <Pill tone="critical">
                <AlertTriangle className="size-3" /> High Risk
              </Pill>
            </div>
          </div>
          <div className="p-6">
            <Eyebrow>Prediction</Eyebrow>
            <h2 className="mt-1 font-display text-4xl font-bold">Late Blight</h2>
            <p className="text-accent-serif mt-1 text-lg text-muted-foreground">
              Phytophthora infestans · foliar stage 2
            </p>

            <div className="mt-6">
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-semibold">Model confidence</span>
                <span className="font-display text-2xl font-bold">97%</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                <div className="h-full w-[97%] rounded-full bg-linear-to-r from-primary to-leaf" />
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
                <Download className="size-4" /> Save Report
              </button>
              <Link
                to="/scan"
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-border px-5 py-3.5 text-sm font-semibold transition-colors hover:bg-accent"
              >
                <RefreshCw className="size-4" /> Rescan
              </Link>
            </div>
          </div>
        </section>

        <div className="space-y-4">
          <section className="surface p-5">
            <SectionTitle title="Recommended treatment" />
            <ul className="space-y-3">
              <CheckLine>Spray copper fungicide (2g/L) at dusk today</CheckLine>
              <CheckLine>Delay irrigation for 48 hours</CheckLine>
              <CheckLine>Inspect nearby plants within a 5-metre radius</CheckLine>
              <CheckLine>Remove and burn severely infected leaves</CheckLine>
            </ul>
          </section>

          <section className="surface p-5">
            <SectionTitle title="Detection breakdown" />
            <ul className="space-y-3">
              {[
                ["Late Blight", 97],
                ["Early Blight", 2],
                ["Healthy", 1],
              ].map(([label, pct]) => (
                <li key={label as string}>
                  <div className="flex justify-between text-sm">
                    <span>{label}</span>
                    <span className="font-semibold">{pct}%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl bg-warning/12 p-5">
            <p className="text-xs font-bold tracking-wide text-warning-foreground uppercase">Field note</p>
            <p className="text-accent-serif mt-1.5 text-base text-warning-foreground">
              Humidity above 65% for three consecutive nights accelerates blight spread — monitor daily.
            </p>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
