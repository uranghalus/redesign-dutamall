"use client";

import { useState } from "react";
import { Section, SectionHeading } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import CountUp from "@/components/ui/CountUp";
import { BrutalButtonLink } from "@/components/ui/Button";
import { IconStar, IconBed, IconArrow, IconPhone } from "@/components/ui/Icons";
import { fugo } from "@/app/data/home";

export default function FugoSpotlight() {
  const [nights, setNights] = useState(1);
  const [guests, setGuests] = useState(2);
  const total = nights * 850_000;

  return (
    <Section id="fugo" dark>
      <div className="px-4 py-14 md:px-10 md:py-20">
        <SectionHeading index="04 / HOSPITALITY" title="FUGO HOTEL & SUITES" dark />

        <Reveal className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          {/* story + facts */}
          <div>
            <div className="flex items-center gap-2" aria-label="Hotel bintang 4">
              {Array.from({ length: fugo.stars }).map((_, i) => (
                <IconStar key={i} size={16} className="text-accent" />
              ))}
              <span className="ml-2 font-mono text-xs font-bold uppercase tracking-widest text-paper/70">
                Hotel Bintang 4 · Di Atas Mall
              </span>
            </div>

            <p className="mt-6 font-display text-4xl uppercase leading-[0.95] md:text-6xl">
              PANORAMA <span className="text-outline-paper">KOTA</span>
              <br />
              <span className="text-accent">BANJARMASIN</span> LANGSUNG
              <br />
              DARI LOBI MALL
            </p>

            <p className="mt-6 max-w-xl font-sans text-base leading-relaxed text-ash">
              180 kamar Deluxe &amp; Suite di lantai teratas Duta Mall. Dua restoran
              fine dining, Grand Ballroom berkapasitas 300 pax, dan akses langsung ke
              cinema serta ritel mall — 25 menit dari Bandara Samsudin Noor.
            </p>

            {/* facts — flush stat plate: hairline grid seams, no outer frame */}
            <dl className="mt-10 grid grid-cols-2 gap-px border-paper/40 bg-paper/15 max-md:border-0 sm:grid-cols-4 md:border-2">
              {fugo.highlights.map((h) => (
                <div key={h.label} className="bg-ink p-4">
                  <dt className="font-mono text-xs font-bold uppercase tracking-widest text-paper/70">
                    {h.label}
                  </dt>
                  <dd className="mt-2 font-display text-4xl uppercase leading-none">
                    <CountUp value={Number(h.value)} />
                  </dd>
                  <dd className="mt-1 font-mono text-xs uppercase tracking-wide text-paper/70">
                    {h.unit}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="tel:+625113278888"
                className="inline-flex items-center gap-2 border-2 border-paper/40 px-4 py-3 font-mono text-xs font-bold uppercase tracking-widest text-paper underline-offset-4 transition-colors hover:border-accent hover:text-accent"
              >
                <IconPhone size={15} />
                {fugo.phone}
              </a>
            </div>
          </div>

          {/* book direct widget — flush counter plate, hairline seams */}
          <Reveal variant="ink" delay={3} className="border-paper/40 bg-ink max-md:border-b max-md:border-paper/15 md:border-2">
            <div className="border-paper/40 bg-accent px-5 py-3 max-md:border-b max-md:border-paper/15 md:border-b-2">
              <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-ink">
                BOOK DIRECT — BEST RATE
              </p>
            </div>
            <div className="p-5">
              <label className="block font-mono text-xs font-bold uppercase tracking-widest text-paper/70">
                Malam
                <div className="mt-2 flex items-stretch justify-between border-2 border-paper/40 py-1">
                  <button
                    type="button"
                    onClick={() => setNights((n) => Math.max(1, n - 1))}
                    disabled={nights <= 1}
                    aria-label="Kurangi malam"
                    className="px-4 font-display text-2xl transition-colors enabled:hover:bg-paper enabled:hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    −
                  </button>
                  <span
                    className="flex flex-1 items-center justify-center font-display text-4xl"
                    aria-live="polite"
                  >
                    {nights}
                  </span>
                  <button
                    type="button"
                    onClick={() => setNights((n) => Math.min(14, n + 1))}
                    disabled={nights >= 14}
                    aria-label="Tambah malam"
                    className="px-4 font-display text-2xl transition-colors enabled:hover:bg-paper enabled:hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    +
                  </button>
                </div>
              </label>

              <label className="mt-5 block font-mono text-xs font-bold uppercase tracking-widest text-paper/70">
                Tamu
                <div className="mt-2 grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((g) => (
                    <button
                      key={g}
                      type="button"
                      aria-pressed={guests === g}
                      onClick={() => setGuests(g)}
                      className={`border-2 py-2 font-mono text-sm font-bold transition-colors ${
                        guests === g
                          ? "border-accent bg-accent text-ink"
                          : "border-paper/40 text-paper hover:border-paper"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </label>

              <div className="mt-6 border-t border-paper/15 pt-4">
                <div className="flex items-end justify-between">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-paper/70">
                    Estimasi · {nights} malam × {guests} tamu
                  </span>
                  <span className="font-display text-4xl leading-none">
                    {total.toLocaleString("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 })}
                  </span>
                </div>
                <p className="mt-1 font-mono text-xs uppercase tracking-wide text-paper/60">
                  Ilustrasi tarif — konfirmasi saat reservasi.
                </p>
              </div>

              <BrutalButtonLink
                href="tel:+625113278888"
                variant="accent"
                size="lg"
                className="mt-6 w-full"
                aria-label={`Reservasi via telepon ${fugo.phone}`}
              >
                <IconBed size={17} />
                Reservasi Sekarang
              </BrutalButtonLink>
              <BrutalButtonLink
                href="#whatson"
                variant="outlinePaper"
                size="sm"
                className="mt-3 w-full"
              >
                Meeting &amp; Event Inquiries
                <IconArrow size={14} />
              </BrutalButtonLink>
            </div>
          </Reveal>
        </Reveal>
      </div>
    </Section>
  );
}
