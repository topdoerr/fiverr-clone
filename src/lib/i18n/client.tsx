"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import {
  LOCALE_COOKIE,
  defaultLocale,
  type Locale,
} from "./config";
import { translate, type TFn } from "./translate";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: TFn;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: ReactNode;
}) {
  const router = useRouter();
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  // Keep in sync when the server re-renders with a new cookie (after refresh).
  useEffect(() => {
    setLocaleState(initialLocale);
  }, [initialLocale]);

  const setLocale = (l: Locale) => {
    document.cookie = `${LOCALE_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`;
    setLocaleState(l);
    router.refresh();
  };

  const t: TFn = (key) => translate(locale, key);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    // Safe fallback if used outside a provider.
    return { locale: defaultLocale, setLocale: () => {}, t: (k: string) => k };
  }
  return ctx;
}

/** Convenience hook returning just the translation function. */
export function useT(): TFn {
  return useLocale().t;
}
