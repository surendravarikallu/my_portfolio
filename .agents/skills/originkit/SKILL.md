---
name: originkit
description: >-
  Use this skill when implementing animated interactive elements, magnetic buttons, parallax sections,
  and smooth scroll-triggered component patterns from OriginKit for React, Next.js, and Framer Motion.
---

# OriginKit Interactive Component Library

OriginKit provides clean, animated UI components and micro-interactions designed to elevate modern web interfaces. It bridges fluid physics-based interactions with modern React and Tailwind CSS.

## Key Design & Engineering Guidelines

1. **Lightweight Micro-Interactions**
   - OriginKit components emphasize responsive physics (springs, magnetic pull, tilt) without blocking the browser's main thread.
   - Use `useSpring` and `useMotionValue` in Framer Motion so updates bypass React's virtual DOM reconciliation loop.

2. **Magnetic & Cursor Interactions**
   - When tracking pointer movement, throttle or map values directly to motion values rather than triggering `useState` re-renders.
   - Cache element bounding boxes (`getBoundingClientRect`) upon entry or scroll rather than recalculating them on every mousemove tick to prevent forced reflows.

## Popular Patterns

### 1. Magnetic Wrapper (Physics-driven Button / Badge)
```tsx
"use client";

import { useRef } from "react";
import { motion, useSpring } from "framer-motion";

interface MagneticProps {
  children: React.ReactNode;
  range?: number;
  strength?: number;
}

export function OriginMagnetic({ children, range = 100, strength = 0.35 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 150, damping: 15 });
  const y = useSpring(0, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);

    if (dist < range) {
      x.set((e.clientX - centerX) * strength);
      y.set((e.clientY - centerY) * strength);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}
```

### 2. Viewport-Triggered Parallax / Scroll Reveal
- Observe elements using `IntersectionObserver` before running animations.
- Once in view, trigger the animation and optionally `unobserve` to free browser resources:
```tsx
"use client";

import { useEffect, useRef, useState } from "react";

export function OriginReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.15 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
}
```

