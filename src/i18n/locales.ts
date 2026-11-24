export const LOCALES = [
  { code: "pl", label: "PL", name: "Polski" },
  { code: "en", label: "EN", name: "English" },
  { code: "de", label: "DE", name: "Deutsch" },
  { code: "cs", label: "CS", name: "Čeština" },
  { code: "uk", label: "UK", name: "Українська" },
] as const;

export type LocaleCode = (typeof LOCALES)[number]["code"];
export const LOCALE_CODES: LocaleCode[] = LOCALES.map((l) => l.code);
