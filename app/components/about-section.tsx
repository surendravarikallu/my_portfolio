"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { TiltedCard } from "@/components/ui/tilted-card";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-4 relative overflow-hidden bg-neutral-900 text-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* Left Side: Tilted Card Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <TiltedCard
            className="w-full max-w-md aspect-[3/4]"
            containerWidth="100%"
            containerHeight="100%"
            rotateAmplitude={15}
            scaleOnHover={1.05}
          >
            <div className="w-full h-full rounded-xl overflow-hidden shadow-2xl relative group bg-neutral-800">
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/90 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>

              <Image
                src="/profile-pic.png"
                alt="Surendra Varikallu - Profile"
                fill
                className="object-cover transform scale-105 group-hover:scale-110 transition-transform duration-700"
                priority
              />

              <div className="absolute bottom-6 left-6 z-20">
                <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-md">Surendra Varikallu</h3>
                <p className="text-cyan-300 font-mono text-sm tracking-wide drop-shadow-sm">Full Stack Developer</p>
              </div>
            </div>
          </TiltedCard>
        </motion.div>

        {/* Right Side: Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-4xl font-bold mb-6">
            About <span className="text-cyan-400">Me</span>
          </h2>
          <div className="h-1 w-20 bg-cyan-500 mb-8"></div>

          <p className="text-gray-300 leading-relaxed text-lg mb-6">
            I am a passionate <span className="text-cyan-400 font-semibold">Full Stack Developer</span> based in India. Currently, I am a Pre-Final Year Undergraduate Student pursuing Computer Science at KITS Akshar Institute of Technology.
          </p>

          <p className="text-gray-300 leading-relaxed text-lg mb-8">
            My journey started with a curiosity about how websites work, which led me to dive deep into the world of web development. I specialize in modern JavaScript frameworks like <span className="text-white">React.js, Next.js</span>, and backend technologies including <span className="text-white">Node.js and Express</span>.
          </p>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="p-4 bg-neutral-800 rounded-lg border-l-4 border-cyan-500">
              <h4 className="font-bold text-xl mb-1">1.5+</h4>
              <p className="text-sm text-gray-400">Years Experience</p>
            </div>
            <div className="p-4 bg-neutral-800 rounded-lg border-l-4 border-purple-500">
              <h4 className="font-bold text-xl mb-1">8+</h4>
              <p className="text-sm text-gray-400">Projects Completed</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
