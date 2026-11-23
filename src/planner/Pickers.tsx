import { useMemo, useState } from "react";
import { Modal } from "@sonik-space/ui/modal";
import { Button, ButtonType } from "@sonik-space/ui/buttons";
import { Search } from "@sonik-space/ui/search";
import { Selector } from "@sonik-space/ui/selectors";
import { MergeSlider } from "@sonik-space/ui/slider";
import { Checkbox, Radio } from "@sonik-space/ui/checkbox";
import { Input } from "@sonik-space/ui/inputs";
import { Avatar, AvatarSize, AvatarVariant } from "@sonik-space/ui/avatar";
import {
  BadgeColor,
  BadgeColorsBase,
  BaseBadge,
  BaseBadgeSize,
  BaseBadgeType,
  BadgeColorsTransmitter,
  BadgeColorsTransmitterType,
} from "@sonik-space/ui/badge";
import { STATIONS, SATELLITES, type Band, type Station } from "./data";
import { AntennaIcon } from "./AntennaIcon";
import { Icon } from "@sonik-space/ui/icon";
import { IconName } from "@sonik-space/icons";
import { publicPath } from "../paths";

/** Полоса качества станции, как line-chart в макете: хорошие, удачные, частичные, неудачные, без данных. */
export function QualityBar({ value }: { value: number }) {
  const rest = 100 - value;
  const parts = [
    ["blue", value * 0.5],
    ["green", value * 0.5],
    ["orange", rest * 0.4],
    ["red", rest * 0.35],
    ["gray", rest * 0.25],
  ] as const;
  return (
    <span className="quality-bar" role="img" aria-label={`Успешность ${value}%`}>
      {parts.map(([k, v]) => (
        <span key={k} className={k} style={{ flexGrow: Math.max(v, 6) }} />
      ))}
    </span>
  );
}

/** Полоса успешности: доля удачных наблюдений и остаток. */
export function SuccessBar({ value }: { value: number }) {
  return (
    <span className="success-bar" role="img" aria-label={`Успешность ${value}%`}>
      <span style={{ width: `${value}%` }} />
    </span>
  );
}

function RangeField({
  label,
  domain,
  values,
  onChange,
  unit,
  inline,
}: {
  label: string;
  domain: [number, number];
  values: [number, number];
  onChange: (v: [number, number]) => void;
  unit?: string;
  /** В строку: поле «от» — слайдер — поле «до», как в фильтрах планировщика. */
  inline?: boolean;
}) {
  // Пока тянут ползунок, значение живёт здесь: иначе каждый шаг перерисовывает всю страницу.
  const [draft, setDraft] = useState<[number, number] | null>(null);
  const shown = draft ?? values;
  const clamp = (n: number) => Math.min(domain[1], Math.max(domain[0], n));
  const slider = (
    <div className="range-slider">
      <MergeSlider
        domain={domain}
        step={1}
        mergeStep={0}
        values={shown}
        onChange={(v) => setDraft([v[0], v[1]])}
        onChangeComplete={(v) => {
          setDraft(null);
          if (v[0] !== values[0] || v[1] !== values[1]) onChange([v[0], v[1]]);
        }}
      />
    </div>
  );
  return (
    <fieldset className={`range-field ${inline ? "range-field-inline" : ""}`}>
      <legend>{label}</legend>
      {!inline && slider}
      <div className="range-inputs">
        <Input
          aria-label={`${label}: от`}
          inputMode="numeric"
          value={String(shown[0])}
          rightIcon={<span className="input-unit">{unit ?? "Мин"}</span>}
          showRightIcon={unit !== ""}
          onChange={(e) => {
            const n = Number(e.target.value);
            if (Number.isFinite(n)) onChange([clamp(Math.min(n, values[1])), values[1]]);
          }}
        />
        {inline && slider}
        <Input
          aria-label={`${label}: до`}
          inputMode="numeric"
          value={String(shown[1])}
          rightIcon={<span className="input-unit">{unit ?? "Макс"}</span>}
          showRightIcon={unit !== ""}
          onChange={(e) => {
            const n = Number(e.target.value);
            if (Number.isFinite(n)) onChange([values[0], clamp(Math.max(n, values[0]))]);
          }}
        />
      </div>
    </fieldset>
  );
}
export { RangeField };

const BAND_RANGE: Record<Band, [number, number]> = {
  VHF: [30, 300],
  UHF: [300, 3000],
  L: [1000, 2000],
  S: [2000, 4000],
};

export function StationModal({
  open,
  selected,
  onClose,
  onSelect,
  multiple,
  selectedIds = [],
  available,
  onSelectMany,
}: {
  open: boolean;
  selected: Station | null;
  onClose: () => void;
  onSelect: (s: Station) => void;
  /** Режим «Для спутника»: несколько станций, только из доступных. */
  multiple?: boolean;
  selectedIds?: number[];
  available?: number[];
  onSelectMany?: (ids: number[]) => void;
}) {
  const [many, setMany] = useState<number[]>(selectedIds);
  const toggleMany = (id: number) => setMany((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));
  const [query, setQuery] = useState("");
  const [antennaType, setAntennaType] = useState<string | null>("all");
  const [band, setBand] = useState<string | null>("all");
  const [freq, setFreq] = useState<[number, number]>([30, 4000]);
  const [choice, setChoice] = useState<number | null>(selected?.id ?? null);
  const types = [...new Set(STATIONS.flatMap((s) => s.antennas.map((a) => a.type)))];
  const list = useMemo(
    () =>
      STATIONS.filter((s) => {
        if (available && !available.includes(s.id)) return false;
        const q = query.trim().toLowerCase();
        if (q && ![s.name, s.callsign, s.owner, String(s.id)].some((v) => v.toLowerCase().includes(q))) return false;
        if (antennaType && antennaType !== "all" && !s.antennas.some((a) => a.type === antennaType)) return false;
        if (band && band !== "all" && !s.bands.includes(band as Band)) return false;
        return s.bands.some((b) => BAND_RANGE[b][1] >= freq[0] && BAND_RANGE[b][0] <= freq[1]);
      }),
    [query, antennaType, band, freq, available],
  );
  const chosen = STATIONS.find((s) => s.id === choice) ?? null;
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Выбор станции"
      closeLabel="Закрыть выбор станции"
      size="wide"
      className="picker-modal"
      footer={
        multiple ? (
          <div className="picker-footer">
            <span className="picker-count">{many.length ? `Выбрано: ${many.length}` : ""}</span>
            <Button type="button" text="Отмена" buttonType={ButtonType.GRAY} onClick={onClose} />
            <Button
              type="button"
              text={many.length > 1 ? "Выбрать станции" : "Выбрать станцию"}
              disabled={!many.length}
              onClick={() => onSelectMany?.(STATIONS.map((s) => s.id).filter((id) => many.includes(id)))}
            />
          </div>
        ) : (
          <div className="picker-footer">
            <Button type="button" text="Отмена" buttonType={ButtonType.GRAY} onClick={onClose} />
            <Button
              type="button"
              text="Выбрать станцию"
              disabled={!chosen}
              onClick={() => chosen && onSelect(chosen)}
            />
          </div>
        )
      }
    >
      <div className="picker-layout">
        <aside className="picker-filters" aria-label="Фильтры станций">
          <Selector
            title="Тип антенны"
            showTitle
            value={antennaType}
            onChange={setAntennaType}
            options={[{ value: "all", label: "Все" }, ...types.map((t) => ({ value: t, label: t }))]}
          />
          <Selector
            title="Диапазон частот"
            showTitle
            value={band}
            onChange={setBand}
            options={[{ value: "all", label: "Все" }, ...(["VHF", "UHF", "L", "S"] as const).map((b) => ({ value: b, label: b }))]}
          />
          <RangeField label="Частота, МГц" domain={[30, 4000]} values={freq} onChange={setFreq} unit="" />
        </aside>
        <div className="picker-results">
          <Search
            value={query}
            placeholder="Номер станции, название или владелец"
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="picker-list" role={multiple ? "group" : "radiogroup"} aria-label="Станции">
            {list.length === 0 && <p className="picker-empty">Станции не найдены. Измените фильтры.</p>}
            {list.map((s) => (
              <label
                key={s.id}
                className={`picker-card station-card ${(multiple ? many.includes(s.id) : choice === s.id) ? "selected" : ""} ${!multiple && choice !== null && choice !== s.id ? "dimmed" : ""}`}
              >
                <div className="picker-card-head">
                  {multiple ? (
                    <Checkbox checked={many.includes(s.id)} onChange={() => toggleMany(s.id)} />
                  ) : (
                    <Radio name="station" checked={choice === s.id} onChange={() => setChoice(s.id)} />
                  )}
                  <span className="station-card-title">
                    <Avatar size={AvatarSize.SMALL} variant={AvatarVariant.STATION} />
                    <strong>{s.name}</strong>
                    <BaseBadge className="station-card-number" badgeType={BaseBadgeType.SECONDARY} size={BaseBadgeSize.SMALL} text={String(s.id)} aria-label={`Номер ${s.id}`} />
                  </span>
                  <span className="picker-card-status">
                    <BadgeColorsBase color={s.online ? BadgeColor.GREEN : BadgeColor.GRAY} text={s.online ? "В сети" : "Не в сети"} />
                  </span>
                </div>
                <div className="picker-card-sub">
                  <span className="station-card-owner">
                    <Avatar size={AvatarSize.EXTRA_SMALL} url={publicPath("/img/owner-avatar.jpg")} alt="" />
                    {s.owner}
                  </span>
                  <ul className="station-card-antennas" aria-label="Антенны">
                    {s.antennas.map((a) => (
                      <li key={a.id}>
                        <AntennaIcon type={a.type} />
                        {a.type}
                      </li>
                    ))}
                  </ul>
                </div>
                <dl className="picker-card-stats">
                  <div><dt>Частоты</dt><dd>{s.bands.join(", ")}</dd></div>
                  <div><dt>Координаты</dt><dd>{s.coords}</dd></div>
                  <div><dt>QTH-локатор</dt><dd>{s.locator}</dd></div>
                  <div className="station-card-success"><dt>Успешность <span>{s.success}%</span></dt><dd><QualityBar value={s.success} /></dd></div>
                </dl>
              </label>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export function SatelliteModal({
  open,
  selected,
  available,
  onClose,
  onSelect,
  max,
  single,
}: {
  open: boolean;
  selected: string[];
  /** Спутники, видимые со станции в выбранный период. */
  available: string[];
  /** Сколько спутников можно выбрать (для автонаблюдений — 30). */
  max?: number;
  /** Режим «Для спутника»: выбирается ровно один спутник. */
  single?: boolean;
  onClose: () => void;
  onSelect: (ids: string[]) => void;
}) {
  const [query, setQuery] = useState("");
  const [success, setSuccess] = useState<[number, number]>([0, 100]);
  const [choice, setChoice] = useState<string[]>(selected);
  const list = SATELLITES.filter((s) => {
    if (!available.includes(s.id)) return false;
    const q = query.trim().toLowerCase();
    if (q && !s.name.toLowerCase().includes(q) && !String(s.norad).includes(q)) return false;
    return s.success >= success[0] && s.success <= success[1];
  });
  const full = max !== undefined && choice.length >= max;
  const toggle = (id: string) =>
    single
      ? setChoice([id])
      : setChoice((c) => (c.includes(id) ? c.filter((x) => x !== id) : max !== undefined && c.length >= max ? c : [...c, id]));
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Выбор спутника"
      closeLabel="Закрыть выбор спутника"
      size="wide"
      className="picker-modal picker-modal-sat"
      footer={
        <div className="picker-footer">
          <span className="picker-count">{single ? "" : max !== undefined ? `Выбрано: ${choice.length} из ${max}` : choice.length ? `Выбрано: ${choice.length}` : ""}</span>
          <Button type="button" text="Отмена" buttonType={ButtonType.GRAY} onClick={onClose} />
          <Button
            type="button"
            text={!single && choice.length > 1 ? "Выбрать спутники" : "Выбрать спутник"}
            disabled={!choice.length}
            onClick={() => onSelect(choice)}
          />
        </div>
      }
    >
      <div className="picker-layout">
        <aside className="picker-filters" aria-label="Фильтры спутников">
          <RangeField label="Успешность, %" domain={[0, 100]} values={success} onChange={setSuccess} unit="%" />
        </aside>
        <div className="picker-results">
          <Search value={query} placeholder="Название спутника или NORAD" onChange={(e) => setQuery(e.target.value)} />
          <div className="picker-list" role={single ? "radiogroup" : "group"} aria-label="Спутники">
            {list.length === 0 && <p className="picker-empty">Спутники не найдены. Измените фильтры.</p>}
            {list.map((s) => (
              <label key={s.id} className={`picker-card station-card sat-card ${choice.includes(s.id) ? "selected" : ""} ${full && !choice.includes(s.id) ? "is-locked" : ""}`}>
                <div className="picker-card-head">
                  {single ? (
                    <Radio name="satellite" checked={choice.includes(s.id)} onChange={() => toggle(s.id)} />
                  ) : (
                    <Checkbox checked={choice.includes(s.id)} disabled={full && !choice.includes(s.id)} onChange={() => toggle(s.id)} />
                  )}
                  <span className="station-card-title">
                    <Avatar size={AvatarSize.SMALL} variant={AvatarVariant.SATELLITE} />
                    <Icon
                      className="sat-card-flag"
                      iconName={s.country === "RU" ? IconName.RURussianFederation : IconName.USUnitedStates}
                      width={20}
                      height={20}
                      aria-label={s.country === "RU" ? "Россия" : "США"}
                    />
                    <strong>{s.name}</strong>
                    {s.partners && (
                      <span className="sat-card-partners">
                        {s.partners.map((p) => (
                          <span key={p.name}>
                            {p.logo === "geoscan" ? (
                              <Icon iconName={IconName.Geoscan} width={16} height={16} aria-hidden="true" />
                            ) : (
                              <img src={publicPath("/img/space-pi.svg")} alt="" width={15} height={16} />
                            )}
                            {p.name}
                          </span>
                        ))}
                      </span>
                    )}
                  </span>
                  <span className="sat-card-badges">
                    <BadgeColorsTransmitter type={s.active ? BadgeColorsTransmitterType.ACTIVE : BadgeColorsTransmitterType.INACTIVE} />
                    <BadgeColorsBase color={s.onOrbit ? BadgeColor.GREEN : BadgeColor.GRAY} text={s.onOrbit ? "На орбите" : "Сошёл с орбиты"} />
                  </span>
                </div>
                <dl className="picker-card-stats">
                  <div><dt>NORAD</dt><dd>{s.norad}</dd></div>
                  <div><dt>Передатчики</dt><dd>{s.transmitters}</dd></div>
                  <div><dt>Наблюдений</dt><dd>{s.observations}</dd></div>
                  <div className="station-card-success"><dt>Успешность <span>{s.success}%</span></dt><dd><QualityBar value={s.success} /></dd></div>
                </dl>
              </label>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
