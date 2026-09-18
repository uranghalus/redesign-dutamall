import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales as appLocales, LOCALE_COOKIE } from "@/app/i18n/config";

/* ============================================================
   Locale routing (official i18n guide, Next 16 proxy convention)
   Locales: `id` (default — the mall's home audience) and `en`.
   Unprefixed paths negotiate the locale from (1) a NEXT_LOCALE
   cookie set by the switcher, then (2) the Accept-Language header,
   and redirect to the prefixed path. Prefixed paths pass through
   to app/[lang]/. Static assets, _next, and files are excluded.
   ============================================================ */

export const locales = appLocales;
export type Locale = (typeof locales)[number];
export const defaultLocale = appLocales[0];

/** Parse Accept-Language into ranked language ranges (RFC 9110). */
function parseAcceptLanguage(header: string): string[] {
  return header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      let q = 1;
      for (const p of params) {
        const m = p.trim().match(/^q=([\d.]+)$/);
        if (m) q = parseFloat(m[1]);
      }
      return { tag: tag.toLowerCase(), q };
    })
    .filter((r) => r.q > 0)
    .sort((a, b) => b.q - a.q)
    .map((r) => r.tag);
}

/** Pick the first request tag that maps onto a supported locale. */
function negotiate(request: NextRequest): Locale {
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookie && (locales as readonly string[]).includes(cookie)) {
    return cookie as Locale;
  }

  const header = request.headers.get("accept-language");
  if (header) {
    for (const tag of parseAcceptLanguage(header)) {
      if (tag === "id" || tag.startsWith("id-")) return "id";
      if (tag === "en" || tag.startsWith("en-")) return "en";
    }
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );
  if (pathnameHasLocale) return;

  const locale = negotiate(request);

  /* Persist the negotiated locale so the switcher click only carries the
     target prefix once — repeat visits negotiate from the cookie first. */
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  const response = NextResponse.redirect(url);
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: 31536000,
    sameSite: "lax",
  });
  return response;
}

export const config = {
  // Skip internal paths, static assets and any file with an extension
  matcher: ["/((?!_next|api/|.*\\..*).*)"],
};
