"use client"

import { motion } from "framer-motion"
import { ArrowRight, Download } from "lucide-react"
import AnimatedBackground from "@/components/ui/animated-background"
import ShimmerButton from "@/components/ui/shimmer-button"

export default function HeroSection() {
    const scrollToProjects = () => {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <section id="home" className="h-screen w-full relative overflow-hidden">
            <AnimatedBackground className="absolute inset-0 bg-black" starSpeed={0.2} starSize={1.5} numStars={150}>
                <div className="h-full w-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 text-center z-10 relative">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-4"
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-cyan-900/30 border border-cyan-500/30 text-cyan-400 text-sm font-medium tracking-wide">
                            Available for Hire
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-6"
                    >
                        Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Surendra</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-lg sm:text-xl text-gray-400 max-w-2xl mb-10"
                    >
                        I'm a Full Stack Developer driven by a passion for building scalable, high-performance web applications. I specialize in merging technical excellence with visual storytelling to create unique digital experiences.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <ShimmerButton className="shadow-2xl" onClick={scrollToProjects}>
                            <span className="text-white text-sm font-semibold flex items-center gap-2">
                                View Work <ArrowRight className="w-4 h-4" />
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
                    </motion.div>
                </div>
            </AnimatedBackground>
        </section >
    )
}
