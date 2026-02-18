"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BrandName } from "@/components/products/brand-name";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/products/types";

type ProductRowProps = {
  product: Product;
  active: boolean;
  onSelect: () => void;
  onAddToCart: () => void;
};

export function ProductRow({
  product,
  active,
  onSelect,
  onAddToCart,
}: ProductRowProps) {
  return (
    <article
      className={cn(
        "cursor-pointer rounded-xl border p-4 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300",
        active ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white",
      )}
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect();
        }
      }}
      aria-label={`${product.product_name} 상세 보기`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <p className="text-sm opacity-80">
            <BrandName brand={product.company_name} className="align-middle" />
          </p>
          <h3 className="text-lg font-semibold">{product.product_name}</h3>
          <p className={cn("mt-1 text-xs", active ? "text-white/80" : "text-slate-500")}>
            기준 중량 {product.weight_g}g
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Badge className={active ? "bg-white/20 text-white" : ""}>
            {product.category || "미분류"}
          </Badge>
          <Button
            variant={active ? "ghost" : "outline"}
            className={cn("h-8 px-3 text-xs", active && "text-white hover:bg-white/20")}
            onClick={(event) => {
              event.stopPropagation();
              onAddToCart();
            }}
          >
            담기
          </Button>
        </div>
      </div>
      <div className={cn("mt-3 grid grid-cols-4 gap-2 text-xs", active ? "text-white/90" : "text-slate-600")}>
        <div>칼로리 {product.calories}kcal</div>
        <div>단백질 {product.protein}g</div>
        <div>탄수화물 {product.carbs}g</div>
        <div>지방 {product.fat}g</div>
      </div>
    </article>
  );
}
