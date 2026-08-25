import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";

export const Route = createFileRoute("/notifications")({
  head: () => ({ meta: [
    { title: "Notifications — KrishiMitra AI" },
    { name: "description", content: "Review recent farm updates, alerts, and AI insights." },
    { property: "og:title", content: "Notifications — KrishiMitra AI" },
    { property: "og:description", content: "Review recent farm updates, alerts, and AI insights." },
  ] }),
  component: Notifications,
});

function Notifications() {
  return <AppShell title="Notifications" subtitle="Recent updates and AI insights"><section className="surface p-6"><h2 className="font-display text-2xl font-bold">You’re up to date</h2><p className="mt-2 text-muted-foreground">New notifications will appear here.</p></section></AppShell>;
}