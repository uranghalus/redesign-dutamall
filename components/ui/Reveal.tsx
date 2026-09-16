"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Scroll-reveal wrapper — the home page's single entrance system,
 * in the measured lwt.co.kr language.
 *
 * Variants:
 *  - default: rise-and-settle (images, cards)
 *  - `mask`:  the LWT title reveal — this element is the overflow-hidden
 *             clipping wrapper; its FIRST CHILD travels in from
 *             translateY(230%) rotate(10deg) scaleY(2.2) with expo-out
 *             easing (main.css §sectionKv title)
 *  - `ink`:   pure fade for large masses (no travel)
 *  - `seq`:   DOM-order stagger for direct children (capped at 6)
 *
 * Hidden start states are gated behind the page-level `.js` class (set by an
 * inline script in app/layout.tsx before first paint), so a failed script can
 * never hide the page. `prefers-reduced-motion` neutralizes movement in CSS —
 * the reveal still happens, it just doesn't travel. Plays ONCE per element.
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
  variant?: "ink" | "mask" | "seq";
  as?: "div" | "ul" | "li" | "p" | "article" | "span" | "dl" | "h1" | "h2" | "h3";
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

  const inner =
    variant === "mask" ? <span className="block">{children}</span> : children;

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- polymorphic ref
      ref={ref as any}
      data-reveal={variant ? undefined : ""}
      className={`${variant === "ink" ? "reveal-ink" : ""} ${
        variant === "mask" ? "reveal-mask" : ""
      } ${variant === "seq" ? "reveal-seq" : ""} ${className}`.trim()}
      style={style}
      id={id}
    >
      {inner}
    </Tag>
  );
}
