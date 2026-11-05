---
name: uilora
description: >-
  Use this skill when designing, building, or styling modern React, Next.js, or React Native UI components
  using Uilora's cinematic, animation-first component system, GPU-accelerated styling, and micro-interactions.
---

# Uilora Component & Animation System

Uilora is an animation-first, cinematic UI component system tailored for modern Next.js (App Router) and React applications. It emphasizes GPU-accelerated micro-interactions, dark cyberpunk/futuristic aesthetic tokens, and smooth state transitions.

## Core Architectural Principles

1. **Client Boundary Separation**
   - Keep page-level and container components as Server Components (`RSC`) where possible.
   - Isolate Uilora interactive and animated parts into leaf `'use client'` components.

2. **GPU-Accelerated Compositing**
   - Only animate `transform` (e.g. `translate3d`, `scale`, `rotate`) and `opacity`.
   - Never animate layout-triggering properties (`width`, `height`, `top`, `left`, `margin`, `padding`, `box-shadow`, or `filter`).
   - Use simulated glow effects via stacked `::before` / `::after` pseudo-elements whose `opacity` animates, rather than animating `box-shadow` directly.

3. **Accessibility & Motion Preference**
   - Always honor `prefers-reduced-motion`:
     ```tsx
     import { useReducedMotion } from "framer-motion";
     // If reduced motion is preferred, render static visual states or instant transitions.
     ```

## Common Component Patterns

### 1. Cinematic Glass Card with Ambient Glow
```tsx
"use client";

import { motion } from "framer-motion";

export function UiloraCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative group rounded-xl p-[1px] overflow-hidden ${className}`}>
      {/* Ambient hover glow (opacity only) */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* Content surface */}
      <div className="relative rounded-[11px] bg-neutral-950/80 backdrop-blur-md p-6 border border-white/10 h-full">
        {children}
      </div>
    </div>
  );
}
```

### 2. High-Performance Shimmer / Edge Sweep
- Instead of animating layout properties, use CSS `transform: translateX(...)` with `contain: paint`:
```css
@keyframes uilora-sweep {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
.uilora-shimmer {
  will-change: transform;
  animation: uilora-sweep 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}
```

### 3. Progressive Counter / Status Indicator
- Avoid frequent React state updates (e.g., `setInterval` updating state every frame) as that forces tree re-renders.
- Use a single `requestAnimationFrame` loop updating the DOM element directly via a `ref`, or drive the fill via `transform: scaleX(...)` with `transform-origin: left`.

