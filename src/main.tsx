import React, { lazy, Suspense, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@sonik-space/tokens/theme.css";
import "@sonik-space/ui/style.css";
import { Header } from "@sonik-space/ui/shell";
import { Button, ButtonSize, ThemeToggle } from "@sonik-space/ui/buttons";
import { LogotypeIcon, LogotypeDarkIcon } from "@sonik-space/icons";
import "./styles.css";

const StationGlobe = lazy(() => import("./StationGlobe"));

const DesignSystem = lazy(() => import("./DesignSystem"));
const CreateStation = lazy(() => import("./CreateStation"));

function App() {
  const [theme, setTheme] = useState<"light" | "dark">(() =>
    document.documentElement.classList.contains("dark") ? "dark" : "light",
  );
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem("soniks-theme", theme);
    } catch {
      /* Theme still works when storage is unavailable. */
    }
  }, [theme]);
  const Logo = theme === "dark" ? LogotypeDarkIcon : LogotypeIcon;
  return (
    <div className="home-page">
      <a className="skip-link" href="#main">
        Перейти к содержимому
      </a>
      <Header
        brand={
          <a href="/" aria-label="СОНИКС — главная" className="brand">
            <Logo width={98} height={46} />
          </a>
        }
        actions={
          <ThemeToggle
            theme={theme}
            onThemeChange={setTheme}
            labels={{
              pending: "Загрузка темы",
              switchToDark: "Включить тёмную тему",
              switchToLight: "Включить светлую тему",
            }}
          />
        }
        mobileActions={
          <>
            <ThemeToggle
              theme={theme}
              onThemeChange={setTheme}
              labels={{
                pending: "Загрузка темы",
                switchToDark: "Включить тёмную тему",
                switchToLight: "Включить светлую тему",
              }}
            />
          </>
        }
      />
      <main id="main">
        <section className="hero" aria-labelledby="welcome-title">
          <div className="hero-copy">
            <a
              className="open-source-link"
              href="https://github.com/sonik-space"
              target="_blank"
              rel="noreferrer"
            >
              Открытый код
            </a>
            <h1 id="welcome-title">
              Сеть открытых
              <br />
              наземных исследовательских комплексов
            </h1>
            <p className="lead">
              Для приема сигналов
              <br />с космических аппаратов
            </p>
            <Button
              text="Все станции"
              buttonSize={ButtonSize.SMALL}
              onClick={() => {
                window.location.href = "https://sonik.space/stations/";
              }}
            />
          </div>
          <div className="network-panel" id="network">
            <Suspense
              fallback={
                <div className="globe-placeholder" role="status">
                  Загружаем глобус…
                </div>
              }
            >
              <StationGlobe />
            </Suspense>
          </div>
        </section>
      </main>
      <footer className="home-footer">
        <span>СОНИКС</span>
        <a href="/stations/new">Создать станцию</a>
        <a href="/design-system">Дизайн-система</a>
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense fallback={<p role="status">Загрузка…</p>}>
      {window.location.pathname.replace(/\/$/, "") === "/design-system" ? (
        <DesignSystem />
      ) : window.location.pathname.replace(/\/$/, "") === "/stations/new" ? (
        <CreateStation />
      ) : (
        <App />
      )}
    </Suspense>
  </React.StrictMode>,
);
