import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [
    { title: "Settings — KrishiMitra AI" },
    { name: "description", content: "Configure KrishiMitra AI preferences and offline behavior." },
    { property: "og:title", content: "Settings — KrishiMitra AI" },
    { property: "og:description", content: "Configure KrishiMitra AI preferences and offline behavior." },
  ] }),
  component: Settings,
});

function Settings() {
  return <AppShell title="Settings" subtitle="Application and farming preferences"><section className="surface p-6"><h2 className="font-display text-2xl font-bold">Application settings</h2><p className="mt-2 text-muted-foreground">Language, alerts, and offline preferences will appear here.</p></section></AppShell>;
}