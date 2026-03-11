"use client"

import { useEffect, useRef } from "react"
import { motion, useInView, useSpring, useMotionValue } from "framer-motion"
import { Award, ExternalLink } from "lucide-react"
import { ScrollReveal } from "@/components/animations/ScrollReveal"

function AnimatedStat({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const springVal = useSpring(motionVal, { stiffness: 80, damping: 20 });

  useEffect(() => {
    if (inView) motionVal.set(value);
  }, [inView, motionVal, value]);

  useEffect(() => {
    const unsub = springVal.on("change", (v) => {
      if (ref.current) ref.current.textContent = `${Math.round(v)}${suffix}`;
    });
    return unsub;
  }, [springVal, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

const certificates = [
  {
    title: "Hackathon Third Prize — Student Connect",
    issuer: "College Hackathon",
    date: "2026",
    description: "Secured third place for building Student Connect — a hyperlocal microjob marketplace connecting people with verified university students for services like poster design, web development, tutoring, and other quick tasks. Built with Python and Django.",
    logo: "/hackathon-logo.png",
    color: "from-cyan-400 to-purple-500",
    link: "https://www.linkedin.com/posts/surendra-varikallu-081914321_hackathon-python-django-ugcPost-7431210605279121408-JUdM?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFF4qGEBjEyvbPo47l2yrisvrC8XMS1Sm30",
  },
  {
    title: "Google Student Ambassador",
    issuer: "Google",
    date: "2025",
    description: "Spearheaded campus-wide technology initiatives and hackathons as a Google representative. Fostered a vibrant developer community by mentoring peers, organizing technical workshops, and facilitating access to Google's cutting-edge development tools and resources.",
    logo: "/google-logo.png",
    color: "from-yellow-400 to-red-500",
    link: "https://www.linkedin.com/posts/surendra-varikallu-081914321_gsa-certificate-ugcPost-7427415301652279297-BsvH?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFF4qGEBjEyvbPo47l2yrisvrC8XMS1Sm30",
  },
  {
    title: "Web Development",
    issuer: "Codegnan",
    date: "2025",
    description: "Acquired mastery in full-spectrum web engineering, moving from semantic HTML5/CSS3 to advanced JavaScript paradigms. Developed responsive, high-performance interfaces and dynamic applications using modern component-based architectures.",
    logo: "/codegnan-logo.jpg",
    color: "from-blue-500 to-cyan-500",
    link: "https://www.linkedin.com/posts/surendra-varikallu-081914321_completion-certificate-activity-7346374322422247424-tQCd?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFF4qGEBjEyvbPo47l2yrisvrC8XMS1Sm30",
  },
  {
    title: "Full Stack Development",
    issuer: "Cognifyz Technologies",
    date: "2025",
    description: "Executed comprehensive full-stack solutions during an intensive internship, integrating robust backend RESTful APIs with sleek React frontends. Gained practical expertise in database schema design, server-side logic, and seamless client-server communication.",
    logo: "/cognifyz-logo.jpg",
    color: "from-purple-500 to-pink-500",
    link: "https://www.linkedin.com/posts/surendra-varikallu-081914321_full-stack-certificate-activity-7350820591731372032-oEOh?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFF4qGEBjEyvbPo47l2yrisvrC8XMS1Sm30",
  },
  {
    title: "SQL Certification",
    issuer: "HackerRank",
    date: "2025",
    description: "Achieved advanced proficiency in relational database architecture and complex SQL querying. Demonstrated capability in optimizing data retrieval operations, designing normalized schemas, and managing large-scale datasets for performance-critical applications.",
    logo: "/hackerrank-logo.png",
    color: "from-green-500 to-teal-500",
    link: "https://www.linkedin.com/posts/surendra-varikallu-081914321_sql-hackerrank-certified-activity-7350835811635920897-uKm6?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFF4qGEBjEyvbPo47l2yrisvrC8XMS1Sm30",
  },
]

export default function CertificatesSection() {
  return (
    <section id="certificates" className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <ScrollReveal
          delay={0}
          yOffset={50}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Certificates & Achievements
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Professional certifications and achievements that validate my skills and expertise
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8">
          {certificates.map((cert, index) => (
            <ScrollReveal
              key={cert.title}
              delay={index * 0.2}
              yOffset={50}
              className="group relative h-full"
            >
              <motion.div
                whileHover={{
                  y: -10,
                  scale: 1.02,
                }}
                className="h-full"
              >
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden h-full flex flex-col">
                  {/* Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}
                  ></div>

                  {/* Certificate Content */}
                  <div className="relative z-10 flex-grow flex flex-col">
                    {/* Logo and Award Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <motion.div
                        className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/20 group-hover:border-white/40 transition-colors duration-300"
                        whileHover={{ scale: 1.1 }}
                      >
                        <img
                          src={cert.logo}
                          alt={`${cert.issuer} logo`}
                          className="w-16 h-16 rounded-full object-contain bg-white/10 p-2"
                        />
                      </motion.div>
                      <motion.div
                        className={`p-3 rounded-full bg-gradient-to-br ${cert.color} group-hover:scale-110 transition-transform duration-300`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Award className="h-6 w-6 text-white" />
                      </motion.div>
                    </div>

                    {/* Certificate Info */}
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                      {cert.title}
                    </h3>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-gray-300 font-medium">{cert.issuer}</p>
                      <span className="text-sm text-gray-400 bg-white/10 px-2 py-1 rounded-full">{cert.date}</span>
                    </div>
                    <p className="text-gray-400 text-sm mb-6 leading-relaxed flex-grow">{cert.description}</p>

                    {/* View Certificate Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => window.open(cert.link, "_blank")}
                      className={`w-full py-3 px-4 bg-gradient-to-r ${cert.color} text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2 group-hover:shadow-lg mt-auto`}
                    >
                      <ExternalLink className="h-4 w-4" />
                      View Certificate
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Achievement Stats */}
        <ScrollReveal
          delay={0.8}
          yOffset={30}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {[
            { number: "6+", label: "Certifications" },
            { number: "3+", label: "Internships" },
            { number: "100%", label: "Completion Rate" },
          ].map((stat: { number: string, label: string }) => (
            <div
              key={stat.label}
              className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">
                {stat.label === "Completion Rate" ? (
                  <><AnimatedStat value={100} suffix="%" /></>
                ) : (
                  <><AnimatedStat value={parseInt(stat.number)} suffix="+" /></>
                )}
              </div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  )
}
