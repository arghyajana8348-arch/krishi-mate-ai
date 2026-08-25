import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";

export const Route = createFileRoute("/device")({
  head: () => ({ meta: [
    { title: "Device Status — KrishiMitra AI" },
    { name: "description", content: "Monitor connected farm sensors and edge devices." },
    { property: "og:title", content: "Device Status — KrishiMitra AI" },
    { property: "og:description", content: "Monitor connected farm sensors and edge devices." },
  ] }),
  component: DeviceStatus,
});

function DeviceStatus() {
  return <AppShell title="Device Status" subtitle="Connected sensors and edge devices"><section className="surface p-6"><h2 className="font-display text-2xl font-bold">All systems operational</h2><p className="mt-2 text-muted-foreground">Device health and connectivity details will appear here.</p></section></AppShell>;
}