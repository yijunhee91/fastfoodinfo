"use client";

import { useMemo } from "react";

import { Badge } from "@/components/ui/badge";
import {
  NUTRITION_KEYS,
  round,
  statLabel,
  unitLabel,
} from "@/lib/products/nutrition";
import type { NutrientKey, Product } from "@/lib/products/types";

type ProductDetailContentProps = {
  product: Product;
};

export function ProductDetailContent({ product }: ProductDetailContentProps) {
  const servingGram = product.weight_g;

  const nutritionForServing = useMemo(() => {
    const ratio = servingGram / product.weight_g;

    return NUTRITION_KEYS.reduce<Record<NutrientKey, number>>(
      (acc, key) => {
        acc[key] = round(product[key] * ratio);
        return acc;
      },
      {} as Record<NutrientKey, number>,
    );
  }, [product, servingGram]);

  const macroCalories = useMemo(() => {
    const proteinKcal = nutritionForServing.protein * 4;
    const carbsKcal = nutritionForServing.carbs * 4;
    const fatKcal = nutritionForServing.fat * 9;
    const total = Math.max(nutritionForServing.calories, 1);

    const items = [
      {
        key: "protein",
        label: "단백질",
        unit: "g",
        value: nutritionForServing.protein,
        percent: round((proteinKcal / total) * 100),
      },
      {
        key: "carbs",
        label: "탄수",
        unit: "g",
        value: nutritionForServing.carbs,
        percent: round((carbsKcal / total) * 100),
      },
      {
        key: "fat",
        label: "지방",
        unit: "g",
        value: nutritionForServing.fat,
        percent: round((fatKcal / total) * 100),
      },
    ];

    const sorted = [...items].sort((a, b) => b.percent - a.percent);
    const rankMap = new Map<string, number>(
      sorted.map((item, index) => [item.key, index]),
    );

    return items.map((item) => ({
      ...item,
      rank: rankMap.get(item.key) ?? 2,
    }));
  }, [nutritionForServing]);

  const otherNutrients: NutrientKey[] = [
    "saturated_fat",
    "dietary_fiber",
    "sugar",
    "sodium",
    "caffeine",
  ];

  return (
    <div className="space-y-4">
      <section className="rounded-xl border border-slate-200 bg-white p-4">
        <p className="mb-3 text-sm text-slate-500">기준 중량 {servingGram}g</p>
        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_2fr]">
          <div className="flex flex-col items-center justify-center">
            <p className="text-3xl font-extrabold leading-none">
              {nutritionForServing.calories}
            </p>
            <p className="mt-2 text-xs text-slate-500">칼로리 (kcal)</p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {macroCalories.map((item) => (
              <div
                key={item.key}
                className="flex flex-col gap-y-1 items-center"
              >
                <Badge
                  className={
                    item.rank === 0
                      ? "bg-emerald-100 text-emerald-700"
                      : item.rank === 1
                        ? "bg-amber-100 text-amber-700"
                        : "bg-rose-100 text-rose-700"
                  }
                >
                  {item.percent}%
                </Badge>
                <p className="mt-1 text-lg font-bold leading-none">
                  {item.value}
                  <span className="ml-0.5 text-xs font-medium text-slate-500">
                    {item.unit}
                  </span>
                </p>
                <p className="mt-1 text-xs text-slate-500">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <tbody>
            {otherNutrients.map((key) => (
              <tr
                key={key}
                className="border-t border-slate-100 first:border-t-0"
              >
                <th className="w-1/2 bg-slate-50 px-3 py-2 text-left text-xs font-medium text-slate-600">
                  {statLabel(key)}
                </th>
                <td className="px-3 py-2 text-right font-semibold">
                  {nutritionForServing[key]}
                  <span className="ml-1 text-xs font-medium text-slate-500">
                    {unitLabel(key)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">
        {product.note ??
          "수치는 대략적인 참고용이며 실제 제품/국가 기준에 따라 달라질 수 있습니다."}
      </section>
    </div>
  );
}
