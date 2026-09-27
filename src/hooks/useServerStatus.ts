import { useEffect, useState } from "react";

interface ServerStatus {
  online: boolean;
  players?: { online: number; max: number };
}

export function useServerStatus(host: string) {
  const [status, setStatus] = useState<ServerStatus | null>(null);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 6000);

    fetch(`https://api.mcstatus.io/v2/status/java/${host}`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error("bad response");
        return res.json();
      })
      .then((data: { online?: boolean; players?: { online: number; max: number } }) => {
        if (cancelled) return;
        setStatus({
          online: Boolean(data?.online),
          players: data?.online && data?.players ? data.players : undefined,
        });
      })
      .catch(() => {
        // Offline, unreachable, blocked, or the lookup errored — caller falls back to a placeholder.
        if (!cancelled) setStatus(null);
      })
      .finally(() => {
        window.clearTimeout(timeoutId);
      });

    return () => {
      cancelled = true;
      controller.abort();
      window.clearTimeout(timeoutId);
    };
  }, [host]);

  return status;
}
