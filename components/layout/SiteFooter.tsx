export default function SiteFooter() {
  const cols = [
    { h: "Mall Directory", links: [["Tenant", "#tenant"], ["Fasilitas", "#fasilitas"], ["Lokasi", "#lokasi"]] },
    { h: "Entertainment", links: [["Cinema XXI", "#cinema"], ["What's On", "#whats-on"], ["FUGO Hotel", "#fugo"]] },
    { h: "Corporate Legal", links: [["Kebijakan Privasi", "#top"], ["Syarat & Ketentuan", "#top"], ["Govindo Group", "#fugo"]] },
  ];
  return (
    <footer className="border-t border-white/10 bg-cinema pb-20 md:pb-8">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-4">
        <div>
          <p className="text-sm font-extrabold tracking-tight text-white">Duta Mall Banjarmasin</p>
          <p className="mt-1 inline-flex items-center gap-2 text-xs font-medium text-white/50">
            <span className="h-1 w-1 rounded-full bg-crimson" />
            Jl. Ahmad Yani KM 2 Banjarmasin
          </p>
          <p className="text-xs font-medium text-white/40">Open Daily 10:00–22:00 WITA</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <a href="tel:+625113278888" className="inline-flex rounded-full bg-crimson px-3 py-1.5 text-xs font-bold text-white hover:bg-crimson-dark">
              (0511) 327-8888
            </a>
            <a href="https://maps.google.com/?q=Duta+Mall+Banjarmasin" target="_blank" rel="noopener noreferrer" className="inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white hover:text-cinema">
              Rute Maps
            </a>
          </div>
        </div>
        {cols.map((c) => (
          <nav key={c.h} aria-label={c.h}>
            <p className="text-xs font-bold tracking-[0.12em] text-gold">{c.h.toUpperCase()}</p>
            <ul className="mt-3 space-y-1.5 text-xs font-medium text-white/50">
              {c.links.map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="hover:text-white hover:underline decoration-crimson/50 underline-offset-4">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-4">
          <p className="text-[11px] font-medium tracking-wide text-white/30">© 2026 Duta Mall Banjarmasin · PT Govindo Utama · Gawi Sabumi Kawa Manuntung</p>
          <p className="text-[11px] font-bold tracking-[0.14em] text-white/20">
            <span className="text-crimson">●</span> CRIMSON <span className="text-gold">●</span> GOLD <span className="text-white/40">●</span> CREAM <span className="text-white/20">●</span> CINEMA #121214
          </p>
        </div>
      </div>
    </footer>
  );
}
