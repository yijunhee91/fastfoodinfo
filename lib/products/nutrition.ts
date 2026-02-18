import type { NutrientKey } from "@/lib/products/types";

export const NUTRITION_KEYS: NutrientKey[] = [
  "calories",
  "fat",
  "saturated_fat",
  "carbs",
  "dietary_fiber",
  "sugar",
  "protein",
  "sodium",
  "caffeine",
];

export function round(value: number) {
  return Number(value.toFixed(1));
}

export function statLabel(key: NutrientKey) {
  if (key === "calories") return "칼로리";
  if (key === "fat") return "지방";
  if (key === "saturated_fat") return "포화지방";
  if (key === "carbs") return "탄수화물";
  if (key === "dietary_fiber") return "식이섬유";
  if (key === "sugar") return "당류";
  if (key === "protein") return "단백질";
  if (key === "caffeine") return "카페인";
  return "나트륨";
}

export function unitLabel(key: NutrientKey) {
  if (key === "calories") return "kcal";
  if (key === "sodium" || key === "caffeine") return "mg";
  return "g";
}

export function toNumber(value: unknown) {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}
