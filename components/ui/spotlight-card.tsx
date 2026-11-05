"use client";

import React, { useRef, useCallback } from "react";

interface SpotlightCardProps extends React.PropsWithChildren {
  className?: string;
  spotlightColor?: string;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({ 
  children, 
  className = "",
  spotlightColor = "rgba(0, 255, 255, 0.25)"
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);

  const handleMouseEnter = useCallback(() => {
    if (divRef.current) {
      rectRef.current = divRef.current.getBoundingClientRect();
      divRef.current.style.setProperty("--spotlight-opacity", "1");
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    if (!rectRef.current) {
      rectRef.current = divRef.current.getBoundingClientRect();
    }

    const rect = rectRef.current;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    divRef.current.style.setProperty("--mouse-x", `${x}px`);
    divRef.current.style.setProperty("--mouse-y", `${y}px`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (divRef.current) {
      divRef.current.style.setProperty("--spotlight-opacity", "0");
      rectRef.current = null;
    }
  }, []);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-xl border border-neutral-800 bg-neutral-900 overflow-hidden [transform:translateZ(0)] ${className}`}
      style={{
        // Default hidden coordinates off-screen
        ["--mouse-x" as string]: "-999px",
        ["--mouse-y" as string]: "-999px",
        ["--spotlight-opacity" as string]: "0",
      }}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 ease-out"
        style={{
          opacity: "var(--spotlight-opacity, 0)",
          background: `radial-gradient(600px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), ${spotlightColor}, transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
};

export default SpotlightCard;
