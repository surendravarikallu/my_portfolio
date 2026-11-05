"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, FileText, Github, Linkedin } from "lucide-react";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Certificates", href: "#certificates" },
  { name: "Contact", href: "#contact" },
];

const externalLinks = [
  { icon: FileText, href: "/resume", label: "Resume", color: "hover:text-cyan-400" },
  { icon: Github, href: "https://github.com/surendravarikallu", label: "GitHub Profile", color: "hover:text-white" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/surendravarikallu/", label: "LinkedIn Profile", color: "hover:text-blue-400" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const scrollRaf = useRef<number | null>(null);

  useEffect(() => {
    // Passive scroll listener for floating dock transition
    const handleScroll = () => {
      if (scrollRaf.current) return;
      scrollRaf.current = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40);
        scrollRaf.current = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // IntersectionObserver for tracking active section without layout thrashing
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      }
    );

    navItems.forEach((item) => {
      const el = document.getElementById(item.href.substring(1));
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
      if (scrollRaf.current) cancelAnimationFrame(scrollRaf.current);
    };
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.substring(1));
    if (element) {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(element, { duration: 1.2 });
      } else {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-3 sm:pt-4 pointer-events-none">
      {/* Floating Island Dock: High-performance composited dark surface without Chromium backdrop-filter buffer flashes */}
      <div
        className={`mx-auto rounded-full pointer-events-auto [transform:translateZ(0)] [backface-visibility:hidden] transition-[max-width,background-color,border-color,box-shadow,padding] duration-300 ease-out border ${
          scrolled
            ? "max-w-4xl bg-zinc-950/92 border-zinc-800/80 px-4 sm:px-6 shadow-[0_10px_35px_rgba(0,0,0,0.8)]"
            : "max-w-7xl bg-zinc-950/0 border-zinc-800/0 px-2 sm:px-4 shadow-[0_10px_35px_rgba(0,0,0,0)]"
        }`}
      >
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("#home")}
            aria-label="Scroll to home"
            className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-400 hover:opacity-85 transition-opacity focus:outline-none tracking-tight"
          >
            SV
          </button>

          {/* Desktop Navigation */}
          <nav role="navigation" aria-label="Main Navigation" className="hidden md:flex items-center gap-1">
            <div className="flex items-center space-x-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className={`relative px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors focus:outline-none ${
                      isActive ? "text-cyan-300 font-semibold" : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="navbar-pill"
                        className="absolute inset-0 rounded-full bg-cyan-500/10 border border-cyan-500/25 -z-10 shadow-[0_0_12px_rgba(6,182,212,0.15)]"
                        transition={{ type: "spring", stiffness: 380, damping: 28 }}
                      />
                    )}
                    {item.name}
                  </button>
                );
              })}
            </div>

            {/* External icon links */}
            <div className="ml-3 pl-3 border-l border-zinc-800 flex items-center gap-1">
              {externalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  title={link.label}
                  aria-label={link.label}
                  className={`p-1.5 text-zinc-400 ${link.color} transition-colors duration-200 rounded-full hover:bg-white/5 focus:outline-none`}
                >
                  <link.icon className="w-4 h-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              className="text-gray-400 hover:text-white focus:outline-none p-1.5 rounded-md"
            >
              {isOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation with AnimatePresence */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden pointer-events-auto mt-2 max-w-sm mx-auto bg-neutral-950/95 backdrop-blur-md rounded-2xl border border-neutral-800 p-4 shadow-2xl"
          >
            <div className="space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`block px-3 py-2 rounded-xl text-sm font-medium w-full text-left transition-colors focus:outline-none ${
                    activeSection === item.href.substring(1)
                      ? "text-cyan-400 bg-cyan-400/10 font-semibold"
                      : "text-gray-300 hover:text-cyan-400"
                  }`}
                >
                  {item.name}
                </button>
              ))}

              {/* Mobile external links row */}
              <div className="pt-3 mt-3 border-t border-neutral-800/80 flex items-center justify-around">
                {externalLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    title={link.label}
                    aria-label={link.label}
                    className={`p-2 text-gray-400 ${link.color} transition-colors duration-200 focus:outline-none`}
                  >
                    <link.icon className="w-5 h-5" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
