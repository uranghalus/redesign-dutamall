"use client";

import { useState } from "react";

const tabs = [
  { id: "deluxe", label: "Deluxe", price: "Rp 850K", perks: "Sarapan · Kolam renang · Mall access" },
  { id: "suite", label: "Suite", price: "Rp 1.45jt", perks: "Lounge · Ballroom view · Late checkout" },
  { id: "family", label: "Family", price: "Rp 1.10jt", perks: "Extra bed · Playground · Buffet" },
] as const;

export default function FugoSpotlight() {
  const [active, setActive] = useState<(typeof tabs)[number]["id"]>("deluxe");
  const current = tabs.find((t) => t.id === active)!;

  return (
    <section id="fugo" aria-labelledby="fugo-title" className="relative overflow-hidden bg-cinema py-12">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gold/[0.06] via-transparent to-crimson/[0.04]" aria-hidden />
      <div className="mx-auto max-w-7xl px-6">
        <div className="overflow-hidden rounded-[28px] border border-gold/15 bg-gradient-to-br from-cinema-card via-cinema-card to-[#1a1611] shadow-[0_16px_48px_rgba(0,0,0,0.5)]">
          <div className="grid md:grid-cols-[1.1fr_0.9fr] md:gap-0">
            <div className="p-6 md:p-8">
              <p className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.22em] text-gold">
                <span className="h-px w-6 bg-gold" />
                FUGO HOTEL & SUITES · BINTANG 4
              </p>
              <h2 id="fugo-title" className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                Menginap <span className="font-light text-white/70">di Atas Mall</span>
              </h2>
              <p className="mt-3 max-w-xl text-sm font-normal leading-relaxed text-white/50">Panorama kota Banjarmasin, akses langsung ke Duta Mall dari lobi hotel. Pilih tipe kamar — harga mock untuk pratinjau.</p>

              {/* interactive tabs */}
              <div className="mt-6 flex gap-2 rounded-full border border-white/10 bg-white/[0.04] p-1.5 backdrop-blur" role="group" aria-label="Pilih tipe kamar">
                {tabs.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActive(t.id)}
                    aria-pressed={active === t.id}
                    className={`flex-1 rounded-full px-3 py-2 text-xs font-bold transition-colors ${active === t.id ? "bg-gold text-white gold-ring" : "text-white/60 hover:bg-white/10 hover:text-white"}`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div className="mt-4 rounded-2xl border border-gold/15 bg-gold-soft px-4 py-3">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-sm font-bold text-white">
                    {current.label} <span className="font-normal text-white/60">· {current.perks}</span>
                  </p>
                  <p className="text-sm font-extrabold text-gold">{current.price}</p>
                </div>
                <p className="mt-1 text-xs font-medium text-white/45">Mulai / malam · Belum termasuk pajak. Ketersediaan real-time di Fase 2.</p>
              </div>

              <ul className="mt-6 grid grid-cols-2 gap-3 text-sm">
                {[
                  ["180", "kamar Deluxe & Suite"],
                  ["2", "restoran fine dining"],
                  ["300 pax", "Grand Ballroom"],
                  ["25 mnt", "ke Bandara Syamsudin Noor"],
                ].map(([n, d]) => (
                  <li key={d} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur">
                    <strong className="text-lg font-extrabold tracking-tight text-white">{n}</strong>
                    <span className="block text-xs font-medium text-white/45">{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative flex flex-col justify-center gap-3 bg-gradient-to-br from-gold/[0.08] via-white/[0.02] to-transparent p-6 backdrop-blur md:border-l md:border-white/10">
              {/* mock gallery */}
              <div className="overflow-hidden rounded-[20px] border border-white/10 bg-black/20">
                <div className="relative h-48 bg-gradient-to-br from-[#2a2215] via-[#1c1c20] to-crimson/20 p-4">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(251,191,36,0.12),transparent_60%)]" aria-hidden />
                  <p className="relative text-[10px] font-bold tracking-[0.18em] text-gold">PREVIEW · {current.label.toUpperCase()}</p>
                  <p className="relative mt-2 text-lg font-bold text-white">Panorama Kota Banjarmasin</p>
                  <p className="relative text-xs font-medium text-white/45">Akses lift langsung ke mall · Jendela floor-to-ceiling</p>
                  <div className="relative mt-4 flex gap-1.5">
                    {tabs.map((t) => (
                      <span key={t.id} className={`h-1 rounded-full transition-all ${t.id === active ? "w-6 bg-gold" : "w-3 bg-white/20"}`} />
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 p-2">
                  {[0, 1, 2].map((i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActive(tabs[i].id)}
                      aria-label={`Lihat ${tabs[i].label}`}
                      className={`h-12 flex-1 rounded-xl border text-[10px] font-bold ${tabs[i].id === active ? "border-gold bg-gold-soft text-gold" : "border-white/10 bg-white/[0.04] text-white/40 hover:bg-white/10"}`}
                    >
                      {tabs[i].label}
                    </button>
                  ))}
                </div>
              </div>

              <a id="booking" href="tel:+625113278888" className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-center text-sm font-extrabold text-white hover:bg-[#b45309] gold-ring transition-colors">
                Book Now — {current.price}
                <span aria-hidden>→</span>
              </a>
              <a href="tel:+625113278888" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-center text-sm font-semibold text-white backdrop-blur hover:bg-white hover:text-cinema">
                Meeting & Event Inquiries
              </a>
              <p className="text-center text-[11px] font-medium text-white/30">Tap tipe kamar untuk bandingkan · Direct call ke FUGO</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
