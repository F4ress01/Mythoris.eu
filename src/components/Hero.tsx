import { MC_VERSION, SERVER_IP } from "../content";
import { useSite } from "../context/SiteProvider";

export default function Hero() {
  const { t, copyIp } = useSite();

  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div>
          <p className="eyebrow">{t.hero.eyebrow}</p>
          <img
            className="hero-logo"
            src="/assets/mythoris-logo.png"
            alt="Mythoris.eu — Minecraft MMORPG"
          />
          <p className="tagline">{t.hero.tagline}</p>

          <div className="join-box" role="group" aria-label="Adres serwera">
            <span className="label">{t.hero.joinLabel}</span>
            <span className="value">{SERVER_IP}</span>
            <button type="button" onClick={copyIp}>
              {t.hero.copy}
            </button>
          </div>

          <div className="hero-actions" style={{ marginTop: 26 }}>
            <a className="btn btn-primary" href="#discord">
              {t.hero.btnJoin}
            </a>
            <a className="btn btn-ghost" href="#rozgrywka">
              {t.hero.btnExplore}
            </a>
          </div>

          <div className="stat-row">
            <div className="stat">
              <b>{t.hero.statModeValue}</b>
              <span>{t.hero.statMode}</span>
            </div>
            <div className="stat">
              <b>{MC_VERSION}</b>
              <span>{t.hero.statVersion}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
