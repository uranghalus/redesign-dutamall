export const locales = ["id", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "id";

/** The language switcher's surface names. */
export const localeNames: Record<Locale, string> = {
  id: "ID",
  en: "EN",
};

/** Cookie the proxy reads for repeat visits (set by the header switcher). */
export const LOCALE_COOKIE = "NEXT_LOCALE";
