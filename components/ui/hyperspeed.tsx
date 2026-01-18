"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

/* ================= STAR → WORMHOLE ================= */

function StarWormhole({ phase }: { phase: number }) {
    const points = useRef<THREE.Points>(null);
    const count = 9000;

    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const r = Math.random() * 50 + 10;
            const a = Math.random() * Math.PI * 2;
            arr[i * 3] = Math.cos(a) * r;
            arr[i * 3 + 1] = Math.sin(a) * r;
            arr[i * 3 + 2] = -Math.random() * 350;
        }
        return arr;
    }, []);

    useFrame((_, delta) => {
        if (!points.current) return;
        const pos = points.current.geometry.attributes.position.array as Float32Array;

        const speed = 60 + phase * 260;

        for (let i = 0; i < pos.length; i += 3) {
            let x = pos[i];
            let y = pos[i + 1];
            let z = pos[i + 2];

            // forward acceleration
            z += delta * speed;

            // gravity pull
            const dist = Math.sqrt(x * x + y * y) + 0.0001;
            const gravity = phase * 0.09;
            x -= (x / dist) * gravity * dist;
            y -= (y / dist) * gravity * dist;

            // spiral
            const angle = Math.atan2(y, x) + phase * 0.14;
            const radius = dist * (1 - phase * 0.018);
            x = Math.cos(angle) * radius;
            y = Math.sin(angle) * radius;

            // event horizon (black center)
            if (radius < 0.35 || z > 8) {
                const nr = Math.random() * 60;
                const na = Math.random() * Math.PI * 2;
                x = Math.cos(na) * nr;
                y = Math.sin(na) * nr;
                z = -350;
            }

            pos[i] = x;
            pos[i + 1] = y;
            pos[i + 2] = z;
        }

        points.current.geometry.attributes.position.needsUpdate = true;

        // star stretch illusion
        const mat = points.current.material as THREE.PointsMaterial;
        mat.size = 0.08 + phase * 0.22;
    });

    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <pointsMaterial
                color="#7dd3fc"
                transparent
                opacity={0.9}
                sizeAttenuation
            />
        </points>
    );
}

/* ================= CAMERA SHAKE ================= */

function CameraFX({ phase }: { phase: number }) {
    const { camera } = useThree();

    useFrame(() => {
        if (phase > 0.8) {
            const shake = (phase - 0.8) * 0.1;
            camera.position.x = (Math.random() - 0.5) * shake;
            camera.position.y = (Math.random() - 0.5) * shake;
        } else {
            camera.position.x = 0;
            camera.position.y = 0;
        }
    });

    return null;
}

/* ================= MAIN ================= */

export default function Hyperspeed({ onComplete }: { onComplete?: () => void }) {
    const [progress, setProgress] = useState(0);
    const [phase, setPhase] = useState(0);
    const [flash, setFlash] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((p) => {
                if (p >= 100) {
                    clearInterval(timer);
                    setFlash(1); // white flash
                    setTimeout(() => onComplete?.(), 350);
                    return 100;
                }
                return p + 1;
            });

            setPhase((p) => Math.min(p + 0.02, 1));
        }, 28);

        return () => clearInterval(timer);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-50 bg-black text-white">
            <Canvas camera={{ position: [0, 0, 0], fov: 95 }}>
                <StarWormhole phase={phase} />
                <CameraFX phase={phase} />

                <EffectComposer>
                    <Bloom intensity={2.6} luminanceThreshold={0.18} />
                </EffectComposer>
            </Canvas>

            {/* UI */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                    <h1 className="text-6xl md:text-8xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-[0_0_40px_rgba(34,211,238,0.5)]">
                        {progress}%
                    </h1>
                    <p className="mt-2 text-xs tracking-[0.35em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 animate-pulse font-bold">
                        EXITING WORMHOLE
                    </p>
                </div>
            </div>

            {/* WHITE FLASH EXIT */}
            <div
                className="pointer-events-none absolute inset-0 bg-white transition-opacity duration-200"
                style={{ opacity: flash }}
            />
        </div>
    );
}
