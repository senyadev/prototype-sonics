export type AntennaDraft = {
  id: string;
  type: string;
  min: string;
  max: string;
};
export type StationDraft = {
  name: string;
  latitude: string;
  longitude: string;
  altitude: string;
  horizon: string;
  description: string;
  antennas: AntennaDraft[];
};
export type StationPhoto = { id: string; file: File; url: string };
export type Errors = Record<string, string>;
export const numberValue = (value: string) =>
  value.trim() ? Number(value.trim().replace(",", ".")) : NaN;
export const newAntenna = (): AntennaDraft => ({
  id: crypto.randomUUID(),
  type: "",
  min: "",
  max: "",
});
export const initialDraft = (): StationDraft => ({
  name: "",
  latitude: "",
  longitude: "",
  altitude: "",
  horizon: "0",
  description: "",
  antennas: [newAntenna()],
});

export function validateStep(draft: StationDraft, step: number): Errors {
  const errors: Errors = {};
  if (step === 0) {
    if (!draft.name.trim()) errors.name = "Укажите название станции";
    for (const [key, title, min, max] of [
      ["latitude", "Широта", -90, 90],
      ["longitude", "Долгота", -180, 180],
      ["horizon", "Минимальный горизонт", 0, 90],
    ] as const) {
      const value = numberValue(draft[key]);
      if (!Number.isFinite(value))
        errors[key] = `Укажите числовое значение: ${title.toLowerCase()}`;
      else if (value < min || value > max)
        errors[key] = `Допустимое значение: от ${min} до ${max}°`;
    }
    if (!Number.isFinite(numberValue(draft.altitude)))
      errors.altitude = "Укажите высоту над уровнем моря в метрах";
  }
  if (step === 1) {
    if (draft.antennas.length < 1 || draft.antennas.length > 10)
      errors.antennas = "Добавьте от 1 до 10 антенн";
    for (const antenna of draft.antennas) {
      if (!antenna.type.trim())
        errors[`${antenna.id}-type`] = "Укажите тип антенны";
      const min = numberValue(antenna.min),
        max = numberValue(antenna.max);
      if (!Number.isFinite(min) || min <= 0)
        errors[`${antenna.id}-min`] = "Частота должна быть больше 0 МГц";
      if (!Number.isFinite(max) || max <= 0)
        errors[`${antenna.id}-max`] = "Частота должна быть больше 0 МГц";
      else if (Number.isFinite(min) && max <= min)
        errors[`${antenna.id}-max`] =
          "Максимальная частота должна быть больше минимальной";
    }
  }
  return errors;
}

export function validatePhotos(
  photos: Pick<StationPhoto, "id">[],
  mainId: string | null,
): string | null {
  if (photos.length > 10) return "Можно добавить не больше 10 фотографий";
  if (photos.length && !photos.some((photo) => photo.id === mainId))
    return "Выберите главное фото";
  return null;
}

export async function saveStation(
  draft: StationDraft,
  photos: StationPhoto[],
  mainId: string | null,
) {
  const errors = { ...validateStep(draft, 0), ...validateStep(draft, 1) };
  if (Object.keys(errors).length || validatePhotos(photos, mainId))
    throw new Error("Проверьте данные станции");
  const record = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    name: draft.name.trim(),
    latitude: numberValue(draft.latitude),
    longitude: numberValue(draft.longitude),
    altitude: numberValue(draft.altitude),
    horizon: numberValue(draft.horizon),
    description: draft.description.trim(),
    antennas: draft.antennas.map((a) => ({
      id: a.id,
      type: a.type.trim(),
      minFrequencyMHz: numberValue(a.min),
      maxFrequencyMHz: numberValue(a.max),
    })),
    photos: photos.map((p) => ({
      id: p.id,
      name: p.file.name,
      file: p.file,
      isMain: p.id === mainId,
    })),
  };
  const db = await new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open("soniks-prototype", 1);
    request.onupgradeneeded = () =>
      request.result.createObjectStore("stations", { keyPath: "id" });
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    request.onblocked = () =>
      reject(
        new Error("Закройте другие вкладки прототипа и повторите сохранение"),
      );
  });
  try {
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction("stations", "readwrite");
      transaction.objectStore("stations").add(record);
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
      transaction.onabort = () => reject(transaction.error);
    });
  } finally {
    db.close();
  }
  return record;
}
