"use client";

import { useState } from "react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { IconCalendar, IconArrow } from "@/components/ui/Icons";
import { events } from "@/app/data/home";

/** Event card — mobile: fill-inversion; md+: persistent shadow + brutalist hover lift. */
function EventCard({
  date,
  category,
  title,
  excerpt,
  accent,
}: {
  date: string;
  category: string;
  title: string;
  excerpt: string;
  accent?: boolean;
}) {
  const [saved, setSaved] = useState(false);

  return (
    <article
      className={`group relative border-2 border-ink transition-[background-color,transform,box-shadow] duration-150 ${
        accent
          ? "bg-silver md:bg-paper md:shadow-brutal"
          : "bg-paper hover:bg-silver md:shadow-brutal-sm md:hover:bg-paper md:hover:-translate-x-[2px] md:hover:-translate-y-[2px] md:hover:shadow-brutal"
      }`}
    >
      <div className="flex h-full flex-col">
        <div
          className={`flex items-center justify-between border-b-2 border-ink px-4 py-2.5 ${
            category === "CSR" ? "bg-paper" : "bg-ink"
          }`}
        >
          <span
            className={`font-mono text-[11px] font-bold uppercase tracking-widest ${
              category === "CSR" ? "text-ink" : "text-paper"
            }`}
          >
            {category}
          </span>
          <span className="border border-ink bg-accent px-1.5 py-0.5 font-mono text-[11px] font-bold uppercase tracking-widest text-ink">
            {date}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <h3 className="font-display text-3xl uppercase leading-[0.95]">{title}</h3>
          <p className="mt-2 flex-1 font-sans text-sm leading-relaxed text-smoke">{excerpt}</p>

          <div className="mt-4 flex items-center justify-between">
            <button
              type="button"
              aria-pressed={saved}
              onClick={() => setSaved((v) => !v)}
              className={`inline-flex items-center gap-2 border-2 border-ink px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-widest transition-colors ${
                saved ? "bg-ink text-paper" : "bg-paper hover:bg-silver"
              }`}
            >
              <IconCalendar size={13} />
              {saved ? "Tersimpan ✓" : "Ingatkan Saya"}
            </button>
            <IconArrow
              size={18}
              className="text-accent transition-transform duration-150 group-hover:translate-x-1.5"
            />
          </div>
        </div>
      </div>
    </article>
  );
}

export default function WhatsOn() {
  return (
    <Section id="whatson" className="bg-paper">
      <div className="px-4 py-14 md:px-10 md:py-20">
        <SectionHeading
          index="05 / WHAT'S ON"
          title="AGENDA & KEGIATAN"
          right={
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-smoke">
              Event · CSR · Live Music
            </span>
          }
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {events.map((ev) => (
            <EventCard
              key={ev.id}
              date={ev.date}
              category={ev.category}
              title={ev.title}
              excerpt={ev.excerpt}
              accent={ev.accent}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
