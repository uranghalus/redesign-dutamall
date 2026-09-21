/* ============================================================
   DIRECTORY MAP — geometry extracted from the CAD floor plan
   "lantai 1.png" (1st floor, Nov 28 revision). The viewBox is a
   hand-traced 1000×840 blueprint canvas: rotunda + drop-off loop
   west, double-loaded retail spine with the oval atrium, the
   columned main hall north-east, south-east parking decks, the
   angled east retail wing, south gate on Jl. A. Yani KM 2, and
   the satellite parking building.
   Coordinates are in viewBox units — pure data, no imports, so
   both the map component and future editors read the same truth.
   ============================================================ */

export interface MapZone {
  id: string;
  /** envelope polygon (blueprint coords) */
  pts: string;
  /** optional interior label position */
  label?: [number, number];
  tenantIds: string[];
}

export interface MapAmenity {
  id: string;
  x: number;
  y: number;
}

/* ---------- zones (polylines traced from the CAD envelope) ---------- */

export const mapZones: MapZone[] = [
  {
    id: "atrium",
    pts: "356,180 396,150 428,196 436,262 424,338 396,412 362,448 336,408 326,330 330,244",
    label: [382, 292],
    tenantIds: ["atrium-1", "atrium-2"],
  },
  {
    id: "hall",
    pts: "452,150 660,128 668,300 460,318",
    label: [560, 226],
    tenantIds: [],
  },
  {
    id: "rotunda",
    pts: "216,150 258,128 282,150 282,214 252,232 220,212",
    label: [249, 176],
    tenantIds: [],
  },
  {
    id: "spine-west",
    pts: "200,232 326,238 330,330 322,432 286,470 206,460 200,352",
    label: [264, 352],
    tenantIds: ["west-1", "west-2", "west-3"],
  },
  {
    id: "wing-east",
    pts: "686,306 742,262 786,270 806,330 796,438 742,486 690,470 680,392",
    label: [744, 372],
    tenantIds: ["east-1", "east-2", "east-3"],
  },
  {
    id: "gate-south",
    pts: "300,640 396,628 404,700 306,712",
    label: [350, 672],
    tenantIds: [],
  },
  {
    id: "parking-se",
    pts: "430,470 590,470 596,620 436,624",
    label: [510, 548],
    tenantIds: [],
  },
  {
    id: "parking-south",
    pts: "430,700 600,700 598,800 432,802",
    label: [514, 752],
    tenantIds: [],
  },
];

/* ---------- amenities (facilities layer) ---------- */

export const mapAmenities: MapAmenity[] = [
  { id: "toilet", x: 236, y: 262 },
  { id: "lift", x: 250, y: 404 },
  { id: "escalator", x: 404, y: 330 },
  { id: "escalator-2", x: 620, y: 352 },
  { id: "musholla", x: 616, y: 180 },
  { id: "atm", x: 292, y: 448 },
  { id: "nursery", x: 700, y: 420 },
  { id: "info", x: 356, y: 470 },
  { id: "parking", x: 512, y: 640 },
  { id: "clinic", x: 258, y: 200 },
];

/* ---------- walking network: corridors traced on the plan ----------
   Nodes sit on real circulation: the central north-south spine that
   connects every zone, branch spurs into each retail envelope, entry
   nodes at the building's three public doors. Dijkstra runs on these
   edges so routes follow walkable paths, never through walls. */

export interface MapNode {
  id: string;
  x: number;
  y: number;
}

/** Three public doors — route start options (labels live in dict.map.entrances) */
export const mapEntrances: MapNode[] = [
  { id: "gate-south-door", x: 352, y: 646 },
  { id: "rotunda-door", x: 252, y: 176 },
  { id: "parking-door", x: 512, y: 620 },
];

export const mapNodes: MapNode[] = [
  ...mapEntrances,
  /* central spine (north → south) */
  { id: "spine-north", x: 352, y: 196 },
  { id: "spine-atrium", x: 352, y: 300 },
  { id: "spine-mid", x: 352, y: 400 },
  { id: "spine-south", x: 352, y: 480 },
  { id: "spine-gate", x: 352, y: 600 },
  /* west spur */
  { id: "west-hub", x: 262, y: 400 },
  /* east spur */
  { id: "east-hub", x: 640, y: 400 },
  { id: "east-wing-1", x: 680, y: 352 },
  { id: "east-wing-2", x: 730, y: 400 },
  { id: "east-wing-3", x: 688, y: 448 },
  /* atrium interior */
  { id: "atrium-north", x: 374, y: 236 },
  { id: "atrium-south", x: 402, y: 320 },
];

/** corridor segments — Dijkstra weights are drawn length (1 unit ≈ 0.12 m) */
export const mapEdges: [string, string][] = [
  ["gate-south-door", "spine-gate"],
  ["spine-gate", "spine-south"],
  ["spine-south", "spine-mid"],
  ["spine-mid", "spine-atrium"],
  ["spine-atrium", "spine-north"],
  ["spine-atrium", "atrium-south"],
  ["spine-atrium", "atrium-north"],
  ["spine-north", "rotunda-door"],
  ["spine-mid", "west-hub"],
  ["west-hub", "west-1"],
  ["west-hub", "west-2"],
  ["west-hub", "west-3"],
  ["spine-mid", "east-hub"],
  ["east-hub", "east-wing-1"],
  ["east-hub", "east-wing-2"],
  ["east-hub", "east-wing-3"],
  ["east-wing-1", "east-1"],
  ["east-wing-2", "east-2"],
  ["east-wing-3", "east-3"],
  ["parking-door", "spine-gate"],
];

/* ---------- routing ---------- */

/** view-unit → meter: main hall ≈ 20 m wide (460→660 = 200 units) → 0.1 m/unit */
export const MAP_METERS_PER_UNIT = 0.1;

const nodeById = new Map<string, MapNode>(mapNodes.map((n) => [n.id, n]));

const adjacency = new Map<string, [string, number][]>();
for (const [a, b] of mapEdges) {
  const na = nodeById.get(a);
  const nb = nodeById.get(b);
  if (!na || !nb) continue;
  const w = Math.hypot(nb.x - na.x, nb.y - na.y);
  (adjacency.get(a) ?? adjacency.set(a, []).get(a)!).push([b, w]);
  (adjacency.get(b) ?? adjacency.set(b, []).get(b)!).push([a, w]);
}

export interface MapRoute {
  /** polyline points (viewBox units) from start to the tenant pin */
  points: [number, number][];
  lengthUnits: number;
  /** true when the walk begins at a free-tap point (first leg = connector) */
  fromFreePoint?: boolean;
}

/** corridor node nearest to an arbitrary point — hops a free-picked start
    onto the walkable network (max ≈ 12 units ≈ 1.2 m off-corridor) */
export function nearestNodeId(x: number, y: number): string | null {
  let best: string | null = null;
  let bestD = Infinity;
  for (const n of nodeById.values()) {
    const d = Math.hypot(n.x - x, n.y - y);
    if (d < bestD) {
      bestD = d;
      best = n.id;
    }
  }
  return bestD <= 140 ? best : null;
}

/** Dijkstra core over the corridor graph, returns node id chain */
function shortestChain(startId: string, exitId: string): string[] | null {
  if (startId === exitId) return [exitId];
  const dist = new Map<string, number>([[startId, 0]]);
  const prev = new Map<string, string>();
  const visited = new Set<string>();
  while (true) {
    let cur: string | null = null;
    let best = Infinity;
    for (const [id, d] of dist) {
      if (!visited.has(id) && d < best) {
        best = d;
        cur = id;
      }
    }
    if (cur === null) break;
    if (cur === exitId) break;
    visited.add(cur);
    for (const [nb, w] of adjacency.get(cur) ?? []) {
      const nd = best + w;
      if (nd < (dist.get(nb) ?? Infinity)) {
        dist.set(nb, nd);
        prev.set(nb, cur);
      }
    }
  }
  if (!dist.has(exitId)) return null;
  const chain: string[] = [exitId];
  let c = exitId;
  while (prev.has(c)) {
    c = prev.get(c)!;
    chain.unshift(c);
  }
  return chain;
}

/** Shortest walkable path start→target over the corridor graph (Dijkstra).
    The pin itself is not a graph node — the route exits the corridor at the
    node closest to the pin, then hops straight to the shopfront point. */
export function findRoute(startId: string, targetPinId: string): MapRoute | null {
  const pin = mapTenantPins.find((p) => p.id === targetPinId);
  if (!pin) return null;
  let exit: MapNode | null = null;
  let exitD = Infinity;
  for (const n of nodeById.values()) {
    const d = Math.hypot(n.x - pin.x, n.y - pin.y);
    if (d < exitD) {
      exitD = d;
      exit = n;
    }
  }
  if (!exit) return null;
  const chain = shortestChain(startId, exit.id);
  if (!chain) return null;
  const pts: [number, number][] = chain.map((id) => {
    const n = nodeById.get(id)!;
    return [n.x, n.y];
  });
  pts.push([pin.x, pin.y]);
  let lengthUnits = 0;
  for (let i = 1; i < pts.length; i++) {
    lengthUnits += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
  }
  return { points: pts, lengthUnits };
}

/** Free-start variant — the walk begins at an arbitrary tapped point:
    connector leg to its nearest corridor node, then the corridor chain,
    then the hop to the shopfront. Falls back to plain findRoute. */
export function findRouteFromPoint(
  start: { x: number; y: number },
  targetPinId: string,
): MapRoute | null {
  const startNodeId = nearestNodeId(start.x, start.y);
  if (!startNodeId) return null;
  const base = findRoute(startNodeId, targetPinId);
  if (!base) return null;
  const n = nodeById.get(startNodeId)!;
  const connector = Math.hypot(n.x - start.x, n.y - start.y);
  return {
    points: [[start.x, start.y], ...base.points],
    lengthUnits: base.lengthUnits + connector,
    fromFreePoint: true,
  };
}

export interface MapTenantPin {
  id: string;
  name: string;
  unit: string;
  x: number;
  y: number;
  /** URL-safe slug — deep links (/peta?tenant=…) target a pin directly */
  slug: string;
}

export const mapTenantPins: MapTenantPin[] = [
  { id: "atrium-1", name: "Fore Coffee", unit: "A-01", x: 374, y: 236, slug: "fore-coffee" },
  { id: "atrium-2", name: "Kopi Kenangan", unit: "A-07", x: 402, y: 320, slug: "kopi-kenangan" },
  { id: "west-1", name: "Guardian", unit: "GF-08", x: 240, y: 286, slug: "guardian" },
  { id: "west-2", name: "Owned By Unicorn", unit: "A-12", x: 262, y: 368, slug: "owned-by-unicorn" },
  { id: "west-3", name: "Willie's Bakery", unit: "A-21", x: 236, y: 428, slug: "willies-bakery" },
  { id: "east-1", name: "Starbucks", unit: "22", x: 718, y: 320, slug: "starbucks" },
  { id: "east-2", name: "New Balance", unit: "24", x: 756, y: 366, slug: "new-balance" },
  { id: "east-3", name: "Lascada", unit: "15", x: 720, y: 430, slug: "lascada" },
];
