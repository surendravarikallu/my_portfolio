"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Award, Star } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import SpotlightCard from "@/components/ui/spotlight-card";

const experiences = [
  {
    id: 1,
    title: "Hackathon 3rd Prize (StudentConnect)",
    organization: "Dept of CSE, KITS",
    date: "Feb 21, 2026",
    icon: <Award className="w-5 h-5 text-amber-400" />,
    color: "amber",
    description: [
      "Built 'StudentConnect' a collaborative platform for students to share resources and work on projects.",
      "Developed the full-stack application using Python, Django, and PostgreSQL within 48 hours.",
      "Successfully deployed the live project on Render.",
    ],
  },
  {
    id: 2,
    title: "Google Student Ambassador",
    organization: "KITS Akshar Institute of Technology",
    date: "Aug 2025 - Dec 2025",
    icon: <Star className="w-5 h-5 text-purple-400" />,
    color: "purple",
    description: [
      "Represented Google on campus, organizing technical events and workshops.",
      "Spearheaded the TechFest 2k24 organizing committee, managing over 500+ participants.",
      "Fostered a community of student developers by mentoring juniors in web technologies.",
    ],
  },
  {
    id: 3,
    title: "Full-Stack Web Developer Intern",
    organization: "Cognifyz Technologies",
    date: "June 2025 - July 2025",
    icon: <Briefcase className="w-5 h-5 text-cyan-400" />,
    color: "cyan",
    description: [
      "Developed interactive and responsive web applications using React.js, Next.js, and Node.js.",
      "Collaborated with the team to design and implement efficient database schemas with MongoDB.",
      "Optimized API endpoints resulting in faster data retrieval and improved site performance.",
    ],
  },
  {
    id: 4,
    title: "Web Development Intern",
    organization: "Codegnan Setup (Offline)",
    date: "May 2025 - June 2025",
    icon: <GraduationCap className="w-5 h-5 text-emerald-400" />,
    color: "emerald",
    description: [
      "Completed an intensive offline internship focusing on core web development.",
      "Gained hands-on experience in building structured web pages and applications.",
      "Built foundational projects to solidify understanding of backend concepts.",
    ],
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-neutral-950">
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-neutral-950 to-black"></div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
            Experience & Journey
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
            My professional timeline — internships, leadership roles, and achievements.
          </p>
        </ScrollReveal>

        <div className="relative">
          {/* Vertical Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-neutral-800"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const borderGlowMap: Record<string, string> = {
                cyan: "hover:border-cyan-500/40",
                purple: "hover:border-purple-500/40",
                amber: "hover:border-amber-500/40",
                emerald: "hover:border-emerald-500/40",
              };

              const gradientMap: Record<string, string> = {
                cyan: "from-cyan-500/20 to-blue-600/20",
                purple: "from-purple-500/20 to-pink-600/20",
                amber: "from-amber-500/20 to-orange-600/20",
                emerald: "from-emerald-500/20 to-teal-600/20",
              };

              return (
                <ScrollReveal
                  key={exp.id}
                  delay={index * 0.15}
                  className={`flex flex-col md:flex-row gap-8 items-center ${
                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-neutral-900 border-4 border-neutral-950 items-center justify-center z-20 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${gradientMap[exp.color] || gradientMap.cyan} flex items-center justify-center border border-white/10`}>
                      {exp.icon}
                    </div>
                  </div>

                  {/* Empty space for the other side */}
                  <div className="hidden md:block w-1/2"></div>

                  {/* Content Card */}
                  <div className="w-full md:w-1/2 relative z-10">
                    <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                      <SpotlightCard className={`bg-neutral-900/80 border-neutral-800 ${borderGlowMap[exp.color] || borderGlowMap.cyan} transition-all duration-300 p-6 sm:p-8`}>
                        <div className="flex flex-col gap-4">
                          <div className="flex justify-between items-start flex-wrap gap-2">
                            <div>
                              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{exp.title}</h3>
                              <p className="text-cyan-400 font-medium mt-1">{exp.organization}</p>
                            </div>
                            <span className="inline-block text-xs font-mono px-3 py-1 rounded-full bg-neutral-800 text-gray-400 border border-neutral-700 whitespace-nowrap">
                              {exp.date}
                            </span>
                          </div>

                          <div className="h-px w-full bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800 my-2"></div>

                          <ul className="space-y-3">
                            {exp.description.map((item, i) => (
                              <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                                <span className={`text-${exp.color}-400 mt-0.5`}>▹</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </SpotlightCard>
                    </motion.div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
