import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("eyebrow", className)}>{children}</p>;
}

export function SectionTitle({
  title,
  action,
  className,
}: {
  title: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-3 flex items-center justify-between gap-3", className)}>
      <h2 className="text-lg font-bold tracking-tight sm:text-xl">{title}</h2>
      {action}
    </div>
  );
}

const toneMap = {
  primary: "bg-primary-soft text-primary",
  info: "bg-info/10 text-info",
  warning: "bg-warning/15 text-warning-foreground",
  critical: "bg-destructive/10 text-destructive",
  muted: "bg-muted text-muted-foreground",
} as const;

export type Tone = keyof typeof toneMap;

export function Pill({
  children,
  tone = "primary",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide uppercase",
        toneMap[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function StatTile({
  icon,
  label,
  value,
  unit,
  hint,
  tone = "primary",
  className,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  unit?: string;
  hint?: string;
  tone?: Tone;
  className?: string;
}) {
  return (
    <div className={cn("surface p-4 transition-shadow hover:shadow-[var(--shadow-lift)]", className)}>
      <div className="flex items-center gap-2">
        <span className={cn("grid size-9 shrink-0 place-items-center rounded-xl", toneMap[tone])}>{icon}</span>
        <span className="min-w-0 truncate text-xs font-semibold text-muted-foreground">{label}</span>
      </div>
      <p className="mt-3 font-display text-3xl leading-none font-bold">
        {value}
        {unit ? <span className="ml-1 text-base font-normal text-muted-foreground">{unit}</span> : null}
      </p>
      {hint ? <p className="mt-1.5 text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

export function HealthRing({
  score,
  size = 168,
  label = "Farm Health Score",
  variant = "light",
}: {
  score: number;
  size?: number;
  label?: string;
  variant?: "light" | "dark";
}) {
  const stroke = size / 11;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const tone =
    score >= 80 ? "var(--color-leaf)" : score >= 55 ? "var(--color-warning)" : "var(--color-destructive)";
  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          stroke={variant === "dark" ? "oklch(1 0 0 / 0.18)" : "var(--color-muted)"}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          stroke={tone}
          strokeDasharray={c}
          strokeDashoffset={c - (c * score) / 100}
          style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(.22,1,.36,1)" }}
        />
      </svg>
      <div className="absolute text-center">
        <p className="font-display text-4xl leading-none font-bold" style={{ fontSize: size / 4 }}>
          {score}
        </p>
        <p
          className={cn(
            "text-accent-serif mt-1 text-sm",
            variant === "dark" ? "opacity-80" : "text-muted-foreground",
          )}
        >
          {label}
        </p>
      </div>
    </div>
  );
}

export function CheckLine({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 text-sm">
      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-primary-soft text-primary">
        <svg viewBox="0 0 20 20" fill="currentColor" className="size-3.5">
          <path
            fillRule="evenodd"
            d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.8 3.8 6.8-6.8a1 1 0 0 1 1.4 0Z"
            clipRule="evenodd"
          />
        </svg>
      </span>
      <span>{children}</span>
    </li>
  );
}
