"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  IconRoute,
  IconToilet,
} from "@/components/ui/Icons";
import {
  findRoute,
  findRouteFromPoint,
  MAP_METERS_PER_UNIT,
  mapAmenities,
  mapEntrances,
  mapTenantPins,
  mapZones,
  nearestNodeId,
} from "@/app/data/map";

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

  /* deep link — /peta?tenant=<slug> focuses that pin on load (the header
     search's "View on floor map" action lands here). Runs once on mount;
     the query stays in the URL so the view is shareable. rAF keeps the
     setState out of the synchronous effect body. */
  /* route start — a preset door (graph node) or a free point tapped on the map */
  type StartPoint = { kind: "node"; id: string } | { kind: "free"; x: number; y: number };
  const [start, setStart] = useState<StartPoint>({ kind: "node", id: "gate-south-door" });
  const [picking, setPicking] = useState(false);
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("tenant");
    const pin = slug ? mapTenantPins.find((p) => p.slug === slug) : undefined;
    if (!pin) return;
    const raf = requestAnimationFrame(() => {
      setFocus({ kind: "tenant", id: pin.id });
      /* deep links carry a route: the closest public door starts the walk */
      setStart({
        kind: "node",
        id: mapEntrances.reduce(
          (best, e) =>
            Math.hypot(e.x - pin.x, e.y - pin.y) < Math.hypot(best.x - pin.x, best.y - pin.y)
              ? e
              : best,
          mapEntrances[0],
        ).id,
      });
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  /* Escape cancels free-point picking */
  useEffect(() => {
    if (!picking) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPicking(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [picking]);
  const [dragging, setDragging] = useState(false);
  /* moving the free start marker: hit-test the crosshair on pointerdown,
     steal the gesture from panning while inside its grab radius */
  const [markerDrag, setMarkerDrag] = useState(false);
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

  const toViewBox = (clientX: number, clientY: number) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return null;
    const vx = ((clientX - rect.left) / rect.width) * VB.w;
    const vy = ((clientY - rect.top) / rect.height) * VB.h;
    return { x: (vx - pan.x) / zoom, y: (vy - pan.y) / zoom };
  };

  const onPointerDown = (e: React.PointerEvent) => {
    /* marker grab wins over panning when the pointer is on the crosshair */
    if (start.kind === "free") {
      const p = toViewBox(e.clientX, e.clientY);
      if (p && Math.hypot(p.x - start.x, p.y - start.y) <= 22 / zoom + 6) {
        setMarkerDrag(true);
      }
    }
    dragRef.current = { sx: e.clientX, sy: e.clientY, px: pan.x, py: pan.y };
    setDragging(true);
    /* capture can throw if the pointer is already released */
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d) return;
    if (markerDrag) {
      /* move the free start with the pointer; route recomputes live */
      const p = toViewBox(e.clientX, e.clientY);
      if (p && nearestNodeId(p.x, p.y)) setStart({ kind: "free", x: p.x, y: p.y });
      return;
    }
    /* screen px → viewBox user units, divided by zoom so content tracks the cursor */
    const rect = stageRef.current?.getBoundingClientRect();
    const k = rect ? VB.w / (rect.width * zoom) : 1;
    setPan({
      x: d.px + (e.clientX - d.sx) * k,
      y: d.py + (e.clientY - d.sy) * k,
    });
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const d = dragRef.current;
    const moved = d ? Math.hypot(e.clientX - d.sx, e.clientY - d.sy) : 0;
    dragRef.current = null;
    setDragging(false);

    /* marker reposition ends → announce the new walk */
    if (markerDrag) {
      setMarkerDrag(false);
      if (focus?.kind === "tenant")
        announceRoute(start, mapTenantPins.find((p) => p.id === focus.id)?.name ?? "", focus.id);
      return;
    }

    /* free-pick mode: a tap (not a drag) drops the route start where you are */
    if (!picking || moved >= 6) return;
    const p = toViewBox(e.clientX, e.clientY);
    if (!p || !nearestNodeId(p.x, p.y)) return;
    const next: StartPoint = { kind: "free", x: p.x, y: p.y };
    setStart(next);
    setPicking(false);
    if (focus?.kind === "tenant")
      announceRoute(next, mapTenantPins.find((pp) => pp.id === focus.id)?.name ?? "", focus.id);
  };

  const pick = (next: Focus, label: string) => {
    setFocus((prev) => (prev && next && prev.kind === next.kind && prev.id === next.id ? null : next));
    if (next?.kind === "tenant") {
      announceRoute(start, label, next.id);
    } else if (liveRef.current) {
      liveRef.current.textContent = label;
    }
  };

  const reset = () => {
    setFocus(null);
    if (liveRef.current) liveRef.current.textContent = t.reset;
  };

  /* ---------- walking route ---------- */
  const route = useMemo(() => {
    if (focus?.kind !== "tenant") return null;
    return start.kind === "node"
      ? findRoute(start.id, focus.id)
      : findRouteFromPoint({ x: start.x, y: start.y }, focus.id);
  }, [focus, start]);
  const routePath = useMemo(
    () => (route ? route.points.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0]} ${p[1]}`).join(" ") : ""),
    [route],
  );
  const bearing = (i: number) => {
    const pts = route!.points;
    const [x, y] = pts[i];
    const [nx, ny] = pts[Math.min(i + 1, pts.length - 1)];
    return (Math.atan2(ny - y, nx - x) * 180) / Math.PI;
  };

  const routeMeters = route ? Math.round(route.lengthUnits * MAP_METERS_PER_UNIT) : 0;
  const routeMinutes = Math.max(1, Math.round(routeMeters / 75));
  const routeZone =
    focus?.kind === "tenant"
      ? mapZones.find((z) => z.tenantIds.includes(focus.id))
      : undefined;
  const startName =
    start.kind === "node"
      ? (t.route.entrances[start.id as keyof typeof t.route.entrances] ?? start.id)
      : t.route.freeStart;

  const announceRoute = (from: StartPoint, pinName: string, pinId: string) => {
    const r =
      from.kind === "node"
        ? findRoute(from.id, pinId)
        : findRouteFromPoint({ x: from.x, y: from.y }, pinId);
    if (!r || !liveRef.current) return;
    const m = Math.round(r.lengthUnits * MAP_METERS_PER_UNIT);
    liveRef.current.textContent = t.route.announce
      .replace("{from}", from.kind === "node"
        ? (t.route.entrances[from.id as keyof typeof t.route.entrances] ?? from.id)
        : t.route.freeStart)
      .replace("{to}", pinName)
      .replace("{meters}", String(m))
      .replace("{minutes}", String(Math.max(1, Math.round(m / 75))));
  };

  const startRoute = (pinId: string) => {
    setStart({ kind: "node", id: "gate-south-door" });
    setFocus({ kind: "tenant", id: pinId });
    announceRoute(
      { kind: "node", id: "gate-south-door" },
      mapTenantPins.find((p) => p.id === pinId)?.name ?? "",
      pinId,
    );
  };

  const chooseStart = (id: string) => {
    setStart({ kind: "node", id });
    if (focus?.kind === "tenant")
      announceRoute({ kind: "node", id }, mapTenantPins.find((p) => p.id === focus.id)?.name ?? "", focus.id);
  };

  const beginPick = () => {
    setPicking(true);
    if (liveRef.current)
      liveRef.current.textContent =
        start.kind === "free" ? t.route.reposition : t.route.pickHint;
  };

  const cancelPick = () => setPicking(false);

  const clearRoute = () => {
    setFocus(null);
    if (liveRef.current) liveRef.current.textContent = t.route.clear;
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
              {route && (
                <button
                  type="button"
                  onClick={clearRoute}
                  className="flex h-10 items-center gap-2 border border-brass-soft bg-ink/90 px-3 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-brass-soft transition-colors hover:bg-brass-soft hover:text-ink"
                >
                  <IconClose size={12} />
                  {t.route.clear}
                </button>
              )}
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
              data-picking={picking}
              className={`map-stage relative aspect-[1000/840] w-full touch-none select-none overflow-hidden ${
                picking ? "cursor-crosshair" : ""
              } ${markerDrag ? "cursor-grabbing" : ""}`}
              onWheel={onWheel}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
            >
              {/* free-pick banner — how to drop your start point */}
              {picking && (
                <div className="absolute inset-x-3 bottom-3 z-10 flex items-center justify-between gap-3 border border-brass-soft bg-ink/95 px-4 py-3">
                  <p className="flex items-center gap-2 font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-brass-soft">
                    <IconPin size={14} className="shrink-0" />
                    {t.route.pickHint}
                  </p>
                  <button
                    type="button"
                    onClick={cancelPick}
                    className="shrink-0 font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-paper/60 transition-colors hover:text-paper"
                  >
                    {t.route.cancelPick}
                  </button>
                </div>
              )}
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
                  {/* pseudo-3D: floor vignette sinks the plan edges, walker
                      body gets a lit-sphere shading */}
                  <radialGradient id="map-floor" cx="0.5" cy="0.45" r="0.62">
                    <stop offset="0%" stopColor="rgba(244,242,235,0.045)" />
                    <stop offset="72%" stopColor="rgba(18,17,14,0)" />
                    <stop offset="100%" stopColor="rgba(0,0,0,0.5)" />
                  </radialGradient>
                  <radialGradient id="walker-body" cx="0.35" cy="0.3" r="0.95">
                    <stop offset="0%" stopColor="#f6eeda" />
                    <stop offset="55%" stopColor="#c9b584" />
                    <stop offset="100%" stopColor="#7a6437" />
                  </radialGradient>
                </defs>
                <rect width={VB.w} height={VB.h} fill="url(#map-grid)" />
                <ellipse cx={VB.w / 2} cy={VB.h / 2} rx={580} ry={480} fill="url(#map-floor)" />

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

                {/* public doors — route start points */}
                {mapEntrances.map((e) => {
                  const isStart = route?.points[0][0] === e.x && route?.points[0][1] === e.y;
                  return (
                    <g key={e.id} className="pointer-events-none">
                      <rect
                        x={e.x - 6}
                        y={e.y - 6}
                        width="12"
                        height="12"
                        style={{ transform: `rotate(45deg)`, transformBox: "fill-box", transformOrigin: "center" }}
                        fill={isStart ? "var(--color-brass-soft)" : "#12110e"}
                        stroke="var(--color-brass-soft)"
                        strokeWidth="1.25"
                      />
                    </g>
                  );
                })}

                {/* free-picked start — brass crosshair at your spot */}
                {start.kind === "free" && (
                  <g className="pointer-events-none">
                    <path
                      d={`M ${start.x - 11} ${start.y} H ${start.x + 11} M ${start.x} ${start.y - 11} V ${start.y + 11}`}
                      stroke="var(--color-brass-soft)"
                      strokeWidth="1"
                      opacity="0.8"
                    />
                    <circle
                      cx={start.x}
                      cy={start.y}
                      r="6.5"
                      fill="none"
                      stroke="var(--color-brass-soft)"
                      strokeWidth="1.5"
                    />
                  </g>
                )}

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
                      {/* ground shadow — pins float above the plan */}
                      <ellipse cx={p.x} cy={p.y + 7} rx={active ? 13 : 9} ry={active ? 4.5 : 3} fill="rgba(0,0,0,0.45)" className="transition-all duration-500" />
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

                {/* walking route — underglow, marching dash, arrows, start door,
                    destination sonar (drawn above amenities, below pins) */}
                {route && (
                  <g className="pointer-events-none">
                    <path d={routePath} fill="none" stroke="var(--color-brass-soft)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" opacity="0.18" />
                    <path d={routePath} fill="none" stroke="var(--color-brass-soft)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
                    <path d={routePath} fill="none" stroke="#12110e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="route-march" />
                    {route.points.slice(0, -1).map((p, i) => (
                      <g key={`arrow-${i}`} style={{ transform: `translate(${p[0]}px, ${p[1]}px) rotate(${bearing(i)}deg)` }}>
                        <path d="M 7 0 L -3 -4.5 L -3 4.5 Z" fill="var(--color-brass-soft)" opacity="0.9" />
                      </g>
                    ))}
                    {/* start door — ring + walking dot */}
                    <circle
                      cx={route.points[0][0]}
                      cy={route.points[0][1]}
                      r="8"
                      fill="none"
                      stroke="var(--color-brass-soft)"
                      strokeWidth="2"
                    />
                    <circle cx={route.points[0][0]} cy={route.points[0][1]} r="3.5" fill="var(--color-brass-soft)" />
                    {/* destination sonar */}
                    <circle
                      className="route-pulse"
                      cx={route.points[route.points.length - 1][0]}
                      cy={route.points[route.points.length - 1][1]}
                      r="13"
                      fill="none"
                      stroke="var(--color-brass-soft)"
                      strokeWidth="1.5"
                    />
                    {/* the walker — pseudo-3D figure gliding the path, facing
                        travel direction; duration tracks real route length */}
                    <g className="walker">
                      <animateMotion
                        dur={`${Math.max(4, Math.min(14, routeMeters / 12))}s`}
                        repeatCount="indefinite"
                        rotate="auto"
                        path={routePath}
                      />
                      {/* ground shadow */}
                      <ellipse cx="0" cy="7" rx="7" ry="2.6" fill="rgba(0,0,0,0.5)" />
                      {/* torso — lit sphere (3D shading) */}
                      <circle cx="0" cy="-3" r="6.5" fill="url(#walker-body)" />
                      {/* head */}
                      <circle cx="2.2" cy="-11.5" r="3" fill="url(#walker-body)" />
                      {/* motion cue: two stride ticks sweeping under the body */}
                      <g className="walker-stride">
                        <ellipse cx="-3" cy="3.5" rx="2.2" ry="1.2" fill="rgba(18,17,14,0.55)" />
                        <ellipse cx="3" cy="3.5" rx="2.2" ry="1.2" fill="rgba(18,17,14,0.55)" />
                      </g>
                    </g>
                  </g>
                )}

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
              {route && (
                <span className="flex items-center gap-2 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-paper/60">
                  <span aria-hidden="true" className="h-0 w-4 border-t-2 border-dashed border-brass-soft" />
                  {t.route.legendRoute}
                </span>
              )}
              <span className="flex items-center gap-2 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-paper/60">
                <span aria-hidden="true" className="h-2.5 w-2.5 rotate-45 bg-ink ring-1 ring-brass-soft" />
                {t.route.legendDoor}
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
                  <div className="group flex items-stretch transition-colors hover:bg-paper/5">
                    <button
                      type="button"
                      onClick={() => pick({ kind: "tenant", id: p.id }, p.name)}
                      className="flex min-w-0 flex-1 items-center gap-4 px-5 py-4 text-left"
                    >
                      <span className="font-display text-sm text-brass-soft">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-sans text-sm font-bold uppercase tracking-wide text-paper group-hover:text-brass-soft">
                          {p.name}
                        </span>
                        <span className="mt-0.5 block font-sans text-[10px] uppercase tracking-[0.18em] text-paper/50">
                          {t.selectedUnit} {p.unit}
                        </span>
                      </span>
                      <IconPin size={14} className="shrink-0 text-paper/30 transition-colors group-hover:text-brass-soft" />
                    </button>
                    <button
                      type="button"
                      onClick={() => startRoute(p.id)}
                      aria-label={t.route.listAria.replace("{name}", p.name)}
                      title={t.route.title}
                      className="flex h-auto min-h-[44px] w-12 shrink-0 items-center justify-center border-l border-paper/15 text-paper/50 transition-colors hover:bg-brass-soft hover:text-ink"
                    >
                      <IconRoute size={16} />
                    </button>
                  </div>
                </li>
              ))}
              {activeTenants.length === 0 && (
                <li className="px-5 py-6 font-sans text-sm text-paper/50">—</li>
              )}
            </ul>

            {/* walking-route card — entrance picker + distance/time readout */}
            {route && focus?.kind === "tenant" && (
              <div className="border-t-2 border-brass-soft bg-ink px-5 py-4">
                <p className="flex items-center gap-2 font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-brass-soft">
                  <IconRoute size={13} />
                  {t.route.title}
                </p>
                <p className="mt-2 font-sans text-sm text-paper/70">
                  <span className="text-paper/45">{t.route.from} </span>
                  <span className="font-bold uppercase text-paper">{startName}</span>
                  <span className="text-paper/45"> · {t.route.to} </span>
                  <span className="font-bold uppercase text-brass-soft">
                    {mapTenantPins.find((p) => p.id === focus.id)?.name}
                  </span>
                </p>
                <div className="mt-3 flex items-baseline gap-4">
                  <span className="font-display text-3xl uppercase text-paper">
                    {t.route.meters.replace("{n}", String(routeMeters))}
                  </span>
                  <span className="font-sans text-xs font-bold uppercase tracking-[0.14em] text-paper/55">
                    {t.route.minutes.replace("{n}", String(routeMinutes))}
                    {routeZone && ` · ${t.route.via.replace("{zone}", zoneName(routeZone.id))}`}
                  </span>
                </div>
                <div
                  role="group"
                  aria-label={t.route.from}
                  className="mt-3 flex flex-wrap gap-px"
                >
                  {mapEntrances.map((e) => {
                    const active = start.kind === "node" && start.id === e.id;
                    return (
                      <button
                        key={e.id}
                        type="button"
                        aria-pressed={active}
                        onClick={() => chooseStart(e.id)}
                        className={`border px-3 py-2 font-sans text-[10px] font-bold uppercase tracking-[0.14em] transition-colors ${
                          active
                            ? "border-brass-soft bg-brass-soft text-ink"
                            : "border-paper/20 text-paper/60 hover:border-paper/50 hover:text-paper"
                        }`}
                      >
                        {t.route.entrances[e.id as keyof typeof t.route.entrances] ?? e.id}
                      </button>
                    );
                  })}
                  {/* free-pick — start the walk anywhere on the map */}
                  <button
                    type="button"
                    aria-pressed={start.kind === "free"}
                    aria-label={t.route.pickAria}
                    onClick={() => (start.kind === "free" ? cancelPick() : beginPick())}
                    className={`flex items-center gap-1.5 border px-3 py-2 font-sans text-[10px] font-bold uppercase tracking-[0.14em] transition-colors ${
                      start.kind === "free"
                        ? "border-brass-soft bg-brass-soft text-ink"
                        : "border-dashed border-paper/30 text-paper/60 hover:border-brass-soft hover:text-brass-soft"
                    }`}
                  >
                    <IconPin size={11} />
                    {start.kind === "free" ? t.route.freeStart : t.route.pick}
                  </button>
                </div>
              </div>
            )}
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
