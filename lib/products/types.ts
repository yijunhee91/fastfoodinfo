export type NutrientKey =
  | "calories"
  | "fat"
  | "saturated_fat"
  | "carbs"
  | "dietary_fiber"
  | "sugar"
  | "protein"
  | "sodium"
  | "caffeine";

export type Product = {
  id: string;
  company_name: string;
  product_name: string;
  weight_g: number;
  calories: number;
  fat: number;
  saturated_fat: number;
  carbs: number;
  dietary_fiber: number;
  sugar: number;
  protein: number;
  sodium: number;
  caffeine: number;
  category: string;
  note: string | null;
};
