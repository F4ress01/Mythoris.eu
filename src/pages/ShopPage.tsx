import Footer from "../components/Footer";
import Nav from "../components/Nav";
import Toast from "../components/Toast";
import { DISCORD_URL } from "../content";
import { useSite } from "../context/SiteProvider";

export default function ShopPage() {
  const { t } = useSite();

  return (
    <>
      <Nav />
      <main>
        <div className="discord-page" style={{ minHeight: "60vh" }}>
          <div className="discord-card">
            <img className="mark" src="/assets/mythoris-icon.png" alt="Mythoris" />
            <p className="eyebrow" style={{ textAlign: "center" }}>
              {t.shop.eyebrow}
            </p>
            <h2>{t.shop.title}</h2>
            <p className="msg">{t.shop.msg}</p>
            <div className="hero-actions" style={{ justifyContent: "center", marginTop: 8 }}>
              <a className="btn btn-primary" href="/">
                {t.shop.btnHome}
              </a>
              <a
                className="btn btn-ghost discord-btn"
                href={DISCORD_URL}
                target="_blank"
                rel="noopener"
              >
                {t.shop.btnDiscord}
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <Toast />
    </>
  );
}
