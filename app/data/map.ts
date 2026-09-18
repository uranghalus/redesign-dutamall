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

/* ---------- tenants pinned to zones ---------- */

export interface MapTenantPin {
  id: string;
  name: string;
  unit: string;
  x: number;
  y: number;
}

export const mapTenantPins: MapTenantPin[] = [
  { id: "atrium-1", name: "Fore Coffee", unit: "A-01", x: 374, y: 236 },
  { id: "atrium-2", name: "Kopi Kenangan", unit: "A-07", x: 402, y: 320 },
  { id: "west-1", name: "Guardian", unit: "GF-08", x: 240, y: 286 },
  { id: "west-2", name: "Owned By Unicorn", unit: "A-12", x: 262, y: 368 },
  { id: "west-3", name: "Willie's Bakery", unit: "A-21", x: 236, y: 428 },
  { id: "east-1", name: "Starbucks", unit: "22", x: 718, y: 320 },
  { id: "east-2", name: "New Balance", unit: "24", x: 756, y: 366 },
  { id: "east-3", name: "Lascada", unit: "15", x: 720, y: 430 },
];
