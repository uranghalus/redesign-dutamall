"use client";

import { useState } from "react";
import { movies } from "@/app/data/home";

export default function Cinema() {
  const [picked, setPicked] = useState<Record<string, string>>({});
  const [toast, setToast] = useState<string | null>(null);

  const select = (title: string, time: string) => {
    setPicked((p) => ({ ...p, [title]: time }));
    setToast(`Jam ${time} untuk “${title}” dipilih — lanjut Pilih Kursi.`);
    window.setTimeout(() => setToast(null), 2200);
  };

  return (
    <section id="cinema" aria-labelledby="cinema-title" className="relative border-y border-white/5 bg-cinema py-12">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-crimson/[0.06] via-transparent to-transparent" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-crimson/20 to-transparent" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.22em] text-gold">
              <span className="h-1 w-6 rounded-full bg-gold" />
              CINEMA XXI & THE PREMIERE
            </p>
            <h2 id="cinema-title" className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              Jadwal Bioskop <span className="font-light text-white/80">Hari Ini</span>
            </h2>
            <p className="mt-2 max-w-xl text-sm font-normal leading-relaxed text-white/45">Pilih jam tayang — kartu akan mengingat pilihan Anda. Integrasi live API Fase 2.</p>
          </div>
          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 backdrop-blur md:inline-flex">
            <span className="h-1.5 w-1.5 animate-[pulse-live_1.6s_ease-in-out_infinite] rounded-full bg-crimson" />
            <span className="text-[11px] font-semibold tracking-[0.14em] text-white/60">DOLBY ATMOS · D-BOX · PREMIERE</span>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {movies.map((m, idx) => {
            const chosen = picked[m.title];
            return (
              <article
                key={m.title}
                className="group relative overflow-hidden rounded-[22px] border border-white/10 bg-cinema-card shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition-all hover:border-crimson/20 hover:shadow-[0_16px_48px_rgba(0,0,0,0.45)] hover:-translate-y-1"
              >
                {/* poster — PRD gradient replaced with crimson/gold cinematic */}
                <div className="relative flex h-48 items-end overflow-hidden p-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-crimson/20 via-cinema-elevated to-gold/15" aria-hidden />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" aria-hidden />
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.12), transparent 60%)` }} aria-hidden />
                  <span aria-hidden className="absolute right-4 top-3 font-mono text-5xl font-light tracking-tight text-white/[0.07]">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className="relative">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide ${m.age === "17+" ? "bg-gold text-white" : m.age === "SU" ? "bg-white text-cinema" : "bg-crimson text-white"}`}>
                      {m.age}
                    </span>
                    <h3 className="mt-2 text-xl font-bold tracking-tight text-white">{m.title}</h3>
                    <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-white/60">
                      <span className="text-gold">★ {m.rating}</span>
                      <span className="h-1 w-1 rounded-full bg-white/20" />
                      {m.duration}
                    </p>
                  </div>
                </div>
                <div className="border-t border-white/5 bg-cinema-card p-5">
                  <div className="flex flex-wrap gap-1.5">
                    {m.formats.map((f) => {
                      const isPremiere = f === "Premiere";
                      return (
                        <span
                          key={f}
                          className={`rounded-full border px-2.5 py-1 text-[10px] font-bold tracking-wide ${isPremiere ? "border-gold/30 bg-gold text-white gold-ring" : "border-white/10 bg-white/[0.05] text-white/70"}`}
                        >
                          {f}
                        </span>
                      );
                    })}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-1.5" role="group" aria-label={`Jam tayang ${m.title}`}>
                    {m.showtimes.map((t) => {
                      const active = chosen === t;
                      return (
                        <button
                          key={t}
                          type="button"
                          onClick={() => select(m.title, t)}
                          aria-pressed={active}
                          className={`rounded-full border px-3 py-1.5 text-xs font-semibold tabular-nums transition-all ${active ? "border-crimson bg-crimson text-white crimson-glow scale-[1.02]" : "border-white/10 bg-white/[0.04] text-white/70 hover:bg-white hover:text-cinema hover:border-white"}`}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>

                  {/* inline seat preview — appears when chosen */}
                  {chosen && (
                    <div className="mt-4 rounded-2xl border border-gold/15 bg-gradient-to-br from-gold/[0.06] to-transparent p-3">
                      <p className="text-[11px] font-bold tracking-[0.14em] text-gold">LAYAR · {chosen} · {m.title}</p>
                      <div className="mt-2 grid grid-cols-8 gap-1.5">
                        {Array.from({ length: 24 }).map((_, i) => {
                          const taken = i % 7 === 0;
                          const selected = i === 10;
                          return (
                            <span
                              key={i}
                              className={`h-5 rounded-sm border text-[8px] font-bold flex items-center justify-center ${selected ? "bg-crimson border-crimson text-white" : taken ? "bg-white/10 border-white/10 text-white/20" : "bg-white border-white/15 text-cinema/40 hover:bg-cream-mid cursor-pointer"}`}
                              aria-hidden
                            >
                              •
                            </span>
                          );
                        })}
                      </div>
                      <p className="mt-2 text-[10px] font-medium text-white/40">Pratinjau denah — kursi abu = tersedia, gelap = terisi, merah = pilihan Anda.</p>
                    </div>
                  )}

                  <a
                    href="#cinema"
                    onClick={(e) => {
                      if (!chosen) {
                        e.preventDefault();
                        setToast("Pilih jam tayang dulu, lalu Pilih Kursi.");
                        window.setTimeout(() => setToast(null), 2000);
                      }
                    }}
                    className={`mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 text-xs font-bold transition-colors ${chosen ? "bg-crimson text-white hover:bg-crimson-dark crimson-glow" : "bg-white text-cinema hover:bg-cream-mid"}`}
                  >
                    Pilih Kursi{chosen ? ` · ${chosen}` : ""}
                    <span aria-hidden>→</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        {toast && (
          <div role="status" aria-live="polite" className="pointer-events-none fixed bottom-20 left-1/2 z-50 -translate-x-1/2 rounded-full bg-cinema-card px-4 py-2.5 text-xs font-medium text-white shadow-[0_12px_32px_rgba(0,0,0,0.5)] border border-white/10 md:bottom-6">
            {toast}
          </div>
        )}
      </div>
    </section>
  );
}
