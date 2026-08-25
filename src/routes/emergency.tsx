import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";

export const Route = createFileRoute("/emergency")({
  head: () => ({ meta: [
    { title: "Emergency Advisory — KrishiMitra AI" },
    { name: "description", content: "Get urgent guidance for severe crop and weather risks." },
    { property: "og:title", content: "Emergency Advisory — KrishiMitra AI" },
    { property: "og:description", content: "Get urgent guidance for severe crop and weather risks." },
  ] }),
  component: Emergency,
});

function Emergency() {
  return <AppShell title="Emergency Advisory" subtitle="Urgent support for crop and weather risks"><section className="surface p-6"><h2 className="font-display text-2xl font-bold">No active emergencies</h2><p className="mt-2 text-muted-foreground">Critical advisories will be prioritized here.</p></section></AppShell>;
}