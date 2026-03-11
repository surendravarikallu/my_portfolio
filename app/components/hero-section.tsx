"use client"

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"
import { ArrowRight, Download, Github } from "lucide-react"
import dynamic from "next/dynamic"
import ShimmerButton from "@/components/ui/shimmer-button"
import { useEffect } from "react"

const HeroScene = dynamic(() => import('@/components/3d/HeroScene'), { ssr: false })

export default function HeroSection() {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Smooth spring-based parallax transforms
    const springConfig = { stiffness: 50, damping: 30 }
    const textX = useSpring(useTransform(mouseX, [0, 1, -1], [0, -12, 12]), springConfig)
    const textY = useSpring(useTransform(mouseY, [0, 1, -1], [0, -8, 8]), springConfig)

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { innerWidth, innerHeight } = window
            // Normalize mouse position to -1 to 1
            mouseX.set((e.clientX / innerWidth - 0.5) * 2)
            mouseY.set((e.clientY / innerHeight - 0.5) * 2)
        }

        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [mouseX, mouseY])

    const scrollToProjects = () => {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <section id="home" className="h-screen w-full relative overflow-hidden bg-black">
            <HeroScene />

                <div className="h-full w-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 text-center z-10 relative">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-4"
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-cyan-900/30 border border-cyan-500/30 text-cyan-400 text-sm font-medium tracking-wide animate-pulse-glow">
                            Available for Hire
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        style={{ x: textX, y: textY }}
                        className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-6"
                    >
                        Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Surendra</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        style={{ x: textX, y: textY }}
                        className="text-xl sm:text-2xl text-gray-200 font-medium max-w-2xl mb-4"
                    >
                        Full Stack Developer building scalable platforms and developer tools.
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="text-base sm:text-lg text-gray-400 max-w-2xl mb-10"
                    >
                        I build production-grade web platforms that solve real problems — from secure assessment systems serving 250+ users to full-stack management portals with real-time analytics.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <ShimmerButton className="shadow-2xl" onClick={scrollToProjects}>
                            <span className="text-white text-sm font-semibold flex items-center gap-2">
                                View Projects <ArrowRight className="w-4 h-4" />
                            </span>
                        </ShimmerButton>

                        <a
                            href="/resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 rounded-full border border-gray-700 hover:border-cyan-500/50 hover:bg-gray-900/50 text-gray-300 hover:text-white transition-all duration-300 flex items-center gap-2 text-sm font-medium"
                        >
                            <Download className="w-4 h-4" /> Download Resume
                        </a>

                        <a
                            href="https://github.com/surendravarikallu"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 rounded-full border border-gray-700 hover:border-purple-500/50 hover:bg-gray-900/50 text-gray-300 hover:text-white transition-all duration-300 flex items-center gap-2 text-sm font-medium"
                        >
                            <Github className="w-4 h-4" /> GitHub
                        </a>
                    </motion.div>
                </div>
        </section >
    )
}
