import type { Locale } from "./config";
import { es } from "./es";
import { home } from "./dict/home";
import { marketplace } from "./dict/marketplace";
import { pages } from "./dict/pages";
import { dashboard } from "./dict/dashboard";
import { extra } from "./dict/extra";

// Merge the base dictionary with per-area modules (later spreads win on overlap).
const dict: Record<string, string> = {
  ...es,
  ...home,
  ...marketplace,
  ...pages,
  ...dashboard,
  ...extra,
};

/** Translate an English source string for the given locale. Falls back to the
 *  original string when no translation exists (so nothing ever goes blank). */
export function translate(locale: Locale, key: string): string {
  if (locale === "es") return dict[key] ?? key;
  return key;
}

export type TFn = (key: string) => string;
