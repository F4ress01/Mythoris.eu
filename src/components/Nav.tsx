import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSite } from "../context/SiteProvider";
import { goToSection } from "../utils/sectionLink";

const SECTION_IDS = ["rozgrywka", "discord", "spolecznosc"];

function useActiveSection(ids: string[]) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          const topMost = visible.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b
          );
          setActiveId(topMost.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}

export default function Nav() {
  const { t, locale, setLocale, copyIp, mobileOpen, toggleMobile, closeMobile } = useSite();
  const activeId = useActiveSection(SECTION_IDS);
  const navRef = useRef<HTMLElement | null>(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!mobileOpen) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeMobile();
    }
    function onClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        closeMobile();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [mobileOpen, closeMobile]);

  const linkClass = (id: string) => (activeId === id ? "active" : undefined);

  return (
    <header className="nav" ref={navRef}>
      <div className="wrap nav-row">
        <a className="brand" href="#top" onClick={(e) => goToSection(e, "top", pathname, navigate)}>
          <img src="/assets/mythoris-icon.png" alt="Mythoris" />
          <span>MYTHORIS</span>
        </a>
        <ul className="nav-links">
          <li>
            <a
              href="#rozgrywka"
              className={linkClass("rozgrywka")}
              onClick={(e) => goToSection(e, "rozgrywka", pathname, navigate)}
            >
              {t.nav.gameplay}
            </a>
          </li>
          <li>
            <a
              href="#discord"
              className={linkClass("discord")}
              onClick={(e) => goToSection(e, "discord", pathname, navigate)}
            >
              {t.nav.discord}
            </a>
          </li>
          <li>
            <a
              href="#spolecznosc"
              className={linkClass("spolecznosc")}
              onClick={(e) => goToSection(e, "spolecznosc", pathname, navigate)}
            >
              {t.nav.community}
            </a>
          </li>
        </ul>
        <div className="nav-cta">
          <div className="lang-switch" role="group" aria-label="Language / Język">
            <button
              type="button"
              className={locale === "pl" ? "active" : ""}
              onClick={() => setLocale("pl")}
            >
              PL
            </button>
            <button
              type="button"
              className={locale === "en" ? "active" : ""}
              onClick={() => setLocale("en")}
            >
              EN
            </button>
          </div>
          <button className="ip-chip" type="button" onClick={copyIp}>
            mythoris.eu ⧉
          </button>
          <button
            className="burger"
            aria-label="Menu"
            aria-expanded={mobileOpen}
            type="button"
            onClick={toggleMobile}
          >
            ☰
          </button>
        </div>
      </div>
      <div className={`mobile-nav-wrap wrap${mobileOpen ? " open" : ""}`} id="mobileNav">
        <ul>
          <li>
            <a
              href="#rozgrywka"
              onClick={(e) => {
                goToSection(e, "rozgrywka", pathname, navigate);
                closeMobile();
              }}
            >
              {t.nav.gameplay}
            </a>
          </li>
          <li>
            <a
              href="#discord"
              onClick={(e) => {
                goToSection(e, "discord", pathname, navigate);
                closeMobile();
              }}
            >
              {t.nav.discord}
            </a>
          </li>
          <li>
            <a
              href="#spolecznosc"
              onClick={(e) => {
                goToSection(e, "spolecznosc", pathname, navigate);
                closeMobile();
              }}
            >
              {t.nav.community}
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
