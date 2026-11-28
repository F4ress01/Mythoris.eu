import { Link, useParams } from "react-router-dom";
import { pick } from "../lib/localized";
import ApiState from "../components/ApiState";
import Page from "../components/Page";
import ProfileSearch from "../components/ProfileSearch";
import ProfileHistory from "../components/ProfileHistory";
import { useSite } from "../context/SiteProvider";
import type { MinecraftProfile } from "../context/AuthProvider";
import { API_BASE } from "../lib/api";
import { useApi } from "../lib/useApi";

export default function ProfilePage() {
  const { ui, locale } = useSite();
  const { nick = "" } = useParams();
  const { data, state, reload } = useApi<MinecraftProfile>(API_BASE ? `/api/profile/${encodeURIComponent(nick)}` : null);
  const p = ui.profile;
  const s = ui.stats;

  const stat = (label: string, value: string) => (
    <div className="profile-stat">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );

  return (
    <Page title={nick} description={p.seoDesc.replace("{name}", nick)} path={`/profil/${nick}`}>
      <p className="kicker">{p.kicker}</p>
      {state === "ok" && data ? (
        <>
          <div className="profile-head">
            <img src={`https://mc-heads.net/avatar/${data.uuid}/96`} alt="" width={96} height={96} />
            <div>
              <h2>
                {data.name}
                {data.guild ? ` [${data.guild.tag}]` : ""}
              </h2>
              <p className="lede">{data.online ? `🟢 ${p.online}` : `⚫ ${p.offline}`}</p>
            </div>
          </div>
          <div className="profile-grid">
            {stat(p.level, data.level?.toString() ?? "—")}
            {stat(p.cls, data.class ?? "—")}
            {stat(p.rank, data.rank ?? "—")}
            {stat(p.guild, data.guild?.name ?? "—")}
            {stat(p.playtime, `${Math.floor(data.playtimeMinutes / 60)} ${p.hours}`)}
          </div>
          {data.titles?.active && <p className="lede">{s.title}: <strong>{data.titles.active}</strong></p>}
          {data.achievements && (
            <section aria-labelledby="profile-ach" style={{ marginTop: 32 }}>
              <h3 id="profile-ach">{s.achievements}: {s.unlocked.replace("{n}", String(data.achievements.unlocked)).replace("{t}", String(data.achievements.total))}</h3>
              {data.achievements.recent.length > 0 && (
                <>
                  <p className="meta-line">{s.recent}</p>
                  <ul className="profile-chars">
                    {data.achievements.recent.map((a) => (
                      <li key={a.id}><strong>{pick(a.name, locale).text || a.id}</strong> — {new Date(a.date).toLocaleDateString(locale)}</li>
                    ))}
                  </ul>
                </>
              )}
            </section>
          )}
          {data.pets && data.pets.length > 0 && (
            <section aria-labelledby="profile-pets" style={{ marginTop: 32 }}>
              <h3 id="profile-pets">{s.pets}</h3>
              <ul className="profile-chars">
                {data.pets.map((pt) => (
                  <li key={pt.id} className={pt.active ? "active" : ""}>
                    <strong>{pick(pt.name, locale).text || pt.id}</strong> — {s.petLevel.replace("{n}", String(pt.level))}
                    {pt.rarity ? ` · ${(ui.market.rarities as Record<string, string>)[pt.rarity] ?? pt.rarity}` : ""}
                    {pt.active ? ` · ${s.activePet}` : ""}
                  </li>
                ))}
              </ul>
            </section>
          )}
          <h3 style={{ marginTop: 32 }}>{p.characters}</h3>
          <ul className="profile-chars">
            {data.profiles.map((c) => (
              <li key={c.name} className={c.active ? "active" : ""}>
                <strong>{c.name}</strong> — {c.class} (lvl {c.level})
              </li>
            ))}
          </ul>
          <ProfileHistory nick={data.name} />
        </>
      ) : (
        <>
          <h2>{nick}</h2>
          <ApiState state={state} onRetry={reload} notFoundText={p.missing} />
        </>
      )}
      <div style={{ marginTop: 40 }}>
        <ProfileSearch />
        <p style={{ marginTop: 16 }}>
          <Link to="/ranking">{ui.nav.ranking} →</Link>
        </p>
      </div>
    </Page>
  );
}
