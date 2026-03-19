"use client";

import React from "react"
import { ShieldAlert } from "lucide-react"
import Link from "next/link"

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center pt-8 pb-8 px-4 relative">
      <div className="w-full max-w-5xl flex justify-between items-center mb-6 z-20">
        <Link href="/" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors flex items-center gap-2">
          &larr; Back to Portfolio
        </Link>
        <div className="flex items-center gap-2 text-neutral-400 text-sm bg-neutral-900/50 px-3 py-1.5 rounded-full border border-neutral-800">
          <ShieldAlert className="w-4 h-4 text-emerald-500" />
          <span>View Only Mode (Copy & Download Restricted)</span>
        </div>
      </div>

      {/* Outer scrollable container */}
      <div className="w-full max-w-5xl h-[85vh] overflow-y-auto rounded-xl border border-neutral-800 shadow-2xl bg-neutral-900 relative scrollbar-hide">

        {/* Inner tall container to stretch the PDF and avoid internal iframe scrollbars */}
        <div className="w-full relative overflow-hidden" style={{ aspectRatio: '1 / 2.92', minHeight: '150vh' }}>
          {/* The PDF iFrame with toolbar disabled. Extra width pushes the native scrollbar off-screen */}
          <iframe
            src="/resume.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH"
            className="absolute top-0 left-0 h-full pointer-events-auto border-none"
            style={{ width: "calc(100% + 20px)" }}
            title="Resume"
            scrolling="no"
          />

          {/* Protection Overlay: blocks mouse interactions like text selection, right click, dragging */}
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
