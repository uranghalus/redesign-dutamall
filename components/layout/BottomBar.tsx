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
      className="fixed inset-x-0 bottom-0 z-50 border-t-2 border-ink bg-paper pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <div className="grid grid-cols-4 gap-px bg-ink">
        {items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={`flex min-h-[60px] flex-col items-center justify-center gap-1 font-mono text-xs font-bold uppercase tracking-widest transition-colors ${
              item.accent
                ? "bg-accent text-ink"
                : "bg-paper text-ink hover:bg-silver"
            }`}
          >
            <item.icon size={20} />
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
