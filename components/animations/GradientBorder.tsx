"use client";

import React from "react";

interface GradientBorderProps {
  children: React.ReactNode;
  className?: string;
  borderColor1?: string;
  borderColor2?: string;
  borderColor3?: string;
  speed?: number;
}

export const GradientBorder: React.FC<GradientBorderProps> = ({
  children,
  className = "",
  borderColor1 = "rgba(6, 182, 212, 0.6)",
  borderColor2 = "rgba(139, 92, 246, 0.6)",
  borderColor3 = "rgba(236, 72, 153, 0.4)",
  speed = 4,
}) => {
  return (
    <div
      className={`gradient-border-card ${className}`}
      style={{
        "--border-color-1": borderColor1,
        "--border-color-2": borderColor2,
        "--border-color-3": borderColor3,
        animationDuration: `${speed}s`,
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
};
