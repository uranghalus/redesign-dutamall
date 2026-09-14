"use client";

import { useEffect, useRef, useState } from "react";
import { IconClose, IconInfo } from "@/components/ui/Icons";
import { wayfinding } from "@/app/data/home";

/* ============================================================
   HERO QUICK NAV — floating bottom-left panel (LWT INFO bar).
   Expanded over the hero; past the hero it collapses to a
   compact info chip (current section) that re-expands on
   hover/tap and collapses on outside click or Escape.
   Each branch wraps in a .quicknav-foldwrap grid track that
   interpolates 0fr ↔ 1fr, so the bar smoothly folds to the
   INFO head; content fades and nudges 6px. One motion idea:
   the fold. Static under reduced motion.
   ============================================================ */

export default function HeroQuickNav() {
  const [pastHero, setPastHero] = useState(false);
  const [activeCode, setActiveCode] = useState("INF");
  const [pinned, setPinned] = useState(false);
  const [hovering, setHovering] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const pastHeroRef = useRef(false);
  const foldRefs = useRef<Record<"chip" | "list", HTMLDivElement | null>>({
    chip: null,
    list: null,
  });

  /* past-hero detection + active-section tracking — one scroll
     subscription; pastHero is read through a ref so the listener
     survives state changes without resubscribing */
  useEffect(() => {
    const hero = document.getElementById("hero");
    const sections = wayfinding
      .map((w) => document.querySelector(w.href))
      .filter((el): el is Element => Boolean(el));

    const onScroll = () => {
      const anchor = hero ?? document.body;
      const past = anchor.getBoundingClientRect().bottom < 120;
      if (past !== pastHeroRef.current) {
        pastHeroRef.current = past;
        setPastHero(past);
      }

      if (past) {
        let current = "INF";
        for (let i = 0; i < wayfinding.length; i++) {
          const el = sections[i];
          if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) {
            current = wayfinding[i].code;
          }
        }
        setActiveCode((prev) => (prev === current ? prev : current));
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* outside click + Escape close the pinned panel */
  useEffect(() => {
    if (!pinned) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setPinned(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPinned(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [pinned]);

  const expanded = !pastHero || pinned || hovering;

  /* Measure each fold branch's natural width and let the CSS
     transition width→0 when folded. Measuring here, not in CSS,
     is what makes a horizontal fold inside a flex row actually
     collapse: the browser cannot transition to a fr unit, but it
     can to a pixel value. The bar is display:none below md, where
     every box measures 0 — skip that state and re-measure when
     the breakpoint is crossed (and once fonts settle). */
  useEffect(() => {
    const md = window.matchMedia("(min-width: 768px)");
    const measure = () => {
      if (!md.matches) return; // display:none — rects are all 0
      (Object.keys(foldRefs.current) as ("chip" | "list")[]).forEach((key) => {
        const el = foldRefs.current[key];
        if (!el) return;
        const inner = el.firstElementChild as HTMLElement | null;
        if (!inner) return;
        const w = inner.getBoundingClientRect().width;
        // custom property, not style.width: the folded rule must be
        // able to override it, and inline width would win the cascade
        if (w > 0) el.style.setProperty("--fold-w", w + "px");
      });
    };
    measure();
    window.addEventListener("resize", measure);
    md.addEventListener("change", measure);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => {
      window.removeEventListener("resize", measure);
      md.removeEventListener("change", measure);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="fixed bottom-4 left-4 z-[70] hidden md:block"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div
        aria-expanded={expanded}
        className="flex items-stretch border-2 border-ink bg-paper shadow-brutal"
      >
        {/* INFO head — always visible, tap toggles the pinned panel.
            Icon reflects the pinned state only: over the hero the bar is
            expanded by position, so the head reads as plain signage. */}
        <button
          type="button"
          onClick={() => setPinned((v) => !v)}
          aria-label={pinned ? "Tutup panel informasi" : "Buka panel informasi"}
          aria-pressed={pinned}
          className="flex min-h-[56px] items-center gap-2 bg-ink px-3.5 text-paper transition-colors"
        >
          <span className="font-display text-2xl uppercase leading-none tracking-wide">Info</span>
          {pinned ? (
            <IconClose size={15} className="text-accent" />
          ) : (
            <IconInfo size={15} className="text-accent" />
          )}
        </button>

        {/* compact chip: current section code — folds away when
            expanded so the collapsed bar is just INFO + chip */}
        <div
          ref={(el) => {
            foldRefs.current.chip = el;
          }}
          data-folded={expanded}
          className="quicknav-fold"
          aria-hidden={expanded}
        >
          <button
            type="button"
            onClick={() => setPinned(true)}
            tabIndex={expanded ? -1 : 0}
            aria-label={`Sedang dilihat: ${
              wayfinding.find((w) => w.code === activeCode)?.label ?? "Informasi"
            } — buka panel`}
            className="flex min-h-[56px] min-w-max items-center gap-2 border-l-2 border-ink bg-accent px-3.5 font-mono text-xs font-bold uppercase tracking-widest text-ink"
          >
            <span aria-hidden="true" className="inline-block size-2 bg-ink" />
            {activeCode}
          </button>
        </div>

        {/* full wayfinding list — folds away when collapsed so the
            bar smoothly shrinks to the INFO head */}
        <div
          ref={(el) => {
            foldRefs.current.list = el;
          }}
          data-folded={!expanded}
          className="quicknav-fold"
          aria-hidden={!expanded}
        >
          <ul
            className="flex w-max items-stretch divide-x-2 divide-ink"
          >
          {wayfinding.map((item) => (
            <li key={item.code} className="flex">
              <a
                href={item.href}
                tabIndex={expanded ? 0 : -1}
                aria-hidden={!expanded}
                className="flex min-h-[56px] min-w-[64px] flex-col items-center justify-center gap-1 px-2.5 py-1.5 text-center transition-colors hover:bg-silver"
              >
                <span
                  className={`px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest ${
                    item.accent ? "bg-accent text-ink" : "bg-ink text-paper"
                  }`}
                >
                  {item.code}
                </span>
                <span className="font-mono text-[10px] font-bold uppercase leading-tight tracking-wide text-ink">
                  {item.label.split(" ")[0]}
                </span>
              </a>
            </li>
          ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
