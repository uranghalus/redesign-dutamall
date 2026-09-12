"use client";

import { useState } from "react";

export default function LocationSection() {
  const [copied, setCopied] = useState(false);
  const address = "Jl. Ahmad Yani KM 2 Banjarmasin";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <section id="lokasi" aria-labelledby="lokasi-title" className="cream border-t border-ink/5 py-12">
      <div className="mx-auto max-w-7xl px-6 md:grid md:grid-cols-2 md:gap-8 md:items-start">
        <div>
          <h2 id="lokasi-title" className="text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
            Lokasi <span className="font-light text-ink/50">& Akses</span>
          </h2>
          <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-3 py-1.5 text-sm font-bold text-ink">
            <span className="h-1.5 w-1.5 rounded-full bg-crimson" />
            {address}
          </p>
          <p className="mt-2 text-sm font-medium text-muted">Open Daily 10:00–22:00 WITA · Parkir 2.500+ kendaraan</p>

          <div className="mt-4 flex flex-wrap gap-2">
            <a href="https://maps.google.com/?q=Duta+Mall+Banjarmasin" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-crimson px-5 py-2.5 text-xs font-bold text-white hover:bg-crimson-dark crimson-glow">
              Buka Rute Maps
              <span aria-hidden>↗</span>
            </a>
            <a href="tel:+625113278888" className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-5 py-2.5 text-xs font-bold text-ink hover:border-crimson/20 hover:text-crimson">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              (0511) 327-8888
            </a>
            <button type="button" onClick={copy} className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-cream-mid px-4 py-2.5 text-xs font-semibold text-ink hover:bg-white">
              {copied ? "Tersalin ✓" : "Salin Alamat"}
            </button>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              ["25 mnt", "Bandara Syamsudin Noor"],
              ["KM 2", "Jl. Ahmad Yani"],
              ["10–22", "WITA · Setiap hari"],
            ].map(([v, l]) => (
              <div key={l} className="rounded-2xl border border-ink/10 bg-white px-3 py-4 text-center">
                <p className="text-sm font-extrabold text-crimson">{v}</p>
                <p className="text-[11px] font-medium leading-tight text-muted">{l}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mt-6 overflow-hidden rounded-[20px] border border-ink/10 bg-white p-2 shadow-[0_8px_24px_rgba(0,0,0,0.06)] md:mt-0">
          <iframe
            title="Peta Duta Mall Banjarmasin"
            src="https://maps.google.com/maps?q=Duta%20Mall%20Banjarmasin&t=&z=15&ie=UTF8&iwloc=&output=embed"
            className="h-64 w-full rounded-[14px] border-0 md:h-[300px]"
            loading="lazy"
          />
          <div className="pointer-events-none absolute bottom-4 left-4 rounded-full border border-ink/10 bg-white px-3 py-1.5 text-xs font-bold text-ink shadow-[0_4px_16px_rgba(0,0,0,0.12)]">
            Duta Mall · Jl. Ahmad Yani KM 2
          </div>
        </div>
      </div>
    </section>
  );
}
