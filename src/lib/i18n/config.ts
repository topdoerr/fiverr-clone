export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const LOCALE_COOKIE = "td_locale";

export function normalizeLocale(value: string | undefined | null): Locale {
  return value === "es" ? "es" : "en";
}
