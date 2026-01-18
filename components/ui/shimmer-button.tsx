"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    shimmerColor?: string;
    shimmerSize?: string;
    borderRadius?: string;
    shimmerDuration?: string;
    background?: string;
    className?: string;
    children?: React.ReactNode;
}

const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
    (
        {
            shimmerColor = "#ffffff",
            shimmerSize = "0.05em",
            shimmerDuration = "3s",
            borderRadius = "100px",
            background = "rgba(0, 0, 0, 1)",
            className,
            children,
            ...props
        },
        ref,
    ) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "group relative cursor-pointer overflow-hidden whitespace-nowrap px-6 py-3 font-medium transition-all duration-300 active:scale-95",
                    className,
                )}
                style={
                    {
                        "--spread": "90deg",
                        "--shimmer-color": shimmerColor,
                        "--radius": borderRadius,
                        "--speed": shimmerDuration,
                        "--cut": shimmerSize,
                        "--bg": background,
                        borderRadius: borderRadius,
                    } as React.CSSProperties
                }
                {...props}
            >
                {/* Sparkle container */}
                <div
                    className={cn(
                        "-z-30 blur-[2px]",
                        "absolute inset-0 overflow-visible [container-type:size]",
                    )}
                >
                    {/* Sparkle */}
                    <div className="absolute inset-0 h-[100cqh] animate-slide [aspect-ratio:1] [border-radius:0] [mask:none]">
                        {/* Sparkle content */}
                        <div className="animate-spin-around absolute inset-[-100%] w-auto rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] [translate:0_0]" />
                    </div>
                </div>
                {/* Backdrop */}
                <div className="absolute inset-[var(--cut)] -z-20 rounded-[calc(var(--radius)-var(--cut))] bg-[var(--bg)]" />

                {/* Content */}
                <span className="relative z-10 flex items-center justify-center gap-2">
                    {children}
                </span>
            </button>
        );
    },
);

ShimmerButton.displayName = "ShimmerButton";

export default ShimmerButton;
