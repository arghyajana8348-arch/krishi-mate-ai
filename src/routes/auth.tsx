import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Loader2, Mail, ShieldCheck, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

import { useAuth } from "@/hooks/use-auth";
import { lovable } from "@/integrations/lovable/index";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Farmer Sign Up & Login — KrishiMitra AI" },
      {
        name: "description",
        content: "Create your KrishiMitra AI farmer account to register your farm and pair your ESP32 sensor kit.",
      },
      { property: "og:title", content: "Farmer Sign Up & Login — KrishiMitra AI" },
      { property: "og:description", content: "Sign up or sign in to the KrishiMitra AI farmer portal." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const [mode, setMode] = useState<"signup" | "signin">("signup");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const { session, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && session) void navigate({ to: "/onboarding" });
  }, [loading, session, navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setNotice(null);
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/onboarding`,
            data: { full_name: fullName },
          },
        });
        if (signUpError) throw signUpError;
        setNotice("Account created. If email confirmation is on, check your inbox to finish.");
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) throw signInError;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function google() {
    setError(null);
    setBusy(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setError("Google sign-in failed. Please try again.");
      setBusy(false);
      return;
    }
    if (result.redirected) return;
    void navigate({ to: "/onboarding" });
  }

  return (
    <main className="grid min-h-screen place-items-center bg-background px-5 py-10">
      <div className="rise-in w-full max-w-sm">
        <span className="canopy grid size-14 place-items-center rounded-2xl shadow-[var(--shadow-soft)]">
          <Sparkles className="size-6" />
        </span>
        <h1 className="mt-6 font-display text-3xl font-bold">
          {mode === "signup" ? "Create your farmer account" : "Welcome back"}
        </h1>
        <p className="text-accent-serif mt-1 text-lg text-muted-foreground">
          {mode === "signup"
            ? "Register your farm, pair your ESP32 kit and get daily advisory."
            : "Sign in to reach your farm dashboard."}
        </p>

        <form onSubmit={submit} className="mt-8 space-y-3">
          {mode === "signup" && (
            <Field label="Full name">
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                placeholder="Arghya Jana"
                className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none focus:border-primary"
              />
            </Field>
          )}
          <Field label="Email">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@farm.in"
              className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </Field>
          <Field label="Password">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              placeholder="At least 6 characters"
              className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </Field>

          {error && <p className="text-sm font-medium text-destructive">{error}</p>}
          {notice && <p className="text-sm font-medium text-primary">{notice}</p>}

          <button
            type="submit"
            disabled={busy}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
          >
            {busy ? <Loader2 className="size-4 animate-spin" /> : <Mail className="size-4" />}
            {mode === "signup" ? "Create account" : "Sign in"}
            <ArrowRight className="size-4" />
          </button>
        </form>

        <div className="my-4 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
        </div>

        <button
          onClick={google}
          disabled={busy}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-input bg-card px-4 py-3 text-sm font-semibold transition-colors hover:bg-accent disabled:opacity-60"
        >
          Continue with Google
        </button>

        <p className="mt-5 text-center text-sm text-muted-foreground">
          {mode === "signup" ? "Already registered?" : "New to KrishiMitra?"}{" "}
          <button
            onClick={() => {
              setMode(mode === "signup" ? "signin" : "signup");
              setError(null);
              setNotice(null);
            }}
            className="font-semibold text-primary"
          >
            {mode === "signup" ? "Sign in" : "Create an account"}
          </button>
        </p>

        <p className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="size-3.5 text-primary" /> Your farm data stays private to your account.
        </p>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          <Link to="/" className="font-semibold text-primary">
            Back to dashboard
          </Link>
        </p>
      </div>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold tracking-wide text-muted-foreground uppercase">{label}</span>
      {children}
    </label>
  );
}
