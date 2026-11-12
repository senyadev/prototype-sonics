import { publicPath } from "./paths";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { Header } from "@sonik-space/ui/shell";
import { Button, ButtonType, TextButton, TextButtonType, ThemeToggle } from "@sonik-space/ui/buttons";
import { Input } from "@sonik-space/ui/inputs";
import { Selector } from "@sonik-space/ui/selectors";
import { Toggle, ToggleBtnGroup } from "@sonik-space/ui/checkbox";
import { CategoryTab } from "@sonik-space/ui/tabs";
import { Modal } from "@sonik-space/ui/modal";
import { Loader } from "@sonik-space/ui/loader";
import { DataEmptyState } from "@sonik-space/ui/states";
import { Icon } from "@sonik-space/ui/icon";
import { BadgeColor, BadgeColorsBase } from "@sonik-space/ui/badge";
import { ErrorIcon, IconName, LogotypeDarkIcon, LogotypeIcon } from "@sonik-space/icons";
import {
  DEFAULT_FILTERS,
  PERIODS,
  calculatePasses,
  dayKey,
  formatDateTime,
  formatDay,
  formatDayShort,
  formatDuration,
  formatTime,
  plural,
  satelliteById,
  type Filters,
  type Pass,
  type Period,
  type Station,
} from "./planner/data";
import { PassCard } from "./planner/PassCard";
import { RangeField, SatelliteModal, StationModal, SuccessBar } from "./planner/Pickers";
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
const toLocalInput = (d: Date) => {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
};
const observations = (n: number) => plural(n, "наблюдение", "наблюдения", "наблюдений");

export default function Planner() {
  const [theme, setTheme] = useState<"light" | "dark">(() =>
    document.documentElement.classList.contains("dark") ? "dark" : "light",
  );
  const [station, setStation] = useState<Station | null>(null);
  const [antennaId, setAntennaId] = useState<string | null>(null);
  const [period, setPeriod] = useState<Period>(3);
  const [start, setStart] = useState(nextHour);
  const [satellites, setSatellites] = useState<string[]>([]);
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [auto, setAuto] = useState(false);
  const [modal, setModal] = useState<"station" | "satellite" | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [statusText, setStatusText] = useState("");
  const [passes, setPasses] = useState<Pass[]>([]);
  const [cancelled, setCancelled] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [grouped, setGrouped] = useState<"satellite" | "list">("satellite");
  const [view, setView] = useState<View>("planner");
  const [confirm, setConfirm] = useState<string | null>(null);
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
  const end = new Date(+start + period * 3600_000);
  const ready = !!station && !!antenna && satellites.length > 0;

  function run(cancelledIds: Set<string>, text: string, keepSelection: boolean) {
    if (!station || !antenna) return;
    setStatus("loading");
    setStatusText(text);
    window.setTimeout(() => {
      const next = calculatePasses(station, antenna, satellites, start, period, filters, cancelledIds);
      setPasses(next);
      setSelected((current) => {
        const ids = new Set(next.map((p) => p.id));
        const kept = keepSelection ? new Set([...current].filter((id) => ids.has(id))) : new Set<string>();
        if (auto) next.filter((p) => !p.intersections.length).forEach((p) => kept.add(p.id));
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
  const confirmIntersection = confirmPass
    ? passes.flatMap((p) => p.intersections).find((i) => i.passId === confirm)
    : undefined;

  if (view === "success" && station)
    return (
      <div className="planner-page">
        {header}
        <main className="planner-success">
          <Confetti />
          <div className="planner-success-image">
            <img src={publicPath("/img/stantion.png")} alt="" width={304} height={247} />
          </div>
          <div className="station-chip">
            <Icon iconName={IconName.Radio} width={20} height={20} aria-hidden="true" />
            <span>
              <small>Станция</small>
              {station.name} [{station.callsign}]
            </span>
          </div>
          <h1 ref={headingRef} tabIndex={-1}>
            Наблюдения запланированы
          </h1>
          <p>
            В плане {observations(selected.size)}. Они появятся в вашем личном кабинете
          </p>
          <div className="planner-success-actions">
            <Button
              type="button"
              text="В планировщик"
              buttonType={ButtonType.GRAY}
              onClick={() => {
                setSelected(new Set());
                setView("planner");
              }}
            />
            <Button type="button" text="В личный кабинет" onClick={() => (window.location.href = publicPath("/"))} />
          </div>
        </main>
      </div>
    );

  const visiblePasses = view === "plan" ? passes.filter((p) => selected.has(p.id)) : passes;
  const firstDay = visiblePasses[0] ? dayKey(visiblePasses[0].start) : dayKey(start);

  /** Карточки с разделителем дня, когда наблюдения переходят на следующие сутки. */
  function passList(list: Pass[], showSatellite: boolean) {
    let prevDay = firstDay;
    return list.map((p) => {
      const d = dayKey(p.start);
      const divider = d !== prevDay;
      prevDay = d;
      return (
        <Fragment key={p.id}>
          {divider && (
            <div className="day-divider">
              <span>{formatDayShort(p.start)}</span>
            </div>
          )}
          <PassCard
            pass={p}
            added={selected.has(p.id)}
            onToggle={() => toggle(p.id)}
            onCancelIntersection={view === "planner" ? setConfirm : undefined}
            showSatellite={showSatellite}
          />
        </Fragment>
      );
    });
  }

  const results = station && (
    <>
      <div className="results-head">
        <div className="results-station">
          <span className="results-station-icon" aria-hidden="true">
            <Icon iconName={IconName.Radio} width={22} height={22} />
          </span>
          <div>
            <small>Станция</small>
            <strong>
              {station.name} [{station.callsign}]
            </strong>
          </div>
          <BadgeColorsBase color={station.online ? BadgeColor.GREEN : BadgeColor.GRAY} text={station.online ? "В сети" : "Не в сети"} />
        </div>
        {view === "planner" && (
          <ToggleBtnGroup
            className="results-grouping"
            value={grouped}
            onChange={setGrouped}
            options={[
              { value: "satellite", text: "По спутникам" },
              { value: "list", text: "Списком" },
            ]}
          />
        )}
      </div>
      <p className="results-summary">
        <strong>{formatDay(visiblePasses[0]?.start ?? start)}</strong>
        <span>{observations(visiblePasses.length)}</span>
      </p>
      {grouped === "satellite" || view === "plan"
        ? satellites
            .map((id) => ({ sat: satelliteById(id), list: visiblePasses.filter((p) => p.satelliteId === id) }))
            .filter((g) => g.list.length)
            .map(({ sat, list }) => (
              <section className="sat-group" key={sat.id} aria-label={`Спутник ${sat.name}`}>
                <header>
                  <span className="sat-icon" aria-hidden="true">
                    <Icon iconName={IconName.Satellite} width={18} height={18} />
                  </span>
                  <div>
                    <span>
                      Спутник <strong>{sat.name}</strong>
                    </span>
                    <SuccessBar value={sat.success} />
                  </div>
                  <span className="sat-count">{observations(list.length)}</span>
                </header>
                {passList(list, false)}
              </section>
            ))
        : (
          <section className="sat-group">{passList(visiblePasses, true)}</section>
        )}
    </>
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
              <div className="planner-tabs" role="group" aria-label="Режим планирования">
                <CategoryTab text="Для спутника" showIcon iconName={IconName.Satellite} disabled title="Скоро" />
                <CategoryTab text="Для станции" showIcon iconName={IconName.Radio} isActive aria-pressed="true" />
              </div>
              <label className="planner-auto" title="Сразу добавлять в план наблюдения без пересечений">
                <Toggle checked={auto} onChange={(e) => setAuto(e.currentTarget.checked)} />
                Авто
              </label>
            </div>

            <div className="planner-cards">
              <section className="planner-card" aria-labelledby="station-title">
                <h2 id="station-title">
                  <Icon iconName={IconName.Radio} width={20} height={20} aria-hidden="true" /> Станция
                </h2>
                <button type="button" className="picker-trigger" onClick={() => setModal("station")} aria-haspopup="dialog">
                  {station ? `${station.name} [${station.callsign}]` : <span>Выберите станцию</span>}
                </button>
                <h2 id="antenna-title">
                  <Icon iconName={IconName.Sound} width={20} height={20} aria-hidden="true" /> Антенна
                </h2>
                <div className={`planner-select ${station ? "" : "is-disabled"}`} aria-disabled={!station} role="group" aria-labelledby="antenna-title">
                  <Selector
                    key={station?.id ?? "none"}
                    value={antennaId}
                    onChange={setAntennaId}
                    placeholder={station ? "Выберите антенну" : "Сначала выберите станцию"}
                    options={(station?.antennas ?? []).map((a) => ({ value: a.id, label: `${a.type} (${a.band})` }))}
                  />
                </div>
              </section>

              <section className="planner-card" aria-labelledby="period-title">
                <div className="planner-card-head">
                  <h2 id="period-title">
                    <Icon iconName={IconName.Calendar} width={20} height={20} aria-hidden="true" /> Период планирования
                  </h2>
                  <ToggleBtnGroup
                    value={String(period)}
                    onChange={(v) => setPeriod(Number(v) as Period)}
                    options={PERIODS.map((p) => ({ value: String(p), text: `${p} ч` }))}
                  />
                </div>
                <div className="planner-period">
                  <Input
                    text="Начало"
                    showTitle
                    type="datetime-local"
                    value={toLocalInput(start)}
                    onChange={(e) => {
                      const d = new Date(e.target.value);
                      if (!Number.isNaN(+d)) setStart(d);
                    }}
                  />
                  <Input text="Конец" showTitle readOnly value={formatDateTime(end)} aria-readonly="true" />
                </div>
              </section>

              <section className="planner-card" aria-labelledby="sat-title">
                <h2 id="sat-title">
                  <Icon iconName={IconName.Satellite} width={20} height={20} aria-hidden="true" /> Спутник
                </h2>
                <button type="button" className="picker-trigger" onClick={() => setModal("satellite")} aria-haspopup="dialog">
                  {satellites.length ? satellites.map((id) => satelliteById(id).name).join(", ") : <span>Выберите спутники</span>}
                </button>
              </section>
            </div>

            <section className="planner-card planner-filters" aria-labelledby="filters-title">
              <h2 id="filters-title">Фильтры</h2>
              <div className="planner-filter-grid">
                <RangeField label="Элевация, °" domain={[0, 90]} values={filters.elevation} onChange={(v) => setFilters({ ...filters, elevation: v })} />
                <RangeField label="Наложение, %" domain={[0, 100]} values={filters.overlap} onChange={(v) => setFilters({ ...filters, overlap: v })} />
                <Input
                  text="Мин. длительность"
                  showTitle
                  inputMode="numeric"
                  value={String(filters.minDuration)}
                  rightIcon={<span className="input-unit">сек</span>}
                  showRightIcon
                  onChange={(e) => Number.isFinite(+e.target.value) && setFilters({ ...filters, minDuration: +e.target.value })}
                />
                <Input
                  text="Макс. длительность"
                  showTitle
                  inputMode="numeric"
                  value={String(filters.maxDuration)}
                  rightIcon={<span className="input-unit">сек</span>}
                  showRightIcon
                  onChange={(e) => Number.isFinite(+e.target.value) && setFilters({ ...filters, maxDuration: +e.target.value })}
                />
              </div>
            </section>

            <div className="planner-calc">
              <Button
                type="button"
                text={status === "ready" ? "Пересчитать наблюдения" : "Рассчитать наблюдения"}
                disabled={!ready || status === "loading"}
                onClick={calculate}
              />
              {!ready && <p className="planner-muted">Выберите станцию, антенну и хотя бы один спутник</p>}
            </div>

            <div className="planner-results" ref={resultsRef} tabIndex={-1} aria-live="polite" aria-busy={status === "loading"}>
              {status === "idle" && (
                <DataEmptyState
                  iconName={IconName.Edit}
                  title="Настройте наблюдения"
                  description="Возможные наблюдения появятся здесь списком"
                />
              )}
              {status === "loading" && (
                <div className="planner-loading" role="status">
                  <Loader />
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
                    description="Увеличьте период планирования или ослабьте фильтры"
                  />
                ))}
            </div>
          </>
        )}
      </main>

      {selected.size > 0 && view !== "success" && (
        <div className="planner-island" role="region" aria-label="Выбранные наблюдения">
          <span className="planner-island-count">Выбрано: {selected.size}</span>
          <Button type="button" text="Запланировать" onClick={() => setView("success")} />
          {view === "planner" && (
            <Button type="button" text="Посмотреть план" buttonType={ButtonType.GRAY} onClick={() => setView("plan")} />
          )}
          <Button type="button" text="Сбросить" buttonType={ButtonType.GRAY} onClick={() => setSelected(new Set())} />
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
      {modal === "satellite" && (
        <SatelliteModal
          open
          selected={satellites}
          onClose={() => setModal(null)}
          onSelect={(ids) => {
            setSatellites(ids);
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
        {confirmPass && confirmIntersection && (
          <div className="confirm-body">
            <div className="confirm-card">
              <ErrorIcon width={16} height={16} fill="currentColor" aria-hidden="true" />
              <span>
                <strong>{satelliteById(confirmPass.satelliteId).name}</strong>, {formatTime(confirmPass.start)} – {formatTime(confirmPass.end)}
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
