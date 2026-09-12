"use client";

import { useState } from "react";
import { facilities } from "@/app/data/home";

const icons: Record<string, string> = {
  "Pusat Informasi": "◈",
  "Lobi & Lift FUGO": "⬢",
  "ATM Center": "⬣",
  "Ladies Parking": "⬔",
  "Ramah Disabilitas": "♡",
  "Ruang Medis": "+",
  "Nursery Room": "◐",
  Musholla: "✦",
  "Parkir Luas": "▭",
  "Toilet Touchless": "◎",
  "Sitting Lounge": "⬒",
  "Smoking Terrace": "⬙",
};

export default function Facilities() {
  const [active, setActive] = useState<string | null>(null);
  const [filter, setFilter] = useState("");
  const q = filter.trim().toLowerCase();
  const list = q ? facilities.filter((f) => f.name.toLowerCase().includes(q) || f.desc.toLowerCase().includes(q)) : facilities;

  return (
    <section id="fasilitas" aria-labelledby="fasilitas-title" className="cream py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="fasilitas-title" className="text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
              Fasilitas <span className="font-light text-ink/60">Mall</span>
            </h2>
            <p className="mt-2 max-w-xl text-sm font-normal leading-relaxed text-muted">12 fasilitas inti untuk keluarga dan semua pengunjung. Ketuk kartu untuk detail.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden text-xs font-semibold tracking-[0.14em] text-crimson md:inline">12 INTI · GUEST COMFORT</span>
            <label className="relative">
              <span className="sr-only">Cari fasilitas</span>
              <input
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Cari fasilitas…"
                className="w-44 rounded-full border border-ink/10 bg-white px-4 py-2 text-xs font-medium text-ink placeholder:text-muted-soft focus:border-crimson/30 focus:outline-none focus:ring-2 focus:ring-crimson/10 md:w-56"
              />
            </label>
          </div>
        </div>

        <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {list.map((f, i) => {
            const isActive = active === f.name;
            return (
              <li key={f.name}>
                <button
                  type="button"
                  onClick={() => setActive(isActive ? null : f.name)}
                  aria-expanded={isActive}
                  className={`group relative flex h-full w-full flex-col rounded-[20px] border bg-white p-5 text-left transition-all hover:-translate-y-0.5 ${isActive ? "border-crimson bg-crimson text-white shadow-[0_12px_32px_rgba(216,43,30,0.18)]" : "cream-card border-ink/10 hover:border-crimson/20"}`}
                >
                  <span
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-full border text-sm font-bold transition-colors ${isActive ? "border-white/20 bg-white/15 text-white" : "border-crimson/15 bg-crimson-soft text-crimson group-hover:bg-crimson group-hover:text-white group-hover:border-crimson"}`}
                    aria-hidden
                  >
                    {icons[f.name] ?? String(i + 1).padStart(2, "0")}
                  </span>
                  <p className={`mt-4 text-sm font-bold leading-tight ${isActive ? "text-white" : "text-ink group-hover:text-crimson"}`}>{f.name}</p>
                  <p className={`text-xs font-medium ${isActive ? "text-white/80" : "text-muted"}`}>{f.desc}</p>
                  <span className={`mt-3 inline-flex items-center gap-1 text-[11px] font-bold tracking-wide ${isActive ? "text-white" : "text-crimson"}`}>
                    {isActive ? "Tutup" : "Lihat detail"}
                    <span aria-hidden className={`transition-transform ${isActive ? "rotate-180" : "group-hover:translate-x-0.5"}`}>→</span>
                  </span>
                  <span className="pointer-events-none absolute right-4 top-4 text-[10px] font-bold tracking-wide text-ink/10 group-[.bg-crimson]:text-white/20">{String(i + 1).padStart(2, "0")}</span>
                </button>
                {isActive && (
                  <div className="mt-3 rounded-2xl border border-crimson/15 bg-crimson-soft px-4 py-3 text-xs font-medium leading-relaxed text-ink">
                    <p>
                      <span className="font-bold text-crimson">{f.name}</span> — {f.desc}. Tersedia selama jam operasional 10:00–22:00 WITA. Tanya concierge di lantai dasar untuk arahan.
                    </p>
                    <a href="#lokasi" className="mt-2 inline-flex rounded-full bg-crimson px-3 py-1.5 text-xs font-bold text-white hover:bg-crimson-dark">
                      Lihat di Peta
                    </a>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
        {list.length === 0 && <p className="mt-8 rounded-2xl border border-ink/10 bg-white px-4 py-8 text-center text-sm text-muted">Tidak ada fasilitas cocok untuk “{filter}”.</p>}
      </div>
    </section>
  );
}
