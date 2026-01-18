"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, Code2, Rocket, Layout, Server, Database, CloudOff, Brain, GraduationCap, CloudSun, MessageSquareCode, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import SpotlightCard from "@/components/ui/spotlight-card";

const projects = [
  {
    title: "AI Interview Platform",
    description: "An intelligent platform for technical interviews using React.js and local LLMs (Qwen). Currently under development.",
    tags: ["React.js", "Local LLMs (Qwen)", "Tailwind CSS"],
    links: { demo: "", github: "" },
    icon: <Brain className="w-8 h-8 text-cyan-400" />
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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-neutral-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-neutral-950 to-black"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
            Explore some of the applications I've built, demonstrating my expertise in full-stack development and modern UI design.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <SpotlightCard className="h-full bg-neutral-900/80 border-neutral-800 hover:border-neutral-700 transition-colors">
                <div className="p-8 h-full flex flex-col relative z-20">
                  <div className="mb-6 bg-neutral-800/50 w-16 h-16 rounded-xl flex items-center justify-center border border-neutral-700 shadow-inner">
                    {project.icon}
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{project.title}</h3>
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
                      <span className="text-xs font-mono text-gray-500 uppercase tracking-widest self-center">Coming Soon</span>
                    )}
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
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
        </motion.div>
      </div>
    </section>
  );
}
