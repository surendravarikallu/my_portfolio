"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Award, ExternalLink } from "lucide-react"

const certificates = [
  {
    title: "Web Development",
    issuer: "Codegnan",
    date: "2024",
    description: "Comprehensive web development training covering HTML, CSS, JavaScript, and modern frameworks.",
    logo: "/placeholder.svg?height=80&width=80",
    color: "from-blue-500 to-cyan-500",
    link: "https://codegnan.com",
  },
  {
    title: "Full Stack Development",
    issuer: "Cognifyz Technologies",
    date: "2024",
    description: "Complete full-stack development internship covering both frontend and backend technologies.",
    logo: "/placeholder.svg?height=80&width=80",
    color: "from-purple-500 to-pink-500",
    link: "https://cognifyz.com",
  },
  {
    title: "SQL Certification",
    issuer: "HackerRank",
    date: "2024",
    description: "Advanced SQL certification demonstrating proficiency in database management and queries.",
    logo: "/placeholder.svg?height=80&width=80",
    color: "from-green-500 to-teal-500",
    link: "https://hackerrank.com",
  },
]

export default function CertificatesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="certificates" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900"></div>

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
              Certificates & Achievements
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Professional certifications and achievements that validate my skills and expertise
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : { opacity: 0, y: 50, rotateY: -15 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{
                y: -10,
                rotateY: 5,
                scale: 1.02,
              }}
              className="group relative perspective-1000"
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}
                ></div>

                {/* Certificate Content */}
                <div className="relative z-10">
                  {/* Logo and Award Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/20 group-hover:border-white/40 transition-colors duration-300">
                      <img
                        src={cert.logo || "/placeholder.svg"}
                        alt={`${cert.issuer} logo`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div
                      className={`p-3 rounded-full bg-gradient-to-br ${cert.color} group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Award className="h-6 w-6 text-white" />
                    </div>
                  </div>

                  {/* Certificate Info */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                    {cert.title}
                  </h3>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-gray-300 font-medium">{cert.issuer}</p>
                    <span className="text-sm text-gray-400 bg-white/10 px-2 py-1 rounded-full">{cert.date}</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">{cert.description}</p>

                  {/* View Certificate Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.open(cert.link, "_blank")}
                    className={`w-full py-3 px-4 bg-gradient-to-r ${cert.color} text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2 group-hover:shadow-lg`}
                  >
                    <ExternalLink className="h-4 w-4" />
                    View Certificate
                  </motion.button>
                </div>

                {/* Glow Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity duration-300 -z-10`}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Achievement Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {[
            { number: "3+", label: "Certifications" },
            { number: "2+", label: "Internships" },
            { number: "100%", label: "Completion Rate" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
