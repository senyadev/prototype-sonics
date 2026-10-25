import { useEffect, useMemo, useState } from "react";
import { ThemeToggle } from "@sonik-space/ui/buttons";
import "@fontsource/roboto-mono/400.css";
import "@fontsource/roboto-mono/500.css";
import typography from "./typography.json";
import "./catalog.css";

type Entry = {
  id: string;
  title: string;
  name: string;
  type: "story" | "docs";
};
type StoryIndex = { entries: Record<string, Entry> };
type Section = "typography" | "components";

export default function DesignSystem() {
  const params = new URLSearchParams(window.location.search);
  const [section, setSection] = useState<Section>(
    params.has("story") ? "components" : "typography",
  );
  const [theme, setTheme] = useState<"light" | "dark">(() =>
    document.documentElement.classList.contains("dark") ? "dark" : "light",
  );
  const [query, setQuery] = useState("");
  const [sample, setSample] = useState(
    "На связи с космосом · Soniks 0123456789",
  );
  const [entries, setEntries] = useState<Entry[]>([]);
  const [selectedId, setSelectedId] = useState(params.get("story") || "");
  const [error, setError] = useState(false);
  const [reload, setReload] = useState(0);
  const [width, setWidth] = useState("100%");
  useEffect(() => {
    document.title = "Шрифты и компоненты — Soniks Design System";
    document.documentElement.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem("soniks-theme", theme);
    } catch {
      /* Тема работает и без хранилища. */
    }
  }, [theme]);
  useEffect(() => {
    const controller = new AbortController();
    setError(false);
    fetch("/component-library/index.json", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Index unavailable");
        return response.json() as Promise<StoryIndex>;
      })
      .then((index) => setEntries(Object.values(index.entries)))
      .catch((err) => {
        if (err.name !== "AbortError") setError(true);
      });
    return () => controller.abort();
  }, [reload]);
  const groups = useMemo(() => {
    const map = new Map<string, Entry[]>();
    for (const entry of entries) {
      if (entry.type !== "story") continue;
      map.set(entry.title, [...(map.get(entry.title) || []), entry]);
    }
    return [...map.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, [entries]);
  const filtered = groups.filter(([title, stories]) =>
    `${title} ${stories.map((s) => s.name).join(" ")}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  const selected = entries.find((entry) => entry.id === selectedId);
  const variants = selected
    ? groups.find(([title]) => title === selected.title)?.[1] || []
    : [];
  function selectStory(id: string) {
    setSelectedId(id);
    window.history.replaceState(
      null,
      "",
      `/design-system?story=${encodeURIComponent(id)}`,
    );
  }
  function changeSection(next: Section) {
    setSection(next);
    setQuery("");
    window.history.replaceState(
      null,
      "",
      next === "components" && selectedId
        ? `/design-system?story=${encodeURIComponent(selectedId)}`
        : "/design-system",
    );
  }
  return (
    <div className="ds-page">
      <header className="ds-header">
        <a href="/" className="ds-wordmark">
          SONIKS<span> / DESIGN SYSTEM</span>
        </a>
        <div>
          <a href="/">← На главную</a>
          <ThemeToggle
            theme={theme}
            onThemeChange={setTheme}
            labels={{
              pending: "Загрузка темы",
              switchToDark: "Включить тёмную тему",
              switchToLight: "Включить светлую тему",
            }}
          />
        </div>
      </header>
      <div className="ds-layout">
        <aside className="ds-sidebar">
          <p className="ds-overline">БИБЛИОТЕКА / 0.1.6</p>
          <nav aria-label="Разделы дизайн-системы">
            <button
              aria-current={section === "typography" ? "page" : undefined}
              onClick={() => changeSection("typography")}
            >
              Aa <span>Типографика</span>
              <small>{typography.length}</small>
            </button>
            <button
              aria-current={section === "components" ? "page" : undefined}
              onClick={() => changeSection("components")}
            >
              ◈ <span>Компоненты</span>
              <small>{groups.length || "…"}</small>
            </button>
          </nav>
          <div className="ds-sidebar-note">
            Оригинальные компоненты Soniks.
            <br />
            Светлая и тёмная темы.
            <br />
            Интерактивные примеры.
          </div>
          <a href="/component-library/" className="ds-storybook-link">
            Открыть полный Storybook ↗
          </a>
        </aside>
        <main className="ds-main">
          <p className="ds-overline">ОСНОВЫ И ИНТЕРФЕЙС</p>
          <h1>{section === "typography" ? "Типографика" : "Компоненты"}</h1>
          <p className="ds-intro">
            {section === "typography"
              ? "Два шрифта. Все текстовые стили системы. Кириллица, латиница и цифры — в реальном размере."
              : "Полный набор примеров из репозитория Soniks: от кнопок и полей до таблиц, графиков и оболочки приложения."}
          </p>
          {section === "typography" ? (
            <>
              <div className="ds-fonts">
                {["Inter", "Roboto Mono"].map((font) => (
                  <article
                    key={font}
                    style={{ fontFamily: `'${font}', sans-serif` }}
                  >
                    <span className="ds-overline">
                      {font === "Inter"
                        ? "ОСНОВНОЙ ШРИФТ"
                        : "МОНОШИРИННЫЙ ШРИФТ"}
                    </span>
                    <div className="ds-aa">Aa Бб 01</div>
                    <h2>{font}</h2>
                    <p>
                      {font === "Inter"
                        ? "Regular 400 · Medium 500 · Semibold 600"
                        : "Regular 400 · Medium 500"}
                    </p>
                    <p>АБВГДЕЁЖЗ · ABCDEFG · 0123456789</p>
                  </article>
                ))}
              </div>
              <div className="ds-controls">
                <label>
                  Текст образца
                  <input
                    value={sample}
                    onChange={(e) => setSample(e.target.value)}
                    placeholder="Введите свой текст"
                  />
                </label>
                <label>
                  Найти стиль
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="heading, mono, caption…"
                  />
                </label>
              </div>
              <div className="ds-type-list">
                {typography
                  .filter((style) =>
                    `${style.name} ${style.family}`
                      .toLowerCase()
                      .includes(query.toLowerCase()),
                  )
                  .map((style) => (
                    <article className="ds-type-row" key={style.name}>
                      <div>
                        <code>{style.name}</code>
                        <p>
                          {style.family} · {style.size}px /{" "}
                          {Math.round(style.size * style.lineHeight * 10) / 10}
                          px · {style.weight}
                        </p>
                      </div>
                      <div
                        className="ds-type-sample"
                        style={{
                          fontFamily: `'${style.family}'`,
                          fontSize: style.size,
                          fontWeight: style.weight,
                          lineHeight: style.lineHeight,
                          textTransform: style.uppercase
                            ? "uppercase"
                            : undefined,
                        }}
                      >
                        {sample || "На связи с космосом · Soniks 0123456789"}
                      </div>
                    </article>
                  ))}
              </div>
              {!typography.some((style) =>
                `${style.name} ${style.family}`
                  .toLowerCase()
                  .includes(query.toLowerCase()),
              ) && (
                <p role="status">
                  Стили не найдены. Попробуйте другое название.
                </p>
              )}
              <p className="ds-footnote">
                Размеры, начертания и интерлиньяж взяты из @sonik-space/styles.
                Совместимые алиасы с кириллической «с» не дублируются.
              </p>
            </>
          ) : (
            <>
              <div className="ds-controls">
                <label>
                  Поиск по компонентам и состояниям
                  <input
                    type="search"
                    placeholder="button, modal, chart, disabled…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </label>
                <span className="ds-count">
                  {groups.length} групп ·{" "}
                  {entries.filter((e) => e.type === "story").length} примеров
                </span>
              </div>
              {error ? (
                <div role="alert">
                  Не удалось загрузить каталог.{" "}
                  <button onClick={() => setReload((value) => value + 1)}>
                    Повторить
                  </button>
                </div>
              ) : entries.length === 0 ? (
                <p role="status">Загрузка компонентов…</p>
              ) : (
                <div className="ds-components">
                  <nav className="ds-component-list" aria-label="Компоненты">
                    {filtered.map(([title, stories]) => (
                      <button
                        key={title}
                        onClick={() => selectStory(stories[0].id)}
                        aria-current={
                          selected?.title === title ? "true" : undefined
                        }
                      >
                        <span>{title.replace(/^ui-kit\//, "")}</span>
                        <small>{stories.length}</small>
                      </button>
                    ))}
                    {filtered.length === 0 && (
                      <p role="status">Ничего не найдено.</p>
                    )}
                  </nav>
                  <div className="ds-preview-panel">
                    {selected ? (
                      <>
                        <div className="ds-preview-title">
                          <h2>{selected.title.replace(/^ui-kit\//, "")}</h2>
                          <a
                            href={`/component-library/?path=/story/${selected.id}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Controls / Storybook ↗
                          </a>
                        </div>
                        <div className="ds-preview-controls">
                          <label>
                            Состояние
                            <select
                              value={selected.id}
                              onChange={(e) => selectStory(e.target.value)}
                            >
                              {variants.map((entry) => (
                                <option key={entry.id} value={entry.id}>
                                  {entry.name}
                                </option>
                              ))}
                            </select>
                          </label>
                          <label>
                            Ширина
                            <select
                              value={width}
                              onChange={(e) => setWidth(e.target.value)}
                            >
                              <option value="100%">По ширине окна</option>
                              <option value="390px">Мобильный · 390px</option>
                              <option value="768px">Планшет · 768px</option>
                            </select>
                          </label>
                        </div>
                        <div className="ds-preview-stage">
                          <iframe
                            key={`${selected.id}-${theme}`}
                            title={`${selected.title} — ${selected.name}`}
                            style={{ width }}
                            src={`/component-library/iframe.html?id=${encodeURIComponent(selected.id)}&viewMode=story&globals=theme:${theme}`}
                          />
                        </div>
                        <p className="ds-footnote">
                          Пример из исходного Storybook. Взаимодействия и
                          демонстрационные данные определены авторами системы.
                          Варианты Dark сохраняют тёмную тему.
                        </p>
                      </>
                    ) : (
                      <div className="ds-preview-empty">
                        <span>◈</span>
                        <h2>Выберите компонент</h2>
                        <p>
                          Слева — все группы. Внутри — состояния, размеры и
                          живые примеры.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
