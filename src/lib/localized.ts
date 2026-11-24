import type { LocaleCode } from "../i18n/locales";
import { LOCALE_CODES } from "../i18n/locales";

export type LText = Partial<Record<string, string>>;

/** Wybiera tekst w jezyku uzytkownika; fallback: angielski, potem pierwszy niepusty. `fallback` = true, gdy brak wlasnego tlumaczenia. */
export function pick(map: LText | undefined, locale: LocaleCode): { text: string; fallback: boolean } {
  if (!map) return { text: "", fallback: false };
  const own = map[locale];
  if (own && own.trim()) return { text: own, fallback: false };
  const en = map.en;
  if (en && en.trim()) return { text: en, fallback: true };
  const any = Object.values(map).find((v) => v && v.trim());
  return { text: any ?? "", fallback: Boolean(any) };
}

export function pickList(map: Partial<Record<string, string[]>> | undefined, locale: LocaleCode): string[] {
  if (!map) return [];
  const own = map[locale];
  if (own && own.length) return own;
  if (map.en?.length) return map.en;
  return LOCALE_CODES.map((c) => map[c]).find((v) => v && v.length) ?? [];
}

export const SLUG_RE = /^[a-z0-9-]{1,60}$/;
