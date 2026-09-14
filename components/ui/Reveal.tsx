"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Scroll-reveal wrapper — the home page's single entrance system.
 *
 * One material idea (per the motion thesis): a confident rise-and-settle,
 * played ONCE per element as it enters the viewport. No replay, no scroll
 * scrubbing. IntersectionObserver with a -8% bottom margin, so the element
 * is visibly inside before it starts.
 *
 * Hidden start states are gated behind the page-level `.js` class (set by an
 * inline script in app/layout.tsx before first paint), so a failed script can
 * never hide the page. `prefers-reduced-motion` neutralizes the movement in
 * CSS — the reveal still happens, it just doesn't travel.
 *
 * Variants:
 *  - default: rise-and-settle on this element
 *  - `ink`:    pure fade for large ink plates (no travel — the mass is in the
 *              ground color, not the element)
 *  - `wipe`:   ink-shutter reveal for display headings (clip-path left→right,
 *              the signage metaphor: the sign is mounted as the visitor reads)
 *  - `seq`:    applies DOM-order stagger to direct children (capped at 6)
 */
export default function Reveal({
  children,
  variant,
  as: Tag = "div",
  className = "",
  delay = 0,
  id,
}: {
  children: ReactNode;
  variant?: "ink" | "wipe" | "seq";
  as?: "div" | "ul" | "li" | "p" | "article" | "span" | "dl";
  className?: string;
  /** extra stagger index in 60ms steps, beyond the seq slot number */
  delay?: number;
  id?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style = delay > 0 ? ({ "--r-i": delay } as React.CSSProperties) : undefined;

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- polymorphic ref
      ref={ref as any}
      data-reveal={variant ? undefined : ""}
      className={`${variant === "ink" ? "reveal-ink" : ""} ${
        variant === "wipe" ? "reveal-wipe" : ""
      } ${variant === "seq" ? "reveal-seq" : ""} ${className}`.trim()}
      style={style}
      id={id}
    >
      {children}
    </Tag>
  );
}
