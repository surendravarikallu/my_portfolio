"use client"

import React, { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Mail, Phone, MapPin, Send, Github, Linkedin, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import emailjs from '@emailjs/browser'
import SpotlightCard from "@/components/ui/spotlight-card"

const XIcon = ({ size = 24, className }: { size?: number | string, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
)

export default function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Initialize EmailJS with your public key
      emailjs.init("f29AK1znO_Oxxaruo")

      const result = await emailjs.send(
        "service_41or11c",
        "template_2psgheo",
        {
          from_name: formData.name,
          email: formData.email,
          message: formData.message,
        }
      )

      if (result.status === 200) {
        setSubmitStatus('success')
        setFormData({ name: "", email: "", message: "" })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Email send failed:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const socialLinks = [
    { icon: Github, href: "https://github.com/surendravarikallu", label: "GitHub", color: "hover:text-white" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/surendra-varikallu-081914321/", label: "LinkedIn", color: "hover:text-blue-400" },
    { icon: XIcon, href: "https://x.com/surendravarikallu", label: "X", color: "hover:text-white" },
    { icon: Instagram, href: "https://www.instagram.com/_.mystic_soul.04/", label: "Instagram", color: "hover:text-pink-500" },
  ]

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-black">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10 pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg leading-relaxed">
            I'm always open to discussing new opportunities and interesting projects. Let's build something amazing together!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-full"
          >
            <SpotlightCard className="h-full bg-neutral-900/50 border-neutral-800 rounded-2xl shadow-2xl backdrop-blur-sm">
              <div className="p-6 sm:p-8 h-full flex flex-col relative z-20">
                <h3 className="text-2xl font-bold text-white mb-8">Let's Connect</h3>

                <div className="space-y-8">
                  <div className="flex items-center space-x-6">
                    <div className="p-4 bg-cyan-500/10 rounded-full border border-cyan-500/20 text-cyan-400 shrink-0">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-gray-400 text-sm font-medium uppercase tracking-wide">Email</p>
                      <a href="mailto:varikallusurendra@gmail.com" className="text-white font-medium hover:text-cyan-400 transition-colors break-all">varikallusurendra@gmail.com</a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="p-4 bg-purple-500/10 rounded-full border border-purple-500/20 text-purple-400">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm font-medium uppercase tracking-wide">Phone</p>
                      <p className="text-white font-medium">+91 9392423976</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="p-4 bg-pink-500/10 rounded-full border border-pink-500/20 text-pink-400">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm font-medium uppercase tracking-wide">Location</p>
                      <p className="text-white font-medium">Guntur, Andhra Pradesh, India</p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-12 pt-8 border-t border-neutral-800">
                  <p className="text-gray-400 text-sm mb-6 font-medium">Follow me elsewhere</p>
                  <div className="flex space-x-4">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-3 bg-neutral-800 rounded-full text-gray-400 ${social.color} transition-all duration-300 hover:bg-neutral-700 hover:scale-110`}
                      >
                        {React.createElement(social.icon, { size: 20 })}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-full"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-neutral-900/50 backdrop-blur-sm rounded-2xl p-8 border border-neutral-800 space-y-6 h-full shadow-2xl"
            >
              <h3 className="text-2xl font-bold text-white mb-2">Send Message</h3>
              <p className="text-gray-400 mb-6 text-sm">Have a project in mind or just want to say hi? Fill out the form below.</p>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="text-green-400 text-sm text-center">Message sent successfully! I'll get back to you soon.</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-red-400 text-sm text-center">Failed to send message. Please try again.</p>
                </div>
              )}

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-neutral-950 border-neutral-800 text-white placeholder-gray-600 focus:border-cyan-500/50 focus:ring-cyan-500/20 transition-all h-12"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-neutral-950 border-neutral-800 text-white placeholder-gray-600 focus:border-cyan-500/50 focus:ring-cyan-500/20 transition-all h-12"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="bg-neutral-950 border-neutral-800 text-white placeholder-gray-600 focus:border-cyan-500/50 focus:ring-cyan-500/20 resize-none transition-all"
                    placeholder="Tell me about your project..."
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white py-6 rounded-xl font-bold tracking-wide transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Sending...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </div>
                )}
              </Button>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 pt-8 border-t border-white/10 text-center"
        >
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Varikallu Surendra. Crafted with code.</p>
        </motion.div>
      </div>
    </section>
  )
}
