"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Count-up stat numeral — the FUGO plate's one authored moment.
 *
 * SSR renders the FINAL value (the data is the truth; no-JS users and
 * crawlers see it), then on first viewport entry the client replays the
 * number from 0 with the system's exponential ease-out — arrival expressed
 * as accumulation. Plays ONCE (unobserved after firing), like the section
 * reveals it shares the choreography with.
 *
 * `prefers-reduced-motion` skips the animation entirely — the final value
 * simply stays (no movement, arrival preserved).
 */
export default function CountUp({
  value,
  duration = 1100,
  className = "",
}: {
  /** non-negative integer to count up to */
  value: number;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          io.unobserve(e.target);
          const t0 = performance.now();
          const tick = (t: number) => {
            const p = Math.min(1, (t - t0) / duration);
            const eased = 1 - Math.pow(1 - p, 4); // quartic ease-out ≈ --ease-out
            setShown(Math.round(eased * value));
            if (p < 1) raf = requestAnimationFrame(tick);
          };
          setShown(0);
          raf = requestAnimationFrame(tick);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {shown.toLocaleString("id-ID")}
    </span>
  );
}
