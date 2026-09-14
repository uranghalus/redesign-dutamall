"use client";

import { useDeferredValue, useMemo, useRef, useState } from "react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { IconArrow, IconClose, IconRoute, IconSearch } from "@/components/ui/Icons";
import { tenants, tenantCategories, type TenantCategory } from "@/app/data/home";

const norm = (s: string) => s.toLowerCase().trim();

/**
 * Tenant directory wall — an interactive plate field, not a static grid.
 * Search composes with category pills; picking a plate opens an ink detail
 * strip (floor, unit, category) with a route cross-link to #location;
 * an atomic live status announces result counts; the empty state resets.
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
    <Section id="tenants" className="bg-ground:bg-paper">
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
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-smoke">
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
              className="w-full border-2 border-ink bg-paper py-2.5 pl-10 pr-10 font-mono text-xs font-bold uppercase tracking-wide placeholder:font-normal placeholder:text-smoke focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            />
            {query !== "" && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  searchRef.current?.focus();
                }}
                aria-label="Bersihkan pencarian"
                className="absolute right-2 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center border-2 border-ink bg-paper transition-colors hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <IconClose size={11} />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-3" role="group" aria-label="Filter kategori tenant">
            {tenantCategories.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={category === c}
                onClick={() => setCategory(c)}
                className={`border-2 border-ink px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest transition-colors ${
                  category === c ? "bg-ink text-paper" : "bg-paper hover:bg-silver"
                }`}
              >
                {c}
                <span className={`ml-2 ${category === c ? "text-accent" : "text-smoke"}`}>
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
          className="mb-5 font-mono text-[11px] font-bold uppercase tracking-widest text-smoke"
        >
          {status}
        </p>

        {/* detail strip — the picked plate's wayfinding readout */}
        {pickedTenant && (
          <div className="mb-6 border-2 border-ink bg-ink p-4 text-paper md:p-5">
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
                  className="flex size-10 items-center justify-center border-2 border-paper font-display text-xl uppercase leading-none"
                >
                  {pickedTenant.name.charAt(0)}
                </span>
              )}
              <div>
                <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-paper/60">
                  Terpilih
                </p>
                <p className="font-display text-2xl uppercase leading-tight">
                  {pickedTenant.name}
                </p>
              </div>
              <dl className="flex gap-6 font-mono text-[11px] uppercase tracking-widest">
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
                  className="flex flex-1 items-center justify-center gap-2 border-2 border-ink bg-accent px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest text-ink transition-colors hover:bg-paper md:flex-none"
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
                  className="flex-1 border-2 border-paper/40 px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest transition-colors hover:bg-paper hover:text-ink md:flex-none"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}

        {/* logo wall — one plate field, hairline seams; plates select */}
        {matched.length > 0 ? (
          <ul className="grid grid-cols-2 gap-px border border-ink bg-ink sm:grid-cols-3 lg:grid-cols-4">
            {matched.map((t) => {
              const selected = pickedTenant?.name === t.name;
              return (
                <li key={t.name}>
                  <button
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setPicked(selected ? null : t.name)}
                    aria-label={`${t.name} — ${t.category}, ${t.floor}, Unit ${t.unit}`}
                    className={`cell-checker group relative flex h-full w-full min-h-[124px] flex-col items-center justify-between gap-2 p-4 text-center transition-[background-color,transform,box-shadow] duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                      selected ? "bg-silver" : "bg-paper hover:bg-silver"
                    } md:hover:-translate-x-[1px] md:hover:-translate-y-[1px] md:hover:shadow-brutal-sm`}
                  >
                    {selected && (
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 border-[3px] border-accent"
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
                        className="mx-auto flex size-14 items-center justify-center border-2 border-ink font-display text-2xl uppercase leading-none md:size-16"
                      >
                        {t.name.charAt(0)}
                      </span>
                    )}
                    <span className="block w-full">
                      <span className="block truncate font-sans text-sm font-bold uppercase tracking-wide md:text-base">
                        {t.name}
                      </span>
                      <span
                        className={`mt-0.5 block font-mono text-[11px] font-bold uppercase tracking-widest transition-colors ${
                          selected ? "text-ink" : "text-smoke group-hover:text-ink"
                        }`}
                      >
                        {t.floor} · {t.unit}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}

            {/* promo tile — closes the grid as the directory CTA */}
            <li className="col-span-2">
              <a
                href="#tenants"
                aria-label="Lihat direktori lengkap — 200+ tenant, GF sampai L2"
                className="group flex h-full min-h-[124px] flex-col justify-between gap-3 bg-ink p-4 text-paper transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:p-5"
              >
                <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-paper/70">
                  +200 brand lainnya · GF–L2
                </span>
                <span className="flex items-center justify-between gap-3">
                  <span className="font-display text-2xl uppercase leading-[0.95] md:text-3xl">
                    Lihat direktori
                    <br />
                    lengkap<span className="text-accent">.</span>
                  </span>
                  <IconArrow
                    size={22}
                    className="shrink-0 text-accent transition-transform duration-150 group-hover:translate-x-1.5"
                  />
                </span>
              </a>
            </li>
          </ul>
        ) : (
          /* empty state — always offers recovery, never a dead end */
          <div className="border-2 border-ink p-8 text-center md:p-10">
            <p className="font-display text-3xl uppercase leading-none">
              Tidak ada hasil<span className="text-accent">.</span>
            </p>
            <p className="mx-auto mt-3 max-w-md font-mono text-xs uppercase tracking-wide text-smoke">
              {q ? `Tidak ada tenant cocok "${query.trim()}"` : "Kategori ini belum berisi tenant"}
              {category !== "Semua" ? ` di kategori ${category}` : ""}. Coba kata kunci lain,
              atau lihat seluruh katalog.
            </p>
            <button
              type="button"
              onClick={resetAll}
              className="mt-5 border-2 border-ink bg-ink px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-paper transition-colors hover:bg-accent hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Lihat semua tenant
            </button>
          </div>
        )}
      </div>
    </Section>
  );
}
