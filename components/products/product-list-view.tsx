"use client";

import { FilterBar } from "@/components/products/filter-bar";
import { ProductRow } from "@/components/products/product-row";
import { SortSelect } from "@/components/products/sort-select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { Product } from "@/lib/products/types";
import type { SortOption } from "@/lib/products/view-model";

type ProductListViewProps = {
  products: Product[];
  selectedProductId: string | null;
  onSelectProduct: (productId: string) => void;
  onAddToCart: (productId: string) => void;
  searchInput: string;
  onSearchInputChange: (value: string) => void;
  sort: SortOption;
  sortOptions: Array<{ value: SortOption; label: string }>;
  onSortChange: (value: SortOption) => void;
  brandOptions: string[];
  categoryOptions: string[];
  selectedBrands: string[];
  selectedCategories: string[];
  onToggleBrand: (brand: string) => void;
  onToggleCategory: (category: string) => void;
  onClearBrands: () => void;
  onClearCategories: () => void;
  onResetFilters: () => void;
  onResetAll: () => void;
};

export function ProductListView({
  products,
  selectedProductId,
  onSelectProduct,
  onAddToCart,
  searchInput,
  onSearchInputChange,
  sort,
  sortOptions,
  onSortChange,
  brandOptions,
  categoryOptions,
  selectedBrands,
  selectedCategories,
  onToggleBrand,
  onToggleCategory,
  onClearBrands,
  onClearCategories,
  onResetFilters,
  onResetAll,
}: ProductListViewProps) {
  return (
    <div className="space-y-4">
      <FilterBar
        brands={brandOptions}
        categories={categoryOptions}
        selectedBrands={selectedBrands}
        selectedCategories={selectedCategories}
        onToggleBrand={onToggleBrand}
        onToggleCategory={onToggleCategory}
        onClearBrands={onClearBrands}
        onClearCategories={onClearCategories}
        onResetFilters={onResetFilters}
      />

      <Card>
        <CardHeader className="space-y-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-lg">메뉴 리스트</CardTitle>
            <SortSelect value={sort} options={sortOptions} onChange={onSortChange} />
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input
              type="search"
              value={searchInput}
              onChange={(event) => onSearchInputChange(event.target.value)}
              className="h-10 flex-1"
              placeholder="제품명 검색"
              aria-label="제품명 검색"
            />
            <Button variant="outline" onClick={onResetAll}>
              전체 초기화
            </Button>
          </div>
          <p className="text-sm text-slate-500">총 {products.length}개 결과</p>
        </CardHeader>
        <CardContent className="space-y-3">
          {products.length === 0 ? (
            <p className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
              검색/필터 조건에 맞는 제품이 없습니다.
            </p>
          ) : (
            products.map((product) => (
              <ProductRow
                key={product.id}
                product={product}
                active={selectedProductId === product.id}
                onSelect={() => onSelectProduct(product.id)}
                onAddToCart={() => onAddToCart(product.id)}
              />
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
