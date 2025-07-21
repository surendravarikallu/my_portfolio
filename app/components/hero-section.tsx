"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Github, Linkedin, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

const roles = ["Web Developer", "CSE Student", "SQL Certified"]

export default function HeroSection() {
  const [currentRole, setCurrentRole] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const typeSpeed = isDeleting ? 75 : 150
    const currentText = roles[currentRole]

    const timeout = setTimeout(() => {
      if (!isDeleting && displayText === currentText) {
        setTimeout(() => setIsDeleting(true), 1500)
        return
      }

      if (isDeleting && displayText === "") {
        setIsDeleting(false)
        setCurrentRole((prev) => (prev + 1) % roles.length)
        return
      }

      setDisplayText((prev) => (isDeleting ? prev.slice(0, -1) : currentText.slice(0, prev.length + 1)))
    }, typeSpeed)

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentRole])

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Stunning Tech Background with Multiple Layers */}
      <div className="absolute inset-0">
        {/* Main 3D rendered background image from Unsplash - overlays temporarily removed for debugging */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            zIndex: 1,
            backgroundImage: "url('https://images.unsplash.com/photo-1656846611102-2b6c1b9b419a?auto=format&fit=crop&w=1440&q=80')",
          }}
        ></div>
      </div>

      {/* Removed floating dot animation and geometric shapes */}
      
      <div className="relative z-30 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto transform-gpu perspective-1000">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <motion.h1
            className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
          >
            <span className="text-white drop-shadow-2xl">Hi, I am </span>
            <motion.span
              className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
            >
              Varikallu Surendra
            </motion.span>
          </motion.h1>

          <motion.h2
            className="text-xl sm:text-2xl lg:text-3xl text-gray-300 mb-8 drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.05, color: "#06b6d4" }}
          >
            Aspiring Full Stack Developer
          </motion.h2>

          {/* Transparent/glass box for roles */}
          <motion.div
            className="text-lg sm:text-xl lg:text-2xl text-cyan-400 mb-12 h-16 flex items-center justify-center relative z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="font-mono relative min-w-[350px] text-center glass border border-cyan-400/40 shadow-2xl rounded-xl p-4 flex items-center justify-center gap-2">
              <span className="inline-block text-cyan-400 drop-shadow-lg text-shadow-glow">{displayText}</span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{
                  duration: 0.8,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
                className="ml-1 inline-block text-cyan-400"
              >
                |
              </motion.span>
            </div>
          </motion.div>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <a href="#projects" id="view-my-work-btn">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                View My Work
              </Button>
            </a>
          </motion.div>
        </motion.div>

        {/* Social Links and Scroll Indicator - placed below main content */}
        <div className="flex flex-col items-center mt-16">
          {/* Social Media Heading */}
          <div className="mb-2">
            <span className="text-lg font-semibold text-cyan-200 tracking-wide animate-pulse">Find me on</span>
          </div>
          {/* Social Media Links */}
          <motion.div
            className="flex flex-row gap-8 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <motion.a
              href="https://www.linkedin.com/in/surendra-varikallu-081914321/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex flex-row items-center justify-center px-8 py-4 bg-white/10 rounded-full shadow-lg hover:shadow-cyan-400/30 hover:bg-cyan-400/10 transition-all duration-300 min-w-[160px] gap-3"
              whileHover={{ scale: 1.09, boxShadow: '0 0 32px 0 #06b6d4' }}
              whileTap={{ scale: 0.97 }}
            >
              {/* No border or gradient background */}
              <Linkedin size={28} className="text-cyan-400 animate-pulse-slow relative z-10" />
              <span className="text-base font-semibold text-cyan-300 relative z-10">LinkedIn</span>
            </motion.a>
            <motion.a
              href="https://github.com/surendravarikallu"
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex flex-row items-center justify-center px-8 py-4 bg-white/10 rounded-full shadow-lg hover:shadow-cyan-400/30 hover:bg-cyan-400/10 transition-all duration-300 min-w-[160px] gap-3"
              whileHover={{ scale: 1.09, boxShadow: '0 0 32px 0 #06b6d4' }}
              whileTap={{ scale: 0.97 }}
            >
              {/* No border or gradient background */}
              <Github size={28} className="text-cyan-400 animate-pulse-slow relative z-10" />
              <span className="text-base font-semibold text-cyan-300 relative z-10">GitHub</span>
            </motion.a>
          </motion.div>
          {/* Scroll Down Arrow */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <ChevronDown className="text-cyan-400 w-8 h-8" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
