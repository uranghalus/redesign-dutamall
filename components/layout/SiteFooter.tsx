import { IconArrow } from "@/components/ui/Icons";

const footerLinks = [
  { label: "Direktori Tenant", href: "#tenants" },
  { label: "Jadwal Cinema", href: "#cinema" },
  { label: "FUGO Hotel", href: "#fugo" },
  { label: "What's On", href: "#whatson" },
  { label: "Kebijakan Privasi", href: "#top", underline: true },
];

export default function SiteFooter() {
  return (
    <footer className="bg-ink text-paper">
      <div className="px-4 pb-12 pt-10 md:px-10 md:pb-16 md:pt-12">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          {/* left — identity, bold link row, dim address block */}
          <div className="max-w-2xl">
            <a
              href="#top"
              aria-label="Duta Mall Banjarmasin — kembali ke atas"
              className="inline-block font-display text-5xl uppercase md:text-6xl"
            >
              Duta<span className="text-accent">/</span>Mall
            </a>

            <ul className="mt-7 flex flex-wrap gap-x-8 gap-y-2 border-t border-paper/15 pt-6">
              {footerLinks.map((l) => (
                <li key={l.label} className="font-sans text-sm font-bold leading-relaxed">
                  <a
                    href={l.href}
                    className={`transition-colors hover:text-accent ${
                      l.underline ? "underline underline-offset-4" : ""
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>

            <address className="mt-6 font-sans text-sm not-italic leading-relaxed text-paper/60">
              PT Govindo Utama — Govindo Group
              <br />
              Jl. Ahmad Yani KM 2, Banjarmasin, Kalimantan Selatan 70236
            </address>
            <p className="mt-1 font-sans text-sm leading-relaxed text-paper/60">
              Hotline (0511) 327-8888 · Open Daily 10:00–22:00 WITA
            </p>
            <p className="mt-4 font-sans text-xs uppercase tracking-wide text-paper/40">
              © {new Date().getFullYear()} Duta Mall Banjarmasin. Hak cipta dilindungi.
            </p>
          </div>

          {/* right — back to top */}
          <div className="flex items-end justify-between md:flex-col md:items-end md:gap-6">
            <a
              href="#top"
              aria-label="Kembali ke atas"
              className="flex size-12 items-center justify-center border border-paper/30 transition-colors hover:border-accent hover:bg-accent"
            >
              <IconArrow size={18} className="-rotate-90" />
            </a>
            <p className="font-sans text-xs font-bold uppercase tracking-widest text-paper/60 md:text-right">
              Gawi Sabumi
              <br className="hidden md:block" /> Kawa Manuntung
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
