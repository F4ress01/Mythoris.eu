import Reveal from "./Reveal";
import { SERVER_IP } from "../content";
import { useSite } from "../context/SiteProvider";
import { useServerStatus } from "../hooks/useServerStatus";

export default function Community() {
  const { t, copyIp } = useSite();
  const status = useServerStatus(SERVER_IP);

  const isOnline = status?.online === true;
  const playersLabel =
    isOnline && status?.players
      ? `${status.players.online} / ${status.players.max}`
      : t.community.miniPlaceholder;
  const onlineLabel = isOnline ? t.community.miniOnlineYes : t.community.miniPlaceholder;

  return (
    <section id="spolecznosc" className="community">
      <Reveal className="wrap community-inner">
        <div>
          <p className="kicker">{t.community.kicker}</p>
          <h2>{t.community.title}</h2>
          <p className="lede">{t.community.lede}</p>
          <div className="hero-actions" style={{ marginTop: 30 }}>
            <button className="btn btn-primary" type="button" onClick={copyIp}>
              {t.community.btnCopyIp}
            </button>
          </div>
          <div className="mini-stats">
            <div>
              <b>{playersLabel}</b>
              <span>{t.community.miniPlayers}</span>
            </div>
            <div>
              <b>{t.community.miniPlaceholder}</b>
              <span>{t.community.miniGuilds}</span>
            </div>
            <div>
              <b>{onlineLabel}</b>
              <span>{t.community.miniOnline}</span>
            </div>
          </div>
        </div>
        <div className="community-art">
          <svg viewBox="0 0 380 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="40" y="230" width="300" height="36" fill="#3E2712" />
            <rect x="40" y="230" width="300" height="10" fill="#1B5E20" />
            <rect x="70" y="150" width="16" height="80" fill="#3E2712" />
            <rect x="294" y="150" width="16" height="80" fill="#3E2712" />
            <rect x="70" y="130" width="16" height="20" fill="#3E2712" />
            <rect x="294" y="130" width="16" height="20" fill="#3E2712" />
            <rect x="70" y="150" width="240" height="8" fill="#1F1206" />
            <g fill="#8FE21A" opacity="0.85">
              <rect x="176" y="70" width="8" height="8" />
              <rect x="196" y="70" width="8" height="8" />
              <rect x="168" y="86" width="8" height="8" />
              <rect x="204" y="86" width="8" height="8" />
              <rect x="186" y="102" width="8" height="8" />
            </g>
            <g fill="#EDEDE3" opacity="0.55">
              <rect x="40" y="30" width="4" height="4" />
              <rect x="330" y="50" width="4" height="4" />
              <rect x="300" y="20" width="4" height="4" />
              <rect x="60" y="90" width="4" height="4" />
            </g>
          </svg>
        </div>
      </Reveal>
    </section>
  );
}
