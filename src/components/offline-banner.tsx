import { CloudOff } from "lucide-react";
import { useEffect, useState } from "react";

export function OfflineBanner() {
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    const sync = () => setOffline(!navigator.onLine);
    sync();
    window.addEventListener("online", sync);
    window.addEventListener("offline", sync);
    return () => {
      window.removeEventListener("online", sync);
      window.removeEventListener("offline", sync);
    };
  }, []);

  if (!offline) return null;

  return (
    <div className="fixed inset-x-0 top-0 z-100 flex items-center justify-center gap-2 bg-foreground/90 px-4 py-2 text-xs font-semibold text-background backdrop-blur">
      <CloudOff className="size-4" />
      Offline mode — showing your saved scans, sensor history and advisory
    </div>
  );
}
