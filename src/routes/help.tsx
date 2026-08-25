import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, MessageCircle, Phone, PlayCircle } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { Eyebrow, SectionTitle } from "@/components/kit";
import { faqs } from "@/lib/farm-data";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Help Center — KrishiMitra AI" },
      { name: "description", content: "Guides, FAQs and support channels for scanning crops, pairing sensors and using offline AI." },
      { property: "og:title", content: "Help Center — KrishiMitra AI" },
      { property: "og:description", content: "Guides, FAQs and support channels for scanning crops, pairing sensors and using offline AI." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Help,
});

const channels = [
  { icon: MessageCircle, title: "Chat with support", hint: "Replies within 10 minutes, 6am–9pm" },
  { icon: Phone, title: "Call a agronomist", hint: "Free voice advisory in Bengali & Hindi" },
  { icon: PlayCircle, title: "Video walkthroughs", hint: "8 short guides, downloadable offline" },
];

function Help() {
  return (
    <AppShell title="Help Center" subtitle="Answers, guides and human support">
      <section className="surface p-6">
        <Eyebrow>Getting started</Eyebrow>
        <h2 className="mt-1 font-display text-2xl font-bold">Scan your first leaf in 30 seconds</h2>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Hold the phone 15cm above a single leaf in daylight, keep it inside the frame, and tap capture. The offline
          model returns a diagnosis and treatment plan instantly.
        </p>
        <Link to="/scan" className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground">
          <BookOpen className="size-4.5" /> Open scanner
        </Link>
      </section>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {channels.map((c) => (
          <article key={c.title} className="surface p-5">
            <span className="grid size-10 place-items-center rounded-xl bg-primary-soft text-primary">
              <c.icon className="size-5" />
            </span>
            <h3 className="mt-3 font-semibold">{c.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{c.hint}</p>
          </article>
        ))}
      </div>

      <section className="mt-6">
        <SectionTitle title="Frequently asked" />
        <div className="surface divide-y divide-border">
          {faqs.map((f) => (
            <details key={f.q} className="group p-4">
              <summary className="cursor-pointer list-none font-semibold">{f.q}</summary>
              <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
