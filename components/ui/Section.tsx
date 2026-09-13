import type { ReactNode } from "react";

/** Section shell — full-width stark band. Dark inverts to canvas black. */
export function Section({
  id,
  dark = false,
  className = "",
  children,
}: {
  id?: string;
  dark?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`relative ${dark ? "bg-ink text-paper" : "bg-paper text-ink"} ${className}`}
    >
      {children}
    </section>
  );
}

/** Section header: wayfinding index chip + League Gothic display title. */
export function SectionHeading({
  index,
  title,
  dark = false,
  right,
}: {
  index: string;
  title: string;
  dark?: boolean;
  right?: ReactNode;
}) {
  return (
    <div className="mb-10 md:mb-14">
      <div className="mb-5 flex flex-wrap items-center gap-x-6 gap-y-3">
        <span
          className={`inline-block px-2 py-1 font-mono text-[11px] font-bold uppercase tracking-widest ${
            dark ? "bg-accent text-ink" : "bg-ink text-paper"
          }`}
        >
          {index}
        </span>
        {right}
      </div>
      <h2 className="font-display uppercase leading-[0.9] tracking-tight">
        <span className="block text-5xl md:text-7xl">{title}</span>
      </h2>
    </div>
  );
}
