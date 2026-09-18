import { IconTicket, IconFilm, IconBed, IconRoute } from "@/components/ui/Icons";
import type { Dictionary } from "@/app/i18n/dictionaries";

/** Mobile quick-access hub — fixed bottom bar, touch-first (PRD §5.1). */
export default function BottomBar({ dict }: { dict: Dictionary }) {
  const items = [
    { href: "#cinema", label: dict.bottomBar.cinema, icon: IconTicket, accent: true },
    { href: "#tenants", label: dict.bottomBar.tenants, icon: IconFilm, accent: false },
    { href: "#fugo", label: dict.bottomBar.hotel, icon: IconBed, accent: false },
    { href: "#location", label: dict.bottomBar.route, icon: IconRoute, accent: false },
  ];

  return (
    <nav
      aria-label={dict.bottomBar.aria}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-hairline bg-paper pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <ul className="grid grid-cols-4">
        {items.map((item) => (
          <li key={item.href} className="border-r border-hairline last:border-r-0">
            <a
              href={item.href}
              className={`flex min-h-[60px] flex-col items-center justify-center gap-1 font-sans text-xs font-bold uppercase tracking-wide transition-colors ${
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
