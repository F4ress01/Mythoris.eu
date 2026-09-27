import { useEffect, useState } from "react";
import { content, DISCORD_URL, type Locale } from "../content";

const LANG_STORAGE_KEY = "mythoris_lang";
const REDIRECT_DELAY_MS = 300;

function detectLocale(): Locale {
  try {
    const saved = window.localStorage.getItem(LANG_STORAGE_KEY);
    if (saved === "pl" || saved === "en") return saved;
  } catch {
    // ignore
  }
  const nav = (navigator.language || "en").toLowerCase();
  return nav.startsWith("pl") ? "pl" : "en";
}

export default function DiscordRedirectPage() {
  const [locale, setLocale] = useState<Locale>("pl");

  useEffect(() => {
    setLocale(detectLocale());
    const timer = window.setTimeout(() => {
      window.location.href = DISCORD_URL;
    }, REDIRECT_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  const t = content[locale];

  return (
    <div className="discord-page">
      <div className="discord-card">
        <img className="mark" src="/assets/mythoris-icon.png" alt="Mythoris" />
        <p className="brand">MYTHORIS</p>
        <div className="spinner" aria-hidden="true" />
        <p className="msg">{t.discord.msg}</p>
        <a className="btn" href={DISCORD_URL}>
          {t.discord.btn}
        </a>
        <p className="fallback">
          {t.discord.fallbackText} <a href="https://www.mythoris.eu">WWW.MYTHORIS.EU</a>
        </p>
      </div>
    </div>
  );
}
