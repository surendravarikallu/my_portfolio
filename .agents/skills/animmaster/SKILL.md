---
name: animmaster
description: >-
  Use this skill when developing advanced, PRO-level animated web components, WebGL/Three.js shaders,
  3D cards, canvas particle systems, and award-winning interactive UI effects from Animmaster Lib (animmasterlib.dev).
---

# Animmaster Library (PRO Animated UI Toolkit - animmasterlib.dev)

Animmaster Lib provides ~300 high-end, production-ready animated components and creative coding recipes inspired by award-winning web products across 14 categories. It blends Next.js (App Router), React, Tailwind CSS, Framer Motion, and Three.js / WebGL shaders.

## 1. Catalog Architecture & Categories (~300 Components)

When building or integrating Animmaster Lib components into a project, align them with the 14 core categories:

1. **Scroll Animations (~71 items)**: Scrubbed timelines, sticky section pins, horizontal parallax tracks, progress-linked transforms.
2. **Hover & Mouse Effects (~42 items)**: Magnetic wrappers, dynamic cursor spotlights, gyro tilt cards, ripple trails.
3. **Sliders & Carousels (~25 items)**: 3D perspective carousels, coverflow decks, infinite marquee ribbons, swipe stacks.
4. **Hero Sections (~24 items)**: Immersive cyberpunk/futuristic headers, floating 3D geometry backdrops, kinetic grid layers.
5. **3D Animations (~23 items)**: Three.js / React Three Fiber interactive viewports, particle fields, floating mesh scenes.
6. **WebGL Shaders (~19 items)**: GPU fragment shaders, simplex noise warps, chromatic aberration, liquid distortion passes.
7. **Text Animations (~18 items)**: Split-character reveals, kinetic typography, scramble text, glitch headers.
8. **Navigation & Menus**: Fullscreen overlay morphs, dock menus, perspective drawer links.
9. **Page Transitions & Reveal Masks**: SVG path morph transitions, clip-path curtain wipes.
10. **Backgrounds & Ambience**: Aurora gradients, CRT scanline grids, floating dust particles.

---

## 2. Framework & Performance Standards

To prevent heavy visual effects from hurting Lighthouse performance and frame rates (especially in Next.js + Tailwind stacks):

### A. Next.js App Router & SSR Boundaries
- Any component using Three.js (`@react-three/fiber`), `window`, mouse events, or WebGL **must** be isolated with `'use client'`.
- Load Three.js and heavy Canvas scenes dynamically with SSR disabled:
  ```tsx
  import dynamic from "next/dynamic";
  const AnimmasterScene = dynamic(() => import("./AnimmasterScene"), { ssr: false });
  ```

### B. Hardware-Accelerated Compositing (Zero Layout Thrashing)
- **Only animate `transform` and `opacity`**.
- Never animate layout properties (`width`, `height`, `top`, `left`, `margin`, `padding`, `box-shadow`, or `filter`).
- For glows: Use pseudo-elements (`::before`/`::after`) with pre-rendered gradients or opacity transitions instead of animating `box-shadow`.
- For progress bars: Use `transform: scaleX(...)` with `transform-origin: left` instead of animating `width`.

### C. WebGL / Three.js Resource Management
- **DPR Clamping**: Always cap `devicePixelRatio` to 2: `dpr={[1, 2]}`.
- **Intersection Pausing**: Pause Three.js render loops (`useFrame`) when the component container scrolls out of the viewport.
- **Passive Scroll Listeners**: Never read `window.scrollY` inside `useFrame`. Track scroll with a single passive listener:
  ```ts
  let scrollY = 0;
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => { scrollY = window.scrollY; }, { passive: true });
  }
  ```

### D. Accessibility & Motion
- Always wrap complex physics and infinite loops in `prefers-reduced-motion` fallbacks:
  ```tsx
  import { useReducedMotion } from "framer-motion";
  // Fall back to instant transition or static frame when true
  ```

---

## 3. Signature Component Implementations

### Pattern A: WebGL Shader Canvas (Background / Mesh Distortion)
```tsx
"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  varying vec2 vUv;

  void main() {
    vec2 p = vUv * 2.0 - 1.0;
    float len = length(p);
    float wave = sin(len * 10.0 - uTime * 2.0);
    vec3 col = mix(vec3(0.02, 0.71, 0.83), vec3(0.55, 0.36, 0.96), wave * 0.5 + 0.5);
    gl_FragColor = vec4(col * (1.0 - len * 0.5), 0.4);
  }
`;

function ShaderPlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(1, 1) }
  }), []);

  useFrame((state) => {
    uniforms.uTime.value = state.clock.getElapsedTime();
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
}

export function AnimmasterShaderBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 1] }}>
        <ShaderPlane />
      </Canvas>
    </div>
  );
}
```

### Pattern B: 3D Gyro Perspective Card with Specular Sheen
```tsx
"use client";

import { useRef, useState, useCallback } from "react";

export function Animmaster3DCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0, opacity: 0 });
  const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg)");

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normX = (x / rect.width - 0.5) * 2;
    const normY = (y / rect.height - 0.5) * 2;

    setTransform(`perspective(1000px) rotateX(${-normY * 12}deg) rotateY(${normX * 12}deg) scale3d(1.02, 1.02, 1.02)`);
    setCoords({ x, y, opacity: 1 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    setCoords((prev) => ({ ...prev, opacity: 0 }));
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transition: "transform 0.15s ease-out" }}
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/60 backdrop-blur-xl p-6 will-change-transform ${className}`}
    >
      {/* Dynamic Specular Sheen */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: coords.opacity,
          background: `radial-gradient(600px circle at ${coords.x}px ${coords.y}px, rgba(6, 182, 212, 0.15), transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
}
```

### Pattern C: Kinetic Split Text Reveal
```tsx
"use client";

import { motion } from "framer-motion";

export function AnimmasterTextReveal({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(" ");

  return (
    <h2 className={`overflow-hidden inline-flex flex-wrap gap-x-2 ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h2>
  );
}
```
