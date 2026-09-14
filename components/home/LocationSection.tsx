"use client";

import { Section, SectionHeading } from "@/components/ui/Section";
import { BrutalButtonLink } from "@/components/ui/Button";
import { IconPin, IconPhone, IconRoute, IconClock } from "@/components/ui/Icons";

const mapUrl =
  "https://www.google.com/maps/search/?api=1&query=Duta+Mall+Banjarmasin";
const routeUrl =
  "https://www.google.com/maps/dir/?api=1&destination=Duta+Mall+Banjarmasin";

/** Stylized structural map — authored geometry, not a screenshot. */
function MapPanel() {
  return (
    <div className="relative min-h-[320px] border-2 border-ink bg-paper p-4 md:shadow-brutal-sm">
      {/* road frame */}
      <div className="absolute inset-x-6 top-6 h-2 bg-ink" aria-hidden="true" />
      <div className="absolute inset-y-6 right-6 w-2 bg-ink" aria-hidden="true" />
      <span className="absolute right-3 top-9 bg-paper px-1 font-mono text-xs font-bold uppercase tracking-widest">
        Jl. Ahmad Yani
      </span>

      {/* mall block */}
      <div className="absolute bottom-16 left-6 right-16 top-12 border-4 border-ink bg-paper">
        <div className="absolute inset-2 border-2 border-dashed border-smoke/40" aria-hidden="true" />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-paper px-2 font-display text-2xl uppercase md:text-3xl">
          DUTA<span className="text-accent">/</span>MALL
        </span>
        {/* FUGO tower */}
        <div className="absolute bottom-2 right-2 flex h-16 w-12 flex-col justify-end border-2 border-ink bg-ink p-1">
          <span className="text-center font-mono text-[11px] font-bold uppercase tracking-widest text-paper">
            FUGO
          </span>
        </div>
        {/* parking */}
        <div className="absolute bottom-2 left-2 border-2 border-ink bg-silver px-2 py-1 font-mono text-xs font-bold uppercase tracking-widest">
          P 1—4
        </div>
        {/* entrance marker */}
        <div className="absolute left-1/2 top-0 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 border-2 border-ink bg-accent px-2 py-1 font-mono text-xs font-bold uppercase tracking-widest text-ink">
          <IconPin size={12} />
          Main Gate
        </div>
      </div>

      {/* coordinates readout */}
      <span className="absolute bottom-3 left-6 font-mono text-xs font-bold uppercase tracking-widest text-smoke">
        3.3186°S · 114.5934°E
      </span>
    </div>
  );
}

export default function LocationSection() {
  return (
    <Section id="location">
      <div className="px-4 py-14 md:px-10 md:py-20">
        <SectionHeading
          index="06 / LOCATION"
          title="LOKASI & AKSES"
          right={
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-smoke">
              Banjarmasin · Kalsel
            </span>
          }
        />

        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <ul className="divide-y-2 divide-ink border-2 border-ink">
              <li className="flex items-center gap-4 bg-paper px-4 py-4">
                <span className="flex size-10 shrink-0 items-center justify-center border-2 border-ink">
                  <IconPin size={18} />
                </span>
                <div>
                  <p className="font-sans text-sm font-bold uppercase tracking-wide">
                    Alamat
                  </p>
                  <p className="font-mono text-xs uppercase tracking-wide text-smoke">
                    Jl. Ahmad Yani KM 2, Banjarmasin 70236
                  </p>
                </div>
              </li>
              <li className="flex items-center gap-4 bg-paper px-4 py-4">
                <span className="flex size-10 shrink-0 items-center justify-center border-2 border-ink">
                  <IconClock size={18} />
                </span>
                <div>
                  <p className="font-sans text-sm font-bold uppercase tracking-wide">
                    Jam Operasional
                  </p>
                  <p className="font-mono text-xs uppercase tracking-wide text-smoke">
                    Open Daily 10:00–22:00 WITA · Cinema s.d. 24:00
                  </p>
                </div>
              </li>
              <li className="flex items-center gap-4 bg-paper px-4 py-4">
                <span className="flex size-10 shrink-0 items-center justify-center border-2 border-ink">
                  <IconPhone size={18} />
                </span>
                <div>
                  <p className="font-sans text-sm font-bold uppercase tracking-wide">
                    Hotline
                  </p>
                  <a
                    href="tel:+625113278888"
                    className="font-mono text-xs font-bold tracking-wide text-ink underline decoration-accent decoration-2 underline-offset-4 hover:bg-accent"
                  >
                    (0511) 327-8888
                  </a>
                </div>
              </li>
            </ul>

            <div className="mt-6 flex flex-wrap gap-4">
              <BrutalButtonLink
                href={routeUrl}
                variant="primary"
                size="md"
                target="_blank"
                rel="noreferrer"
              >
                <IconRoute size={16} />
                Buka Rute di Maps
              </BrutalButtonLink>
              <BrutalButtonLink href={mapUrl} variant="outline" size="md" target="_blank" rel="noreferrer">
                <IconPin size={16} />
                Google Maps
              </BrutalButtonLink>
            </div>
          </div>

          <MapPanel />
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-2 border-ink bg-paper p-5 md:shadow-brutal-sm sm:flex-row sm:items-center">
          <p className="font-sans text-sm text-smoke">
            <strong className="font-bold text-ink">25 menit</strong> dari Bandara
            Samsudin Noor · <strong className="font-bold text-ink">akses langsung</strong>{" "}
            dari Lobi FUGO Hotel.
          </p>
          <span className="font-mono text-[11px] font-bold uppercase tracking-widest">
            KODE LOKASI: <span className="bg-ink px-1.5 py-0.5 text-paper">DTM-KLS-02</span>
          </span>
        </div>
      </div>
    </Section>
  );
}
