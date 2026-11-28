import { useState } from "react";
import ApiState from "./ApiState";
import LineChart from "./LineChart";
import { useSite } from "../context/SiteProvider";
import { API_BASE } from "../lib/api";
import { useApi } from "../lib/useApi";

interface HistoryPoint {
  date: string;
  level: number;
  playtimeMinutes: number;
  money: number;
  kills: number;
  deaths: number;
}

type Metric = "level" | "playtime" | "money" | "kills";
const RANGES = [7, 30, 90] as const;

/** Wykresy aktywnosci gracza z dziennych migawek zapisywanych przez plugin (GET /api/profile/:nick/history). */
export default function ProfileHistory({ nick }: { nick: string }) {
  const { ui } = useSite();
  const s = ui.stats;
  const [metric, setMetric] = useState<Metric>("level");
  const [range, setRange] = useState<(typeof RANGES)[number]>(30);
  const { data, state, reload } = useApi<{ points: HistoryPoint[] }>(!API_BASE ? null : `/api/profile/${encodeURIComponent(nick)}/history?days=${range}`);

  const labels: Record<Metric, string> = { level: s.chartLevel, playtime: s.chartPlaytime, money: s.chartMoney, kills: s.chartKills };
  const value = (p: HistoryPoint): number =>
    metric === "level" ? p.level : metric === "playtime" ? Math.round((p.playtimeMinutes / 60) * 10) / 10 : metric === "money" ? p.money : p.kills;
  const points = (data?.points ?? []).map((p) => ({ label: p.date.slice(5), value: value(p) }));
  const compact = (n: number) => (n >= 1_000_000 ? `${+(n / 1_000_000).toFixed(1)}M` : n >= 10_000 ? `${+(n / 1000).toFixed(1)}k` : String(Math.round(n * 10) / 10));

  return (
    <section aria-labelledby="profile-activity" style={{ marginTop: 32 }}>
      <h3 id="profile-activity">{s.activity}</h3>
      <div className="toolbar">
        <div className="seg" role="group" aria-label={s.activity}>
          {(Object.keys(labels) as Metric[]).map((m) => (
            <button key={m} type="button" aria-pressed={metric === m} className={metric === m ? "active" : ""} onClick={() => setMetric(m)}>{labels[m]}</button>
          ))}
        </div>
        <div className="seg" role="group" aria-label="range">
          {RANGES.map((r) => (
            <button key={r} type="button" aria-pressed={range === r} className={range === r ? "active" : ""} onClick={() => setRange(r)}>{r === 7 ? s.range7 : r === 30 ? s.range30 : s.range90}</button>
          ))}
        </div>
      </div>
      {state === "ok" ? (
        points.length === 0 ? (
          <p className="lede">{s.noHistory}</p>
        ) : (
          <LineChart points={points} ariaLabel={labels[metric]} format={compact} />
        )
      ) : (
        <ApiState state={state} onRetry={reload} />
      )}
    </section>
  );
}
