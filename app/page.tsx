import Navbar from "./components/navbar"
import HeroSection from "./components/hero-section"
import AboutSection from "./components/about-section"
import SkillsSection from "./components/skills-section"
import ExperienceSection from "./components/experience-section"
import ProjectsSection from "./components/projects-section"
import CertificatesSection from "./components/certificates-section"
import ContactSection from "./components/contact-section"
import Footer from "./components/footer"

export default function Portfolio() {
  return (
    <div className="relative min-h-screen">
      <div className="relative z-10 text-white">
        <Navbar />
        <main>
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
