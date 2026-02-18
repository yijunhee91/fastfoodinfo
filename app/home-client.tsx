"use client";

import { useEffect, useMemo, useState } from "react";

import { CartDrawer } from "@/components/products/cart-drawer";
import { CartPanel } from "@/components/products/cart-panel";
import { ProductDetailPanel } from "@/components/products/product-detail-panel";
import { ProductDetailSheet } from "@/components/products/product-detail-sheet";
import { ProductListView } from "@/components/products/product-list-view";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/hooks/use-cart";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useProductsViewModel } from "@/hooks/use-products-view-model";
import { toNumber } from "@/lib/products/nutrition";
import type { Product } from "@/lib/products/types";
import { supabase } from "@/lib/supabase/client";

export function HomeClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);
  const [mobileCartOpen, setMobileCartOpen] = useState(false);

  const isMobile = useMediaQuery("(max-width: 1023px)");

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      setErrorMessage(null);

      if (!supabase) {
        setErrorMessage(
          "Supabase 환경변수가 없습니다. NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY (또는 NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY)를 설정해주세요.",
        );
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("foods")
        .select(
          "id, company_name, product_name, weight_g, calories, fat, saturated_fat, carbs, dietary_fiber, sugar, protein, sodium, caffeine, category, note",
        )
        .order("company_name", { ascending: true })
        .order("product_name", { ascending: true });

      if (error) {
        setErrorMessage(error.message);
        setLoading(false);
        return;
      }

      const normalized: Product[] = (data ?? []).map((row) => ({
        id: row.id,
        company_name: row.company_name,
        product_name: row.product_name,
        weight_g: toNumber(row.weight_g),
        calories: toNumber(row.calories),
        fat: toNumber(row.fat),
        saturated_fat: toNumber(row.saturated_fat),
        carbs: toNumber(row.carbs),
        dietary_fiber: toNumber(row.dietary_fiber),
        sugar: toNumber(row.sugar),
        protein: toNumber(row.protein),
        sodium: toNumber(row.sodium),
        caffeine: toNumber(row.caffeine),
        category: row.category ?? "",
        note: row.note,
      }));

      setProducts(normalized);
      setLoading(false);
    }

    fetchProducts();
  }, []);

  const viewModel = useProductsViewModel(products);
  const cart = useCart(products);

  const effectiveSelectedProductId = useMemo(() => {
    if (viewModel.visibleProducts.length === 0) return null;
    const stillVisible = viewModel.visibleProducts.some(
      (product) => product.id === selectedProductId,
    );
    return stillVisible ? selectedProductId : viewModel.visibleProducts[0].id;
  }, [selectedProductId, viewModel.visibleProducts]);

  const selectedProduct = useMemo(
    () => products.find((product) => product.id === effectiveSelectedProductId) ?? null,
    [effectiveSelectedProductId, products],
  );

  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId);
    if (isMobile) setMobileDetailOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900 md:px-10">
        <main className="mx-auto w-full max-w-7xl">
          <Card>
            <CardHeader>
              <CardTitle>데이터 불러오는 중</CardTitle>
              <CardDescription>Supabase foods 테이블을 조회하고 있습니다.</CardDescription>
            </CardHeader>
          </Card>
        </main>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900 md:px-10">
        <main className="mx-auto w-full max-w-7xl">
          <Card>
            <CardHeader>
              <CardTitle>연결 오류</CardTitle>
              <CardDescription>{errorMessage}</CardDescription>
            </CardHeader>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-6 text-slate-900 md:px-10">
      <main className="mx-auto grid w-full max-w-7xl gap-4 lg:grid-cols-[minmax(0,1fr)_380px]">
        <ProductListView
          products={viewModel.visibleProducts}
          selectedProductId={effectiveSelectedProductId}
          onSelectProduct={handleSelectProduct}
          onAddToCart={cart.add}
          searchInput={viewModel.searchInput}
          onSearchInputChange={viewModel.setSearchInput}
          sort={viewModel.state.sort}
          sortOptions={viewModel.sortOptions}
          onSortChange={viewModel.setSort}
          brandOptions={viewModel.options.brands}
          categoryOptions={viewModel.options.categories}
          selectedBrands={viewModel.state.brands}
          selectedCategories={viewModel.state.categories}
          onToggleBrand={viewModel.toggleBrand}
          onToggleCategory={viewModel.toggleCategory}
          onClearBrands={viewModel.clearBrands}
          onClearCategories={viewModel.clearCategories}
          onResetFilters={viewModel.resetFilters}
          onResetAll={viewModel.resetAll}
        />

        <aside className="sticky top-4 hidden self-start space-y-4 lg:block">
          <ProductDetailPanel product={selectedProduct} />
          <CartPanel cart={cart} />
        </aside>
      </main>

      <div className="fixed bottom-4 right-4 z-30 lg:hidden">
        <Button
          className="h-12 rounded-full px-4 shadow-lg"
          onClick={() => setMobileCartOpen(true)}
          aria-label="장바구니 열기"
        >
          장바구니 {cart.itemCount}
        </Button>
      </div>

      <ProductDetailSheet
        open={mobileDetailOpen}
        product={selectedProduct}
        onClose={() => setMobileDetailOpen(false)}
      />
      <CartDrawer
        open={mobileCartOpen}
        onClose={() => setMobileCartOpen(false)}
        cart={cart}
      />
    </div>
  );
}
