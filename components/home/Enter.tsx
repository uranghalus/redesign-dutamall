"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/ui/Reveal";

/**
 * ENTER — the LWT §sectionEnter grammar: a full-bleed black 16:9 band
 * (height .5625 × viewport) with centered white League Gothic captions
 * over a dark plate. The captions rotate with the masked-line reveal;
 * the plate is authored typographic art (posters recolored at 16:9),
 * with an image slot ready for licensed film stills.
 */

const captions = [
  { line1: "BELANJA", line2: "BERKELAS" },
  { line1: "TONTONAN", line2: "TERKINI" },
  { line1: "MENGINAP", line2: "DI ATAS MALL" },
];

export default function Enter() {
  const [idx, setIdx] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % captions.length), 5000);
    return () => clearInterval(t);
  }, []);

  /* subtle parallax on the plate — 1:1 with LWT's image treatment,
     disabled for touch and reduced motion */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch" || reduced.matches) return;
      const r = el.getBoundingClientRect();
      const px = ((e.clientX - r.left) / r.width - 0.5) * 2;
      const py = ((e.clientY - r.top) / r.height - 0.5) * 2;
      el.style.setProperty("--enter-px", px.toFixed(3));
      el.style.setProperty("--enter-py", py.toFixed(3));
    };
    const reset = () => {
      el.style.setProperty("--enter-px", "0");
      el.style.setProperty("--enter-py", "0");
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", reset);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", reset);
    };
  }, []);

  const cap = captions[idx];

  return (
    <section
      id="enter"
      aria-label="Pengalaman Duta Mall"
      className="relative bg-ink text-paper"
    >
      <div
        ref={ref}
        className="relative h-[80vh] min-h-[420px] w-full overflow-hidden bg-ink lg:h-[calc(.5625*var(--vw,1vw))]"
      >
        {/* dark plate — authored typographic art at 16:9 (image slot ready) */}
        <div
          aria-hidden="true"
          className="absolute inset-[-24px] transition-transform duration-700 ease-out"
          style={{
            transform:
              "translate3d(calc(var(--enter-px,0)*-14px), calc(var(--enter-py,0)*-14px), 0)",
          }}
        >
          {/* structural geometry — the mall block, drawn stark */}
          <div className="absolute left-[8%] top-[14%] h-[30%] w-[18%] border border-paper/15" />
          <div className="absolute left-[12%] top-[20%] h-[30%] w-[18%] border border-paper/10" />
          <div className="absolute right-[10%] top-[18%] h-[38%] w-[14%] bg-paper/[0.04]" />
          <div className="absolute bottom-[16%] left-[30%] h-[16%] w-[34%] border border-paper/10" />
          <span className="absolute left-[15%] top-[42%] font-display text-[11rem] uppercase leading-none text-paper/[0.05]">
            Duta
          </span>
          <span className="absolute bottom-[8%] right-[6%] font-display text-[8rem] uppercase leading-none text-accent/20">
            Mall
          </span>
          {/* scrim — LWT's #00000052 overlay */}
          <div className="absolute inset-0 bg-black/32" />
        </div>

        {/* centered caption — masked reveal, white on black */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 px-4 text-center">
          <Reveal variant="mask" as="span" className="block font-display text-[clamp(4rem,10vw,9.6rem)]" key={`l1-${idx}`}>
            {cap.line1}
          </Reveal>
          <Reveal variant="mask" as="span" delay={1} className="block font-display text-[clamp(4rem,10vw,9.6rem)] text-paper/90" key={`l2-${idx}`}>
            {cap.line2}
          </Reveal>
          <p className="mt-4 font-sans text-xs font-bold uppercase tracking-widest text-paper/60">
            Duta Mall Banjarmasin — Satu Destinasi
          </p>
        </div>
      </div>
    </section>
  );
}
