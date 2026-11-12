import { useMemo, useState } from "react";
import { Modal } from "@sonik-space/ui/modal";
import { Button, ButtonType } from "@sonik-space/ui/buttons";
import { Search } from "@sonik-space/ui/search";
import { Selector } from "@sonik-space/ui/selectors";
import { MergeSlider } from "@sonik-space/ui/slider";
import { Checkbox, Radio } from "@sonik-space/ui/checkbox";
import { Input } from "@sonik-space/ui/inputs";
import {
  BadgeColor,
  BadgeColorsBase,
  BadgeColorsSatellite,
  BadgeColorsSatelliteType,
} from "@sonik-space/ui/badge";
import { STATIONS, SATELLITES, type Band, type Station } from "./data";

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
}: {
  label: string;
  domain: [number, number];
  values: [number, number];
  onChange: (v: [number, number]) => void;
  unit?: string;
}) {
  const clamp = (n: number) => Math.min(domain[1], Math.max(domain[0], n));
  return (
    <fieldset className="range-field">
      <legend>{label}</legend>
      <MergeSlider
        domain={domain}
        step={1}
        mergeStep={0}
        values={values}
        onChange={(v) => onChange([v[0], v[1]])}
      />
      <div className="range-inputs">
        <Input
          aria-label={`${label}: от`}
          inputMode="numeric"
          value={String(values[0])}
          rightIcon={<span className="input-unit">{unit ?? "Мин"}</span>}
          showRightIcon={unit !== ""}
          onChange={(e) => {
            const n = Number(e.target.value);
            if (Number.isFinite(n)) onChange([clamp(Math.min(n, values[1])), values[1]]);
          }}
        />
        <Input
          aria-label={`${label}: до`}
          inputMode="numeric"
          value={String(values[1])}
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
}: {
  open: boolean;
  selected: Station | null;
  onClose: () => void;
  onSelect: (s: Station) => void;
}) {
  const [query, setQuery] = useState("");
  const [antennaType, setAntennaType] = useState<string | null>("all");
  const [band, setBand] = useState<string | null>("all");
  const [freq, setFreq] = useState<[number, number]>([30, 4000]);
  const [choice, setChoice] = useState<number | null>(selected?.id ?? null);
  const types = [...new Set(STATIONS.flatMap((s) => s.antennas.map((a) => a.type)))];
  const list = useMemo(
    () =>
      STATIONS.filter((s) => {
        const q = query.trim().toLowerCase();
        if (q && ![s.name, s.callsign, s.owner, String(s.id)].some((v) => v.toLowerCase().includes(q))) return false;
        if (antennaType && antennaType !== "all" && !s.antennas.some((a) => a.type === antennaType)) return false;
        if (band && band !== "all" && !s.bands.includes(band as Band)) return false;
        return s.bands.some((b) => BAND_RANGE[b][1] >= freq[0] && BAND_RANGE[b][0] <= freq[1]);
      }),
    [query, antennaType, band, freq],
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
        <div className="picker-footer">
          <Button type="button" text="Отмена" buttonType={ButtonType.GRAY} onClick={onClose} />
          <Button
            type="button"
            text="Выбрать станцию"
            disabled={!chosen}
            onClick={() => chosen && onSelect(chosen)}
          />
        </div>
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
          <div className="picker-list" role="radiogroup" aria-label="Станции">
            {list.length === 0 && <p className="picker-empty">Станции не найдены. Измените фильтры.</p>}
            {list.map((s) => (
              <label key={s.id} className={`picker-card ${choice === s.id ? "selected" : ""} ${choice !== null && choice !== s.id ? "dimmed" : ""}`}>
                <div className="picker-card-head">
                  <Radio name="station" checked={choice === s.id} onChange={() => setChoice(s.id)} />
                  <strong>{s.name}</strong>
                  <span className="picker-operator">№{s.id} · {s.callsign}</span>
                  <span className="picker-card-status">
                    <BadgeColorsBase color={s.online ? BadgeColor.GREEN : BadgeColor.GRAY} text={s.online ? "В сети" : "Не в сети"} />
                  </span>
                </div>
                <div className="picker-card-sub">
                  <span>{s.owner}</span>
                  <span>{s.antennas.map((a) => a.type).join(" · ")}</span>
                </div>
                <dl className="picker-card-stats">
                  <div><dt>Частоты</dt><dd>{s.bands.join(", ")}</dd></div>
                  <div><dt>Координаты</dt><dd>{s.coords}</dd></div>
                  <div><dt>QTH-локатор</dt><dd>{s.locator}</dd></div>
                  <div><dt>Успешность <span>{s.success}%</span></dt><dd><SuccessBar value={s.success} /></dd></div>
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
  onClose,
  onSelect,
}: {
  open: boolean;
  selected: string[];
  onClose: () => void;
  onSelect: (ids: string[]) => void;
}) {
  const [query, setQuery] = useState("");
  const [success, setSuccess] = useState<[number, number]>([0, 100]);
  const [choice, setChoice] = useState<string[]>(selected);
  const list = SATELLITES.filter((s) => {
    const q = query.trim().toLowerCase();
    if (q && !s.name.toLowerCase().includes(q) && !String(s.norad).includes(q)) return false;
    return s.success >= success[0] && s.success <= success[1];
  });
  const toggle = (id: string) =>
    setChoice((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Выбор спутника"
      closeLabel="Закрыть выбор спутника"
      size="wide"
      className="picker-modal"
      footer={
        <div className="picker-footer">
          <span className="picker-count">{choice.length ? `Выбрано: ${choice.length}` : ""}</span>
          <Button type="button" text="Отмена" buttonType={ButtonType.GRAY} onClick={onClose} />
          <Button
            type="button"
            text={choice.length > 1 ? "Выбрать спутники" : "Выбрать спутник"}
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
          <div className="picker-list" role="group" aria-label="Спутники">
            {list.length === 0 && <p className="picker-empty">Спутники не найдены. Измените фильтры.</p>}
            {list.map((s) => (
              <label key={s.id} className={`picker-card ${choice.includes(s.id) ? "selected" : ""}`}>
                <div className="picker-card-head">
                  <Checkbox checked={choice.includes(s.id)} onChange={() => toggle(s.id)} />
                  <strong>{s.name}</strong>
                  {s.operator && <span className="picker-operator">{s.operator}</span>}
                  <span className="picker-card-status">
                    <BadgeColorsSatellite type={s.active ? BadgeColorsSatelliteType.ACTIVE : BadgeColorsSatelliteType.INACTIVE} />
                  </span>
                </div>
                <dl className="picker-card-stats">
                  <div><dt>NORAD</dt><dd>{s.norad}</dd></div>
                  <div><dt>Передатчики</dt><dd>{s.transmitters}</dd></div>
                  <div><dt>Наблюдений</dt><dd>{s.observations.toLocaleString("ru-RU")}</dd></div>
                  <div><dt>Успешность <span>{s.success}%</span></dt><dd><SuccessBar value={s.success} /></dd></div>
                </dl>
              </label>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
