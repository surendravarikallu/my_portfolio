"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Background3D from "./components/3d-background"
import Navbar from "./components/navbar"
import HeroSection from "./components/hero-section"
import AboutSection from "./components/about-section"
import SkillsSection from "./components/skills-section"
import ProjectsSection from "./components/projects-section"
import CertificatesSection from "./components/certificates-section"
import ContactSection from "./components/contact-section"

export default function Portfolio() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Background3D />
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="text-center relative z-10"
        >
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4 glow-cyan"></div>
          <p className="text-cyan-400 text-lg text-shadow-glow">Loading Portfolio...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen">
      <Background3D />
      <div className="relative z-10 text-white">
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <CertificatesSection />
          <ContactSection />
        </main>
      </div>
    </div>
  )
}
