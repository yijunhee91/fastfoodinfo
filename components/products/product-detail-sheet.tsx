"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BrandName } from "@/components/products/brand-name";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ProductDetailContent } from "@/components/products/product-detail-content";
import type { Product } from "@/lib/products/types";

type ProductDetailSheetProps = {
  open: boolean;
  product: Product | null;
  onClose: () => void;
};

export function ProductDetailSheet({
  open,
  product,
  onClose,
}: ProductDetailSheetProps) {
  if (!product) return null;

  return (
    <Sheet open={open} onOpenChange={(next) => !next && onClose()}>
      <SheetContent side="bottom" aria-label="제품 영양정보 상세">
        <SheetHeader className="mb-4">
          <SheetTitle className="sr-only">제품 영양정보 상세</SheetTitle>
        </SheetHeader>
        <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500">
            <BrandName brand={product.company_name} className="align-middle" />
          </p>
          <h2 className="text-xl font-semibold">{product.product_name}</h2>
          <p className="text-sm text-slate-500">기준 중량 {product.weight_g}g</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge>{product.category || "미분류"}</Badge>
          <Button variant="outline" size="sm" onClick={onClose}>
            닫기
          </Button>
        </div>
      </div>
      <ProductDetailContent product={product} />
      </SheetContent>
    </Sheet>
  );
}
