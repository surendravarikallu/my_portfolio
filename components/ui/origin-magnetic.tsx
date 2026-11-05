"use client";

import React, { useRef, useCallback } from "react";
import { motion, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface OriginMagneticProps {
  children: React.ReactNode;
  range?: number;
  strength?: number;
  className?: string;
}

export function OriginMagnetic({
  children,
  range = 80,
  strength = 0.25,
  className = "",
}: OriginMagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const x = useSpring(0, { stiffness: 200, damping: 18, mass: 0.5 });
  const y = useSpring(0, { stiffness: 200, damping: 18, mass: 0.5 });

  const handleMouseEnter = useCallback(() => {
    if (ref.current) {
      rectRef.current = ref.current.getBoundingClientRect();
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (prefersReducedMotion || !ref.current) return;
      if (!rectRef.current) {
        rectRef.current = ref.current.getBoundingClientRect();
      }

      const rect = rectRef.current;
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);

      if (dist < range) {
        x.set((e.clientX - centerX) * strength);
        y.set((e.clientY - centerY) * strength);
      } else {
        x.set(0);
        y.set(0);
      }
    },
    [range, strength, prefersReducedMotion, x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    rectRef.current = null;
  }, [x, y]);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}

