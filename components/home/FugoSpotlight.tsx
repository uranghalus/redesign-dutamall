"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import CountUp from "@/components/ui/CountUp";
import { LwtButtonLink } from "@/components/ui/Button";
import { IconStar, IconBed, IconArrow, IconPhone } from "@/components/ui/Icons";
import { fugo } from "@/app/data/home";

/**
 * FUGO spotlight — the LWT §sectionEvent grammar: a sticky left menu
 * (section index in League Gothic) and a card column to its right.
 * The booking widget keeps its logic; its chrome becomes LWT hairline
 * on the black plate with the red CTA.
 */
export default function FugoSpotlight() {
  const [nights, setNights] = useState(1);
  const [guests, setGuests] = useState(2);
  const total = nights * 850_000;

  const menu = [
    { n: "01", label: "Hotel", href: "#fugo", active: true },
    { n: "02", label: "Fasilitas", href: "#facilities" },
    { n: "03", label: "Lokasi", href: "#location" },
  ];

  return (
    <Section id="fugo" dark>
      <div className="flex gap-10 px-4 py-14 md:px-10 md:py-20">
        {/* sticky left menu — LWT leftMenuBox */}
        <nav
          aria-label="Indeks bagian"
          className="hidden shrink-0 lg:sticky lg:top-[calc(max(2.4em,1.6667vw)+90px)] lg:block lg:self-start"
        >
          <ul className="flex flex-col gap-1">
            {menu.map((m) => (
              <li key={m.n}>
                <a
                  href={m.href}
                  className={`group flex items-baseline gap-3 font-display text-3xl uppercase transition-colors ${
                    m.active ? "text-accent" : "text-paper/40 hover:text-paper"
                  }`}
                >
                  <span className="font-sans text-xs font-bold tracking-widest">{m.n}</span>
                  {m.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <Reveal className="min-w-0 flex-1">
          <div className="grid gap-10 xl:grid-cols-[1.5fr_1fr]">
            {/* story + facts */}
            <div>
              <div className="flex items-center gap-2" aria-label="Hotel bintang 4">
                {Array.from({ length: fugo.stars }).map((_, i) => (
                  <IconStar key={i} size={16} className="text-accent" />
                ))}
                <span className="ml-2 font-sans text-xs font-bold uppercase tracking-widest text-paper/70">
                  Hotel Bintang 4 · Di Atas Mall
                </span>
              </div>

              <h2 className="mt-6 font-display text-4xl uppercase md:text-6xl">
                PANORAMA <span className="text-paper/40">KOTA</span>
                <br />
                <span className="text-accent">BANJARMASIN</span> LANGSUNG
                <br />
                DARI LOBI MALL
              </h2>

              <p className="mt-6 max-w-xl font-sans text-base leading-relaxed text-paper/70">
                180 kamar Deluxe &amp; Suite di lantai teratas Duta Mall. Dua restoran
                fine dining, Grand Ballroom berkapasitas 300 pax, dan akses langsung ke
                cinema serta ritel mall — 25 menit dari Bandara Samsudin Noor.
              </p>

              {/* facts — hairline-seamed stat plate */}
              <dl className="mt-10 grid grid-cols-2 gap-px bg-paper/20 sm:grid-cols-4">
                {fugo.highlights.map((h) => (
                  <div key={h.label} className="bg-ink p-4">
                    <dt className="font-sans text-xs font-bold uppercase tracking-widest text-paper/70">
                      {h.label}
                    </dt>
                    <dd className="mt-2 font-display text-4xl uppercase">
                      <CountUp value={Number(h.value)} />
                    </dd>
                    <dd className="mt-1 font-sans text-xs uppercase tracking-wide text-paper/70">
                      {h.unit}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="tel:+625113278888"
                  className="inline-flex items-center gap-2 border border-paper/40 px-4 py-3 font-sans text-xs font-bold uppercase tracking-widest underline-offset-4 transition-colors hover:border-accent hover:text-accent"
                >
                  <IconPhone size={15} />
                  {fugo.phone}
                </a>
              </div>
            </div>

            {/* book direct widget — black plate, hairline seams, red CTA */}
            <Reveal variant="ink" delay={3} className="border border-paper/30 bg-ink">
              <div className="border-b border-paper/30 bg-accent px-5 py-3">
                <p className="font-sans text-xs font-bold uppercase tracking-widest text-paper">
                  BOOK DIRECT — BEST RATE
                </p>
              </div>
              <div className="p-5">
                <label className="block font-sans text-xs font-bold uppercase tracking-widest text-paper/70">
                  Malam
                  <div className="mt-2 flex items-stretch justify-between border border-paper/40 py-1">
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

                <label className="mt-5 block font-sans text-xs font-bold uppercase tracking-widest text-paper/70">
                  Tamu
                  <div className="mt-2 grid grid-cols-4 gap-2">
                    {[1, 2, 3, 4].map((g) => (
                      <button
                        key={g}
                        type="button"
                        aria-pressed={guests === g}
                        onClick={() => setGuests(g)}
                        className={`border py-2 font-sans text-sm font-bold transition-colors ${
                          guests === g
                            ? "border-accent bg-accent text-paper"
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
                    <span className="font-sans text-xs font-bold uppercase tracking-widest text-paper/70">
                      Estimasi · {nights} malam × {guests} tamu
                    </span>
                    <span className="font-display text-4xl">
                      {total.toLocaleString("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <p className="mt-1 font-sans text-xs uppercase tracking-wide text-paper/60">
                    Ilustrasi tarif — konfirmasi saat reservasi.
                  </p>
                </div>

                <LwtButtonLink
                  href="tel:+625113278888"
                  variant="accent"
                  size="lg"
                  className="mt-6 w-full"
                  aria-label={`Reservasi via telepon ${fugo.phone}`}
                >
                  <IconBed size={17} />
                  Reservasi Sekarang
                </LwtButtonLink>
                <LwtButtonLink
                  href="#whatson"
                  variant="outline"
                  size="sm"
                  className="mt-3 w-full border-paper/40 bg-transparent text-paper hover:bg-paper hover:text-ink hover:border-paper"
                >
                  Meeting &amp; Event Inquiries
                  <IconArrow size={14} />
                </LwtButtonLink>
              </div>
            </Reveal>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
