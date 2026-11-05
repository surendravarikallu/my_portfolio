"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import SpotlightCard from "@/components/ui/spotlight-card";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { TextReveal } from "@/components/animations/TextReveal";

const skillCategories = [
  {
    label: "Frontend",
    color: "from-cyan-400 to-blue-500",
    skills: [
      { name: "HTML", icon: "/icons/html5.svg" },
      { name: "CSS", icon: "/icons/css3.svg" },
      { name: "JavaScript", icon: "/icons/javascript.svg" },
      { name: "React.js", icon: "/icons/react.svg" },
      { name: "TypeScript", icon: "/icons/typescript.svg" },
      { name: "Next.js", icon: "/icons/nextjs.svg" },
      { name: "Tailwind CSS", icon: "/icons/tailwindcss.svg" },
    ],
  },
  {
    label: "Backend",
    color: "from-green-400 to-emerald-500",
    skills: [
      { name: "Node.js", icon: "/icons/nodejs.svg" },
      { name: "Express.js", icon: "/icons/express.svg" },
      { name: "Python", icon: "/icons/python.svg" },
      { name: "Django", icon: "/icons/django.svg" },
      { name: "SAP ABAP", icon: "/sap-logo.svg" },
    ],
  },
  {
    label: "Databases",
    color: "from-purple-400 to-pink-500",
    skills: [
      { name: "MongoDB", icon: "/icons/mongodb.svg" },
      { name: "MySQL", icon: "/icons/mysql.svg" },
      { name: "PostgreSQL", icon: "/icons/postgresql.svg" },
    ],
  },
  {
    label: "Cloud & Tools",
    color: "from-orange-400 to-red-500",
    skills: [
      { name: "AWS", icon: "/aws-logo.svg" },
      { name: "Docker", icon: "/icons/docker.svg" },
      { name: "Git", icon: "/icons/git.svg" },
      { name: "GitHub", icon: "/icons/github.svg" },
      { name: "Postman", icon: "/icons/postman.svg" },
      { name: "Vercel", icon: "/icons/vercel.svg" },
      { name: "VS Code", icon: "/icons/vscode.svg" },
    ],
  },
];

const filterTabs = [
  { id: "all", label: "All Skills" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "databases", label: "Databases" },
  { id: "cloud & tools", label: "Cloud & Tools" },
];

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState("all");

  const visibleCategories =
    activeTab === "all"
      ? skillCategories
      : skillCategories.filter((c) => c.label.toLowerCase() === activeTab.toLowerCase());

  return (
    <section id="skills" aria-label="Technical Skills & Technologies" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-black">
      <div className="relative z-10 max-w-6xl mx-auto">
        <ScrollReveal delay={0} yOffset={30} className="text-center mb-12">
          <p className="text-xs font-mono font-medium tracking-[0.25em] text-cyan-400/90 uppercase mb-2">
            // 02. TECHNICAL MATRIX
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold mb-4 text-titanium tracking-tight">
            Skills & Technologies
          </h2>
          <p className="text-zinc-400 mt-3 max-w-2xl mx-auto text-base sm:text-lg">
            Technologies, frameworks, and enterprise platforms I use to engineer scalable, high-throughput systems.
          </p>

          {/* OriginKit Category Filter Pills */}
          <div className="flex flex-wrap justify-center items-center gap-2 mt-8">
            {filterTabs.map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  aria-pressed={isSelected}
                  className={`relative px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                    isSelected ? "text-white font-semibold" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="skills-filter-pill"
                      className="absolute inset-0 rounded-full bg-zinc-800 border border-zinc-700/80 shadow-[0_2px_10px_rgba(0,0,0,0.5)] -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    />
                  )}
                  {tab.label}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="space-y-12"
          >
            {visibleCategories.map((category) => (
              <div key={category.label}>
                <h3 className="text-sm font-mono font-semibold mb-4 text-zinc-300 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  {category.label}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5">
                  {category.skills.map((skill) => (
                    <SpotlightCard
                      key={skill.name}
                      className="group bg-zinc-950/70 border-zinc-800/80 hover:border-zinc-700 transition-colors"
                      spotlightColor="rgba(56, 189, 248, 0.12)"
                    >
                      <div className="relative z-10 flex items-center gap-3 p-3.5">
                        <div className="transform group-hover:scale-110 transition-transform duration-300 shrink-0">
                          <Image
                            src={skill.icon}
                            alt={`${skill.name} icon`}
                            width={36}
                            height={36}
                            className={`w-9 h-9 object-contain ${
                              ["Express.js", "GitHub", "Next.js", "Django", "Vercel"].includes(skill.name)
                                ? "invert"
                                : ""
                            }`}
                            loading="lazy"
                            unoptimized
                          />
                        </div>
                        <p className="text-zinc-200 font-medium text-sm group-hover:text-white transition-colors duration-200 truncate">
                          {skill.name}
                        </p>
                      </div>
                    </SpotlightCard>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Continuous Engineering Evolution Banner */}
        <ScrollReveal delay={0.2} yOffset={25} className="mt-16 text-center">
          <div className="relative bg-zinc-950/70 rounded-2xl p-8 border border-zinc-800/80 [transform:translateZ(0)] hover:border-zinc-700 transition-colors max-w-4xl mx-auto overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 tracking-tight">Continuous Engineering Evolution</h3>
            <p className="text-zinc-400 leading-relaxed text-sm sm:text-base">
              Constantly expanding my engineering horizons. Currently focusing on{" "}
              <span className="text-zinc-200 font-medium">Autonomous AI Agent Architectures</span>,{" "}
              <span className="text-cyan-300 font-medium">Enterprise ServiceNow (CSA & CAD)</span>, and{" "}
              <span className="text-emerald-400 font-medium">High-Concurrency Cloud Systems</span>.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
