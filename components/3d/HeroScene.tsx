"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// Performance optimization: track scroll value in a passive event listener
// to prevent layout thrashing (reflow) caused by reading window.scrollY inside useFrame
let globalScrollY = 0;
if (typeof window !== "undefined") {
  window.addEventListener("scroll", () => {
    globalScrollY = window.scrollY;
  }, { passive: true });
}

// Seeded PRNG (mulberry32) so particles render identically across all browsers
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function AbstractShape() {
  const meshRef = useRef<THREE.Mesh>(null);
  const prefersReducedMotion = useReducedMotion();

  useFrame((state, delta) => {
    if (meshRef.current && !prefersReducedMotion) {
      // Entrance animation
      if (meshRef.current.scale.x < 1) {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.05);
      }

      const scrollRatio = Math.min(globalScrollY / 1000, 1.2);

      // Spin faster when scrolling
      meshRef.current.rotation.x += delta * (0.2 + scrollRatio * 0.4);
      meshRef.current.rotation.y += delta * (0.3 + scrollRatio * 0.6);

      // Interpolate position based on mouse hover and scroll depth
      const targetX = (state.pointer.x * state.viewport.width) / 10;
      const targetY = (state.pointer.y * state.viewport.height) / 10 - scrollRatio * 3;
      const targetZ = -scrollRatio * 6; // push backward into the screen

      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.05);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.05);
      meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, 0.05);
    } else if (meshRef.current && prefersReducedMotion) {
      meshRef.current.scale.set(1, 1, 1);
    }
  });

  return (
    <Float speed={prefersReducedMotion ? 0 : 2} rotationIntensity={prefersReducedMotion ? 0 : 1} floatIntensity={prefersReducedMotion ? 0 : 2}>
      <mesh ref={meshRef} scale={[1, 1, 1]}>
        <icosahedronGeometry args={[2, 1]} />
        <meshStandardMaterial
          color="#22d3ee"
          wireframe
          emissive="#0891b2"
          emissiveIntensity={0.5}
        />
      </mesh>
    </Float>
  );
}

// Create a soft circular particle texture (generated once, shared across instances)
function createParticleTexture(): THREE.Texture {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  // Radial gradient: bright white center → soft transparent edge
  const gradient = ctx.createRadialGradient(
    size / 2, size / 2, 0,
    size / 2, size / 2, size / 2
  );
  gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
  gradient.addColorStop(0.3, "rgba(255, 255, 255, 0.8)");
  gradient.addColorStop(0.7, "rgba(255, 255, 255, 0.2)");
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function ParticleSystem({ count = 300 }) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);
  const prefersReducedMotion = useReducedMotion();
  const entranceProgress = useRef(0);
  const initialPositions = useRef<Float32Array | null>(null);

  // Generate circular particle texture once
  const particleTexture = useMemo(() => createParticleTexture(), []);

  // Use seeded PRNG so particles are identical across all browsers
  const particlesPosition = useMemo(() => {
    const rand = mulberry32(42); // fixed seed = deterministic positions
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (rand() - 0.5) * 20;
      positions[i * 3 + 1] = (rand() - 0.5) * 20;
      positions[i * 3 + 2] = (rand() - 0.5) * 14;
    }
    // Store a copy of initial positions for scroll-based animation
    initialPositions.current = new Float32Array(positions);
    return positions;
  }, [count]);

  useFrame((state, delta) => {
    const scrollRatio = Math.min(globalScrollY / 800, 2.0);

    if (pointsRef.current && !prefersReducedMotion) {
      // Entrance burst: scale up from tiny to full over ~1.5s
      if (entranceProgress.current < 1) {
        entranceProgress.current = Math.min(entranceProgress.current + delta * 0.7, 1);
        // Ease-out cubic for a snappy burst
        const t = 1 - Math.pow(1 - entranceProgress.current, 3);
        const s = 0.01 + t * 0.99; // scale from 0.01 to 1.0
        pointsRef.current.scale.set(s, s, s);
      }

      // Rotation speeds up dramatically on scroll
      pointsRef.current.rotation.y -= delta * (0.05 + scrollRatio * 0.15);
      pointsRef.current.rotation.x -= delta * (0.03 + scrollRatio * 0.08);

      // Pull particles forward to create a tunnel/warp scroll effect
      pointsRef.current.position.z = THREE.MathUtils.lerp(
        pointsRef.current.position.z,
        scrollRatio * 8,
        0.06
      );

      // Animate individual particle positions on scroll for a breathing/expanding effect
      const posAttr = pointsRef.current.geometry.attributes.position;
      if (posAttr && initialPositions.current) {
        const arr = posAttr.array as Float32Array;
        const initArr = initialPositions.current;
        const breathe = 1 + scrollRatio * 0.3 + Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
        for (let i = 0; i < arr.length; i++) {
          arr[i] = initArr[i] * breathe;
        }
        posAttr.needsUpdate = true;
      }
    } else if (pointsRef.current && prefersReducedMotion) {
      pointsRef.current.scale.set(1, 1, 1);
    }

    if (materialRef.current && !prefersReducedMotion) {
      // Fade in over ~2s
      if (materialRef.current.opacity < 1) {
        materialRef.current.opacity = Math.min(materialRef.current.opacity + delta * 0.5, 1);
      }
      // Particle size grows on scroll + gentle pulse
      const pulse = Math.sin(state.clock.elapsedTime * 2.5) * 0.02;
      materialRef.current.size = 0.12 + scrollRatio * 0.06 + pulse;
    } else if (materialRef.current && prefersReducedMotion) {
      materialRef.current.opacity = 1;
    }
  });

  return (
    <points ref={pointsRef} scale={[0.01, 0.01, 0.01]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particlesPosition, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        map={particleTexture}
        transparent
        opacity={0}
        color="#ffffff"
        size={0.12}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 10, 5]} intensity={1} color="#ffffff" />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#c084fc" />
        <AbstractShape />
        <ParticleSystem count={1000} />
      </Canvas>
    </div>
  );
}

