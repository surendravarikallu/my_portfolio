"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Code2, Rocket, Layout, Server, Database, CloudOff, Brain, GraduationCap, CloudSun, MessageSquareCode, Plane, Shield, Users, Trophy, Briefcase, Lock, Star, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import SpotlightCard from "@/components/ui/spotlight-card";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

const featuredProjects = [
  {
    title: "Skillnox Platform",
    label: "⭐ Featured Project",
    description: "A secure assessment platform designed for large-scale college-level testing with advanced anti-cheating mechanisms.",
    features: [
      "250+ concurrent users",
      "Tab switching detection",
      "Shortcut / Windows key blocking",
      "Developer tools disabled",
      "AI extension blocking",
      "Real-time evaluation",
    ],
    tags: ["React", "Node.js", "Express", "PostgreSQL"],
    links: { demo: "", github: "" },
    icon: <Shield className="w-8 h-8 text-cyan-400" />,
    impact: "250+ Users • College Deployed",
    isPrivate: true,
    gradient: "from-cyan-500/20 to-blue-600/20",
    borderGlow: "hover:border-cyan-500/40",
    impactDetails: [
      "Used by final-year and pre-final-year students",
      "Enables secure online assessments",
      "Reduces malpractice",
    ],
  },
  {
    title: "Student Connect",
    label: "🏆 Hackathon Project",
    description: "A collaborative platform developed during a hackathon to help students connect, share academic resources, and collaborate on projects. Secured 3rd prize at the college hackathon.",
    features: [
      "Resource sharing system",
      "Project collaboration",
      "Student networking",
      "Academic forums",
      "Real-time messaging",
      "Built in 48 hours",
    ],
    tags: ["Python", "Django", "PostgreSQL"],
    links: { demo: "http://studentconnect-sjc1.onrender.com/", github: "https://github.com/surendravarikallu/HSJM" },
    icon: <Trophy className="w-8 h-8 text-amber-400" />,
    impact: "Hackathon 3rd Prize",
    gradient: "from-amber-500/20 to-orange-600/20",
    borderGlow: "hover:border-amber-500/40",
    impactDetails: [
      "Secured 3rd place among competing teams",
      "Full-stack app built in 48-hour hackathon",
      "Live demo deployed on Render",
    ],
  },
  {
    title: "Skillnox.AI",
    label: "🚀 In Development",
    description: "An intelligent AI-powered interview platform for technical assessments using React.js and local LLMs (Qwen). Brings AI-driven evaluation to the Skillnox ecosystem.",
    features: [
      "AI-driven evaluation",
      "Local LLM integration",
      "Technical assessments",
      "Interview simulation",
      "Real-time feedback",
      "Adaptive questioning",
    ],
    tags: ["React.js", "Local LLMs (Qwen)", "Tailwind CSS"],
    links: { demo: "", github: "" },
    icon: <Brain className="w-8 h-8 text-purple-400" />,
    impact: "AI-Powered",
    gradient: "from-purple-500/20 to-pink-600/20",
    borderGlow: "hover:border-purple-500/40",
    impactDetails: [
      "Extends the Skillnox ecosystem with AI",
      "Uses local LLMs for privacy-first evaluation",
      "Designed for scalable technical hiring",
    ],
  },
];

const otherProjects = [
  {
    title: "Placement Management Portal",
    description: "College portal for managing placement drives, student data, and training records with TPO dashboard, performance tracking, and Excel/PDF export reports.",
    tags: ["React", "Node.js", "PostgreSQL"],
    links: { demo: "", github: "" },
    icon: <Users className="w-8 h-8 text-emerald-400" />,
    impact: "TPO Dashboard",
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
  {
    title: "AdventureAura",
    description: "A travel agency website allowing users to book tours and view destinations, showcasing frontend fundamentals.",
    tags: ["HTML", "CSS", "JavaScript"],
    links: { demo: "https://adventure-aura-ivory.vercel.app/", github: "https://github.com/surendravarikallu/adventure_aura" },
    icon: <Plane className="w-8 h-8 text-blue-400" />,
  },
];

function FeaturedProjectCard({ project, index }: { project: typeof featuredProjects[0]; index: number }) {
  return (
    <ScrollReveal delay={index * 0.15} className="h-full">
      <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="h-full">
        <SpotlightCard className={`h-full bg-neutral-900/80 border-neutral-800 ${project.borderGlow} transition-all duration-300`}>
          <div className="p-8 relative z-20 h-full flex flex-col">
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

            <p className="text-gray-400 mb-5 leading-relaxed flex-grow">{project.description}</p>

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
            <div className="flex gap-4 pt-4 border-t border-neutral-800/50 mt-auto">
              {project.links.github && (
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-white/5" asChild>
                  <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    Code
                  </a>
                </Button>
              )}
              {project.links.demo ? (
                <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 ml-auto" asChild>
                  <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </a>
                </Button>
              ) : 'isPrivate' in project && project.isPrivate ? (
                <div className="ml-auto flex items-center gap-3">
                  <span className="text-xs font-mono text-gray-500 uppercase tracking-widest flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5" /> Private Repository
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/50 text-xs"
                    onClick={() => window.open("mailto:varikallusurendra@gmail.com?subject=Skillnox%20Project%20Details%20Request", "_blank")}
                  >
                    <Mail className="w-3.5 h-3.5 mr-1.5" />
                    Details on request
                  </Button>
                </div>
              ) : (
                !project.links.github && (
                  <span className="text-xs font-mono text-gray-500 uppercase tracking-widest self-center flex items-center gap-2 ml-auto">
                    <Lock className="w-3.5 h-3.5" /> Private Repository
                  </span>
                )
              )}
            </div>
          </div>
        </SpotlightCard>
      </motion.div>
    </ScrollReveal>
  );
}

function ProjectCard({ project, index }: { project: typeof otherProjects[0]; index: number }) {
  return (
    <ScrollReveal delay={index * 0.1}>
      <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="h-full">
        <SpotlightCard className="h-full bg-neutral-900/80 border-neutral-800 hover:border-neutral-700 transition-colors">
          <div className="p-8 h-full flex flex-col relative z-20">
            <div className="mb-6 bg-neutral-800/50 w-16 h-16 rounded-xl flex items-center justify-center border border-neutral-700 shadow-inner">
              {project.icon}
            </div>

            <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{project.title}</h3>
            {'impact' in project && project.impact && (
              <span className="inline-block mb-3 text-xs font-semibold px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-400 border border-cyan-500/25">
                {project.impact}
              </span>
            )}
            <p className="text-gray-400 mb-6 flex-grow leading-relaxed">
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

            <div className="flex gap-4 pt-4 mt-auto border-t border-neutral-800/50">
              {project.links.github && (
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-white/5" asChild>
                  <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    Code
                  </a>
                </Button>
              )}
              {project.links.demo ? (
                <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 ml-auto" asChild>
                  <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </a>
                </Button>
              ) : (
                project.links.github && (
                  <Button variant="ghost" size="sm" disabled className="text-gray-600 ml-auto cursor-not-allowed hover:bg-transparent">
                    <CloudOff className="w-4 h-4 mr-2" />
                    Not Deployed
                  </Button>
                )
              )}
              {!project.links.github && !project.links.demo && (
                <span className="text-xs font-mono text-gray-500 uppercase tracking-widest self-center flex items-center gap-2">🔒 Private Repository</span>
              )}
            </div>
          </div>
        </SpotlightCard>
      </motion.div>
    </ScrollReveal>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-neutral-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-neutral-950 to-black"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Featured Projects Header */}
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto rounded-full"></div>
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
          <h3 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
            Other Projects
          </h3>
          <div className="w-16 h-0.5 bg-gradient-to-r from-gray-700 to-gray-500 mx-auto rounded-full"></div>
        </ScrollReveal>

        {/* Other Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
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
