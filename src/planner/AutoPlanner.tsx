import { useState, type ReactNode } from "react";
import { Button, ButtonSize, ButtonType, TextButton, TextButtonType } from "@sonik-space/ui/buttons";
import { Input } from "@sonik-space/ui/inputs";
import { Selector } from "@sonik-space/ui/selectors";
import { Icon } from "@sonik-space/ui/icon";
import { IconName } from "@sonik-space/icons";
import { DataEmptyState } from "@sonik-space/ui/states";
import {
  AUTO_MAX_PRIORITY,
  AUTO_MAX_SATELLITES,
  SATELLITES,
  plural,
  satelliteById,
  satelliteUuid,
  stationHorizon,
  transmittersOf,
  type AutoSchedule,
  type Station,
} from "./data";
import { SatelliteModal } from "./Pickers";

type Row = { satelliteId: string; transmitterUuid: string; priority: string };

/** Сектор азимутов на компасе: от начального по часовой до конечного. Равные значения — весь круг. */
function AzimuthSector({ from, to }: { from: number; to: number }) {
  const R = 40;
  const full = ((to - from) % 360 + 360) % 360 === 0;
  const pt = (deg: number) => {
    const a = (deg * Math.PI) / 180;
    return [50 + R * Math.sin(a), 50 - R * Math.cos(a)];
  };
  const sweep = full ? 360 : ((to - from) % 360 + 360) % 360;
  const [x1, y1] = pt(from);
  const [x2, y2] = pt(to);
  return (
    <svg
      className="azimuth-sector"
      viewBox="0 0 100 100"
      role="img"
      aria-label={full ? "Наблюдения во всех направлениях" : `Сектор наблюдения: от ${from}° до ${to}° по часовой стрелке`}
    >
      <circle className="azimuth-ring" cx="50" cy="50" r={R} />
      {full ? (
        <circle className="azimuth-fill" cx="50" cy="50" r={R} />
      ) : (
        <path className="azimuth-fill" d={`M50 50 L${x1} ${y1} A${R} ${R} 0 ${sweep > 180 ? 1 : 0} 1 ${x2} ${y2} Z`} />
      )}
      <g className="azimuth-labels" aria-hidden="true">
        <text x="50" y="7">С</text>
        <text x="50" y="99">Ю</text>
        <text x="96" y="53">В</text>
        <text x="4" y="53">З</text>
      </g>
    </svg>
  );
}

/** Поле с подсказкой под ним: подпись кита встаёт внутрь поля и обрезается. */
function Field({ hint, error, children }: { hint: string; error?: boolean; children: ReactNode }) {
  return (
    <div className={`auto-field ${error ? "has-error" : ""}`}>
      {children}
      {hint && <small>{hint}</small>}
    </div>
  );
}

const num = (v: string) => (v.trim() === "" ? NaN : Number(v));
const inRange = (v: string, min: number, max: number) => Number.isInteger(num(v)) && num(v) >= min && num(v) <= max;

export function AutoPlanner({
  station,
  ready,
  onSubmit,
}: {
  station: Station | null;
  /** Станция и антенна выбраны. */
  ready: boolean;
  onSubmit: (schedule: AutoSchedule) => void;
}) {
  const [horizon, setHorizon] = useState("");
  const [startAz, setStartAz] = useState("0");
  const [endAz, setEndAz] = useState("360");
  const [duration, setDuration] = useState("240");
  const [gap, setGap] = useState("60");
  const [rows, setRows] = useState<Row[]>([]);
  const [picker, setPicker] = useState(false);

  const defaultHorizon = station ? stationHorizon(station) : null;
  const errors = {
    horizon: horizon.trim() !== "" && !inRange(horizon, 0, 90),
    startAz: !inRange(startAz, 0, 360),
    endAz: !inRange(endAz, 0, 360),
    duration: !inRange(duration, 1, 3600),
    gap: !inRange(gap, 0, 3600),
  };
  const priorityError = (r: Row) => !inRange(r.priority, 1, AUTO_MAX_PRIORITY);
  const valid = ready && rows.length > 0 && !Object.values(errors).some(Boolean) && !rows.some(priorityError);

  function pick(ids: string[]) {
    setRows((current) => {
      const kept = current.filter((r) => ids.includes(r.satelliteId));
      let next = Math.max(0, ...kept.map((r) => num(r.priority)).filter(Number.isFinite));
      for (const id of ids) {
        if (kept.some((r) => r.satelliteId === id)) continue;
        next = Math.min(AUTO_MAX_PRIORITY, next + 1);
        kept.push({ satelliteId: id, transmitterUuid: transmittersOf(satelliteById(id))[0]?.uuid ?? "", priority: String(next) });
      }
      return kept;
    });
    setPicker(false);
  }
  const update = (id: string, patch: Partial<Row>) =>
    setRows((current) => current.map((r) => (r.satelliteId === id ? { ...r, ...patch } : r)));

  function submit() {
    if (!valid || defaultHorizon === null) return;
    onSubmit({
      minHorizon: horizon.trim() === "" ? defaultHorizon : num(horizon),
      startAzimuth: num(startAz),
      endAzimuth: num(endAz),
      durationSeconds: num(duration),
      observationGapSeconds: num(gap),
      satellites: rows.map((r) => ({
        satelliteUuid: satelliteUuid(r.satelliteId),
        transmitterUuid: r.transmitterUuid,
        priority: num(r.priority),
      })),
    });
  }

  const shared = rows.length
    ? new Set(rows.map((r) => r.priority).filter((p, i, all) => all.indexOf(p) !== i))
    : new Set<string>();

  return (
    <>
      <section
        className={`planner-card auto-params ${ready ? "" : "is-disabled"}`}
        aria-labelledby="auto-params-title"
        aria-disabled={!ready}
        inert={!ready}
      >
        <h2 id="auto-params-title">
          <Icon iconName={IconName.Settings} width={24} height={24} aria-hidden="true" /> Параметры автонаблюдений
        </h2>
        <div className="auto-params-body">
          <div className="auto-params-grid">
            <Field error={errors.horizon} hint={errors.horizon ? "От 0 до 90°" : `Пусто — горизонт станции${defaultHorizon !== null ? `, ${defaultHorizon}°` : ""}`}>
            <Input
              text="Минимальный горизонт"
              showTitle
              inputMode="numeric"
              value={horizon}
              placeholder={defaultHorizon !== null ? String(defaultHorizon) : "—"}
              rightIcon={<span className="input-unit">°</span>}
              showRightIcon
              error={errors.horizon}
              onChange={(e) => setHorizon(e.target.value)}
            />
            </Field>
            <Field error={errors.startAz} hint={errors.startAz ? "От 0 до 360°" : "0° — север"}>
            <Input
              text="Начальный азимут"
              showTitle
              inputMode="numeric"
              value={startAz}
              rightIcon={<span className="input-unit">°</span>}
              showRightIcon
              error={errors.startAz}
              onChange={(e) => setStartAz(e.target.value)}
            />
            </Field>
            <Field error={errors.endAz} hint={errors.endAz ? "От 0 до 360°" : "По часовой от начального"}>
            <Input
              text="Конечный азимут"
              showTitle
              inputMode="numeric"
              value={endAz}
              rightIcon={<span className="input-unit">°</span>}
              showRightIcon
              error={errors.endAz}
              onChange={(e) => setEndAz(e.target.value)}
            />
            </Field>
            <Field error={errors.duration} hint={errors.duration ? "От 1 до 3600 сек" : "Одного наблюдения"}>
            <Input
              text="Макс. длительность"
              showTitle
              inputMode="numeric"
              value={duration}
              rightIcon={<span className="input-unit">Сек</span>}
              showRightIcon
              error={errors.duration}
              onChange={(e) => setDuration(e.target.value)}
            />
            </Field>
            <Field error={errors.gap} hint={errors.gap ? "От 0 до 3600 сек" : "Между наблюдениями"}>
            <Input
              text="Мин. интервал"
              showTitle
              inputMode="numeric"
              value={gap}
              rightIcon={<span className="input-unit">Сек</span>}
              showRightIcon
              error={errors.gap}
              onChange={(e) => setGap(e.target.value)}
            />
            </Field>
          </div>
          <AzimuthSector
            from={errors.startAz ? 0 : num(startAz)}
            to={errors.endAz ? 360 : num(endAz)}
          />
        </div>
      </section>

      <section
        className={`planner-card auto-sats ${ready ? "" : "is-disabled"}`}
        aria-labelledby="auto-sats-title"
        aria-disabled={!ready}
        inert={!ready}
      >
        <div className="planner-card-head">
          <h2 id="auto-sats-title">
            <Icon iconName={IconName.Satellite} width={24} height={24} aria-hidden="true" /> Спутники
          </h2>
          <span className="planner-muted">
            {rows.length} из {AUTO_MAX_SATELLITES}
          </span>
        </div>
        {rows.length === 0 ? (
          <DataEmptyState
            iconName={IconName.Satellite}
            title="Спутники не выбраны"
            description={`Выберите до ${AUTO_MAX_SATELLITES} спутников и задайте каждому приоритет`}
            actionSlot={<Button type="button" buttonSize={ButtonSize.SMALL} text="Выбрать спутники" onClick={() => setPicker(true)} />}
          />
        ) : (
          <>
            <p className="auto-hint">
              1 — самый высокий приоритет. При пересечении пролётов станция примет спутник с меньшим числом. Одинаковый
              приоритет можно задать нескольким спутникам.
            </p>
            <div className="auto-table" role="table" aria-label="Спутники и приоритеты">
              <div className="auto-row auto-row-head" role="row">
                <span role="columnheader">Спутник</span>
                <span role="columnheader">Передатчик</span>
                <span role="columnheader">Приоритет</span>
                <span role="columnheader" className="visually-hidden">Действия</span>
              </div>
              {rows.map((r) => {
                const sat = satelliteById(r.satelliteId);
                const bad = priorityError(r);
                return (
                  <div className="auto-row" role="row" key={r.satelliteId}>
                    <span role="cell" className="auto-sat">
                      <span className="sat-icon" aria-hidden="true">
                        <Icon iconName={IconName.Satellite} width={20} height={20} />
                      </span>
                      <span>
                        <strong>{sat.name}</strong>
                        <small>NORAD {sat.norad}</small>
                      </span>
                    </span>
                    <span role="cell" className="auto-tx">
                      <Selector
                        value={r.transmitterUuid}
                        onChange={(v) => v && update(r.satelliteId, { transmitterUuid: v })}
                        options={transmittersOf(sat).map((t) => ({ value: t.uuid, label: `${t.name} · ${t.frequency}` }))}
                      />
                    </span>
                    <span role="cell" className="auto-priority">
                      <Field hint={bad ? `От 1 до ${AUTO_MAX_PRIORITY}` : shared.has(r.priority) ? "Общий приоритет" : ""} error={bad}>
                      <Input
                        aria-label={`Приоритет ${sat.name}`}
                        inputMode="numeric"
                        value={r.priority}
                        error={bad}
                        onChange={(e) => update(r.satelliteId, { priority: e.target.value })}
                      />
                      </Field>
                    </span>
                    <span role="cell" className="auto-remove">
                      <TextButton
                        type="button"
                        text="Убрать"
                        buttonType={TextButtonType.SECONDARY}
                        aria-label={`Убрать ${sat.name}`}
                        onClick={() => setRows((c) => c.filter((x) => x.satelliteId !== r.satelliteId))}
                      />
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="auto-sats-actions">
              <Button
                type="button"
                buttonSize={ButtonSize.SMALL}
                buttonType={ButtonType.GRAY}
                text="Изменить список спутников"
                onClick={() => setPicker(true)}
              />
            </div>
          </>
        )}
      </section>

      <div className="planner-calc">
        <Button type="button" buttonSize={ButtonSize.SMALL} text="Создать расписание" disabled={!valid} onClick={submit} />
        {!valid && ready && (
          <span className="planner-muted">
            {rows.length ? "Исправьте отмеченные поля" : "Добавьте хотя бы один спутник"}
          </span>
        )}
      </div>

      {picker && (
        <SatelliteModal
          open
          selected={rows.map((r) => r.satelliteId)}
          available={SATELLITES.filter((s) => s.active).map((s) => s.id)}
          max={AUTO_MAX_SATELLITES}
          onClose={() => setPicker(false)}
          onSelect={pick}
        />
      )}
    </>
  );
}

export const satellitesCount = (n: number) => plural(n, "спутник", "спутника", "спутников");
