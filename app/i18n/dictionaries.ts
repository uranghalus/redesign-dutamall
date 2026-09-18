import type { Locale } from "./config";

export type { Locale };

const dictionaries = {
  id: () => import("./dictionaries/id.json").then((m) => m.default),
  en: () => import("./dictionaries/en.json").then((m) => m.default),
};

export const hasLocale = (locale: string): locale is Locale =>
  (dictionaries as Record<string, unknown>)[locale] !== undefined;

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)["id"]>>;

export const getDictionary = async (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]();

export const locales = Object.keys(dictionaries) as Locale[];
