const items = [
  { label: "Beranda", href: "#top" },
  { label: "Cinema", href: "#cinema" },
  { label: "Tenant", href: "#tenant" },
  { label: "FUGO", href: "#fugo" },
  { label: "Lokasi", href: "#lokasi" },
];
export default function BottomBar() {
  return (
    <nav aria-label="Navigasi bawah" className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-cinema/95 backdrop-blur-[20px] supports-[backdrop-filter]:bg-cinema/80 md:hidden">
      <ul className="grid grid-cols-5">
        {items.map((i) => (
          <li key={i.label}>
            <a href={i.href} className="flex min-h-11 flex-col items-center justify-center gap-1 py-2 text-[10px] font-bold tracking-wide text-white/50 hover:text-crimson">
              <span aria-hidden className="h-1 w-6 rounded-full bg-white/10 group-hover:bg-crimson" />
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
