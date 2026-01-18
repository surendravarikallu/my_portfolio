"use client"

import { useState, useEffect } from "react"
import Navbar from "./components/navbar"
import HeroSection from "./components/hero-section"
import AboutSection from "./components/about-section"
import SkillsSection from "./components/skills-section"
import ProjectsSection from "./components/projects-section"
import CertificatesSection from "./components/certificates-section"
import ContactSection from "./components/contact-section"
import Hyperspeed from "@/components/ui/hyperspeed"

export default function Portfolio() {
  const [isLoading, setIsLoading] = useState(true)

  // Timer logic moved to Hyperspeed component to sync with progress bar

  if (isLoading) {
    return <Hyperspeed onComplete={() => setIsLoading(false)} />
  }

  return (
    <div className="relative min-h-screen">
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
