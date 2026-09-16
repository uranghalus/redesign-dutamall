"use client";

import { useDeferredValue, useMemo, useRef, useState } from "react";
import { Section, SectionHeading } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { IconArrow, IconClose, IconRoute, IconSearch } from "@/components/ui/Icons";
import { tenants, tenantCategories, type TenantCategory } from "@/app/data/home";

const norm = (s: string) => s.toLowerCase().trim();

/**
 * Tenant directory wall — an interactive plate field, not a static grid.
 * Search composes with category pills; picking a plate opens a detail strip
 * (floor, unit, category) with a route cross-link to #location; an atomic
 * live status announces result counts; the empty state resets.
 * 2026-09-16: restyled to the LWT hairline language — 1px seams on white,
 * fill-inversion hover, no lift, and the directory CTA as an LWT outlink
 * plate (red headline on hover, reveal-on-hover sub, 45°-arrow box).
 */
export default function Tenants() {
  const [category, setCategory] = useState<TenantCategory>("Semua");
  const [query, setQuery] = useState("");
  const [picked, setPicked] = useState<string | null>(null);
  const deferredQuery = useDeferredValue(query);
  const searchRef = useRef<HTMLInputElement>(null);

  const counts = useMemo(() => {
    const map = new Map<TenantCategory, number>();
    for (const c of tenantCategories) {
      map.set(c, c === "Semua" ? tenants.length : tenants.filter((t) => t.category === c).length);
    }
    return map;
  }, []);

  const q = norm(deferredQuery);
  const matched = useMemo(() => {
    const base = category === "Semua" ? tenants : tenants.filter((t) => t.category === category);
    if (!q) return base;
    return base.filter((t) =>
      [t.name, t.unit, t.floor, t.category].some((v) => norm(v).includes(q)),
    );
  }, [category, q]);

  // Picked plate only stays pinned while it survives the active filter/search.
  const pickedTenant = matched.find((t) => t.name === picked) ?? null;

  const status = `${matched.length} tenant${q ? ` untuk "${query.trim()}"` : ""}${
    category !== "Semua" ? ` · ${category}` : ""
  }`;

  const resetAll = () => {
    setQuery("");
    setCategory("Semua");
    setPicked(null);
    searchRef.current?.focus();
  };

  return (
    <Section id="tenants">
      <div
        className="px-4 py-14 md:px-10 md:py-20"
        onKeyDown={(e) => {
          if (e.key === "Escape") setPicked(null);
        }}
      >
        <SectionHeading
          index="03 / DIRECTORY"
          title="TENANT & BOUTIQUE"
          right={
            <span className="font-sans text-xs font-bold uppercase tracking-widest text-mute">
              200+ tenant · GF–L2
            </span>
          }
        />

        {/* search + category pills */}
        <div className="mb-3 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="relative md:w-80">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
            >
              <IconSearch size={16} />
            </span>
            <input
              ref={searchRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari tenant, unit, lantai…"
              aria-label="Cari tenant, unit, atau lantai"
              className="w-full border border-ink bg-paper py-2.5 pl-10 pr-10 font-sans text-sm uppercase tracking-wide placeholder:text-mute focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            />
            {query !== "" && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  searchRef.current?.focus();
                }}
                aria-label="Bersihkan pencarian"
                className="absolute right-2 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center text-mute transition-colors hover:text-accent"
              >
                <IconClose size={12} />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter kategori tenant">
            {tenantCategories.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={category === c}
                onClick={() => setCategory(c)}
                className={`border px-4 py-2 font-sans text-xs font-bold uppercase tracking-widest transition-colors ${
                  category === c ? "border-ink bg-ink text-paper" : "border-hairline bg-paper hover:border-ink"
                }`}
              >
                {c}
                <span className={`ml-2 ${category === c ? "text-accent" : "text-mute"}`}>
                  {counts.get(c)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* atomic live result status */}
        <p
          role="status"
          aria-atomic="true"
          className="mb-5 font-sans text-xs font-bold uppercase tracking-widest text-mute"
        >
          {status}
        </p>

        {/* detail strip — the picked plate's wayfinding readout */}
        {pickedTenant && (
          <div className="mb-6 border border-ink bg-ink p-4 text-paper md:p-5">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
              {pickedTenant.image ? (
                // eslint-disable-next-line @next/next/no-img-element -- supplied logo slot, swap-ready
                <img
                  src={pickedTenant.image}
                  alt=""
                  className="h-10 w-auto max-w-[120px] bg-paper object-contain p-1"
                />
              ) : (
                <span
                  aria-hidden="true"
                  className="flex size-10 items-center justify-center border border-paper font-display text-xl uppercase"
                >
                  {pickedTenant.name.charAt(0)}
                </span>
              )}
              <div>
                <p className="font-sans text-xs font-bold uppercase tracking-widest text-paper/60">
                  Terpilih
                </p>
                <p className="font-display text-2xl uppercase">{pickedTenant.name}</p>
              </div>
              <dl className="flex gap-6 font-sans text-xs uppercase tracking-widest">
                <div>
                  <dt className="text-paper/60">Lantai</dt>
                  <dd className="font-bold">{pickedTenant.floor}</dd>
                </div>
                <div>
                  <dt className="text-paper/60">Unit</dt>
                  <dd className="font-bold text-accent">{pickedTenant.unit}</dd>
                </div>
                <div>
                  <dt className="text-paper/60">Kategori</dt>
                  <dd className="font-bold">{pickedTenant.category}</dd>
                </div>
              </dl>
              <div className="flex w-full gap-3 md:ml-auto md:w-auto">
                <a
                  href="#location"
                  className="flex flex-1 items-center justify-center gap-2 border border-accent bg-accent px-4 py-2 font-sans text-xs font-bold uppercase tracking-widest text-paper transition-colors hover:bg-ink hover:border-ink md:flex-none"
                >
                  <IconRoute size={14} />
                  Lihat rute
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setPicked(null);
                    searchRef.current?.focus();
                  }}
                  className="flex-1 border border-paper/40 px-4 py-2 font-sans text-xs font-bold uppercase tracking-widest transition-colors hover:bg-paper hover:text-ink md:flex-none"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}

        {/* logo wall — one plate field, 1px hairline seams on white */}
        {matched.length > 0 ? (
          <Reveal variant="ink" as="ul" className="grid grid-cols-2 gap-px bg-hairline sm:grid-cols-3 lg:grid-cols-4">
            {matched.map((t) => {
              const selected = pickedTenant?.name === t.name;
              return (
                <li key={t.name}>
                  <button
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setPicked(selected ? null : t.name)}
                    aria-label={`${t.name} — ${t.category}, ${t.floor}, Unit ${t.unit}`}
                    className={`group relative flex h-full w-full min-h-[124px] flex-col items-center justify-between gap-2 p-4 text-center transition-colors duration-200 ${
                      selected ? "bg-silver" : "bg-paper hover:bg-silver"
                    }`}
                  >
                    {selected && (
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 border border-accent"
                      />
                    )}
                    {selected && (
                      <span aria-hidden="true" className="absolute right-0 top-0 size-2.5 bg-accent" />
                    )}
                    {t.image ? (
                      // eslint-disable-next-line @next/next/no-img-element -- supplied logo slot, swap-ready
                      <img
                        src={t.image}
                        alt=""
                        loading="lazy"
                        className="mx-auto max-h-14 w-auto max-w-[75%] object-contain md:max-h-16"
                      />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="mx-auto flex size-14 items-center justify-center border border-ink font-display text-2xl uppercase md:size-16"
                      >
                        {t.name.charAt(0)}
                      </span>
                    )}
                    <span className="block w-full">
                      <span className="block truncate font-sans text-sm font-bold uppercase tracking-wide md:text-base">
                        {t.name}
                      </span>
                      <span
                        className={`mt-0.5 block font-sans text-xs font-bold uppercase tracking-widest transition-colors ${
                          selected ? "text-ink" : "text-mute group-hover:text-ink"
                        }`}
                      >
                        {t.floor} · {t.unit}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </Reveal>
        ) : (
          /* empty state — always offers recovery, never a dead end */
          <div className="border border-ink p-8 text-center md:p-10">
            <p className="font-display text-3xl uppercase">
              Tidak ada hasil<span className="text-accent">.</span>
            </p>
            <p className="mx-auto mt-3 max-w-md font-sans text-sm uppercase tracking-wide text-mute">
              {q ? `Tidak ada tenant cocok "${query.trim()}"` : "Kategori ini belum berisi tenant"}
              {category !== "Semua" ? ` di kategori ${category}` : ""}. Coba kata kunci lain,
              atau lihat seluruh katalog.
            </p>
            <button
              type="button"
              onClick={resetAll}
              className="mt-5 border border-ink bg-ink px-5 py-2.5 font-sans text-xs font-bold uppercase tracking-widest text-paper transition-colors hover:bg-accent hover:border-accent"
            >
              Lihat semua tenant
            </button>
          </div>
        )}

        {/* directory band — the LWT outlink plate: bordered box whose headline
            turns red on hover, sub-description reveals, arrow rotates 45°.
            The link box covers headline + arrow; the chip row below is a REAL
            second filter control (nested interactive elements are invalid, so
            the chips are siblings, not children, of the anchor). */}
        <Reveal variant="ink" className="mt-10 border border-ink">
          <div className="bg-paper p-5 md:p-6">
            <a
              href="#tenants"
              aria-label="Lihat direktori lengkap — 200+ tenant, GF sampai L2"
              className="group flex flex-wrap items-center justify-between gap-x-8 gap-y-4"
            >
              <div className="max-w-xl">
                <p className="font-sans text-xs font-bold uppercase tracking-widest text-mute">
                  +200 brand lainnya · GF–L2
                </p>
                <p className="mt-2 font-display text-4xl uppercase leading-[1.05] transition-colors duration-200 group-hover:text-accent md:text-5xl">
                  Lihat direktori lengkap
                  <IconArrow
                    size={28}
                    className="ml-3 inline-block rotate-45 opacity-0 transition-all duration-300 group-hover:rotate-0 group-hover:opacity-100"
                  />
                </p>
                <p className="mt-1 max-h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-16 group-hover:opacity-100">
                  <span className="font-sans text-sm text-dim">
                    200+ tenant — fashion, F&amp;B, beauty, dan gaya hidup di GF–L2.
                  </span>
                </p>
              </div>
              <span className="flex size-12 items-center justify-center border border-ink transition-colors duration-200 group-hover:border-accent group-hover:bg-accent group-hover:text-paper md:size-14">
                <IconArrow size={22} />
              </span>
            </a>
            <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-2 border-t border-hairline pt-4" role="group" aria-label="Filter kategori dari indeks bawah">
              {tenantCategories.map((c) => {
                const active = c === category;
                return (
                  <button
                    key={c}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setCategory(c)}
                    className={`border px-2 py-1 font-sans text-xs font-bold uppercase tracking-widest transition-colors ${
                      active
                        ? "border-accent bg-accent text-paper"
                        : "border-transparent text-mute hover:border-ink hover:text-ink"
                    }`}
                  >
                    {c}
                  </button>
                );
              })}
              <span className="ml-auto font-sans text-xs font-bold uppercase tracking-widest text-mute">
                {matched.length}/{tenants.length} ditampilkan
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
