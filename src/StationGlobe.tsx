import { publicPath } from "./paths";
import { useEffect, useMemo, useRef, useState } from "react";
import { geoDistance, geoGraticule10, geoOrthographic, geoPath } from "d3-geo";
import type { GeoPermissibleObjects } from "d3-geo";
import land from "./data/land.json";
import "./globe.css";

type Station = {
  id: number;
  name: string;
  lat: number;
  lng: number;
  status: string;
};
const statuses: Record<string, { label: string; color: string }> = {
  online: { label: "В сети", color: "var(--globe-online)" },
  testing: { label: "Тестируется", color: "var(--globe-testing)" },
  unavailable: { label: "Приём закрыт", color: "var(--globe-unavailable)" },
  were_online: { label: "Была в сети", color: "var(--globe-were-online)" },
  offline: { label: "Не в сети", color: "var(--globe-offline)" },
  never: { label: "Ещё не выходила в сеть", color: "var(--globe-never)" },
};
function validStations(data: unknown): data is Station[] {
  return (
    Array.isArray(data) &&
    data.length > 0 &&
    data.every(
      (s) =>
        typeof s.id === "number" &&
        typeof s.name === "string" &&
        typeof s.status === "string" &&
        Number.isFinite(s.lat) &&
        Math.abs(s.lat) <= 90 &&
        Number.isFinite(s.lng) &&
        Math.abs(s.lng) <= 180,
    )
  );
}
const statusOf = (station: Station) =>
  statuses[station.status] || {
    label: "Статус неизвестен",
    color: "var(--globe-never)",
  };
export default function StationGlobe() {
  const [stations, setStations] = useState<Station[]>([]);
  const [source, setSource] = useState("Загружаем станции…");
  const [rotation, setRotation] = useState<[number, number]>([-65, -35]);
  const drag = useRef<{
    x: number;
    y: number;
    rotation: [number, number];
    moved: boolean;
  } | null>(null);
  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    let alive = true;
    async function load() {
      setSource("Обновляем станции…");
      try {
        if (import.meta.env.VITE_STATIC_HOST === "true")
          throw new Error("Static host");
        const response = await fetch("/api/sonik/stations", {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Unavailable");
        const data: unknown = await response.json();
        if (!validStations(data)) throw new Error("Invalid data");
        if (alive) {
          setStations(data);
          setSource("Данные sonik.space · обновлены при открытии");
        }
      } catch {
        try {
          const response = await fetch(publicPath("/data/stations.json"));
          if (!response.ok) throw new Error("Snapshot unavailable");
          const data = await response.json();
          if (!validStations(data.stations))
            throw new Error("Invalid snapshot");
          if (alive) {
            setStations(data.stations);
            setSource(
              `Сохранённые данные от ${new Date(data.fetchedAt).toLocaleDateString("ru-RU")}`,
            );
          }
        } catch {
          if (alive) setSource("Не удалось загрузить станции");
        }
      } finally {
        clearTimeout(timeout);
      }
    }
    void load();
    return () => {
      alive = false;
      clearTimeout(timeout);
      controller.abort();
    };
  }, []);
  const projection = useMemo(
    () =>
      geoOrthographic()
        .translate([280, 270])
        .scale(225)
        .rotate(rotation)
        .clipAngle(90),
    [rotation],
  );
  const path = geoPath(projection);
  const center: [number, number] = [-rotation[0], -rotation[1]];
  const visible = stations.filter(
    (s) => geoDistance([s.lng, s.lat], center) < Math.PI / 2,
  );
  return (
    <section
      className="station-globe"
      aria-label="Глобус наземных станций СОНИКС"
    >
      <svg
        className="globe-canvas"
        viewBox="0 0 560 540"
        role="group"
        aria-label="Вращайте глобус перетаскиванием или клавишами со стрелками"
        tabIndex={0}
        onKeyDown={(e) => {
          if (
            ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)
          ) {
            e.preventDefault();
            setRotation(([x, y]) => [
              x +
                (e.key === "ArrowLeft" ? -10 : e.key === "ArrowRight" ? 10 : 0),
              Math.max(
                -85,
                Math.min(
                  85,
                  y +
                    (e.key === "ArrowUp"
                      ? 10
                      : e.key === "ArrowDown"
                        ? -10
                        : 0),
                ),
              ),
            ]);
          }
        }}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          drag.current = { x: e.clientX, y: e.clientY, rotation, moved: false };
        }}
        onPointerMove={(e) => {
          const start = drag.current;
          if (!start) return;
          const dx = e.clientX - start.x,
            dy = e.clientY - start.y;
          start.moved = Math.abs(dx) + Math.abs(dy) > 3;
          const factor = 560 / e.currentTarget.getBoundingClientRect().width;
          setRotation([
            start.rotation[0] + dx * 0.3 * factor,
            Math.max(-85, Math.min(85, start.rotation[1] - dy * 0.3 * factor)),
          ]);
        }}
        onPointerUp={() => {
          drag.current = null;
        }}
        onPointerCancel={() => {
          drag.current = null;
        }}
      >
        <defs>
          <radialGradient id="ocean" cx="35%" cy="30%" r="75%">
            <stop stopColor="var(--globe-ocean-light)" />
            <stop offset=".65" stopColor="var(--globe-ocean-mid)" />
            <stop offset="1" stopColor="var(--globe-ocean-edge)" />
          </radialGradient>
          <radialGradient id="atmosphere">
            <stop
              offset=".86"
              stopColor="var(--globe-atmosphere)"
              stopOpacity="0"
            />
            <stop
              offset=".94"
              stopColor="var(--globe-atmosphere)"
              stopOpacity=".13"
            />
            <stop
              offset="1"
              stopColor="var(--globe-atmosphere)"
              stopOpacity="0"
            />
          </radialGradient>
          <radialGradient id="shade" cx="30%" cy="25%" r="80%">
            <stop offset=".4" stopColor="#000" stopOpacity="0" />
            <stop
              offset="1"
              stopColor="#000"
              stopOpacity="var(--globe-shadow-opacity)"
            />
          </radialGradient>
        </defs>
        <circle cx="280" cy="270" r={246} fill="url(#atmosphere)" />
        <path
          d={path({ type: "Sphere" }) || ""}
          fill="url(#ocean)"
          stroke="var(--globe-outline)"
          strokeWidth="1"
        />
        <path
          d={path(geoGraticule10()) || ""}
          fill="none"
          stroke="var(--globe-grid)"
          strokeWidth=".55"
          opacity=".28"
        />
        <path
          d={path(land as GeoPermissibleObjects) || ""}
          fill="var(--globe-land)"
          stroke="var(--globe-coast)"
          strokeWidth=".55"
        />
        <path
          d={path({ type: "Sphere" }) || ""}
          fill="url(#shade)"
          pointerEvents="none"
        />
        {visible.map((station) => {
          const point = projection([station.lng, station.lat]);
          if (!point) return null;
          return (
            <g
              key={station.id}
              data-station="true"
              transform={`translate(${point[0]},${point[1]})`}
              className="globe-marker"
            >
              <title>
                {station.name} — {statusOf(station).label}
              </title>
              <circle r="9" fill="transparent" />
              <circle r={5} fill={statusOf(station).color} opacity=".18" />
              <circle
                r={2.6}
                fill={statusOf(station).color}
                stroke="var(--globe-marker-border)"
                strokeWidth="1"
              />
            </g>
          );
        })}
      </svg>
      {!source.startsWith("Данные sonik.space") && (
        <p className="globe-source" role="status">
          {source}
        </p>
      )}
      <p className="globe-credit">
        Станции:{" "}
        <a href="https://sonik.space/" target="_blank" rel="noreferrer">
          СОНИКС
        </a>{" "}
        ·{" "}
        <a
          href="https://creativecommons.org/licenses/by-sa/4.0/"
          target="_blank"
          rel="noreferrer"
        >
          CC BY-SA 4.0
        </a>
        . Карта: Natural Earth.
      </p>
    </section>
  );
}
