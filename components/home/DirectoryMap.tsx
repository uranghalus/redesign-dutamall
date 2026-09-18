"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import type { Dictionary } from "@/app/i18n/dictionaries";
import type { Locale } from "@/app/i18n/config";
import { formatFloor } from "@/app/i18n/format";
import {
  IconAtm,
  IconCar,
  IconClinic,
  IconClose,
  IconInfo,
  IconMusholla,
  IconPin,
  IconToilet,
} from "@/components/ui/Icons";
import { mapAmenities, mapTenantPins, mapZones } from "@/app/data/map";

/* ============================================================
   §01B — DIRECTORY MAP (interactive floor plan, "lantai 1.png").
   The CAD drawing is redrawn as living blueprint: paper ground,
   hairline zone envelopes, numbered zone chips, pinned tenants,
   amenity dots. Click a zone or a list row → spotlight + auto
   zoom; zoom/pan buttons + drag pan; aria-live announcements;
   reduced-motion friendly. Geometry lives in app/data/map.ts.
   ============================================================ */

const AMENTA_ICONS: Record<string, (p: { size?: number }) => React.ReactNode> = {
  toilet: IconToilet,
  atm: IconAtm,
  musholla: IconMusholla,
  clinic: IconClinic,
  info: IconInfo,
  parking: IconCar,
};

const VB = { w: 1000, h: 840 };

type Focus =
  | { kind: "zone"; id: string }
  | { kind: "tenant"; id: string }
  | null;

function zoneCenter(pts: string): [number, number] {
  const nums = pts.split(/[\s,]+/).map(Number);
  let sx = 0;
  let sy = 0;
  for (let i = 0; i < nums.length; i += 2) {
    sx += nums[i];
    sy += nums[i + 1];
  }
  const n = nums.length / 2;
  return [sx / n, sy / n];
}

export default function DirectoryMap({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const [focus, setFocus] = useState<Focus>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragRef = useRef<{ sx: number; sy: number; px: number; py: number } | null>(null);
  const liveRef = useRef<HTMLParagraphElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const t = dict.map;
  const zoneName = useCallback((id: string) => t.zoneNames[id as keyof typeof t.zoneNames] ?? id, [t]);
  const amenityName = useCallback(
    (id: string) => t.amenityNames[id as keyof typeof t.amenityNames] ?? id,
    [t],
  );

  /* frame the focused geometry — state adjusted during render (React-endorsed
     pattern): one glide per focus change via the CSS transition below.
     pan/zoom live in VIEWBOX units on an inner <g>, so framing is
     resolution-independent (an svg-level CSS transform would be screen-px). */
  const [framed, setFramed] = useState<Focus>(null);
  if (focus !== framed) {
    setFramed(focus);
    if (!focus) {
      setZoom(1);
      setPan({ x: 0, y: 0 });
    } else {
      const target: [number, number] | undefined =
        focus.kind === "tenant"
          ? (() => {
              const pin = mapTenantPins.find((p) => p.id === focus.id);
              return pin ? ([pin.x, pin.y] as [number, number]) : undefined;
            })()
          : (() => {
              const zone = mapZones.find((z) => z.id === focus.id);
              return zone ? zoneCenter(zone.pts) : undefined;
            })();
      if (target) {
        const z = 1.9;
        setZoom(z);
        setPan({ x: VB.w / 2 - target[0] * z, y: VB.h / 2 - target[1] * z });
      }
    }
  }

  const focusedZoneId = focus?.kind === "zone" ? focus.id : focus?.kind === "tenant"
    ? (mapZones.find((z) => z.tenantIds.includes(focus.id))?.id ?? null)
    : null;

  const activeTenants = useMemo(() => {
    if (focus?.kind === "zone") return mapTenantPins.filter((p) => mapZones.find((z) => z.id === focus.id)?.tenantIds.includes(p.id));
    if (focus?.kind === "tenant") return mapTenantPins.filter((p) => p.id === focus.id);
    return mapTenantPins;
  }, [focus]);

  const onWheel = (e: React.WheelEvent) => {
    if (!e.ctrlKey && Math.abs(e.deltaY) < 12) return;
    e.preventDefault();
    setZoom((z) => Math.min(3.2, Math.max(1, z + (e.deltaY > 0 ? -0.25 : 0.25))));
  };

  const onPointerDown = (e: React.PointerEvent) => {
    dragRef.current = { sx: e.clientX, sy: e.clientY, px: pan.x, py: pan.y };
    setDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d) return;
    /* screen px → viewBox user units, divided by zoom so content tracks the cursor */
    const rect = stageRef.current?.getBoundingClientRect();
    const k = rect ? VB.w / (rect.width * zoom) : 1;
    setPan({
      x: d.px + (e.clientX - d.sx) * k,
      y: d.py + (e.clientY - d.sy) * k,
    });
  };
  const onPointerUp = () => {
    dragRef.current = null;
    setDragging(false);
  };

  const pick = (next: Focus, label: string) => {
    setFocus((prev) => (prev && next && prev.kind === next.kind && prev.id === next.id ? null : next));
    if (liveRef.current) liveRef.current.textContent = label;
  };

  const reset = () => {
    setFocus(null);
    if (liveRef.current) liveRef.current.textContent = t.reset;
  };

  /* ---------- labels ---------- */
  const focusTitle =
    focus?.kind === "zone"
      ? zoneName(focus.id)
      : focus?.kind === "tenant"
        ? (mapTenantPins.find((p) => p.id === focus.id)?.name ?? "")
        : t.floorPlate;

  return (
    <section id="directory-map" className="bg-ink text-paper">
      <div className="px-4 py-14 md:px-10 md:py-20">
        {/* ============ blueprint section head — shared grammar ============ */}
        <div className="mb-4 flex items-center gap-4">
          <span className="font-display text-xl uppercase text-brass-soft">01·B</span>
          <span aria-hidden="true" className="h-px w-10 bg-brass-soft" />
          <span className="font-sans text-xs font-bold uppercase tracking-[0.24em] text-paper/60">
            {t.kicker}
          </span>
        </div>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-x-10 gap-y-6 md:mb-12">
          <h2 className="font-display text-[clamp(2.8rem,7vw,5.6rem)] uppercase leading-[0.92]">
            {t.title}
          </h2>
          <p className="max-w-md font-sans text-sm leading-relaxed text-paper/60">{t.lede}</p>
        </div>

        <div className="grid gap-px border border-paper/15 bg-hairline lg:grid-cols-[1.6fr_1fr]">
          {/* ================= MAP STAGE ================= */}
          <div className="relative bg-ink">
            {/* stage toolbar */}
            <div className="absolute left-4 top-4 z-10 flex gap-px">
              <button
                type="button"
                onClick={() => setZoom((z) => Math.min(3.2, +(z + 0.3).toFixed(2)))}
                aria-label={t.zoomIn}
                className="flex h-10 w-10 items-center justify-center border border-paper/20 bg-ink/90 font-display text-lg text-paper transition-colors hover:border-brass-soft hover:text-brass-soft"
              >
                +
              </button>
              <button
                type="button"
                onClick={() => setZoom((z) => Math.max(1, +(z - 0.3).toFixed(2)))}
                aria-label={t.zoomOut}
                className="flex h-10 w-10 items-center justify-center border border-paper/20 bg-ink/90 font-display text-lg text-paper transition-colors hover:border-brass-soft hover:text-brass-soft"
              >
                −
              </button>
              <button
                type="button"
                onClick={reset}
                className="flex h-10 items-center border border-paper/20 bg-ink/90 px-3 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-paper/80 transition-colors hover:border-brass-soft hover:text-brass-soft"
              >
                {t.reset}
              </button>
            </div>

            {/* live title plate — hidden on small screens where the toolbar owns the top row */}
            <div className="pointer-events-none absolute right-4 top-4 z-10 hidden border border-brass-soft bg-ink/90 px-3 py-2 sm:block">
              <p className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-brass-soft">
                {focusTitle}
              </p>
            </div>

            {/* the drawing */}
            <div
              ref={stageRef}
              role="application"
              aria-label={t.floorPlate}
              className="map-stage relative aspect-[1000/840] w-full touch-none select-none overflow-hidden"
              onWheel={onWheel}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
            >
              <svg viewBox={`0 0 ${VB.w} ${VB.h}`} className="h-full w-full" aria-hidden="true">
                <g
                  style={{
                    transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                    transition: dragging ? "none" : "transform 700ms cubic-bezier(0.22,1,0.36,1)",
                  }}
                >
                {/* paper-grain blueprint grid */}
                <defs>
                  <pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(244,244,244,0.05)" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width={VB.w} height={VB.h} fill="url(#map-grid)" />

                {/* zone envelopes */}
                {mapZones.map((z) => {
                  const active = focusedZoneId === z.id;
                  const dimmed = focus && !active && !(focus.kind === "zone" && focus.id === z.id);
                  return (
                    <g key={z.id}>
                      <polygon
                        points={z.pts}
                        fill={active ? "rgba(180,155,87,0.14)" : "rgba(244,244,244,0.03)"}
                        stroke={active ? "var(--color-brass-soft)" : "rgba(244,244,244,0.35)"}
                        strokeWidth={active ? 2.5 : 1.25}
                        className="cursor-pointer transition-opacity duration-500"
                        style={{ opacity: dimmed ? 0.35 : 1 }}
                        onClick={() => pick({ kind: "zone", id: z.id }, zoneName(z.id))}
                      />
                      {z.label && (
                        <text
                          x={z.label[0]}
                          y={z.label[1]}
                          textAnchor="middle"
                          className="pointer-events-none font-sans uppercase"
                          style={{ fontSize: 11, letterSpacing: "0.18em", fill: active ? "var(--color-brass-soft)" : "rgba(244,244,244,0.55)" }}
                        >
                          {zoneName(z.id)}
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* tenant pins */}
                {mapTenantPins.map((p) => {
                  const active = focus?.kind === "tenant" && focus.id === p.id;
                  const inZone = focusedZoneId
                    ? (mapZones.find((z) => z.id === focusedZoneId)?.tenantIds.includes(p.id) ?? false)
                    : true;
                  return (
                    <g
                      key={p.id}
                      className="cursor-pointer"
                      style={{ opacity: focus && !active && !inZone ? 0.25 : 1 }}
                      onClick={() => pick({ kind: "tenant", id: p.id }, p.name)}
                    >
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r={active ? 11 : 7}
                        fill={active || inZone ? "var(--color-brass-soft)" : "rgba(244,244,244,0.4)"}
                        className="transition-all duration-500"
                      />
                      <circle cx={p.x} cy={p.y} r={active ? 17 : 12} fill="none" stroke="var(--color-brass-soft)" strokeWidth="1" opacity={active ? 0.9 : 0.35} className="transition-all duration-500" />
                      <text x={p.x} y={p.y + 3.5} textAnchor="middle" style={{ fontSize: 9, fontWeight: 700, fill: "#12110e" }}>
                        {p.unit.slice(0, 2)}
                      </text>
                    </g>
                  );
                })}

                {/* amenity dots */}
                {mapAmenities.map((a) => {
                  const Icon = AMENTA_ICONS[a.id];
                  return (
                    <g key={a.id} className="pointer-events-none">
                      <rect x={a.x - 9} y={a.y - 9} width="18" height="18" fill="#12110e" stroke="rgba(244,244,244,0.4)" strokeWidth="1" />
                      {Icon ? (
                        <foreignObject x={a.x - 7} y={a.y - 7} width="14" height="14">
                          <span className="flex h-full w-full items-center justify-center text-paper/80">
                            <Icon size={12} />
                          </span>
                        </foreignObject>
                      ) : (
                        <title>{amenityName(a.id)}</title>
                      )}
                    </g>
                  );
                })}

                </g>

                {/* compass — fixed chrome, outside the pan/zoom group */}
                <g style={{ transform: "translate(946px, 60px)" }}>
                  <circle r="16" fill="none" stroke="rgba(244,244,244,0.4)" strokeWidth="1" />
                  <path d="M 0 -12 L 4 4 L 0 0 L -4 4 Z" fill="var(--color-brass-soft)" />
                  <text y="-20" textAnchor="middle" style={{ fontSize: 10, letterSpacing: "0.2em", fill: "rgba(244,244,244,0.7)" }}>
                    {t.north}
                  </text>
                </g>
              </svg>

              {/* screen-reader list of the visible geometry */}
              <ul className="sr-only">
                {mapZones.map((z) => (
                  <li key={z.id}>
                    <button type="button" onClick={() => pick({ kind: "zone", id: z.id }, zoneName(z.id))}>
                      {zoneName(z.id)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* status + live region */}
            <p ref={liveRef} aria-live="polite" className="sr-only" />
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-paper/15 px-4 py-3">
              <span className="flex items-center gap-2 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-paper/60">
                <span aria-hidden="true" className="h-2.5 w-2.5 border border-paper/40" />
                {t.legendZone}
              </span>
              <span className="flex items-center gap-2 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-paper/60">
                <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-brass-soft" />
                {t.legendTenant}
              </span>
              <span className="flex items-center gap-2 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-paper/60">
                <span aria-hidden="true" className="h-2.5 w-2.5 bg-ink ring-1 ring-paper/40 ring-inset" />
                {t.legendAmenity}
              </span>
              <span className="ml-auto font-display text-sm uppercase text-paper/40">
                {formatFloor(1, locale)} — {t.floorPlate}
              </span>
            </div>
          </div>

          {/* ================= TENANT LIST ================= */}
          <div className="flex flex-col bg-ink">
            <div className="flex items-center justify-between border-b border-paper/15 px-5 py-4">
              <p className="font-display text-lg uppercase tracking-wide text-paper">
                {focus ? focusTitle : t.floorPlate}
              </p>
              {focus && (
                <button
                  type="button"
                  onClick={reset}
                  aria-label={t.reset}
                  className="flex h-8 w-8 items-center justify-center border border-paper/20 text-paper/70 transition-colors hover:border-brass-soft hover:text-brass-soft"
                >
                  <IconClose size={14} />
                </button>
              )}
            </div>
            <ul className="flex-1 divide-y divide-hairline overflow-y-auto lg:max-h-[560px]">
              {activeTenants.map((p, i) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => pick({ kind: "tenant", id: p.id }, p.name)}
                    className="group flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-paper/5"
                  >
                    <span className="font-display text-sm text-brass-soft">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1">
                      <span className="block font-sans text-sm font-bold uppercase tracking-wide text-paper group-hover:text-brass-soft">
                        {p.name}
                      </span>
                      <span className="mt-0.5 block font-sans text-[10px] uppercase tracking-[0.18em] text-paper/50">
                        {t.selectedUnit} {p.unit}
                      </span>
                    </span>
                    <IconPin size={14} className="text-paper/30 transition-colors group-hover:text-brass-soft" />
                  </button>
                </li>
              ))}
              {activeTenants.length === 0 && (
                <li className="px-5 py-6 font-sans text-sm text-paper/50">—</li>
              )}
            </ul>
            <div className="border-t border-paper/15 px-5 py-4">
              <Reveal variant="ink" className="flex items-center justify-between border border-paper/20 px-4 py-3">
                <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-paper/60">
                  {formatFloor(1, locale)} · {t.legendTenant}: {mapTenantPins.length}
                </span>
                <IconPin size={14} className="text-brass-soft" />
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
