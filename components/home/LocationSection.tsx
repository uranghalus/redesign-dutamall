"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import { IconPin, IconPhone, IconRoute, IconClock, IconArrow } from "@/components/ui/Icons";
import type { Dictionary } from "@/app/i18n/dictionaries";

const mapUrl =
  "https://www.google.com/maps/search/?api=1&query=Duta+Mall+Banjarmasin";
const routeUrl =
  "https://www.google.com/maps/dir/?api=1&destination=Duta+Mall+Banjarmasin";

/** Icon info row — the mock's address/hours/contact rows with circular icons. */
function InfoRow({
  icon: Icon,
  label,
  lines,
  href,
  external = false,
}: {
  icon: (p: { size?: number; className?: string }) => React.ReactElement;
  label: string;
  lines: string[];
  href?: string;
  external?: boolean;
}) {
  const body = (
    <>
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-hairline bg-paper">
        <Icon size={17} />
      </span>
      <span className="min-w-0">
        <span className="block font-sans text-xs font-bold uppercase tracking-[0.22em] text-ink">
          {label}
        </span>
        {lines.map((l) => (
          <span key={l} className="mt-0.5 block font-sans text-[13px] leading-relaxed text-dim">
            {l}
          </span>
        ))}
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        className="group flex items-start gap-4 py-4 transition-colors hover:bg-bone/60"
      >
        {body}
      </a>
    );
  }
  return <div className="flex items-start gap-4 py-4">{body}</div>;
}

/**
 * §06 — LOCATION & ACCESS (mock 1:1).
 * Left: "ARRIVE AT THE LANDMARK" heading + deck, hairline-ruled icon rows
 * (Civic Address, Operational Hours, Central Concierge & Leasing), and the
 * Maps route buttons. Right: the VIP INQUIRY & FEEDBACK form — the mock's
 * bordered concierge card with labeled inputs, category select, message
 * textarea, and the black TRANSMIT TO CONCIERGE DESK submit.
 * Every string flows from the locale dictionary; form state holds keys.
 */
export default function LocationSection({ dict }: { dict: Dictionary }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", topic: 0, message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="location" className="bg-paper text-ink">
      <div className="px-4 py-14 md:px-10 md:py-20">
        {/* blueprint section head */}
        <div className="mb-4 flex items-center gap-4">
          <span className="font-display text-xl uppercase text-brass">06</span>
          <span aria-hidden="true" className="h-px w-10 bg-brass-soft" />
          <span className="font-sans text-xs font-bold uppercase tracking-[0.24em] text-dim">
            {dict.location.kicker}
          </span>
        </div>

        <Reveal className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          {/* ============ left — arrive at the landmark ============ */}
          <div>
            <h2 className="border-b border-ink pb-4 font-display text-[clamp(2.2rem,4vw,3.6rem)] uppercase leading-[0.95]">
              {dict.location.title}
            </h2>
            <p className="mt-5 max-w-lg font-sans text-sm leading-relaxed text-dim">
              {dict.location.deck}
            </p>

            <div className="mt-6 divide-y divide-hairline border-y border-hairline">
              <InfoRow
                icon={IconPin}
                label={dict.location.address}
                lines={dict.location.addressLines}
                href={mapUrl}
                external
              />
              <InfoRow
                icon={IconClock}
                label={dict.location.hours}
                lines={dict.location.hoursLines}
              />
              <InfoRow
                icon={IconPhone}
                label={dict.location.contact}
                lines={dict.location.contactLines}
                href="tel:+625113278888"
              />
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={routeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[48px] items-center gap-2 bg-ink px-6 font-sans text-xs font-bold uppercase tracking-[0.2em] text-paper transition-colors duration-200 hover:bg-brass hover:text-ink"
              >
                <IconRoute size={16} />
                {dict.location.mapsCta}
              </a>
              <a
                href={mapUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[48px] items-center gap-2 border border-ink bg-paper px-6 font-sans text-xs font-bold uppercase tracking-[0.2em] text-ink transition-colors duration-200 hover:bg-ink hover:text-paper"
              >
                <IconPin size={16} />
                {dict.location.googleMaps}
              </a>
            </div>
          </div>

          {/* ============ right — VIP inquiry & feedback form ============ */}
          <div className="border border-hairline bg-paper p-6 md:p-8">
            <div className="mb-6 flex items-center justify-between gap-4 border-b border-hairline pb-4">
              <h3 className="font-sans text-xs font-bold uppercase tracking-[0.22em] text-ink">
                {dict.location.formTitle}
              </h3>
              <span className="font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-mute">
                {dict.location.formBadge}
              </span>
            </div>

            {sent ? (
              <div role="status" className="py-10 text-center">
                <p className="font-display text-4xl uppercase">
                  {dict.location.form.sentTitle}
                  <span className="text-brass">.</span>
                </p>
                <p className="mx-auto mt-3 max-w-sm font-sans text-sm leading-relaxed text-dim">
                  {dict.location.form.sentBody}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSent(false);
                    setForm({ name: "", email: "", phone: "", topic: 0, message: "" });
                  }}
                  className="mt-6 inline-flex items-center gap-2 border border-ink px-5 py-2.5 font-sans text-xs font-bold uppercase tracking-widest transition-colors hover:bg-ink hover:text-paper"
                >
                  {dict.location.form.sendAnother}
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="flex flex-col gap-5">
                <div>
                  <label htmlFor="inq-name" className="block font-sans text-xs font-bold uppercase tracking-[0.2em] text-dim">
                    {dict.location.form.name}
                  </label>
                  <input
                    id="inq-name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder={dict.location.form.namePlaceholder}
                    className="mt-2 h-11 w-full border border-hairline bg-platinum px-3 font-sans text-sm placeholder:text-mute focus:border-ink focus:outline-none"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="inq-email" className="block font-sans text-xs font-bold uppercase tracking-[0.2em] text-dim">
                      {dict.location.form.email}
                    </label>
                    <input
                      id="inq-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder={dict.location.form.emailPlaceholder}
                      className="mt-2 h-11 w-full border border-hairline bg-platinum px-3 font-sans text-sm placeholder:text-mute focus:border-ink focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="inq-phone" className="block font-sans text-xs font-bold uppercase tracking-[0.2em] text-dim">
                      {dict.location.form.phone}
                    </label>
                    <input
                      id="inq-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder={dict.location.form.phonePlaceholder}
                      className="mt-2 h-11 w-full border border-hairline bg-platinum px-3 font-sans text-sm placeholder:text-mute focus:border-ink focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="inq-topic" className="block font-sans text-xs font-bold uppercase tracking-[0.2em] text-dim">
                    {dict.location.form.category}
                  </label>
                  <select
                    id="inq-topic"
                    value={form.topic}
                    onChange={(e) => setForm({ ...form, topic: Number(e.target.value) })}
                    className="mt-2 h-11 w-full border border-hairline bg-platinum px-2 font-sans text-sm text-ink focus:border-ink focus:outline-none"
                  >
                    {dict.location.form.categories.map((c, i) => (
                      <option key={c} value={i}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="inq-msg" className="block font-sans text-xs font-bold uppercase tracking-[0.2em] text-dim">
                    {dict.location.form.message}
                  </label>
                  <textarea
                    id="inq-msg"
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder={dict.location.form.messagePlaceholder}
                    className="mt-2 w-full border border-hairline bg-platinum px-3 py-2.5 font-sans text-sm placeholder:text-mute focus:border-ink focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-1 inline-flex min-h-[48px] items-center justify-center gap-2 bg-ink px-6 font-sans text-xs font-bold uppercase tracking-[0.2em] text-paper transition-colors duration-200 hover:bg-brass hover:text-ink"
                >
                  {dict.location.form.submit}
                  <IconArrow size={14} />
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
