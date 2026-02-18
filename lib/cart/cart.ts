import { round } from "@/lib/products/nutrition";
import type { Product } from "@/lib/products/types";

export const CART_TOTAL_KEYS = ["calories", "protein", "carbs", "fat", "sodium"] as const;
export type CartTotalKey = (typeof CART_TOTAL_KEYS)[number];

export type CartQuantityMap = Record<string, number>;

export type CartLine = {
  product: Product;
  quantity: number;
};

export function normalizeQuantityMap(value: unknown): CartQuantityMap {
  if (!value || typeof value !== "object") return {};

  const entries = Object.entries(value as Record<string, unknown>)
    .filter(([key, qty]) => Boolean(key) && Number.isFinite(Number(qty)))
    .map(([key, qty]) => [key, Math.max(0, Math.floor(Number(qty)))]);

  return Object.fromEntries(entries);
}

export function cartLinesFromProducts(
  products: Product[],
  quantityMap: CartQuantityMap,
): CartLine[] {
  const productMap = new Map(products.map((product) => [product.id, product]));

  return Object.entries(quantityMap)
    .map(([id, quantity]) => {
      const product = productMap.get(id);
      if (!product || quantity <= 0) return null;
      return { product, quantity };
    })
    .filter((item): item is CartLine => Boolean(item));
}

export function calculateCartTotals(lines: CartLine[]) {
  const totals: Record<CartTotalKey, number> = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    sodium: 0,
  };

  for (const line of lines) {
    totals.calories += line.product.calories * line.quantity;
    totals.protein += line.product.protein * line.quantity;
    totals.carbs += line.product.carbs * line.quantity;
    totals.fat += line.product.fat * line.quantity;
    totals.sodium += line.product.sodium * line.quantity;
  }

  return {
    calories: round(totals.calories),
    protein: round(totals.protein),
    carbs: round(totals.carbs),
    fat: round(totals.fat),
    sodium: round(totals.sodium),
  };
}
