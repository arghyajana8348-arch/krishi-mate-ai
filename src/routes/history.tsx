import { createFileRoute } from "@tanstack/react-router";

import leafBlight from "@/assets/leaf-blight.jpg";
import leafScan from "@/assets/leaf-scan.jpg";
import { AppShell } from "@/components/app-shell";
import { Pill } from "@/components/kit";
import { scans } from "@/lib/farm-data";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "Crop History — KrishiMitra AI" },
      { name: "description", content: "Timeline of previous crop scans with diagnosis and confidence." },
      { property: "og:title", content: "Crop History — KrishiMitra AI" },
      { property: "og:description", content: "Timeline of previous crop scans and recommendations." },
    ],
  }),
  component: History,
});

function History() {
  return (
    <AppShell title="Crop History" subtitle="Every scan stored offline in the on-device database">
      <ol className="relative space-y-4 border-l border-border pl-5 sm:pl-7">
        {scans.map((s) => (
          <li key={s.id} className="relative">
            <span
              className={`absolute top-6 -left-[26px] size-3 rounded-full ring-4 ring-background sm:-left-[34px] ${
                s.healthy ? "bg-leaf" : "bg-destructive"
              }`}
            />
            <article className="surface grid gap-4 p-4 sm:grid-cols-[112px_minmax(0,1fr)]">
              <img
                src={s.healthy ? leafScan : leafBlight}
                alt={`${s.crop} scan showing ${s.result}`}
                loading="lazy"
                width={1024}
                height={1024}
                className="h-28 w-full rounded-xl object-cover sm:size-28"
              />
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-lg font-bold">{s.crop}</h3>
                  <Pill tone={s.healthy ? "primary" : "critical"}>{s.result}</Pill>
                  <span className="text-xs text-muted-foreground">{s.date}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{s.note}</p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-linear-to-r from-primary to-leaf"
                      style={{ width: `${s.confidence}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold">{s.confidence}%</span>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </AppShell>
  );
}
