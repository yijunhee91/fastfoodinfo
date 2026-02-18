"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BrandName } from "@/components/products/brand-name";
import type { ReturnTypeUseCart } from "@/components/products/types";

type CartPanelProps = {
  cart: ReturnTypeUseCart;
  compact?: boolean;
};

function macroItem(label: string, value: number, unit: string) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-2">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="text-base font-semibold">
        {value}
        <span className="ml-1 text-xs font-medium text-slate-500">{unit}</span>
      </p>
    </div>
  );
}

export function CartPanel({ cart, compact = false }: CartPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>장바구니</CardTitle>
        <CardDescription>
          담긴 메뉴 수량을 조절하고 영양 총합을 확인하세요.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          {macroItem("총 칼로리", cart.totals.calories, "kcal")}
          {macroItem("총 단백질", cart.totals.protein, "g")}
          {macroItem("총 탄수화물", cart.totals.carbs, "g")}
          {macroItem("총 지방", cart.totals.fat, "g")}
          {macroItem("총 나트륨", cart.totals.sodium, "mg")}
        </div>

        {cart.lines.length === 0 ? (
          <p className="rounded-lg border border-dashed border-slate-300 p-4 text-sm text-slate-500">
            아직 담긴 제품이 없습니다.
          </p>
        ) : (
          <div className="space-y-2">
            {cart.lines.map((line) => (
              <div
                key={line.product.id}
                className="flex items-center justify-between gap-2 rounded-lg border border-slate-200 p-3"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    {line.product.product_name}
                  </p>
                  <p className="text-xs text-slate-500">
                    <BrandName
                      brand={line.product.company_name}
                      className="align-middle"
                    />
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    className="h-7 w-7 px-0"
                    onClick={() => cart.decrease(line.product.id)}
                    aria-label={`${line.product.product_name} 수량 감소`}
                  >
                    -
                  </Button>
                  <span className="w-6 text-center text-sm font-medium">
                    {line.quantity}
                  </span>
                  <Button
                    variant="outline"
                    className="h-7 w-7 px-0"
                    onClick={() => cart.increase(line.product.id)}
                    aria-label={`${line.product.product_name} 수량 증가`}
                  >
                    +
                  </Button>
                  <Button
                    variant="ghost"
                    className="h-7 px-2 text-xs"
                    onClick={() => cart.remove(line.product.id)}
                  >
                    삭제
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* <div className="rounded-lg bg-slate-900 p-3 text-sm text-white">
          총합: {cart.totals.calories} kcal | 단백질 {cart.totals.protein}g |
          탄수화물 {cart.totals.carbs}g | 지방 {cart.totals.fat}g
        </div> */}

        <div className="flex justify-end">
          <Button
            variant="outline"
            className={compact ? "h-8 px-3 text-xs" : ""}
            onClick={cart.clear}
            disabled={cart.lines.length === 0}
          >
            전체 비우기
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
