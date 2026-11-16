"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import dynamic from "next/dynamic";
import { 
  ExternalLink, 
  Github, 
  Code2, 
  Brain, 
  GraduationCap, 
  CloudSun, 
  MessageSquareCode, 
  Shield, 
  Users, 
  Trophy, 
  Lock, 
  Key, 
  Activity, 
  Sparkles, 
  Terminal, 
  ArrowRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SpotlightCard from "@/components/ui/spotlight-card";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

const ArchitectureModal = dynamic(() => import("@/components/ui/architecture-modal").then(mod => mod.ArchitectureModal), { ssr: false });
const RequestAccessModal = dynamic(() => import("@/components/ui/request-access-modal").then(mod => mod.RequestAccessModal), { ssr: false });

interface TelemetryStat {
  label: string;
  value: string;
  highlight?: boolean;
}

interface FeaturedProject {
  title: string;
  label: string;
  statusBadge: string;
  description: string;
  features: string[];
  tags: string[];
  links: { demo: string; github: string };
  icon: React.ReactNode;
  impact: string;
  isPrivate: boolean;
  spotlightColor: string;
  specularGradient: string;
  telemetry: TelemetryStat[];
  impactDetails: string[];
}

const featuredProjects: FeaturedProject[] = [
  {
    title: "Skillnox.AI",
    label: "Flagship AI Platform",
    statusBadge: "LIVE PRODUCTION",
    description: "An intelligent, AI-powered technical assessment platform deployed as the successor to Skillnox. Features privacy-first local LLM evaluations (Qwen) combined with adaptive technical interviews and proctoring security.",
    telemetry: [
      { label: "ENGINE", value: "Qwen LLM", highlight: true },
      { label: "PRIVACY", value: "Local / Offline", highlight: false },
      { label: "PIPELINE", value: "Dual Inference", highlight: true },
    ],
    features: [
      "Privacy-first local LLM (Qwen) integration",
      "Real-time AI interview & response evaluation",
      "Adaptive technical assessment workflows",
      "Anti-cheating & proctoring security",
      "Child platform of KITAghire ecosystem",
      "Scalable multi-tenant assessment engine",
    ],
    tags: ["Local LLMs (Qwen)", "React.js", "Node.js", "PostgreSQL", "Tailwind CSS"],
    links: { demo: "https://skillnoxai.kitaghire.in", github: "" },
    icon: <Brain className="w-7 h-7 text-purple-400" aria-hidden="true" />,
    impact: "Live AI Platform • Successor to Skillnox",
    isPrivate: true,
    spotlightColor: "rgba(168, 85, 247, 0.16)",
    specularGradient: "from-purple-500/50 via-pink-500/20 to-transparent",
    impactDetails: [
      "Deployed live as the successor to Skillnox within the KITAghire ecosystem",
      "Autonomous AI interview evaluation with privacy-first LLM inference",
      "Engineered for high-concurrency technical testing & real-time feedback",
    ],
  },
  {
    title: "Skillnox Platform",
    label: "Proven Assessment Engine",
    statusBadge: "100% k6 TESTED",
    description: "A secure assessment platform designed for large-scale college testing with anti-cheating mechanisms and extreme scalability.",
    telemetry: [
      { label: "LOAD TEST", value: "5,000 VUs", highlight: true },
      { label: "SUCCESS", value: "100.00%", highlight: true },
      { label: "LATENCY", value: "3.97 ms", highlight: false },
    ],
    features: [
      "5,000 concurrent virtual users",
      "100.00% request success rate (k6 load test)",
      "3.97 ms avg latency under peak load",
      "Tab switching & shortcut key blocking",
      "Developer tools & AI extension blocking",
      "100k+ completed exams processed",
    ],
    tags: ["PM2 Cluster", "Redis", "PostgreSQL", "React", "Node.js / Express"],
    links: { demo: "https://skillnox.kitaghire.in", github: "" },
    icon: <Shield className="w-7 h-7 text-cyan-400" aria-hidden="true" />,
    impact: "100% Success at 5,000 VUs • 3.97ms Latency",
    isPrivate: true,
    spotlightColor: "rgba(34, 211, 238, 0.16)",
    specularGradient: "from-cyan-500/50 via-blue-500/20 to-transparent",
    impactDetails: [
      "Used by final-year and pre-final-year students across college departments",
      "Load tested with 100.00% success rate across 146,045 HTTP requests",
      "Actively deployed for secure online assessments (skillnox.kitaghire.in)",
    ],
  },
  {
    title: "KITAghire.in",
    label: "Active College Portal",
    statusBadge: "CAMPUS SCALE",
    description: "A live college training and placement portal actively used at college scale to manage placement drives, student profiles, and recruitment records, serving as the parent ecosystem.",
    telemetry: [
      { label: "SCALE", value: "Active Campus", highlight: true },
      { label: "DASHBOARD", value: "TPO Analytics", highlight: false },
      { label: "SYSTEM", value: "Parent Hub", highlight: true },
    ],
    features: [
      "Parent platform of Skillnox & Skillnox.AI",
      "Active college training & placement portal",
      "Comprehensive TPO analytics dashboard",
      "Placement drive & recruitment workflows",
      "Student profile & resume management",
      "Multi-department administrative controls",
    ],
    tags: ["Multi-Tenant", "PostgreSQL", "React", "Node.js", "Tailwind CSS"],
    links: { demo: "https://kitaghire.in", github: "" },
    icon: <Users className="w-7 h-7 text-emerald-400" aria-hidden="true" />,
    impact: "Parent Platform • Active College Scale",
    isPrivate: true,
    spotlightColor: "rgba(16, 185, 129, 0.16)",
    specularGradient: "from-emerald-500/50 via-teal-500/20 to-transparent",
    impactDetails: [
      "Parent ecosystem for Skillnox and Skillnox.AI",
      "Actively manages placement drives & student recruitment records",
      "Comprehensive TPO dashboard with real-time drive analytics",
    ],
  },
];

interface OtherProject {
  title: string;
  description: string;
  tags: string[];
  links: { demo: string; github: string };
  icon: React.ReactNode;
  iconBg?: string;
  impact?: string;
  impactType?: "award" | "feature" | "standard";
  spotlightColor?: string;
}

const otherProjects: OtherProject[] = [
  {
    title: "Global Smile",
    description: "Advanced prosthodontic care platform without borders. Integrates AI-powered smile visualization, treatment journeys, and global dental tourism coordination.",
    tags: ["React.js", "Vite", "Tailwind CSS", "PWA"],
    links: { demo: "https://global-smile-lc5h.onrender.com/", github: "https://github.com/surendravarikallu/Global-Smile" },
    icon: <Sparkles className="w-6 h-6 text-cyan-400" aria-hidden="true" />,
    iconBg: "bg-cyan-500/10 border-cyan-500/30",
    impact: "AI-Powered Dental Care",
    impactType: "feature",
    spotlightColor: "rgba(34, 211, 238, 0.12)",
  },
  {
    title: "Student Connect",
    description: "A collaborative platform developed during a hackathon to help students connect, share academic resources, and collaborate on projects. Secured 3rd prize at the college hackathon.",
    tags: ["Python", "Django", "PostgreSQL"],
    links: { demo: "https://studentconnect-sjc1.onrender.com/", github: "https://github.com/surendravarikallu/HSJM" },
    icon: <Trophy className="w-6 h-6 text-amber-400" aria-hidden="true" />,
    iconBg: "bg-amber-500/10 border-amber-500/30",
    impact: "Hackathon 3rd Prize",
    impactType: "award",
    spotlightColor: "rgba(251, 191, 36, 0.12)",
  },
  {
    title: "Bug Bounty Competition Platform",
    description: "Interactive cybersecurity event platform with multiple rounds including log analysis and vulnerable web exploitation, featuring secure login dashboards and event scoring.",
    tags: ["React", "Node.js", "Express"],
    links: { demo: "https://bug-bounty-j687.onrender.com/", github: "https://github.com/surendravarikallu/Bug_Bounty" },
    icon: <Terminal className="w-6 h-6 text-rose-400" aria-hidden="true" />,
    iconBg: "bg-rose-500/10 border-rose-500/30",
    impact: "Multi-round Scoring",
    impactType: "feature",
    spotlightColor: "rgba(244, 63, 94, 0.12)",
  },
  {
    title: "LumoraEd",
    description: "A comprehensive student learning platform featuring learning roadmaps, coding challenges, certification tracking, and real-time progress analytics.",
    tags: ["React", "Node.js", "MongoDB", "Express"],
    links: { demo: "https://lumoraed.onrender.com/", github: "https://github.com/surendravarikallu/LumoraEd" },
    icon: <GraduationCap className="w-6 h-6 text-purple-400" aria-hidden="true" />,
    iconBg: "bg-purple-500/10 border-purple-500/30",
    spotlightColor: "rgba(168, 85, 247, 0.12)",
  },
  {
    title: "SkySense",
    description: "Interactive weather dashboard providing real-time forecasts and geolocation services integration with responsive atmospheric telemetry.",
    tags: ["TypeScript", "WeatherAPI", "Leaflet"],
    links: { demo: "https://weather-dashboard-wmdm.vercel.app/", github: "https://github.com/surendravarikallu/weather_dashboard" },
    icon: <CloudSun className="w-6 h-6 text-sky-400" aria-hidden="true" />,
    iconBg: "bg-sky-500/10 border-sky-500/30",
    spotlightColor: "rgba(56, 189, 248, 0.12)",
  },
  {
    title: "Algo Assistant",
    description: "AI developer assistant for Blockchain and Algorand smart contracts, capable of generating NFTs, ARC asset tokens, and dApp scaffolding via Gemini API.",
    tags: ["React.js", "Gemini API", "Node.js", "TailwindCSS"],
    links: { demo: "", github: "https://github.com/surendravarikallu/Algo-assistant" },
    icon: <MessageSquareCode className="w-6 h-6 text-amber-400" aria-hidden="true" />,
    iconBg: "bg-amber-500/10 border-amber-500/30",
    impact: "Algorand AI Dev Assistant",
    impactType: "feature",
    spotlightColor: "rgba(245, 158, 11, 0.12)",
  },
];

function getTagBadgeStyle(tag: string): string {
  const t = tag.toLowerCase();
  if (t.includes("qwen") || t.includes("gemini") || t.includes("ai") || t.includes("llm")) {
    return "bg-purple-500/10 text-purple-300 border-purple-500/30 hover:border-purple-400/50";
  }
  if (t.includes("redis") || t.includes("pm2") || t.includes("cluster") || t.includes("postgres") || t.includes("mongo") || t.includes("multi-tenant") || t.includes("pwa")) {
    return "bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:border-emerald-400/50";
  }
  if (t.includes("react") || t.includes("next") || t.includes("node") || t.includes("express") || t.includes("django") || t.includes("python") || t.includes("typescript") || t.includes("vite")) {
    return "bg-cyan-500/10 text-cyan-300 border-cyan-500/30 hover:border-cyan-400/50";
  }
  return "bg-zinc-900 text-zinc-300 border-zinc-700/60 hover:border-zinc-500/60";
}

function FeaturedProjectCard({ 
  project, 
  index, 
  onOpenArchModal 
}: { 
  project: FeaturedProject; 
  index: number;
  onOpenArchModal: (type: "skillnox" | "skillnox_ai") => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <ScrollReveal delay={index * 0.12} className="h-full">
      <motion.div 
        whileHover={{ y: -6 }} 
        transition={{ type: "spring", stiffness: 300, damping: 20 }} 
        className="h-full"
      >
        <div className="relative h-full rounded-2xl p-[1px] bg-gradient-to-b from-zinc-700/60 via-zinc-800/40 to-zinc-900/20 group/card transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10">
          {/* Specular Top Hairpin Highlight */}
          <div 
            className={`absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r ${project.specularGradient} opacity-60 group-hover/card:opacity-100 transition-opacity`} 
            aria-hidden="true"
          />

          <SpotlightCard 
            spotlightColor={project.spotlightColor}
            className="h-full rounded-[15px] bg-zinc-950/90 backdrop-blur-xl border-0 transition-colors"
          >
            <div className="p-6 sm:p-7 relative z-20 h-full flex flex-col">
              {/* Top Meta Bar */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-zinc-900 text-zinc-300 border border-zinc-700/80 tracking-wider uppercase font-mono">
                  {project.label}
                </span>
                <span className="text-[11px] font-mono font-medium text-zinc-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                  {project.statusBadge}
                </span>
              </div>

              {/* Title & Icon Header */}
              <div className="flex items-start gap-3.5 mb-3">
                <div className="bg-zinc-900/90 w-13 h-13 p-2.5 rounded-xl flex items-center justify-center border border-zinc-800 shadow-inner shrink-0 group-hover/card:scale-105 transition-transform">
                  {project.icon}
                </div>
                <div className="min-w-0">
                  <h3 className="text-2xl font-bold text-white tracking-tight truncate group-hover/card:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  {project.impact && (
                    <span className="inline-block mt-1 text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-mono truncate max-w-full">
                      {project.impact}
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-zinc-300 mb-4 leading-relaxed text-sm min-h-[58px]">
                {project.description}
              </p>

              {/* Live Telemetry HUD Strip */}
              <div className="grid grid-cols-3 gap-2 mb-4 p-2.5 rounded-xl bg-zinc-900/70 border border-zinc-800/80">
                {project.telemetry.map((stat, i) => (
                  <div key={i} className="flex flex-col items-center justify-center text-center px-1">
                    <span className="text-[10px] font-mono font-medium uppercase tracking-wider text-zinc-400">
                      {stat.label}
                    </span>
                    <span className={`text-xs font-mono font-bold mt-0.5 truncate w-full ${stat.highlight ? 'text-white' : 'text-zinc-300'}`}>
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Key Features (Numbered Architecture List) */}
              <div className="mb-4">
                <p className="text-[11px] font-mono font-semibold text-zinc-400 mb-2 uppercase tracking-wider">
                  Key Architectural Highlights
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {project.features.map((feature: string, i: number) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-zinc-300">
                      <span className="text-[10px] font-mono text-cyan-400/90 select-none shrink-0" aria-hidden="true">
                        0{i + 1}.
                      </span>
                      <span className="truncate">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Impact & Verification Box */}
              <div className="mb-5 p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/70 min-h-[86px] flex flex-col justify-center">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                  <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                    Production Verification
                  </p>
                </div>
                <ul className="space-y-1">
                  {project.impactDetails.map((detail: string, i: number) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-zinc-300">
                      <span className="text-cyan-400 font-mono text-[11px] shrink-0" aria-hidden="true">→</span>
                      <span className="line-clamp-1">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Semantic Stack Badges */}
              <div className="flex flex-wrap gap-1.5 mb-5 min-h-[56px] content-start">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className={`text-xs font-mono font-medium px-2.5 py-1 rounded-md border transition-colors ${getTagBadgeStyle(tag)}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Unified Engineering Action Dock */}
              <div className="mt-auto pt-3 border-t border-zinc-800/80 w-full flex flex-col gap-2.5">
                {/* Standardized Primary Action Button (h-10 across all 3 cards) */}
                {project.title === 'Skillnox.AI' && (
                  <button
                    type="button"
                    onClick={() => onOpenArchModal("skillnox_ai")}
                    aria-label="View Skillnox.AI Architecture & Dual Inference Benchmarks"
                    className="w-full h-10 px-3.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-200 hover:text-white transition-all duration-200 flex items-center justify-between text-xs font-semibold group/arch shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Brain className="w-4 h-4 text-purple-400 group-hover/arch:scale-110 transition-transform" aria-hidden="true" />
                      <span>Dual Inference & AI Architecture</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-purple-400 group-hover/arch:translate-x-0.5 transition-transform" aria-hidden="true" />
                  </button>
                )}

                {project.title === 'Skillnox Platform' && (
                  <button
                    type="button"
                    onClick={() => onOpenArchModal("skillnox")}
                    aria-label="View Skillnox Platform 5,000 VU Stress Test & 3-Tier Caching"
                    className="w-full h-10 px-3.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-200 hover:text-white transition-all duration-200 flex items-center justify-between text-xs font-semibold group/arch shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-cyan-400 group-hover/arch:scale-110 transition-transform" aria-hidden="true" />
                      <span>5,000 VU Stress Test & Caching Telemetry</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-cyan-400 group-hover/arch:translate-x-0.5 transition-transform" aria-hidden="true" />
                  </button>
                )}

                {project.title === 'KITAghire.in' && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Explore KITAghire Campus Placement Portal"
                    className="w-full h-10 px-3.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-200 hover:text-white transition-all duration-200 flex items-center justify-between text-xs font-semibold group/arch shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-emerald-400 group-hover/arch:scale-110 transition-transform" aria-hidden="true" />
                      <span>Explore Campus Placement Ecosystem</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-400 group-hover/arch:translate-x-0.5 transition-transform" aria-hidden="true" />
                  </a>
                )}

                {/* Secondary Action Row: Repo Security & Access/Demo */}
                <div className="flex justify-between items-center gap-2 w-full pt-1">
                  <div className="flex items-center text-xs font-mono text-zinc-400">
                    {project.links.github ? (
                      <span className="flex items-center gap-1.5 text-cyan-400/90">
                        <Code2 className="w-3.5 h-3.5" aria-hidden="true" /> Open Source
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-zinc-400">
                        <Lock className="w-3.5 h-3.5 text-zinc-500" aria-hidden="true" /> Private Repo
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {project.isPrivate && !project.links.github && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-zinc-700/80 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs h-8 px-2.5 font-mono flex items-center transition-all"
                        onClick={() => setIsModalOpen(true)}
                        aria-label={`Request code access for ${project.title}`}
                      >
                        <Key className="w-3 h-3 mr-1 text-amber-400" aria-hidden="true" />
                        Access
                      </Button>
                    )}

                    {project.links.demo && (
                      <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 h-8 px-2.5 text-xs font-mono" asChild>
                        <a 
                          href={project.links.demo} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          aria-label={`Live demo for ${project.title}`}
                        >
                          <ExternalLink className="w-3 h-3 mr-1" aria-hidden="true" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {isModalOpen && (
              <RequestAccessModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                projectTitle={project.title} 
              />
            )}
          </SpotlightCard>
        </div>
      </motion.div>
    </ScrollReveal>
  );
}

function ProjectCard({ project, index }: { project: OtherProject; index: number }) {
  return (
    <ScrollReveal delay={index * 0.08} className="h-full">
      <motion.div 
        whileHover={{ y: -6 }} 
        transition={{ type: "spring", stiffness: 300, damping: 20 }} 
        className="h-full"
      >
        <div className="relative h-full rounded-2xl p-[1px] bg-gradient-to-b from-zinc-700/40 via-zinc-800/30 to-zinc-900/20 group/card transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/5">
          <SpotlightCard 
            spotlightColor={project.spotlightColor || "rgba(34, 211, 238, 0.12)"}
            className="h-full rounded-[15px] bg-zinc-950/85 backdrop-blur-xl border-0"
          >
            <div className="p-6 sm:p-7 h-full flex flex-col relative z-20 w-full">
              {/* Header Icon & Award Tag */}
              <div className="flex items-start justify-between gap-3 mb-5">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shadow-inner ${project.iconBg || 'bg-zinc-900/90 border-zinc-800'}`}>
                  {project.icon}
                </div>
                {project.impact && (
                  <span className={`text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full border ${
                    project.impactType === 'award'
                      ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                      : 'bg-cyan-500/10 text-cyan-300 border-cyan-500/25'
                  }`}>
                    {project.impact}
                  </span>
                )}
              </div>

              <h3 className="text-xl font-bold text-white mb-2.5 tracking-tight group-hover/card:text-cyan-300 transition-colors">
                {project.title}
              </h3>
              
              <p className="text-zinc-400 mb-5 leading-relaxed text-sm flex-grow">
                {project.description}
              </p>

              {/* Categorized Tech Badges */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className={`text-xs font-mono font-medium px-2.5 py-0.5 rounded-md border transition-colors ${getTagBadgeStyle(tag)}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Bar */}
              <div className="flex justify-between items-center gap-2 pt-4 border-t border-zinc-800/70 mt-auto w-full">
                <div className="flex items-center text-xs font-mono text-zinc-400">
                  {project.links.github ? (
                    <span className="flex items-center gap-1.5 text-zinc-400 group-hover/card:text-cyan-400/90 transition-colors">
                      <Code2 className="w-3.5 h-3.5" aria-hidden="true" /> Open Source
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-zinc-500">
                      <Lock className="w-3.5 h-3.5" aria-hidden="true" /> Private Repo
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {project.links.github && (
                    <Button variant="ghost" size="sm" className="text-zinc-300 hover:text-white hover:bg-zinc-800 h-8 px-2.5 text-xs font-mono" asChild>
                      <a 
                        href={project.links.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label={`Source code for ${project.title}`}
                      >
                        <Github className="w-3.5 h-3.5 mr-1.5" aria-hidden="true" />
                        Code
                      </a>
                    </Button>
                  )}

                  {project.links.demo && (
                    <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 h-8 px-2.5 text-xs font-mono" asChild>
                      <a 
                        href={project.links.demo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label={`Live demo for ${project.title}`}
                      >
                        <ExternalLink className="w-3.5 h-3.5 mr-1.5" aria-hidden="true" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </motion.div>
    </ScrollReveal>
  );
}

export default function ProjectsSection() {
  const [archModalProject, setArchModalProject] = useState<"skillnox" | "skillnox_ai" | null>(null);

  return (
    <section id="projects" aria-label="Featured Software Engineering Projects" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-clip bg-neutral-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/40 via-neutral-950 to-black"></div>

      {/* Floating Ambient Glow Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="particle w-1.5 h-1.5 bg-cyan-400/30 top-[15%] left-[10%]" style={{"--duration": "7s", "--delay": "0s"} as React.CSSProperties} />
        <div className="particle w-1 h-1 bg-purple-400/25 top-[25%] left-[85%]" style={{"--duration": "9s", "--delay": "1s"} as React.CSSProperties} />
        <div className="particle w-2 h-2 bg-cyan-400/15 top-[45%] left-[20%]" style={{"--duration": "11s", "--delay": "2s"} as React.CSSProperties} />
        <div className="particle w-1 h-1 bg-purple-500/30 top-[35%] left-[70%]" style={{"--duration": "8s", "--delay": "0.5s"} as React.CSSProperties} />
        <div className="particle w-1.5 h-1.5 bg-pink-400/20 top-[60%] left-[50%]" style={{"--duration": "10s", "--delay": "3s"} as React.CSSProperties} />
        <div className="particle w-1 h-1 bg-cyan-300/25 top-[10%] left-[45%]" style={{"--duration": "6s", "--delay": "1.5s"} as React.CSSProperties} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Featured Projects Header */}
        <ScrollReveal className="text-center mb-16">
          <p className="text-xs font-mono font-medium tracking-[0.25em] text-cyan-400/90 uppercase mb-2">
            // 04. FLAGSHIP ENGINEERING
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold mb-4 text-titanium tracking-tight">
            Featured Projects
          </h2>
          <p className="text-zinc-400 mt-3 max-w-2xl mx-auto text-base sm:text-lg">
            Production architectures, high-concurrency assessment systems, and offline-capable AI inference engines.
          </p>
        </ScrollReveal>

        {/* Featured Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24 items-stretch">
          {featuredProjects.map((project, index) => (
            <FeaturedProjectCard 
              key={project.title} 
              project={project} 
              index={index} 
              onOpenArchModal={(type) => setArchModalProject(type)}
            />
          ))}
        </div>

        {/* Other Projects Header */}
        <ScrollReveal className="text-center mb-12">
          <p className="text-xs font-mono font-medium tracking-[0.25em] text-zinc-500 uppercase mb-2">
            // EXPLORATIONS & PRODUCTION UTILITIES
          </p>
          <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-white tracking-tight">
            Additional Projects
          </h3>
          <p className="text-zinc-400 max-w-xl mx-auto text-sm">
            Full-stack platforms, developer tools, and competition-winning platforms.
          </p>
        </ScrollReveal>

        {/* Other Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        <ScrollReveal
          delay={0.2}
          className="text-center mt-14"
        >
          <Button
            size="lg"
            variant="outline"
            className="border-zinc-800 bg-zinc-950/80 text-zinc-300 hover:bg-zinc-800 hover:text-white px-8 py-6 rounded-full text-base font-mono transition-all hover:border-zinc-700 shadow-lg"
            onClick={() => window.open("https://github.com/surendravarikallu", "_blank")}
            aria-label="View more projects on Surendra's GitHub"
          >
            <Github className="mr-2 h-5 w-5" aria-hidden="true" />
            Explore More Repositories on GitHub
          </Button>
        </ScrollReveal>
      </div>

      {/* Portaled Architecture & Benchmarks Modal */}
      <ArchitectureModal
        isOpen={!!archModalProject}
        onClose={() => setArchModalProject(null)}
        projectType={archModalProject}
      />
    </section>
  );
}
