import { Link } from "react-router-dom";
import { MC_VERSION } from "../content";
import { useSite } from "../context/SiteProvider";

export default function Footer() {
  const { t } = useSite();

  return (
    <footer>
      <div className="wrap">
        <div className="footer-row">
          <div className="footer-brand">
            <img src="/assets/mythoris-icon.png" alt="Mythoris" />
            <div>
              <span>MYTHORIS</span>
              <div className="footer-ip">MYTHORIS.EU · MINECRAFT {MC_VERSION}</div>
            </div>
          </div>
          <ul className="footer-links">
            <li>
              <a href="#rozgrywka">{t.nav.gameplay.toUpperCase()}</a>
            </li>
            <li>
              <a href="#discord">{t.nav.discord.toUpperCase()}</a>
            </li>
            <li>
              <Link to="/rules">{t.footer.rules}</Link>
            </li>
          </ul>
        </div>
        <div className="copyright">{t.footer.copyright}</div>
      </div>
    </footer>
  );
}
