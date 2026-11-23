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
  /** Страна запуска: код флага из @sonik-space/icons. */
  country: "RU" | "US";
  /** Партнёры миссии с логотипами. */
  partners?: { name: string; logo: "geoscan" | "space-pi" }[];
  /** Спутник на орбите (иначе сошёл). */
  onOrbit: boolean;
  transmitters: number;
  observations: number;
  success: number;
  active: boolean;
};

/** Параметры расчёта. Элевация и наложение фильтруют уже готовый результат — см. ResultFilters. */
export type Filters = {
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
  /** Станция пролёта — в режиме «Для спутника», где наблюдения идут на нескольких станциях. */
  stationId?: number;
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
  { id: "innosat16", name: "InnoSat16", norad: 57172, country: "RU", partners: [{ name: "Геоскан", logo: "geoscan" }, { name: "Space-π", logo: "space-pi" }], onOrbit: true, transmitters: 3, observations: 1234, success: 90, active: true },
  { id: "innosat17", name: "InnoSat17", norad: 57173, country: "RU", partners: [{ name: "Геоскан", logo: "geoscan" }, { name: "Space-π", logo: "space-pi" }], onOrbit: true, transmitters: 3, observations: 1105, success: 87, active: true },
  { id: "noaa19", name: "NOAA 19", norad: 33591, country: "US", onOrbit: true, transmitters: 4, observations: 8840, success: 94, active: true },
  { id: "meteor23", name: "Meteor-M 2-3", norad: 57166, country: "RU", onOrbit: true, transmitters: 2, observations: 2310, success: 83, active: true },
  { id: "edelveis", name: "Geoscan-Edelveis", norad: 53385, country: "RU", partners: [{ name: "Геоскан", logo: "geoscan" }], onOrbit: true, transmitters: 2, observations: 640, success: 71, active: true },
  { id: "siriussat", name: "SiriusSat-1", norad: 43595, country: "RU", onOrbit: false, transmitters: 1, observations: 312, success: 58, active: false },
];

export const PERIODS = [1, 3, 6, 12, 24] as const;
export type Period = (typeof PERIODS)[number];

export const DEFAULT_FILTERS: Filters = {
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

/** Спутники, которые проходят над станцией в выбранный период (моки). */
export function availableSatellites(station: Station, antenna: Antenna, start: Date, hours: number): string[] {
  const rnd = random(`${station.id}-${antenna.id}-${+start}-${hours}`);
  const chance = Math.min(0.9, 0.45 + hours / 40);
  const list = SATELLITES.filter((s) => s.active && rnd() < chance).map((s) => s.id);
  // Хотя бы два спутника, чтобы было что выбрать и увидеть пересечения.
  for (const s of SATELLITES) if (list.length < 2 && s.active && !list.includes(s.id)) list.push(s.id);
  return SATELLITES.map((s) => s.id).filter((id) => list.includes(id));
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
      !cancelled.has(p.id) && (+p.end - +p.start) / 1000 >= filters.minDuration,
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
  return passes.sort((x, y) => +x.start - +y.start);
}

/** Доля пролёта (в %), которая перекрыта другими наблюдениями. */
export function overlapShare(p: Pass) {
  const covered = p.intersections.reduce((sum, i) => sum + (+i.to - +i.from) / 1000, 0);
  return (covered / ((+p.end - +p.start) / 1000)) * 100;
}

/** Фильтры по готовому расчёту: элевация (с учётом горизонта станции) и наложение. */
export type ResultFilters = {
  elevation: [number, number];
  overlap: [number, number];
  useHorizon: boolean;
};
export const DEFAULT_RESULT_FILTERS: ResultFilters = { elevation: [0, 90], overlap: [0, 100], useHorizon: true };

export function filterPasses(passes: Pass[], f: ResultFilters, horizon: number | ((p: Pass) => number)) {
  return passes.filter((p) => {
    const h = typeof horizon === "function" ? horizon(p) : horizon;
    const minEl = f.useHorizon ? Math.max(f.elevation[0], h) : f.elevation[0];
    const share = overlapShare(p);
    return p.maxElevation >= minEl && p.maxElevation <= f.elevation[1] && share >= f.overlap[0] && share <= f.overlap[1];
  });
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
const dateOnly = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long", year: "numeric" });
/** «24 сентября 2026» — дата без «г.», как в карточках макета. */
export const formatDate = (d: Date) => dateOnly.format(d).replace(" г.", "");
/** «22 ноября 2026» или «22–23 ноября 2026», если наблюдения идут в разные дни. */
export const formatDateRange = (from: Date, to: Date) =>
  (dayKey(from) === dayKey(to) ? dateOnly.format(from) : dateOnly.formatRange(from, to)).replace(/ г\.$/, "").replace(" г.", "");

export function formatDuration(from: Date, to: Date) {
  const total = Math.round((+to - +from) / 1000);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return [h && `${h} ч`, m && `${m} мин`, s && `${s} сек`].filter(Boolean).join(", ") || "0 сек";
}

/** Короткая длительность словами: «20 минут», для длинных — как formatDuration. */
export function formatLength(from: Date, to: Date) {
  const total = Math.round((+to - +from) / 1000);
  if (total < 3600 && total % 60 === 0) return plural(total / 60, "минута", "минуты", "минут");
  return formatDuration(from, to);
}

export function plural(n: number, one: string, few: string, many: string) {
  const m10 = n % 10, m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return `${n} ${one}`;
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return `${n} ${few}`;
  return `${n} ${many}`;
}

/* ---------- Автонаблюдения ---------- */

export const AUTO_MAX_SATELLITES = 30;
export const AUTO_MAX_PRIORITY = 30;

export type Transmitter = { uuid: string; name: string; frequency: string; band: Band };

/** Детерминированный UUID v4 для моков (в API приходят настоящие). */
export function fakeUuid(seed: string) {
  const rnd = random(seed);
  const hex = Array.from({ length: 32 }, () => Math.floor(rnd() * 16).toString(16));
  hex[12] = "4";
  hex[16] = "89ab"[Math.floor(rnd() * 4)];
  const s = hex.join("");
  return `${s.slice(0, 8)}-${s.slice(8, 12)}-${s.slice(12, 16)}-${s.slice(16, 20)}-${s.slice(20)}`;
}

export const satelliteUuid = (id: string) => fakeUuid(`satellite-${id}`);

/** Тип передатчика и его диапазон: APT/LRPT — 137 МГц (VHF), телеметрия и маяк — 435 МГц (UHF). */
const TX_KINDS: { name: string; base: number; band: Band }[] = [
  { name: "Телеметрия", base: 435, band: "UHF" },
  { name: "APT", base: 137, band: "VHF" },
  { name: "LRPT", base: 137, band: "VHF" },
  { name: "Маяк", base: 435, band: "UHF" },
  { name: "Транспондер", base: 145, band: "VHF" },
];
/** Передатчики спутника (моки): название, частота, UUID. */
export function transmittersOf(sat: Satellite): Transmitter[] {
  const rnd = random(`tx-${sat.id}`);
  return Array.from({ length: sat.transmitters }, (_, i) => {
    const kind = TX_KINDS[i % TX_KINDS.length];
    return {
      uuid: fakeUuid(`tx-${sat.id}-${i}`),
      name: kind.name,
      frequency: `${kind.base + Math.round(rnd() * 900) / 1000} МГц`,
      band: kind.band,
    };
  });
}

/** Минимальный горизонт, заданный в настройках станции (моки). */
export const stationHorizon = (s: Station) => [10, 5, 15, 20, 10][STATIONS.indexOf(s) % 5] ?? 10;

export type AutoSchedule = {
  minHorizon: number;
  startAzimuth: number;
  endAzimuth: number;
  durationSeconds: number;
  observationGapSeconds: number;
  satellites: { satelliteUuid: string; transmitterUuid: string; priority: number }[];
};

/* ---------- Режим «Для спутника» ---------- */

export const stationById = (id: number) => STATIONS.find((s) => s.id === id)!;

/** Антенна станции под диапазон передатчика (или первая, если подходящей нет). */
export const antennaFor = (station: Station, band: Band) => station.antennas.find((a) => a.band === band) ?? station.antennas[0];

/** Станции, которые видят спутник в выбранный период и принимают диапазон передатчика (моки). */
export function availableStations(satelliteId: string, tx: Transmitter, start: Date, hours: number): number[] {
  const rnd = random(`${satelliteId}-${tx.uuid}-${+start}-${hours}`);
  const fits = STATIONS.filter((s) => s.bands.includes(tx.band));
  const list = fits.filter(() => rnd() < Math.min(0.9, 0.55 + hours / 40)).map((s) => s.id);
  for (const s of [...fits, ...STATIONS]) if (list.length < 2 && !list.includes(s.id)) list.push(s.id);
  return STATIONS.map((s) => s.id).filter((id) => list.includes(id));
}

/**
 * Пролёты одного спутника над несколькими станциями. Пересечения — с наблюдениями,
 * которые на станции уже заняты другим спутником. Id пролётов и отмен — «станция:пролёт».
 */
export function calculateSatellitePasses(
  satelliteId: string,
  tx: Transmitter,
  stationIds: number[],
  start: Date,
  hours: number,
  filters: Filters,
  cancelled: Set<string>,
): Pass[] {
  const busy = SATELLITES.find((s) => s.active && s.id !== satelliteId)!.id;
  return stationIds
    .flatMap((id) => {
      const station = stationById(id);
      const prefix = `${id}:`;
      const local = new Set([...cancelled].filter((c) => c.startsWith(prefix)).map((c) => c.slice(prefix.length)));
      const all = calculatePasses(station, antennaFor(station, tx.band), [satelliteId, busy], start, hours, filters, local);
      const taken = all.filter((p) => p.satelliteId === busy);
      // Станция уже занята другим спутником: любое наложение — пересечение нашего пролёта, независимо от высоты.
      return all
        .filter((p) => p.satelliteId === satelliteId)
        .map((p) => ({
          ...p,
          id: prefix + p.id,
          stationId: id,
          intersections: taken
            .filter((b) => overlapSeconds(p, b) > 0)
            .map((b) => ({
              passId: prefix + b.id,
              satelliteId: b.satelliteId,
              from: new Date(Math.max(+p.start, +b.start)),
              to: new Date(Math.min(+p.end, +b.end)),
            })),
        }));
    })
    .sort((a, b) => +a.start - +b.start);
}
