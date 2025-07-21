"use client"

import { useRef } from "react"

const skills = [
  {
    name: "HTML",
    icon: (
      <img src="/HTML5-logo.png" alt="HTML5" className="w-10 h-10 object-contain" />
    ),
    color: "from-orange-500 to-red-600",
  },
  {
    name: "CSS",
    icon: (
      <img src="/CSS3_logo.svg" alt="CSS3" className="w-10 h-10 object-contain" />
    ),
    color: "from-blue-500 to-cyan-600",
  },
  {
    name: "JavaScript",
    icon: (
      <img src="/js_logo.png" alt="JavaScript" className="w-10 h-10 object-contain" />
    ),
    color: "from-yellow-400 to-orange-500",
  },
  {
    name: "React.js",
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 128 128"><g><circle cx="64" cy="64" r="11.4" fill="#61DAFB"/><g stroke="#61DAFB" strokeWidth="6" fill="none"><ellipse rx="56" ry="24" cx="64" cy="64"/><ellipse rx="56" ry="24" cx="64" cy="64" transform="rotate(60 64 64)"/><ellipse rx="56" ry="24" cx="64" cy="64" transform="rotate(120 64 64)"/></g></g></svg>
    ),
    color: "from-cyan-400 to-blue-500",
  },
  {
    name: "Node.js",
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 128 128"><path fill="#393" d="M64 8l56 32v48l-56 32-56-32V40z"/><path fill="#fff" d="M64 16l48 28v40l-48 28-48-28V44z"/><path fill="#393" d="M64 24l40 24v32l-40 24-40-24V48z"/><path d="M88.1 86.7c-2.2 0-4.1-1.2-4.1-4.1 0-2.2 1.9-4.1 4.1-4.1s4.1 1.9 4.1 4.1c0 2.9-1.9 4.1-4.1 4.1zm-12.3-4.1c0-2.2 1.9-4.1 4.1-4.1s4.1 1.9 4.1 4.1c0 2.9-1.9 4.1-4.1 4.1s-4.1-1.2-4.1-4.1z" fill="#fff"/></svg>
    ),
    color: "from-green-500 to-emerald-600",
  },
  {
    name: "Express.js",
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 128 128">
        <circle cx="64" cy="64" r="60" fill="#fff"/>
        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" fontFamily="Arial, Helvetica, sans-serif" fontSize="36" fill="#000">express</text>
      </svg>
    ),
    color: "from-gray-500 to-gray-700",
  },
  {
    name: "MongoDB",
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 128 128"><path fill="#47A248" d="M64 8c0 0-32 48 0 112 32-64 0-112 0-112z"/><path fill="#fff" d="M64 8c0 0-32 48 0 112 32-64 0-112 0-112z" fillOpacity=".2"/><ellipse cx="64" cy="64" rx="8" ry="24" fill="#47A248"/></svg>
    ),
    color: "from-green-600 to-teal-600",
  },
  {
    name: "MySQL",
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 128 128"><ellipse cx="64" cy="96" rx="48" ry="16" fill="#00758F"/><ellipse cx="64" cy="48" rx="48" ry="16" fill="#F29111"/><ellipse cx="64" cy="48" rx="48" ry="16" fill="#00758F" fillOpacity=".5"/></svg>
    ),
    color: "from-blue-600 to-indigo-600",
  },
  {
    name: "GitHub",
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 128 128"><path fill="#181717" d="M64 12C33.1 12 8 37.1 8 68c0 24.8 16.1 45.8 38.5 53.2 2.8.5 3.8-1.2 3.8-2.7v-10.2c-15.7 3.4-19-7.6-19-7.6-2.5-6.3-6.1-8-6.1-8-5-3.4.4-3.3.4-3.3 5.5.4 8.4 5.7 8.4 5.7 4.9 8.4 12.8 6 15.9 4.6.5-3.5 1.9-6 3.4-7.4-12.5-1.4-25.6-6.3-25.6-28.1 0-6.2 2.2-11.3 5.7-15.3-.6-1.4-2.5-7.1.5-14.7 0 0 4.7-1.5 15.5 5.8 4.5-1.3 9.3-2 14-2 4.7 0 9.5.7 14 2 10.8-7.3 15.5-5.8 15.5-5.8 3 7.6 1.1 13.3.5 14.7 3.5 4 5.7 9.1 5.7 15.3 0 21.9-13.1 26.7-25.6 28.1 2 1.7 3.7 5.1 3.7 10.3v15.3c0 1.5 1 3.2 3.8 2.7C103.9 113.8 120 92.8 120 68c0-30.9-25.1-56-56-56z"/></svg>
    ),
    color: "from-gray-700 to-black",
  },
  {
    name: "SQL",
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 128 128"><ellipse cx="64" cy="32" rx="48" ry="16" fill="#6C47FF"/><rect x="16" y="32" width="96" height="64" rx="32" fill="#6C47FF" fillOpacity=".4"/><ellipse cx="64" cy="96" rx="48" ry="16" fill="#6C47FF"/></svg>
    ),
    color: "from-purple-500 to-pink-600",
  },
]

export default function SkillsSection() {
  const ref = useRef(null)

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div ref={ref} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Skills & Technologies
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Here are the technologies and tools I work with to bring ideas to life
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {skills.map((skill, index) => (
            <div key={skill.name} className="group relative">
              <div
                className={`
                relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 
                shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer
                hover:bg-white/20 group-hover:border-white/40
              `}
              >
                {/* Gradient Background on Hover - Now includes all skills */}
                <div
                  className={`
                  absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 
                  group-hover:opacity-20 rounded-2xl transition-opacity duration-300
                `}
                ></div>

                <div className="relative z-10 text-center">
                  <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300 text-white">
                    {skill.icon}
                  </div>
                  <h3 className="text-white font-semibold text-sm group-hover:text-cyan-400 transition-colors duration-300">
                    {skill.name}
                  </h3>
                </div>

                {/* Glow Effect - Now applies to all skills */}
                <div
                  className={`
                  absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 
                  group-hover:opacity-30 rounded-2xl blur-xl transition-opacity duration-300 -z-10
                `}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills Info */}
        <div className="mt-16 text-center">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Always Learning</h3>
            <p className="text-gray-300 leading-relaxed">
              I'm constantly expanding my skill set and staying up-to-date with the latest technologies. Currently
              exploring advanced React patterns, cloud technologies, and modern development practices.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
