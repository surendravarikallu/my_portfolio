"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView, useSpring, useMotionValue } from "framer-motion";
import { TiltedCard } from "@/components/ui/tilted-card";
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
    <section id="about" className="py-24 px-4 relative overflow-hidden bg-neutral-900 text-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* Left Side: Tilted Card Image */}
        <ScrollReveal
          delay={0}
          yOffset={40}
          className="flex justify-center"
        >
          <TiltedCard
            className="w-full max-w-md aspect-[3/4]"
            containerWidth="100%"
            containerHeight="100%"
            rotateAmplitude={15}
            scaleOnHover={1.05}
          >
            <div className="w-full h-full rounded-xl overflow-hidden shadow-2xl relative group bg-neutral-800">
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/90 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>

              <Image
                src="/image.png"
                alt="Surendra Varikallu - Profile"
                fill
                className="object-cover transform scale-105 group-hover:scale-110 transition-transform duration-700"
                priority
              />

              <div className="absolute bottom-6 left-6 z-20">
                <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-md">Surendra Varikallu</h3>
                <p className="text-cyan-300 font-mono text-sm tracking-wide drop-shadow-sm">Full Stack Developer</p>
              </div>
            </div>
          </TiltedCard>
        </ScrollReveal>

        {/* Right Side: Content */}
        <ScrollReveal
          delay={0.2}
          yOffset={40}
        >
          <TextReveal text="About Me" className="text-4xl font-bold mb-6 justify-start" />
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 bg-cyan-500 mb-8"
          />

          <p className="text-gray-300 leading-relaxed text-lg mb-6">
            Full Stack Developer building <span className="text-cyan-400 font-semibold">production-grade web platforms</span> that solve real problems — from Skillnox.AI (AI-driven technical assessment platform) to secure examination engines serving 5,000+ concurrent users with 100% success rate and single-digit millisecond latency.
          </p>

          <ul className="space-y-3 mb-8 text-gray-300 text-base">
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 mt-1">▹</span>
              Full Stack Developer focused on scalable AI & web platforms
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 mt-1">▹</span>
              Creator of Skillnox.AI and Skillnox (KITAghire ecosystem)
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 mt-1">▹</span>
              Proficient in React, Next.js, Node.js, Express, PostgreSQL, and Local LLMs (Qwen)
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 mt-1">▹</span>
              Passionate about AI evaluations, proctoring security, and high-concurrency systems
            </li>
          </ul>

            <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="p-4 bg-neutral-800 rounded-lg border-l-4 border-cyan-500 transition-all duration-500 hover:shadow-[0_0_20px_rgba(6,182,212,0.25)] hover:bg-neutral-800/80">
              <h4 className="font-bold text-lg sm:text-xl mb-1">
                <AnimatedCounter value={5} suffix="K+" />
              </h4>
              <p className="text-xs text-gray-400">Peak Users Load</p>
            </div>
            <div className="p-4 bg-neutral-800 rounded-lg border-l-4 border-purple-500 transition-all duration-500 hover:shadow-[0_0_20px_rgba(139,92,246,0.25)] hover:bg-neutral-800/80">
              <h4 className="font-bold text-lg sm:text-xl mb-1">
                <AnimatedCounter value={100} suffix="%" />
              </h4>
              <p className="text-xs text-gray-400">Success Rate (5K VUs)</p>
            </div>
            <div className="p-4 bg-neutral-800 rounded-lg border-l-4 border-amber-500 transition-all duration-500 hover:shadow-[0_0_20px_rgba(245,158,11,0.25)] hover:bg-neutral-800/80">
              <h4 className="font-bold text-lg sm:text-xl mb-1">
                <AnimatedCounter value={2} suffix="" />
              </h4>
              <p className="text-xs text-gray-400">Prod Systems Active</p>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
