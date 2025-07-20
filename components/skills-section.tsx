"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const skills = [
  { name: "HTML", icon: "🌐", color: "from-orange-400 to-red-500" },
  { name: "CSS", icon: "🎨", color: "from-blue-400 to-cyan-500" },
  { name: "JavaScript", icon: "⚡", color: "from-yellow-400 to-orange-500" },
  { name: "React.js", icon: "⚛️", color: "from-cyan-400 to-blue-500" },
  { name: "Node.js", icon: "🟢", color: "from-green-400 to-emerald-500" },
  { name: "Express.js", icon: "🚀", color: "from-gray-400 to-gray-600" },
  { name: "MongoDB", icon: "🍃", color: "from-green-500 to-teal-500" },
  { name: "MySQL", icon: "🐬", color: "from-blue-500 to-indigo-500" },
  { name: "GitHub", icon: "🐙", color: "from-gray-600 to-gray-800" },
  { name: "SQL", icon: "📊", color: "from-purple-400 to-pink-500" },
]

export default function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Skills & Technologies
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Here are the technologies and tools I work with to bring ideas to life
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{
                scale: 1.1,
                rotateY: 10,
                z: 50,
              }}
              whileTap={{ scale: 0.95 }}
              className="group relative"
            >
              <div
                className={`
                relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 
                shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer
                hover:bg-white/20 group-hover:border-white/40
              `}
              >
                {/* Gradient Background on Hover */}
                <div
                  className={`
                  absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 
                  group-hover:opacity-20 rounded-2xl transition-opacity duration-300
                `}
                ></div>

                <div className="relative z-10 text-center">
                  <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                    {skill.icon}
                  </div>
                  <h3 className="text-white font-semibold text-sm group-hover:text-cyan-400 transition-colors duration-300">
                    {skill.name}
                  </h3>
                </div>

                {/* Glow Effect */}
                <div
                  className={`
                  absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 
                  group-hover:opacity-30 rounded-2xl blur-xl transition-opacity duration-300 -z-10
                `}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Skills Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Always Learning</h3>
            <p className="text-gray-300 leading-relaxed">
              I'm constantly expanding my skill set and staying up-to-date with the latest technologies. Currently
              exploring advanced React patterns, cloud technologies, and modern development practices.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
