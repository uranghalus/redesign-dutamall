"use client";

import { Section, SectionHeading } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { LwtButtonLink } from "@/components/ui/Button";
import { IconPin, IconPhone, IconRoute, IconClock, IconArrow } from "@/components/ui/Icons";

const mapUrl =
  "https://www.google.com/maps/search/?api=1&query=Duta+Mall+Banjarmasin";
const routeUrl =
  "https://www.google.com/maps/dir/?api=1&destination=Duta+Mall+Banjarmasin";

/** Stylized structural map — authored geometry on the silver ground. */
function MapPanel() {
  return (
    <div className="relative min-h-[320px] border border-ink bg-silver p-4">
      {/* road frame */}
      <div className="absolute inset-x-6 top-6 h-2 bg-ink" aria-hidden="true" />
      <div className="absolute inset-y-6 right-6 w-2 bg-ink" aria-hidden="true" />
      <span className="absolute right-3 top-9 bg-silver px-1 font-sans text-xs font-bold uppercase tracking-widest">
        Jl. Ahmad Yani
      </span>

      {/* mall block */}
      <div className="absolute bottom-16 left-6 right-16 top-12 border border-ink bg-paper">
        <div className="absolute inset-2 border border-dashed border-ghost/60" aria-hidden="true" />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-paper px-2 font-display text-2xl uppercase md:text-3xl">
          Duta<span className="text-accent">/</span>Mall
        </span>
        {/* FUGO tower */}
        <div className="absolute bottom-2 right-2 flex h-16 w-12 flex-col justify-end border border-ink bg-ink p-1">
          <span className="text-center font-sans text-xs font-bold uppercase tracking-widest text-paper">
            FUGO
          </span>
        </div>
        {/* parking */}
        <div className="absolute bottom-2 left-2 border border-ink bg-silver px-2 py-1 font-sans text-xs font-bold uppercase tracking-widest">
          P 1—4
        </div>
        {/* entrance marker */}
        <div className="absolute left-1/2 top-0 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 border border-ink bg-accent px-2 py-1 font-sans text-xs font-bold uppercase tracking-widest text-paper">
          <IconPin size={12} />
          Main Gate
        </div>
      </div>

      {/* coordinates readout */}
      <span className="absolute bottom-3 left-6 font-sans text-xs font-bold uppercase tracking-widest text-dim">
        3.3186°S · 114.5934°E
      </span>
    </div>
  );
}

/** Visit info plate — LWT outlink grammar: title turns red on hover,
    the description reveals, the arrow rotates in. */
function VisitPlate({
  icon: Icon,
  label,
  value,
  detail,
  href,
  external = false,
}: {
  icon: (p: { size?: number; className?: string }) => React.ReactElement;
  label: string;
  value: string;
  detail: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="group flex items-center justify-between gap-6 border border-ink bg-paper p-5 transition-colors duration-200 hover:bg-silver md:p-6"
    >
      <div className="flex min-w-0 items-start gap-4">
        <span className="flex size-11 shrink-0 items-center justify-center border border-ink">
          <Icon size={18} />
        </span>
        <div className="min-w-0">
          <p className="font-sans text-xs font-bold uppercase tracking-widest text-mute">{label}</p>
          <p className="mt-1 font-display text-2xl uppercase leading-[1.05] transition-colors duration-200 group-hover:text-accent md:text-3xl">
            {value}
          </p>
          <p className="mt-1 max-h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-10 group-hover:opacity-100">
            <span className="font-sans text-sm text-dim">{detail}</span>
          </p>
        </div>
      </div>
      <IconArrow
        size={20}
        className="shrink-0 rotate-45 opacity-0 transition-all duration-300 group-hover:rotate-0 group-hover:opacity-100"
      />
    </a>
  );
}

export default function LocationSection() {
  return (
    <Section id="location" className="bg-silver">
      <div className="px-4 py-14 md:px-10 md:py-20">
        <SectionHeading
          index="04 / VISIT"
          title="LOKASI & AKSES"
          right={
            <span className="font-sans text-xs font-bold uppercase tracking-widest text-mute">
              Banjarmasin · Kalsel
            </span>
          }
        />

        <Reveal className="grid gap-8 lg:grid-cols-2">
          {/* visit plates — hours/address/hotline/parking (facts from the retired TopBar) */}
          <div className="flex flex-col gap-4">
            <VisitPlate
              icon={IconClock}
              label="Jam Operasional"
              value="10:00–22:00 WITA"
              detail="Open daily. Cinema XXI sampai 24:00 — konfirmasi jadwal terakhir di lobi Lantai 3."
              href="#cinema"
            />
            <VisitPlate
              icon={IconPin}
              label="Alamat"
              value="Jl. Ahmad Yani KM 2"
              detail="Banjarmasin 70236, Kalimantan Selatan — 25 menit dari Bandara Samsudin Noor."
              href={mapUrl}
              external
            />
            <VisitPlate
              icon={IconPhone}
              label="Hotline"
              value="(0511) 327-8888"
              detail="Layanan informasi, sewa unit (leasing), dan reservasi FUGO Hotel."
              href="tel:+625113278888"
            />
            <VisitPlate
              icon={IconRoute}
              label="Parkir"
              value="2.500+ Mobil & Motor"
              detail="Empat lantai parkir P1–P4, 24 jam. Ladies & disabilitas zone tersedia."
              href="#facilities"
            />

            <div className="mt-2 flex flex-wrap gap-4">
              <LwtButtonLink href={routeUrl} variant="solid" size="md" target="_blank" rel="noreferrer">
                <IconRoute size={16} />
                Buka Rute di Maps
              </LwtButtonLink>
              <LwtButtonLink href={mapUrl} variant="outline" size="md" target="_blank" rel="noreferrer">
                <IconPin size={16} />
                Google Maps
              </LwtButtonLink>
            </div>
          </div>

          <MapPanel />
        </Reveal>

        <Reveal variant="ink" className="mt-8 flex flex-col items-start justify-between gap-4 border border-ink bg-paper p-5 sm:flex-row sm:items-center">
          <p className="font-sans text-sm text-dim">
            <strong className="font-bold text-ink">Akses langsung</strong> dari Lobi FUGO
            Hotel · <strong className="font-bold text-ink">akses transit</strong> jalur
            Ahmad Yani koridor utama.
          </p>
          <span className="font-sans text-xs font-bold uppercase tracking-widest">
            KODE LOKASI: <span className="bg-ink px-1.5 py-0.5 text-paper">DTM-KLS-02</span>
          </span>
        </Reveal>
      </div>
    </Section>
  );
}
