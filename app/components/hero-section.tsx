"use client";

import { motion, useMotionValue, useTransform, useSpring, useScroll } from "framer-motion";
import { ArrowRight, FileText, Github } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import ShimmerButton from "@/components/ui/shimmer-button";
import { useEffect } from "react";
import { MagneticWrapper } from "@/components/animations/MagneticWrapper";

const HeroScene = dynamic(() => import("@/components/3d/HeroScene"), { ssr: false });

export default function HeroSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring-based parallax transforms for pointer tracking
  const springConfig = { stiffness: 60, damping: 25 };
  const textX = useSpring(useTransform(mouseX, [0, 1, -1], [0, -10, 10]), springConfig);
  const textY = useSpring(useTransform(mouseY, [0, 1, -1], [0, -6, 6]), springConfig);

  // Multi-depth scroll-linked parallax
  const { scrollY } = useScroll();
  const gridY = useTransform(scrollY, [0, 600], [0, 60]);
  const sceneY = useTransform(scrollY, [0, 600], [0, -40]);
  const contentY = useSpring(useTransform(scrollY, [0, 600], [0, -110]), { stiffness: 90, damping: 26 });
  const contentOpacity = useTransform(scrollY, [0, 420], [1, 0]);

  useEffect(() => {
    // Only attach mousemove on desktop
    if (typeof window !== "undefined" && window.innerWidth >= 768) {
      const handleMouseMove = (e: MouseEvent) => {
        const { innerWidth, innerHeight } = window;
        mouseX.set((e.clientX / innerWidth - 0.5) * 2);
        mouseY.set((e.clientY / innerHeight - 0.5) * 2);
      };

      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [mouseX, mouseY]);

  const scrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(element, { duration: 1.2 });
      } else {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section id="home" aria-label="Hero Introduction" className="h-screen w-full relative overflow-hidden bg-black">
      {/* Layer 1: Background Parallax Cyberpunk Grid */}
      <motion.div
        style={{ y: gridY }}
        className="absolute inset-0 opacity-15 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"
      />

      {/* Layer 2: 3D Particle Mesh Parallax */}
      <motion.div style={{ y: sceneY }} className="absolute inset-0 w-full h-full pointer-events-none">
        <HeroScene />
      </motion.div>

      {/* Layer 3: Foreground Interactive Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="h-full w-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 text-center z-10 relative"
      >
        <div className="mb-4">
          <MagneticWrapper range={35} strength={0.2}>
            <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-medium tracking-wide shadow-[0_0_20px_rgba(6,182,212,0.18)]">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
              </span>
              Available for Engineering Roles
            </span>
          </MagneticWrapper>
        </div>

        <motion.h1
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          style={{ x: textX, y: textY }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-6"
        >
          Hi, I'm{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-100 to-zinc-400">
            Surendra Varikallu
          </span>
        </motion.h1>

        <motion.p
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          style={{ x: textX, y: textY }}
          className="text-base sm:text-lg md:text-xl text-zinc-300 font-normal max-w-3xl mb-10 leading-relaxed"
        >
          Full Stack & AI Systems Developer building scalable enterprise platforms.{" "}
          <span className="text-white font-medium">
            Creator of Skillnox & Skillnox.AI
          </span>{" "}
          – high-throughput platforms load-tested with{" "}
          <span className="text-cyan-300 font-mono text-sm sm:text-base font-semibold">5,000+ VUs @ 100% success rate</span>.
        </motion.p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <MagneticWrapper range={60}>
            <button
              onClick={scrollToProjects}
              aria-label="View Projects section"
              className="px-7 py-3 rounded-full bg-white text-zinc-950 hover:bg-zinc-200 font-semibold shadow-[0_4px_20px_rgba(255,255,255,0.15)] hover:shadow-[0_4px_25px_rgba(255,255,255,0.25)] transition-all duration-300 flex items-center gap-2 text-sm"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4 text-zinc-950" aria-hidden="true" />
            </button>
          </MagneticWrapper>

          <MagneticWrapper range={60}>
            <Link
              href="/resume"
              className="px-6 py-3 rounded-full border border-zinc-800 bg-zinc-950/80 hover:border-zinc-700 hover:bg-zinc-900 text-zinc-300 hover:text-white transition-all duration-300 flex items-center gap-2 text-sm font-medium"
              aria-label="View Resume"
            >
              <FileText className="w-4 h-4 text-zinc-400" aria-hidden="true" /> View Resume
            </Link>
          </MagneticWrapper>

          <MagneticWrapper range={60}>
            <a
              href="https://github.com/surendravarikallu"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full border border-zinc-800 bg-zinc-950/80 hover:border-zinc-700 hover:bg-zinc-900 text-zinc-300 hover:text-white transition-all duration-300 flex items-center gap-2 text-sm font-medium"
              aria-label="Visit Surendra's GitHub profile"
            >
              <Github className="w-4 h-4 text-zinc-400" aria-hidden="true" /> GitHub
            </a>
          </MagneticWrapper>
        </div>
      </motion.div>
    </section>
  );
}
