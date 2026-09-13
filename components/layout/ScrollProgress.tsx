"use client";

import { useEffect, useState } from "react";

/** Thin accent bar tracking scroll progress — structural, not decorative. */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? doc.scrollTop / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-1 bg-transparent"
    >
      <div
        className="h-full w-full origin-left bg-accent"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
