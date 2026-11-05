import dynamic from "next/dynamic"
import Navbar from "./components/navbar"
import HeroSection from "./components/hero-section"
import AboutSection from "./components/about-section"

const SkillsSection = dynamic(() => import("./components/skills-section"))
const ExperienceSection = dynamic(() => import("./components/experience-section"))
const ProjectsSection = dynamic(() => import("./components/projects-section"))
const CertificatesSection = dynamic(() => import("./components/certificates-section"))
const ContactSection = dynamic(() => import("./components/contact-section"))
const Footer = dynamic(() => import("./components/footer"))

export default function Portfolio() {
  return (
    <div className="relative min-h-screen">
      <div className="relative z-10 text-white">
        <Navbar />
        <main id="main-content">
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ExperienceSection />
          <ProjectsSection />
          <CertificatesSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  )
}
