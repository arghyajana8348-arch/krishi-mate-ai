import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";

export const Route = createFileRoute("/farm")({
  head: () => ({ meta: [
    { title: "Farm Overview — KrishiMitra AI" },
    { name: "description", content: "Review fields, crops, and current farm conditions." },
    { property: "og:title", content: "Farm Overview — KrishiMitra AI" },
    { property: "og:description", content: "Review fields, crops, and current farm conditions." },
  ] }),
  component: FarmOverview,
});

function FarmOverview() {
  return <AppShell title="Farm Overview" subtitle="Fields, crops, and current conditions"><section className="surface p-6"><h2 className="font-display text-2xl font-bold">Your farm at a glance</h2><p className="mt-2 text-muted-foreground">Field information and crop conditions will appear here.</p></section></AppShell>;
}