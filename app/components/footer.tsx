"use client"

import React from "react"
import { Github, Linkedin, Instagram, Mail, ChevronRight } from "lucide-react"
import Link from "next/link"

const XIcon = ({ size = 24, className }: { size?: number | string, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
)

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ]

  const socialLinks = [
    { icon: Github, href: "https://github.com/surendravarikallu", label: "GitHub", hover: "hover:text-white hover:bg-white/10" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/surendravarikallu/", label: "LinkedIn", hover: "hover:text-blue-400 hover:bg-blue-400/10" },
    { icon: XIcon, href: "https://x.com/surendravarikallu", label: "X (Twitter)", hover: "hover:text-white hover:bg-white/10" },
    { icon: Instagram, href: "https://www.instagram.com/_.mystic_soul.04/", label: "Instagram", hover: "hover:text-pink-500 hover:bg-pink-500/10" },
    { icon: Mail, href: "mailto:varikallusurendra@gmail.com", label: "Email", hover: "hover:text-cyan-400 hover:bg-cyan-400/10" },
  ]

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.getElementById(href.substring(1))
    if (element) {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(element, { duration: 1.2 })
      } else {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <footer className="relative bg-black pt-20 pb-10 overflow-hidden border-t border-zinc-800/80">
      {/* Background Specular Hairline */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand & Description */}
          <div className="md:col-span-5 lg:col-span-4">
            <Link href="/" className="inline-block mb-6 group" prefetch={false} aria-label="Surendra Varikallu home">
              <span className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-400">
                SV.
              </span>
            </Link>
            <p className="text-zinc-400 mb-8 leading-relaxed max-w-md text-sm sm:text-base">
              Full Stack & AI Systems Developer specializing in scalable enterprise platforms, high-throughput architectures, and exceptional digital experiences.
            </p>
            
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2.5 rounded-full bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all duration-200 ${social.hover}`}
                  aria-label={social.label}
                  title={social.label}
                >
                  <social.icon size={18} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 lg:col-span-4 lg:justify-self-center">
            <h2 className="text-lg font-semibold text-white mb-6">Quick Links</h2>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="group flex items-center text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    <ChevronRight className="h-4 w-4 mr-2 text-cyan-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" aria-hidden="true" />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-3 lg:col-span-4 lg:justify-self-end">
            <h2 className="text-lg font-semibold text-white mb-6">Contact</h2>
            <div className="space-y-4 text-gray-300">
              <p className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mr-3 animate-pulse" aria-hidden="true" />
                Available for opportunities
              </p>
              <p className="flex items-center hover:text-white transition-colors">
                <a href="mailto:varikallusurendra@gmail.com" aria-label="Send email to varikallusurendra@gmail.com">varikallusurendra@gmail.com</a>
              </p>
              <p>Guntur, Andhra Pradesh, India</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm text-center md:text-left">
            &copy; {currentYear} surendravarikallu.dev. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>Crafted with</span>
            <span className="text-red-500 inline-block animate-pulse" aria-hidden="true">
              ❤
            </span>
            <span>using Next.js & Tailwind</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
