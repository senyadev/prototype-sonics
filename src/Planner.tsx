import { publicPath } from "./paths";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { Header } from "@sonik-space/ui/shell";
import { Button, ButtonSize, ButtonType, TextButton, TextButtonType, ThemeToggle } from "@sonik-space/ui/buttons";
import { Input } from "@sonik-space/ui/inputs";
import { DatePicker, Selector } from "@sonik-space/ui/selectors";
import { Checkbox, Toggle, ToggleBtnGroup } from "@sonik-space/ui/checkbox";
import { Tooltip } from "@sonik-space/ui/tooltips";
import { Avatar, AvatarSize, AvatarVariant } from "@sonik-space/ui/avatar";
import { CategoryTab } from "@sonik-space/ui/tabs";
import { Modal } from "@sonik-space/ui/modal";
import { ThinkingOrb } from "thinking-orbs";
import { DataEmptyState } from "@sonik-space/ui/states";
import { Icon } from "@sonik-space/ui/icon";
import { BadgeColor, BadgeColorsBase, BadgeColorsTransmitter, BadgeColorsTransmitterType } from "@sonik-space/ui/badge";
import { ErrorIcon, IconName, LogotypeDarkIcon, LogotypeIcon } from "@sonik-space/icons";
import {
  DEFAULT_FILTERS,
  DEFAULT_RESULT_FILTERS,
  PERIODS,
  SATELLITES,
  STATIONS,
  availableSatellites,
  availableStations,
  calculateSatellitePasses,
  calculatePasses,
  dayKey,
  filterPasses,
  formatDayShort,
  formatDuration,
  formatTime,
  plural,
  satelliteById,
  stationById,
  stationHorizon,
  transmittersOf,
  type Filters,
  type Pass,
  type ResultFilters,
  type Period,
  type Satellite,
  type AutoSchedule,
  type Station,
} from "./planner/data";
import { PassCard } from "./planner/PassCard";
import { PassChart } from "./planner/PassChart";
import { QualityBar, RangeField, SatelliteModal, StationModal } from "./planner/Pickers";
import { AutoPlanner, satellitesCount } from "./planner/AutoPlanner";
import Confetti from "./station/Confetti";
import "./planner/planner.css";

type Status = "idle" | "loading" | "ready";
type View = "planner" | "plan" | "success";

const nextHour = () => {
  const d = new Date();
  d.setMinutes(0, 0, 0);
  d.setHours(d.getHours() + 1);
  return d;
};
const observations = (n: number) => plural(n, "наблюдение", "наблюдения", "наблюдений");

/** Моки для страницы расчёта: форма заполнена, наблюдения уже рассчитаны. */
function mockSetup() {
  const station = STATIONS[0];
  const antenna = station.antennas[0];
  const start = new Date();
  start.setDate(start.getDate() + 1);
  start.setHours(12, 0, 0, 0);
  const period: Period = 6;
  const available = availableSatellites(station, antenna, start, period);
  const satellites = available.slice(0, 3);
  const passes = calculatePasses(station, antenna, satellites, start, period, DEFAULT_FILTERS, new Set());
  return { station, antennaId: antenna.id, satellites, available, start, period, passes };
}

/** Распределение качества наблюдений спутника: удачные, частичные, неудачные, без данных. */
function SatQuality({ sat }: { sat: Satellite }) {
  const rest = 100 - sat.success;
  const parts = [
    ["good", sat.success],
    ["partial", Math.round(rest * 0.45)],
    ["bad", Math.round(rest * 0.3)],
    ["empty", rest - Math.round(rest * 0.45) - Math.round(rest * 0.3)],
  ] as const;
  return (
    <span className="sat-quality" role="img" aria-label={`Успешных наблюдений ${sat.success}%`}>
      {parts.map(([k, v]) => (
        <span key={k} className={k} style={{ flexGrow: Math.max(v, 4) }} />
      ))}
    </span>
  );
}

/** Лоудер-орб в фирменном оранжевом: цвет берём из токена кита, чтобы совпадал с кнопками. */
function BrandOrb() {
  const [color] = useState(
    () => getComputedStyle(document.documentElement).getPropertyValue("--text-action-default").trim() || "rgb(255, 134, 86)",
  );
  return <ThinkingOrb className="orb-big" state="searching" size={64} color={color} aria-hidden="true" />;
}

function FilterIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 5h16l-6.2 7.3V18l-3.6 2v-7.7L4 5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

export default function Planner({ mock = false }: { mock?: boolean }) {
  const [initial] = useState(() => (mock ? mockSetup() : null));
  const [theme, setTheme] = useState<"light" | "dark">(() =>
    document.documentElement.classList.contains("dark") ? "dark" : "light",
  );
  const [station, setStation] = useState<Station | null>(initial?.station ?? null);
  const [antennaId, setAntennaId] = useState<string | null>(initial?.antennaId ?? null);
  const [period, setPeriod] = useState<Period | null>(initial?.period ?? null);
  // Время сначала не выбрано: спутники ищутся только после выбора.
  const [start, setStart] = useState<Date | null>(initial?.start ?? null);
  const [satellites, setSatellites] = useState<string[]>(initial?.satellites ?? []);
  const [available, setAvailable] = useState<string[]>(initial?.available ?? []);
  const [satStatus, setSatStatus] = useState<"idle" | "loading" | "ready">(initial ? "ready" : "idle");
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  // Элевация и наложение — фильтры уже рассчитанных наблюдений, без перерасчёта.
  const [resultFilters, setResultFilters] = useState<ResultFilters>(DEFAULT_RESULT_FILTERS);
  const [auto, setAuto] = useState(false);
  const [schedule, setSchedule] = useState<AutoSchedule | null>(null);
  const [modal, setModal] = useState<"station" | "satellite" | "stations" | null>(null);
  const [status, setStatus] = useState<Status>(initial ? "ready" : "idle");
  const [statusText, setStatusText] = useState("");
  const [passes, setPasses] = useState<Pass[]>(initial?.passes ?? []);
  const [cancelled, setCancelled] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [grouped, setGrouped] = useState<"satellite" | "list">("satellite");
  const [display, setDisplay] = useState<"table" | "chart">("table");
  const [view, setView] = useState<View>("planner");
  const [confirm, setConfirm] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());
  const [setupKey, setSetupKey] = useState(0);
  // Режим «Для спутника»: спутник и передатчик, затем несколько станций.
  const [mode, setMode] = useState<"station" | "satellite">("station");
  const [satId, setSatId] = useState<string | null>(null);
  const [txId, setTxId] = useState<string | null>(null);
  const [stationIds, setStationIds] = useState<number[]>([]);
  const [availStations, setAvailStations] = useState<number[]>([]);
  const [stStatus, setStStatus] = useState<"idle" | "loading" | "ready">("idle");
  const resultsRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    document.title = "Планировщик наблюдений — СОНИКС";
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem("soniks-theme", theme);
    } catch {
      /* Тема работает и без хранилища. */
    }
  }, [theme]);
  useEffect(() => {
    if (view !== "planner") {
      window.scrollTo(0, 0);
      headingRef.current?.focus();
    }
  }, [view]);

  const antenna = station?.antennas.find((a) => a.id === antennaId) ?? null;
  const end = start && period ? new Date(+start + period * 3600_000) : null;

  // Шаг 4: после станции, антенны и времени подгружаем спутники в зоне видимости.
  const searchKey = station && antenna && start && period ? `${station.id}-${antenna.id}-${+start}-${period}` : "";
  const loadedKey = useRef(initial ? `${initial.station.id}-${initial.antennaId}-${+initial.start}-${initial.period}` : "");
  useEffect(() => {
    if (searchKey === loadedKey.current) return;
    if (!station || !antenna || !start || !period) {
      loadedKey.current = "";
      setSatStatus("idle");
      setAvailable([]);
      setSatellites([]);
      return;
    }
    setSatStatus("loading");
    const timer = window.setTimeout(() => {
      const next = availableSatellites(station, antenna, start, period);
      loadedKey.current = searchKey;
      setAvailable(next);
      setSatellites((current) => current.filter((id) => next.includes(id)));
      setSatStatus("ready");
    }, 1200);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKey]);
  const satMode = mode === "satellite";
  const sat = satId ? satelliteById(satId) : null;
  const tx = sat && txId ? (transmittersOf(sat).find((t) => t.uuid === txId) ?? null) : null;
  /** Первый шаг выбран: антенна (режим станции) или передатчик (режим спутника) — дальше открывается период. */
  const setupReady = satMode ? !!tx : !!antenna;

  // Режим спутника: после спутника, передатчика и времени подгружаем станции, которые его видят.
  // Ключ не зависит от режима: при переключении вкладок выбор станций сохраняется.
  const stKey = sat && tx && start && period ? `${sat.id}-${tx.uuid}-${+start}-${period}` : "";
  const stLoaded = useRef("");
  useEffect(() => {
    if (stKey === stLoaded.current) return;
    if (!stKey || !sat || !tx || !start || !period) {
      stLoaded.current = "";
      setStStatus("idle");
      setAvailStations([]);
      setStationIds([]);
      return;
    }
    setStStatus("loading");
    const timer = window.setTimeout(() => {
      const next = availableStations(sat.id, tx, start, period);
      stLoaded.current = stKey;
      setAvailStations(next);
      setStationIds((current) => current.filter((id) => next.includes(id)));
      setStStatus("ready");
    }, 1200);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stKey]);

  const ready = satMode
    ? !!tx && !!start && !!period && stStatus === "ready" && stationIds.length > 0
    : !!station && !!antenna && !!start && !!period && satStatus === "ready" && satellites.length > 0;

  function run(cancelledIds: Set<string>, text: string, keepSelection: boolean) {
    if (!start || !period) return;
    if (satMode ? !sat || !tx : !station || !antenna) return;
    setStatus("loading");
    setStatusText(text);
    window.setTimeout(() => {
      const next = satMode
        ? calculateSatellitePasses(sat!.id, tx!, stationIds, start, period, filters, cancelledIds)
        : calculatePasses(station!, antenna!, satellites, start, period, filters, cancelledIds);
      setPasses(next);
      setSelected((current) => {
        const ids = new Set(next.map((p) => p.id));
        const kept = keepSelection ? new Set([...current].filter((id) => ids.has(id))) : new Set<string>();
        return kept;
      });
      setStatus("ready");
      requestAnimationFrame(() => resultsRef.current?.focus());
    }, 900);
  }
  function calculate() {
    const fresh = new Set<string>();
    setCancelled(fresh);
    run(fresh, "Идёт расчёт наблюдений…", false);
  }
  function cancelPass(passId: string) {
    const next = new Set(cancelled).add(passId);
    setCancelled(next);
    setConfirm(null);
    run(next, "Идёт перерасчёт наблюдений после отмены…", true);
  }
  function toggle(id: string) {
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  /** Сбросить настройку наблюдения целиком: выбор начинается заново со станции. */
  function resetSetup() {
    setStation(null);
    setAntennaId(null);
    setPeriod(null);
    setStart(null);
    setSatellites([]);
    setAvailable([]);
    setSatStatus("idle");
    setFilters(DEFAULT_FILTERS);
    setResultFilters(DEFAULT_RESULT_FILTERS);
    setStatus("idle");
    setPasses([]);
    setCancelled(new Set());
    setSelected(new Set());
    setCollapsed(new Set());
    setSatId(null);
    setTxId(null);
    setStationIds([]);
    setAvailStations([]);
    setStStatus("idle");
    setSetupKey((k) => k + 1);
  }
  /** Переключение «Для спутника» / «Для станции»: выбор каждого режима сохраняется, расчёт сбрасывается. */
  function switchMode(next: "station" | "satellite") {
    if (next === mode) return;
    setMode(next);
    setAuto(false);
    setStatus("idle");
    setPasses([]);
    setCancelled(new Set());
    setSelected(new Set());
    setCollapsed(new Set());
  }

  const Logo = theme === "dark" ? LogotypeDarkIcon : LogotypeIcon;
  const themeControl = (
    <ThemeToggle
      theme={theme}
      onThemeChange={setTheme}
      labels={{ pending: "Загрузка темы", switchToDark: "Включить тёмную тему", switchToLight: "Включить светлую тему" }}
    />
  );
  const header = (
    <Header
      brand={
        <a href={publicPath("/")} aria-label="СОНИКС — главная">
          <Logo width={98} height={46} />
        </a>
      }
      actions={themeControl}
      mobileActions={themeControl}
    />
  );
  const confirmPass = passes.find((p) => p.id === confirm);
  // В режиме спутника отменяемый пролёт — чужой (станция занята другим спутником), его нет в списке: берём данные из пересечения.
  const confirmIntersection = confirm ? passes.flatMap((p) => p.intersections).find((i) => i.passId === confirm) : undefined;

  if (view === "success" && (satMode ? sat : station))
    return (
      <div className="planner-page">
        {header}
        <main className="planner-success">
          <Confetti />
          <div className="planner-success-image">
            <img src={publicPath("/img/stantion.png")} alt="" width={304} height={247} />
          </div>
          <div className="station-chip">
            <Icon iconName={satMode ? IconName.Satellite : IconName.Radio} width={20} height={20} aria-hidden="true" />
            <span>
              <small>{satMode ? "Спутник" : "Станция"}</small>
              {satMode ? sat!.name : `${station!.name} [${station!.callsign}]`}
            </span>
          </div>
          <h1 ref={headingRef} tabIndex={-1}>
            {schedule ? "Автонаблюдения настроены" : "Наблюдения запланированы"}
          </h1>
          <p>
            {schedule
              ? `В расписании ${satellitesCount(schedule.satellites.length)}. Станция сама запланирует их наблюдения по приоритету, они появятся в вашем личном кабинете`
              : `В плане ${observations(selected.size)}. Они появятся в вашем личном кабинете`}
          </p>
          {schedule && (
            <details className="auto-payload">
              <summary>Запрос на создание расписания</summary>
              <pre>{JSON.stringify(schedule, null, 2)}</pre>
            </details>
          )}
          <div className="planner-success-actions">
            <Button
              type="button"
              text="В планировщик"
              buttonType={ButtonType.GRAY}
              onClick={() => {
                setSelected(new Set());
                setSchedule(null);
                setView("planner");
              }}
            />
            <Button type="button" text="В личный кабинет" onClick={() => (window.location.href = publicPath("/"))} />
          </div>
        </main>
      </div>
    );

  const horizon = station ? stationHorizon(station) : 0;
  const horizonOf = (p: Pass) => (p.stationId ? stationHorizon(stationById(p.stationId)) : horizon);
  const filteredPasses = filterPasses(passes, resultFilters, horizonOf);
  /** Группы результатов: спутники (режим станции) или станции (режим спутника). */
  const groupIds = satMode ? stationIds.map(String) : satellites;
  const groupOf = (p: Pass) => (satMode ? String(p.stationId) : p.satelliteId);
  const groupLabel = (id: string) => (satMode ? stationById(Number(id)).name : satelliteById(id).name);
  const visiblePasses = view === "plan" ? passes.filter((p) => selected.has(p.id)) : filteredPasses;
  const hiddenCount = passes.length - filteredPasses.length;

  function passList(list: Pass[], showSatellite: boolean) {
    return list.map((p) => (
      <PassCard
        key={p.id}
        pass={p}
        added={selected.has(p.id)}
        onToggle={() => toggle(p.id)}
        onCancelIntersection={view === "planner" ? setConfirm : undefined}
        showSatellite={showSatellite}
      />
    ));
  }
  /** Как в макете: сначала день с разделителем, под ним спутники с наблюдениями этого дня. В карточках — только время. */
  const days: { key: string; date: Date; list: Pass[] }[] = [];
  for (const p of visiblePasses) {
    const key = dayKey(p.start);
    const last = days[days.length - 1];
    if (last?.key === key) last.list.push(p);
    else days.push({ key, date: p.start, list: [p] });
  }
  const toggleDay = (key: string) =>
    setCollapsed((c) => {
      const next = new Set(c);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  const dayDivider = (day: { key: string; date: Date; list: Pass[] }) => {
    const open = !collapsed.has(day.key);
    return (
      <h3 className="pass-day">
        <button type="button" aria-expanded={open} onClick={() => toggleDay(day.key)}>
          <Icon className="pass-day-chevron" iconName={IconName.ChevronDown} width={20} height={20} aria-hidden="true" />
          <span>{formatDayShort(day.date).replace(",", "")}</span>
          {!open && <small>{observations(day.list.length)}</small>}
        </button>
      </h3>
    );
  };
  /** Контейнер спутника: шапка со спутником, внутри — его наблюдения (без группировки — по одному). */
  const satGroup = (key: string, groupId: string, list: Pass[], showCount: boolean) => {
    if (satMode) {
      const st = stationById(Number(groupId));
      return (
        <section className="sat-group" key={key} aria-label={`Станция ${st.name}`}>
          <header>
            <span className="sat-icon" aria-hidden="true">
              <Icon iconName={IconName.SatelliteDish} width={20} height={20} />
            </span>
            <div>
              <span className="sat-name">
                Станция <span>{st.name} [{st.callsign}]</span>
              </span>
              <QualityBar value={st.success} />
            </div>
            {showCount && <span className="sat-count">{observations(list.length)}</span>}
          </header>
          {passList(list, false)}
        </section>
      );
    }
    const sat = satelliteById(groupId);
    return (
      <section className="sat-group" key={key} aria-label={`Спутник ${sat.name}`}>
        <header>
          <span className="sat-icon" aria-hidden="true">
            <Icon iconName={IconName.Satellite} width={20} height={20} />
          </span>
          <div>
            <span className="sat-name">
              Спутник <span>{sat.name}</span>
            </span>
            <SatQuality sat={sat} />
          </div>
          {showCount && <span className="sat-count">{observations(list.length)}</span>}
        </header>
        {passList(list, false)}
      </section>
    );
  };

  const byGroups = grouped === "satellite" || view === "plan";
  const results = (satMode ? sat : station) && (
    <section className="results" aria-label="Результаты расчёта">
      <div className="results-head">
        {satMode && sat ? (
          <div className="results-station">
            <Avatar className="results-avatar" size={AvatarSize.BIG} variant={AvatarVariant.SATELLITE} />
            <div>
              <small>Спутник</small>
              <span className="results-station-name">
                <strong>{sat.name}</strong>
                <BadgeColorsTransmitter type={sat.active ? BadgeColorsTransmitterType.ACTIVE : BadgeColorsTransmitterType.INACTIVE} />
                <BadgeColorsBase color={sat.onOrbit ? BadgeColor.GREEN : BadgeColor.GRAY} text={sat.onOrbit ? "На орбите" : "Сошёл с орбиты"} />
              </span>
            </div>
          </div>
        ) : (
          station && (
            <div className="results-station">
              <Avatar
                className="results-avatar"
                size={AvatarSize.BIG}
                variant={AvatarVariant.STATION}
                url={publicPath("/img/stantion.png")}
                alt=""
              />
              <div>
                <small>Станция</small>
                <span className="results-station-name">
                  <strong>
                    {station.name} [{station.callsign}]
                  </strong>
                  <BadgeColorsBase color={station.online ? BadgeColor.GREEN : BadgeColor.GRAY} text={station.online ? "В сети" : "Не в сети"} />
                </span>
              </div>
            </div>
          )
        )}
        <div className="results-tools">
          {view === "planner" && display === "table" && (
            <Tooltip content={byGroups ? "Показать списком" : satMode ? "Сгруппировать по станциям" : "Сгруппировать по спутникам"} placement="up">
              <button
                type="button"
                className={`results-group-btn ${byGroups ? "is-active" : ""}`}
                aria-pressed={byGroups}
                aria-label={satMode ? "Сгруппировать по станциям" : "Сгруппировать по спутникам"}
                onClick={() => setGrouped(byGroups ? "list" : "satellite")}
              >
                <FilterIcon />
              </button>
            </Tooltip>
          )}
          <ToggleBtnGroup
            className="results-display"
            value={display}
            onChange={setDisplay}
            options={[
              { value: "table", iconName: IconName.Table },
              { value: "chart", iconName: IconName.Graphic },
            ]}
          />
        </div>
      </div>
      <p className="results-summary">
        <span>{observations(visiblePasses.length)} всего</span>
        {view === "planner" && hiddenCount > 0 && <span className="results-hidden">Скрыто фильтрами: {hiddenCount}</span>}
      </p>
      {view === "planner" && (
        <div className="results-filters" role="group" aria-label="Фильтры наблюдений">
          <div className="results-filter">
            <RangeField
              inline
              label="Элевация"
              domain={[0, 90]}
              values={resultFilters.elevation}
              onChange={(v) => setResultFilters({ ...resultFilters, elevation: v })}
            />
            <label className="results-filter-check">
              <Checkbox
                checked={resultFilters.useHorizon}
                onChange={(e) => setResultFilters({ ...resultFilters, useHorizon: e.currentTarget.checked })}
              />
              {satMode ? "Учитывать минимальный горизонт станций" : `Учитывать минимальный горизонт станции (${horizon}°)`}
            </label>
          </div>
          <div className="results-filter">
            <RangeField
              inline
              label="Наложение, %"
              domain={[0, 100]}
              values={resultFilters.overlap}
              onChange={(v) => setResultFilters({ ...resultFilters, overlap: v })}
            />
          </div>
          {hiddenCount > 0 && (
            <TextButton
              type="button"
              className="results-filters-reset"
              text="Сбросить фильтры"
              buttonType={TextButtonType.SECONDARY}
              onClick={() => setResultFilters(DEFAULT_RESULT_FILTERS)}
            />
          )}
        </div>
      )}
      {visiblePasses.length === 0 ? (
        <DataEmptyState
          iconName={IconName.Empty}
          title="Под фильтры ничего не подходит"
          description={`Рассчитано ${observations(passes.length)}, все скрыты фильтрами`}
        />
      ) : display === "chart" ? (
        <PassChart
          passes={visiblePasses}
          rows={groupIds.map((id) => ({ id, label: groupLabel(id) }))}
          rowOf={groupOf}
          start={start ?? new Date()}
          end={end ?? new Date()}
          selected={selected}
          onToggle={toggle}
          onCancelIntersection={view === "planner" ? setConfirm : undefined}
        />
      ) : (
        days.map((day) => (
          <Fragment key={day.key}>
            {dayDivider(day)}
            {!collapsed.has(day.key) &&
              (byGroups
                ? groupIds
                    .map((id) => ({ id, list: day.list.filter((p) => groupOf(p) === id) }))
                    .filter((g) => g.list.length)
                    .map((g) => satGroup(g.id, g.id, g.list, true))
                : day.list.map((p) => satGroup(p.id, groupOf(p), [p], false)))}
          </Fragment>
        ))
      )}
    </section>
  );

  return (
    <div className="planner-page">
      {header}
      <main className="planner-main">
        {view === "plan" ? (
          <>
            <div className="planner-title-row">
              <TextButton
                type="button"
                text="К расчёту"
                buttonType={TextButtonType.SECONDARY}
                leftIcon={IconName.Arrow}
                onClick={() => setView("planner")}
              />
            </div>
            <div className="planner-title-row">
              <h1 ref={headingRef} tabIndex={-1}>
                План наблюдений
              </h1>
              <span className="planner-muted">{observations(selected.size)}</span>
            </div>
            {selected.size ? (
              results
            ) : (
              <DataEmptyState
                iconName={IconName.Empty}
                title="План пуст"
                description="Добавьте наблюдения из результатов расчёта"
                actionSlot={<Button type="button" text="К расчёту" buttonType={ButtonType.GRAY} onClick={() => setView("planner")} />}
              />
            )}
          </>
        ) : (
          <>
            <div className="planner-title-row">
              <h1>Запланировать наблюдение</h1>
              {!auto && (
                <div className="planner-tabs" role="group" aria-label="Режим планирования">
                  <CategoryTab
                    text="Для спутника"
                    showIcon
                    iconName={IconName.Satellite}
                    isActive={satMode}
                    aria-pressed={satMode}
                    onClick={() => switchMode("satellite")}
                  />
                  <CategoryTab
                    text="Для станции"
                    showIcon
                    iconName={IconName.SatelliteDish}
                    isActive={!satMode}
                    aria-pressed={!satMode}
                    onClick={() => switchMode("station")}
                  />
                </div>
              )}
              <div className="planner-title-actions">
                {(satMode ? sat : station) && (
                  <TextButton
                    type="button"
                    text="Сбросить"
                    buttonType={TextButtonType.SECONDARY}
                    title={satMode ? "Начать выбор заново со спутника" : "Начать выбор заново со станции"}
                    onClick={resetSetup}
                  />
                )}
                {!satMode && (
                  <label className="planner-auto" title="Станция сама планирует наблюдения выбранных спутников по приоритету">
                    <Toggle checked={auto} onChange={(e) => setAuto(e.currentTarget.checked)} />
                    Авто
                  </label>
                )}
              </div>
            </div>

            <div className={`planner-cards ${auto ? "planner-cards-auto" : ""}`}>
              {satMode ? (
              <section className="planner-card planner-card-station" aria-label="Спутник и передатчик">
                <div className="planner-block">
                  <h2 id="satpick-title">
                    <Icon iconName={IconName.Satellite} width={24} height={24} aria-hidden="true" /> Спутник
                  </h2>
                  <button type="button" className="picker-trigger" onClick={() => setModal("satellite")} aria-haspopup="dialog" aria-labelledby="satpick-title satpick-value">
                    <span id="satpick-value">{sat ? sat.name : "Выберите спутник"}</span>
                  </button>
                </div>
                <div className="planner-block">
                  <h2 id="tx-title">
                    <Icon iconName={IconName.Radio} width={24} height={24} aria-hidden="true" /> Передатчик
                  </h2>
                  <div className={`planner-select ${sat ? "" : "is-disabled"}`} aria-disabled={!sat} role="group" aria-labelledby="tx-title">
                    <Selector
                      key={sat?.id ?? "none"}
                      value={txId}
                      onChange={setTxId}
                      placeholder="Выберите передатчик"
                      options={(sat ? transmittersOf(sat) : []).map((t) => ({ value: t.uuid, label: `${t.name} · ${t.frequency} (${t.band})` }))}
                    />
                  </div>
                </div>
              </section>
              ) : (
              <section className="planner-card planner-card-station" aria-label="Станция и антенна">
                <div className="planner-block">
                  <h2 id="station-title">
                    <Icon iconName={IconName.SatelliteDish} width={24} height={24} aria-hidden="true" /> Станция
                  </h2>
                  <button type="button" className="picker-trigger" onClick={() => setModal("station")} aria-haspopup="dialog" aria-labelledby="station-title station-value">
                    <span id="station-value">{station ? `${station.name} [${station.callsign}]` : "Выберите станцию"}</span>
                  </button>
                </div>
                <div className="planner-block">
                  <h2 id="antenna-title">
                    <Icon iconName={IconName.Radio} width={24} height={24} aria-hidden="true" /> Антенна
                  </h2>
                  <div className={`planner-select ${station ? "" : "is-disabled"}`} aria-disabled={!station} role="group" aria-labelledby="antenna-title">
                    <Selector
                      key={station?.id ?? "none"}
                      value={antennaId}
                      onChange={setAntennaId}
                      placeholder="Выберите антенну"
                      options={(station?.antennas ?? []).map((a) => ({ value: a.id, label: `${a.type} (${a.band})` }))}
                    />
                  </div>
                </div>
              </section>
              )}

              {auto ? (
                <AutoPlanner
                  key={setupKey}
                  station={station}
                  ready={!!station && !!antenna}
                  onSubmit={(s) => {
                    setSchedule(s);
                    setView("success");
                  }}
                />
              ) : (
              <>
              <section
                className={`planner-card planner-card-split ${setupReady ? "" : "is-disabled"}`}
                aria-labelledby="period-title"
                aria-disabled={!setupReady}
                inert={!setupReady}
              >
                <div className="planner-card-head">
                  <h2 id="period-title">
                    <Icon iconName={IconName.Calendar} width={24} height={24} aria-hidden="true" /> Период планирования
                  </h2>
                  <ToggleBtnGroup
                    value={period ? String(period) : ""}
                    onChange={(v) => {
                      // Период без начала: начинаем с ближайшего часа, даты сразу видны в пикерах.
                      setPeriod(Number(v) as Period);
                      if (!start) setStart(nextHour());
                    }}
                    options={PERIODS.map((p) => ({ value: String(p), text: `${p} ч` }))}
                  />
                </div>
                <div className="planner-period">
                  {/* У DatePicker из кита нет пустого состояния: пока время не выбрано, прячем дату и показываем подсказку. */}
                  <DatePicker
                    key={`start-${start ? +start : "empty"}`}
                    className={start ? "" : "date-empty"}
                    title="Начало"
                    date={start ?? nextHour()}
                    onChange={(d) => !Number.isNaN(+d) && setStart(d)}
                  />
                  <DatePicker
                    key={`end-${end ? +end : "empty"}`}
                    className={end ? "" : "date-empty"}
                    title="Конец"
                    date={end ?? nextHour()}
                    onChange={(d) => {
                      if (Number.isNaN(+d)) return;
                      // Без начала конец задаёт время: начало отсчитываем назад на выбранный период.
                      if (!start) {
                        const hours = period ?? 3;
                        setPeriod(hours);
                        setStart(new Date(+d - hours * 3600_000));
                        return;
                      }
                      // Конец подстраивает длительность под ближайший доступный период.
                      const hours = (+d - +start) / 3600_000;
                      if (!(hours > 0)) return;
                      setPeriod(PERIODS.reduce((best, p) => (Math.abs(p - hours) < Math.abs(best - hours) ? p : best)));
                    }}
                  />
                </div>
              </section>

              {satMode ? (
              <section
                className={`planner-card planner-card-split ${stStatus === "idle" ? "is-disabled" : ""} ${stStatus === "loading" ? "is-loading" : ""}`}
                aria-labelledby="stations-title"
                aria-disabled={stStatus !== "ready"}
                aria-busy={stStatus === "loading"}
              >
                {stStatus === "loading" ? (
                  <div className="sat-loading" role="status">
                    <BrandOrb />
                    <span className="visually-hidden" id="stations-title">Ищем станции, которые видят спутник…</span>
                  </div>
                ) : (
                <>
                <div className="planner-card-head">
                  <h2 id="stations-title">
                    <Icon iconName={IconName.SatelliteDish} width={24} height={24} aria-hidden="true" /> Станция
                  </h2>
                  {stStatus === "ready" && <span className="planner-muted">Доступно: {availStations.length}</span>}
                </div>
                  <button
                    type="button"
                    className="picker-trigger"
                    onClick={() => setModal("stations")}
                    aria-haspopup="dialog"
                    disabled={stStatus !== "ready"}
                    aria-labelledby="stations-title stations-value"
                  >
                    <span id="stations-value">
                      {stationIds.length
                        ? stationIds.map((id) => stationById(id).name).join(", ")
                        : stStatus === "ready"
                          ? "Выберите станции"
                          : !tx
                            ? "Сначала выберите передатчик"
                            : "Сначала выберите время"}
                    </span>
                  </button>
                </>
                )}
              </section>
              ) : (
              <section
                className={`planner-card planner-card-split ${satStatus === "idle" ? "is-disabled" : ""} ${satStatus === "loading" ? "is-loading" : ""}`}
                aria-labelledby="sat-title"
                aria-disabled={satStatus !== "ready"}
                aria-busy={satStatus === "loading"}
              >
                {satStatus === "loading" ? (
                  <div className="sat-loading" role="status">
                    <BrandOrb />
                    <span className="visually-hidden" id="sat-title">Ищем спутники над станцией…</span>
                  </div>
                ) : (
                <>
                <div className="planner-card-head">
                  <h2 id="sat-title">
                    <Icon iconName={IconName.Satellite} width={24} height={24} aria-hidden="true" /> Спутник
                  </h2>
                  {satStatus === "ready" && (
                    <span className="planner-muted">
                      Доступно: {available.length}
                    </span>
                  )}
                </div>
                  <button
                    type="button"
                    className="picker-trigger"
                    onClick={() => setModal("satellite")}
                    aria-haspopup="dialog"
                    disabled={satStatus !== "ready"}
                    aria-labelledby="sat-title sat-value"
                  >
                    <span id="sat-value">
                      {satellites.length
                        ? satellites.map((id) => satelliteById(id).name).join(", ")
                        : satStatus === "ready"
                          ? "Выберите спутник"
                          : !antenna
                            ? "Сначала выберите антенну"
                            : "Сначала выберите время"}
                    </span>
                  </button>
                </>
                )}
              </section>
              )}
              </>
              )}
            </div>

            {!auto && (
            <>

            <section className="planner-card planner-calc-bar" aria-labelledby="calc-params-title">
              <h2 id="calc-params-title">Параметры расчёта</h2>
              <div className="planner-calc-fields">
                <Input
                  text="Мин. интервал"
                  showTitle
                  inputMode="numeric"
                  value={String(filters.minDuration)}
                  rightIcon={<span className="input-unit">Сек</span>}
                  showRightIcon
                  title="Наблюдения короче этого значения не показываются"
                  onChange={(e) => Number.isFinite(+e.target.value) && setFilters({ ...filters, minDuration: +e.target.value })}
                />
                <Input
                  text="Макс. длительность"
                  showTitle
                  inputMode="numeric"
                  value={String(filters.maxDuration)}
                  rightIcon={<span className="input-unit">Сек</span>}
                  showRightIcon
                  onChange={(e) => Number.isFinite(+e.target.value) && setFilters({ ...filters, maxDuration: +e.target.value })}
                />
              </div>
              <Button
                type="button"
                className="planner-calc-btn"
                text={status === "ready" ? "Пересчитать наблюдения" : "Рассчитать наблюдения"}
                disabled={!ready || status === "loading"}
                onClick={calculate}
              />
            </section>

            <div className="planner-results" ref={resultsRef} tabIndex={-1} aria-live="polite" aria-busy={status === "loading"}>
              {status === "idle" && (
                <DataEmptyState
                  iconName={IconName.Edit}
                  title="Настройте наблюдения"
                  description="Для отображения возможных наблюдений списком"
                />
              )}
              {status === "loading" && (
                <div className="planner-loading" role="status">
                  <BrandOrb />
                  <span>{statusText}</span>
                </div>
              )}
              {status === "ready" &&
                (passes.length ? (
                  results
                ) : (
                  <DataEmptyState
                    iconName={IconName.Empty}
                    title="Наблюдений не найдено"
                    description="Увеличьте период планирования или измените параметры расчёта"
                  />
                ))}
            </div>
            </>
            )}
          </>
        )}
      </main>

      {selected.size > 0 && view !== "success" && !(auto && view === "planner") && (
        <div className="planner-islands" role="region" aria-label={`Выбрано: ${observations(selected.size)}`}>
          <div className="planner-island planner-island-accent">
            <Button
              type="button"
              className="planner-island-btn"
              buttonSize={ButtonSize.SMALL}
              text="Запланировать"
              aria-label={`Запланировать: ${observations(selected.size)}`}
              onClick={() => setView("success")}
            />
          </div>
          <div className="planner-island">
            {view === "planner" && (
              <Button type="button" buttonSize={ButtonSize.SMALL} text="Посмотреть план" onClick={() => setView("plan")} />
            )}
            <Button
              type="button"
              buttonSize={ButtonSize.SMALL}
              text="Отменить"
              buttonType={ButtonType.GRAY}
              aria-label="Отменить выбор наблюдений"
              onClick={() => setSelected(new Set())}
            />
          </div>
        </div>
      )}

      {modal === "station" && (
        <StationModal
          open
          selected={station}
          onClose={() => setModal(null)}
          onSelect={(s) => {
            if (s.id !== station?.id) {
              setStation(s);
              setAntennaId(s.antennas.length === 1 ? s.antennas[0].id : null);
              setStatus("idle");
              setSelected(new Set());
            }
            setModal(null);
          }}
        />
      )}
      {modal === "satellite" &&
        (satMode ? (
          <SatelliteModal
            open
            single
            selected={satId ? [satId] : []}
            available={SATELLITES.filter((s) => s.active).map((s) => s.id)}
            onClose={() => setModal(null)}
            onSelect={([id]) => {
              if (id !== satId) {
                const list = transmittersOf(satelliteById(id));
                setSatId(id);
                setTxId(list.length === 1 ? list[0].uuid : null);
                setStatus("idle");
                setSelected(new Set());
              }
              setModal(null);
            }}
          />
        ) : (
          <SatelliteModal
            open
            selected={satellites}
            available={available}
            onClose={() => setModal(null)}
            onSelect={(ids) => {
              setSatellites(ids);
              setModal(null);
            }}
          />
        ))}
      {modal === "stations" && (
        <StationModal
          open
          multiple
          selected={null}
          selectedIds={stationIds}
          available={availStations}
          onClose={() => setModal(null)}
          onSelect={() => undefined}
          onSelectMany={(ids) => {
            setStationIds(ids);
            setModal(null);
          }}
        />
      )}
      <Modal
        open={!!confirm}
        onClose={() => setConfirm(null)}
        title="Отменить наблюдение?"
        closeLabel="Закрыть"
        size="compact"
        className="confirm-modal"
        footer={
          <div className="picker-footer">
            <Button type="button" text="Нет, оставить" buttonType={ButtonType.GRAY} onClick={() => setConfirm(null)} />
            <Button type="button" text="Да, отменить" onClick={() => confirm && cancelPass(confirm)} />
          </div>
        }
      >
        {confirmIntersection && (
          <div className="confirm-body">
            <div className="confirm-card">
              <ErrorIcon width={16} height={16} fill="currentColor" aria-hidden="true" />
              <span>
                <strong>{satelliteById(confirmIntersection.satelliteId).name}</strong>
                {confirm && confirm.includes(":") ? ` на станции ${stationById(Number(confirm.split(":")[0])).name}` : ""},{" "}
                {formatTime(confirmPass ? confirmPass.start : confirmIntersection.from)} – {formatTime(confirmPass ? confirmPass.end : confirmIntersection.to)}
                <small>Пересечение {formatDuration(confirmIntersection.from, confirmIntersection.to)}</small>
              </span>
            </div>
            <p>Наблюдение уберётся из расчёта, остальные наблюдения пересчитаются.</p>
          </div>
        )}
      </Modal>
    </div>
  );
}
