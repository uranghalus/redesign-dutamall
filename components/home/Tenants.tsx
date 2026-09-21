"use client";

import { useDeferredValue, useMemo, useRef, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import { IconArrow, IconClose, IconSearch } from "@/components/ui/Icons";
import { tenants, type Tenant } from "@/app/data/home";
import { interpolate } from "@/app/i18n/format";
import type { Dictionary } from "@/app/i18n/dictionaries";

const norm = (s: string) => s.toLowerCase().trim();

/* raw floor values on the data + their dictionary keys */
const floorKeys = [
  { key: "all", value: null },
  { key: "ground", value: "Ground Fl" },
  { key: "first", value: "1st Fl" },
  { key: "second", value: "2nd Fl" },
  { key: "p2", value: "P2" },
] as const;
type FloorKey = (typeof floorKeys)[number]["key"];

const categoryKeys = ["all", "beauty", "fnb", "fashion"] as const;
type CategoryKey = (typeof categoryKeys)[number];

const categoryOf = (t: Tenant): CategoryKey =>
  t.category === "Beauty & Wellness" ? "beauty" : t.category === "F&B & Coffee" ? "fnb" : "fashion";

/**
 * §01 — ARCHITECTURAL DIRECTORY / TENANTS (mock 1:1).
 * Blueprint section head (brass kicker + display title, floor chips right),
 * numbered tenant cards (index, floor plate, name, category line, open-hours
 * footer with a brass arrow), and the "showing 10 of 200+" meta strip.
 * Search, category + floor filters, the picked-detail strip and the live
 * result status keep their a11y logic; the visual language is the mock's.
 */
export default function Tenants({ dict }: { dict: Dictionary }) {
  const [category, setCategory] = useState<CategoryKey>("all");
  const [floor, setFloor] = useState<FloorKey>("all");
  const [query, setQuery] = useState("");
  const [picked, setPicked] = useState<string | null>(null);
  const deferredQuery = useDeferredValue(query);
  const searchRef = useRef<HTMLInputElement>(null);

  const counts = useMemo(() => {
    const map = new Map<CategoryKey, number>();
    for (const c of categoryKeys) {
      map.set(c, c === "all" ? tenants.length : tenants.filter((t) => categoryOf(t) === c).length);
    }
    return map;
  }, []);

  const q = norm(deferredQuery);
  const matched = useMemo(() => {
    const base = category === "all" ? tenants : tenants.filter((t) => categoryOf(t) === category);
    const floorValue = floorKeys.find((f) => f.key === floor)?.value;
    const floored = floorValue ? base.filter((t) => t.floor === floorValue) : base;
    if (!q) return floored;
    return floored.filter((t) =>
      [t.name, t.unit, t.floor, t.category].some((v) => norm(v).includes(q)),
    );
  }, [category, floor, q]);

  // Picked card only stays pinned while it survives the active filter/search.
  const pickedTenant = matched.find((t) => t.name === picked) ?? null;

  const status = interpolate(dict.tenants.status, {
    count: matched.length,
    forQuery: q ? interpolate(dict.tenants.statusFor, { q: query.trim() }) : "",
    category: category !== "all" ? ` · ${dict.tenants.categories[category]}` : "",
  });

  const resetAll = () => {
    setQuery("");
    setCategory("all");
    setFloor("all");
    setPicked(null);
    searchRef.current?.focus();
  };

  return (
    <section id="tenants" className="bg-paper text-ink">
      <div
        className="px-4 py-14 md:px-10 md:py-20"
        onKeyDown={(e) => {
          if (e.key === "Escape") setPicked(null);
        }}
      >
        {/* ============ blueprint section head (mock: 01 — kicker row) ============ */}
        <div className="mb-4 flex items-center gap-4">
          <span className="font-display text-xl uppercase text-brass">01</span>
          <span aria-hidden="true" className="h-px w-10 bg-brass-soft" />
          <span className="font-sans text-xs font-bold uppercase tracking-[0.24em] text-dim">
            {dict.tenants.kicker}
          </span>
        </div>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-x-10 gap-y-6 md:mb-12">
          <h2 className="border-b border-ink pb-4 font-display text-[clamp(2.2rem,4vw,3.6rem)] uppercase leading-[0.95]">
            {dict.tenants.title}
          </h2>

          {/* floor chips — the mock's filter row */}
          <div className="flex flex-wrap items-center gap-2 pb-1" role="group" aria-label={dict.tenants.floorLabel}>
            {floorKeys.map((f) => (
              <button
                key={f.key}
                type="button"
                aria-pressed={floor === f.key}
                onClick={() => setFloor(f.key)}
                className={`border px-4 py-2 font-sans text-xs font-bold uppercase tracking-widest transition-colors ${
                  floor === f.key
                    ? "border-ink bg-ink text-paper"
                    : "border-hairline bg-paper text-dim hover:border-ink hover:text-ink"
                }`}
              >
                {dict.tenants.floors[f.key]}
              </button>
            ))}
          </div>
        </div>

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
              placeholder={dict.tenants.searchPlaceholder}
              aria-label={dict.tenants.searchAria}
              className="w-full border border-ink bg-paper py-2.5 pl-10 pr-10 font-sans text-sm uppercase tracking-wide placeholder:text-mute focus:outline-none focus:ring-2 focus:ring-brass focus:ring-offset-2"
            />
            {query !== "" && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  searchRef.current?.focus();
                }}
                aria-label={dict.tenants.clearSearch}
                className="absolute right-2 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center text-mute transition-colors hover:text-brass"
              >
                <IconClose size={12} />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2" role="group" aria-label={dict.tenants.categoryAria}>
            {categoryKeys.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={category === c}
                onClick={() => setCategory(c)}
                className={`border px-4 py-2 font-sans text-xs font-bold uppercase tracking-widest transition-colors ${
                  category === c ? "border-ink bg-ink text-paper" : "border-hairline bg-paper hover:border-ink"
                }`}
              >
                {dict.tenants.categories[c]}
                <span className={`ml-2 ${category === c ? "text-brass-soft" : "text-mute"}`}>
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

        {/* detail strip — the picked card's wayfinding readout */}
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
                  {dict.tenants.picked}
                </p>
                <p className="font-display text-2xl uppercase">{pickedTenant.name}</p>
              </div>
              <dl className="flex gap-6 font-sans text-xs uppercase tracking-widest">
                <div>
                  <dt className="text-paper/60">{dict.tenants.floor}</dt>
                  <dd className="font-bold">{pickedTenant.floor}</dd>
                </div>
                <div>
                  <dt className="text-paper/60">{dict.tenants.unit}</dt>
                  <dd className="font-bold text-brass-soft">{pickedTenant.unit}</dd>
                </div>
                <div>
                  <dt className="text-paper/60">{dict.tenants.category}</dt>
                  <dd className="font-bold">{dict.data.tenants.categories[categoryOf(pickedTenant) as Exclude<CategoryKey, "all">]}</dd>
                </div>
              </dl>
              <div className="flex w-full gap-3 md:ml-auto md:w-auto">
                <a
                  href="#location"
                  className="flex flex-1 items-center justify-center gap-2 border border-brass-soft bg-brass-soft px-4 py-2 font-sans text-xs font-bold uppercase tracking-widest text-ink transition-colors hover:bg-paper hover:border-paper md:flex-none"
                >
                  {dict.tenants.seeRoute}
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setPicked(null);
                    searchRef.current?.focus();
                  }}
                  className="flex-1 border border-paper/40 px-4 py-2 font-sans text-xs font-bold uppercase tracking-widest transition-colors hover:bg-paper hover:text-ink md:flex-none"
                >
                  {dict.tenants.closeDetail}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* tenant cards — the mock's numbered directory cards */}
        {matched.length > 0 ? (
          <Reveal variant="seq" as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {matched.map((t, i) => {
              const selected = pickedTenant?.name === t.name;
              return (
                <li key={t.name}>
                  <button
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setPicked(selected ? null : t.name)}
                    aria-label={`${t.name} — ${t.category}, ${t.floor}, Unit ${t.unit}`}
                    className={`group flex h-full min-h-[190px] w-full flex-col border p-4 text-left transition-colors duration-200 ${
                      selected
                        ? "border-brass-soft bg-silver"
                        : "border-hairline bg-paper hover:border-ink"
                    }`}
                  >
                    {/* index + floor plate */}
                    <span className="flex items-start justify-between gap-3">
                      <span className={`font-display text-2xl uppercase ${selected ? "text-brass" : "text-ink"}`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="border border-hairline bg-bone px-2 py-1 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-dim">
                        {t.floor}
                      </span>
                    </span>

                    {/* identity */}
                    <span className="mt-auto block w-full">
                      <span className="block truncate font-sans text-base font-bold uppercase tracking-wide">
                        {t.name}
                      </span>
                      <span className="mt-0.5 block font-sans text-xs font-semibold uppercase tracking-[0.14em] text-mute">
                        {t.category}
                      </span>
                    </span>

                    {/* open-hours footer — the mock's brass hours row */}
                    <span
                      aria-hidden="true"
                      className={`mt-3 flex items-center justify-between border-t pt-2.5 font-sans text-xs font-bold uppercase tracking-[0.18em] ${
                        selected ? "border-brass-soft text-brass" : "border-hairline text-mute group-hover:text-brass"
                      }`}
                    >
                      {dict.tenants.openHours}
                      <IconArrow
                        size={13}
                        className="transition-transform duration-300 group-hover:translate-x-0.5"
                      />
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
              {dict.tenants.emptyTitle}
            </p>
            <p className="mx-auto mt-3 max-w-md font-sans text-sm uppercase tracking-wide text-mute">
              {q
                ? interpolate(dict.tenants.emptyMatch, { q: query.trim() })
                : dict.tenants.emptyNoQuery}
              {category !== "all"
                ? interpolate(dict.tenants.emptyInCategory, { c: dict.tenants.categories[category] })
                : ""}
              {floor !== "all"
                ? interpolate(dict.tenants.emptyOnFloor, { f: dict.tenants.floors[floor] })
                : ""}.
              {dict.tenants.emptyHint}
            </p>
            <button
              type="button"
              onClick={resetAll}
              className="mt-5 border border-ink bg-ink px-5 py-2.5 font-sans text-xs font-bold uppercase tracking-widest text-paper transition-colors hover:bg-brass hover:border-brass"
            >
              {dict.tenants.emptyReset}
            </button>
          </div>
        )}

        {/* meta strip — the mock's "SHOWING 10 OF 200+" row */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-ink pt-4">
          <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-dim">
            {interpolate(dict.tenants.showing, { shown: matched.length })}
          </p>
          {/* /peta is desktop-only — hidden on mobile with the map */}
          <a
            href="peta"
            aria-label={dict.tenants.showingAria}
            className="group hidden items-center gap-2 font-sans text-xs font-bold uppercase tracking-[0.2em] text-ink transition-colors hover:text-brass md:inline-flex"
          >
            {dict.tenants.showingLink}
            <IconArrow
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
