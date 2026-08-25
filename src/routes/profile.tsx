import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [
    { title: "Profile — KrishiMitra AI" },
    { name: "description", content: "Manage your farmer profile and farm details." },
    { property: "og:title", content: "Profile — KrishiMitra AI" },
    { property: "og:description", content: "Manage your farmer profile and farm details." },
  ] }),
  component: Profile,
});

function Profile() {
  return <AppShell title="Profile" subtitle="Your farmer and farm details"><section className="surface p-6"><h2 className="font-display text-2xl font-bold">Arghya Jana</h2><p className="mt-2 text-muted-foreground">Profile information and preferences will appear here.</p></section></AppShell>;
}