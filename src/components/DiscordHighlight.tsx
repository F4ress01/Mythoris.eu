import Reveal from "./Reveal";
import { DISCORD_URL } from "../content";
import { useSite } from "../context/SiteProvider";

export default function DiscordHighlight() {
  const { t } = useSite();

  return (
    <section id="discord" className="discord-highlight">
      <Reveal className="wrap discord-highlight-inner">
        <div>
          <p className="kicker">{t.discordSection.kicker}</p>
          <h2>{t.discordSection.title}</h2>
          <p className="lede">{t.discordSection.lede}</p>
          <div className="hero-actions" style={{ marginTop: 30 }}>
            <a
              className="btn btn-primary discord-btn"
              href={DISCORD_URL}
              target="_blank"
              rel="noopener"
            >
              {t.discordSection.btnJoin}
            </a>
          </div>
        </div>
        <div className="discord-mark-panel">
          <svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="30" y="30" width="140" height="90" fill="#5865F2" />
            <rect x="30" y="30" width="140" height="14" fill="#7983F5" />
            <rect x="46" y="70" width="18" height="18" fill="#1a1d3a" />
            <rect x="90" y="70" width="18" height="18" fill="#1a1d3a" />
            <rect x="134" y="70" width="18" height="18" fill="#1a1d3a" />
            <rect x="60" y="120" width="16" height="16" fill="#5865F2" />
            <rect x="124" y="120" width="16" height="16" fill="#5865F2" />
            <g fill="#EDEDE3" opacity="0.5">
              <rect x="20" y="20" width="4" height="4" />
              <rect x="176" y="24" width="4" height="4" />
              <rect x="18" y="130" width="4" height="4" />
              <rect x="180" y="120" width="4" height="4" />
            </g>
          </svg>
        </div>
      </Reveal>
    </section>
  );
}
