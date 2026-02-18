"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SortOption } from "@/lib/products/view-model";

type SortSelectProps = {
  value: SortOption;
  options: Array<{ value: SortOption; label: string }>;
  onChange: (value: SortOption) => void;
};

export function SortSelect({ value, options, onChange }: SortSelectProps) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <Label htmlFor="sort-select" className="text-slate-600">
        정렬
      </Label>
      <Select value={value} onValueChange={(next) => onChange(next as SortOption)}>
        <SelectTrigger id="sort-select" aria-label="정렬 선택">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
        {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
            {option.label}
            </SelectItem>
        ))}
        </SelectContent>
      </Select>
    </div>
  );
}
