import React, { forwardRef, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export const NeonButton = forwardRef<HTMLButtonElement, NeonButtonProps>(
  ({ className, variant = "primary", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center px-6 py-3 font-medium text-white transition-all duration-300 rounded-lg group overflow-hidden border",
          variant === "primary"
            ? "bg-cyan-950/50 border-cyan-500/50 hover:bg-cyan-900/60 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
            : "bg-purple-950/50 border-purple-500/50 hover:bg-purple-900/60 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]",
          className
        )}
        {...props}
      >
        <span className="relative z-10 tracking-wider text-sm uppercase">{children}</span>
        <div className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-lg",
          variant === "primary" ? "bg-cyan-400" : "bg-purple-400"
        )} />
      </button>
    );
  }
);
NeonButton.displayName = "NeonButton";
