"use client";

import { useState } from "react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { IconArrow } from "@/components/ui/Icons";
import {
  IconInfo,
  IconHotel,
  IconAtm,
  IconCar,
  IconAccess,
  IconClinic,
  IconBaby,
  IconMusholla,
  IconToilet,
  IconLounge,
  IconSmoking,
} from "@/components/ui/Icons";
import { facilities, type FacilityId } from "@/app/data/home";

const icons: Record<FacilityId, (p: { size?: number; className?: string }) => React.ReactElement> = {
  concierge: IconInfo,
  "fugo-lobby": IconHotel,
  atm: IconAtm,
  "ladies-parking": IconCar,
  disability: IconAccess,
  clinic: IconClinic,
  nursery: IconBaby,
  musholla: IconMusholla,
  parking: IconCar,
  toilet: IconToilet,
  lounge: IconLounge,
  smoking: IconSmoking,
};

export default function Facilities() {
  const [activeId, setActiveId] = useState<FacilityId>("parking");
  const active = facilities.find((f) => f.id === activeId)!;

  return (
    <Section id="facilities">
      <div className="px-4 py-14 md:px-10 md:py-20">
        <SectionHeading
          index="02 / GUEST COMFORT"
          title="12 FASILITAS UTAMA"
          right={
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-smoke">
              Pilih untuk detail
            </span>
          }
        />

        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          {/* interactive facility grid — mall-map cell logic */}
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {facilities.map((f) => {
              const Icon = icons[f.id];
              const isActive = f.id === activeId;
              return (
                <li key={f.id}>
                  <button
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActiveId(f.id)}
                    className={`flex h-full min-h-[110px] w-full flex-col items-start justify-between gap-5 border-2 border-ink p-4 text-left transition-[background-color,color,box-shadow,transform] duration-150 hover:shadow-brutal-sm ${
                      isActive
                        ? "bg-ink text-paper shadow-brutal-sm"
                        : "bg-paper hover:-translate-x-[1px] hover:-translate-y-[1px]"
                    }`}
                  >
                    <span className="flex w-full items-start justify-between">
                      <Icon size={22} className={isActive ? "text-accent" : ""} />
                      <span className="font-mono text-xs font-bold uppercase tracking-widest opacity-80">
                        {f.floor}
                      </span>
                    </span>
                    <span className="font-sans text-sm font-bold uppercase leading-snug">
                      {f.name}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* detail panel — updates with the active facility */}
          <div className="self-start border-2 border-ink shadow-brutal">
            <div className="border-b-2 border-ink bg-ink px-5 py-3">
              <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-paper">
                DETAIL FASILITAS
              </p>
            </div>
            <div className="bg-paper p-5" aria-live="polite">
              <p className="font-display text-5xl uppercase leading-[0.9]">{active.name}</p>
              <p className="mt-3 font-sans text-sm leading-relaxed text-smoke">{active.detail}</p>
              <dl className="mt-6 space-y-2.5 font-mono text-xs uppercase tracking-wide">
                <div className="flex justify-between border-b border-silver pb-2">
                  <dt className="text-smoke">Lantai</dt>
                  <dd className="font-bold">{active.floor}</dd>
                </div>
                <div className="flex justify-between border-b border-silver pb-2">
                  <dt className="text-smoke">Zona</dt>
                  <dd className="font-bold">
                    GRID {String(active.grid[0]).padStart(2, "0")}–
                    {String(active.grid[1]).padStart(2, "0")}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-smoke">Status</dt>
                  <dd className="flex items-center gap-2 font-bold">
                    <span aria-hidden="true" className="inline-block size-2 bg-accent" />
                    Terbuka
                  </dd>
                </div>
              </dl>
              <a
                href="#location"
                className="mt-5 inline-flex items-center gap-2 border-2 border-ink bg-paper px-3 py-2 text-xs font-bold uppercase tracking-widest text-ink shadow-brutal-xs transition-colors hover:bg-ink hover:text-paper"
              >
                Lihat di peta lantai
                <IconArrow size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* parking stat band */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { v: "2.500+", l: "Mobil & Motor" },
            { v: "P1–P4", l: "Empat Lantai Parkir" },
            { v: "24 Jam", l: "Akses Parkir" },
            { v: "GPS", l: "Ladies & Disabilitas Zone" },
          ].map((s) => (
            <div key={s.l} className="border-2 border-ink bg-paper p-5 text-center shadow-brutal-sm">
              <p className="font-display text-3xl uppercase leading-none text-ink md:text-4xl">{s.v}</p>
              <p className="mt-2 font-mono text-xs font-bold uppercase tracking-widest text-smoke">
                {s.l}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
