import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";

export const Route = createFileRoute("/help")({
  head: () => ({ meta: [
    { title: "Help Center — KrishiMitra AI" },
    { name: "description", content: "Find help using KrishiMitra AI smart farming tools." },
    { property: "og:title", content: "Help Center — KrishiMitra AI" },
    { property: "og:description", content: "Find help using KrishiMitra AI smart farming tools." },
  ] }),
  component: Help,
});

function Help() {
  return <AppShell title="Help Center" subtitle="Guidance for smart farming tools"><section className="surface p-6"><h2 className="font-display text-2xl font-bold">How can we help?</h2><p className="mt-2 text-muted-foreground">Support topics and frequently asked questions will appear here.</p></section></AppShell>;
}