import { Button, ButtonSize, ButtonType } from "@sonik-space/ui/buttons";
import { ErrorIcon, InfoIcon } from "@sonik-space/icons";
import {
  dayKey,
  formatDate,
  formatDateTime,
  formatDuration,
  formatLength,
  formatTime,
  satelliteById,
  type Pass,
} from "./data";

/** Полярная диаграмма пролёта: центр — зенит, край — горизонт. */
export function PolarPlot({ pass }: { pass: Pass }) {
  const R = 40;
  const sweep = ((pass.los - pass.aos + 360) % 360) || 360;
  const points = Array.from({ length: 25 }, (_, i) => {
    const k = i / 24;
    const az = ((pass.aos + sweep * k) * Math.PI) / 180;
    const el = pass.maxElevation * Math.sin(Math.PI * k);
    const r = ((90 - el) / 90) * R;
    return [50 + r * Math.sin(az), 50 - r * Math.cos(az)];
  });
  const [sx, sy] = points[0];
  const [ex, ey] = points[points.length - 1];
  return (
    <svg
      className="polar-plot"
      viewBox="0 0 100 100"
      role="img"
      aria-label={`Траектория: азимут от ${pass.aos}° до ${pass.los}°, максимальная высота ${pass.maxElevation}°`}
    >
      <g className="polar-grid">
        <circle cx="50" cy="50" r={R} />
        <circle cx="50" cy="50" r={(R * 2) / 3} />
        <circle cx="50" cy="50" r={R / 3} />
        <line x1="50" y1={50 - R - 4} x2="50" y2={50 + R + 4} />
        <line x1={50 - R - 4} y1="50" x2={50 + R + 4} y2="50" />
      </g>
      <g className="polar-labels" aria-hidden="true">
        <text x="50" y="5">С</text>
        <text x="50" y="99">Ю</text>
        <text x="97" y="52">В</text>
        <text x="3" y="52">З</text>
      </g>
      <polyline className="polar-path" points={points.map((p) => p.join(",")).join(" ")} />
      <circle className="polar-aos" cx={sx} cy={sy} r="3" />
      <circle className="polar-los" cx={ex} cy={ey} r="3" />
    </svg>
  );
}

type Props = {
  pass: Pass;
  added: boolean;
  onToggle: () => void;
  onCancelIntersection?: (passId: string) => void;
  showSatellite?: boolean;
};

export function PassCard({ pass, added, onToggle, onCancelIntersection, showSatellite }: Props) {
  const satellite = satelliteById(pass.satelliteId);
  const truncated = pass.intersections.length > 0;
  const span = +pass.end - +pass.start;
  const at = (d: Date) => `${((+d - +pass.start) / span) * 100}%`;
  return (
    <article className={`pass-card ${truncated ? "truncated" : ""} ${added ? "added" : ""}`}>
      {truncated && (
        <p className="pass-warning">
          <InfoIcon width={20} height={20} fill="currentColor" aria-hidden="true" />
          Наблюдение будет усечено из-за пересечений
        </p>
      )}
      <div className="pass-body">
        <div className="pass-main">
          <PolarPlot pass={pass} />
          <dl className="pass-angles">
            <div>
              <dt className="aos">AOS <span aria-hidden="true">⤉</span></dt>
              <dd>{pass.aos}°</dd>
            </div>
            <div>
              <dt>TCA <span aria-hidden="true">⇴</span></dt>
              <dd>{pass.tca}°</dd>
            </div>
            <div>
              <dt className="los">LOS <span aria-hidden="true">⤈</span></dt>
              <dd>{pass.los}°</dd>
            </div>
          </dl>
          <dl className="pass-times">
            {showSatellite && (
              <div>
                <dt>Спутник</dt>
                <dd>{satellite.name}</dd>
              </div>
            )}
            <div>
              <dt>Восход</dt>
              <dd>{formatTime(pass.start)}</dd>
            </div>
            <div>
              <dt>Заход</dt>
              <dd>
                {formatTime(pass.end)}
                {dayKey(pass.end) !== dayKey(pass.start) && <small className="pass-next-day"> {formatDate(pass.end)}</small>}
              </dd>
            </div>
            <div>
              <dt>Длительность</dt>
              <dd>{formatDuration(pass.start, pass.end)}</dd>
            </div>
          </dl>
          <Button
            type="button"
            className="pass-action"
            buttonSize={ButtonSize.SMALL}
            text={added ? "Убрать" : "Добавить"}
            buttonType={added ? ButtonType.GRAY : ButtonType.PRIMARY}
            aria-pressed={added}
            aria-label={`${added ? "Убрать из плана" : "Добавить в план"}: ${satellite.name}, ${formatTime(pass.start)}`}
            onClick={onToggle}
          />
        </div>
        {pass.intersections.map((i) => {
          const other = satelliteById(i.satelliteId);
          return (
            <div className="pass-intersection" key={i.passId}>
              <div className="intersection-head">
                <span className="intersection-title">
                  <ErrorIcon width={20} height={20} fill="currentColor" aria-hidden="true" />
                  Пересечение с {other.name}
                </span>
                <span className="intersection-range">
                  <span>{formatDateTime(i.from)}</span>
                  <span aria-hidden="true">-</span>
                  <span>{formatDateTime(i.to)}</span>
                </span>
                <span className="intersection-length">{formatLength(i.from, i.to)}</span>
                {onCancelIntersection && (
                  <Button
                    type="button"
                    className="intersection-cancel"
                    buttonSize={ButtonSize.SMALL}
                    text="Отменить"
                    buttonType={ButtonType.GRAY}
                    aria-label={`Отменить наблюдение ${other.name} ${formatTime(i.from)} – ${formatTime(i.to)}`}
                    onClick={() => onCancelIntersection(i.passId)}
                  />
                )}
              </div>
              <div className="intersection-track" aria-hidden="true">
                <span style={{ left: at(i.from), right: `calc(100% - ${at(i.to)})` }} />
              </div>
              <div className="intersection-scale" aria-hidden="true">
                <span style={{ left: at(i.from) }}>{formatTime(i.from)}</span>
                <span style={{ left: at(i.to) }}>{formatTime(i.to)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );
}
