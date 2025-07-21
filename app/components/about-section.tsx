"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
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
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">About Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Glassmorphism Card */}
            <motion.div
              className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-purple-500/10 rounded-3xl"></div>
              <div className="relative z-10">
                <motion.div
                  className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-cyan-400/50 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src="/profile.avif?height=200&width=200"
                    alt="Varikallu Surendra"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">Varikallu Surendra</h3>
                  <p className="text-cyan-400 font-medium">Full Stack Developer</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <motion.div
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-gray-300 text-lg leading-relaxed">
                I am pursuing 3rd year B.Tech in Computer Science at KITS Akshar Institute of Technology. Completed Web
                Development Internship at Codegnan, Full Stack Development Internship at Cognifyz Technologies, and SQL
                Certifications at HackerRank.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.div
                whileHover={{ scale: 1.05, y: -3 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-xl p-4 border border-cyan-400/30"
              >
                <h4 className="text-cyan-400 font-semibold mb-2">Education</h4>
                <p className="text-gray-300 text-sm">B.Tech CSE - 3rd Year</p>
                <p className="text-gray-400 text-xs">KITS Akshar Institute</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -3 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-4 border border-purple-400/30"
              >
                <h4 className="text-purple-400 font-semibold mb-2">Experience</h4>
                <p className="text-gray-300 text-sm">2 Internships</p>
                <p className="text-gray-400 text-xs">Web & Full Stack Dev</p>
              </motion.div>
            </div>

            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl p-4 border border-white/10"
            >
              <h4 className="text-white font-semibold mb-2">Passion</h4>
              <p className="text-gray-300 text-sm">
                Passionate about creating innovative web solutions and constantly learning new technologies to build
                impactful applications.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
