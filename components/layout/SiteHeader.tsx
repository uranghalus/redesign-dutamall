"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { movies, tenants } from "@/app/data/home";

const leftLinks = [
  { label: "Cinema", href: "#cinema" },
  { label: "Tenant", href: "#tenant" },
  { label: "Fasilitas", href: "#fasilitas" },
];
const rightLinks = [
  { label: "FUGO Hotel", href: "#fugo" },
  { label: "What's On", href: "#whats-on" },
  { label: "Lokasi", href: "#lokasi" },
];
const badges = [
  { label: "Cinema", href: "#cinema" },
  { label: "Tenants", href: "#tenant" },
  { label: "FUGO Hotel", href: "#fugo" },
  { label: "Food Court", href: "#tenant" },
  { label: "Facilities", href: "#fasilitas" },
];

const TICKER = "OPEN DAILY 10:00–22:00 WITA  ·  (0511) 327-8888  ·  JL. AHMAD YANI KM 2 BANJARMASIN  ·  ";

export default function SiteHeader() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const query = q.trim().toLowerCase();
  const results = query
    ? [
        ...tenants.filter((t) => t.name.toLowerCase().includes(query)).map((t) => ({ label: t.name, sub: `${t.category} · ${t.floor}`, href: "#tenant" })),
        ...movies.filter((m) => m.title.toLowerCase().includes(query)).map((m) => ({ label: m.title, sub: `Film · ${m.duration} · ${m.age}`, href: "#cinema" })),
      ].slice(0, 6)
    : [];
  const showDropdown = focused && query.length > 0;

  useEffect(() => {
    setHighlight(0);
  }, [query]);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setFocused(false);
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, []);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown || results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => (h + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => (h - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      window.location.hash = results[highlight].href;
      setFocused(false);
    } else if (e.key === "Escape") {
      setFocused(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-spatial/80 backdrop-blur-[20px] supports-[backdrop-filter]:bg-spatial/70">
      {/* scroll progress — crimson */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-white/10">
        <div className="h-full w-full origin-left bg-crimson" style={{ transform: `scaleX(var(--scroll-progress,0))` }} />
      </div>
      <style>{`@keyframes spatial-ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}.spatial-ticker{animation:spatial-ticker 36s linear infinite}`}</style>

      {/* ticker — PRD crimson + gold */}
      <div aria-hidden="true" className="overflow-hidden border-b border-crimson/20 bg-crimson py-1 text-white">
        <div className="spatial-ticker flex w-max whitespace-nowrap">
          {[0, 1].map((n) => (
            <span key={n} className="pr-6 text-[10px] font-bold tracking-[0.24em] text-white/95">
              {TICKER.repeat(4)}
            </span>
          ))}
        </div>
      </div>

      {/* desktop masthead */}
      <div className="mx-auto hidden max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-6 py-4 lg:grid">
        <nav aria-label="Kiri" className="flex items-center justify-end gap-6 text-[11px] font-semibold tracking-[0.14em] text-white/60">
          {leftLinks.map((n) => (
            <a key={n.href} href={n.href} className="relative py-1 transition-colors hover:text-white after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-crimson after:transition-all hover:after:w-full">
              {n.label}
            </a>
          ))}
        </nav>
        <a
          href="#top"
          aria-label="Duta Mall Banjarmasin — beranda"
          className="glass iridescent mx-auto inline-flex items-center justify-center rounded-2xl bg-white px-4 py-2 shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
        >
          <Image src="/assets/img/Duta-Mall.png" alt="Duta Mall Banjarmasin" width={150} height={42} priority className="h-8 w-auto" />
        </a>
        <nav aria-label="Kanan" className="flex items-center gap-6 text-[11px] font-semibold tracking-[0.14em] text-white/60">
          {rightLinks.map((n) => (
            <a key={n.href} href={n.href} className="relative py-1 transition-colors hover:text-white after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-crimson after:transition-all hover:after:w-full">
              {n.label}
            </a>
          ))}
        </nav>
      </div>

      {/* mobile masthead */}
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 lg:hidden">
        <a href="#top" aria-label="Duta Mall Banjarmasin — beranda" className="inline-flex shrink-0 items-center justify-center rounded-2xl bg-white px-3 py-2 shadow-[0_4px_16px_rgba(0,0,0,0.35)]">
          <Image src="/assets/img/Duta-Mall.png" alt="Duta Mall Banjarmasin" width={130} height={36} priority className="h-7 w-auto" />
        </a>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className={`ml-auto inline-flex min-h-11 items-center justify-center rounded-full px-5 text-xs font-bold tracking-wide transition-colors ${open ? "bg-crimson text-white" : "bg-white text-spatial hover:bg-cream-mid"}`}
        >
          {open ? "Tutup" : "Menu"}
        </button>
      </div>

      {/* utility — search + CTAs */}
      <div className="mx-auto hidden max-w-7xl items-center gap-3 px-6 pb-4 md:flex">
        <label htmlFor="site-search" className="sr-only">
          Cari tenant, film, fasilitas
        </label>
        <div ref={wrapRef} className="relative w-[360px] shrink-0">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
          </span>
          <input
            id="site-search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onFocus={() => setFocused(true)}
            onKeyDown={onKeyDown}
            placeholder="Cari tenant / film / fasilitas…"
            className="w-full rounded-full border border-white/10 bg-white/[0.06] py-2.5 pl-10 pr-4 text-xs font-medium tracking-wide text-white placeholder:text-white/40 focus:border-crimson/40 focus:bg-white/[0.08] focus:outline-none"
          />
          {query && (
            <button type="button" onClick={() => setQ("")} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-1.5 text-white/60 hover:bg-white/15 hover:text-white" aria-label="Hapus pencarian">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6 6 18M6 6l12 12" /></svg>
            </button>
          )}
          {showDropdown && (
            <ul className="absolute inset-x-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-white/10 bg-[#1a1a20] p-1.5 text-xs shadow-[0_16px_48px_rgba(0,0,0,0.5)]">
              {results.length === 0 && <li className="px-3 py-2.5 text-white/40">Tidak ditemukan untuk “{q}”.</li>}
              {results.map((r, i) => (
                <li key={r.label}>
                  <a
                    href={r.href}
                    onClick={() => setFocused(false)}
                    className={`flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 transition-colors ${i === highlight ? "bg-crimson text-white" : "text-white/80 hover:bg-white/[0.06] hover:text-white"}`}
                  >
                    <span className="font-medium">{r.label}</span>
                    <span className={`text-[10px] tracking-wide ${i === highlight ? "text-white/80" : "text-white/40"}`}>{r.sub}</span>
                  </a>
                </li>
              ))}
              <li className="border-t border-white/10 px-3 pb-1 pt-2 text-[10px] font-medium tracking-[0.14em] text-white/30">TEKAN ENTER UNTUK BUKA · ↑↓ UNTUK NAVIGASI</li>
            </ul>
          )}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <a href="tel:+625113278888" className="hidden px-3 py-2 text-xs font-medium tracking-wide text-white/70 hover:text-white lg:inline">
            (0511) 327-8888
          </a>
          <a href="#lokasi" className="rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-semibold text-white backdrop-blur hover:bg-white hover:text-spatial hover:border-white">
            Plan Visit
          </a>
          <a href="#fugo" className="rounded-full bg-crimson px-5 py-2.5 text-xs font-bold text-white hover:bg-crimson-dark crimson-glow">
            Pesan Kamar
          </a>
        </div>
      </div>

      {/* badge rail mobile — crimson active hint */}
      <nav aria-label="Akses cepat" className="mx-auto max-w-7xl px-4 pb-3 lg:hidden">
        <ul className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {badges.map((b) => (
            <li key={b.label} className="shrink-0">
              <a href={b.href} className="inline-flex min-h-10 items-center rounded-full border border-white/10 bg-white/[0.05] px-4 text-xs font-semibold tracking-wide text-white/80 hover:bg-crimson hover:border-crimson hover:text-white">
                {b.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {open && (
        <nav id="mobile-menu" aria-label="Seluler" className="border-t border-white/[0.06] bg-spatial/95 backdrop-blur-[20px] lg:hidden">
          <ul className="mx-auto max-w-7xl px-4 py-2">
            {[...leftLinks, ...rightLinks].map((n) => (
              <li key={n.href} className="border-b border-white/[0.06] last:border-0">
                <a href={n.href} onClick={() => setOpen(false)} className="flex items-center justify-between py-4 text-[15px] font-medium text-white hover:text-crimson">
                  {n.label}
                  <span className="text-white/30">→</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mx-auto max-w-7xl px-4 pb-4 md:hidden">
            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
              </span>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Cari tenant / film…"
                className="w-full rounded-full border border-white/10 bg-white/[0.06] py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/40 focus:border-crimson/40 focus:outline-none"
              />
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
