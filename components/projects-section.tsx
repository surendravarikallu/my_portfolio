"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Github, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "Full-stack e-commerce application built with React, Node.js, and MongoDB. Features include user authentication, product catalog, shopping cart, and payment integration.",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
    github: "https://github.com",
    live: "https://example.com",
    gradient: "from-blue-500 to-purple-600",
  },
  {
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["React", "Firebase", "Tailwind CSS"],
    github: "https://github.com",
    live: "https://example.com",
    gradient: "from-green-500 to-teal-600",
  },
  {
    title: "SkySense Weather Dashboard",
    description:
      "Interactive weather dashboard with location-based forecasts, charts, and weather alerts. Built with modern web technologies and APIs.",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["JavaScript", "Chart.js", "Weather API"],
    github: "https://github.com/surendravarikallu/weather_dashboard",
    live: "https://weather-dashboard-wmdm.vercel.app/",
    gradient: "from-cyan-500 to-blue-600",
  },
]

export default function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-800"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and experience
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300">
                {/* Project Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                  ></div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">{project.description}</p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-cyan-400/20 text-cyan-400 text-xs rounded-full border border-cyan-400/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-cyan-400/50 text-cyan-400 hover:bg-cyan-400 hover:text-gray-900 transition-all duration-300 bg-transparent"
                      onClick={() => window.open(project.github, "_blank")}
                    >
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </Button>
                    <Button
                      size="sm"
                      className={`flex-1 bg-gradient-to-r ${project.gradient} hover:opacity-90 transition-opacity duration-300`}
                      onClick={() => window.open(project.live, "_blank")}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More Projects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            variant="outline"
            className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 bg-transparent"
            onClick={() => window.open("https://github.com", "_blank")}
          >
            <Github className="mr-2 h-5 w-5" />
            View More Projects
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
