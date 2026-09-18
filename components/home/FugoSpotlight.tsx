"use client";

import Reveal from "@/components/ui/Reveal";
import CountUp from "@/components/ui/CountUp";
import { IconStar, IconBed, IconArrow, IconPin } from "@/components/ui/Icons";
import { fugo } from "@/app/data/home";
import { interpolate } from "@/app/i18n/format";
import type { Dictionary } from "@/app/i18n/dictionaries";

/**
 * §03 — FUGO HOTEL BANJARMASIN · ELEVATED LUXURY STAY (mock 1:1).
 * Paper band, blueprint head with the "5 STAR PRESTIGE" plate right, then
 * a left photo diptych (riverside/cityscape caption + 180 SUITES ghost
 * numeral) and a right story column: brass kicker, heading, deck, the
 * 180/02/300/25 hairline stat grid, and the booking CTA pointing to the
 * official FUGO site. All strings flow from the locale dictionary;
 * numerals stay in data.
 */
export default function FugoSpotlight({ dict }: { dict: Dictionary }) {
  return (
    <section id="fugo" className="bg-paper text-ink">
      <div className="px-4 py-14 md:px-10 md:py-20">
        {/* blueprint section head */}
        <div className="mb-4 flex items-center gap-4">
          <span className="font-display text-xl uppercase text-brass">03</span>
          <span aria-hidden="true" className="h-px w-10 bg-brass-soft" />
          <span className="font-sans text-xs font-bold uppercase tracking-[0.24em] text-dim">
            {dict.fugo.kicker}
          </span>
        </div>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-x-10 gap-y-6 md:mb-12">
          <h2 className="max-w-3xl border-b border-ink pb-4 font-display text-[clamp(2.2rem,4vw,3.6rem)] uppercase leading-[0.95]">
            {dict.fugo.title}
          </h2>
          <span className="mb-1 border border-brass-soft px-3 py-1.5 font-sans text-xs font-bold uppercase tracking-[0.2em] text-brass">
            {dict.fugo.badge}
          </span>
        </div>

        <Reveal className="grid gap-10 lg:grid-cols-[1.05fr_1fr]">
          {/* ============ photo diptych — the mock's left imagery ============ */}
          <div className="img-plate relative min-h-[340px] border border-hairline md:min-h-[480px]">
            {/* riverside interior — supplied artwork, object-cover */}
            {/* eslint-disable-next-line @next/next/no-img-element -- supplied artwork slot, swap-ready */}
            <img
              src="/assets/img/20250212-DSC07012-scaled-1.jpg"
              alt={dict.fugo.photoAlt}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            {/* cityscape second panel (right 38%) — dusk plate until a photo lands */}
            <div
              aria-hidden="true"
              className="absolute inset-y-0 right-0 hidden w-[38%] bg-[#1a1608] md:block"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <span className="absolute bottom-[22%] right-4 font-display text-6xl uppercase text-brass-soft/50">
                180
                <span className="block font-sans text-[10px] font-bold tracking-[0.3em] text-paper/70">
                  {dict.fugo.ghostLabel}
                </span>
              </span>
            </div>

            {/* caption overlay — the mock's bottom photo strip */}
            <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-between gap-3 bg-gradient-to-t from-black/75 via-black/35 to-transparent px-5 pb-4 pt-10 text-paper">
              <div>
                <p className="font-sans text-[10px] font-bold uppercase tracking-[0.24em] text-brass-soft">
                  {dict.fugo.sanctuary}
                </p>
                <p className="mt-1 font-sans text-sm font-bold uppercase tracking-[0.12em]">
                  {dict.fugo.riverView}
                </p>
              </div>
              <span className="font-display text-xl uppercase text-paper/80">180 {dict.fugo.ghostLabel}</span>
            </div>
          </div>

          {/* ============ story column — the mock's right text ============ */}
          <div>
            <p className="font-sans text-xs font-bold uppercase tracking-[0.24em] text-brass">
              {dict.fugo.storyKicker}
            </p>
            <h3 className="mt-3 max-w-xl font-sans text-[clamp(1.3rem,2vw,1.7rem)] font-semibold leading-snug text-ink">
              {dict.fugo.story}
            </h3>

            <p className="mt-5 max-w-xl font-sans text-sm leading-relaxed text-dim">
              {dict.fugo.body}
            </p>

            {/* stat grid — the mock's 180 / 02 / 300 PAX / 25 MIN hairline plate.
                Numerals live in data; labels/units come from the dictionary. */}
            <dl className="mt-8 grid grid-cols-2 gap-px bg-hairline sm:grid-cols-4">
              {fugo.highlights.map((h, i) => {
                const t = dict.data.fugoHighlights[i];
                return (
                  <div key={h.value + i} className="bg-paper p-4">
                    <dd className="font-display text-3xl uppercase text-ink md:text-4xl">
                      <CountUp value={Number(h.value)} />
                    </dd>
                    <dt className="mt-2 font-sans text-[10px] font-bold uppercase leading-snug tracking-[0.14em] text-mute">
                      {interpolate(dict.fugo.statLabel, { label: t.label, unit: t.unit })}
                    </dt>
                  </div>
                );
              })}
            </dl>

            {/* stars + phone line */}
            <div className="mt-6 flex flex-wrap items-center gap-3" aria-label={dict.fugo.starsAria}>
              {Array.from({ length: fugo.stars }).map((_, i) => (
                <IconStar key={i} size={15} className="text-brass-soft" />
              ))}
              <span className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-dim">
                {dict.fugo.starsLabel}
              </span>
            </div>

            {/* CTA pair — booking goes to the official FUGO site;
                concierge drops to the mall's VIP inquiry form */}
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={fugo.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={interpolate(dict.fugo.bookAria, { phone: fugo.phone })}
                className="inline-flex min-h-[48px] items-center gap-2 bg-ink px-6 font-sans text-xs font-bold uppercase tracking-[0.2em] text-paper transition-colors duration-200 hover:bg-brass hover:text-ink"
              >
                <IconBed size={15} />
                {dict.fugo.bookDirect}
              </a>
              <a
                href="#location"
                className="inline-flex min-h-[48px] items-center gap-2 border border-ink bg-paper px-6 font-sans text-xs font-bold uppercase tracking-[0.2em] text-ink transition-colors duration-200 hover:bg-ink hover:text-paper"
              >
                {dict.fugo.concierge}
                <IconArrow size={14} />
              </a>
            </div>

            <p className="mt-4 flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-[0.18em] text-mute">
              <IconPin size={13} className="text-brass" />
              {dict.fugo.accessNote}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
