import Reveal from "./Reveal";
import { useSite } from "../context/SiteProvider";

export default function Gameplay() {
  const { t } = useSite();

  return (
    <>
      <hr className="divider" />
      <section id="rozgrywka">
        <Reveal className="wrap world">
          <div>
            <p className="kicker">{t.gameplay.kicker}</p>
            <h2>{t.gameplay.title}</h2>
            <p>{t.gameplay.p1}</p>
            <p>{t.gameplay.p2}</p>
          </div>
          <div className="world-art">
            <svg viewBox="0 0 400 380" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <g>
                <rect x="90" y="180" width="220" height="40" fill="#3E2712" />
                <rect x="90" y="180" width="220" height="14" fill="#1B5E20" />
                <rect x="120" y="220" width="160" height="26" fill="#2A1A0C" />
                <rect x="150" y="246" width="100" height="16" fill="#1F1206" />
                <rect x="130" y="150" width="16" height="30" fill="#3E2712" />
                <rect x="118" y="118" width="40" height="34" fill="#1B5E20" />
                <rect x="108" y="132" width="60" height="18" fill="#8FE21A" opacity="0.5" />
                <rect x="240" y="158" width="16" height="22" fill="#3E2712" />
                <rect x="228" y="132" width="40" height="28" fill="#1B5E20" />
              </g>
              <rect x="40" y="80" width="46" height="16" fill="#3E2712" />
              <rect x="40" y="80" width="46" height="6" fill="#8FE21A" />
              <rect x="320" y="60" width="40" height="14" fill="#3E2712" />
              <rect x="320" y="60" width="40" height="5" fill="#8FE21A" />
              <g fill="#EDEDE3" opacity="0.65">
                <rect x="30" y="30" width="4" height="4" />
                <rect x="360" y="40" width="4" height="4" />
                <rect x="200" y="20" width="4" height="4" />
                <rect x="60" y="200" width="4" height="4" />
                <rect x="340" y="180" width="4" height="4" />
              </g>
            </svg>
          </div>
        </Reveal>
      </section>
    </>
  );
}
