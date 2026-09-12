"use client";

import { useMemo, useState } from "react";
import { tenants, type TenantCategory } from "@/app/data/home";

const cats: TenantCategory[] = ["Semua", "Beauty & Wellness", "F&B & Coffee", "Fashion & Lifestyle"];

export default function Tenants() {
  const [cat, setCat] = useState<TenantCategory>("Semua");
  const [q, setQ] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [fav, setFav] = useState<Set<string>>(() => new Set());

  const list = useMemo(() => {
    const base = cat === "Semua" ? tenants : tenants.filter((t) => t.category === cat);
    const query = q.trim().toLowerCase();
    if (!query) return base;
    return base.filter((t) => t.name.toLowerCase().includes(query) || t.floor.toLowerCase().includes(query));
  }, [cat, q]);

  const toggleFav = (name: string) => {
    setFav((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  return (
    <section id="tenant" aria-labelledby="tenant-title" className="cream border-y border-ink/5 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 id="tenant-title" className="text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
              Tenant <span className="font-light text-ink/50">& Boutique</span>
            </h2>
            <p className="mt-2 text-sm font-normal text-muted">Jelajahi direktori — saring kategori atau cari nama / lantai.</p>
          </div>
          <label className="relative w-full sm:w-64">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-soft">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
            </span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Cari tenant / lantai…"
              className="w-full rounded-full border border-ink/10 bg-white py-2.5 pl-9 pr-9 text-xs font-medium text-ink placeholder:text-muted-soft focus:border-crimson/30 focus:outline-none focus:ring-2 focus:ring-crimson/10"
            />
            {q && (
              <button type="button" onClick={() => setQ("")} className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full bg-ink/5 p-1.5 text-muted hover:bg-ink/10" aria-label="Hapus">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6 6 18M6 6l12 12" /></svg>
              </button>
            )}
          </label>
        </div>

        <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter kategori tenant">
          {cats.map((c) => {
            const active = cat === c;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setCat(c)}
                aria-pressed={active}
                className={`rounded-full border px-4 py-2 text-xs font-bold transition-colors ${active ? "border-crimson bg-crimson text-white crimson-glow" : "border-ink/10 bg-white text-ink/70 hover:border-crimson/20 hover:text-crimson"}`}
              >
                {c}
              </button>
            );
          })}
          <span className="ml-1 inline-flex items-center rounded-full bg-crimson-soft px-3 py-2 text-xs font-bold text-crimson">{list.length} tenant</span>
        </div>

        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((t) => {
            const isFav = fav.has(t.name);
            const isExpanded = expanded === t.name;
            return (
              <li key={t.name} className={`group relative overflow-hidden rounded-[20px] border bg-white p-5 text-left transition-all ${isExpanded ? "border-crimson shadow-[0_12px_32px_rgba(216,43,30,0.12)]" : "border-ink/10 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:border-crimson/15 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-0.5"}`}>
                <div className="flex items-start justify-between gap-3">
                  <button type="button" onClick={() => setExpanded(isExpanded ? null : t.name)} className="text-left">
                    <p className="text-base font-bold tracking-tight text-ink group-hover:text-crimson">{t.name}</p>
                    <p className="mt-1 text-xs font-medium text-muted">{t.category}</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleFav(t.name)}
                    aria-pressed={isFav}
                    aria-label={isFav ? "Hapus favorit" : "Simpan favorit"}
                    className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm transition-colors ${isFav ? "border-gold bg-gold text-white" : "border-ink/10 bg-white text-muted hover:border-gold/30 hover:text-gold"}`}
                  >
                    {isFav ? "★" : "☆"}
                  </button>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <span className="inline-flex rounded-full border border-gold/20 bg-gold-soft px-2.5 py-1 text-[11px] font-bold tracking-wide text-gold">{t.floor}</span>
                  <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${t.category === "F&B & Coffee" ? "bg-crimson-soft text-crimson" : t.category === "Beauty & Wellness" ? "bg-[#f0fdf4] text-[#15803d] border border-[#15803d]/10" : "bg-cream-mid text-ink/60 border border-ink/10"}`}>{t.category}</span>
                </div>

                <button
                  type="button"
                  onClick={() => setExpanded(isExpanded ? null : t.name)}
                  className={`mt-4 inline-flex items-center gap-1 text-xs font-bold ${isExpanded ? "text-crimson" : "text-ink/60 hover:text-crimson"}`}
                >
                  {isExpanded ? "Tutup detail" : "Lihat detail"}
                  <span aria-hidden className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}>→</span>
                </button>

                {isExpanded && (
                  <div className="mt-4 animate-[fadeIn_180ms_ease-out] rounded-2xl border border-ink/10 bg-cream p-4">
                    <div className="grid grid-cols-3 gap-2 text-center">
                      {[
                        ["Lokasi", t.floor],
                        ["Kategori", t.category],
                        ["Jam", "10–22 WITA"],
                      ].map(([k, v]) => (
                        <div key={k} className="rounded-xl bg-white px-2 py-3">
                          <p className="text-[10px] font-bold tracking-[0.12em] text-muted-soft">{k.toUpperCase()}</p>
                          <p className="mt-1 text-xs font-bold text-ink">{v}</p>
                        </div>
                      ))}
                    </div>
                    {/* mock floor map */}
                    <div className="relative mt-3 overflow-hidden rounded-xl border border-ink/10 bg-white p-3">
                      <p className="text-[10px] font-bold tracking-[0.12em] text-crimson">DENAH LANTAI — MOCK</p>
                      <div className="mt-2 grid grid-cols-6 gap-1">
                        {Array.from({ length: 18 }).map((_, i) => (
                          <span key={i} className={`h-6 rounded text-[9px] font-bold flex items-center justify-center ${t.name === "Fore Coffee" && i === 7 ? "bg-crimson text-white" : t.name === "Erha Ultimate" && i === 11 ? "bg-crimson text-white" : "bg-cream-mid text-muted-soft border border-ink/5"}`}>
                            {i + 1}
                          </span>
                        ))}
                      </div>
                      <p className="mt-2 text-[11px] font-medium text-muted">Blok merah = {t.name}. Tanya concierge untuk rute tercepat.</p>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <a href="#lokasi" className="flex-1 rounded-full bg-crimson px-3 py-2 text-center text-xs font-bold text-white hover:bg-crimson-dark">Petunjuk Arah</a>
                      <button type="button" onClick={() => toggleFav(t.name)} className={`rounded-full border px-4 py-2 text-xs font-bold ${isFav ? "border-gold bg-gold text-white" : "border-ink/15 bg-white text-ink hover:border-gold/30"}`}>
                        {isFav ? "★ Tersimpan" : "☆ Simpan"}
                      </button>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
        {list.length === 0 && (
          <p className="mt-6 rounded-2xl border border-ink/10 bg-white px-4 py-10 text-center text-sm text-muted">
            Tidak ada tenant cocok untuk “{q}” di kategori {cat}.
            <button type="button" onClick={() => { setQ(""); setCat("Semua"); }} className="ml-2 font-bold text-crimson hover:underline">Reset filter</button>
          </p>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a href="#tenant" className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-xs font-bold text-white hover:bg-black">
            Lihat Semua 200+ Tenant
            <span aria-hidden>→</span>
          </a>
          <span className="text-xs font-medium text-muted">Geser kategori & ketuk kartu untuk denah.</span>
        </div>
      </div>
    </section>
  );
}
