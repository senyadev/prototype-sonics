import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { Header } from "@sonik-space/ui/shell";
import { Button, ButtonType, ThemeToggle } from "@sonik-space/ui/buttons";
import { Input, TextArea } from "@sonik-space/ui/inputs";
import { ArrowIcon, CheckIcon, LogotypeIcon, LogotypeDarkIcon } from "@sonik-space/icons";
import {
  initialDraft,
  newAntenna,
  numberValue,
  saveStation,
  validatePhotos,
  validateStep,
  type Errors,
  type StationDraft,
  type StationPhoto,
} from "./station/model";
import "./station/create.css";

const stages = ["Станция", "Антенны", "Описание и фото"];
const titles = ["Основные данные", "Антенны станции", "Расскажите о станции"];
const notes = [
  "Название и расположение станции. Все поля на этом этапе обязательны.",
  "Добавьте хотя бы одну антенну и укажите её диапазон частот.",
  "Необязательный этап. Описание и фотографии можно не добавлять.",
];
type FieldKey = "name" | "latitude" | "longitude" | "altitude" | "horizon";

export default function CreateStation() {
  const [draft, setDraft] = useState(initialDraft);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [photos, setPhotos] = useState<StationPhoto[]>([]);
  const [mainId, setMainId] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saved, setSaved] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(() =>
    document.documentElement.classList.contains("dark") ? "dark" : "light",
  );
  const titleRef = useRef<HTMLHeadingElement>(null);
  const urls = useRef(new Set<string>());
  useEffect(() => {
    document.title = "Создать станцию — СОНИКС";
    return () => {
      for (const url of urls.current) URL.revokeObjectURL(url);
    };
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem("soniks-theme", theme);
    } catch {
      /* Тема доступна без хранилища. */
    }
  }, [theme]);
  useEffect(() => {
    titleRef.current?.focus();
  }, [step, saved]);
  const Logo = theme === "dark" ? LogotypeDarkIcon : LogotypeIcon;
  const themeControl = (
    <ThemeToggle
      theme={theme}
      onThemeChange={setTheme}
      labels={{
        pending: "Загрузка темы",
        switchToDark: "Включить тёмную тему",
        switchToLight: "Включить светлую тему",
      }}
    />
  );
  function clearError(key: string) {
    setErrors((current) => {
      const next = { ...current };
      delete next[key];
      return next;
    });
  }
  function update(key: Exclude<keyof StationDraft, "antennas">, value: string) {
    setDraft((current) => ({ ...current, [key]: value }));
    clearError(key);
  }
  function focusError() {
    requestAnimationFrame(() =>
      document
        .querySelector<HTMLElement>('.create-station [aria-invalid="true"]')
        ?.focus(),
    );
  }
  function goNext() {
    const next = validateStep(draft, step);
    setErrors(next);
    if (Object.keys(next).length) focusError();
    else setStep(step + 1);
  }
  async function submit(event: FormEvent) {
    event.preventDefault();
    if (processing || saving || saved) return;
    if (step < 2) {
      goNext();
      return;
    }
    for (const stage of [0, 1]) {
      const issues = validateStep(draft, stage);
      if (Object.keys(issues).length) {
        setErrors(issues);
        setStep(stage);
        focusError();
        return;
      }
    }
    const issue = validatePhotos(photos, mainId);
    if (issue) {
      setPhotoError(issue);
      return;
    }
    setSaving(true);
    setSaveError("");
    try {
      await saveStation(draft, photos, mainId);
      setSaved(true);
    } catch {
      setSaveError(
        "Не удалось сохранить станцию в браузере. Проверьте доступность и свободное место хранилища, затем повторите. Данные формы сохранены.",
      );
    } finally {
      setSaving(false);
    }
  }
  async function addPhotos(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.currentTarget.files || []);
    event.currentTarget.value = "";
    if (!files.length || processing) return;
    setPhotoError("");
    if (photos.length + files.length > 10) {
      setPhotoError(
        `Можно добавить ещё ${10 - photos.length} фото. Максимум — 10.`,
      );
      return;
    }
    setProcessing(true);
    const added: StationPhoto[] = [],
      rejected: string[] = [];
    for (const file of files) {
      if (
        ![
          "image/jpeg",
          "image/png",
          "image/webp",
          "image/avif",
          "image/gif",
        ].includes(file.type)
      ) {
        rejected.push(file.name);
        continue;
      }
      const url = URL.createObjectURL(file);
      try {
        const image = new Image();
        image.src = url;
        await image.decode();
        const photo = { id: crypto.randomUUID(), file, url };
        added.push(photo);
        urls.current.add(url);
      } catch {
        URL.revokeObjectURL(url);
        rejected.push(file.name);
      }
    }
    setPhotos((current) => [...current, ...added]);
    if (!mainId && added.length) setMainId(added[0].id);
    if (rejected.length)
      setPhotoError(
        `Не удалось открыть: ${rejected.join(", ")}. Выберите изображение JPEG, PNG, WebP, AVIF или GIF.`,
      );
    setProcessing(false);
  }
  function removePhoto(id: string) {
    const photo = photos.find((p) => p.id === id);
    if (photo) {
      URL.revokeObjectURL(photo.url);
      urls.current.delete(photo.url);
    }
    const next = photos.filter((p) => p.id !== id);
    setPhotos(next);
    if (mainId === id) setMainId(next[0]?.id || null);
    setPhotoError("");
  }
  function field(
    key: FieldKey,
    label: string,
    placeholder: string,
    hint?: string,
  ) {
    return (
      <div className="station-field">
        <label htmlFor={key}>
          {label} <span aria-hidden="true">*</span>
        </label>
        <Input
          id={key}
          name={key}
          showTitle={false}
          required
          value={draft[key]}
          inputMode={key === "name" ? "text" : "decimal"}
          onChange={(e) => update(key, e.target.value)}
          placeholder={placeholder}
          error={!!errors[key]}
          aria-invalid={!!errors[key]}
          aria-describedby={`${key}-hint`}
        />
        <p
          id={`${key}-hint`}
          className={errors[key] ? "field-error" : "field-hint"}
        >
          {errors[key] || hint}
        </p>
      </div>
    );
  }
  return (
    <div className="create-station">
      <Header
        brand={
          <a href="/" aria-label="СОНИКС — главная">
            <Logo width={98} height={46} />
          </a>
        }
        actions={themeControl}
        mobileActions={themeControl}
      />
      <main className="station-main">
        {!saved && (
          <>
            <a className="station-back" href="/">
              <ArrowIcon width={18} height={18} fill="currentColor" aria-hidden="true" />
              В личный кабинет
            </a>
            <div className="station-page-heading">
              <h1>Создание станции</h1>
            </div>
            <ol
              className="station-progress"
              aria-label="Этапы создания станции"
            >
              {stages.map((stage, i) => (
                <li
                  key={stage}
                  className={
                    saved || i < step ? "complete" : i === step ? "current" : ""
                  }
                  aria-current={!saved && i === step ? "step" : undefined}
                >
                  <button
                    type="button"
                    disabled={i >= step || saving || saved}
                    onClick={() => {
                      setStep(i);
                      setErrors({});
                    }}
                  >
                    <span className="step-number">
                      {saved || i < step ? (
                        <CheckIcon
                          width={18}
                          height={18}
                          fill="currentColor"
                          aria-hidden="true"
                        />
                      ) : (
                        i + 1
                      )}
                    </span>
                    <span>{stage}</span>
                  </button>
                  <div className="progress-segment" />
                </li>
              ))}
            </ol>
          </>
        )}
        {saved ? (
          <section className="station-success">
            <img
              className="station-success-image"
              src="/img/image%2041.png"
              alt="Наземная станция СОНИКС"
              width={304}
              height={247}
            />
            <h2 ref={titleRef} tabIndex={-1}>
              Станция создана
            </h2>
            <p>
              «{draft.name.trim()}» сохранена в этом браузере вместе с антеннами
              и фотографиями. В сеть СОНИКС она пока не опубликована.
            </p>
            <dl>
              <div>
                <dt>Название</dt>
                <dd>{draft.name.trim()}</dd>
              </div>
              <div>
                <dt>Координаты</dt>
                <dd>
                  {numberValue(draft.latitude)}°, {numberValue(draft.longitude)}
                  °
                </dd>
              </div>
              <div>
                <dt>Высота над уровнем моря</dt>
                <dd>{numberValue(draft.altitude)} м</dd>
              </div>
              <div>
                <dt>Минимальный горизонт</dt>
                <dd>{numberValue(draft.horizon)}°</dd>
              </div>
              <div>
                <dt>Антенны</dt>
                <dd>{draft.antennas.length}</dd>
              </div>
              <div>
                <dt>Фотографии</dt>
                <dd>{photos.length}</dd>
              </div>
            </dl>
            <Button
              type="button"
              text="В личный кабинет"
              onClick={() => {
                window.location.href = "/stations/new";
              }}
            />
          </section>
        ) : (
          <form noValidate onSubmit={submit}>
            <div className="station-form-heading">
              <span>Шаг {step + 1} из 3</span>
              <h2 tabIndex={-1} ref={titleRef}>
                {titles[step]}
              </h2>
              <p>{notes[step]}</p>
            </div>
            <fieldset disabled={saving} className="station-fields">
              {step === 0 && (
                <>
                  {field(
                    "name",
                    "Название станции",
                    "Например, Обсерватория на крыше",
                  )}
                  <div className="station-section-label">Расположение</div>
                  <div className="station-field-grid">
                    {field(
                      "latitude",
                      "Широта, °",
                      "55.7558",
                      "От −90° до 90°",
                    )}
                    {field(
                      "longitude",
                      "Долгота, °",
                      "37.6173",
                      "От −180° до 180°",
                    )}
                    {field(
                      "altitude",
                      "Высота над уровнем моря, м",
                      "156",
                      "Можно указать отрицательное значение",
                    )}
                    {field(
                      "horizon",
                      "Минимальный горизонт, °",
                      "0",
                      "От 0° до 90°. По умолчанию — 0°",
                    )}
                  </div>
                  <div className="station-note">
                    Минимальный горизонт — угол возвышения над горизонтом,
                    начиная с которого станция может принимать сигнал.
                  </div>
                </>
              )}
              {step === 1 && (
                <>
                  <div className="antenna-heading">
                    <span>Диапазоны указываются в МГц</span>
                    <span>{draft.antennas.length} / 10</span>
                  </div>
                  {errors.antennas && (
                    <p role="alert" className="field-error">
                      {errors.antennas}
                    </p>
                  )}
                  {draft.antennas.map((antenna, index) => (
                    <section
                      className="antenna-card"
                      key={antenna.id}
                      aria-label={`Антенна ${index + 1}`}
                    >
                      <div className="antenna-card-heading">
                        <h3>Антенна {index + 1}</h3>
                        <button
                          type="button"
                          disabled={draft.antennas.length === 1}
                          onClick={() => {
                            setDraft((current) => ({
                              ...current,
                              antennas: current.antennas.filter(
                                (a) => a.id !== antenna.id,
                              ),
                            }));
                            setErrors({});
                          }}
                          aria-label={`Удалить антенну ${index + 1}`}
                        >
                          Удалить
                        </button>
                      </div>
                      <div className="station-field-grid">
                        {(["type", "min", "max"] as const).map((key) => {
                          const id = `${antenna.id}-${key}`;
                          const label =
                            key === "type"
                              ? "Тип антенны"
                              : key === "min"
                                ? "Минимальная частота, МГц"
                                : "Максимальная частота, МГц";
                          return (
                            <div
                              key={id}
                              className={`station-field ${key === "type" ? "field-full" : ""}`}
                            >
                              <label htmlFor={id}>
                                {label} <span aria-hidden="true">*</span>
                              </label>
                              <Input
                                id={id}
                                showTitle={false}
                                required
                                value={antenna[key]}
                                list={
                                  key === "type" ? "antenna-types" : undefined
                                }
                                inputMode={key === "type" ? "text" : "decimal"}
                                placeholder={
                                  key === "type"
                                    ? "Выберите или введите тип"
                                    : key === "min"
                                      ? "144"
                                      : "146"
                                }
                                error={!!errors[id]}
                                aria-invalid={!!errors[id]}
                                aria-describedby={
                                  errors[id] ? `${id}-error` : undefined
                                }
                                onChange={(e) => {
                                  const value = e.target.value;
                                  setDraft((current) => ({
                                    ...current,
                                    antennas: current.antennas.map((a) =>
                                      a.id === antenna.id
                                        ? { ...a, [key]: value }
                                        : a,
                                    ),
                                  }));
                                  clearError(id);
                                }}
                              />
                              {errors[id] && (
                                <p className="field-error" id={`${id}-error`}>
                                  {errors[id]}
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </section>
                  ))}
                  <datalist id="antenna-types">
                    {[
                      "Диполь",
                      "Яги",
                      "Турникетная",
                      "Квадрифилярная",
                      "Параболическая",
                      "Спиральная",
                      "Дисконусная",
                    ].map((type) => (
                      <option key={type} value={type} />
                    ))}
                  </datalist>
                  <Button
                    type="button"
                    text="Добавить антенну"
                    buttonType={ButtonType.GRAY}
                    disabled={draft.antennas.length >= 10}
                    onClick={() =>
                      setDraft((current) => ({
                        ...current,
                        antennas: [...current.antennas, newAntenna()],
                      }))
                    }
                  />
                  {draft.antennas.length === 10 && (
                    <p className="field-hint">
                      Добавлено максимальное количество антенн.
                    </p>
                  )}
                </>
              )}
              {step === 2 && (
                <>
                  <div className="station-field">
                    <label htmlFor="description">
                      Описание{" "}
                      <span className="optional-label">Необязательно</span>
                    </label>
                    <TextArea
                      id="description"
                      showTitle={false}
                      rows={4}
                      value={draft.description}
                      onChange={(e) => update("description", e.target.value)}
                      placeholder="Расскажите об оборудовании и особенностях расположения станции"
                    />
                  </div>
                  <div className="photo-heading">
                    <h3>
                      Фотографии{" "}
                      <span className="optional-label">Необязательно</span>
                    </h3>
                    <span>{photos.length} / 10</span>
                  </div>
                  <p className="field-hint">
                    Первое фото станет главным. Вы можете выбрать другое.
                    Остальные — дополнительные.
                  </p>
                  <label
                    className={`photo-upload ${processing || photos.length >= 10 ? "disabled" : ""}`}
                  >
                    <span>
                      {processing
                        ? "Проверяем фотографии…"
                        : photos.length >= 10
                          ? "Добавлено 10 фотографий"
                          : "Добавить фотографии"}
                    </span>
                    <small>JPEG, PNG, WebP, AVIF или GIF · до 10 фото</small>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
                      multiple
                      disabled={processing || photos.length >= 10}
                      onChange={addPhotos}
                    />
                  </label>
                  {photoError && (
                    <p role="alert" className="field-error">
                      {photoError}
                    </p>
                  )}
                  <div className="station-photos">
                    {photos.map((photo) => (
                      <article
                        key={photo.id}
                        className={mainId === photo.id ? "main-photo" : ""}
                      >
                        <img src={photo.url} alt={photo.file.name} />
                        <div>
                          <label>
                            <input
                              type="radio"
                              name="mainPhoto"
                              checked={mainId === photo.id}
                              onChange={() => setMainId(photo.id)}
                            />{" "}
                            {mainId === photo.id
                              ? "Главное фото"
                              : "Сделать главным"}
                          </label>
                          <button
                            type="button"
                            disabled={processing}
                            onClick={() => removePhoto(photo.id)}
                            aria-label={`Удалить фото ${photo.file.name}`}
                          >
                            Удалить
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                  <div className="station-summary">
                    <h3>Готово к сохранению</h3>
                    <dl>
                      <div>
                        <dt>Станция</dt>
                        <dd>{draft.name}</dd>
                      </div>
                      <div>
                        <dt>Координаты</dt>
                        <dd>
                          {numberValue(draft.latitude)}°,{" "}
                          {numberValue(draft.longitude)}°
                        </dd>
                      </div>
                      <div>
                        <dt>Высота / горизонт</dt>
                        <dd>
                          {numberValue(draft.altitude)} м /{" "}
                          {numberValue(draft.horizon)}°
                        </dd>
                      </div>
                      <div>
                        <dt>Антенны</dt>
                        <dd>{draft.antennas.length}</dd>
                      </div>
                    </dl>
                    <p>
                      Станция сохранится только в этом браузере. Публикация в
                      сеть пока не подключена.
                    </p>
                  </div>
                </>
              )}
            </fieldset>
            {saveError && (
              <p className="field-error" role="alert">
                {saveError}
              </p>
            )}
            <div className="station-form-actions">
              <div>
                {step > 0 && (
                  <Button
                    type="button"
                    text="Назад"
                    buttonType={ButtonType.GRAY}
                    disabled={saving}
                    onClick={() => {
                      setStep(step - 1);
                      setErrors({});
                    }}
                  />
                )}
              </div>
              <Button
                type="submit"
                text={
                  saving
                    ? "Сохраняем…"
                    : step === 2
                      ? "Создать станцию"
                      : "Продолжить"
                }
                disabled={saving || processing}
              />
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
