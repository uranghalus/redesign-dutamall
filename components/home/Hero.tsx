"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { Section } from "@/components/ui/Section";
import { IconArrow, IconPlay } from "@/components/ui/Icons";

/* ============================================================
   HERO — LWT staging: giant static tagline left, campaign
   poster card right, counter control bar under the card.
   Mobile stacks with the card first (reference layout).
   Slides are authored typographic posters in the wayfinding
   world; each carries an `image` slot for licensed artwork.
   ============================================================ */

type Ground = "accent" | "ink" | "paper";

interface Slide {
  id: string;
  kicker: string;
  /** poster display lines; `hi` marks the emphasis line */
  lines: { text: string; hi?: boolean }[];
  title: string;
  date: string;
  href: string;
  ground: Ground;
  /** optional artwork — renders instead of the authored poster */
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

/** Per-ground poster styling: kicker chip, title ink, pill, art tint. */
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
    kicker: "bg-accent text-ink",
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
        <span className="text-outline-paper pointer-events-none absolute -left-2 bottom-0 select-none font-display text-[6.094rem] uppercase leading-none opacity-25 md:text-[9.5625rem]">
          BANJAR
        </span>
        <div className="cell-checker absolute bottom-0 left-0 right-0 h-8 border-t-2 border-ink opacity-40" />
      </div>
    );
  }
  if (slide.id === "live-acoustic") {
    return (
      <div className="absolute inset-0 bg-ink" aria-hidden="true">
        <span className="text-outline-paper pointer-events-none absolute -right-4 bottom-16 hidden select-none font-display text-[6.094rem] uppercase leading-none opacity-[0.07] md:block">
          LIVE
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
        <div className="absolute bottom-0 left-0 right-0 flex h-9 items-center gap-4 overflow-hidden border-t-2 border-paper/20 px-5">
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i} className="h-3 w-6 shrink-0 border border-paper/30" />
          ))}
        </div>
        <span className="text-outline-paper pointer-events-none absolute -right-3 bottom-14 hidden select-none font-display text-[6.094rem] uppercase leading-none opacity-[0.07] md:block">
          C21
        </span>
      </div>
    );
  }
  if (slide.id === "fugo-hotel") {
    return (
      <div className="absolute inset-0 bg-paper" aria-hidden="true">
        <span className="text-outline-ink pointer-events-none absolute -left-3 bottom-0 hidden select-none font-display text-[6.094rem] uppercase leading-none opacity-[0.06] md:block">
          FUGO
        </span>
        <div className="absolute bottom-5 left-5 right-5 h-24 border-2 border-ink/10" />
        <div className="absolute bottom-10 left-9 right-9 h-12 border border-ink/10" />
      </div>
    );
  }
  return (
    <div className="absolute inset-0 bg-paper" aria-hidden="true">
      <span className="text-outline-ink pointer-events-none absolute -left-2 bottom-0 select-none font-display text-[6.094rem] uppercase leading-none opacity-[0.08] md:text-[9.5625rem]">
        P1
      </span>
      <div className="absolute bottom-6 right-6 flex -translate-y-0 flex-col items-center gap-1">
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
  const pointerStart = useRef<{ x: number; y: number } | null>(null);

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

  const onPointerDown = (e: ReactPointerEvent) => {
    pointerStart.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e: ReactPointerEvent) => {
    const start = pointerStart.current;
    pointerStart.current = null;
    if (!start) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      go(dx < 0 ? 1 : -1);
    }
  };

  const slide = slides[index];

  return (
    <Section id="hero" className="border-b-2 border-ink">
      {/* visually-hidden slide announcer */}
      <p aria-live={userPaused ? "polite" : "off"} className="sr-only">
        Slide {index + 1} dari {slides.length}: {slide.title}
      </p>

      <div className="grid gap-10 px-4 pb-14 pt-8 md:px-10 lg:min-h-[calc(100svh-140px)] lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:pb-0 lg:pt-0">
        {/* ---------- static tagline block (LWT left column) ---------- */}
        <div className="order-2 flex flex-col justify-center py-2 lg:order-1 lg:py-16">
          <h1 className="font-display uppercase leading-[0.9] tracking-tight text-ink">
            <span className="block text-[clamp(3.2rem,7.2vw,6.8rem)]">Gawi Sabumi</span>
            <span className="block text-[clamp(3.2rem,7.2vw,6.8rem)]">Kawa</span>
            <span className="block text-[clamp(3.2rem,7.2vw,6.8rem)]">
              Manuntung<span className="text-accent">.</span>
            </span>
          </h1>
          <p className="mt-4 font-mono text-xs font-bold uppercase tracking-widest text-smoke">
            Motto kota Banjarmasin
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 font-mono text-xs font-bold uppercase tracking-widest text-ink">
            <span className="flex items-center gap-2.5">
              <span aria-hidden="true" className="inline-block size-2 bg-accent" />
              Open Daily 10:00–22:00 WITA
            </span>
            <span className="hidden h-4 w-0.5 bg-silver sm:block" aria-hidden="true" />
            <span className="text-smoke">Jl. Ahmad Yani KM 2</span>
          </div>
        </div>

        {/* ---------- campaign poster card (right column) ---------- */}
        <div className="order-1 lg:order-2 lg:flex lg:items-center lg:py-10">
          <div
            ref={regionRef}
            role="region"
            aria-roledescription="carousel"
            aria-label="Kampanye utama Duta Mall"
            onKeyDown={onKeyDown}
            className="flex h-full w-full flex-col border-2 border-ink bg-paper shadow-brutal"
          >
            {/* stage */}
            <div
              className="relative aspect-[3/4] w-full overflow-hidden sm:aspect-[4/3] lg:aspect-auto lg:min-h-[520px] lg:flex-1"
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
              style={{ touchAction: "pan-y" }}
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
                    className="hero-slide absolute inset-0"
                  >
                    {/* poster ground + art */}
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
                    <div className="absolute inset-x-0 top-0 flex flex-col items-center px-5 pt-6 text-center">
                      <p
                        className={`inline-block px-2.5 py-1.5 font-mono text-xs font-bold uppercase tracking-widest ${style.kicker}`}
                      >
                        {s.kicker}
                      </p>
                      <p
                        className={`mt-4 font-display uppercase leading-[0.92] tracking-tight ${style.title}`}
                      >
                        {s.lines.map((ln, li) => (
                          <span
                            key={li}
                            className={`block text-[clamp(1.9rem,4.2vw,3.4rem)] ${ln.hi ? style.hi : ""}`}
                          >
                            {ln.text}
                          </span>
                        ))}
                      </p>
                      <a
                        href={s.href}
                        tabIndex={active ? 0 : -1}
                        className={`mt-5 inline-flex items-center gap-2 rounded-full border-2 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-widest transition-colors ${style.pill}`}
                      >
                        {s.date}
                        <IconArrow size={13} />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ---------- control bar (reference: counter / title / pause / arrows) ---------- */}
            <div className="flex items-stretch border-t-2 border-ink bg-paper">
              <div className="flex items-baseline gap-1.5 border-r-2 border-ink px-4 py-3">
                <span className="font-display text-2xl uppercase leading-none text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-xs font-bold uppercase text-smoke">
                  / {String(slides.length).padStart(2, "0")}
                </span>
              </div>
              <p className="flex min-w-0 flex-1 items-center truncate px-4 font-sans text-sm font-bold uppercase tracking-wide">
                {slide.title}
              </p>
              <div className="flex shrink-0 items-stretch divide-x-2 divide-ink border-l-2 border-ink">
                <button
                  type="button"
                  onClick={() => setUserPaused((v) => !v)}
                  aria-pressed={userPaused}
                  aria-label={userPaused ? "Putar otomatis" : "Jeda putar otomatis"}
                  className="flex w-12 items-center justify-center bg-paper transition-colors hover:bg-silver"
                >
                  {userPaused ? (
                    <IconPlay size={15} />
                  ) : (
                    <span aria-hidden="true" className="flex gap-1">
                      <span className="block h-4 w-1.5 bg-ink" />
                      <span className="block h-4 w-1.5 bg-ink" />
                    </span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Slide sebelumnya"
                  className="flex w-12 items-center justify-center bg-paper transition-colors hover:bg-ink hover:text-paper"
                >
                  <IconArrow size={17} className="rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Slide berikutnya"
                  className="flex w-12 items-center justify-center bg-paper transition-colors hover:bg-ink hover:text-paper"
                >
                  <IconArrow size={17} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
