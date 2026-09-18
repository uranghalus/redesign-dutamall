"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import { IconArrow, IconCalendar } from "@/components/ui/Icons";
import { events } from "@/app/data/home";
import { interpolate } from "@/app/i18n/format";
import type { Dictionary } from "@/app/i18n/dictionaries";

type CategoryKey = "event" | "csr" | "music";

/* data category → dictionary key + venue tag key */
const categoryKeys: Record<string, CategoryKey> = {
  Event: "event",
  CSR: "csr",
  "Live Music": "music",
};

/**
 * §04 — WHAT'S ON & CULTURAL HAPPENINGS (mock 1:1).
 * Platinum ground, blueprint head with the right deck, then ruled event
 * cards: big display title, excerpt, venue tag + READ STORY footer over
 * a hairline rule. The category filters and remind toggle keep their
 * state; the card chrome becomes the mock's paper-on-platinum language.
 * All copy flows from the locale dictionary — data supplies only dates.
 */
export default function WhatsOn({ dict }: { dict: Dictionary }) {
  const [filter, setFilter] = useState<CategoryKey | "all">("all");
  const list = events.filter(
    (e) => filter === "all" || categoryKeys[e.category] === filter,
  );

  return (
    <section id="whatson" className="bg-platinum text-ink">
      <div className="px-4 py-14 md:px-10 md:py-20">
        {/* blueprint section head */}
        <div className="mb-4 flex items-center gap-4">
          <span className="font-display text-xl uppercase text-brass">04</span>
          <span aria-hidden="true" className="h-px w-10 bg-brass-soft" />
          <span className="font-sans text-xs font-bold uppercase tracking-[0.24em] text-dim">
            {dict.whatson.kicker}
          </span>
        </div>
        <div className="mb-10 grid gap-6 md:mb-12 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <h2 className="border-b border-ink pb-4 font-display text-[clamp(2.2rem,4vw,3.6rem)] uppercase leading-[0.95]">
            {dict.whatson.title}
          </h2>
          <p className="pb-1 font-sans text-sm leading-relaxed text-dim">
            {dict.whatson.deck}
          </p>
        </div>

        {/* filter row */}
        <div className="mb-8 flex flex-wrap items-center gap-2" role="group" aria-label={dict.whatson.filterAria}>
          {(Object.keys(dict.whatson.filters) as Array<CategoryKey | "all">).map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className={`border px-4 py-2 font-sans text-xs font-bold uppercase tracking-widest transition-colors ${
                filter === f
                  ? "border-ink bg-ink text-paper"
                  : "border-hairline bg-paper text-dim hover:border-ink hover:text-ink"
              }`}
            >
              {dict.whatson.filters[f]}
            </button>
          ))}
          <p role="status" aria-atomic="true" className="ml-auto font-sans text-xs font-bold uppercase tracking-widest text-mute">
            {interpolate(dict.whatson.agendaCount, { count: list.length })}
          </p>
        </div>

        {/* ruled event cards — the mock's paper cards with venue/READ STORY footers.
            Titles/excerpts are positional in the dictionary; dates stay in data. */}
        <Reveal key={filter} variant="seq" as="div" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {list.map((ev) => {
            const i = events.indexOf(ev);
            const t = dict.data.events[i];
            return (
              <EventCard
                key={ev.id}
                dict={dict}
                date={ev.date}
                category={ev.category}
                title={t.title}
                excerpt={t.excerpt}
              />
            );
          })}
        </Reveal>
        {list.length === 0 && (
          <p className="border border-hairline bg-paper p-8 text-center font-sans text-sm uppercase tracking-wide text-mute">
            {dict.whatson.empty}
          </p>
        )}

        {/* centered discover CTA — the mock's underlined link */}
        <div className="mt-10 flex justify-center">
          <a
            href="#whatson"
            className="group inline-flex items-center gap-2 border-b-2 border-ink pb-1 font-sans text-xs font-bold uppercase tracking-[0.2em] text-ink transition-colors hover:text-brass hover:border-brass"
          >
            {dict.whatson.discover}
            <IconArrow
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
}

/** Event card — paper plate, display title, venue tag + READ STORY footer. */
function EventCard({
  dict,
  date,
  category,
  title,
  excerpt,
}: {
  dict: Dictionary;
  date: string;
  category: string;
  title: string;
  excerpt: string;
}) {
  const [saved, setSaved] = useState(false);
  const catKey = categoryKeys[category];
  const venue =
    (catKey && dict.whatson.venue[catKey]) || dict.whatson.venueFallback;

  return (
    <article className="group flex h-full flex-col border border-hairline bg-paper transition-colors duration-200 hover:border-ink">
      <div className="flex flex-1 flex-col p-5">
        <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-mute">
          {date} · {dict.whatson.filters[catKey ?? "event"]}
        </p>
        <h3 className="mt-3 font-display text-2xl uppercase leading-[1.02]">{title}</h3>
        <p className="mt-2 flex-1 font-sans text-sm leading-relaxed text-dim">{excerpt}</p>

        <div className="mt-5 flex items-center justify-between border-t border-hairline pt-3">
          <span className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-brass">
            {venue}
          </span>
          <button
            type="button"
            aria-pressed={saved}
            onClick={() => setSaved((v) => !v)}
            className="inline-flex items-center gap-1.5 font-sans text-xs font-bold uppercase tracking-[0.2em] text-ink transition-colors hover:text-brass"
          >
            <IconCalendar size={12} />
            {saved ? dict.whatson.saved : dict.whatson.readStory}
          </button>
        </div>
      </div>
    </article>
  );
}
