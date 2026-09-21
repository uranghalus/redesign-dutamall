"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
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
import { interpolate } from "@/app/i18n/format";
import type { Dictionary } from "@/app/i18n/dictionaries";

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

/** Parking stat band — numerals are universal, labels flow from the dict. */
const parkingStats = [
  { v: "2.500+", key: "cars" },
  { v: "P1–P4", key: "levels" },
  { v: "24", key: "access" },
  { v: "GPS", key: "zones" },
] as const;

/**
 * §05 — SERVICES & CONCIERGE FACILITIES (mock 1:1).
 * Platinum ground, blueprint head ("05 — VISITOR INFRASTRUCTURE") with the
 * right meta line, a 2×4 grid of icon cards (icon, name, description,
 * LOCATION · floor footer over a hairline rule), and the interactive
 * detail readout. Names/details come from the dictionary, keyed
 * positionally to the data array; ids/floors/grids stay in data.
 */
export default function Facilities({ dict }: { dict: Dictionary }) {
  const [activeId, setActiveId] = useState<FacilityId>("parking");
  const activeIndex = facilities.findIndex((f) => f.id === activeId);
  const active = facilities[activeIndex];
  const activeData = dict.data.facilities[activeIndex];

  return (
    <section id="facilities" className="bg-platinum text-ink">
      <div className="px-4 py-14 md:px-10 md:py-20">
        {/* blueprint section head */}
        <div className="mb-4 flex items-center gap-4">
          <span className="font-display text-xl uppercase text-brass">05</span>
          <span aria-hidden="true" className="h-px w-10 bg-brass-soft" />
          <span className="font-sans text-xs font-bold uppercase tracking-[0.24em] text-dim">
            {dict.facilities.kicker}
          </span>
        </div>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-x-10 gap-y-6 md:mb-12">
          <h2 className="border-b border-ink pb-4 font-display text-[clamp(2.2rem,4vw,3.6rem)] uppercase leading-[0.95]">
            {dict.facilities.title}
          </h2>
          <p className="mb-1 font-sans text-xs font-bold uppercase tracking-[0.22em] text-mute">
            {dict.facilities.meta}
          </p>
        </div>

        <Reveal className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          {/* interactive facility grid — paper cards on the platinum band */}
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {facilities.map((f, i) => {
              const Icon = icons[f.id];
              const isActive = f.id === activeId;
              const d = dict.data.facilities[i];
              return (
                <li key={f.id}>
                  <button
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActiveId(f.id)}
                    className={`flex h-full min-h-[190px] w-full flex-col border p-4 text-left transition-colors duration-200 ${
                      isActive ? "border-ink bg-ink text-paper" : "border-hairline bg-paper hover:border-ink"
                    }`}
                  >
                    <Icon size={24} className={isActive ? "text-brass-soft" : "text-ink"} />
                    <span className="mt-5 font-sans text-[15px] font-bold leading-snug">{d.name}</span>
                    <span
                      className={`mt-1 font-sans text-xs leading-snug ${
                        isActive ? "text-paper/60" : "text-mute"
                      }`}
                    >
                      {d.detail}
                    </span>
                    {/* LOCATION footer — the mock's brass wayfinding row */}
                    <span
                      aria-hidden="true"
                      className={`mt-auto flex items-center gap-2 border-t pt-2.5 font-sans text-[10px] font-bold uppercase tracking-[0.18em] ${
                        isActive ? "border-paper/25 text-brass-soft" : "border-hairline text-mute"
                      }`}
                    >
                      {dict.facilities.location}
                      <span className={isActive ? "text-paper" : "text-ink"}>{f.floor}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* detail readout — live region for the active facility */}
          <Reveal variant="ink" delay={3} className="self-start border border-ink bg-paper">
            <div className="border-b border-ink bg-ink px-5 py-3">
              <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-paper">
                {dict.facilities.detailTitle}
              </p>
            </div>
            <div className="p-5" aria-live="polite">
              <p className="font-display text-4xl uppercase">{activeData.name}</p>
              <p className="mt-3 font-sans text-sm leading-relaxed text-dim">{activeData.detail}</p>
              <dl className="mt-6 space-y-2.5 font-sans text-xs uppercase tracking-wide">
                <div className="flex justify-between border-b border-hairline pb-2">
                  <dt className="text-mute">{dict.facilities.floor}</dt>
                  <dd className="font-bold">{active.floor}</dd>
                </div>
                <div className="flex justify-between border-b border-hairline pb-2">
                  <dt className="text-mute">{dict.facilities.zone}</dt>
                  <dd className="font-bold">
                    {interpolate(dict.facilities.grid, {
                      from: String(active.grid[0]).padStart(2, "0"),
                      to: String(active.grid[1]).padStart(2, "0"),
                    })}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-mute">{dict.facilities.status}</dt>
                  <dd className="flex items-center gap-2 font-bold">
                    <span aria-hidden="true" className="inline-block size-2 bg-brass-soft" />
                    {dict.facilities.open}
                  </dd>
                </div>
              </dl>
              <a
                href="peta"
                className="mt-5 inline-flex items-center gap-2 border border-ink px-3 py-2 font-sans text-xs font-bold uppercase tracking-widest transition-colors hover:bg-ink hover:text-paper"
              >
                {dict.facilities.mapLink}
                <IconArrow size={14} />
              </a>
            </div>
          </Reveal>
        </Reveal>

        {/* parking stat band */}
        <Reveal variant="seq" as="div" className="mt-10 grid grid-cols-2 gap-px bg-hairline sm:grid-cols-4">
          {parkingStats.map((s) => (
            <div key={s.key} className="bg-paper p-5 text-center">
              <p className="font-display text-3xl uppercase text-ink md:text-4xl">{s.v}</p>
              <p className="mt-2 font-sans text-xs font-bold uppercase tracking-widest text-mute">
                {dict.facilities.parkingStats[s.key]}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
