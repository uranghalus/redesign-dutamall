"use client";

import { useMemo, useState } from "react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { BrutalButtonLink } from "@/components/ui/Button";
import { IconSearch, IconArrow } from "@/components/ui/Icons";
import { tenants, tenantCategories, type TenantCategory } from "@/app/data/home";

export default function Tenants() {
  const [category, setCategory] = useState<TenantCategory>("Semua");

  const filtered = useMemo(
    () => (category === "Semua" ? tenants : tenants.filter((t) => t.category === category)),
    [category],
  );

  const counts = useMemo(() => {
    const map = new Map<TenantCategory, number>();
    for (const c of tenantCategories) {
      map.set(c, c === "Semua" ? tenants.length : tenants.filter((t) => t.category === c).length);
    }
    return map;
  }, []);

  return (
    <Section id="tenants" className="bg-ground:bg-paper">
      <div className="px-4 py-14 md:px-10 md:py-20">
        <SectionHeading
          index="03 / DIRECTORY"
          title="TENANT & BOUTIQUE"
          right={
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-smoke">
              200+ tenant · GF–L2
            </span>
          }
        />

        {/* filter pills */}
        <div className="mb-8 flex flex-wrap gap-3" role="group" aria-label="Filter kategori tenant">
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

        {/* unit-code rows */}
        {filtered.length > 0 ? (
          <ul className="divide-y-2 divide-ink border-2 border-ink">
            {filtered.map((t) => (
              <li key={t.name}>
                <a
                  href="#tenants"
                  className="cell-checker group flex items-center gap-4 px-4 py-4 transition-colors md:gap-6 md:px-6"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center border-2 border-ink font-display text-lg uppercase leading-none">
                    {t.name.charAt(0)}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-sans text-base font-bold uppercase tracking-wide md:text-lg">
                      {t.name}
                    </span>
                    <span className="block font-mono text-[11px] uppercase tracking-wide text-smoke md:hidden">
                      {t.floor} · Unit {t.unit}
                    </span>
                  </span>
                  <span className="max-md:hidden shrink-0 items-center gap-3 md:flex">
                    <span className="font-mono text-[11px] uppercase tracking-wide text-smoke">
                      {t.category}
                    </span>
                    <span className="border border-ink px-2 py-1 font-mono text-[11px] font-bold uppercase tracking-widest">
                      {t.floor} — Unit {t.unit}
                    </span>
                  </span>
                  <IconArrow
                    size={18}
                    className="shrink-0 text-accent transition-transform duration-150 group-hover:translate-x-1.5"
                  />
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <div className="border-2 border-ink p-8 text-center">
            <IconSearch size={28} className="mx-auto mb-3" />
            <p className="font-mono text-sm font-bold uppercase tracking-wide">
              Belum ada tenant pada kategori ini di katalog contoh.
            </p>
          </div>
        )}

        {/* catalog expansion */}
        <div className="mt-8 flex flex-col items-center gap-4 border-2 border-ink bg-paper p-6 shadow-brutal-sm sm:flex-row sm:justify-between">
          <p className="font-sans text-sm leading-relaxed text-smoke">
            <strong className="font-bold text-ink">200+ tenant</strong> dari brand nasional
            &amp; internasional terdata dalam direktori lengkap.
          </p>
          <BrutalButtonLink href="#tenants" variant="primary" size="md" className="shrink-0">
            Lihat Semua 200+ Tenant
            <IconArrow size={15} />
          </BrutalButtonLink>
        </div>
      </div>
    </Section>
  );
}
