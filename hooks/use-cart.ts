"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import {
  calculateCartTotals,
  cartLinesFromProducts,
  normalizeQuantityMap,
  type CartQuantityMap,
} from "@/lib/cart/cart";
import type { Product } from "@/lib/products/types";

const STORAGE_KEY = "fastfoodinfo-cart";

export function useCart(products: Product[]) {
  const [quantityMap, setQuantityMap] = useState<CartQuantityMap>(() => {
    if (typeof window === "undefined") return {};

    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return {};
      return normalizeQuantityMap(JSON.parse(raw));
    } catch {
      return {};
    }
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(quantityMap));
  }, [quantityMap]);

  const lines = useMemo(
    () => cartLinesFromProducts(products, quantityMap),
    [products, quantityMap],
  );
  const totals = useMemo(() => calculateCartTotals(lines), [lines]);
  const itemCount = useMemo(
    () => lines.reduce((sum, line) => sum + line.quantity, 0),
    [lines],
  );

  const add = useCallback((productId: string) => {
    setQuantityMap((prev) => ({ ...prev, [productId]: (prev[productId] ?? 0) + 1 }));
  }, []);

  const increase = useCallback((productId: string) => add(productId), [add]);

  const decrease = useCallback((productId: string) => {
    setQuantityMap((prev) => {
      const current = prev[productId] ?? 0;
      if (current <= 1) {
        const rest = { ...prev };
        delete rest[productId];
        return rest;
      }
      return { ...prev, [productId]: current - 1 };
    });
  }, []);

  const remove = useCallback((productId: string) => {
    setQuantityMap((prev) => {
      const rest = { ...prev };
      delete rest[productId];
      return rest;
    });
  }, []);

  const clear = useCallback(() => setQuantityMap({}), []);

  return {
    lines,
    totals,
    itemCount,
    add,
    increase,
    decrease,
    remove,
    clear,
  };
}
