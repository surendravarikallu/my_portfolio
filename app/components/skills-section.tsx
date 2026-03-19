"use client";

import SpotlightCard from "@/components/ui/spotlight-card";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

const skillCategories = [
  {
    label: "Frontend",
    color: "from-cyan-400 to-blue-500",
    skills: [
      { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "React.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
    ],
  },
  {
    label: "Backend",
    color: "from-green-400 to-emerald-500",
    skills: [
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "Django", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
    ],
  },
  {
    label: "Databases",
    color: "from-purple-400 to-pink-500",
    skills: [
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    ],
  },
  {
    label: "Tools",
    color: "from-orange-400 to-red-500",
    skills: [
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
      { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
      { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
      { name: "Vercel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" },
    ],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-neutral-950">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <ScrollReveal
          delay={0}
          yOffset={30}
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
        </ScrollReveal>

        <div className="space-y-12">
          {skillCategories.map((category, catIndex) => (
            <ScrollReveal key={category.label} delay={catIndex * 0.1} yOffset={20}>
              <div>
                <h3 className={`text-lg font-semibold mb-4 bg-gradient-to-r ${category.color} bg-clip-text text-transparent uppercase tracking-wider`}>
                  {category.label}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {category.skills.map((skill) => (
                    <SpotlightCard
                      key={skill.name}
                      className="group bg-neutral-900/50 border-neutral-800"
                      spotlightColor="rgba(6, 182, 212, 0.2)"
                    >
                      <div className="relative z-10 flex items-center gap-3 p-4">
                        <div className="transform group-hover:scale-110 transition-transform duration-300 shrink-0">
                          <img
                            src={skill.icon}
                            alt={skill.name}
                            className={`w-10 h-10 object-contain ${["Express.js", "GitHub", "Next.js", "Django", "Vercel"].includes(skill.name) ? "invert" : ""}`}
                            loading="lazy"
                          />
                        </div>
                        <h4 className="text-white font-medium text-sm group-hover:text-cyan-400 transition-colors duration-300">
                          {skill.name}
                        </h4>
                      </div>
                    </SpotlightCard>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Always Learning */}
        <ScrollReveal delay={0.2} yOffset={30} className="mt-16 text-center">
          <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 max-w-4xl mx-auto overflow-hidden">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 bg-[size:200%_100%] animate-gradient opacity-20 pointer-events-none" />
            <h3 className="text-2xl font-bold text-white mb-4">Always Learning</h3>
            <p className="text-gray-300 leading-relaxed">
              I'm constantly expanding my skill set and staying up-to-date with the latest technologies. Currently
              exploring advanced <span className="text-cyan-400">AI Integration</span>, <span className="text-purple-400">Cloud Architecture</span>, and modern development practices.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
