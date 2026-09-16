"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import { IconArrow } from "@/components/ui/Icons";

/* ============================================================
   HERO — LWT key visual (§sectionKv): two-column flex under the
   fixed header. Left: the motto as a masked-line League Gothic
   block (title reveal translateY(230%)→settle). Right: the
   campaign carousel at aspect-ratio 1280/1080 with the white
   "utils" bar beneath it (1px black frame, League Gothic
   pagination "1 / 5", clamped title, hairline prev/next cells).
   Slides are authored typographic posters; each carries an
   `image` slot for licensed artwork. Autoplay keeps the full
   discipline (pause on hover/focus/offscreen/hidden/reduced).
   ============================================================ */

type Ground = "accent" | "ink" | "paper";

interface Slide {
  id: string;
  kicker: string;
  lines: { text: string; hi?: boolean }[];
  title: string;
  date: string;
  href: string;
  ground: Ground;
  image?: { src: string; alt: string };
}

const slides: Slide[] = [
  {
    id: "festival-banjar",
    kicker: "SEKARANG DI DUTA MALL",
    lines: [
      { text: "FESTIVAL" },
      { text: "BELANJA", hi: true },
      { text: "BUDAYA BANJAR" },
    ],
    title: "Festival Belanja Budaya Banjar",
    date: "19—21 SEP · MAIN ATRIUM",
    href: "#whatson",
    ground: "accent",
  },
  {
    id: "live-acoustic",
    kicker: "SETIAP SABTU · 19.00 WITA",
    lines: [{ text: "WEEKEND" }, { text: "LIVE", hi: true }, { text: "ACOUSTIC" }],
    title: "Weekend Live Acoustic",
    date: "MAIN ATRIUM · GRATIS",
    href: "#whatson",
    ground: "ink",
  },
  {
    id: "cinema-premiere",
    kicker: "CINEMA XXI · LANTAI 3",
    lines: [{ text: "THE" }, { text: "PREMIERE", hi: true }, { text: "EXPERIENCE" }],
    title: "Cinema XXI & The Premiere",
    date: "JADWAL HARI INI",
    href: "#cinema",
    ground: "ink",
  },
  {
    id: "fugo-hotel",
    kicker: "FUGO HOTEL & SUITES",
    lines: [{ text: "STAY" }, { text: "ABOVE", hi: true }, { text: "THE MALL" }],
    title: "FUGO Hotel & Suites Banjarmasin",
    date: "BOOK DIRECT · BEST RATE",
    href: "#fugo",
    ground: "paper",
  },
  {
    id: "otomotif-anak",
    kicker: "PAMERAN & KELUARGA",
    lines: [{ text: "OTOMOTIF" }, { text: "& FESTIVAL", hi: true }, { text: "ANAK" }],
    title: "Pameran Otomotif & Festival Anak",
    date: "05 OKT · AREA PARKIR P1",
    href: "#whatson",
    ground: "paper",
  },
];

/** Per-ground poster styling: kicker chip, title ink, pill. */
const groundStyles: Record<
  Ground,
  { kicker: string; title: string; hi: string; pill: string }
> = {
  accent: {
    kicker: "bg-ink text-paper",
    title: "text-paper",
    hi: "text-ink",
    pill: "border-ink text-ink hover:bg-ink hover:text-paper",
  },
  ink: {
    kicker: "bg-accent text-paper",
    title: "text-paper",
    hi: "text-accent",
    pill: "border-paper/60 text-paper hover:bg-paper hover:text-ink",
  },
  paper: {
    kicker: "bg-ink text-paper",
    title: "text-ink",
    hi: "text-accent",
    pill: "border-ink text-ink hover:bg-ink hover:text-paper",
  },
};

const AUTOPLAY_MS = 6000;

/** Authored poster art — bottom-anchored stark geometry per slide. */
function PosterArt({ slide }: { slide: Slide }) {
  if (slide.id === "festival-banjar") {
    return (
      <div className="absolute inset-0 bg-accent" aria-hidden="true">
        <span className="pointer-events-none absolute -left-2 bottom-0 select-none font-display text-[9.5625rem] uppercase leading-none opacity-25 text-paper">
          Banjar
        </span>
        <div className="absolute inset-x-0 bottom-0 h-3 bg-ink/20" />
      </div>
    );
  }
  if (slide.id === "live-acoustic") {
    return (
      <div className="absolute inset-0 bg-ink" aria-hidden="true">
        <span className="pointer-events-none absolute -right-4 bottom-16 hidden select-none font-display text-[6.094rem] uppercase leading-none opacity-[0.07] text-paper md:block">
          Live
        </span>
        <div className="absolute bottom-6 left-5 flex items-end gap-1.5">
          {[16, 30, 46, 22, 38, 54, 26, 42, 18, 50, 34, 12].map((h, i) => (
            <span
              key={i}
              className={`w-2.5 ${i % 3 === 0 ? "bg-accent" : "bg-paper/70"}`}
              style={{ height: h }}
            />
          ))}
        </div>
      </div>
    );
  }
  if (slide.id === "cinema-premiere") {
    return (
      <div className="absolute inset-0 bg-ink" aria-hidden="true">
        <div className="absolute bottom-0 left-0 right-0 flex h-9 items-center gap-4 overflow-hidden border-t border-paper/20 px-5">
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i} className="h-3 w-6 shrink-0 border border-paper/30" />
          ))}
        </div>
        <span className="pointer-events-none absolute -right-3 bottom-14 hidden select-none font-display text-[6.094rem] uppercase leading-none opacity-[0.07] text-paper md:block">
          C21
        </span>
      </div>
    );
  }
  if (slide.id === "fugo-hotel") {
    return (
      <div className="absolute inset-0 bg-paper" aria-hidden="true">
        <span className="pointer-events-none absolute -left-3 bottom-0 hidden select-none font-display text-[6.094rem] uppercase leading-none opacity-[0.06] text-ink md:block">
          Fugo
        </span>
        <div className="absolute bottom-5 left-5 right-5 h-24 border border-ink/10" />
        <div className="absolute bottom-10 left-9 right-9 h-12 border border-ink/10" />
      </div>
    );
  }
  return (
    <div className="absolute inset-0 bg-paper" aria-hidden="true">
      <span className="pointer-events-none absolute -left-2 bottom-0 select-none font-display text-[9.5625rem] uppercase leading-none opacity-[0.08] text-ink">
        P1
      </span>
      <div className="absolute bottom-6 right-6 flex flex-col items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={`block w-14 border-t-4 ${i === 2 ? "border-accent" : "border-ink/15"}`} />
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const regionRef = useRef<HTMLDivElement>(null);

  const go = useCallback((dir: 1 | -1) => {
    setIndex((i) => (i + dir + slides.length) % slides.length);
  }, []);

  /* Autoplay discipline: one cancellable timer; stops for
     reduced-motion, user pause, hover, focus, offscreen, hidden tab. */
  useEffect(() => {
    const root = regionRef.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: ReturnType<typeof setInterval> | undefined;
    let onscreen = true;
    let hovering = false;
    let focusWithin = false;

    const stop = () => {
      if (timer !== undefined) clearInterval(timer);
      timer = undefined;
    };
    const sync = () => {
      stop();
      if (!userPaused && !reduced.matches && onscreen && !hovering && !focusWithin && !document.hidden) {
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
    const onReducedChange = () => sync();
    const onPointerEnter = () => {
      hovering = true;
      sync();
    };
    const onPointerLeave = () => {
      hovering = false;
      sync();
    };
    const onFocusIn = () => {
      focusWithin = true;
      sync();
    };
    const onFocusOut = (e: FocusEvent) => {
      if (!root.contains(e.relatedTarget as Node | null)) {
        focusWithin = false;
        sync();
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    reduced.addEventListener("change", onReducedChange);
    root.addEventListener("pointerenter", onPointerEnter);
    root.addEventListener("pointerleave", onPointerLeave);
    root.addEventListener("focusin", onFocusIn);
    root.addEventListener("focusout", onFocusOut);
    sync();

    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      reduced.removeEventListener("change", onReducedChange);
      root.removeEventListener("pointerenter", onPointerEnter);
      root.removeEventListener("pointerleave", onPointerLeave);
      root.removeEventListener("focusin", onFocusIn);
      root.removeEventListener("focusout", onFocusOut);
    };
  }, [userPaused]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    }
  };

  const slide = slides[index];

  return (
    <section id="hero" className="relative bg-paper text-ink">
      <div className="flex flex-col gap-10 px-4 pb-14 pt-28 md:px-10 lg:min-h-[100svh] lg:flex-row lg:items-end lg:gap-[max(1.6rem,1.25vw)] lg:pb-[max(2.4rem,1.6667vw)] lg:pt-[max(8rem,5.2083vw)] lg:pr-[max(2.4rem,1.6667vw)]">
        {/* ---------- left column — motto as masked-line display block ---------- */}
        <div className="order-2 min-w-0 flex-1 lg:order-1">
          <h1 className="font-display text-ink">
            <Reveal variant="mask" as="span" className="block text-[clamp(4.2rem,8.5vw,9.2rem)]">
              Gawi Sabumi
            </Reveal>
            <Reveal variant="mask" as="span" delay={1} className="block text-[clamp(4.2rem,8.5vw,9.2rem)]">
              Kawa
            </Reveal>
            <Reveal variant="mask" as="span" delay={2} className="block text-[clamp(4.2rem,8.5vw,9.2rem)]">
              Manuntung<span className="text-accent">.</span>
            </Reveal>
          </h1>

          <Reveal delay={3} className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 font-sans text-sm font-bold uppercase tracking-wide">
            <span className="flex items-center gap-2.5">
              <span aria-hidden="true" className="inline-block size-2 bg-accent" />
              Open Daily 10:00–22:00 WITA
            </span>
            <span aria-hidden="true" className="hidden h-4 w-px bg-hairline sm:block" />
            <a
              href="#location"
              className="text-mute transition-colors hover:text-accent hover:underline underline-offset-4"
            >
              Jl. Ahmad Yani KM 2
            </a>
          </Reveal>
        </div>

        {/* ---------- right column — KV carousel with utils bar ---------- */}
        <div className="order-1 w-full min-w-0 lg:order-2 lg:w-[46%] lg:shrink-0">
          <Reveal variant="ink">
            <div
              ref={regionRef}
              role="region"
              aria-roledescription="carousel"
              aria-label="Kampanye utama Duta Mall"
              onKeyDown={onKeyDown}
              className="w-full"
            >
              {/* stage — LWT KV aspect ratio */}
              <div
                className="relative aspect-[4/5] w-full overflow-hidden border border-ink bg-silver sm:aspect-[4/3] lg:aspect-[1280/1080]"
                style={{ touchAction: "pan-y" }}
                {...({
                  onPointerDown: (e: React.PointerEvent) => {
                    (e.currentTarget as HTMLElement).dataset.x0 = String(e.clientX);
                  },
                  onPointerUp: (e: React.PointerEvent) => {
                    const x0 = (e.currentTarget as HTMLElement).dataset.x0;
                    if (x0 === undefined) return;
                    const dx = e.clientX - Number(x0);
                    if (Math.abs(dx) > 48) go(dx < 0 ? 1 : -1);
                    delete (e.currentTarget as HTMLElement).dataset.x0;
                  },
                } as React.HTMLAttributes<HTMLDivElement>)}
              >
                {slides.map((s, i) => {
                  const active = i === index;
                  const style = groundStyles[s.ground];
                  return (
                    <div
                      key={s.id}
                      role="group"
                      aria-roledescription="slide"
                      aria-label={`Slide ${i + 1} dari ${slides.length}`}
                      aria-hidden={!active}
                      inert={!active}
                      className={`hero-slide absolute inset-0 ${active ? "z-10" : ""}`}
                    >
                      {s.image ? (
                        // eslint-disable-next-line @next/next/no-img-element -- licensed artwork slot, swap-ready
                        <img
                          src={s.image.src}
                          alt={s.image.alt}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      ) : (
                        <PosterArt slide={s} />
                      )}

                      {/* poster text block */}
                      <div className="absolute inset-x-0 top-0 flex flex-col items-center px-5 pt-6 text-center md:px-6 md:pt-8">
                        <p
                          className={`inline-block px-2.5 py-1.5 font-sans text-xs font-bold uppercase tracking-widest ${style.kicker}`}
                        >
                          {s.kicker}
                        </p>
                        <p
                          className={`mt-4 font-display uppercase ${style.title}`}
                        >
                          {s.lines.map((ln, li) => (
                            <span
                              key={li}
                              className={`block text-[clamp(1.8rem,4vw,3rem)] max-md:text-[clamp(2.4rem,8.5vw,3.6rem)] ${ln.hi ? style.hi : ""}`}
                            >
                              {ln.text}
                            </span>
                          ))}
                        </p>
                        <a
                          href={s.href}
                          tabIndex={active ? 0 : -1}
                          className={`mt-5 inline-flex items-center gap-2 border px-4 py-1.5 font-sans text-xs font-bold uppercase tracking-widest transition-colors md:px-5 md:py-2 md:text-sm ${style.pill}`}
                        >
                          {s.date}
                          <IconArrow size={13} />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* ---------- utils bar — the LWT carousel control bar ---------- */}
              <div className="flex items-stretch border border-t-0 border-ink bg-paper text-ink">
                {/* League Gothic pagination: current / total */}
                <div className="flex shrink-0 items-center gap-1.5 px-3 py-2" aria-hidden="true">
                  <span className="font-display text-2xl text-ink">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="relative h-3 w-2">
                    <span className="absolute left-1/2 top-0 h-3 w-px origin-center rotate-[20deg] bg-ink" />
                  </span>
                  <span className="font-display text-2xl text-ghost">
                    {String(slides.length).padStart(2, "0")}
                  </span>
                </div>

                {/* title — hairline separator, single line, clamped */}
                <p className="utils-tit min-w-0 flex-1 overflow-hidden truncate border-l border-ink px-4 font-sans text-sm font-bold uppercase tracking-wide leading-[3.9] max-md:leading-[3.9]">
                  {slide.title}
                </p>

                {/* prev / next — hairline cells */}
                <div className="flex shrink-0 items-stretch">
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Slide sebelumnya"
                    className="flex w-12 items-center justify-center border-l border-ink transition-colors hover:bg-ink hover:text-paper"
                  >
                    <IconArrow size={16} className="rotate-180" />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Slide berikutnya"
                    className="flex w-12 items-center justify-center border-l border-ink transition-colors hover:bg-ink hover:text-paper"
                  >
                    <IconArrow size={16} />
                  </button>
                  {/* pause — square accent cell, LWT red plate */}
                  <button
                    type="button"
                    onClick={() => setUserPaused((v) => !v)}
                    aria-pressed={userPaused}
                    aria-label={userPaused ? "Putar otomatis" : "Jeda putar otomatis"}
                    className={`flex w-12 items-center justify-center border-l border-ink transition-colors ${
                      userPaused ? "bg-accent text-paper" : "hover:bg-silver"
                    }`}
                  >
                    {userPaused ? (
                      <IconArrow size={14} className="rotate-90" />
                    ) : (
                      <span aria-hidden="true" className="flex gap-1">
                        <span className="block h-3.5 w-1 bg-current" />
                        <span className="block h-3.5 w-1 bg-current" />
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* visually-hidden slide announcer */}
      <p aria-live={userPaused ? "polite" : "off"} className="sr-only">
        Slide {index + 1} dari {slides.length}: {slide.title}
      </p>
    </section>
  );
}
