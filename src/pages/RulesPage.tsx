import Footer from "../components/Footer";
import Nav from "../components/Nav";
import Reveal from "../components/Reveal";
import Toast from "../components/Toast";
import { useSite } from "../context/SiteProvider";

export default function RulesPage() {
  const { t } = useSite();

  return (
    <>
      <Nav />
      <main>
        <section style={{ paddingTop: 64 }}>
          <div className="wrap" style={{ maxWidth: 820 }}>
            <p className="kicker">{t.rules.kicker}</p>
            <h2>{t.rules.title}</h2>
            <p className="lede">{t.rules.intro}</p>

            {t.rules.sections.map((section) => (
              <Reveal key={section.heading} className="rules-section">
                <h3>{section.heading}</h3>
                <ul className="rules-list">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Reveal>
            ))}

            <p className="rules-note">{t.rules.note}</p>
          </div>
        </section>
      </main>
      <Footer />
      <Toast />
    </>
  );
}
