"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import Reveal from "@/components/ui/Reveal";
import { IconArrow } from "@/components/ui/Icons";
import { movies, type Movie } from "@/app/data/home";
import type { Locale } from "@/app/i18n/config";
import { interpolate, formatDuration } from "@/app/i18n/format";
import type { Dictionary } from "@/app/i18n/dictionaries";

type Segment = "Regular" | "Premiere";

/** card width + rail gap (gap-4) — the drag/snap step */
const STEP_EXTRA = 16;

/** Shared showtime chip — the mock's gold-fill active / hairline idle. */
function ShowtimeBtn({
  time,
  picked,
  onPick,
  aria,
}: {
  time: string;
  picked: boolean;
  onPick: () => void;
  aria: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={picked}
      aria-label={aria}
      onClick={onPick}
      className={`min-h-[32px] min-w-[52px] border px-2 py-1 font-sans text-[11px] font-bold uppercase tracking-wide transition-colors ${
        picked
          ? "border-brass-soft bg-brass-soft text-ink"
          : "border-paper/30 text-paper/85 hover:border-brass-soft hover:text-brass-soft"
      }`}
    >
      {time}
    </button>
  );
}

/** Film card — the mock's poster-first cell: badge pill, duration·rating pill,
    genre kicker, serif title, studio line, showtime chips, BOOK SEATS footer. */
function MovieCard({
  movie,
  dict,
  locale,
}: {
  movie: Movie;
  dict: Dictionary;
  locale: Locale;
}) {
  const [picked, setPicked] = useState<string | null>(null);
  const pick = (time: string) => setPicked((prev) => (prev === time ? null : time));
  const premiere = movie.badges.includes("The Premiere");

  return (
    <li className="group relative flex w-[262px] shrink-0 flex-col border border-paper/20 bg-[#101010] transition-colors duration-300 hover:border-brass-soft/70 sm:w-[300px] lg:w-[318px]">
      {/* poster — supplied artwork with the mock's two pills */}
      <div className="img-plate relative aspect-[300/441] w-full">
        {/* eslint-disable-next-line @next/next/no-img-element -- supplied artwork slot, swap-ready */}
        <img
          src={movie.image}
          alt={interpolate(dict.cinema.posterAlt, { code: movie.code })}
          className="absolute inset-0 h-full w-full"
          loading="lazy"
          draggable={false}
        />
        <span className="absolute left-2.5 top-2.5 border border-brass-soft/80 bg-ink/85 px-2 py-1 font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-brass-soft backdrop-blur-sm">
          {premiere ? dict.cinema.premiereTag : dict.cinema.regularTag}
        </span>
        <span className="absolute inset-x-2.5 bottom-2.5 flex items-center justify-between bg-ink/85 px-2.5 py-1.5 font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-paper backdrop-blur-sm">
          <span>
            {formatDuration(movie.duration, locale)} · {movie.rating}
          </span>
          {movie.fresh && (
            <span className="flex items-center gap-1.5 text-brass-soft">
              <span aria-hidden="true" className="size-1 bg-brass-soft" />
              {dict.cinema.new}
            </span>
          )}
        </span>
      </div>

      {/* body — genre kicker, serif title, studio line */}
      <div className="flex flex-1 flex-col p-4">
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-paper/55">
          {dict.data.genres[movie.genre]}
        </p>
        <h3 className="mt-1.5 font-serif text-[1.45rem] capitalize leading-[1.12] text-paper">
          {movie.code}
        </h3>
        <p className="mt-1.5 font-sans text-xs uppercase tracking-[0.14em] text-paper/45">
          {movie.studios}
        </p>

        <div
          className="mt-4 flex flex-wrap gap-1.5"
          role="group"
          aria-label={interpolate(dict.cinema.posterAlt, { code: movie.code })}
        >
          {movie.showtimes.map((t) => (
            <ShowtimeBtn
              key={t}
              time={t}
              picked={picked === t}
              onPick={() => pick(t)}
              aria={interpolate(dict.cinema.selectTime, { time: t })}
            />
          ))}
        </div>

        <a
          href="#cinema"
          aria-label={
            picked
              ? `${interpolate(dict.cinema.bookSeatsFor, { code: movie.code })} · ${interpolate(dict.cinema.selectTime, { time: picked })}`
              : interpolate(dict.cinema.bookSeatsFor, { code: movie.code })
          }
          className="cinema-cta mt-5 flex min-h-[44px] items-center justify-center border border-paper bg-paper font-sans text-xs font-bold uppercase tracking-[0.2em] text-ink transition-colors duration-200 hover:border-brass-soft hover:bg-brass-soft"
        >
          {dict.cinema.bookSeats}
        </a>
      </div>
    </li>
  );
}

export default function Cinema({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const [segment, setSegment] = useState<Segment>("Regular");
  const list = movies.filter((m) => m.title === segment);

  const railRef = useRef<HTMLUListElement>(null);
  const reducedRef = useRef(false);
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: false });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [progress, setProgress] = useState(0);

  /* mirror scroll state → arrows + progress rule */
  const sync = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < max - 4);
    setProgress(max > 0 ? Math.min(1, el.scrollLeft / max) : 1);
  }, []);

  useEffect(() => {
    reducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    sync();
    const el = railRef.current;
    if (!el) return;
    el.addEventListener("scroll", sync, { passive: true });
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", sync);
      ro.disconnect();
    };
  }, [sync]);

  /* reset to the head whenever the studio set changes */
  useEffect(() => {
    railRef.current?.scrollTo({ left: 0 });
    sync();
  }, [segment, sync]);

  const slideBy = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = (card ? card.getBoundingClientRect().width : 300) + STEP_EXTRA;
    el.scrollBy({ left: dir * step, behavior: reducedRef.current ? "auto" : "smooth" });
  };

  /* mouse drag-to-scroll — touch already scrolls natively */
  const onPointerDown = (e: ReactPointerEvent<HTMLUListElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const el = railRef.current;
    if (!el) return;
    drag.current = { active: true, startX: e.clientX, startLeft: el.scrollLeft, moved: false };
    el.dataset.dragging = "true";
  };
  const onPointerMove = (e: ReactPointerEvent<HTMLUListElement>) => {
    const el = railRef.current;
    if (!el || !drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 6) drag.current.moved = true;
    el.scrollLeft = drag.current.startLeft - dx;
  };
  const endDrag = () => {
    const el = railRef.current;
    if (!el || !drag.current.active) return;
    drag.current.active = false;
    el.dataset.dragging = "false";
    if (drag.current.moved) {
      const card = el.querySelector("li");
      const step = card ? card.getBoundingClientRect().width + STEP_EXTRA : 316;
      const max = el.scrollWidth - el.clientWidth;
      const target = Math.min(Math.round(el.scrollLeft / step) * step, max);
      el.scrollTo({ left: target, behavior: reducedRef.current ? "auto" : "smooth" });
    }
  };
  /* a drag must not fire the card's links on release */
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  return (
    <section id="cinema" className="bg-ink text-paper">
      <div className="px-4 py-14 md:px-10 md:py-20">
        {/* blueprint section head — brass kicker, display title, right deck */}
        <Reveal>
          <div className="mb-4 flex items-center gap-4">
            <span className="font-display text-xl uppercase text-brass-soft">02</span>
            <span aria-hidden="true" className="h-px w-10 bg-brass-soft" />
            <span className="font-sans text-xs font-bold uppercase tracking-[0.24em] text-paper/60">
              {dict.cinema.kicker}
            </span>
          </div>
        </Reveal>
        <div className="mb-10 grid gap-6 md:mb-12 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <Reveal variant="mask">
            <h2 className="border-b border-paper/25 pb-4 font-display text-[clamp(2.2rem,4vw,3.6rem)] uppercase leading-[0.95]">
              {dict.cinema.title}
            </h2>
          </Reveal>
          <Reveal>
            <p className="pb-1 font-sans text-sm leading-relaxed text-paper/60">
              {dict.cinema.deck}
            </p>
          </Reveal>
        </div>

        {/* controls — studio tabs left, counter + arrows right */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex border border-paper/25" role="tablist" aria-label={dict.cinema.studioAria}>
            {(["Regular", "Premiere"] as Segment[]).map((seg) => (
              <button
                key={seg}
                type="button"
                role="tab"
                aria-selected={segment === seg}
                onClick={() => setSegment(seg)}
                className={`min-h-[44px] flex-1 px-5 py-2 font-sans text-xs font-bold uppercase tracking-widest transition-colors sm:flex-none ${
                  segment === seg
                    ? "bg-brass-soft text-ink"
                    : "text-paper/70 hover:bg-paper/10 hover:text-paper"
                }`}
              >
                {seg === "Premiere" ? dict.cinema.premiere : dict.cinema.regular}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-5">
            <p aria-live="polite" className="font-sans text-xs uppercase tracking-[0.18em] text-paper/50">
              {interpolate(dict.cinema.showing, { shown: list.length, total: movies.length })}
            </p>
            <div className="flex">
              <button
                type="button"
                onClick={() => slideBy(-1)}
                disabled={!canPrev}
                aria-label={dict.cinema.prev}
                className="flex size-11 items-center justify-center border border-paper/30 text-paper transition-colors hover:border-brass-soft hover:text-brass-soft disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-paper/30 disabled:hover:text-paper"
              >
                <IconArrow size={16} className="rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => slideBy(1)}
                disabled={!canNext}
                aria-label={dict.cinema.next}
                className="-ml-px flex size-11 items-center justify-center border border-paper/30 text-paper transition-colors hover:border-brass-soft hover:text-brass-soft disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-paper/30 disabled:hover:text-paper"
              >
                <IconArrow size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* the rail — drag / swipe / arrows / arrow keys, snap to each card.
            Bleeds right to the viewport edge like the mock. */}
        <Reveal>
          <ul
            ref={railRef}
            role="region"
            aria-label={dict.cinema.railAria}
            tabIndex={0}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerLeave={endDrag}
            onPointerCancel={endDrag}
            onClickCapture={onClickCapture}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") {
                e.preventDefault();
                slideBy(1);
              } else if (e.key === "ArrowLeft") {
                e.preventDefault();
                slideBy(-1);
              } else if (e.key === "Home") {
                e.preventDefault();
                railRef.current?.scrollTo({ left: 0, behavior: reducedRef.current ? "auto" : "smooth" });
              } else if (e.key === "End") {
                e.preventDefault();
                const el = railRef.current;
                if (el) el.scrollTo({ left: el.scrollWidth, behavior: reducedRef.current ? "auto" : "smooth" });
              }
            }}
            className="cinema-rail -mr-4 gap-4 pr-4 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-brass md:-mr-10 md:pr-10"
          >
            {list.map((movie) => (
              <MovieCard key={movie.id} movie={movie} dict={dict} locale={locale} />
            ))}
          </ul>
        </Reveal>

        {/* progress rule — position within the rail */}
        <div
          aria-hidden="true"
          className="mt-6 h-[2px] w-full bg-paper/15"
        >
          <div
            className="h-full bg-brass-soft"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>

        <Reveal className="mt-8 flex items-center gap-2 font-sans text-xs uppercase tracking-[0.18em] text-paper/45">
          <span aria-hidden="true" className="inline-block size-1.5 bg-brass-soft" />
          {dict.cinema.scheduleNote}
        </Reveal>
      </div>
    </section>
  );
}
