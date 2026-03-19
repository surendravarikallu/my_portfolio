"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView, useSpring, useMotionValue } from "framer-motion";
import { TiltedCard } from "@/components/ui/tilted-card";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

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
    const unsubscribe = springVal.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${Math.round(latest * 10) / 10}${suffix}`;
      }
    });
    return unsubscribe;
  }, [springVal, suffix]);

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
                src="/profile-pic.png"
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
          <h2 className="text-4xl font-bold mb-6">
            About <span className="text-cyan-400">Me</span>
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 bg-cyan-500 mb-8"
          />

          <p className="text-gray-300 leading-relaxed text-lg mb-6">
            Full Stack Developer building <span className="text-cyan-400 font-semibold">production-grade web platforms</span> that solve real problems — from secure assessment systems serving 250+ users to management portals with real-time analytics.
          </p>

          <ul className="space-y-3 mb-8 text-gray-300 text-base">
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 mt-1">▹</span>
              Full Stack Developer focused on scalable web platforms
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 mt-1">▹</span>
              Experience building real-world student and assessment systems
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 mt-1">▹</span>
              Proficient in React, Next.js, Node.js, Express, and PostgreSQL
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 mt-1">▹</span>
              Passionate about developer tools, security, and clean architecture
            </li>
          </ul>

            <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="p-4 bg-neutral-800 rounded-lg border-l-4 border-cyan-500">
              <h4 className="font-bold text-xl mb-1">
                <AnimatedCounter value={1.5} suffix="+" />
              </h4>
              <p className="text-sm text-gray-400">Years Experience</p>
            </div>
            <div className="p-4 bg-neutral-800 rounded-lg border-l-4 border-purple-500">
              <h4 className="font-bold text-xl mb-1">
                <AnimatedCounter value={8} suffix="+" />
              </h4>
              <p className="text-sm text-gray-400">Projects Completed</p>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
