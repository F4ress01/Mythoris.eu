import { LOCALES, type LocaleCode } from "../i18n/locales";

export default function LangTabs({ value, onChange, filled }: { value: LocaleCode; onChange: (l: LocaleCode) => void; filled?: (l: LocaleCode) => boolean }) {
  return (
    <div className="lang-tabs" role="tablist" aria-label="Language">
      {LOCALES.map((l) => (
        <button key={l.code} type="button" role="tab" aria-selected={value === l.code} className={value === l.code ? "active" : ""} onClick={() => onChange(l.code)}>
          {l.label}
          {filled?.(l.code) ? " •" : ""}
        </button>
      ))}
    </div>
  );
}
