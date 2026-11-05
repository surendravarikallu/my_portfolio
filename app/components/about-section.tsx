"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, useInView, useSpring, useMotionValue } from "framer-motion";
import TiltedCard from "@/components/ui/tilted-card";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { TextReveal } from "@/components/animations/TextReveal";

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const springVal = useSpring(motionVal, { stiffness: 80, damping: 20 });

  useEffect(() => {
    if (inView) {
      motionVal.set(value);
    }
  }, [inView, motionVal, value]);

  useEffect(() => {
    const unsubscribe = springVal.on("change", (latest: number) => {
      if (ref.current) {
        const isInt = Number.isInteger(value);
        const formatted = isInt ? Math.round(latest) : Math.round(latest * 10) / 10;
        ref.current.textContent = `${formatted}${suffix}`;
      }
    });
    return unsubscribe;
  }, [springVal, suffix, value]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function AboutSection() {
  return (
    <section id="about" aria-label="About Surendra Varikallu" className="py-24 px-4 relative overflow-hidden bg-black text-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* Left Side: Tilted Card Image */}
        <ScrollReveal
          delay={0}
          yOffset={40}
          className="flex justify-center"
        >
          <div className="relative group w-full max-w-md aspect-[3/4]">
            {/* Subtle Ambient Back-Glow */}
            <div
              className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-cyan-500/10 via-sky-500/5 to-blue-600/10 blur-xl opacity-40 group-hover:opacity-75 transition-opacity duration-700 pointer-events-none -z-10 transform-gpu will-change-[opacity]"
              aria-hidden="true"
            />

            <TiltedCard
              className="w-full h-full"
              containerWidth="100%"
              containerHeight="100%"
              rotateAmplitude={10}
              scaleOnHover={1.02}
            >
              <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl relative bg-zinc-950 border border-zinc-800/90 group-hover:border-zinc-700 transition-all duration-500 [transform:translateZ(0)] [backface-visibility:hidden]">
                {/* Specular top sheen */}
                <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/10 via-transparent to-transparent z-10 pointer-events-none" />

                {/* Bottom contrast vignette for typography legibility */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/40 to-transparent z-10 pointer-events-none" />

                <Image
                  src="/image.webp"
                  alt="Surendra Varikallu - Profile"
                  fill
                  quality={95}
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                  className="object-cover object-center transform-gpu will-change-transform scale-[1.02] group-hover:scale-105 transition-transform duration-700 ease-out [backface-visibility:hidden]"
                />

                <div className="absolute bottom-6 left-6 right-6 z-20">
                  <p className="text-2xl font-bold text-white mb-1.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] tracking-tight">Surendra Varikallu</p>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-950/80 border border-zinc-800 backdrop-blur-md shadow-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <p className="text-zinc-300 font-mono text-xs tracking-wider uppercase">Full Stack & AI Developer</p>
                  </div>
                </div>
              </div>
            </TiltedCard>
          </div>
        </ScrollReveal>

        {/* Right Side: Content */}
        <ScrollReveal
          delay={0.2}
          yOffset={40}
        >
          <p className="text-xs font-mono font-medium tracking-[0.25em] text-cyan-400/90 uppercase mb-2">
            // 01. PROFILE & ARCHITECTURE
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-titanium tracking-tight">
            Engineered for Scale, Driven by Impact
          </h2>

          <p className="text-zinc-300 leading-relaxed text-base sm:text-lg mb-6 font-normal">
            Full Stack Developer building <span className="text-white font-medium">production-grade web platforms</span> that solve real problems — from Skillnox.AI (AI-driven technical assessment platform) to secure examination engines serving 5,000+ concurrent users with 100% success rate and single-digit millisecond latency.
          </p>

          <ul className="space-y-3 mb-8 text-zinc-400 text-sm sm:text-base">
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 mt-1">▹</span>
              <span>Full Stack Developer focused on scalable AI & distributed web platforms</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 mt-1">▹</span>
              <span>Creator of Skillnox.AI and Skillnox (KITAghire ecosystem)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 mt-1">▹</span>
              <span>Certified in AWS (AI Practitioner), SAP ABAP, and ServiceNow (CSA & CAD)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 mt-1">▹</span>
              <span>Passionate about high-throughput engines, localized LLMs (Qwen), and enterprise integrations</span>
            </li>
          </ul>

          <div className="grid grid-cols-3 gap-3.5 mb-8">
            <div className="p-4 bg-zinc-950/70 rounded-xl border border-zinc-800/80 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/60 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
              <p className="font-bold text-xl sm:text-2xl mb-1 text-white font-mono tabular-nums">
                <AnimatedCounter value={5} suffix="K+" />
              </p>
              <p className="text-xs text-zinc-400">Peak Users Load</p>
            </div>
            <div className="p-4 bg-zinc-950/70 rounded-xl border border-zinc-800/80 transition-all duration-300 hover:border-emerald-500/30 hover:bg-zinc-900/60 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
              <p className="font-bold text-xl sm:text-2xl mb-1 text-emerald-400 font-mono tabular-nums">
                <AnimatedCounter value={100} suffix="%" />
              </p>
              <p className="text-xs text-zinc-400">Success Rate (5K VUs)</p>
            </div>
            <div className="p-4 bg-zinc-950/70 rounded-xl border border-zinc-800/80 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/60 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
              <p className="font-bold text-xl sm:text-2xl mb-1 text-white font-mono tabular-nums">
                <AnimatedCounter value={2} suffix="" />
              </p>
              <p className="text-xs text-zinc-400">Prod Systems Live</p>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
