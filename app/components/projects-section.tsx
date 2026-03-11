"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Code2, Rocket, Layout, Server, Database, CloudOff, Brain, GraduationCap, CloudSun, MessageSquareCode, Plane, Shield, Users, Trophy, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import SpotlightCard from "@/components/ui/spotlight-card";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

const projects = [
  {
    title: "Skillnox Platform",
    description: "Secure aptitude and technical assessment platform with tab-switching detection, AI extension blocking, disabled developer tools, and real-time test monitoring. Currently deployed on the college server (private repository).",
    tags: ["React", "Node.js", "Express", "PostgreSQL"],
    links: { demo: "", github: "" },
    icon: <Shield className="w-8 h-8 text-cyan-400" />,
    impact: "250+ Users • College Deployed",
  },
  {
    title: "Placement Management Portal",
    description: "College portal for managing placement drives, student data, and training records with TPO dashboard, performance tracking, and Excel/PDF export reports.",
    tags: ["React", "Node.js", "PostgreSQL"],
    links: { demo: "", github: "" },
    icon: <Users className="w-8 h-8 text-emerald-400" />,
    impact: "TPO Dashboard",
  },
  {
    title: "Skillnox.AI",
    description: "An intelligent AI-powered interview platform for technical assessments using React.js and local LLMs (Qwen). Currently under development.",
    tags: ["React.js", "Local LLMs (Qwen)", "Tailwind CSS"],
    links: { demo: "", github: "" },
    icon: <Brain className="w-8 h-8 text-cyan-400" />,
    impact: "AI-Powered",
  },
  {
    title: "Student Connect",
    description: "A hyperlocal microjob marketplace connecting people with verified university students for services like poster design, website development, tutoring, and quick microtasks. Hackathon Third Prize winner.",
    tags: ["Python", "Django", "PostgreSQL"],
    links: { demo: "http://studentconnect-sjc1.onrender.com/", github: "https://github.com/surendravarikallu/HSJM" },
    icon: <Briefcase className="w-8 h-8 text-violet-400" />,
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
    icon: <GraduationCap className="w-8 h-8 text-purple-400" />
  },
  {
    title: "SkySense",
    description: "Interactive weather dashboard providing real-time forecasts and geolocation services integration.",
    tags: ["TypeScript", "WeatherAPI", "Leaflet"],
    links: { demo: "https://weather-dashboard-wmdm.vercel.app/", github: "https://github.com/surendravarikallu/weather_dashboard" },
    icon: <CloudSun className="w-8 h-8 text-pink-400" />
  },
  {
    title: "Algo Assistant",
    description: "AI chat bot for Blockchain and Algorand development. capable of creating NFTs, tokens, and building blockchain apps.",
    tags: ["React.js", "Node.js", "Gemini API", "TailwindCSS"],
    links: { demo: "", github: "https://github.com/surendravarikallu/Algo-assistant" },
    icon: <MessageSquareCode className="w-8 h-8 text-orange-400" />
  },
  {
    title: "AdventureAura",
    description: "A travel agency website allowing users to book tours and view destinations, showcasing frontend fundamentals.",
    tags: ["HTML", "CSS", "JavaScript"],
    links: { demo: "https://adventure-aura-ivory.vercel.app/", github: "https://github.com/surendravarikallu/adventure_aura" },
    icon: <Plane className="w-8 h-8 text-blue-400" />
  }
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-neutral-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-neutral-950 to-black"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <ScrollReveal
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
            Explore some of the applications I've built, demonstrating my expertise in full-stack development and modern UI design.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ScrollReveal
              key={index}
              delay={index * 0.1}
            >
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
