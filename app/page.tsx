"use client";

import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Food = {
  id: string;
  name: string;
  category: string;
  servingHint: string;
  nutritionPer100g: {
    calories: number;
    carbs: number;
    protein: number;
    fat: number;
    sugar: number;
    sodium: number;
  };
};

const foods: Food[] = [
  {
    id: "chicken-breast",
    name: "닭가슴살",
    category: "단백질",
    servingHint: "100~150g",
    nutritionPer100g: {
      calories: 165,
      carbs: 0,
      protein: 31,
      fat: 3.6,
      sugar: 0,
      sodium: 74,
    },
  },
  {
    id: "brown-rice",
    name: "현미밥",
    category: "탄수화물",
    servingHint: "150~210g",
    nutritionPer100g: {
      calories: 111,
      carbs: 23,
      protein: 2.6,
      fat: 0.9,
      sugar: 0.4,
      sodium: 5,
    },
  },
  {
    id: "avocado",
    name: "아보카도",
    category: "건강한 지방",
    servingHint: "70~100g",
    nutritionPer100g: {
      calories: 160,
      carbs: 8.5,
      protein: 2,
      fat: 14.7,
      sugar: 0.7,
      sodium: 7,
    },
  },
  {
    id: "broccoli",
    name: "브로콜리",
    category: "채소",
    servingHint: "80~120g",
    nutritionPer100g: {
      calories: 34,
      carbs: 6.6,
      protein: 2.8,
      fat: 0.4,
      sugar: 1.7,
      sodium: 33,
    },
  },
  {
    id: "salmon",
    name: "연어",
    category: "단백질",
    servingHint: "100~150g",
    nutritionPer100g: {
      calories: 208,
      carbs: 0,
      protein: 20,
      fat: 13,
      sugar: 0,
      sodium: 59,
    },
  },
  {
    id: "apple",
    name: "사과",
    category: "과일",
    servingHint: "120~180g",
    nutritionPer100g: {
      calories: 52,
      carbs: 13.8,
      protein: 0.3,
      fat: 0.2,
      sugar: 10.4,
      sodium: 1,
    },
  },
];

function round(value: number) {
  return Number(value.toFixed(1));
}

function statLabel(key: keyof Food["nutritionPer100g"]) {
  if (key === "calories") return "칼로리";
  if (key === "carbs") return "탄수화물";
  if (key === "protein") return "단백질";
  if (key === "fat") return "지방";
  if (key === "sugar") return "당류";
  return "나트륨";
}

function unitLabel(key: keyof Food["nutritionPer100g"]) {
  if (key === "calories") return "kcal";
  if (key === "sodium") return "mg";
  return "g";
}

export default function Home() {
  const [selectedFoodId, setSelectedFoodId] = useState(foods[0].id);
  const [servingGram, setServingGram] = useState(120);

  const selectedFood = useMemo(
    () => foods.find((food) => food.id === selectedFoodId) ?? foods[0],
    [selectedFoodId],
  );

  const nutritionForServing = useMemo(() => {
    const ratio = servingGram / 100;

    return Object.fromEntries(
      Object.entries(selectedFood.nutritionPer100g).map(([key, value]) => [
        key,
        round(value * ratio),
      ]),
    ) as Food["nutritionPer100g"];
  }, [selectedFood, servingGram]);

  const nutritionKeys = Object.keys(
    selectedFood.nutritionPer100g,
  ) as Array<keyof Food["nutritionPer100g"]>;

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900 md:px-10">
      <main className="mx-auto grid w-full max-w-6xl gap-6 md:grid-cols-[320px_1fr]">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>음식 선택</CardTitle>
            <CardDescription>원하는 음식을 고르면 영양정보를 계산해줍니다.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {foods.map((food) => {
              const isActive = food.id === selectedFoodId;

              return (
                <Button
                  key={food.id}
                  variant={isActive ? "default" : "outline"}
                  onClick={() => setSelectedFoodId(food.id)}
                  className="flex h-auto w-full items-center justify-between gap-3 px-3 py-3"
                >
                  <span className="text-left text-sm">{food.name}</span>
                  <Badge className={isActive ? "bg-white/20 text-white" : ""}>
                    {food.category}
                  </Badge>
                </Button>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <div>
                <CardTitle>{selectedFood.name}</CardTitle>
                <CardDescription>
                  권장 1회 섭취량: {selectedFood.servingHint}
                </CardDescription>
              </div>
              <Badge>{selectedFood.category}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <section className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="mb-3 flex items-end justify-between">
                <p className="text-sm font-medium text-slate-700">섭취량</p>
                <p className="text-2xl font-bold">{servingGram}g</p>
              </div>
              <input
                className="w-full accent-slate-900"
                type="range"
                min={30}
                max={350}
                step={10}
                value={servingGram}
                onChange={(event) => setServingGram(Number(event.target.value))}
              />
            </section>

            <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {nutritionKeys.map((key) => (
                <div
                  key={key}
                  className="rounded-xl border border-slate-200 bg-white p-4"
                >
                  <p className="text-sm text-slate-500">{statLabel(key)}</p>
                  <p className="mt-1 text-2xl font-semibold">
                    {nutritionForServing[key]}
                    <span className="ml-1 text-base font-medium text-slate-500">
                      {unitLabel(key)}
                    </span>
                  </p>
                </div>
              ))}
            </section>

            <section className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">
              수치는 대략적인 참고용이며 조리법/브랜드에 따라 달라질 수 있습니다.
            </section>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
