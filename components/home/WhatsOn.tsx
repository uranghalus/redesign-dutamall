"use client";

import { useRef, useState } from "react";
import { events } from "@/app/data/home";

export default function WhatsOn() {
  const [active, setActive] = useState<number | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <section id="whats-on" aria-labelledby="whats-on-title" className="cream py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="whats-on-title" className="text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
              What&apos;s <span className="font-light text-ink/60">On</span>
            </h2>
            <p className="mt-2 text-sm font-normal text-muted">Agenda komunitas, CSR, dan hiburan akhir pekan. Geser atau pakai panah.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden text-xs font-bold tracking-[0.14em] text-gold md:inline">COMMUNITY & CSR</span>
            <button type="button" onClick={() => scroll(-1)} aria-label="Sebelumnya" className="hidden h-8 w-8 items-center justify-center rounded-full border border-ink/10 bg-white text-ink hover:bg-ink hover:text-white md:inline-flex">
              ‹
            </button>
            <button type="button" onClick={() => scroll(1)} aria-label="Berikutnya" className="hidden h-8 w-8 items-center justify-center rounded-full border border-ink/10 bg-white text-ink hover:bg-ink hover:text-white md:inline-flex">
              ›
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="mt-8 flex gap-4 overflow-x-auto scroll-smooth pb-2 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none" }}
        >
          {events.map((e, i) => {
            const isActive = active === i;
            return (
              <article
                key={e.title}
                className={`group relative flex w-[300px] shrink-0 snap-start flex-col overflow-hidden rounded-[20px] border bg-white p-6 text-left transition-all hover:-translate-y-1 ${isActive ? "border-crimson shadow-[0_12px_32px_rgba(216,43,30,0.12)]" : "border-ink/10 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:border-crimson/20 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]"}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className={`inline-flex h-9 w-9 items-center justify-center rounded-full border text-xs font-bold ${isActive ? "border-crimson bg-crimson text-white" : "border-gold/20 bg-gold-soft text-gold"}`}>{String(i + 1).padStart(2, "0")}</span>
                  <span className="rounded-full bg-ink px-2.5 py-1 text-[10px] font-bold tracking-wide text-white">EVENT</span>
                </div>
                <h3 className="mt-4 text-lg font-bold leading-tight text-ink group-hover:text-crimson">{e.title}</h3>
                <p className="mt-2 text-sm font-normal leading-relaxed text-muted">{e.desc}</p>
                <button
                  type="button"
                  onClick={() => setActive(isActive ? null : i)}
                  className={`mt-4 inline-flex items-center gap-1 text-xs font-bold ${isActive ? "text-crimson" : "text-ink/60 hover:text-crimson"}`}
                >
                  {isActive ? "Tutup" : "Lihat detail"}
                  <span aria-hidden className={`transition-transform ${isActive ? "rotate-180" : "group-hover:translate-x-0.5"}`}>→</span>
                </button>
                {isActive && (
                  <div className="mt-4 rounded-2xl border border-ink/10 bg-cream p-3 text-xs leading-relaxed text-ink">
                    <p className="font-bold text-crimson">{e.title}</p>
                    <p className="mt-1 text-muted">{e.desc} — Hubungi concierge untuk jadwal lengkap dan pendaftaran.</p>
                    <a href="#lokasi" className="mt-2 inline-flex rounded-full bg-ink px-3 py-1.5 text-xs font-bold text-white hover:bg-black">Info & Daftar</a>
                  </div>
                )}
              </article>
            );
          })}
          {/* CTA card */}
          <a href="#whats-on" className="flex w-[300px] shrink-0 snap-start flex-col justify-center rounded-[20px] border-2 border-dashed border-crimson/20 bg-crimson-soft p-6 hover:border-crimson/30 hover:bg-crimson-soft">
            <p className="text-sm font-bold text-crimson">Punya acara komunitas?</p>
            <p className="mt-1 text-xs font-medium leading-relaxed text-ink/60">Ajukan proposal event & CSR — tim Duta Mall siap bantu kurasi.</p>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-crimson">
              Hubungi Pengelola <span aria-hidden>→</span>
            </span>
          </a>
        </div>
        <p className="mt-3 text-center text-[11px] font-medium text-muted md:hidden">← Geser kartu untuk lihat semua →</p>
      </div>
    </section>
  );
}
