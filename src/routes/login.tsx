import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Phone, ShieldCheck, Sparkles } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — KrishiMitra AI" },
      { name: "description", content: "Sign in to KrishiMitra AI with your phone number and OTP." },
      { property: "og:title", content: "Sign in — KrishiMitra AI" },
      { property: "og:description", content: "Phone and OTP sign in for KrishiMitra AI." },
    ],
  }),
  component: Login,
});

function Login() {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const navigate = useNavigate();

  return (
    <main className="grid min-h-screen place-items-center bg-background px-5 py-10">
      <div className="rise-in w-full max-w-sm">
        <span className="canopy grid size-14 place-items-center rounded-2xl shadow-[var(--shadow-soft)]">
          <Sparkles className="size-6" />
        </span>
        <h1 className="mt-6 font-display text-3xl font-bold">
          {step === "phone" ? "Welcome back" : "Verify your number"}
        </h1>
        <p className="text-accent-serif mt-1 text-lg text-muted-foreground">
          {step === "phone"
            ? "Sign in with your phone number to reach your farm."
            : `A 4-digit code was sent to +91 ${phone || "•••••"}`}
        </p>

        {step === "phone" ? (
          <div className="mt-8 space-y-4">
            <label className="block">
              <span className="eyebrow">Phone number</span>
              <div className="mt-2 flex items-center gap-2 rounded-2xl border border-input bg-card px-4 py-3 focus-within:border-primary">
                <Phone className="size-4 shrink-0 text-muted-foreground" />
                <span className="text-sm font-semibold text-muted-foreground">+91</span>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  inputMode="numeric"
                  placeholder="98300 44120"
                  className="w-full bg-transparent text-sm outline-none"
                />
              </div>
            </label>
            <button
              onClick={() => setStep("otp")}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Send OTP <ArrowRight className="size-4" />
            </button>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            <div className="flex gap-3">
              {otp.map((v, i) => (
                <input
                  key={i}
                  value={v}
                  onChange={(e) => {
                    const next = [...otp];
                    next[i] = e.target.value.replace(/\D/g, "").slice(-1);
                    setOtp(next);
                  }}
                  inputMode="numeric"
                  className="h-14 w-full rounded-2xl border border-input bg-card text-center font-display text-2xl font-bold outline-none focus:border-primary"
                />
              ))}
            </div>
            <button
              onClick={() => navigate({ to: "/" })}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Continue <ArrowRight className="size-4" />
            </button>
            <button
              onClick={() => setStep("phone")}
              className="w-full text-center text-sm font-semibold text-muted-foreground"
            >
              Change number
            </button>
          </div>
        )}

        <p className="mt-8 flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="size-4 shrink-0 text-primary" />
          Your farm data stays on-device until you sync.
        </p>
        <Link to="/" className="mt-4 block text-center text-sm font-semibold text-primary">
          Skip for now
        </Link>
      </div>
    </main>
  );
}
