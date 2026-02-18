"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { CartPanel } from "@/components/products/cart-panel";
import type { ReturnTypeUseCart } from "@/components/products/types";

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
  cart: ReturnTypeUseCart;
};

export function CartDrawer({ open, onClose, cart }: CartDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={(next) => !next && onClose()}>
      <SheetContent side="right" aria-label="장바구니">
        <SheetHeader className="mb-3 flex-row items-center justify-between space-y-0">
          <SheetTitle>장바구니</SheetTitle>
          <Button variant="outline" size="sm" onClick={onClose}>
            닫기
          </Button>
        </SheetHeader>
        <CartPanel cart={cart} compact />
      </SheetContent>
    </Sheet>
  );
}
