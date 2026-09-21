"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { IconTicket, IconFilm, IconBed, IconRoute } from "@/components/ui/Icons";
import type { Dictionary } from "@/app/i18n/dictionaries";
import type { Locale } from "@/app/i18n/config";

/** Mobile quick-access hub — fixed bottom bar, touch-first (PRD §5.1).
    Section anchors are normalized against the live pathname, so from any
    page they resolve to the homepage — `#cinema` becomes `/id#cinema`.

    The floor-map item was removed (2026-09-21): /peta is desktop-only,
    so a mobile route to it was a dead end. Four section items remain.

    Active state is two-driven: a scroll-spy keeps the highlighted item in
    step with the section under the viewport's midline (anchor scrolls from
    the header nav / hero count too), and a click on an item pins that item
    for the duration of the smooth scroll so the highlight never lags or
    flickers back mid-flight. SSR renders no active item (hydration
    matches); the spy fills it in after mount. */

const SPY_SECTIONS = ["tenants", "cinema", "fugo", "location"] as const;

export default function BottomBar({
  dict,
  lang,
}: {
  dict: Dictionary;
  lang: Locale;
}) {
  const pathname = usePathname();
  /* /id, /id/ → strip locale prefix + trailing slash → "/" */
  const subPath = pathname
    .replace(/^\/(id|en)(\/|$)/, "/")
    .replace(/\/+$/, "") || "/";

  const anchor = (hash: string) =>
    subPath === "/" ? hash : `/${lang}${hash}`;

  const items = [
    { key: "cinema", href: anchor("#cinema"), sectionId: "cinema", label: dict.bottomBar.cinema, icon: IconTicket },
    { key: "tenants", href: anchor("#tenants"), sectionId: "tenants", label: dict.bottomBar.tenants, icon: IconFilm },
    { key: "fugo", href: anchor("#fugo"), sectionId: "fugo", label: dict.bottomBar.hotel, icon: IconBed },
    { key: "route", href: anchor("#location"), sectionId: "location", label: dict.bottomBar.route, icon: IconRoute },
  ] as const;

  /* item key of the section the viewport currently sits in (null = none) */
  const [active, setActive] = useState<string | null>(null);
  /* a clicked item holds the highlight until its section arrives */
  const pendingRef = useRef<{ key: string; id: string; until: number } | null>(null);

  /* scroll-spy — rAF-throttled, passive; picks the section crossing the
     viewport midline. Runs once on mount so a hash landing (#cinema in the
     URL) lights the right item immediately. */
  useEffect(() => {
    let raf = 0;

    const spy = () => {
      raf = 0;
      /* mid-flight: keep the clicked item lit until it arrives (or the
         grace period lapses — covers interrupted/short scrolls) */
      const pending = pendingRef.current;
      if (pending) {
        const el = document.getElementById(pending.id);
        const arrived =
          Date.now() > pending.until ||
          (el && (() => {
            const r = el.getBoundingClientRect();
            return r.top <= window.innerHeight * 0.55 && r.bottom > 0;
          })());
        if (el && !arrived) return;
        pendingRef.current = null;
      }

      const probe = window.innerHeight * 0.5;
      let section: string | null = null;
      for (const id of SPY_SECTIONS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= probe && r.bottom > probe) {
          section = id;
          break;
        }
      }
      /* #location's item key is "route" */
      setActive(section === "location" ? "route" : section);
    };

    const request = () => {
      if (!raf) raf = requestAnimationFrame(spy);
    };

    spy();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
    };
  }, []);

  const select = (key: string, sectionId: string | null) => {
    if (!sectionId) {
      pendingRef.current = null;
      return;
    }
    pendingRef.current = { key, id: sectionId, until: Date.now() + 1500 };
    setActive(key);
  };

  return (
    <nav
      aria-label={dict.bottomBar.aria}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-hairline bg-paper pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <ul className="grid grid-cols-4">
        {items.map((item) => {
          const isActive = active === item.key;
          return (
            <li key={item.key} className="border-r border-hairline last:border-r-0">
              <a
                href={item.href}
                aria-current={isActive ? "true" : undefined}
                onClick={() => select(item.key, item.sectionId)}
                className={`relative flex min-h-[60px] flex-col items-center justify-center gap-1 px-1 font-sans text-[11px] font-bold uppercase tracking-wide transition-colors duration-200 ${
                  isActive
                    ? "bg-ink text-paper"
                    : "bg-paper text-ink hover:bg-bone active:bg-ink active:text-paper"
                }`}
              >
                {/* brass position marker — the active item's ceiling rule */}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 top-0 h-0.5 origin-left bg-brass-soft transition-transform duration-300 ${
                    isActive ? "scale-x-100" : "scale-x-0"
                  }`}
                />
                <item.icon size={20} />
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
