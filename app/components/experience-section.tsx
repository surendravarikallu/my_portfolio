"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent, MotionValue } from "framer-motion";
import SpotlightCard from "@/components/ui/spotlight-card";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { TextReveal } from "@/components/animations/TextReveal";

const experiences = [
  {
    id: 0,
    title: "1st Prize Winner — Elevate X Season 2 Hackathon",
    organization: "Codegnan",
    date: "May 2026",
    logo: "/codegnan-logo.webp",
    color: "amber",
    description: [
      "Won 1st place in the Elevate X Season 2 Hackathon, a high-intensity 12-hour full-stack coding sprint organized by Codegnan.",
      "Designed, developed, and deployed a production-ready prototype web application under strict time constraints.",
      "Presented technical architecture and scalability roadmap to a panel of expert judges.",
    ],
  },
  {
    id: 1,
    title: "Hackathon 3rd Prize (StudentConnect)",
    organization: "Dept of CSE, KITS",
    date: "Feb 21, 2026",
    logo: "/hackathon-logo.webp",
    color: "amber",
    description: [
      "Built 'StudentConnect' a collaborative platform for students to share academic resources and work on projects.",
      "Developed the full-stack application using Python, Django, and PostgreSQL within 48 hours.",
      "Secured 3rd place overall and successfully deployed the live project on Render.",
    ],
  },
  {
    id: 2,
    title: "Google Student Ambassador",
    organization: "KITS Akshar Institute of Technology",
    date: "Aug 2025 - Dec 2025",
    logo: "/google-logo.webp",
    color: "purple",
    description: [
      "Organized and hosted 7+ technical workshops on Google Cloud, Android, and AI tools, increasing student involvement by 45%.",
      "Built and managed a student tech community of 150+ active learners, mentoring peers through Google certification tracks.",
      "Increased campus adoption of Google programs through strategic outreach, resulting in a 50% rise in student registrations.",
    ],
  },
  {
    id: 3,
    title: "Full-Stack Web Developer Intern",
    organization: "Cognifyz Technologies",
    date: "June 2025 - July 2025",
    logo: "/cognifyz-logo.webp",
    color: "cyan",
    description: [
      "Built dynamic full-stack web applications using HTML, CSS, JavaScript, and Node.js, delivering responsive UIs.",
      "Integrated RESTful APIs with modern frontend components, boosting application functionality and reliability by 40%.",
      "Engineered tailored solutions leveraging React.js, Express.js, and MongoDB, achieving a 30% reduction in bottlenecks.",
    ],
  },
  {
    id: 4,
    title: "Web Development Intern",
    organization: "Codegnan (Offline)",
    date: "May 2025 - June 2025",
    logo: "/codegnan-logo.webp",
    color: "emerald",
    description: [
      "Built and deployed a fully responsive travel website using HTML, CSS, JavaScript, and Bootstrap.",
      "Optimized website performance by minimizing assets and structuring components efficiently, achieving under 2s load time.",
      "Developed and integrated Design Applications using Figma and Adobe XD, accelerating UI prototyping and handoff.",
    ],
  },
];

function ExperienceRow({
  exp,
  index,
  scrollYProgress,
  containerRef,
}: {
  exp: (typeof experiences)[0];
  index: number;
  scrollYProgress: MotionValue<number>;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const isLeft = index % 2 === 0;
  const dotRef = useRef<HTMLDivElement>(null);
  const triggerRatioRef = useRef<number>(0);
  const [reached, setReached] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Monitor screen size
  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    setIsDesktop(media.matches);
    const listener = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  // Compute trigger ratio once on mount / resize (zero layout reads on scroll)
  const computeTriggerRatio = useCallback(() => {
    if (dotRef.current && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const dotRect = dotRef.current.getBoundingClientRect();
      const relativeTop = dotRect.top - containerRect.top;
      triggerRatioRef.current = containerRect.height > 0 ? relativeTop / containerRect.height : 0;
      setReached(scrollYProgress.get() >= triggerRatioRef.current);
    }
  }, [containerRef, scrollYProgress]);

  useEffect(() => {
    const timer = setTimeout(computeTriggerRatio, 150);
    window.addEventListener("resize", computeTriggerRatio, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", computeTriggerRatio);
    };
  }, [computeTriggerRatio]);

  // Pure arithmetic comparison during scroll - zero forced reflows!
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const isNowReached = latest >= triggerRatioRef.current;
    if (isNowReached !== reached) {
      setReached(isNowReached);
    }
  });

  const borderGlowMap: Record<string, string> = {
    cyan: "hover:border-cyan-500/40",
    purple: "hover:border-purple-500/40",
    amber: "hover:border-amber-500/40",
    emerald: "hover:border-emerald-500/40",
  };

  const glowMap: Record<string, string> = {
    cyan: "shadow-cyan-500/60",
    purple: "shadow-purple-500/60",
    amber: "shadow-amber-500/60",
    emerald: "shadow-emerald-500/60",
  };

  const bulletColorMap: Record<string, string> = {
    cyan: "text-cyan-400",
    purple: "text-purple-400",
    amber: "text-amber-400",
    emerald: "text-emerald-400",
  };

  const glowBorderMap: Record<string, string> = {
    cyan: "border-cyan-400",
    purple: "border-purple-400",
    amber: "border-amber-400",
    emerald: "border-emerald-400",
  };

  return (
    <div
      className={`relative flex flex-col md:flex-row items-center ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Center Dot with Logo */}
      <div
        ref={dotRef}
        className={`hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-11 h-11 rounded-full items-center justify-center z-20 transition-all duration-500 ease-out ${
          reached
            ? "bg-zinc-950 border-2 border-cyan-400 shadow-[0_0_16px_rgba(6,182,212,0.4)] scale-100"
            : "bg-zinc-900 border-2 border-zinc-800 shadow-none scale-75"
        }`}
      >
        <div
          className={`relative w-9 h-9 rounded-full overflow-hidden transition-all duration-500 ease-out ${
            reached
              ? "opacity-100 grayscale-0 scale-100"
              : "opacity-0 grayscale scale-50"
          }`}
        >
          <Image
            src={exp.logo}
            alt={`${exp.organization} logo`}
            fill
            className="object-cover rounded-full"
            sizes="36px"
            unoptimized
          />
        </div>
      </div>

      {/* Empty space for the other side */}
      <div className="hidden md:block w-1/2"></div>

      {/* Content Card */}
      <motion.div
        className="w-full md:w-1/2 px-0 md:px-8"
        animate={
          isDesktop
            ? {
                opacity: reached ? 1 : 0.4,
                scale: reached ? 1 : 0.96,
                x: reached ? 0 : isLeft ? -20 : 20,
              }
            : {}
        }
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 15,
          mass: 0.8,
        }}
      >
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <SpotlightCard
            className="bg-zinc-950/70 border-zinc-800/80 hover:border-zinc-700 transition-all duration-300 p-6 sm:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.5)]"
            spotlightColor="rgba(56, 189, 248, 0.1)"
          >
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-start flex-wrap gap-2">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {exp.title}
                  </h3>
                  <p className="text-cyan-400 font-medium mt-1">
                    {exp.organization}
                  </p>
                </div>
                <span className="inline-block text-xs font-mono px-3 py-1 rounded-full bg-zinc-900 text-zinc-400 border border-zinc-800 whitespace-nowrap">
                  {exp.date}
                </span>
              </div>

              <div className="h-px w-full bg-zinc-800/80 my-2"></div>

              <ul className="space-y-3">
                {exp.description.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-zinc-300"
                  >
                    <span className="text-cyan-400 mt-0.5">▹</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </SpotlightCard>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"],
  });

  return (
    <section id="experience" aria-label="Professional Experience & Career Journey" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-black">
      <div className="relative z-10 max-w-5xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <p className="text-xs font-mono font-medium tracking-[0.25em] text-cyan-400/90 uppercase mb-2">
            // 03. CAREER TIMELINE
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold mb-4 text-titanium tracking-tight">
            Experience & Journey
          </h2>
          <p className="text-zinc-400 mt-3 max-w-2xl mx-auto text-base sm:text-lg">
            My professional timeline — high-intensity hackathons, engineering internships, and leadership roles.
          </p>
        </ScrollReveal>

        <div ref={containerRef} className="relative">
          {/* Vertical Line */}
          <div className="hidden md:block absolute left-1/2 top-0 transform -translate-x-1/2 w-0.5 h-full bg-zinc-800/40">
            <motion.div
              style={{ scaleY: scrollYProgress, originY: 0 }}
              className="w-full h-full bg-gradient-to-b from-cyan-400 via-blue-500 to-cyan-500 rounded-full shadow-[0_0_12px_rgba(6,182,212,0.4)]"
            />
          </div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <ExperienceRow
                key={exp.id}
                exp={exp}
                index={index}
                scrollYProgress={scrollYProgress}
                containerRef={containerRef}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
