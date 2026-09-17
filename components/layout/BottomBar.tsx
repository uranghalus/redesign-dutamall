import { IconTicket, IconFilm, IconBed, IconRoute } from "@/components/ui/Icons";

/** Mobile quick-access hub — fixed bottom bar, touch-first (PRD §5.1). */
export default function BottomBar() {
  const items = [
    { href: "#cinema", label: "Cinema", icon: IconTicket, accent: true },
    { href: "#tenants", label: "Tenant", icon: IconFilm, accent: false },
    { href: "#fugo", label: "Hotel", icon: IconBed, accent: false },
    { href: "#location", label: "Rute", icon: IconRoute, accent: false },
  ];

  return (
    <nav
      aria-label="Akses cepat"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-hairline bg-paper pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <ul className="grid grid-cols-4">
        {items.map((item) => (
          <li key={item.label} className="border-r border-hairline last:border-r-0">
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
