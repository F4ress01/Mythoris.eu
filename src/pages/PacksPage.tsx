import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import Toast from "../components/Toast";
import { useSite } from "../context/SiteProvider";

interface Pack {
  id: string;
  name: string;
  description: string;
  version: string;
  url: string;
  sha1: string;
  size: number;
}

const API_PATH = "/api/packs.json";

function formatSize(bytes: number): string {
  return bytes >= 1048576 ? `${(bytes / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

export default function PacksPage() {
  const { t } = useSite();
  const [packs, setPacks] = useState<Pack[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch(API_PATH, { cache: "no-cache" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d: { packs?: Pack[] }) => alive && setPacks(Array.isArray(d.packs) ? d.packs : []))
      .catch(() => alive && setFailed(true));
    return () => {
      alive = false;
    };
  }, []);

  const copy = (text: string) => {
    try {
      void navigator.clipboard.writeText(text);
    } catch {
      /* brak dostepu do schowka */
    }
  };

  return (
    <>
      <Nav />
      <main>
        <section style={{ paddingTop: 64 }}>
          <div className="wrap" style={{ maxWidth: 820 }}>
            <p className="kicker">{t.packs.kicker}</p>
            <h2>{t.packs.title}</h2>
            <p className="lede">{t.packs.intro}</p>

            {failed && <p className="rules-note">{t.packs.error}</p>}
            {!failed && packs === null && <p className="rules-note">{t.packs.loading}</p>}
            {packs !== null && packs.length === 0 && <p className="rules-note">{t.packs.empty}</p>}

            {packs?.map((p) => (
              <div key={p.id} className="rules-section pack-card">
                <h3>{p.name}</h3>
                {p.description && <p className="rules-lead">{p.description}</p>}
                <p className="pack-meta">
                  {p.version && `${t.packs.version} ${p.version} · `}
                  {formatSize(p.size)} · SHA-1 {p.sha1}
                </p>
                <div className="hero-actions">
                  <a className="btn btn-primary" href={p.url} download>
                    {t.packs.download}
                  </a>
                  <button className="btn btn-ghost" type="button" onClick={() => copy(p.url)}>
                    {t.packs.copyUrl}
                  </button>
                </div>
              </div>
            ))}

            <p className="rules-note">
              {t.packs.apiLabel}: <a href={API_PATH}>{API_PATH}</a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <Toast />
    </>
  );
}
