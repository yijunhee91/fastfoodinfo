import * as React from "react";

import { cn } from "@/lib/utils";

type ButtonProps = React.ComponentProps<"button"> & {
  variant?: "default" | "outline" | "ghost";
};

function buttonClasses(variant: NonNullable<ButtonProps["variant"]>) {
  if (variant === "outline") {
    return "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50";
  }

  if (variant === "ghost") {
    return "bg-transparent text-slate-700 hover:bg-slate-100";
  }

  return "bg-slate-900 text-white hover:bg-slate-800";
}

function Button({ className, variant = "default", ...props }: ButtonProps) {
  return (
    <button
      data-slot="button"
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-lg px-4 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
        buttonClasses(variant),
        className,
      )}
      {...props}
    />
  );
}

export { Button };
