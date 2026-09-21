"use client";

import { usePathname } from "next/navigation";
import { IconTicket, IconFilm, IconBed, IconRoute, IconPin } from "@/components/ui/Icons";
import type { Dictionary } from "@/app/i18n/dictionaries";
import type { Locale } from "@/app/i18n/config";

/** Mobile quick-access hub — fixed bottom bar, touch-first (PRD §5.1).
    Section anchors are normalized against the live pathname, so from any
    page (e.g. /id/peta, where homepage sections don't exist) they resolve
    to the homepage — `#cinema` becomes `/id#cinema`. Peta stays absolute. */
export default function BottomBar({
  dict,
  lang,
}: {
  dict: Dictionary;
  lang: Locale;
}) {
  const pathname = usePathname();
  /* /id, /id/, /id/peta → strip locale prefix + trailing slash → "/peta" */
  const subPath = pathname
    .replace(/^\/(id|en)(\/|$)/, "/")
    .replace(/\/+$/, "") || "/";

  const anchor = (hash: string) =>
    subPath === "/" ? hash : `/${lang}${hash}`;

  const items = [
    { href: anchor("#cinema"), label: dict.bottomBar.cinema, icon: IconTicket, accent: true },
    { href: anchor("#tenants"), label: dict.bottomBar.tenants, icon: IconFilm, accent: false },
    { href: anchor("#fugo"), label: dict.bottomBar.hotel, icon: IconBed, accent: false },
    { href: `/${lang}/peta`, label: dict.bottomBar.map, icon: IconPin, accent: false },
    { href: anchor("#location"), label: dict.bottomBar.route, icon: IconRoute, accent: false },
  ];

  return (
    <nav
      aria-label={dict.bottomBar.aria}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-hairline bg-paper pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <ul className="grid grid-cols-5">
        {items.map((item) => (
          <li key={item.href} className="border-r border-hairline last:border-r-0">
            <a
              href={item.href}
              className={`flex min-h-[60px] flex-col items-center justify-center gap-1 px-1 font-sans text-[11px] font-bold uppercase tracking-wide transition-colors ${
                item.accent
                  ? "bg-ink text-paper"
                  : "bg-paper text-ink hover:bg-bone active:bg-ink active:text-paper"
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
