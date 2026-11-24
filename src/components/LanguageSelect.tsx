import type { Locale } from "../content";
import { useSite } from "../context/SiteProvider";
import { LOCALES } from "../i18n/locales";

export default function LanguageSelect() {
  const { locale, setLocale, ui } = useSite();
  return (
    <div className="lang-select">
      <label className="sr-only" htmlFor="lang-select">{ui.common.language}</label>
      <select id="lang-select" title={LOCALES.find((l) => l.code === locale)?.name} value={locale} onChange={(e) => setLocale(e.target.value as Locale)}>
        {LOCALES.map((l) => (
          <option key={l.code} value={l.code}>
            {l.label}
          </option>
        ))}
      </select>
    </div>
  );
}
