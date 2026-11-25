import { useSite } from "../context/SiteProvider";
import type { LoadState } from "../lib/useApi";

/** Komunikat dla stanu ladowania/bledu zapytania API; zwraca null, gdy dane sa gotowe (state === "ok"). */
export default function ApiState({ state, onRetry, notFoundText }: { state: LoadState; onRetry?: () => void; notFoundText?: string }) {
  const { ui } = useSite();
  if (state === "ok") return null;
  if (state === "loading")
    return (
      <div className="skeleton-list" role="status" aria-live="polite" aria-label={ui.common.loading}>
        <div className="skeleton" />
        <div className="skeleton" />
        <div className="skeleton short" />
      </div>
    );
  const text =
    state === "waking" ? ui.common.waking
    : state === "notfound" ? notFoundText ?? ui.common.notFound
    : state === "ratelimited" ? ui.common.rateLimited
    : state === "forbidden" ? ui.common.forbidden
    : state === "unconfigured" ? ui.common.unconfigured
    : ui.common.error;
  return (
    <div className="api-state" role={state === "waking" ? "status" : "alert"}>
      <p>{state === "waking" ? "⏳ " : ""}{text}</p>
      {onRetry && state !== "waking" && state !== "unconfigured" && state !== "notfound" && (
        <button type="button" className="btn btn-ghost" onClick={onRetry}>{ui.common.retry}</button>
      )}
    </div>
  );
}
