"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { BrutalButtonLink, BrutalIconButton } from "@/components/ui/Button";
import {
  IconSearch,
  IconClose,
  IconTicket,
  IconBed,
  IconArrow,
} from "@/components/ui/Icons";
import { movies, tenants, wayfinding } from "@/app/data/home";

interface SearchHit {
  type: "Film" | "Tenant" | "Layanan";
  title: string;
  meta: string;
  href: string;
}

const nav = [
  { href: "#cinema", label: "Cinema" },
  { href: "#facilities", label: "Fasilitas" },
  { href: "#tenants", label: "Tenant" },
  { href: "#fugo", label: "FUGO Hotel" },
  { href: "#whatson", label: "What's On" },
  { href: "#location", label: "Lokasi" },
];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const hits = useMemo<SearchHit[]>(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];

    const filmHits: SearchHit[] = movies
      .filter((m) => m.code.toLowerCase().includes(q))
      .slice(0, 3)
      .map((m) => ({
        type: "Film",
        title: m.code,
        meta: `${m.title} · ${m.duration} · ${m.rating}`,
        href: "#cinema",
      }));

    const tenantHits: SearchHit[] = tenants
      .filter((t) => t.name.toLowerCase().includes(q))
      .slice(0, 4)
      .map((t) => ({
        type: "Tenant",
        title: t.name,
        meta: `${t.floor} — Unit ${t.unit}`,
        href: "#tenants",
      }));

    const serviceHits: SearchHit[] = wayfinding
      .filter((w) => w.label.toLowerCase().includes(q) || w.code.toLowerCase().includes(q))
      .slice(0, 3)
      .map((w) => ({
        type: "Layanan",
        title: w.label,
        meta: `${w.floor} · ${w.hours}`,
        href: w.href,
      }));

    return [...filmHits, ...tenantHits, ...serviceHits];
  }, [query]);

  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-paper">
      <div className="flex items-center justify-between gap-6 px-4 py-3 md:px-10">
        {/* brand logo */}
        <a href="#top" className="flex items-center" aria-label="Duta Mall Banjarmasin — kembali ke atas">
          <Image
            src="/assets/img/Duta-Mall.png"
            alt="Duta Mall Banjarmasin"
            width={148}
            height={67}
            priority
            className="h-12 w-auto max-w-none md:h-14"
            unoptimized
          />
        </a>

        {/* structural nav */}
        <nav aria-label="Utama" className="hidden items-center gap-2 xl:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-3 py-2 font-sans text-sm font-bold uppercase tracking-wide text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* actions */}
        <div className="flex items-center gap-3">
          <BrutalIconButton
            aria-label={searchOpen ? "Tutup pencarian" : "Cari tenant, film, atau fasilitas"}
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen((v) => !v)}
          >
            {searchOpen ? <IconClose size={18} /> : <IconSearch size={18} />}
          </BrutalIconButton>
          <BrutalButtonLink href="#cinema" variant="primary" size="sm" className="max-md:hidden gap-2">
            <IconTicket size={15} />
            Jadwal Film
          </BrutalButtonLink>
          <BrutalButtonLink href="#fugo" variant="outline" size="sm" className="max-lg:hidden gap-2">
            <IconBed size={15} />
            Pesan Kamar
          </BrutalButtonLink>
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex size-10 flex-col items-center justify-center gap-1.5 border-2 border-ink bg-paper xl:hidden"
          >
            <span className={`h-0.5 w-5 bg-ink transition-transform ${menuOpen ? "translate-y-1 rotate-45" : ""}`} />
            <span className={`h-0.5 w-5 bg-ink transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-5 bg-accent transition-transform ${menuOpen ? "-translate-y-1 -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {/* instant search overlay */}
      {searchOpen && (
        <div className="border-t-2 border-ink bg-paper">
          <div className="px-4 py-4 md:px-10">
            <div className="flex items-center gap-3 border-2 border-ink px-3 shadow-brutal-xs">
              <IconSearch size={18} className="shrink-0" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="CARI FILM / TENANT / FASILITAS…"
                aria-label="Cari film, tenant, atau fasilitas"
                className="h-12 w-full bg-transparent font-mono text-sm font-bold uppercase tracking-wide placeholder:text-smoke focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Hapus pencarian"
                  className="text-smoke hover:text-accent"
                >
                  <IconClose size={16} />
                </button>
              )}
            </div>

            {/* results */}
            <div className="mt-3" aria-live="polite">
              {query.trim().length >= 2 && hits.length === 0 && (
                <p className="px-1 py-3 font-mono text-xs uppercase tracking-wide text-smoke">
                  Tidak ada hasil untuk “{query}”. Coba kata kunci lain.
                </p>
              )}
              {hits.length > 0 && (
                <ul className="divide-y-2 divide-ink border-2 border-ink">
                  {hits.map((hit) => (
                    <li key={`${hit.type}-${hit.title}`}>
                      <a
                        href={hit.href}
                        onClick={() => {
                          setSearchOpen(false);
                          setQuery("");
                        }}
                        className="cell-checker flex items-center justify-between gap-4 px-4 py-3 transition-colors hover:bg-silver/40"
                      >
                        <span className="flex min-w-0 items-baseline gap-3">
                          <span className="shrink-0 bg-ink px-1.5 py-0.5 font-mono text-xs font-bold uppercase text-paper">
                            {hit.type}
                          </span>
                          <span className="truncate font-sans text-sm font-bold uppercase">
                            {hit.title}
                          </span>
                        </span>
                        <span className="max-sm:hidden shrink-0 items-center gap-3 font-mono text-[11px] uppercase text-smoke sm:flex">
                          {hit.meta}
                          <IconArrow size={14} className="text-accent" />
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
              {query.trim().length < 2 && (
                <p className="px-1 py-2 font-mono text-xs uppercase tracking-wide text-smoke">
                  Ketik minimal 2 huruf — contoh: “fore”, “hutan”, “parkir”.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* mobile / tablet nav */}
      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Utama mobile"
          className="grid grid-cols-2 gap-px border-t-2 border-ink bg-ink xl:hidden"
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="bg-paper px-4 py-4 font-sans text-sm font-bold uppercase tracking-wide transition-colors hover:bg-accent hover:text-white"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#cinema"
            onClick={() => setMenuOpen(false)}
            className="col-span-2 flex items-center justify-center gap-2 bg-accent px-4 py-4 font-sans text-sm font-bold uppercase tracking-wide text-ink"
          >
            <IconTicket size={15} />
            Jadwal Film Hari Ini
          </a>
        </nav>
      )}
    </header>
  );
}
