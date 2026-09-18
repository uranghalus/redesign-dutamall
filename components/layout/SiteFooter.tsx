"use client";

import { IconArrow } from "@/components/ui/Icons";
import { interpolate } from "@/app/i18n/format";
import type { Dictionary } from "@/app/i18n/dictionaries";

/* column geometry is fixed; labels/links flow from the dictionary */
const columnKeys = [
  { key: "discover", links: [{ href: "#tenants", accent: false }, { href: "#tenants", accent: true }] },
  { key: "leisure", links: [{ href: "#cinema", accent: false }, { href: "#fugo", accent: false }] },
  { key: "atriums", links: [{ href: "#facilities", accent: false }, { href: "#location", accent: false }] },
  { key: "media", links: [{ href: "#whatson", accent: false }, { href: "#top", accent: false }] },
  { key: "dial", links: [{ href: "tel:+625113278888", accent: false }, { href: "#location", accent: false }] },
  { key: "social", links: [{ href: "#top", accent: false }, { href: "#top", accent: false }, { href: "#top", accent: false }] },
] as const;

/**
 * Footer — the mock's black monolith colophon: gold kicker, League Gothic
 * THE MONOLITH, group descriptor + MEMBER OF GOVINDO GROUP right, then the
 * 7-column 01/–07/ grid (dispatch newsletter in column 7) and the legal
 * line with gold mid-dot separators. All copy flows from the dictionary.
 */
export default function SiteFooter({ dict }: { dict: Dictionary }) {
  const c = dict.footer.columns;

  return (
    <footer className="bg-ink text-paper">
      <div className="px-4 pb-10 pt-12 md:px-10 md:pb-12 md:pt-16">
        {/* identity row */}
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="font-sans text-xs font-bold uppercase tracking-[0.28em] text-brass-soft">
              {dict.footer.kicker}
            </p>
            <p className="mt-3 font-display text-[clamp(3rem,6vw,5rem)] uppercase leading-[0.9]">
              {dict.footer.monolith}
            </p>
            <p className="mt-4 max-w-md font-sans text-[13px] leading-relaxed text-paper/55">
              {dict.footer.descriptor}
            </p>
          </div>
          <div className="md:pb-2 md:text-right">
            <p className="font-sans text-[10px] font-bold uppercase tracking-[0.28em] text-paper/45">
              {dict.footer.governance}
            </p>
            <p className="mt-2 font-sans text-xl font-semibold uppercase tracking-wide text-paper/85">
              {dict.footer.member}
            </p>
          </div>
        </div>

        {/* 7-column link grid — 01/–06/ directories + 07/ dispatch newsletter */}
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-paper/15 pt-10 sm:grid-cols-3 lg:grid-cols-[repeat(6,1fr)_1.4fr]">
          {columnKeys.map(({ key, links }) => (
            <nav key={key} aria-label={c[key].title}>
              <p className="font-sans text-[10px] font-bold uppercase tracking-[0.24em] text-brass-soft">
                {c[key].title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {links.map((l, i) => (
                  <li key={l.href + i}>
                    <a
                      href={l.href}
                      className={`font-sans text-[13px] leading-snug transition-colors ${
                        l.accent
                          ? "font-bold text-brass-soft hover:text-paper"
                          : "text-paper/70 hover:text-paper"
                      }`}
                    >
                      {c[key].links[i]}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* 07/ dispatch — the mock's newsletter cell */}
          <div>
            <p className="font-sans text-[10px] font-bold uppercase tracking-[0.24em] text-brass-soft">
              {c.dispatch.title}
            </p>
            <p className="mt-4 max-w-[26ch] font-sans text-[13px] leading-relaxed text-paper/70">
              {dict.footer.dispatchBlurb}
            </p>
            <form
              className="mt-4 flex border border-paper/30 focus-within:border-brass-soft"
              onSubmit={(e) => e.preventDefault()}
            >
              <label htmlFor="dispatch-email" className="sr-only">
                {dict.footer.dispatchAria}
              </label>
              <input
                id="dispatch-email"
                type="email"
                required
                placeholder={dict.footer.dispatchPlaceholder}
                className="h-11 w-full bg-transparent px-3 font-sans text-xs font-bold uppercase tracking-[0.18em] text-paper placeholder:text-paper/40 focus:outline-none"
              />
              <button
                type="submit"
                aria-label={dict.footer.dispatchCta}
                className="flex w-11 shrink-0 items-center justify-center bg-brass-soft text-ink transition-colors hover:bg-paper"
              >
                <IconArrow size={15} />
              </button>
            </form>
          </div>
        </div>

        {/* legal line */}
        <div className="mt-12 border-t border-paper/15 pt-5">
          <p className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-paper/40">
            {interpolate(dict.footer.legal, { year: new Date().getFullYear() })}
            <span className="mx-2 text-brass-soft">·</span>
            {dict.footer.legalTag1}
            <span className="mx-2 text-brass-soft">·</span>
            {dict.footer.legalTag2}
            <span className="mx-2 text-brass-soft">·</span>
            {dict.footer.legalTag3}
          </p>
        </div>
      </div>
    </footer>
  );
}
