import type { Product } from "@/lib/products/types";

export type SortOption =
  | "calories_asc"
  | "calories_desc"
  | "protein_desc"
  | "protein_asc"
  | "carbs_asc"
  | "carbs_desc";

export const SORT_OPTIONS: Array<{ value: SortOption; label: string }> = [
  { value: "calories_asc", label: "칼로리 낮은순" },
  { value: "calories_desc", label: "칼로리 높은순" },
  { value: "protein_desc", label: "단백질 높은순" },
  { value: "protein_asc", label: "단백질 낮은순" },
  { value: "carbs_asc", label: "탄수화물 낮은순" },
  { value: "carbs_desc", label: "탄수화물 높은순" },
];

export type ProductsQueryState = {
  q: string;
  brands: string[];
  categories: string[];
  sort: SortOption;
};

export const DEFAULT_SORT: SortOption = "protein_desc";

export function parseSort(value: string | null): SortOption {
  return SORT_OPTIONS.some((item) => item.value === value)
    ? (value as SortOption)
    : DEFAULT_SORT;
}

export function uniqueOptions(products: Product[]) {
  const brands = Array.from(
    new Set(products.map((product) => product.company_name).filter(Boolean)),
  ).sort((a, b) => a.localeCompare(b, "ko"));
  const categories = Array.from(
    new Set(products.map((product) => product.category).filter(Boolean)),
  ).sort((a, b) => a.localeCompare(b, "ko"));

  return { brands, categories };
}

export function applyProductsViewModel(
  products: Product[],
  state: ProductsQueryState,
) {
  const q = state.q.trim().toLowerCase();
  const brandSet = new Set(state.brands);
  const categorySet = new Set(state.categories);

  const filtered = products.filter((product) => {
    const byQ = q ? product.product_name.toLowerCase().includes(q) : true;
    const byBrand =
      brandSet.size > 0 ? brandSet.has(product.company_name) : true;
    const byCategory =
      categorySet.size > 0 ? categorySet.has(product.category) : true;

    return byQ && byBrand && byCategory;
  });

  return [...filtered].sort((a, b) => {
    if (state.sort === "calories_asc") return a.calories - b.calories;
    if (state.sort === "calories_desc") return b.calories - a.calories;
    if (state.sort === "protein_desc") return b.protein - a.protein;
    if (state.sort === "protein_asc") return a.protein - b.protein;
    if (state.sort === "carbs_asc") return a.carbs - b.carbs;
    return b.carbs - a.carbs;
  });
}
