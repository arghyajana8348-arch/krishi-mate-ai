import { createFileRoute } from "@tanstack/react-router";
import { CloudSun, Droplets, Leaf, Sparkles, TestTube } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { CheckLine, Eyebrow, Pill, SectionTitle } from "@/components/kit";
import type { Tone } from "@/components/kit";

export const Route = createFileRoute("/recommendations")({
  head: () => ({
    meta: [
      { title: "AI Advisory — KrishiMitra AI" },
      { name: "description", content: "Today's AI-generated action plan for irrigation, disease and nutrients." },
      { property: "og:title", content: "AI Advisory — KrishiMitra AI" },
      { property: "og:description", content: "Prioritised daily farm action plan generated on-device." },
    ],
  }),
  component: Recommendations,
});

const plan: {
  icon: typeof Droplets;
  title: string;
  priority: string;
  tone: Tone;
  body: string;
  steps: string[];
}[] = [
  {
    icon: Droplets,
    title: "Recommended irrigation",
    priority: "High priority",
    tone: "critical",
    body: "Soil moisture at 42% is 13 points below the tomato optimum for this growth stage.",
    steps: ["Drip irrigate Block A101 for 40 minutes", "Start at 06:00 to reduce evaporation", "Recheck moisture at 11:00"],
  },
  {
    icon: Leaf,
    title: "Disease prevention",
    priority: "Medium priority",
    tone: "warning",
    body: "Night humidity above 65% for three consecutive nights creates a late blight window.",
    steps: ["Preventive copper spray on lower canopy", "Improve row spacing airflow", "Scan 5 leaves daily for 3 days"],
  },
  {
    icon: TestTube,
    title: "Nutrient suggestion",
    priority: "Planned",
    tone: "info",
    body: "Nitrogen uptake is trending down while potassium remains balanced.",
    steps: ["Apply 19:19:19 at 4 kg/acre after irrigation", "Skip urea this cycle", "Retest soil on 30 August"],
  },
  {
    icon: CloudSun,
    title: "Weather alert",
    priority: "Watch",
    tone: "muted",
    body: "22 mm rainfall expected Thursday afternoon with gusty winds.",
    steps: ["Delay fertiliser until Friday", "Secure shade nets", "Clear field drainage channels"],
  },
];

function Recommendations() {
  return (
    <AppShell title="Today's Action Plan" subtitle="Generated on-device at 06:05 · confidence 94%">
      <section className="canopy rise-in relative overflow-hidden rounded-3xl p-6">
        <Eyebrow className="text-primary-foreground/70">AI Advisory</Eyebrow>
        <h2 className="mt-2 max-w-2xl font-display text-2xl leading-snug font-bold sm:text-3xl">
          Water first, spray second — your farm needs 40 minutes of irrigation before the heat peak.
        </h2>
        <p className="text-accent-serif mt-3 max-w-2xl text-lg opacity-85">
          Four actions today. Two are time-sensitive and should be finished before 09:00.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <span className="glass rounded-full px-3 py-1.5 text-xs font-semibold">
            <Sparkles className="mr-1 inline size-3" /> 4 recommendations
          </span>
          <span className="glass rounded-full px-3 py-1.5 text-xs font-semibold">Water saving: 18%</span>
        </div>
      </section>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {plan.map((p) => (
          <section key={p.title} className="surface p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                  <p.icon className="size-5" />
                </span>
                <h3 className="truncate font-display text-lg font-bold">{p.title}</h3>
              </div>
              <Pill tone={p.tone}>{p.priority}</Pill>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{p.body}</p>
            <ul className="mt-4 space-y-2.5">
              {p.steps.map((s) => (
                <CheckLine key={s}>{s}</CheckLine>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <section className="surface mt-4 p-5">
        <SectionTitle title="Why this plan" />
        <p className="text-accent-serif text-lg text-muted-foreground">
          The model weighed 7 days of sensor history, 3 recent crop scans, and the local forecast to rank
          today's tasks by yield impact.
        </p>
      </section>
    </AppShell>
  );
}
