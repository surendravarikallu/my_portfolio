"use client";

import React from "react"
import { ShieldAlert, Download, ExternalLink } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center pt-8 pb-8 px-4 relative">
      <div className="w-full max-w-5xl flex justify-between items-center mb-6 z-20 flex-wrap gap-4">
        <Link href="/" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors flex items-center gap-2">
          &larr; Back to Portfolio
        </Link>
        <div className="flex items-center gap-2 text-neutral-400 text-sm bg-neutral-900/50 px-3 py-1.5 rounded-full border border-neutral-800">
          <ShieldAlert className="w-4 h-4 text-emerald-500" />
          <span>View Only Mode (Copy & Download Restricted)</span>
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
