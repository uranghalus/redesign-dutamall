import { IconPin, IconPhone, IconClock } from "@/components/ui/Icons";

const columns = [
  {
    title: "Direktori",
    links: [
      { label: "Cinema XXI", href: "#cinema" },
      { label: "Tenant & Boutique", href: "#tenants" },
      { label: "Fasilitas Mall", href: "#facilities" },
      { label: "Food Court", href: "#tenants" },
    ],
  },
  {
    title: "Hospitality",
    links: [
      { label: "FUGO Hotel & Suites", href: "#fugo" },
      { label: "Book Direct", href: "#fugo" },
      { label: "Meeting & Events", href: "#fugo" },
    ],
  },
  {
    title: "Informasi",
    links: [
      { label: "What's On", href: "#whatson" },
      { label: "Lokasi & Parkir", href: "#location" },
      { label: "Jam Operasional", href: "#location" },
    ],
  },
  {
    title: "Korporat",
    links: [
      { label: "Tentang Govindo Group", href: "#top" },
      { label: "Kebijakan Privasi", href: "#top" },
      { label: "Syarat & Ketentuan", href: "#top" },
      { label: "Sewa Unit (Leasing)", href: "#top" },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="border-t-2 border-ink bg-ink text-paper">
      <div className="px-4 pb-10 pt-12 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          {/* identity */}
          <div>
            <p className="font-display text-5xl uppercase leading-[0.9] md:text-6xl">
              DUTA<span className="text-accent">/</span>MALL
              <span className="text-outline-paper block">BANJARMASIN</span>
            </p>
            <p className="mt-5 max-w-sm font-sans text-sm leading-relaxed text-ash">
              Pusat perbelanjaan, hiburan, dan gaya hidup terbesar di Kalimantan
              Selatan — terintegrasi dengan FUGO Hotel &amp; Suites dan Cinema XXI /
              The Premiere.
            </p>
            <ul className="mt-6 space-y-2.5 font-mono text-xs uppercase tracking-wide">
              <li className="flex items-center gap-2.5">
                <IconPin size={14} className="shrink-0 text-accent" />
                Jl. Ahmad Yani KM 2, Banjarmasin 70236
              </li>
              <li className="flex items-center gap-2.5">
                <IconPhone size={14} className="shrink-0 text-accent" />
                <a href="tel:+625113278888" className="px-0.5 underline-offset-4 hover:text-accent hover:underline">
                  Hotline (0511) 327-8888
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <IconClock size={14} className="shrink-0 text-accent" />
                Open Daily 10:00–22:00 WITA
              </li>
            </ul>
          </div>

          {/* link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h3 className="mb-4 inline-block bg-paper px-1.5 py-0.5 font-mono text-[11px] font-bold uppercase tracking-widest text-ink">
                  {col.title}
                </h3>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={`${col.title}-${link.label}`}>
                      <a
                        href={link.href}
                        className="font-sans text-sm text-ash underline-offset-4 transition-colors hover:text-accent hover:underline"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* legal band */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-paper/20 pt-6 font-mono text-[11px] uppercase tracking-wide text-ash md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} PT Govindo Utama — Govindo Group.</p>
          <p className="flex items-center gap-2">
            <span aria-hidden="true" className="inline-block size-2 bg-accent" />
            Gawi Sabumi Kawa Manuntung
          </p>
        </div>
      </div>
    </footer>
  );
}
