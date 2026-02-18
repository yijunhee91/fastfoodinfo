"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";

type BrandNameProps = {
  brand: string;
  className?: string;
  logoSize?: number;
};

function isMacdonalds(brand: string) {
  return brand.trim() === "맥도날드";
}

export function BrandName({ brand, className, logoSize = 14 }: BrandNameProps) {
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      {isMacdonalds(brand) && (
        <Image
          src="/logo-macdonalds.svg"
          alt="맥도날드 로고"
          width={logoSize}
          height={logoSize}
          className="shrink-0"
        />
      )}
      <span>{brand}</span>
    </span>
  );
}
