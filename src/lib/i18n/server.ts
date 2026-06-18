import { cookies } from "next/headers";
import { LOCALE_COOKIE, normalizeLocale, type Locale } from "./config";
import { translate, type TFn } from "./translate";

/** Read the active locale from the cookie (server components / route handlers). */
export async function getLocale(): Promise<Locale> {
  const store = await cookies();
  return normalizeLocale(store.get(LOCALE_COOKIE)?.value);
}

/** A translation function bound to the request's locale. */
export async function getT(): Promise<TFn> {
  const locale = await getLocale();
  return (key: string) => translate(locale, key);
}
