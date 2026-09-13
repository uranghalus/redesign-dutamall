"use client";

import { useState } from "react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { BrutalButton } from "@/components/ui/Button";
import { IconPlay, IconClock } from "@/components/ui/Icons";
import { movies, type Movie } from "@/app/data/home";

type Segment = "Regular" | "Premiere";

/** Authored typographic poster — placeholder for licensed Cinema XXI artwork. */
function Poster({ movie }: { movie: Movie }) {
  const dark = movie.poster.bg === "#000000";
  return (
    <div
      className={`relative aspect-[2/3] border-2 border-paper/40 ${
        dark ? "bg-ink text-paper" : "bg-paper text-ink"
      }`}
    >
      <div className="flex h-full w-full flex-col justify-between p-4">
        <div className="flex items-start justify-between gap-2">
          <span
            className={`inline-block px-1.5 py-0.5 font-mono text-xs font-bold uppercase tracking-widest ${
              dark ? "bg-paper text-ink" : "bg-ink text-paper"
            }`}
          >
            {movie.rating}
            </span>
          {movie.fresh && (
            <span className="bg-accent px-1.5 py-0.5 font-mono text-xs font-bold uppercase tracking-widest text-ink">
              Baru
            </span>
          )}
        </div>
        <p className="break-words font-display text-4xl uppercase leading-[0.85]">
          {movie.code}
        </p>
        <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest">
          <span>{movie.genre}</span>
          <span>{movie.duration}</span>
        </div>
      </div>
    </div>
  );
}

function Showtime({ time }: { time: string }) {
  const [picked, setPicked] = useState(false);
  return (
    <button
      type="button"
      aria-pressed={picked}
      aria-label={`Pilih kursi untuk tayang ${time}`}
      onClick={() => setPicked((v) => !v)}
      className={`min-w-[52px] border-2 px-2 py-1.5 font-mono text-xs font-bold transition-colors ${
        picked
          ? "border-accent bg-accent text-white"
          : "border-paper/40 text-paper hover:border-paper"
      }`}
    >
      {time}
    </button>
  );
}

export default function Cinema() {
  const [segment, setSegment] = useState<Segment>("Regular");
  const list = movies.filter((m) => m.title === segment);

  return (
    <Section id="cinema" dark>
      <div className="px-4 py-14 md:px-10 md:py-20">
        <SectionHeading
          index="01 / CINEMA XXI"
          title="JADWAL HARI INI"
          dark
          right={
            <div className="flex border-2 border-paper" role="tablist" aria-label="Pilih studio">
              {(["Regular", "Premiere"] as Segment[]).map((seg) => (
                <button
                  key={seg}
                  type="button"
                  role="tab"
                  aria-selected={segment === seg}
                  onClick={() => setSegment(seg)}
                  className={`px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest transition-colors ${
                    segment === seg
                      ? seg === "Premiere"
                        ? "bg-accent text-ink"
                        : "bg-paper text-ink"
                      : "bg-transparent text-paper hover:bg-paper/10"
                  }`}
                >
                  {seg}
                </button>
              ))}
            </div>
          }
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {list.map((movie) => (
            <article key={movie.id} className="group flex flex-col gap-0 sm:flex-row">
              <Poster movie={movie} />
              <div className="flex min-w-0 flex-1 flex-col border-paper/40 sm:border-l-0">
                <div className="flex flex-wrap gap-1.5 border-2 border-paper/40 p-3">
                  {movie.badges.map((b) => (
                    <span
                      key={b}
                      className={`px-1.5 py-0.5 font-mono text-xs font-bold uppercase tracking-widest ${
                        b === "The Premiere" ? "bg-accent text-ink" : "border border-paper/40 text-paper"
                      }`}
                    >
                      {b}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 border-2 border-t-0 border-paper/40 p-3 font-mono text-[11px] uppercase tracking-wide text-paper/70">
                  <IconClock size={13} className="shrink-0" />
                  {movie.duration} · {movie.rating}
                </div>
                <div className="flex flex-wrap items-center gap-2 border-2 border-t-0 border-paper/40 p-3">
                  {movie.showtimes.map((t) => (
                    <Showtime key={t} time={t} />
                  ))}
                </div>
                <div className="mt-auto border-2 border-t-0 border-paper/40 p-3">
                  <BrutalButton
                    variant="outlinePaper"
                    size="sm"
                    className="w-full"
                    aria-label={`Pilih kursi untuk ${movie.code}`}
                  >
                    <IconPlay size={13} />
                    Pilih Kursi
                  </BrutalButton>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 flex items-center gap-2 font-mono text-xs tracking-wide text-paper/70">
          <span aria-hidden="true" className="inline-block size-2 bg-accent" />
          Jadwal dapat berubah — konfirmasi di lobi Cinema XXI, Lantai 3.
        </p>
      </div>
    </Section>
  );
}
