"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import { IconArrow } from "@/components/ui/Icons";
import { interpolate } from "@/app/i18n/format";
import type { Dictionary } from "@/app/i18n/dictionaries";

/* ============================================================
   HERO — blueprint restage (user mock, 2026-09-17, followed 1:1)
   · Split 42/58: left = warm-bone blueprint column (brass kicker,
     League Gothic display, SUIT deck, two CTAs, coordinates/
     civic-scale facts row); right = full-bleed photo carousel
     with a white index chip (top-left) and a black annotation
     chip (bottom-right); beneath both, the 01–04 strip whose
     cells are ALSO the carousel control. One state drives
     photo, chips, and strip together.
   · Slides = the mall's supplied promo artwork
     (public/assets/carousel) — September events calendar,
     tenant promos, and new-menu launches, 1:1.
   ============================================================ */

const AUTOPLAY_MS = 6500; // hero-progress animation duration must match

interface HeroSlide {
  id: string;
  /** strip number + white chip index */
  num: string;
  /** white chip label, top-left of the photo */
  chip: string;
  /** black annotation chip, bottom-right of the photo */
  note: string;
  /** supplied promo artwork (public/assets/carousel) */
  image: { src: string };
}

const slides: HeroSlide[] = [
  {
    id: "agenda",
    num: "01",
    chip: "SEPTEMBER CALENDAR OF EVENTS",
    note: "FESTIVAL · BAZAAR · GIVEAWAY · SEP 2026",
    image: {
      src: "/assets/carousel/790081428_18621118255051614_3142629881017972139_n.jpg",
    },
  },
  {
    id: "kimino",
    num: "02",
    chip: "KIMI NO COOKIE",
    note: "PROMO SEPTEMBER CERIA · DISKON 10%",
    image: {
      src: "/assets/carousel/809373877_18625528207051614_8684399884656563031_n.jpg",
    },
  },
  {
    id: "garmin",
    num: "03",
    chip: "DORAN GADGET × GARMIN",
    note: "BIRTHDAY SALE · UP TO 18% OFF",
    image: {
      src: "/assets/carousel/809939776_18625529767051614_3754248681766776913_n.jpg",
    },
  },
  {
    id: "fore",
    num: "04",
    chip: "FORE COFFEE",
    note: "NEW · THE UNEXPECTED TWIST",
    image: {
      src: "/assets/carousel/812940258_18626152867051614_602661780079802863_n.jpg",
    },
  },
];

/** 01–04 strip cells — display facts that double as carousel controls.
    Kept in sync 1:1 with the slide list above (strip cell i = slide i). */
const stats = [
  { num: "01", value: "SEPTEMBER AGENDA", label: "FESTIVALS · BAZAAR · GIVEAWAY" },
  { num: "02", value: "KIMI NO COOKIE", label: "PROMO CERIA · DISKON 10%" },
  { num: "03", value: "GARMIN × DORAN", label: "BIRTHDAY SALE · 18% OFF" },
  { num: "04", value: "FORE COFFEE", label: "NEW · UNEXPECTED TWIST" },
];

export default function Hero({ dict }: { dict: Dictionary }) {
  const [index, setIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [holding, setHolding] = useState(false); // pointer over the stage
  const [announce, setAnnounce] = useState(""); // sr-only, manual nav only
  const regionRef = useRef<HTMLDivElement>(null);

  /* one entry point for every USER navigation (strip, keys, swipe) —
     autoplay calls setIndex directly so it never spams the announcer */
  const select = useCallback(
    (n: number) => {
      setIndex(n);
      setAnnounce(interpolate(dict.hero.slideSelected, { num: slides[n].num, chip: slides[n].chip }));
    },
    [dict],
  );

  const hold = useCallback((v: boolean) => setHolding(v), []);

  /* Autoplay discipline: one cancellable timer; stops for reduced motion,
     user pause, pointer hold, offscreen, hidden tab. */
  useEffect(() => {
    const root = regionRef.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: ReturnType<typeof setInterval> | undefined;
    let onscreen = true;
    let reducedNow = reduced.matches;
    const paused = userPaused || holding;

    const stop = () => {
      if (timer !== undefined) clearInterval(timer);
      timer = undefined;
    };
    const sync = () => {
      stop();
      if (!paused && !reducedNow && onscreen && !document.hidden) {
        timer = setInterval(() => {
          setIndex((i) => (i + 1) % slides.length);
        }, AUTOPLAY_MS);
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      onscreen = entry.isIntersecting;
      sync();
    });
    observer.observe(root);

    const onVisibility = () => sync();
    const onReduced = () => {
      reducedNow = reduced.matches;
      sync();
    };

    document.addEventListener("visibilitychange", onVisibility);
    reduced.addEventListener("change", onReduced);
    sync();

    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      reduced.removeEventListener("change", onReduced);
    };
  }, [userPaused, holding]);

  /* progress rule: data-hold pauses the CSS animation mid-flight */
  useEffect(() => {
    const root = regionRef.current;
    if (!root) return;
    root.dataset.hold = String(userPaused || holding);
  }, [userPaused, holding]);

  const step = (dir: 1 | -1) =>
    select((index + dir + slides.length) % slides.length);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    }
  };

  const onPointerDown = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).dataset.x0 = String(e.clientX);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const el = e.currentTarget as HTMLElement;
    const x0 = el.dataset.x0;
    delete el.dataset.x0;
    if (x0 === undefined) return;
    const dx = e.clientX - Number(x0);
    if (Math.abs(dx) > 48) step(dx < 0 ? 1 : -1);
  };

  const slide = slides[index];

  return (
    <section id="hero" aria-label={dict.hero.ariaLabel} className="bg-paper text-ink">
      {/* the fixed opaque header (68px mobile / 72px desktop / 108px with
         topbar) is compensated with matching padding-top, so the hero rests
         cleanly BELOW the nav — chips and plate titles never slide under
         it, and the strip still closes the first viewport exactly */}
      <div className="grid min-h-[calc(100svh-68px)] grid-cols-1 pt-[68px] lg:min-h-[calc(100svh-72px)] lg:grid-cols-[42fr_58fr] lg:pt-[72px] xl:min-h-[calc(100svh-108px)] xl:pt-[108px]">
        {/* ================= LEFT — the blueprint column ================= */}
        <div className="order-2 flex flex-col justify-center bg-bone px-5 py-12 md:px-12 lg:order-1 lg:py-16 xl:pl-[max(4rem,6vw)] xl:pr-14">
          {/* kicker — number, brass rule, label (mock: 00 — LANDMARK BLUEPRINT) */}
          <Reveal delay={1} className="flex items-center gap-3">
            <span className="font-sans text-sm font-bold tracking-widest text-brass">00</span>
            <span aria-hidden="true" className="h-px w-9 bg-brass-soft" />
            <span className="font-sans text-xs font-bold uppercase tracking-[0.22em] text-dim">
              {dict.hero.kicker}
            </span>
          </Reveal>

          {/* display — League Gothic, mock line breaks, ink→grey step */}
          <h1 className="mt-5 font-display uppercase leading-[0.92] tracking-[-0.01em]">
            <Reveal variant="mask" as="span" className="block text-[clamp(3.2rem,6vw,6rem)] text-ink">
              The Vertical
            </Reveal>
            <Reveal variant="mask" delay={1} as="span" className="block text-[clamp(3.2rem,6vw,6rem)] text-ink">
              Landmark
            </Reveal>
            <Reveal variant="mask" delay={2} as="span" className="block text-[clamp(3.2rem,6vw,6rem)] text-[#6f6a5f]">
              of South
            </Reveal>
            <Reveal variant="mask" delay={3} as="span" className="block text-[clamp(3.2rem,6vw,6rem)] text-[#6f6a5f]">
              Kalimantan
            </Reveal>
          </h1>

          {/* deck — SUIT, the only text face */}
          <Reveal delay={4} as="p" className="mt-7 max-w-[52ch] text-[clamp(1.05rem,1.35vw,1.35rem)] leading-relaxed text-dim">
            {dict.hero.deck}
          </Reveal>

          {/* CTAs — solid ink with bracketed arrow + outline FUGO HOTEL */}
          <Reveal delay={5} className="mt-9 flex flex-wrap items-stretch gap-4">
            <a
              href="#tenants"
              className="group/cta inline-flex min-h-[48px] items-center gap-3 bg-ink px-7 py-3.5 font-sans text-xs font-bold uppercase tracking-[0.2em] text-paper transition-colors duration-200 hover:bg-[#2b2b2b]"
            >
              {dict.hero.ctaDirectory}
              <IconArrow
                size={13}
                className="transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
              />
            </a>
            <a
              href="#fugo"
              className="inline-flex min-h-[48px] items-center border border-ink bg-bone px-7 py-3.5 font-sans text-xs font-bold uppercase tracking-[0.2em] text-ink transition-colors duration-200 hover:bg-ink hover:text-paper"
            >
              {dict.hero.ctaFugo}
            </a>
          </Reveal>

          {/* facts row — street address + tenant scale (mock bottom row) */}
          <Reveal delay={6} className="mt-10 border-t border-hairline pt-6">
            <dl className="flex flex-wrap gap-x-14 gap-y-5">
              <div>
                <dt className="font-sans text-xs font-bold uppercase tracking-[0.22em] text-dim">
                  {dict.hero.addressLabel}
                </dt>
                <dd className="mt-1.5 whitespace-pre-line font-sans text-sm font-semibold tracking-wide text-ink">
                  {dict.hero.coordsValue}
                </dd>
              </div>
              <div>
                <dt className="font-sans text-xs font-bold uppercase tracking-[0.22em] text-dim">
                  {dict.hero.directoryLabel}
                </dt>
                <dd className="mt-1.5 font-display text-xl uppercase tracking-wide text-brass">
                  {dict.hero.directoryValue}
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>

        {/* ================= RIGHT — the photo carousel ================= */}
        {/* mobile: the stage fills the first viewport minus the header */}
        <div className="relative order-1 min-h-[60svh] lg:order-2 lg:min-h-0">
          <div
            ref={regionRef}
            data-hold="false"
            className="hero-region absolute inset-0"
            role="region"
            aria-roledescription="carousel"
            aria-label={dict.hero.regionLabel}
            tabIndex={0}
            onKeyDown={onKeyDown}
            onPointerEnter={() => hold(true)}
            onPointerLeave={() => hold(false)}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
          >
            {slides.map((s, i) => {
              const active = i === index;
              return (
                <div
                  key={s.id}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${s.num} — ${s.chip}`}
                  aria-hidden={!active}
                  inert={!active}
                  data-active={active}
                  className="hero-slide absolute inset-0"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- supplied promo artwork */}
                  <img
                    src={s.image.src}
                    alt={dict.hero.slideAlts[i]}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                </div>
              );
            })}

            {/* white index chip — top-left (mock: 01 GRAND ATRIUM & CIVIC GALLERIA) */}
            <div className="absolute left-0 top-6 z-10">
              <p className="inline-flex items-center gap-3 bg-paper py-2.5 pl-5 pr-6 shadow-[0_10px_30px_-12px_rgb(28_25_18/0.3)]">
                <span className="font-display text-2xl leading-none text-ink">{slide.num}</span>
                <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-ink">
                  {slide.chip}
                </span>
              </p>
            </div>

            {/* black annotation chip — bottom-right (mock annotation) */}
            <div className="absolute bottom-14 right-6 z-10 max-sm:left-6 max-sm:right-6">
              <p className="inline-block bg-ink px-5 py-2.5 font-sans text-xs font-bold uppercase tracking-[0.2em] text-paper">
                {slide.note}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ============ 01–04 stats strip — display + carousel control ============ */}
      <Reveal delay={2} className="relative border-y border-hairline bg-paper">
        <div
          role="tablist"
          aria-label={dict.hero.carouselAria}
          className="grid grid-cols-2 lg:grid-cols-4"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") {
              e.preventDefault();
              step(1);
            } else if (e.key === "ArrowLeft") {
              e.preventDefault();
              step(-1);
            }
          }}
        >
          {stats.map((st, i) => {
            const active = i === index;
            return (
              <button
                key={st.num}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => select(i)}
                className={`relative flex min-h-[96px] flex-col justify-center gap-1 px-6 py-5 text-left transition-colors duration-200 md:px-8 ${
                  i > 0 ? "border-l border-hairline" : ""
                } ${i >= 2 ? "max-lg:border-t max-lg:border-hairline" : ""} ${
                  active ? "bg-silver" : "bg-paper hover:bg-silver"
                }`}
              >
                <span className={`font-sans text-sm font-bold tracking-widest ${active ? "text-brass" : "text-ghost"}`}>
                  {st.num}
                </span>
                <span className="font-display text-xl uppercase leading-none text-ink md:text-2xl">
                  {st.value}
                </span>
                <span className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-dim">
                  {st.label}
                </span>
                {/* brass progress rule — the active cell's slide timer */}
                {active && !userPaused && (
                  <span
                    aria-hidden="true"
                    className="hero-progress absolute inset-x-0 bottom-0 h-[3px] origin-left bg-brass-soft"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* pause control — strip's top-right corner, keeps autoplay discipline */}
        <button
          type="button"
          onClick={() => setUserPaused((v) => !v)}
          aria-pressed={userPaused}
          aria-label={userPaused ? dict.hero.play : dict.hero.pause}
          className="absolute right-0 top-0 z-10 hidden size-9 -translate-y-full items-center justify-center border-b border-l border-hairline bg-paper text-ink transition-colors hover:bg-silver lg:flex"
        >
          {userPaused ? (
            <span aria-hidden="true" className="ml-0.5 block size-0 border-y-4 border-l-[7px] border-y-transparent border-l-ink" />
          ) : (
            <span aria-hidden="true" className="flex gap-[3px]">
              <span className="block h-3 w-[3px] bg-ink" />
              <span className="block h-3 w-[3px] bg-ink" />
            </span>
          )}
        </button>
      </Reveal>

      {/* visually-hidden announcer — manual navigation only */}
      <p aria-live="polite" className="sr-only">
        {announce}
      </p>
    </section>
  );
}
