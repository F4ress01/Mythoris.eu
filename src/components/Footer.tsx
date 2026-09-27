import { Link, useLocation, useNavigate } from "react-router-dom";
import { MC_VERSION } from "../content";
import { useSite } from "../context/SiteProvider";
import { goToSection } from "../utils/sectionLink";

export default function Footer() {
  const { t } = useSite();
  const { pathname } = useLocation();
  const navigate = useNavigate();

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
              <a href="#rozgrywka" onClick={(e) => goToSection(e, "rozgrywka", pathname, navigate)}>
                {t.nav.gameplay.toUpperCase()}
              </a>
            </li>
            <li>
              <a href="#discord" onClick={(e) => goToSection(e, "discord", pathname, navigate)}>
                {t.nav.discord.toUpperCase()}
              </a>
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
