import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";

/** Section shell — LWT full-width white band (dark = canvas black). */
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

/**
 * Section header — LWT grammar: small square index chip (red = on-brand
 * sections), League Gothic display title behind a masked-line reveal,
 * optional trailing meta.
 */
export function SectionHeading({
  index,
  title,
  red = false,
  right,
}: {
  index: string;
  title: string;
  red?: boolean;
  right?: ReactNode;
}) {
  return (
    <div className="mb-10 md:mb-14">
      <div className="mb-5 flex flex-wrap items-center gap-x-6 gap-y-3">
        <span
          className={`inline-block px-2 py-1 font-sans text-[11px] font-bold uppercase tracking-widest ${
            red ? "bg-accent text-paper" : "bg-ink text-paper"
          }`}
        >
          {index}
        </span>
        {right}
      </div>
      <h2 className="font-display uppercase">
        <Reveal variant="mask" as="span" className="block text-5xl md:text-7xl">
          {title}
        </Reveal>
      </h2>
    </div>
  );
}
