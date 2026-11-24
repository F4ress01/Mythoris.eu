import { useState } from "react";
import { Link } from "react-router-dom";
import ApiState from "../components/ApiState";
import Page from "../components/Page";
import ProfileSearch from "../components/ProfileSearch";
import { useSite } from "../context/SiteProvider";
import { API_BASE } from "../lib/api";
import { useApi } from "../lib/useApi";

interface Row {
  name: string;
  uuid: string;
  level: number | null;
  class: string | null;
  rank: string | null;
  guild: { name: string; tag: string } | null;
  playtimeMinutes: number;
}

export default function RankingPage() {
  const { ui } = useSite();
  const r = ui.ranking;
  const [sort, setSort] = useState<"level" | "playtime">("level");
  const { data, state, reload } = useApi<{ players: Row[] }>(API_BASE ? `/api/leaderboard?sort=${sort}&limit=50` : null);

  return (
    <Page title={r.title} description={r.seoDesc} path="/ranking" wide>
      <p className="kicker">{r.kicker}</p>
      <h2>{r.title}</h2>
      <p className="lede">{r.intro}</p>
      <div className="toolbar">
        <div className="seg" role="group" aria-label={r.kicker}>
          <button type="button" aria-pressed={sort === "level"} className={sort === "level" ? "active" : ""} onClick={() => setSort("level")}>{r.sortLevel}</button>
          <button type="button" aria-pressed={sort === "playtime"} className={sort === "playtime" ? "active" : ""} onClick={() => setSort("playtime")}>{r.sortPlaytime}</button>
        </div>
        <ProfileSearch />
      </div>
      {state === "ok" && data ? (
        data.players.length === 0 ? (
          <p className="lede">{r.empty}</p>
        ) : (
          <div className="table-wrap">
            <table className="rank-table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">{r.player}</th>
                  <th scope="col">{r.level}</th>
                  <th scope="col">{r.cls}</th>
                  <th scope="col">{r.guild}</th>
                  <th scope="col">{r.playtime}</th>
                </tr>
              </thead>
              <tbody>
                {data.players.map((p, i) => (
                  <tr key={p.uuid}>
                    <td>{i + 1}</td>
                    <td>
                      <Link to={`/profil/${encodeURIComponent(p.name)}`} className="rank-player">
                        <img src={`https://mc-heads.net/avatar/${p.uuid}/24`} alt="" width={24} height={24} loading="lazy" />
                        {p.name}
                      </Link>
                    </td>
                    <td>{p.level ?? "—"}</td>
                    <td>{p.class ?? "—"}</td>
                    <td>{p.guild ? `[${p.guild.tag}] ${p.guild.name}` : "—"}</td>
                    <td>{Math.floor(p.playtimeMinutes / 60)} {ui.profile.hours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      ) : (
        <ApiState state={state} onRetry={reload} />
      )}
    </Page>
  );
}
