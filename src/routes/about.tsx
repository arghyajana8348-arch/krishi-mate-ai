import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "About — KrishiMitra AI" },
    { name: "description", content: "Learn about the KrishiMitra AI smart farming assistant." },
    { property: "og:title", content: "About — KrishiMitra AI" },
    { property: "og:description", content: "Learn about the KrishiMitra AI smart farming assistant." },
  ] }),
  component: About,
});

function About() {
  return <AppShell title="About" subtitle="Your offline AI farming assistant"><section className="surface p-6"><h2 className="font-display text-2xl font-bold">KrishiMitra AI</h2><p className="mt-2 text-muted-foreground">Practical, intelligent farming guidance built for the field.</p></section></AppShell>;
}