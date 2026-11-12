/** Демо-данные и расчёт пролётов для планировщика наблюдений. */

export type Band = "VHF" | "UHF" | "L" | "S";

export type Antenna = { id: string; type: string; band: Band };

export type Station = {
  id: number;
  name: string;
  callsign: string;
  owner: string;
  online: boolean;
  locator: string;
  coords: string;
  bands: Band[];
  antennas: Antenna[];
  success: number;
};

export type Satellite = {
  id: string;
  name: string;
  norad: number;
  operator?: string;
  transmitters: number;
  observations: number;
  success: number;
  active: boolean;
};

export type Filters = {
  elevation: [number, number];
  overlap: [number, number];
  minDuration: number;
  maxDuration: number;
};

export type Intersection = {
  passId: string;
  satelliteId: string;
  from: Date;
  to: Date;
};

export type Pass = {
  id: string;
  satelliteId: string;
  start: Date;
  end: Date;
  aos: number;
  tca: number;
  los: number;
  maxElevation: number;
  intersections: Intersection[];
};

export const STATIONS: Station[] = [
  {
    id: 112,
    name: "Сампо",
    callsign: "R1NAV",
    owner: "R1NAV_Test",
    online: true,
    locator: "KP50fn",
    coords: "60.56°, 30.24°",
    bands: ["VHF", "UHF"],
    antennas: [
      { id: "sampo-qfh", type: "Квадрифилярная", band: "UHF" },
      { id: "sampo-yagi", type: "Яги", band: "VHF" },
    ],
    success: 92,
  },
  {
    id: 27,
    name: "Камчатка",
    callsign: "UA0ZC",
    owner: "КамГУ",
    online: true,
    locator: "QO93ab",
    coords: "53.05°, 158.63°",
    bands: ["VHF", "UHF", "L"],
    antennas: [
      { id: "kam-dipole", type: "Диполь", band: "VHF" },
      { id: "kam-vdipole", type: "V-диполь", band: "VHF" },
      { id: "kam-qfh", type: "Квадрифилярная", band: "UHF" },
    ],
    success: 88,
  },
  {
    id: 20,
    name: "СРЦОД Самара",
    callsign: "RN4HAB",
    owner: "СРЦОД",
    online: true,
    locator: "LO43bf",
    coords: "53.23°, 50.23°",
    bands: ["UHF", "L"],
    antennas: [
      { id: "sam-para", type: "Параболическая", band: "L" },
      { id: "sam-yagi", type: "Яги", band: "UHF" },
    ],
    success: 81,
  },
  {
    id: 33,
    name: "Импульс, Челябинск",
    callsign: "RA9AEX",
    owner: "Импульс",
    online: false,
    locator: "MO05ad",
    coords: "55.15°, 61.37°",
    bands: ["VHF"],
    antennas: [{ id: "chel-turn", type: "Турникетная", band: "VHF" }],
    success: 74,
  },
  {
    id: 41,
    name: "Ядерный лицей, Димитровград",
    callsign: "R4LDM",
    owner: "Лицей ДИТИ",
    online: true,
    locator: "LO44cf",
    coords: "54.21°, 49.61°",
    bands: ["VHF", "UHF"],
    antennas: [
      { id: "dim-qfh", type: "Квадрифилярная", band: "VHF" },
      { id: "dim-helix", type: "Спиральная", band: "UHF" },
    ],
    success: 86,
  },
];

export const SATELLITES: Satellite[] = [
  { id: "innosat16", name: "InnoSat16", norad: 57172, operator: "Геоскан", transmitters: 3, observations: 1234, success: 90, active: true },
  { id: "innosat17", name: "InnoSat17", norad: 57173, operator: "Геоскан", transmitters: 3, observations: 1105, success: 87, active: true },
  { id: "noaa19", name: "NOAA 19", norad: 33591, transmitters: 4, observations: 8840, success: 94, active: true },
  { id: "meteor23", name: "Meteor-M 2-3", norad: 57166, transmitters: 2, observations: 2310, success: 83, active: true },
  { id: "edelveis", name: "Geoscan-Edelveis", norad: 53385, operator: "Геоскан", transmitters: 2, observations: 640, success: 71, active: true },
  { id: "siriussat", name: "SiriusSat-1", norad: 43595, transmitters: 1, observations: 312, success: 58, active: false },
];

export const PERIODS = [1, 3, 6, 12, 24] as const;
export type Period = (typeof PERIODS)[number];

export const DEFAULT_FILTERS: Filters = {
  elevation: [0, 90],
  overlap: [0, 100],
  minDuration: 120,
  maxDuration: 1200,
};

export const satelliteById = (id: string) =>
  SATELLITES.find((s) => s.id === id)!;

/** Детерминированный генератор, чтобы расчёт давал одинаковый результат. */
function random(seed: string) {
  let h = 2166136261;
  for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

const overlapSeconds = (a: Pass, b: Pass) =>
  Math.max(
    0,
    (Math.min(+a.end, +b.end) - Math.max(+a.start, +b.start)) / 1000,
  );

export function calculatePasses(
  station: Station,
  antenna: Antenna,
  satelliteIds: string[],
  start: Date,
  hours: number,
  filters: Filters,
  cancelled: Set<string>,
): Pass[] {
  const end = +start + hours * 3600_000;
  let passes: Pass[] = [];
  for (const satelliteId of satelliteIds) {
    const rnd = random(`${station.id}-${antenna.id}-${satelliteId}-${+start}`);
    let t = +start + rnd() * 50 * 60_000;
    let n = 0;
    while (t < end) {
      const seconds = Math.round(360 + rnd() * 620);
      const maxElevation = Math.round(8 + rnd() * 80);
      const aos = Math.round(rnd() * 359);
      const los = Math.round((aos + 120 + rnd() * 110) % 360);
      const tca = Math.round((aos + ((los - aos + 360) % 360) / 2) % 360);
      const visible = rnd() > 0.2;
      if (visible) {
        const passStart = new Date(Math.round(t / 60_000) * 60_000);
        const duration = Math.min(seconds, filters.maxDuration);
        passes.push({
          id: `${satelliteId}-${n}`,
          satelliteId,
          start: passStart,
          end: new Date(+passStart + duration * 1000),
          aos,
          tca,
          los,
          maxElevation,
          intersections: [],
        });
      }
      n++;
      t += (38 + rnd() * 70) * 60_000;
    }
  }
  // Демо: гарантируем хотя бы одно пересечение, чтобы сценарий с отменой был виден.
  const [firstSat, secondSat] = satelliteIds;
  const anchor = passes.find((p) => p.satelliteId === firstSat);
  const shifted = passes.find((p) => p.satelliteId === secondSat);
  if (anchor && shifted && !passes.some((a) => passes.some((b) => a.satelliteId !== b.satelliteId && overlapSeconds(a, b) > 0))) {
    const length = +shifted.end - +shifted.start;
    shifted.start = new Date(+anchor.start + 4 * 60_000);
    shifted.end = new Date(+shifted.start + length);
  }
  passes = passes.filter(
    (p) =>
      !cancelled.has(p.id) &&
      p.maxElevation >= filters.elevation[0] &&
      p.maxElevation <= filters.elevation[1] &&
      (+p.end - +p.start) / 1000 >= filters.minDuration,
  );
  // Антенна ведёт один спутник: при наложении усекается пролёт с меньшей высотой.
  for (const a of passes)
    for (const b of passes) {
      if (a === b || a.satelliteId === b.satelliteId) continue;
      const seconds = overlapSeconds(a, b);
      if (!seconds) continue;
      const loser = a.maxElevation < b.maxElevation || (a.maxElevation === b.maxElevation && a.id > b.id);
      if (!loser) continue;
      a.intersections.push({
        passId: b.id,
        satelliteId: b.satelliteId,
        from: new Date(Math.max(+a.start, +b.start)),
        to: new Date(Math.min(+a.end, +b.end)),
      });
    }
  return passes
    .filter((p) => {
      const covered = p.intersections.reduce(
        (sum, i) => sum + (+i.to - +i.from) / 1000,
        0,
      );
      const share = (covered / ((+p.end - +p.start) / 1000)) * 100;
      return share >= filters.overlap[0] && share <= filters.overlap[1];
    })
    .sort((x, y) => +x.start - +y.start);
}

const time = new Intl.DateTimeFormat("ru-RU", { hour: "2-digit", minute: "2-digit" });
const day = new Intl.DateTimeFormat("ru-RU", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
const dayShort = new Intl.DateTimeFormat("ru-RU", { weekday: "long", day: "numeric", month: "long" });
const dateTime = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
export const formatTime = (d: Date) => time.format(d);
export const formatDay = (d: Date) => capitalize(day.format(d).replace(" г.", ""));
export const formatDayShort = (d: Date) => capitalize(dayShort.format(d));
export const formatDateTime = (d: Date) => dateTime.format(d).replace(" г.", "").replace(" в ", ", ");
export const dayKey = (d: Date) => d.toDateString();

export function formatDuration(from: Date, to: Date) {
  const total = Math.round((+to - +from) / 1000);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return [h && `${h} ч`, m && `${m} мин`, s && `${s} сек`].filter(Boolean).join(" ") || "0 сек";
}

export function plural(n: number, one: string, few: string, many: string) {
  const m10 = n % 10, m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return `${n} ${one}`;
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return `${n} ${few}`;
  return `${n} ${many}`;
}
