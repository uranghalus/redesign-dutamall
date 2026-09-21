"use client";

import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  IconSearch,
  IconClose,
  IconMenu,
  IconPin,
} from "@/components/ui/Icons";
import { movies, tenants, wayfinding } from "@/app/data/home";
import { mapTenantPins } from "@/app/data/map";
import MobileOffcanvas from "@/components/layout/MobileOffcanvas";
import { locales, localeNames, type Locale } from "@/app/i18n/config";
import type { Dictionary } from "@/app/i18n/dictionaries";
import { formatDuration } from "@/app/i18n/format";

interface SearchHit {
  type: string;
  title: string;
  meta: string;
  href: string;
  /** set for tenants with a floor-map pin — renders a deep-link action
      to /peta?tenant=… alongside the primary hit link */
  mapTenant?: string;
}

/* structural nav — order mirrors the page flow 1:1 (tenants → cinema → hotel
   → what's on → facilities → concierge), so nav position = scroll position */
const nav = [
  { href: "#tenants", label: "tenants" as const },
  { href: "#cinema", label: "cinema" as const },
  { href: "#fugo", label: "fugo" as const },
  { href: "#whatson", label: "whatson" as const },
  { href: "#facilities", label: "facilities" as const },
  { href: "#location", label: "location" as const },
];

export default function SiteHeader({
  dict,
  lang,
}: {
  dict: Dictionary;
  lang: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const locale = lang as Locale;

  /* section anchors resolve against the live pathname — from /peta (where
     homepage sections don't exist) `#tenants` becomes `/${locale}#tenants`;
     the structural nav, search results, and the offcanvas stay functional
     on every page. Mirrors BottomBar's normalization. */
  const subPath = pathname
    .replace(/^\/(id|en)(\/|$)/, "/")
    .replace(/\/+$/, "") || "/";
  const anchor = (hash: string) =>
    subPath === "/" ? hash : `/${locale}${hash}`;

  /* language switch — cookie is written by the proxy on navigation, so the
     click only carries the target locale and swaps the path prefix,
     preserving the hash so deep anchors survive */
  const switchTo = (next: Locale) => {
    if (next === locale) return;
    router.push(
      (() => {
        const { pathname, search, hash } = window.location;
        const bare = pathname.replace(/^\/(id|en)(\/|$)/, "/");
        return `/${next}${bare === "/" ? "" : bare}${search}${hash}`;
      })(),
    );
  };

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const hits = useMemo<SearchHit[]>(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];

    const filmHits: SearchHit[] = movies
      .filter((m) => m.code.toLowerCase().includes(q))
      .slice(0, 3)
      .map((m) => ({
        type: dict.search.type.film,
        title: m.code,
        meta: `${formatDuration(m.duration, locale)} · ${dict.data.genres[m.genre]} · ${m.rating}`,
        href: anchor("#cinema"),
      }));

    const tenantHits: SearchHit[] = tenants
      .filter((t) => t.name.toLowerCase().includes(q))
      .slice(0, 4)
      .map((t) => ({
        type: dict.search.type.tenant,
        title: t.name,
        meta: `${t.floor} — ${dict.tenants.unit} ${t.unit}`,
        href: anchor("#tenants"),
        /* pinned tenants deep-link into the map; match on the pin's
           name so the slug stays owned by app/data/map.ts */
        mapTenant: mapTenantPins.find((p) => p.name === t.name)?.slug,
      }));

    const serviceHits: SearchHit[] = wayfinding
      .filter((w) => w.label.toLowerCase().includes(q) || w.code.toLowerCase().includes(q))
      .slice(0, 3)
      .map((w) => ({
        type: dict.search.type.service,
        title: w.label,
        meta: `${w.floor} · ${w.hours}`,
        href: anchor(w.href),
      }));

    return [...filmHits, ...tenantHits, ...serviceHits];
  }, [query, dict, locale]);

  /* structural nav — links resolve cross-page (see anchor above) */
  const navItems = nav.map((item) => ({ ...item, href: anchor(item.href) }));

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50" data-solid="light">
        {/* ================= black utility topbar ================= */}
        <div className="topbar-scroll max-xl:hidden overflow-x-auto bg-ink text-paper">
          <div className="mx-auto flex h-9 max-w-none items-center justify-between gap-8 px-10">
            <div className="flex items-center gap-2 whitespace-nowrap">
              <span aria-hidden="true" className="inline-block size-1.5 bg-brass-soft" />
              <span className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-paper/85">
                {dict.topbar.hours}
              </span>
            </div>
            <div className="flex items-center gap-8 whitespace-nowrap">
              {/* wayfinding — the floor map as a utility link (nav stays
                  structural; the topbar carries services like this) */}
              <a
                href={`/${locale}/peta`}
                className="flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-[0.18em] text-paper/85 transition-colors hover:text-brass-soft"
              >
                <IconPin size={13} className="shrink-0" />
                {dict.nav.map}
              </a>
              <a
                href="tel:+625113278888"
                className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-paper/85 transition-colors hover:text-brass-soft"
              >
                {dict.topbar.phone}
              </a>
              {/* language switcher — the mock's wayfinding row carries it */}
              <span
                role="group"
                aria-label={dict.language.switch}
                className="flex items-center gap-1 font-sans text-xs font-bold uppercase tracking-[0.18em]"
              >
                {locales.map((l, i) => (
                  <span key={l} className="flex items-center gap-1">
                    {i > 0 && <span aria-hidden="true" className="text-paper/40">/</span>}
                    <button
                      type="button"
                      onClick={() => switchTo(l)}
                      aria-pressed={l === locale}
                      aria-label={`${dict.language.label}: ${localeNames[l]}`}
                      className={`px-1 transition-colors ${l === locale
                        ? "text-brass-soft"
                        : "text-paper/60 hover:text-paper"
                        }`}
                    >
                      {localeNames[l]}
                    </button>
                  </span>
                ))}
              </span>
            </div>
          </div>
        </div>

        {/* ================= white nav bar ================= */}
        <div className="bg-paper text-ink shadow-[0_1px_0_0_#e5e5e5]">
          <div className="flex items-center justify-between gap-6 px-4 py-3 md:px-10 xl:h-[72px] xl:py-0">
            {/* brand — the plate logo already carries the name; the wordmark
                rides one baseline beside it (no stacked sub-line) */}
            <a href="#top" className="flex items-center gap-3" aria-label="Duta Mall Banjarmasin — kembali ke atas">
              <Image
                src="/assets/img/Duta-Mall.png"
                alt="Duta Mall Banjarmasin"
                width={148}
                height={67}
                priority
                className="h-11 w-auto max-w-none xl:h-12"
                unoptimized
              />
              <span aria-hidden="true" className="hidden h-8 w-px bg-hairline md:block" />
            </a>

            {/* structural nav — links plus a quiet icon search (label lives in aria) */}
            <nav aria-label="Utama" className="hidden items-center gap-7 xl:flex">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="group relative flex items-baseline px-1 py-2 font-sans text-[13px] font-bold uppercase tracking-[0.12em] text-ink/80 transition-colors hover:text-ink"
                >
                  {dict.nav[item.label]}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-1 bottom-0 h-0.5 origin-left scale-x-0 bg-brass-soft transition-transform duration-300 group-hover:scale-x-100"
                  />
                </a>
              ))}
              <button
                type="button"
                aria-label={searchOpen ? dict.search.close : dict.search.open}
                aria-expanded={searchOpen}
                onClick={() => setSearchOpen((v) => !v)}
                className="flex size-11 items-center justify-center text-ink/80 transition-colors hover:text-ink"
              >
                {searchOpen ? <IconClose size={17} /> : <IconSearch size={17} />}
              </button>
            </nav>

            {/* actions — mobile search + CTA + offcanvas trigger */}
            <div className="flex items-center gap-2">
              {/* mobile search — visible below xl, where the desktop nav
                  (and its inline search) is hidden */}
              <button
                type="button"
                aria-label={searchOpen ? dict.search.close : dict.search.open}
                aria-expanded={searchOpen}
                onClick={() => setSearchOpen((v) => !v)}
                className="flex size-11 items-center justify-center text-ink/80 transition-colors hover:text-ink xl:hidden"
              >
                {searchOpen ? <IconClose size={17} /> : <IconSearch size={17} />}
              </button>
              {/* language switcher — compact on the white bar for < xl */}
              <span
                role="group"
                aria-label={dict.language.switch}
                className="flex items-center gap-1 font-sans text-xs font-bold uppercase tracking-widest max-xl:flex xl:hidden"
              >
                {locales.map((l, i) => (
                  <span key={l} className="flex items-center gap-1">
                    {i > 0 && <span aria-hidden="true" className="text-ghost">/</span>}
                    <button
                      type="button"
                      onClick={() => switchTo(l)}
                      aria-pressed={l === locale}
                      className={`px-1 py-2 transition-colors ${l === locale ? "text-brass" : "text-mute hover:text-ink"
                        }`}
                    >
                      {localeNames[l]}
                    </button>
                  </span>
                ))}
              </span>

              <button
                type="button"
                aria-expanded={menuOpen}
                aria-controls="mobile-offcanvas"
                aria-label={menuOpen ? dict.menu.close : dict.menu.open}
                onClick={() => setMenuOpen(true)}
                className="flex size-11 items-center justify-center border border-ink/20 xl:hidden"
              >
                <IconMenu size={22} />
              </button>
            </div>
          </div>

          {/* instant search overlay */}
          {searchOpen && (
            <div className="border-t border-hairline bg-bone text-ink">
              <div className="px-4 py-4 md:px-10">
                <div className="flex items-center gap-3 border border-ink px-3">
                  <IconSearch size={18} className="shrink-0" />
                  <input
                    ref={inputRef}
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={dict.search.placeholder}
                    aria-label={dict.search.ariaLabel}
                    className="h-12 w-full bg-transparent font-sans text-base font-medium uppercase tracking-wide placeholder:text-mute focus:outline-none"
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={() => setQuery("")}
                      aria-label={dict.search.clear}
                      className="text-mute transition-colors hover:text-brass"
                    >
                      <IconClose size={16} />
                    </button>
                  )}
                </div>

                {/* results */}
                <div className="mt-3" aria-live="polite">
                  {query.trim().length >= 2 && hits.length === 0 && (
                    <p className="px-1 py-3 font-sans text-sm uppercase tracking-wide text-mute">
                      {dict.search.noResults.replace("{q}", query.trim())}
                    </p>
                  )}
                  {hits.length > 0 && (
                    <ul className="divide-y divide-hairline border border-ink">
                      {hits.map((hit) => (
                        <li key={`${hit.type}-${hit.title}`}>
                          <div className="flex items-stretch bg-paper transition-colors hover:bg-bone">
                            <a
                              href={hit.href}
                              onClick={() => {
                                setSearchOpen(false);
                                setQuery("");
                              }}
                              className="flex min-w-0 flex-1 items-center justify-between gap-4 px-4 py-3"
                            >
                              <span className="flex min-w-0 items-baseline gap-3">
                                <span className="shrink-0 bg-ink px-1.5 py-0.5 font-sans text-xs font-bold uppercase text-paper">
                                  {hit.type}
                                </span>
                                <span className="truncate font-sans text-sm font-bold uppercase">
                                  {hit.title}
                                </span>
                              </span>
                              <span className="max-sm:hidden shrink-0 items-center gap-3 font-sans text-xs uppercase text-mute sm:flex">
                                {hit.meta}
                              </span>
                            </a>
                            {hit.mapTenant && (
                              <a
                                href={`/${locale}/peta?tenant=${hit.mapTenant}`}
                                onClick={() => {
                                  setSearchOpen(false);
                                  setQuery("");
                                }}
                                aria-label={dict.search.mapActionAria.replace(
                                  "{name}",
                                  hit.title,
                                )}
                                title={dict.search.mapAction}
                                /* /peta is desktop-only — the deep-link
                                   action hides with the map on phones */
                                className="group/map hidden shrink-0 items-center gap-2 border-l border-hairline px-4 font-sans text-xs font-bold uppercase tracking-wide text-mute transition-colors hover:bg-ink hover:text-brass-soft md:flex"
                              >
                                <IconPin size={14} className="shrink-0" />
                                <span className="max-md:hidden">{dict.search.mapAction}</span>
                              </a>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                  {query.trim().length < 2 && (
                    <p className="px-1 py-2 font-sans text-sm uppercase tracking-wide text-mute">
                      {dict.search.hint}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <MobileOffcanvas
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        dict={dict}
        lang={locale}
      />
    </>
  );
}
