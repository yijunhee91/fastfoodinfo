"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useDebouncedValue } from "@/hooks/use-debounced-value";
import type { Product } from "@/lib/products/types";
import {
  applyProductsViewModel,
  DEFAULT_SORT,
  parseSort,
  SORT_OPTIONS,
  uniqueOptions,
} from "@/lib/products/view-model";

type QueryPatch = {
  q?: string;
  brands?: string[];
  categories?: string[];
  sort?: string;
};

function cleanArray(values: string[]) {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)));
}

export function useProductsViewModel(products: Product[]) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const state = useMemo(() => {
    return {
      q: (searchParams.get("q") ?? "").trim(),
      brands: cleanArray(searchParams.getAll("brand")),
      categories: cleanArray(searchParams.getAll("category")),
      sort: parseSort(searchParams.get("sort")),
    };
  }, [searchParams]);

  const [searchInput, setSearchInput] = useState(() => state.q);
  const debouncedSearch = useDebouncedValue(searchInput, 250);

  const updateQuery = useCallback(
    (patch: QueryPatch) => {
      const next = new URLSearchParams(searchParams.toString());

      if (patch.q !== undefined) {
        if (patch.q.trim()) next.set("q", patch.q.trim());
        else next.delete("q");
      }

      if (patch.sort !== undefined) {
        if (patch.sort && patch.sort !== DEFAULT_SORT) next.set("sort", patch.sort);
        else next.delete("sort");
      }

      if (patch.brands !== undefined) {
        next.delete("brand");
        for (const value of cleanArray(patch.brands)) next.append("brand", value);
      }

      if (patch.categories !== undefined) {
        next.delete("category");
        for (const value of cleanArray(patch.categories)) next.append("category", value);
      }

      const query = next.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  useEffect(() => {
    if (debouncedSearch !== state.q) {
      updateQuery({ q: debouncedSearch });
    }
  }, [debouncedSearch, state.q, updateQuery]);

  const options = useMemo(() => uniqueOptions(products), [products]);
  const visibleProducts = useMemo(
    () =>
      applyProductsViewModel(products, {
        q: state.q,
        brands: state.brands,
        categories: state.categories,
        sort: state.sort,
      }),
    [products, state],
  );

  const toggleBrand = useCallback(
    (brand: string) => {
      const next = state.brands.includes(brand)
        ? state.brands.filter((item) => item !== brand)
        : [...state.brands, brand];
      updateQuery({ brands: next });
    },
    [state.brands, updateQuery],
  );

  const toggleCategory = useCallback(
    (category: string) => {
      const next = state.categories.includes(category)
        ? state.categories.filter((item) => item !== category)
        : [...state.categories, category];
      updateQuery({ categories: next });
    },
    [state.categories, updateQuery],
  );

  const resetFilters = useCallback(() => {
    updateQuery({ brands: [], categories: [] });
  }, [updateQuery]);

  const resetAll = useCallback(() => {
    setSearchInput("");
    updateQuery({ q: "", brands: [], categories: [], sort: DEFAULT_SORT });
  }, [updateQuery]);

  return {
    options,
    searchInput,
    setSearchInput,
    sortOptions: SORT_OPTIONS,
    state,
    visibleProducts,
    setSort: (sort: string) => updateQuery({ sort }),
    toggleBrand,
    toggleCategory,
    clearBrands: () => updateQuery({ brands: [] }),
    clearCategories: () => updateQuery({ categories: [] }),
    resetFilters,
    resetAll,
  };
}
