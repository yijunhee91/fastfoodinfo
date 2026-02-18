"use client";

import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { BrandName } from "@/components/products/brand-name";

type FilterBarProps = {
  brands: string[];
  categories: string[];
  selectedBrands: string[];
  selectedCategories: string[];
  onToggleBrand: (brand: string) => void;
  onToggleCategory: (category: string) => void;
  onClearBrands: () => void;
  onClearCategories: () => void;
  onResetFilters: () => void;
};

function FilterGroup({
  title,
  options,
  selected,
  onToggle,
  onClear,
  renderOption,
}: {
  title: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
  onClear: () => void;
  renderOption?: (value: string) => ReactNode;
}) {
  return (
    <section className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-700">{title}</p>
        <Button variant="ghost" className="h-7 px-2 text-xs" onClick={onClear}>
          전체
        </Button>
      </div>
      <div className="max-h-32 space-y-1 overflow-auto rounded-lg border border-slate-200 p-2">
        {options.length === 0 ? (
          <p className="text-xs text-slate-500">옵션 없음</p>
        ) : (
          options.map((option) => (
            <div
              key={option}
              className="flex cursor-pointer items-center gap-2 rounded px-1 py-1 text-sm hover:bg-slate-50"
            >
              <Checkbox
                id={`${title}-${option}`}
                checked={selected.includes(option)}
                onCheckedChange={() => onToggle(option)}
              />
              <Label
                htmlFor={`${title}-${option}`}
                className="cursor-pointer text-sm font-normal"
              >
                {renderOption ? renderOption(option) : option}
              </Label>
            </div>
          ))
        )}
      </div>
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {selected.map((value) => (
            <Badge key={value}>{value}</Badge>
          ))}
        </div>
      )}
    </section>
  );
}

export function FilterBar({
  brands,
  categories,
  selectedBrands,
  selectedCategories,
  onToggleBrand,
  onToggleCategory,
  onClearBrands,
  onClearCategories,
  onResetFilters,
}: FilterBarProps) {
  return (
    <Card className="z-20">
      <CardHeader className="flex-row items-center justify-between pb-0">
        <CardTitle className="text-base">필터</CardTitle>
        <Button
          variant="outline"
          className="h-8 px-3 text-xs"
          onClick={onResetFilters}
        >
          초기화
        </Button>
      </CardHeader>
      <CardContent className="grid gap-4 pt-4 sm:grid-cols-2">
        <FilterGroup
          title="브랜드"
          options={brands}
          selected={selectedBrands}
          onToggle={onToggleBrand}
          onClear={onClearBrands}
          renderOption={(brand) => (
            <BrandName brand={brand} className="align-middle" />
          )}
        />
        <FilterGroup
          title="카테고리"
          options={categories}
          selected={selectedCategories}
          onToggle={onToggleCategory}
          onClear={onClearCategories}
        />
      </CardContent>
    </Card>
  );
}
