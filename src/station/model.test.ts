import { describe, expect, test } from "bun:test";
import {
  initialDraft,
  numberValue,
  validatePhotos,
  validateStep,
} from "./model";

function valid() {
  const draft = initialDraft();
  return {
    ...draft,
    name: "Станция",
    latitude: "55,75",
    longitude: "37.6",
    altitude: "-12",
    antennas: [{ id: "one", type: "Яги", min: "144", max: "146" }],
  };
}
describe("station validation", () => {
  test("requires all basic fields and defaults horizon to zero", () => {
    const draft = initialDraft();
    expect(draft.horizon).toBe("0");
    expect(Object.keys(validateStep(draft, 0))).toEqual([
      "name",
      "latitude",
      "longitude",
      "altitude",
    ]);
  });
  test("accepts decimal commas, zero coordinates and negative altitude", () => {
    const draft = valid();
    expect(validateStep(draft, 0)).toEqual({});
    expect(numberValue("55,75")).toBe(55.75);
    expect(
      validateStep(
        { ...draft, latitude: "0", longitude: "0", altitude: "0" },
        0,
      ),
    ).toEqual({});
  });
  test("rejects invalid coordinates and horizon", () => {
    const draft = {
      ...valid(),
      latitude: "91",
      longitude: "-181",
      horizon: "91",
    };
    expect(Object.keys(validateStep(draft, 0))).toEqual([
      "latitude",
      "longitude",
      "horizon",
    ]);
    expect(
      validateStep({ ...valid(), altitude: " " }, 0).altitude,
    ).toBeTruthy();
  });
  test("requires antenna type and an increasing positive frequency range", () => {
    const draft = valid();
    expect(validateStep(draft, 1)).toEqual({});
    draft.antennas[0] = { id: "one", type: " ", min: "146", max: "144" };
    expect(validateStep(draft, 1)["one-type"]).toBeTruthy();
    expect(validateStep(draft, 1)["one-max"]).toBeTruthy();
    draft.antennas[0] = {
      id: "one",
      type: "Диполь",
      min: "0",
      max: "Infinity",
    };
    expect(Object.keys(validateStep(draft, 1))).toHaveLength(2);
  });
  test("allows 1 to 10 antennas only", () => {
    const draft = valid();
    expect(validateStep({ ...draft, antennas: [] }, 1).antennas).toBeTruthy();
    const antennas = Array.from({ length: 10 }, (_, i) => ({
      ...draft.antennas[0],
      id: String(i),
    }));
    expect(validateStep({ ...draft, antennas }, 1)).toEqual({});
    expect(
      validateStep(
        { ...draft, antennas: [...antennas, { ...antennas[0], id: "11" }] },
        1,
      ).antennas,
    ).toBeTruthy();
  });
  test("photos are optional but need one valid main photo if present", () => {
    expect(validatePhotos([], null)).toBeNull();
    expect(validatePhotos([{ id: "a" }], null)).toBeTruthy();
    expect(validatePhotos([{ id: "a" }], "a")).toBeNull();
    expect(validatePhotos([{ id: "b" }], "a")).toBeTruthy();
    expect(
      validatePhotos(
        Array.from({ length: 11 }, (_, i) => ({ id: String(i) })),
        "0",
      ),
    ).toBeTruthy();
  });
});
