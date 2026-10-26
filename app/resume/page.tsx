"use client";

import React from "react"
import { ShieldCheck, Mail, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center pt-8 pb-8 px-4 relative">
      <div className="w-full max-w-5xl flex justify-between items-center mb-6 z-20 flex-wrap gap-4">
        <Link href="/" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors flex items-center gap-2 text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Portfolio
        </Link>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 text-neutral-300 text-xs sm:text-sm bg-neutral-900/90 px-3.5 py-1.5 rounded-full border border-neutral-800 shadow-sm font-mono">
            <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Official Candidate Copy • Placement Verification Active</span>
          </div>
          <Link
            href="/#contact"
            className="text-xs sm:text-sm px-4 py-1.5 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 hover:text-white font-medium transition-colors flex items-center gap-1.5"
          >
            <Mail className="w-3.5 h-3.5" /> Recruiters: Request ATS PDF
          </Link>
        </div>
      </div>

      {/* Outer container */}
      <div 
        data-lenis-prevent="true"
        className="w-full max-w-5xl h-[85vh] overflow-y-auto rounded-xl border border-neutral-800 shadow-2xl bg-neutral-900 relative scrollbar-hide"
      >
        <div className="w-full relative overflow-hidden" style={{ aspectRatio: '1 / 2.92', minHeight: '150vh' }}>
          {/* Desktop PDF Viewer */}
          <iframe
            src="/resume.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH"
            className="hidden md:block absolute top-0 left-0 h-full border-none pointer-events-auto"
            style={{ width: "calc(100% + 20px)" }}
            title="Resume Desktop"
            scrolling="no"
          />

          {/* Mobile PDF Viewer (Google Docs) */}
          <iframe
            src="https://docs.google.com/viewer?url=https%3A%2F%2Fsurendravarikallu.dev%2Fresume.pdf&embedded=true"
            className="md:hidden block absolute top-0 left-0 w-full h-full border-none pointer-events-auto"
            title="Resume Mobile"
            scrolling="no"
          />

          {/* Protection Overlay: explicitly blocks interactions */}
          <div
            className="absolute inset-0 z-10 cursor-default select-none"
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
            title="Document is protected. Copying and downloading are disabled."
          ></div>
        </div>
      </div>
    </div>
  )
}
