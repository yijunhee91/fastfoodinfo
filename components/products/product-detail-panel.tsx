"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BrandName } from "@/components/products/brand-name";
import { ProductDetailContent } from "@/components/products/product-detail-content";
import type { Product } from "@/lib/products/types";

type ProductDetailPanelProps = {
  product: Product | null;
};

export function ProductDetailPanel({ product }: ProductDetailPanelProps) {
  if (!product) {
    return (
      <Card className="top-4">
        <CardHeader>
          <CardTitle>선택된 제품 없음</CardTitle>
          <CardDescription>리스트에서 제품을 선택하세요.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle>{product.product_name}</CardTitle>
            <CardDescription>
              <BrandName
                brand={product.company_name}
                className="mr-1 align-middle"
              />
              | 기준 중량 {product.weight_g}g
            </CardDescription>
          </div>
          <Badge>{product.category || "미분류"}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ProductDetailContent product={product} />
      </CardContent>
    </Card>
  );
}
