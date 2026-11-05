"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView, useSpring, useMotionValue } from "framer-motion";
import { Award, ExternalLink, Linkedin, ShieldCheck } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { TextReveal } from "@/components/animations/TextReveal";

function AnimatedStat({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const springVal = useSpring(motionVal, { stiffness: 80, damping: 20 });

  useEffect(() => {
    if (inView) motionVal.set(value);
  }, [inView, motionVal, value]);

  useEffect(() => {
    const unsub = springVal.on("change", (v: number) => {
      if (ref.current) ref.current.textContent = `${Math.round(v)}${suffix}`;
    });
    return unsub;
  }, [springVal, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

const certificates = [
  // 1. AWS
  {
    title: "AWS Certified AI Practitioner",
    issuer: "Amazon Web Services (AWS)",
    date: "2026",
    category: "enterprise",
    description: "Earned industry-recognized AWS certification validating foundational knowledge of artificial intelligence, machine learning concepts, prompt engineering, generative AI workloads, and responsible AI governance across AWS cloud infrastructure.",
    logo: "/aws-logo.svg",
    color: "from-amber-500 to-orange-500",
    link: "https://www.linkedin.com/posts/surendravarikallu_aws-artificialintelligence-generativeai-share-7520490773629419520-RNBx/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFF4qGEBjEyvbPo47l2yrisvrC8XMS1Sm30",
    buttonLabel: "View on LinkedIn",
    isLinkedIn: true,
  },
  // 2. SAP
  {
    title: "SAP Certified Associate — ABAP on SAP HANA",
    issuer: "SAP",
    date: "2026",
    category: "enterprise",
    description: "Certified by SAP for modern back-end enterprise engineering and ABAP Cloud paradigms. Validated proficiency in database-optimized programming, Core Data Services (CDS), ABAP RESTful Application Programming (RAP), and SAP HANA architecture.",
    logo: "/sap-logo.svg",
    color: "from-blue-600 to-cyan-500",
    link: "https://www.linkedin.com/posts/surendravarikallu_sap-abapcloud-backenddevelopment-share-7520490464433762304-4uaa/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFF4qGEBjEyvbPo47l2yrisvrC8XMS1Sm30",
    buttonLabel: "View on LinkedIn",
    isLinkedIn: true,
  },
  // 3. ServiceNow CSA
  {
    title: "ServiceNow Certified System Administrator (CSA)",
    issuer: "ServiceNow",
    date: "2026",
    category: "enterprise",
    description: "Validated expertise in administering, configuring, and maintaining the ServiceNow platform. Demonstrates hands-on proficiency in user administration, database schema and data models, UI policies, business rules, workflows, SLA management, and system security controls.",
    logo: "/icons/servicenow.svg",
    color: "from-emerald-400 to-teal-600",
    link: "https://www.credly.com/badges/bc9bfcff-637e-4a08-a779-f033919585f7/public_url",
    buttonLabel: "Verify on Credly",
    isCredly: true,
    linkedInLink: "https://lnkd.in/p/dj9C3hRF",
  },
  // 4. ServiceNow CAD
  {
    title: "ServiceNow Certified Application Developer (CAD)",
    issuer: "ServiceNow",
    date: "2026",
    category: "enterprise",
    description: "Certified proficiency in designing, developing, and deploying custom enterprise applications on the ServiceNow Now Platform. Validated mastery in client scripts, UI actions, script includes, REST/SOAP API integrations, Automated Test Framework (ATF), and application security.",
    logo: "/icons/servicenow.svg",
    color: "from-teal-400 to-cyan-600",
    link: "https://www.credly.com/badges/4fd9007c-fd0f-410b-a0a4-284f929538d1/public_url",
    buttonLabel: "Verify on Credly",
    isCredly: true,
    linkedInLink: "https://lnkd.in/p/d2bXfkDW",
  },
  // 5. Google
  {
    title: "Google Student Ambassador",
    issuer: "Google",
    date: "2025",
    category: "honors",
    description: "Spearheaded campus-wide technology initiatives and hackathons as a Google representative. Fostered a vibrant developer community by mentoring peers, organizing technical workshops, and facilitating access to Google's cutting-edge development tools and resources.",
    logo: "/google-logo.webp",
    color: "from-yellow-400 to-red-500",
    link: "https://www.linkedin.com/posts/surendra-varikallu-081914321_gsa-certificate-ugcPost-7427415301652279297-BsvH?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFF4qGEBjEyvbPo47l2yrisvrC8XMS1Sm30",
    buttonLabel: "View on LinkedIn",
    isLinkedIn: true,
  },
  // 6. Hackathon 1st Prize
  {
    title: "Hackathon First Prize — Elevate X Season 2",
    issuer: "Codegnan",
    date: "2026",
    category: "honors",
    description: "Won 1st prize at Elevate X Season 2 Hackathon, a 12-hour full-stack coding sprint organized by Codegnan. Developed and deployed a high-performance prototype, showcasing rapid full-stack engineering.",
    logo: "/codegnan-logo.webp",
    color: "from-yellow-400 to-amber-500",
    link: "https://www.linkedin.com/posts/surendravarikallu_hackathon-elevatex-codegna-ugcPost-7461969134462025728-RJXk/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFF4qGEBjEyvbPo47l2yrisvrC8XMS1Sm30",
    projectLink: "http://global-smile-lc5h.onrender.com/",
    buttonLabel: "View on LinkedIn",
    isLinkedIn: true,
  },
  // 7. Hackathon 3rd Prize
  {
    title: "Hackathon Third Prize — Student Connect",
    issuer: "College Hackathon",
    date: "2026",
    category: "honors",
    description: "Secured third place for building Student Connect — a collaborative platform to help students connect, share academic resources, and collaborate on projects. Built with Python and Django.",
    logo: "/hackathon-logo.webp",
    color: "from-cyan-400 to-purple-500",
    link: "https://www.linkedin.com/posts/surendra-varikallu-081914321_hackathon-python-django-ugcPost-7431210605279121408-JUdM?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFF4qGEBjEyvbPo47l2yrisvrC8XMS1Sm30",
    projectLink: "http://studentconnect-sjc1.onrender.com/",
    buttonLabel: "View on LinkedIn",
    isLinkedIn: true,
  },
  // 8. Web Development
  {
    title: "Web Development",
    issuer: "Codegnan",
    date: "2025",
    category: "technical",
    description: "Acquired mastery in full-spectrum web engineering, moving from semantic HTML5/CSS3 to advanced JavaScript paradigms. Developed responsive, high-performance interfaces and dynamic applications using modern component-based architectures.",
    logo: "/codegnan-logo.webp",
    color: "from-blue-500 to-cyan-500",
    link: "https://www.linkedin.com/posts/surendra-varikallu-081914321_completion-certificate-activity-7346374322422247424-tQCd?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFF4qGEBjEyvbPo47l2yrisvrC8XMS1Sm30",
    buttonLabel: "View on LinkedIn",
    isLinkedIn: true,
  },
  // 9. Full Stack Development
  {
    title: "Full Stack Development",
    issuer: "Cognifyz Technologies",
    date: "2025",
    category: "technical",
    description: "Executed comprehensive full-stack solutions during an intensive internship, integrating robust backend RESTful APIs with sleek React frontends. Gained practical expertise in database schema design, server-side logic, and seamless client-server communication.",
    logo: "/cognifyz-logo.webp",
    color: "from-purple-500 to-pink-500",
    link: "https://www.linkedin.com/posts/surendra-varikallu-081914321_full-stack-certificate-activity-7350820591731372032-oEOh?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFF4qGEBjEyvbPo47l2yrisvrC8XMS1Sm30",
    buttonLabel: "View on LinkedIn",
    isLinkedIn: true,
  },
  // 10. AI & Data Science
  {
    title: "AI & Data Science Workshops",
    issuer: "IIT Bombay TechFest 26",
    date: "2026",
    category: "technical",
    description: "Completed a comprehensive 5-day journey at Asia's largest science and technology festival, attending two distinct intensive workshops focused on Artificial Intelligence and Data Science.",
    logo: "/icons/jupyter.svg",
    color: "from-indigo-500 to-blue-600",
    link: "https://www.linkedin.com/posts/surendra-varikallu-081914321_iitbombay-techfest2026-ai-ugcPost-7427414842187309056-R47v?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFF4qGEBjEyvbPo47l2yrisvrC8XMS1Sm30",
    buttonLabel: "View on LinkedIn",
    isLinkedIn: true,
  },
  // 11. Google DevFest
  {
    title: "Participant — Google DevFest Hyderabad",
    issuer: "Google Developers Group",
    date: "2025",
    category: "technical",
    description: "Participated in the premier technical conference, engaging with industry experts on modern web technologies, AI advancements, and cloud architecture.",
    logo: "/icons/google.svg",
    color: "from-blue-400 to-green-500",
    link: "https://www.linkedin.com/posts/surendra-varikallu-081914321_dev-feast-hyderabad-2025-activity-7385869175635804160-NE9-?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFF4qGEBjEyvbPo47l2yrisvrC8XMS1Sm30",
    buttonLabel: "View on LinkedIn",
    isLinkedIn: true,
  },
  // 12. SQL
  {
    title: "SQL Certification",
    issuer: "HackerRank",
    date: "2025",
    category: "technical",
    description: "Achieved advanced proficiency in relational database architecture and complex SQL querying. Demonstrated capability in optimizing data retrieval operations, designing normalized schemas, and managing large-scale datasets for performance-critical applications.",
    logo: "/hackerrank-logo.webp",
    color: "from-green-500 to-teal-500",
    link: "https://www.linkedin.com/posts/surendra-varikallu-081914321_sql-hackerrank-certified-activity-7350835811635920897-uKm6?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFF4qGEBjEyvbPo47l2yrisvrC8XMS1Sm30",
    buttonLabel: "View on LinkedIn",
    isLinkedIn: true,
  },
  // 13. Oracle GenAI
  {
    title: "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional",
    issuer: "Oracle",
    date: "2025",
    category: "technical",
    description: "Achieved professional-level certification demonstrating expertise in designing, deploying, and managing Generative AI solutions on Oracle Cloud Infrastructure.",
    logo: "/icons/oracle.svg",
    color: "from-red-500 to-red-700",
    link: "https://www.linkedin.com/posts/surendra-varikallu-081914321_genai-activity-7366834534375378945-DczT?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFF4qGEBjEyvbPo47l2yrisvrC8XMS1Sm30",
    buttonLabel: "View on LinkedIn",
    isLinkedIn: true,
  },
  // 14. Oracle Foundations
  {
    title: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
    issuer: "Oracle",
    date: "2025",
    category: "technical",
    description: "Validated foundational knowledge in artificial intelligence, machine learning, and deep learning concepts within the Oracle Cloud Infrastructure ecosystem.",
    logo: "/icons/oracle.svg",
    color: "from-red-400 to-orange-500",
    link: "https://www.linkedin.com/posts/surendra-varikallu-081914321_oracle-certificate-activity-7363389478024933376-zSbH?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFF4qGEBjEyvbPo47l2yrisvrC8XMS1Sm30",
    buttonLabel: "View on LinkedIn",
    isLinkedIn: true,
  },
];

const certFilterTabs = [
  { id: "all", label: "All Certifications (14)" },
  { id: "enterprise", label: "Enterprise & Cloud (4)" },
  { id: "honors", label: "Hackathons & Honors (3)" },
  { id: "technical", label: "AI & Full-Stack (7)" },
];

export default function CertificatesSection() {
  const [activeFilter, setActiveFilter] = useState("all");

  const visibleCertificates =
    activeFilter === "all"
      ? certificates
      : certificates.filter((c) => c.category === activeFilter);

  return (
    <section id="certificates" aria-label="Certificates & Professional Achievements" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-black">
      <div className="relative z-10 max-w-6xl mx-auto">
        <ScrollReveal
          delay={0}
          yOffset={30}
          className="text-center mb-12"
        >
          <p className="text-xs font-mono font-medium tracking-[0.25em] text-cyan-400/90 uppercase mb-2">
            // 05. CREDENTIALS & HONORS
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold mb-4 text-titanium tracking-tight">
            Certificates & Achievements
          </h2>
          <p className="text-zinc-400 mt-3 max-w-2xl mx-auto text-base sm:text-lg">
            Professional certifications and achievements that validate my enterprise engineering skills and expertise.
          </p>

          {/* Quick Filter Pill Bar */}
          <div className="flex flex-wrap justify-center items-center gap-2 mt-8">
            {certFilterTabs.map((tab) => {
              const isSelected = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  aria-pressed={isSelected}
                  className={`relative px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                    isSelected ? "text-white font-semibold" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="cert-filter-pill"
                      className="absolute inset-0 rounded-full bg-zinc-800 border border-zinc-700/80 shadow-[0_2px_10px_rgba(0,0,0,0.5)] -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    />
                  )}
                  {tab.label}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="grid md:grid-cols-2 gap-6 sm:gap-8"
          >
            {visibleCertificates.map((cert, index) => (
              <div
                key={cert.title}
                className="group relative h-full rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-neutral-700/80 p-6 sm:p-7 [transform:translateZ(0)] [backface-visibility:hidden] transition-all duration-300 hover:-translate-y-1.5 flex flex-col overflow-hidden shadow-lg"
              >
                {/* Uilora Ambient Sheen & Hover Glow */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl pointer-events-none`}
                />
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Certificate Content */}
                <div className="relative z-10 flex-grow flex flex-col">
                  {/* Logo and Award Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-14 h-14 rounded-full overflow-hidden border border-neutral-700 group-hover:border-cyan-500/50 bg-neutral-800/80 p-2 transition-colors duration-300 flex items-center justify-center shrink-0">
                      <Image
                        src={cert.logo}
                        alt={`${cert.issuer} logo`}
                        width={48}
                        height={48}
                        className="w-10 h-10 object-contain"
                        loading="lazy"
                        unoptimized
                      />
                    </div>
                    <div className={`p-2.5 rounded-full bg-gradient-to-br ${cert.color} group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                      <Award className="h-5 w-5 text-white" aria-hidden="true" />
                    </div>
                  </div>

                  {/* Certificate Info */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300 tracking-tight">
                    {cert.title}
                  </h3>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-gray-300 font-medium text-sm">{cert.issuer}</p>
                    <span className="text-xs font-mono text-cyan-400 bg-neutral-800/80 border border-neutral-700/80 px-2.5 py-0.5 rounded-full">
                      {cert.date}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed flex-grow">
                    {cert.description}
                  </p>

                  {/* Verification / View Link */}
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${cert.buttonLabel} for ${cert.title}`}
                    className={`w-full py-3 px-4 bg-gradient-to-r ${cert.color} text-white rounded-xl font-semibold transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 mt-auto shadow-md text-sm`}
                  >
                    {'isCredly' in cert && cert.isCredly ? (
                      <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-200" aria-hidden="true" />
                    ) : 'isLinkedIn' in cert && cert.isLinkedIn ? (
                      <Linkedin className="h-4 w-4 shrink-0" aria-hidden="true" />
                    ) : (
                      <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
                    )}
                    <span>{cert.buttonLabel}</span>
                  </a>

                  {/* Secondary: View on LinkedIn */}
                  {'linkedInLink' in cert && cert.linkedInLink && (
                    <a
                      href={cert.linkedInLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View on LinkedIn for ${cert.title}`}
                      className="w-full py-2.5 px-4 mt-2.5 border border-neutral-700 hover:border-cyan-500/40 bg-neutral-800/40 hover:bg-neutral-800/80 text-gray-300 hover:text-white rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 text-sm"
                    >
                      <Linkedin className="h-3.5 w-3.5 shrink-0 text-cyan-400" aria-hidden="true" />
                      <span>View on LinkedIn</span>
                    </a>
                  )}

                  {/* Secondary: View Project link for hackathon */}
                  {'projectLink' in cert && cert.projectLink && (
                    <a
                      href={cert.projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View live project for ${cert.title}`}
                      className="w-full py-2.5 px-4 mt-2.5 border border-neutral-700 hover:border-cyan-500/40 bg-neutral-800/40 hover:bg-neutral-800/80 text-gray-300 hover:text-white rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 text-sm"
                    >
                      <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span>View Project</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Achievement Stats */}
        <ScrollReveal
          delay={0.2}
          yOffset={20}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {[
            { number: "14+", label: "Certifications & Events" },
            { number: "3+", label: "Internships" },
            { number: "100%", label: "Completion Rate" },
          ].map((stat: { number: string; label: string }) => (
            <div
              key={stat.label}
              className="text-center bg-zinc-950/70 rounded-xl p-6 border border-zinc-800/80 [transform:translateZ(0)] hover:border-zinc-700 transition-colors duration-200 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
            >
              <div className="text-3xl font-bold font-mono text-white mb-2">
                {stat.label === "Completion Rate" ? (
                  <AnimatedStat value={100} suffix="%" />
                ) : (
                  <AnimatedStat value={parseInt(stat.number)} suffix="+" />
                )}
              </div>
              <div className="text-zinc-400 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
