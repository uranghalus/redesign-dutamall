"use client";

import { useInsertionEffect } from "react";

/**
 * Motion gate — replaces the pre-paint inline <script> that React 19 (Next
 * 16.3.5) forbids inside components.
 *
 * - `.js` class: useInsertionEffect fires during the commit phase, before
 *   useEffect painters and before the browser paints the hydrated tree, so
 *   reveal start-states (gated behind `.js` in globals.css) never flash.
 *   Without JS the class never lands and the page renders fully visible.
 * - `--vw`: a scrollbar-proof 1vw for the fluid type scale, kept current on
 *   resize; globals.css falls back to 1vw until it lands.
 */
export default function MotionGate() {
  useInsertionEffect(() => {
    document.documentElement.classList.add("js");
    const setVw = () =>
      document.documentElement.style.setProperty("--vw", `${document.documentElement.clientWidth}px`);
    setVw();
    window.addEventListener("resize", setVw, { passive: true });
    return () => window.removeEventListener("resize", setVw);
  }, []);

  return null;
}
