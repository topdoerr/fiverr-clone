import type { Locale } from "./config";
import { es } from "./es";

/** Translate an English source string for the given locale. Falls back to the
 *  original string when no translation exists (so nothing ever goes blank). */
export function translate(locale: Locale, key: string): string {
  if (locale === "es") return es[key] ?? key;
  return key;
}

export type TFn = (key: string) => string;
