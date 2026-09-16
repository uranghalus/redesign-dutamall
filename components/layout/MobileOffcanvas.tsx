"use client";

import { useEffect, useRef, useState } from "react";
import { IconClose, IconArrow } from "@/components/ui/Icons";
import { wayfinding } from "@/app/data/home";

/**
 * LWT offcanvas menu — black, full-height, from the right (60rem wide on
 * the reference). Giant League Gothic items, red active/expanded state,
 * accordion sublinks, expo-out slide, body-scroll lock, Escape close,
 * focus moves in on open and returns to the trigger on close.
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

  const groups: { title: string; items: { label: string; href: string }[] }[] = [
    {
      title: "Shopping",
      items: [
        { label: "Cinema XXI & The Premiere", href: "#cinema" },
        { label: "Tenant & Boutique", href: "#tenants" },
        { label: "Food Court & Coffee", href: "#tenants" },
      ],
    },
    {
      title: "Facilities",
      items: [
        { label: "12 Fasilitas Utama", href: "#facilities" },
        { label: "Parkir & Akses", href: "#location" },
      ],
    },
    {
      title: "Hospitality",
      items: [
        { label: "FUGO Hotel & Suites", href: "#fugo" },
        { label: "Book Direct", href: "#fugo" },
      ],
    },
    {
      title: "What's On",
      items: [
        { label: "Event & CSR", href: "#whatson" },
        { label: "Live Music", href: "#whatson" },
      ],
    },
    {
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
      {/* panel */}
      <div
        ref={panelRef}
        id="mobile-offcanvas"
        role="dialog"
        aria-modal="true"
        aria-label="Menu navigasi"
        tabIndex={-1}
        data-open={open}
        aria-hidden={!open}
        className="offcanvas fixed inset-y-0 right-0 z-[99] flex w-full max-w-[60rem] flex-col overflow-y-auto bg-ink text-paper outline-none"
      >
        {/* head */}
        <div className="flex items-center justify-between px-6 py-4 md:px-10">
          <span className="font-sans text-xs font-bold uppercase tracking-widest text-paper/60">
            Duta Mall Banjarmasin
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup menu navigasi"
            className="flex size-11 items-center justify-center transition-colors hover:text-accent"
          >
            <IconClose size={26} />
          </button>
        </div>

        {/* menu — accordion groups, LWT item scale */}
        <nav aria-label="Utama mobile" className="flex-1 px-6 pb-16 md:px-10">
          {groups.map((g) => {
            const isOpen = expanded === g.title;
            return (
              <div key={g.title} className="border-b border-paper/15">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setExpanded(isOpen ? null : g.title)}
                  className={`flex w-full items-center justify-between py-5 text-left font-display text-4xl uppercase md:text-5xl ${
                    isOpen ? "text-accent" : "text-paper"
                  }`}
                >
                  {g.title}
                  <IconArrow
                    size={22}
                    className={`shrink-0 transition-transform duration-500 ${isOpen ? "rotate-90" : ""}`}
                  />
                </button>
                <div className="acc-body" data-open={isOpen}>
                  <div>
                    <ul className="pb-6">
                      {g.items.map((it) => (
                        <li key={it.label}>
                          <a
                            href={it.href}
                            onClick={onClose}
                            tabIndex={open ? 0 : -1}
                            className="group flex items-center justify-between gap-4 py-2.5 font-sans text-base font-bold uppercase tracking-wide text-paper/80 transition-colors hover:text-accent"
                          >
                            {it.label}
                            <span
                              aria-hidden="true"
                              className="inline-block size-1.5 bg-paper/30 transition-colors group-hover:bg-accent"
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
          <div className="mt-8 flex flex-col gap-2 font-sans text-sm font-bold uppercase tracking-wide text-paper/60">
            <span>Open Daily 10:00–22:00 WITA</span>
            <a href="tel:+625113278888" className="transition-colors hover:text-accent">
              (0511) 327-8888
            </a>
          </div>
        </nav>

        {/* wayfinding strip — the mall's structural codes, as on the INFO bar */}
        <div className="border-t border-paper/15 px-6 py-5 md:px-10">
          <ul className="flex flex-wrap gap-2">
            {wayfinding.map((w) => (
              <li key={w.code}>
                <a
                  href={w.href}
                  onClick={onClose}
                  tabIndex={open ? 0 : -1}
                  aria-label={`${w.label}, ${w.floor}`}
                  className={`inline-block border border-paper/40 px-2 py-1 font-sans text-xs font-bold uppercase tracking-widest transition-colors ${
                    w.accent
                      ? "border-accent bg-accent text-paper"
                      : "text-paper/80 hover:border-paper hover:text-paper"
                  }`}
                >
                  {w.code}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
