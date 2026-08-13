"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ExternalLink, Github, Code2, Rocket, Layout, Server, Database, CloudOff, Brain, GraduationCap, CloudSun, MessageSquareCode, Plane, Shield, Users, Trophy, Briefcase, Lock, Star, Mail, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import SpotlightCard from "@/components/ui/spotlight-card";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { RequestAccessModal } from "@/components/ui/request-access-modal";
import { GradientBorder } from "@/components/animations/GradientBorder";

const featuredProjects = [
  {
    title: "Skillnox.AI",
    label: "Flagship AI Platform",
    description: "An intelligent, AI-powered technical assessment platform deployed as the successor to Skillnox. Features privacy-first local LLM evaluations (Qwen) combined with adaptive technical interviews and proctoring security.",
    features: [
      "Privacy-first local LLM (Qwen) integration",
      "Real-time AI interview & response evaluation",
      "Adaptive technical assessment workflows",
      "Anti-cheating & proctoring security",
      "Child platform of KITAghire ecosystem",
      "Scalable multi-tenant assessment engine",
    ],
    tags: ["React.js", "Local LLMs (Qwen)", "Node.js", "PostgreSQL", "Tailwind CSS"],
    links: { demo: "https://skillnoxai.kitaghire.in", github: "" },
    icon: <Brain className="w-8 h-8 text-purple-400" />,
    impact: "Live AI Platform • Successor to Skillnox",
    isPrivate: true,
    gradient: "from-purple-500/20 to-pink-600/20",
    borderGlow: "hover:border-purple-500/40",
    impactDetails: [
      "Deployed live as the successor to Skillnox within the KITAghire ecosystem",
      "Autonomous AI interview evaluation with privacy-first LLM inference",
      "Engineered for high-concurrency technical testing & real-time feedback",
    ],
  },
  {
    title: "Skillnox Platform",
    label: "Proven Assessment Engine",
    description: "A secure assessment platform designed for large-scale college testing with anti-cheating mechanisms and extreme scalability.",
    features: [
      "5,000 concurrent virtual users",
      "100.00% request success rate (k6 load test)",
      "3.97 ms avg latency under peak load",
      "Tab switching & shortcut key blocking",
      "Developer tools & AI extension blocking",
      "100k+ completed exams processed",
    ],
    tags: ["React", "Node.js", "Express", "PostgreSQL", "Redis", "PM2 Cluster"],
    links: { demo: "https://skillnox.kitaghire.in", github: "" },
    icon: <Shield className="w-8 h-8 text-cyan-400" />,
    impact: "100% Success at 5,000 VUs • 3.97ms Latency",
    isPrivate: true,
    gradient: "from-cyan-500/20 to-blue-600/20",
    borderGlow: "hover:border-cyan-500/40",
    impactDetails: [
      "Used by final-year and pre-final-year students across college departments",
      "Load tested with 100.00% success rate across 146,045 HTTP requests",
      "Actively deployed for secure online assessments (skillnox.kitaghire.in)",
    ],
  },
  {
    title: "KITAghire.in",
    label: "Active College Portal",
    description: "A live college training and placement portal actively used at college scale to manage placement drives, student profiles, and recruitment records, serving as the parent ecosystem.",
    features: [
      "Parent platform of Skillnox & Skillnox.AI",
      "Active college training & placement portal",
      "Comprehensive TPO analytics dashboard",
      "Placement drive & recruitment workflows",
      "Student profile & resume management",
      "Multi-department administrative controls",
    ],
    tags: ["React", "Node.js", "Express", "PostgreSQL", "Tailwind CSS"],
    links: { demo: "https://kitaghire.in", github: "" },
    icon: <Users className="w-8 h-8 text-emerald-400" />,
    impact: "Parent Platform • Active College Scale",
    isPrivate: true,
    gradient: "from-emerald-500/20 to-teal-600/20",
    borderGlow: "hover:border-emerald-500/40",
    impactDetails: [
      "Parent ecosystem for Skillnox and Skillnox.AI",
      "Actively manages placement drives & student recruitment records",
      "Comprehensive TPO dashboard with real-time drive analytics",
    ],
  },
];

const otherProjects = [
  {
    title: "Global Smile",
    description: "Advanced prosthodontic care platform without borders. Integrates AI-powered smile visualization, treatment journeys, and global dental tourism coordination.",
    tags: ["React.js", "Vite", "Tailwind CSS", "PWA"],
    links: { demo: "http://global-smile-lc5h.onrender.com/", github: "https://github.com/surendravarikallu/Global-Smile" },
    icon: <Rocket className="w-8 h-8 text-amber-400" />,
    impact: "AI-Powered Dental Care",
  },
  {
    title: "Student Connect",
    description: "A collaborative platform developed during a hackathon to help students connect, share academic resources, and collaborate on projects. Secured 3rd prize at the college hackathon.",
    tags: ["Python", "Django", "PostgreSQL"],
    links: { demo: "http://studentconnect-sjc1.onrender.com/", github: "https://github.com/surendravarikallu/HSJM" },
    icon: <Trophy className="w-8 h-8 text-amber-400" />,
    impact: "Hackathon 3rd Prize",
  },
  {
    title: "Bug Bounty Competition Platform",
    description: "Interactive cybersecurity event platform with multiple rounds including log analysis and vulnerable web exploitation, featuring secure login dashboards and event scoring.",
    tags: ["React", "Node.js", "Express"],
    links: { demo: "https://bug-bounty-j687.onrender.com/", github: "https://github.com/surendravarikallu/Bug_Bounty" },
    icon: <Trophy className="w-8 h-8 text-amber-400" />,
    impact: "Multi-round Scoring",
  },
  {
    title: "LumoraEd",
    description: "A comprehensive student learning platform featuring learning roadmaps, coding challenges, certification tracking, and real-time progress analytics.",
    tags: ["React", "Node.js", "MongoDB", "Express"],
    links: { demo: "https://lumoraed.onrender.com/", github: "https://github.com/surendravarikallu/LumoraEd" },
    icon: <GraduationCap className="w-8 h-8 text-purple-400" />,
  },
  {
    title: "SkySense",
    description: "Interactive weather dashboard providing real-time forecasts and geolocation services integration.",
    tags: ["TypeScript", "WeatherAPI", "Leaflet"],
    links: { demo: "https://weather-dashboard-wmdm.vercel.app/", github: "https://github.com/surendravarikallu/weather_dashboard" },
    icon: <CloudSun className="w-8 h-8 text-pink-400" />,
  },
  {
    title: "Algo Assistant",
    description: "AI chat bot for Blockchain and Algorand development. capable of creating NFTs, tokens, and building blockchain apps.",
    tags: ["React.js", "Node.js", "Gemini API", "TailwindCSS"],
    links: { demo: "", github: "https://github.com/surendravarikallu/Algo-assistant" },
    icon: <MessageSquareCode className="w-8 h-8 text-orange-400" />,
  },
];

function FeaturedProjectCard({ project, index }: { project: typeof featuredProjects[0]; index: number }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <ScrollReveal delay={index * 0.15} className="h-full">
      <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="h-full">
        <GradientBorder className="h-full" speed={4 + index}>
        <SpotlightCard className={`h-full bg-neutral-900/80 border-neutral-800 ${project.borderGlow} transition-all duration-300`}>
          <div className="p-6 sm:p-8 relative z-20 h-full flex flex-col">
            {/* Label */}
            <span className="inline-block mb-4 text-xs font-bold px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white border border-cyan-500/30 tracking-wide uppercase self-start">
              {project.label}
            </span>

            {/* Screenshot Preview Placeholder */}
            <div className={`w-full h-40 rounded-xl mb-6 bg-gradient-to-br ${project.gradient} border border-white/10 flex items-center justify-center overflow-hidden shrink-0`}>
              <div className="text-center">
                <div className="mb-2">{project.icon}</div>
                <p className="text-xs text-gray-400 font-mono">{project.title}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 mb-4">
              <div className="bg-neutral-800/50 w-14 h-14 rounded-xl flex items-center justify-center border border-neutral-700 shadow-inner shrink-0">
                {project.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white tracking-tight">{project.title}</h3>
                {'impact' in project && project.impact && (
                  <span className="inline-block mt-1 text-xs font-semibold px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-400 border border-cyan-500/25">
                    {project.impact}
                  </span>
                )}
              </div>
            </div>

            <p className="text-gray-400 mb-5 leading-relaxed">{project.description}</p>

            {/* Features list (for Skillnox) */}
            {'features' in project && project.features && (
              <div className="mb-5">
                <h4 className="text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wider">Key Features</h4>
                <div className="grid grid-cols-2 gap-2">
                  {project.features.map((feature: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0"></span>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Impact details (for Skillnox) */}
            {'impactDetails' in project && project.impactDetails && (
              <div className="mb-5 p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wider">Impact</h4>
                <ul className="space-y-1">
                  {project.impactDetails.map((detail: string, i: number) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-400">
                      <span className="text-cyan-400">▹</span> {detail}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs font-medium px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 pt-4 border-t border-neutral-800/50 mt-auto w-full">
              {/* Repository Status Badge */}
              <div className="flex items-center text-xs font-mono text-neutral-500">
                {project.links.github ? (
                  <span className="flex items-center gap-1.5 text-cyan-400/80">
                    <Code2 className="w-3.5 h-3.5" /> Open Source
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-neutral-500">
                    <Lock className="w-3.5 h-3.5" /> Private Repository
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center gap-2 w-full min-h-9">
                <div className="flex gap-2">
                  {project.links.github && (
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-white/5 h-9" asChild>
                      <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </a>
                    </Button>
                  )}
                  
                  {'isPrivate' in project && project.isPrivate && !project.links.github && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/50 text-xs h-9 px-3 flex items-center"
                      onClick={() => setIsModalOpen(true)}
                    >
                      <Key className="w-3.5 h-3.5 mr-1" />
                      Request Access
                    </Button>
                  )}
                </div>

                {project.links.demo && (
                  <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 ml-auto h-9" asChild>
                    <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>

          <RequestAccessModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            projectTitle={project.title} 
          />
        </SpotlightCard>
        </GradientBorder>
      </motion.div>
    </ScrollReveal>
  );
}

function ProjectCard({ project, index }: { project: typeof otherProjects[0]; index: number }) {
  return (
    <ScrollReveal delay={index * 0.1}>
      <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="h-full">
        <SpotlightCard className="h-full bg-neutral-900/80 border-neutral-800 hover:border-neutral-700 transition-colors">
          <div className="p-6 sm:p-8 h-full flex flex-col relative z-20 w-full">
            <div className="mb-6 bg-neutral-800/50 w-16 h-16 rounded-xl flex items-center justify-center border border-neutral-700 shadow-inner">
              {project.icon}
            </div>

            <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{project.title}</h3>
            {'impact' in project && project.impact && (
              <span className="inline-block mb-3 text-xs font-semibold px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-400 border border-cyan-500/25">
                {project.impact}
              </span>
            )}
            <p className="text-gray-400 mb-6 leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs font-medium px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-3 pt-4 border-t border-neutral-800/50 mt-auto w-full">
              {/* Repository Status Badge */}
              <div className="flex items-center text-xs font-mono text-neutral-500">
                {project.links.github ? (
                  <span className="flex items-center gap-1.5 text-cyan-400/80">
                    <Code2 className="w-3.5 h-3.5" /> Open Source
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-neutral-500">
                    <Lock className="w-3.5 h-3.5" /> Private Repository
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center gap-2 w-full min-h-9">
                {project.links.github && (
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-white/5 h-9" asChild>
                    <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </a>
                  </Button>
                )}

                {project.links.demo ? (
                  <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 ml-auto h-9" asChild>
                    <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                ) : (
                  !project.links.github && (
                    <Button variant="ghost" size="sm" disabled className="text-gray-600 ml-auto cursor-not-allowed hover:bg-transparent h-9">
                      <CloudOff className="w-4 h-4 mr-2" />
                      Not Deployed
                    </Button>
                  )
                )}
              </div>
            </div>
          </div>
        </SpotlightCard>
      </motion.div>
    </ScrollReveal>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-clip bg-neutral-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-neutral-950 to-black"></div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="particle w-1.5 h-1.5 bg-cyan-400/40 top-[15%] left-[10%]" style={{"--duration": "7s", "--delay": "0s"} as React.CSSProperties} />
        <div className="particle w-1 h-1 bg-purple-400/30 top-[25%] left-[85%]" style={{"--duration": "9s", "--delay": "1s"} as React.CSSProperties} />
        <div className="particle w-2 h-2 bg-cyan-400/20 top-[45%] left-[20%]" style={{"--duration": "11s", "--delay": "2s"} as React.CSSProperties} />
        <div className="particle w-1 h-1 bg-purple-500/40 top-[35%] left-[70%]" style={{"--duration": "8s", "--delay": "0.5s"} as React.CSSProperties} />
        <div className="particle w-1.5 h-1.5 bg-pink-400/25 top-[60%] left-[50%]" style={{"--duration": "10s", "--delay": "3s"} as React.CSSProperties} />
        <div className="particle w-1 h-1 bg-cyan-300/35 top-[10%] left-[45%]" style={{"--duration": "6s", "--delay": "1.5s"} as React.CSSProperties} />
        <div className="particle w-2 h-2 bg-purple-400/15 top-[70%] left-[80%]" style={{"--duration": "12s", "--delay": "4s"} as React.CSSProperties} />
        <div className="particle w-1 h-1 bg-cyan-400/30 top-[80%] left-[30%]" style={{"--duration": "9s", "--delay": "2.5s"} as React.CSSProperties} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Featured Projects Header */}
        <ScrollReveal className="text-center mb-16">
          <TextReveal text="Featured Projects" className="text-4xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600" />
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto rounded-full animate-glow-line"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
            Highlights from my work — production systems, hackathon wins, and emerging AI platforms.
          </p>
        </ScrollReveal>

        {/* Featured Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          {featuredProjects.map((project, index) => (
            <FeaturedProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* Other Projects Header */}
        <ScrollReveal className="text-center mb-12">
          <TextReveal text="Other Projects" className="text-3xl sm:text-4xl font-bold mb-4 text-white" />
          <div className="w-16 h-0.5 bg-gradient-to-r from-gray-700 to-gray-500 mx-auto rounded-full"></div>
        </ScrollReveal>

        {/* Other Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherProjects.map((project, index) => (
            <ScrollReveal key={project.title} delay={index * 0.08} blur={true}>
              <ProjectCard project={project} index={index} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal
          delay={0.3}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            variant="outline"
            className="border-neutral-700 text-neutral-300 hover:bg-neutral-800 hover:text-white px-8 py-6 rounded-full text-lg transition-all"
            onClick={() => window.open("https://github.com/surendravarikallu", "_blank")}
          >
            <Github className="mr-2 h-5 w-5" />
            View More on GitHub
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
