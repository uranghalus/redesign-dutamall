"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { IconCalendar, IconArrow } from "@/components/ui/Icons";
import { events } from "@/app/data/home";

type Filter = "Semua" | "Event" | "CSR" | "Live Music";

const filters: Filter[] = ["Semua", "Event", "CSR", "Live Music"];

/**
 * WHAT'S ON — the LWT §sectionEvent grammar: a sticky left menu whose
 * category links filter the list (red = active), bordered event cards
 * to the right. The remind toggle keeps its state per card.
 */
export default function WhatsOn() {
  const [filter, setFilter] = useState<Filter>("Semua");
  const list = events.filter((e) => filter === "Semua" || e.category === filter);

  return (
    <Section id="whatson">
      <div className="flex flex-col gap-8 px-4 py-14 md:px-10 md:py-20 lg:flex-row lg:gap-14">
        {/* left menu — LWT leftMenuBox */}
        <nav
          aria-label="Filter agenda"
          className="shrink-0 lg:sticky lg:top-[calc(max(2.4em,1.6667vw)+90px)] lg:self-start"
        >
          <p className="mb-4 font-sans text-xs font-bold uppercase tracking-widest text-mute">
            Agenda
          </p>
          <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-3">
            {filters.map((f) => (
              <li key={f}>
                <button
                  type="button"
                  aria-pressed={filter === f}
                  onClick={() => setFilter(f)}
                  className={`font-display text-3xl uppercase transition-colors md:text-4xl ${
                    filter === f ? "text-accent" : "text-ink/35 hover:text-ink"
                  }`}
                >
                  {f}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* cards */}
        <div className="min-w-0 flex-1">
          <Reveal
            key={filter}
            variant="seq"
            as="div"
            className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4"
          >
            {list.map((ev) => (
              <EventCard
                key={ev.id}
                date={ev.date}
                category={ev.category}
                title={ev.title}
                excerpt={ev.excerpt}
              />
            ))}
          </Reveal>
          {list.length === 0 && (
            <p className="border border-hairline p-8 text-center font-sans text-sm uppercase tracking-wide text-mute">
              Tidak ada agenda pada kategori ini.
            </p>
          )}
        </div>
      </div>
    </Section>
  );
}

/** Event card — bordered white plate, black date chip, red category chip. */
function EventCard({
  date,
  category,
  title,
  excerpt,
}: {
  date: string;
  category: string;
  title: string;
  excerpt: string;
}) {
  const [saved, setSaved] = useState(false);

  return (
    <article className="group flex h-full flex-col border border-ink bg-paper transition-colors duration-200 hover:bg-silver">
      <div className="flex items-center justify-between border-b border-ink px-4 py-2.5">
        <span
          className={`font-sans text-xs font-bold uppercase tracking-widest ${
            category === "CSR" ? "text-ink" : "bg-accent px-1.5 py-0.5 text-paper"
          }`}
        >
          {category}
        </span>
        <span className="bg-ink px-1.5 py-0.5 font-sans text-xs font-bold uppercase tracking-widest text-paper">
          {date}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-2xl uppercase leading-[1.02]">{title}</h3>
        <p className="mt-2 flex-1 font-sans text-sm leading-relaxed text-dim">{excerpt}</p>

        <div className="mt-4 flex items-center justify-between">
          <button
            type="button"
            aria-pressed={saved}
            onClick={() => setSaved((v) => !v)}
            className={`inline-flex items-center gap-2 border px-3 py-1.5 font-sans text-xs font-bold uppercase tracking-widest transition-colors ${
              saved ? "border-ink bg-ink text-paper" : "border-ink bg-paper hover:bg-silver"
            }`}
          >
            <IconCalendar size={13} />
            {saved ? "Tersimpan ✓" : "Ingatkan Saya"}
          </button>
          <IconArrow
            size={18}
            className="text-accent transition-transform duration-200 group-hover:translate-x-1.5"
          />
        </div>
      </div>
    </article>
  );
}
