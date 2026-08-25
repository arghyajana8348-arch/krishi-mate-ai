import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import leafScan from "@/assets/leaf-scan.jpg";

export const Route = createFileRoute("/analyzing")({
  head: () => ({
    meta: [
      { title: "Analyzing Crop — KrishiMitra AI" },
      { name: "description", content: "On-device AI is analysing the captured crop leaf image." },
      { property: "og:title", content: "Analyzing Crop — KrishiMitra AI" },
      { property: "og:description", content: "On-device AI analysing your crop leaf image." },
    ],
  }),
  component: Analyzing,
});

const steps = ["Preprocessing image", "Segmenting leaf area", "Running disease model", "Scoring confidence"];

function Analyzing() {
  const [progress, setProgress] = useState(6);
  const navigate = useNavigate();

  useEffect(() => {
    const id = setInterval(() => setProgress((p) => Math.min(100, p + 3)), 90);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const t = setTimeout(() => navigate({ to: "/result" }), 500);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [progress, navigate]);

  const activeStep = Math.min(steps.length - 1, Math.floor(progress / 26));

  return (
    <main className="canopy grid min-h-screen place-items-center px-6 py-12">
      <div className="w-full max-w-sm text-center">
        <div className="relative mx-auto aspect-square w-64 overflow-hidden rounded-3xl shadow-[var(--shadow-lift)]">
          <img
            src={leafScan}
            alt="Crop leaf being analysed"
            loading="lazy"
            width={1024}
            height={1024}
            className="size-full object-cover"
          />
          <div className="absolute inset-x-0 h-20 bg-linear-to-b from-transparent via-primary-foreground/50 to-transparent scan-sweep" />
          <div className="absolute inset-0 border-2 border-primary-foreground/30" />
        </div>

        <h1 className="mt-8 font-display text-3xl font-bold">Analyzing Crop…</h1>
        <p className="text-accent-serif mt-1 text-lg opacity-85">{steps[activeStep]}</p>

        <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-primary-foreground/25">
          <div
            className="h-full rounded-full bg-primary-foreground transition-[width] duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-sm font-semibold">{progress}%</p>
        <p className="mt-6 text-xs opacity-70">Running fully offline on the edge device</p>
      </div>
    </main>
  );
}
