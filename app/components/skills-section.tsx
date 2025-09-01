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
    name: "TypeScript",
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        {/* Blue shield background */}
        <path fill="#007ACC" d="M100 0 L0 50 V150 L100 200 L200 150 V50 Z"/>
        
        {/* "T" text */}
        <text x="75" y="105" fontFamily="Arial, sans-serif" fontSize="70" fill="white" textAnchor="middle" dominantBaseline="central">T</text>
        
        {/* "S" text */}
        <text x="125" y="105" fontFamily="Arial, sans-serif" fontSize="70" fill="white" textAnchor="middle" dominantBaseline="central">S</text>
      </svg>
    ),
    color: "from-blue-600 to-blue-700",
  },
  {
    name: "Python",
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path fillRule="evenodd" clipRule="evenodd" d="M13.0164 2C10.8193 2 9.03825 3.72453 9.03825 5.85185V8.51852H15.9235V9.25926H5.97814C3.78107 9.25926 2 10.9838 2 13.1111L2 18.8889C2 21.0162 3.78107 22.7407 5.97814 22.7407H8.27322V19.4815C8.27322 17.3542 10.0543 15.6296 12.2514 15.6296H19.5956C21.4547 15.6296 22.9617 14.1704 22.9617 12.3704V5.85185C22.9617 3.72453 21.1807 2 18.9836 2H13.0164ZM12.0984 6.74074C12.8589 6.74074 13.4754 6.14378 13.4754 5.40741C13.4754 4.67103 12.8589 4.07407 12.0984 4.07407C11.3378 4.07407 10.7213 4.67103 10.7213 5.40741C10.7213 6.14378 11.3378 6.74074 12.0984 6.74074Z" fill="url(#paint0_linear_87_8204)"></path>
          <path fillRule="evenodd" clipRule="evenodd" d="M18.9834 30C21.1805 30 22.9616 28.2755 22.9616 26.1482V23.4815L16.0763 23.4815L16.0763 22.7408L26.0217 22.7408C28.2188 22.7408 29.9998 21.0162 29.9998 18.8889V13.1111C29.9998 10.9838 28.2188 9.25928 26.0217 9.25928L23.7266 9.25928V12.5185C23.7266 14.6459 21.9455 16.3704 19.7485 16.3704L12.4042 16.3704C10.5451 16.3704 9.03809 17.8296 9.03809 19.6296L9.03809 26.1482C9.03809 28.2755 10.8192 30 13.0162 30H18.9834ZM19.9015 25.2593C19.1409 25.2593 18.5244 25.8562 18.5244 26.5926C18.5244 27.329 19.1409 27.9259 19.9015 27.9259C20.662 27.9259 21.2785 27.329 21.2785 26.5926C21.2785 25.8562 20.662 25.2593 19.9015 25.2593Z" fill="url(#paint1_linear_87_8204)"></path>
          <defs>
            <linearGradient id="paint0_linear_87_8204" x1="12.4809" y1="2" x2="12.4809" y2="22.7407" gradientUnits="userSpaceOnUse">
              <stop stopColor="#327EBD"></stop>
              <stop offset="1" stopColor="#1565A7"></stop>
            </linearGradient>
            <linearGradient id="paint1_linear_87_8204" x1="19.519" y1="9.25928" x2="19.519" y2="30" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFDA4B"></stop>
              <stop offset="1" stopColor="#F9C600"></stop>
            </linearGradient>
          </defs>
        </g>
      </svg>
    ),
    color: "from-blue-500 to-yellow-500",
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
    name: "Git",
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <path style={{stroke: 'none', fillRule: 'nonzero', fill: '#f03c2e', fillOpacity: 1}} d="M90.156 41.965 50.036 1.848a5.918 5.918 0 0 0-8.372 0l-8.328 8.332 10.566 10.566a7.03 7.03 0 0 1 7.23 1.684 7.034 7.034 0 0 1 1.669 7.277l10.187 10.184a7.028 7.028 0 0 1 7.278 1.672 7.04 7.04 0 0 1 0 9.957 7.05 7.05 0 0 1-9.965 0 7.044 7.044 0 0 1-1.528-7.66l-9.5-9.497V59.36a7.04 7.04 0 0 1 1.86 11.29 7.04 7.04 0 0 1-9.957 0 7.04 7.04 0 0 1 0-9.958 7.06 7.06 0 0 1 2.304-1.539V33.926a7.049 7.049 0 0 1-3.82-9.234L29.242 14.272 1.73 41.777a5.925 5.925 0 0 0 0 8.371L41.852 90.27a5.925 5.925 0 0 0 8.37 0l39.934-39.934a5.925 5.925 0 0 0 0-8.371"></path>
      </svg>
    ),
    color: "from-orange-500 to-red-600",
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
