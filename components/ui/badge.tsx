import * as React from "react";

import { cn } from "@/lib/utils";

function Badge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="badge"
      className={cn(
        "w-fit inline-flex items-center rounded-lg bg-slate-100 px-1 py-1 text-xs font-medium text-slate-700",
        className,
      )}
      {...props}
    />
  );
}

export { Badge };
