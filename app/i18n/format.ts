import type { Locale } from "./config";

/** Format minutes as a localized duration — id: 2j 8m · en: 2h 8m. */
export function formatDuration(minutes: number, locale: Locale): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return locale === "id" ? `${h}j ${m}m` : `${h}h ${m}m`;
}

/** Localized floor label — id: "Lantai 1" · en: "1st Floor". */
export function formatFloor(n: number, locale: Locale): string {
  return locale === "id" ? `Lantai ${n}` : `${n}${n === 1 ? "st" : "nd"} Floor`;
}
export function formatCurrency(amount: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === "id" ? "id-ID" : "en-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Replace {key} placeholders in dictionary strings. */
export function interpolate(
  template: string,
  vars: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (_, k: string) =>
    vars[k] !== undefined ? String(vars[k]) : `{${k}}`,
  );
}
