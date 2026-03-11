"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Float } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function AbstractShape() {
  const meshRef = useRef<THREE.Mesh>(null);
  const prefersReducedMotion = useReducedMotion();
  
  useFrame((state, delta) => {
    if (meshRef.current && !prefersReducedMotion) {
      // Entrance animation
      if (meshRef.current.scale.x < 1) {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.05);
      }

      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
      
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, (state.pointer.x * state.viewport.width) / 10, 0.05);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, (state.pointer.y * state.viewport.height) / 10, 0.05);
    } else if (meshRef.current && prefersReducedMotion) {
      meshRef.current.scale.set(1, 1, 1);
    }
  });

  return (
    <Float speed={prefersReducedMotion ? 0 : 2} rotationIntensity={prefersReducedMotion ? 0 : 1} floatIntensity={prefersReducedMotion ? 0 : 2}>
      <mesh ref={meshRef} scale={[0, 0, 0]}>
        <icosahedronGeometry args={[1.5, 1]} />
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

function ParticleSystem({ count = 300 }) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);
  const prefersReducedMotion = useReducedMotion();

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current && !prefersReducedMotion) {
      pointsRef.current.rotation.y -= delta * 0.02;
      pointsRef.current.rotation.x -= delta * 0.01;
    }
    if (materialRef.current && materialRef.current.opacity < 1 && !prefersReducedMotion) {
        materialRef.current.opacity += delta * 0.3; // Fade in over ~3 seconds
    } else if (materialRef.current && prefersReducedMotion) {
        materialRef.current.opacity = 1;
    }
  });

  return (
    <Points ref={pointsRef} positions={particlesPosition} stride={3} frustumCulled={true}>
      <PointMaterial
        ref={materialRef}
        transparent
        opacity={0}
        color="#a855f7"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-70">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 10, 5]} intensity={1} color="#ffffff" />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#c084fc" />
        <AbstractShape />
        <ParticleSystem count={400} />
      </Canvas>
    </div>
  );
}
