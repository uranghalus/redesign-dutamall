"use client";

import { useEffect, useRef, useState } from "react";
import { IconClose, IconArrow } from "@/components/ui/Icons";
import { wayfinding } from "@/app/data/home";

/**
 * Blueprint offcanvas — the hero's left column expanded full-screen:
 * warm-bone ground, ink League Gothic groups, brass active/expanded
 * state, hairline dividers, and the wayfinding codes as numbered
 * blueprint cells (hero strip grammar). Expo-out slide, body-scroll
 * lock, Escape close, focus moves in on open and returns via the
 * header trigger.
 */
export default function MobileOffcanvas({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  /* focus in on open + Escape to close */
  useEffect(() => {
    if (!open) return;
    panelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  /* numbered groups — the hero's index grammar (00 kicker, 01–04 strip) */
  const groups: {
    num: string;
    title: string;
    items: { label: string; href: string }[];
  }[] = [
    {
      num: "01",
      title: "Shopping",
      items: [
        { label: "Cinema XXI & The Premiere", href: "#cinema" },
        { label: "Tenant & Boutique", href: "#tenants" },
        { label: "Food Court & Coffee", href: "#tenants" },
      ],
    },
    {
      num: "02",
      title: "Facilities",
      items: [
        { label: "12 Fasilitas Utama", href: "#facilities" },
        { label: "Parkir & Akses", href: "#location" },
      ],
    },
    {
      num: "03",
      title: "Hospitality",
      items: [
        { label: "FUGO Hotel & Suites", href: "#fugo" },
        { label: "Book Direct", href: "#fugo" },
      ],
    },
    {
      num: "04",
      title: "What's On",
      items: [
        { label: "Event & CSR", href: "#whatson" },
        { label: "Live Music", href: "#whatson" },
      ],
    },
    {
      num: "05",
      title: "Visit",
      items: [
        { label: "Lokasi & Rute", href: "#location" },
        { label: "Jam Operasional", href: "#location" },
        { label: "Kontak", href: "#location" },
      ],
    },
  ];

  return (
    <div className={`xl:hidden ${open ? "" : "pointer-events-none"}`}>
      {/* backdrop */}
      <div
        className="offcanvas-backdrop fixed inset-0 z-[88] bg-ink/50"
        data-open={open}
        onClick={onClose}
        aria-hidden="true"
      />
      {/* panel — the blueprint column, full height */}
      <div
        ref={panelRef}
        id="mobile-offcanvas"
        role="dialog"
        aria-modal="true"
        aria-label="Menu navigasi"
        tabIndex={-1}
        data-open={open}
        aria-hidden={!open}
        className="offcanvas fixed inset-y-0 right-0 z-[99] flex w-full max-w-[600px] flex-col overflow-y-auto bg-bone text-ink outline-none"
      >
        {/* head — kicker grammar: brass code, hairline rule, wordmark */}
        <div className="flex items-center justify-between border-b border-hairline px-6 py-4 md:px-10">
          <span className="flex items-baseline gap-3 font-sans text-xs font-bold uppercase tracking-[0.22em] text-dim">
            <span aria-hidden="true" className="font-bold tracking-widest text-brass">
              00
            </span>
            <span aria-hidden="true" className="h-px w-6 self-center bg-brass-soft" />
            Duta Mall Banjarmasin
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup menu navigasi"
            className="flex size-11 items-center justify-center transition-colors hover:text-brass"
          >
            <IconClose size={26} />
          </button>
        </div>

        {/* menu — accordion groups, League Gothic at LWT item scale */}
        <nav aria-label="Utama mobile" className="flex-1 px-6 pb-16 md:px-10">
          {groups.map((g) => {
            const isOpen = expanded === g.title;
            return (
              <div key={g.title} className="border-b border-hairline">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setExpanded(isOpen ? null : g.title)}
                  className={`flex w-full items-baseline gap-4 py-5 text-left ${isOpen ? "text-brass" : "text-ink"}`}
                >
                  <span
                    aria-hidden="true"
                    className={`font-sans text-sm font-bold tracking-widest ${isOpen ? "text-brass" : "text-ghost"}`}
                  >
                    {g.num}
                  </span>
                  <span className="font-display text-4xl uppercase md:text-5xl">{g.title}</span>
                  <IconArrow
                    size={22}
                    className={`ml-auto shrink-0 self-center transition-transform duration-500 ${isOpen ? "rotate-90" : ""}`}
                  />
                </button>
                <div className="acc-body" data-open={isOpen}>
                  <div>
                    <ul className="pb-6 pl-9">
                      {g.items.map((it) => (
                        <li key={it.label}>
                          <a
                            href={it.href}
                            onClick={onClose}
                            tabIndex={open ? 0 : -1}
                            className="group flex items-center justify-between gap-4 py-2.5 font-sans text-base font-bold uppercase tracking-[0.14em] text-dim transition-colors hover:text-ink"
                          >
                            {it.label}
                            <span
                              aria-hidden="true"
                              className="inline-block size-1.5 bg-ghost transition-colors group-hover:bg-brass"
                            />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}

          {/* footer meta — hours/hotline live here on mobile */}
          <div className="mt-8 flex flex-col gap-2 border-t border-hairline pt-6 font-sans text-sm font-bold uppercase tracking-[0.18em] text-dim">
            <span>Open Daily 10:00–22:00 WITA</span>
            <a href="tel:+625113278888" className="transition-colors hover:text-brass">
              (0511) 327-8888
            </a>
          </div>
        </nav>

        {/* wayfinding strip — the mall's structural codes as numbered
            blueprint cells (hero 01–04 strip grammar) */}
        <div className="border-t border-hairline px-6 py-5 md:px-10">
          <p className="mb-3 font-sans text-xs font-bold uppercase tracking-[0.22em] text-dim">
            Wayfinding
          </p>
          <ul className="flex flex-wrap gap-2">
            {wayfinding.map((w) => (
              <li key={w.code}>
                <a
                  href={w.href}
                  onClick={onClose}
                  tabIndex={open ? 0 : -1}
                  aria-label={`${w.label}, ${w.floor}`}
                  className="inline-flex items-baseline gap-1.5 border border-ink/25 px-2.5 py-1.5 font-sans text-xs font-bold uppercase tracking-widest text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                >
                  <span aria-hidden="true" className="text-[11px] tracking-widest text-brass">
                    {w.code}
                  </span>
                  {w.floor}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
