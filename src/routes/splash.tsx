import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

import farmHero from "@/assets/farm-hero.jpg";

export const Route = createFileRoute("/splash")({
  head: () => ({
    meta: [
      { title: "KrishiMitra AI — Offline AI Farming Assistant" },
      {
        name: "description",
        content: "KrishiMitra AI: an offline-first AI farming assistant for Indian smallholder farms.",
      },
      { property: "og:title", content: "KrishiMitra AI — Offline AI Farming Assistant" },
      { property: "og:description", content: "Offline-first AI farming assistant for Indian farms." },
    ],
  }),
  component: Splash,
});

function Splash() {
  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden px-6">
      <img
        src={farmHero}
        alt="Farmland at sunrise"
        width={1536}
        height={1024}
        className="absolute inset-0 size-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.25 0.06 150 / 0.55) 0%, oklch(0.22 0.05 150 / 0.82) 100%)",
        }}
      />
      <div className="rise-in relative w-full max-w-md text-center text-primary-foreground">
        <span className="glass mx-auto grid size-20 place-items-center rounded-3xl">
          <Sparkles className="size-9" />
        </span>
        <h1 className="mt-7 font-display text-5xl leading-tight font-bold">KrishiMitra AI</h1>
        <p className="text-accent-serif mt-2 text-xl opacity-90">Offline AI Farming Assistant</p>
        <div className="mx-auto mt-8 h-1 w-40 overflow-hidden rounded-full bg-primary-foreground/25">
          <div className="h-full w-1/2 rounded-full bg-primary-foreground/90 soft-pulse" />
        </div>
        <Link
          to="/login"
          className="glass mt-10 inline-flex w-full items-center justify-center rounded-2xl px-6 py-3.5 text-sm font-semibold"
        >
          Get started
        </Link>
        <p className="mt-4 text-xs opacity-70">Works fully offline · Edge AI on ESP32</p>
      </div>
    </main>
  );
}
