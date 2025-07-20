"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Github, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

const techLogos: Record<string, React.ReactNode> = {
  'React': (
    <svg className="w-7 h-7" viewBox="0 0 128 128"><g><circle cx="64" cy="64" r="11.4" fill="#61DAFB"/><g stroke="#61DAFB" strokeWidth="6" fill="none"><ellipse rx="56" ry="24" cx="64" cy="64"/><ellipse rx="56" ry="24" cx="64" cy="64" transform="rotate(60 64 64)"/><ellipse rx="56" ry="24" cx="64" cy="64" transform="rotate(120 64 64)"/></g></g></svg>
  ),
  'Node.js': (
    <svg className="w-7 h-7" viewBox="0 0 128 128"><path fill="#393" d="M64 8l56 32v48l-56 32-56-32V40z"/><path fill="#fff" d="M64 16l48 28v40l-48 28-48-28V44z"/><path fill="#393" d="M64 24l40 24v32l-40 24-40-24V48z"/><path d="M88.1 86.7c-2.2 0-4.1-1.2-4.1-4.1 0-2.2 1.9-4.1 4.1-4.1s4.1 1.9 4.1 4.1c0 2.9-1.9 4.1-4.1 4.1zm-12.3-4.1c0-2.2 1.9-4.1 4.1-4.1s4.1 1.9 4.1 4.1c0 2.9-1.9 4.1-4.1 4.1s-4.1-1.2-4.1-4.1z" fill="#fff"/></svg>
  ),
  'MongoDB': (
    <svg className="w-7 h-7" viewBox="0 0 128 128"><path fill="#47A248" d="M64 8c0 0-32 48 0 112 32-64 0-112 0-112z"/><ellipse cx="64" cy="64" rx="8" ry="24" fill="#47A248"/></svg>
  ),
  'Express': (
    <svg className="w-7 h-7" viewBox="0 0 128 128"><circle cx="64" cy="64" r="60" fill="#fff"/><text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" fontFamily="Arial, Helvetica, sans-serif" fontSize="28" fill="#000">express</text></svg>
  ),
  'Firebase': (
    <svg className="w-7 h-7" viewBox="0 0 128 128"><path fill="#FFA000" d="M19.8 106.8L64 21.2l44.2 85.6z"/><path fill="#FFCA28" d="M64 21.2l44.2 85.6-44.2-28.2z"/><path fill="#F57C00" d="M64 21.2L19.8 106.8l44.2-28.2z"/></svg>
  ),
  'Tailwind CSS': (
    <svg className="w-7 h-7" viewBox="0 0 128 128"><path fill="#38BDF8" d="M64 32c-24 0-36 12-36 36 0 24 12 36 36 36s36-12 36-36c0-24-12-36-36-36z"/><path fill="#06B6D4" d="M28 68c0-12 12-24 36-24s36 12 36 24"/></svg>
  ),
  'JavaScript': (
    <svg className="w-7 h-7" viewBox="0 0 128 128"><path fill="#F7DF1E" d="M1.408 1.408h125.184v125.185H1.408z"/><path d="M89.5 104.5c-2.5 0-4.5-1.5-4.5-4.5 0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5c0 3-2 4.5-4.5 4.5zm-13.5-4.5c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5c0 3-2 4.5-4.5 4.5s-4.5-1.5-4.5-4.5z" fill="#000"/></svg>
  ),
  'Chart.js': (
    <svg className="w-7 h-7" viewBox="0 0 128 128"><circle cx="64" cy="64" r="56" fill="#FF6384"/><path d="M64 64V24" stroke="#fff" strokeWidth="8"/><path d="M64 64L104 64" stroke="#fff" strokeWidth="8"/></svg>
  ),
  'Weather API': (
    <svg className="w-7 h-7" viewBox="0 0 128 128"><circle cx="64" cy="64" r="32" fill="#60A5FA"/><path d="M64 96v16M64 16V0M16 64H0M128 64h-16" stroke="#2563EB" strokeWidth="6"/></svg>
  ),
};

const projects = [
  {
    title: "Travel Agency Website",
    description:
      "A modern travel agency platform for booking curated travel experiences and packages. Features include destination highlights, package listings, customer reviews, and seamless contact and booking forms. Built for Adventure Aura to showcase breathtaking destinations and services.",
    image: "/adventure_aura.jpg",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
    github: "https://github.com/surendravarikallu/adventure_aura",
    live: "https://adventure-aura-ivory.vercel.app/",
    gradient: "from-blue-500 to-purple-600",
  },
  {
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
    image: "/task_manage.webp",
    technologies: ["React", "Firebase", "Tailwind CSS"],
    github: "https://github.com",
    live: "https://example.com",
    gradient: "from-green-500 to-teal-600",
  },
  {
    title: "Weather Dashboard",
    description:
      "Interactive weather dashboard with location-based forecasts, charts, and weather alerts. Built with modern web technologies and APIs.",
    image: "/weather.png",
    technologies: ["JavaScript", "Chart.js", "Weather API"],
    github: "https://github.com",
    live: "https://example.com",
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
              className="group relative h-full"
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                {/* Project Image */}
                <div className="relative overflow-hidden h-48 flex-shrink-0">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                  ></div>
                </div>

                {/* Project Content */}
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed flex-grow">{project.description}</p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="flex items-center gap-1 px-3 py-1 bg-cyan-400/20 text-cyan-400 text-xs rounded-full border border-cyan-400/30"
                      >
                        {techLogos[tech] || null}
                        <span className="ml-1">{tech}</span>
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-auto">
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
