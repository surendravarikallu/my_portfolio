import Navbar from "./components/navbar"
import HeroSection from "./components/hero-section"
import AboutSection from "./components/about-section"
import SkillsSection from "./components/skills-section"
import ProjectsSection from "./components/projects-section"
import CertificatesSection from "./components/certificates-section"
import ContactSection from "./components/contact-section"

export default function Portfolio() {
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
