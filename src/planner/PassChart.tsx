import { ErrorIcon } from "@sonik-space/icons";
import { formatDuration, formatLength, formatTime, satelliteById, type Pass } from "./data";
import { PolarPlot } from "./PassCard";

type Props = {
  passes: Pass[];
  /** Строки диаграммы: спутники (режим станции) или станции (режим спутника). */
  rows: { id: string; label: string }[];
  rowOf: (p: Pass) => string;
  start: Date;
  end: Date;
  selected: Set<string>;
  onToggle: (id: string) => void;
  /** Клик по наблюдению с пересечением — отменить пересекающее наблюдение (через подтверждение). */
  onCancelIntersection?: (passId: string) => void;
};

/** Всплывашка над полосой при наведении/фокусе (макет 8985:84004). */
function PassPopup({ pass, added, id, cancellable }: { pass: Pass; added: boolean; id: string; cancellable: boolean }) {
  if (pass.intersections.length && cancellable)
    return (
      <div className="pass-chart-pop pass-chart-pop-intersection" role="tooltip" id={id}>
        {pass.intersections.map((i) => (
          <div className="pass-chart-pop-cross" key={i.passId}>
            <ErrorIcon width={20} height={20} fill="currentColor" aria-hidden="true" />
            <span>Пересечение с {satelliteById(i.satelliteId).name}</span>
            <span className="pass-chart-pop-chip">{formatLength(i.from, i.to)}</span>
          </div>
        ))}
        <p className="pass-chart-pop-hint">Нажмите чтобы отменить</p>
      </div>
    );
  return (
    <div className="pass-chart-pop" role="tooltip" id={id}>
      <div className="pass-chart-pop-body">
        <PolarPlot pass={pass} />
        <div className="pass-chart-pop-info">
          <span className="pass-chart-pop-duration">{formatDuration(pass.start, pass.end)}</span>
          <span className="pass-chart-pop-angles">
            <span><b className="aos" aria-label="AOS">⤉</b>{pass.aos}°</span>
            <span><b className="tca" aria-label="TCA">⇴</b>{pass.tca}°</span>
            <span><b className="los" aria-label="LOS">⤈</b>{pass.los}°</span>
          </span>
        </div>
      </div>
      <p className="pass-chart-pop-hint">{added ? "Нажмите чтобы убрать из плана" : "Нажмите чтобы запланировать"}</p>
    </div>
  );
}

/** Вид графиком: по строке на спутник, пролёты — полосы на шкале периода. */
export function PassChart({ passes, rows, rowOf, start, end, selected, onToggle, onCancelIntersection }: Props) {
  const span = +end - +start;
  const pos = (d: Date) => Math.min(100, Math.max(0, ((+d - +start) / span) * 100));
  const hours = Math.round(span / 3600_000);
  const step = hours <= 6 ? 1 : hours <= 12 ? 2 : 4;
  const ticks = Array.from({ length: Math.floor(hours / step) + 1 }, (_, i) => new Date(+start + i * step * 3600_000));
  return (
    <div className="pass-chart">
      <div className="pass-chart-axis" aria-hidden="true">
        {ticks.map((t) => (
          <span key={+t} style={{ left: `${pos(t)}%` }}>
            {formatTime(t)}
          </span>
        ))}
      </div>
      {rows.map(({ id, label }) => {
        const list = passes.filter((p) => rowOf(p) === id);
        return (
          <div className="pass-chart-row" key={id}>
            <span className="pass-chart-label" title={label}>{label}</span>
            <div className="pass-chart-lane">
              {ticks.map((t) => (
                <i key={+t} className="pass-chart-grid" style={{ left: `${pos(t)}%` }} aria-hidden="true" />
              ))}
              {list.map((p) => {
                const added = selected.has(p.id);
                const crossing = p.intersections.length > 0 && !!onCancelIntersection;
                const left = pos(p.start);
                // У краёв шкалы всплывашка прижимается к краю, чтобы не вылезать за карточку.
                const edge = left < 12 ? "is-start" : left > 82 ? "is-end" : "";
                const popId = `pop-${p.id}`;
                return (
                  <div
                    key={p.id}
                    className={`pass-chart-item ${edge}`}
                    style={{ left: `${left}%`, width: `${Math.max(pos(p.end) - left, 0.6)}%` }}
                  >
                    <button
                      type="button"
                      className={`pass-chart-bar ${p.intersections.length ? "truncated" : ""} ${added ? "added" : ""}`}
                      aria-pressed={crossing ? undefined : added}
                      aria-describedby={popId}
                      aria-label={
                        crossing
                          ? `${label}, ${formatTime(p.start)} – ${formatTime(p.end)}, есть пересечения. Отменить пересекающее наблюдение`
                          : `${label}, ${formatTime(p.start)} – ${formatTime(p.end)}. ${added ? "Убрать из плана" : "Добавить в план"}`
                      }
                      onClick={() => (crossing ? onCancelIntersection!(p.intersections[0].passId) : onToggle(p.id))}
                    />
                    <PassPopup pass={p} added={added} id={popId} cancellable={crossing} />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      <ul className="pass-chart-legend" aria-label="Обозначения">
        <li><i className="pass-chart-bar" /> Доступно</li>
        <li><i className="pass-chart-bar truncated" /> С пересечениями</li>
        <li><i className="pass-chart-bar added" /> В плане</li>
      </ul>
    </div>
  );
}
