import { useId } from "react";

export interface ChartPoint {
  label: string;
  value: number;
}

const W = 640;
const H = 240;
const PAD = { l: 52, r: 16, t: 16, b: 32 };

function niceMax(v: number): number {
  if (v <= 0) return 1;
  const pow = 10 ** Math.floor(Math.log10(v));
  const n = v / pow;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * pow;
}

/** Prosty wykres liniowy w SVG (bez bibliotek): os Y od zera, pierwsza i ostatnia etykieta osi X, opis dla czytnikow ekranu. */
export default function LineChart({ points, ariaLabel, format = (n: number) => String(n) }: { points: ChartPoint[]; ariaLabel: string; format?: (n: number) => string }) {
  const id = useId();
  if (points.length === 0) return null;

  const max = niceMax(Math.max(...points.map((p) => p.value)));
  const innerW = W - PAD.l - PAD.r;
  const innerH = H - PAD.t - PAD.b;
  const x = (i: number) => PAD.l + (points.length === 1 ? innerW / 2 : (i / (points.length - 1)) * innerW);
  const y = (v: number) => PAD.t + innerH - (v / max) * innerH;
  const line = points.map((p, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(" ");
  const area = `${line} L${x(points.length - 1).toFixed(1)},${PAD.t + innerH} L${x(0).toFixed(1)},${PAD.t + innerH} Z`;
  const ticks = [0, 0.5, 1].map((f) => f * max);
  const last = points[points.length - 1];

  return (
    <svg className="chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby={`${id}-t`} preserveAspectRatio="xMidYMid meet">
      <title id={`${id}-t`}>{`${ariaLabel} (${points[0].label}: ${format(points[0].value)} → ${last.label}: ${format(last.value)})`}</title>
      {ticks.map((t) => (
        <g key={t}>
          <line className="chart-grid" x1={PAD.l} x2={W - PAD.r} y1={y(t)} y2={y(t)} />
          <text className="chart-axis" x={PAD.l - 8} y={y(t) + 4} textAnchor="end">{format(t)}</text>
        </g>
      ))}
      {points.length > 1 && <path className="chart-area" d={area} />}
      <path className="chart-line" d={line} />
      {points.length <= 45 && points.map((p, i) => <circle key={p.label} className="chart-dot" cx={x(i)} cy={y(p.value)} r={3}><title>{`${p.label}: ${format(p.value)}`}</title></circle>)}
      <text className="chart-axis" x={PAD.l} y={H - 8} textAnchor="start">{points[0].label}</text>
      {points.length > 1 && <text className="chart-axis" x={W - PAD.r} y={H - 8} textAnchor="end">{last.label}</text>}
    </svg>
  );
}
