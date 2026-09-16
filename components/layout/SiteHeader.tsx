"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { LwtButtonLink } from "@/components/ui/Button";
import {
  IconSearch,
  IconClose,
  IconTicket,
  IconBed,
  IconMenu,
} from "@/components/ui/Icons";
import { movies, tenants, wayfinding } from "@/app/data/home";
import MobileOffcanvas from "@/components/layout/MobileOffcanvas";

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
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState<"clear" | "light" | "dark">("clear");
  const inputRef = useRef<HTMLInputElement>(null);
  const lastY = useRef(0);

  /* LWT header physics: transparent over the hero; white after scroll;
     hide on scroll-down, reveal on scroll-up. */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (y > 40 && y > lastY.current + 4) setHidden(true);
      else if (y < lastY.current - 4 || y <= 40) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* dark-section tracking: the header must stay readable over the black
     Enter band, FUGO section and footer — white text while over them */
  useEffect(() => {
    const darkIds = ["enter", "fugo"];
    const els = darkIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (menuOpen || searchOpen) return;
        const probe = window.innerHeight / 2;
        let dark = false;
        for (const el of els) {
          const r = el.getBoundingClientRect();
          if (r.top <= probe && r.bottom >= probe) {
            dark = true;
            break;
          }
        }
        // footer (always black)
        const footer = document.querySelector("footer");
        if (!dark && footer) {
          const r = footer.getBoundingClientRect();
          if (r.top <= probe) dark = true;
        }
        setSolid((prev) => {
          const next = dark ? "dark" : scrolled ? "light" : "clear";
          return next === prev ? prev : next;
        });
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [menuOpen, searchOpen, scrolled]);

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
    <>
      <header
        data-solid={solid}
        data-hidden={hidden && !searchOpen ? "true" : undefined}
        aria-expanded={searchOpen}
        className={`site-header fixed inset-x-0 top-0 z-50 ${
          solid === "clear"
            ? "bg-transparent text-ink"
            : solid === "dark"
              ? "bg-ink text-paper"
              : "bg-paper text-ink shadow-[0_1px_0_0_#e5e5e5]"
        }`}
      >
        <div className="flex items-center justify-between gap-6 px-4 py-3 md:px-10 lg:h-[7.2rem] lg:py-0">
          {/* brand logo */}
          <a href="#top" className="flex items-center" aria-label="Duta Mall Banjarmasin — kembali ke atas">
            <Image
              src="/assets/img/Duta-Mall.png"
              alt="Duta Mall Banjarmasin"
              width={148}
              height={67}
              priority
              className="h-11 w-auto max-w-none lg:h-14"
              unoptimized
            />
          </a>

          {/* structural nav */}
          <nav aria-label="Utama" className="hidden items-center gap-8 xl:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative px-1 py-2 font-sans text-sm font-bold uppercase tracking-wide"
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-1 bottom-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100"
                />
              </a>
            ))}
          </nav>

          {/* actions */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label={searchOpen ? "Tutup pencarian" : "Cari tenant, film, atau fasilitas"}
              aria-expanded={searchOpen}
              onClick={() => setSearchOpen((v) => !v)}
              className="flex size-11 items-center justify-center transition-colors hover:text-accent"
            >
              {searchOpen ? <IconClose size={20} /> : <IconSearch size={20} />}
            </button>
            <LwtButtonLink href="#cinema" variant="outline" size="sm" className="max-md:hidden gap-2">
              <IconTicket size={14} />
              Jadwal Film
            </LwtButtonLink>
            <LwtButtonLink href="#fugo" variant="solid" size="sm" className="max-lg:hidden gap-2">
              <IconBed size={14} />
              Pesan Kamar
            </LwtButtonLink>
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-offcanvas"
              aria-label={menuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
              onClick={() => setMenuOpen(true)}
              className="flex size-11 items-center justify-center xl:hidden"
            >
              <IconMenu size={22} />
            </button>
          </div>
        </div>

        {/* instant search overlay */}
        {searchOpen && (
          <div className="border-t border-hairline bg-paper text-ink">
            <div className="px-4 py-4 md:px-10">
              <div className="flex items-center gap-3 border border-ink px-3">
                <IconSearch size={18} className="shrink-0" />
                <input
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Cari film / tenant / fasilitas…"
                  aria-label="Cari film, tenant, atau fasilitas"
                  className="h-12 w-full bg-transparent font-sans text-base font-medium uppercase tracking-wide placeholder:text-mute focus:outline-none"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="Hapus pencarian"
                    className="text-mute transition-colors hover:text-accent"
                  >
                    <IconClose size={16} />
                  </button>
                )}
              </div>

              {/* results */}
              <div className="mt-3" aria-live="polite">
                {query.trim().length >= 2 && hits.length === 0 && (
                  <p className="px-1 py-3 font-sans text-sm uppercase tracking-wide text-mute">
                    Tidak ada hasil untuk “{query}”. Coba kata kunci lain.
                  </p>
                )}
                {hits.length > 0 && (
                  <ul className="divide-y divide-hairline border border-ink">
                    {hits.map((hit) => (
                      <li key={`${hit.type}-${hit.title}`}>
                        <a
                          href={hit.href}
                          onClick={() => {
                            setSearchOpen(false);
                            setQuery("");
                          }}
                          className="flex items-center justify-between gap-4 bg-paper px-4 py-3 transition-colors hover:bg-silver"
                        >
                          <span className="flex min-w-0 items-baseline gap-3">
                            <span className="shrink-0 bg-ink px-1.5 py-0.5 font-sans text-xs font-bold uppercase text-paper">
                              {hit.type}
                            </span>
                            <span className="truncate font-sans text-sm font-bold uppercase">
                              {hit.title}
                            </span>
                          </span>
                          <span className="max-sm:hidden shrink-0 items-center gap-3 font-sans text-xs uppercase text-mute sm:flex">
                            {hit.meta}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
                {query.trim().length < 2 && (
                  <p className="px-1 py-2 font-sans text-sm uppercase tracking-wide text-mute">
                    Ketik minimal 2 huruf — contoh: “fore”, “hutan”, “parkir”.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      <MobileOffcanvas open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
