import { useCallback, useEffect, useRef, useState } from "react";
import { api, ApiError } from "./api";

export type LoadState = "loading" | "waking" | "ok" | "notfound" | "ratelimited" | "forbidden" | "unconfigured" | "error";

const MAX_WAKE_TRIES = 8;
const WAKE_DELAY = 5000;

/**
 * GET z automatycznym ponawianiem, gdy bot "spi" (darmowy hosting budzi sie ~30-60 s): brak odpowiedzi lub 502/503/504
 * => stan "waking" i ponowna proba co 5 s. `reload()` odswieza dane po zapisie.
 */
export function useApi<T>(path: string | null) {
  const [data, setData] = useState<T | null>(null);
  const [state, setState] = useState<LoadState>(path ? "loading" : "unconfigured");
  const [nonce, setNonce] = useState(0);
  const tries = useRef(0);

  useEffect(() => {
    if (!path) {
      setState("unconfigured");
      return;
    }
    const ctrl = new AbortController();
    let timer: number | undefined;
    tries.current = 0;
    setState("loading");

    const run = () => {
      api<T>(path, { signal: ctrl.signal })
        .then((d) => {
          setData(d);
          setState("ok");
        })
        .catch((e: unknown) => {
          if ((e as Error).name === "AbortError") return;
          const err = e as ApiError;
          if (err.status === 404 || err.status === 400) setState("notfound");
          else if (err.status === 429) setState("ratelimited");
          else if (err.status === 401 || err.status === 403) setState("forbidden");
          else if (err.code === "unconfigured") setState("unconfigured");
          else if ((err.status === 0 || err.status >= 502) && tries.current < MAX_WAKE_TRIES) {
            tries.current += 1;
            setState("waking");
            timer = window.setTimeout(run, WAKE_DELAY);
          } else setState("error");
        });
    };
    run();
    return () => {
      ctrl.abort();
      if (timer) window.clearTimeout(timer);
    };
  }, [path, nonce]);

  const reload = useCallback(() => setNonce((n) => n + 1), []);
  return { data, state, reload };
}
