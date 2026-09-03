import { useCallback, useEffect, useRef, useState } from "react";

import { trend } from "./farm-data";

export type Reading = {
  /** Unique, sortable key for the reading (ISO-like slot id or weekday label). */
  t: string;
  temp: number;
  humidity: number;
  moisture: number;
  health: number;
};

const CACHE_KEY = "km-sensor-history-v1";
const POLL_MS = 30_000;

function readCache(): Reading[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Reading[]) : null;
  } catch {
    return null;
  }
}

function writeCache(readings: Reading[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(readings));
  } catch {
    /* storage full or blocked — cache is best-effort */
  }
}

/** Merge incoming readings into the existing series, de-duplicating by slot key. */
export function mergeReadings(current: Reading[], incoming: Reading[]): Reading[] {
  const byKey = new Map(current.map((r) => [r.t, r]));
  for (const r of incoming) byKey.set(r.t, { ...byKey.get(r.t), ...r });
  return Array.from(byKey.values()).slice(-24);
}

/**
 * Stands in for the device gateway drain. While offline the ESP32 buffers
 * readings locally; on reconnect we pull whatever accumulated since the last
 * slot we already hold.
 */
async function fetchReadingsSince(last: Reading | undefined): Promise<Reading[]> {
  if (typeof navigator !== "undefined" && !navigator.onLine) {
    throw new Error("offline");
  }
  const base = last ?? trend[trend.length - 1]!;
  const slot = new Date();
  slot.setSeconds(0, 0);
  const label = slot.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const jitter = (spread: number) => Math.round((Math.random() - 0.5) * spread);

  return [
    {
      t: label,
      temp: clamp(base.temp + jitter(2), 18, 46),
      humidity: clamp(base.humidity + jitter(6), 20, 99),
      moisture: clamp(base.moisture + jitter(5), 5, 95),
      health: clamp(base.health + jitter(3), 40, 100),
    },
  ];
}

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

export type SyncState = "idle" | "syncing" | "offline" | "error";

/**
 * Sensor history with background sync: readings pulled while the tab regains
 * connectivity (or on the poll tick) are merged into the cached series in
 * place, so the chart updates without a manual refresh.
 */
export function useSensorHistory() {
  const [readings, setReadings] = useState<Reading[]>(trend as Reading[]);
  const [status, setStatus] = useState<SyncState>("idle");
  const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(null);
  const inFlight = useRef(false);

  const sync = useCallback(async () => {
    if (inFlight.current) return;
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      setStatus("offline");
      return;
    }
    inFlight.current = true;
    setStatus("syncing");
    try {
      let merged: Reading[] = [];
      setReadings((current) => {
        merged = current;
        return current;
      });
      const incoming = await fetchReadingsSince(merged[merged.length - 1]);
      setReadings((current) => {
        const next = mergeReadings(current, incoming);
        writeCache(next);
        return next;
      });
      setLastSyncedAt(new Date());
      setStatus("idle");
    } catch {
      setStatus(typeof navigator !== "undefined" && !navigator.onLine ? "offline" : "error");
    } finally {
      inFlight.current = false;
    }
  }, []);

  // Hydrate from the offline cache after mount (avoids SSR mismatch).
  useEffect(() => {
    const cached = readCache();
    if (cached?.length) setReadings((current) => mergeReadings(current, cached));
    void sync();
  }, [sync]);

  // Background sync triggers: reconnect, tab focus, and a slow poll.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onOnline = () => void sync();
    const onOffline = () => setStatus("offline");
    const onVisible = () => {
      if (document.visibilityState === "visible") void sync();
    };
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    document.addEventListener("visibilitychange", onVisible);
    const id = window.setInterval(() => void sync(), POLL_MS);
    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
      document.removeEventListener("visibilitychange", onVisible);
      window.clearInterval(id);
    };
  }, [sync]);

  return { readings, status, lastSyncedAt, sync };
}
