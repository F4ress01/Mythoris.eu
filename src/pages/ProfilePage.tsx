import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import Toast from "../components/Toast";
import { useSite } from "../context/SiteProvider";

interface PlayerProfile {
  uuid: string;
  name: string;
  level: number | null;
  class: string | null;
  rank: string | null;
  guild: { name: string; tag: string } | null;
  playtimeMinutes: number;
  online: boolean;
  profiles: { name: string; class: string; level: number; active: boolean }[];
}

const API = (import.meta.env.VITE_PROFILE_API as string | undefined) ?? "";

const TEXT = {
  pl: { kicker: "PROFIL GRACZA", loading: "Ładowanie…", missing: "Nie znaleziono gracza (musi choć raz wejść na serwer).", error: "Nie udało się pobrać profilu. Spróbuj później.", unconfigured: "Profile graczy nie są jeszcze skonfigurowane.", level: "Poziom", cls: "Klasa", rank: "Ranga", guild: "Gildia", playtime: "Czas gry", status: "Status", characters: "Postacie", online: "online", offline: "offline" },
  en: { kicker: "PLAYER PROFILE", loading: "Loading…", missing: "Player not found (they must have joined the server at least once).", error: "Could not load the profile. Try again later.", unconfigured: "Player profiles are not configured yet.", level: "Level", cls: "Class", rank: "Rank", guild: "Guild", playtime: "Playtime", status: "Status", characters: "Characters", online: "online", offline: "offline" },
};

export default function ProfilePage() {
  const { locale } = useSite();
  const tx = TEXT[locale];
  const { nick = "" } = useParams();
  const [data, setData] = useState<PlayerProfile | null>(null);
  const [state, setState] = useState<"loading" | "ok" | "missing" | "error">(API ? "loading" : "error");

  useEffect(() => {
    if (!API) return;
    let cancelled = false;
    setState("loading");
    fetch(`${API.replace(/\/$/, "")}/api/profile/${encodeURIComponent(nick)}`)
      .then(async (r) => {
        if (r.status === 404 || r.status === 400) return cancelled || setState("missing");
        if (!r.ok) throw new Error(String(r.status));
        const json = (await r.json()) as PlayerProfile;
        if (!cancelled) {
          setData(json);
          setState("ok");
        }
      })
      .catch(() => !cancelled && setState("error"));
    return () => {
      cancelled = true;
    };
  }, [nick]);

  const stat = (label: string, value: string) => (
    <div className="profile-stat">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );

  return (
    <>
      <Nav />
      <main>
        <section style={{ paddingTop: 64 }}>
          <div className="wrap" style={{ maxWidth: 820 }}>
            <p className="kicker">{tx.kicker}</p>
            {state === "ok" && data ? (
              <>
                <div className="profile-head">
                  <img src={`https://mc-heads.net/avatar/${data.uuid}/96`} alt="" width={96} height={96} />
                  <div>
                    <h2>
                      {data.name}
                      {data.guild ? ` [${data.guild.tag}]` : ""}
                    </h2>
                    <p className="lede">{data.online ? `🟢 ${tx.online}` : `⚫ ${tx.offline}`}</p>
                  </div>
                </div>
                <div className="profile-grid">
                  {stat(tx.level, data.level?.toString() ?? "—")}
                  {stat(tx.cls, data.class ?? "—")}
                  {stat(tx.rank, data.rank ?? "—")}
                  {stat(tx.guild, data.guild?.name ?? "—")}
                  {stat(tx.playtime, `${Math.floor(data.playtimeMinutes / 60)} h`)}
                </div>
                <h3 style={{ marginTop: 32 }}>{tx.characters}</h3>
                <ul className="profile-chars">
                  {data.profiles.map((p) => (
                    <li key={p.name} className={p.active ? "active" : ""}>
                      <strong>{p.name}</strong> — {p.class} (lvl {p.level})
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <h2>{nick}</h2>
                <p className="lede">
                  {state === "loading" ? tx.loading : state === "missing" ? tx.missing : API ? tx.error : tx.unconfigured}
                </p>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <Toast />
    </>
  );
}
