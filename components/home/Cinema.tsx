"use client";

import { useState } from "react";
import { Section, SectionHeading } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { BrutalButton } from "@/components/ui/Button";
import { IconPlay, IconClock } from "@/components/ui/Icons";
import { movies, type Movie } from "@/app/data/home";

type Segment = "Regular" | "Premiere";

/** Shared showtime button face — the row and the poster overlay use one language. */
function ShowtimeBtn({
  time,
  picked,
  onPick,
}: {
  time: string;
  picked: boolean;
  onPick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={picked}
      aria-label={`Pilih kursi untuk tayang ${time}`}
      onClick={onPick}
      className={`min-w-[52px] border-2 px-2 py-1.5 font-mono text-xs font-bold transition-colors ${
        picked
          ? "border-accent bg-accent text-ink"
          : "border-paper/40 text-paper hover:border-paper"
      }`}
    >
      {time}
    </button>
  );
}

/**
 * Supplied banner photo with rating/fresh chips — the real artwork slot.
 * Falls back to the authored typographic plate when no photo exists.
 * Full-width 2/3 plate on mobile; fixed-width poster column at md+.
 * md+ hover/focus reveals a details overlay: genre + showtime quick-pick.
 */
function Poster({
  movie,
  picked,
  onPick,
}: {
  movie: Movie;
  picked: string | null;
  onPick: (time: string) => void;
}) {
  if (movie.image) {
    return (
      <div className="relative aspect-[2/3] w-full shrink-0 border-paper/40 md:aspect-auto md:w-36 md:self-stretch md:border-2 xl:w-44">
        {/* eslint-disable-next-line @next/next/no-img-element -- supplied artwork slot, swap-ready */}
        <img
          src={movie.image}
          alt={`Poster film ${movie.code}`}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3">
          <span className="bg-ink px-1.5 py-0.5 font-mono text-xs font-bold uppercase tracking-widest text-paper">
            {movie.rating}
          </span>
          {movie.fresh && (
            <span className="bg-accent px-1.5 py-0.5 font-mono text-xs font-bold uppercase tracking-widest text-ink">
              Baru
            </span>
          )}
        </div>
        {/* details overlay — desktop pointer hover or keyboard focus-within only */}
        <div className="absolute inset-0 hidden flex-col justify-end bg-ink/85 p-4 opacity-0 transition-opacity duration-150 group-focus-within:opacity-100 group-hover:opacity-100 md:flex">
          <p className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-paper">
            <span aria-hidden="true" className="inline-block size-2 bg-accent" />
            {movie.genre}
          </p>
          <p className="mt-1.5 font-mono text-[11px] uppercase tracking-widest text-paper/70">
            Pilih jadwal:
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {movie.showtimes.map((t) => (
              <ShowtimeBtn key={t} time={t} picked={picked === t} onPick={() => onPick(t)} />
            ))}
          </div>
        </div>
      </div>
    );
  }
  const dark = movie.poster.bg === "#000000";
  return (
    <div
      className={`relative aspect-[2/3] w-full border-paper/40 max-md:border-0 md:aspect-auto md:w-auto md:shrink-0 md:self-stretch md:border-2 ${
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

/** One movie card — owns the shared picked-showtime state (row + overlay stay in sync). */
function MovieCard({ movie }: { movie: Movie }) {
  const [picked, setPicked] = useState<string | null>(null);
  const pick = (time: string) => setPicked((prev) => (prev === time ? null : time));

  return (
    <article className="group flex flex-col transition-[transform,box-shadow] duration-150 md:flex-row md:shadow-brutal-sm md:hover:-translate-x-[2px] md:hover:-translate-y-[2px] md:hover:shadow-brutal">
      <Poster movie={movie} picked={picked} onPick={pick} />
      {/* hairline seams mobile — 2px brutalist frame md+ */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center border border-paper/15 px-4 py-2 md:border-2 md:border-paper/40 md:px-3">
          <h3 className="font-display text-3xl uppercase leading-[0.9]">{movie.code}</h3>
        </div>
        <div className="flex flex-wrap gap-1.5 border border-t-0 border-paper/15 py-3 pl-4 md:border-2 md:border-paper/40 md:border-t-0 md:p-3 md:pl-3">
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
        <div className="flex items-center gap-2 border border-t-0 border-paper/15 py-2.5 pl-4 font-mono text-[11px] uppercase tracking-wide text-paper/70 md:border-2 md:border-paper/40 md:p-3 md:pl-3">
          <IconClock size={13} className="shrink-0" />
          {movie.duration} · {movie.genre} · {movie.rating}
        </div>
        <div className="flex flex-wrap items-center gap-2 border border-t-0 border-paper/15 py-3 pl-4 md:border-2 md:border-paper/40 md:p-3 md:pl-3">
          {movie.showtimes.map((t) => (
            <ShowtimeBtn key={t} time={t} picked={picked === t} onPick={() => pick(t)} />
          ))}
        </div>
        <div className="mt-auto border border-t-0 border-paper/15 p-4 md:border-2 md:border-paper/40 md:p-3">
          <BrutalButton
            variant="outlinePaper"
            size="sm"
            className="w-full"
            aria-label={`Pilih kursi untuk ${movie.code}${picked ? `, tayang ${picked}` : ""}`}
          >
            <IconPlay size={13} />
            Pilih Kursi
          </BrutalButton>
        </div>
      </div>
    </article>
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

        {/* Mobile: flush artwork plates with hairline seams; md+ restores the brutalist frame */}
        <Reveal variant="seq" as="div" className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {list.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </Reveal>

        <Reveal className="mt-8 flex items-center gap-2 font-mono text-xs tracking-wide text-paper/70">
          <span aria-hidden="true" className="inline-block size-2 bg-accent" />
          Jadwal dapat berubah — konfirmasi di lobi Cinema XXI, Lantai 3.
        </Reveal>
      </div>
    </Section>
  );
}
