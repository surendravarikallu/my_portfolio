"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PageLoader() {
  const [isReady, setIsReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    const duration = 1500;
    const interval = 30;
    const step = 100 / (duration / interval);

    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        const jump = step * (Math.random() * 1.5 + 0.5);
        const next = Math.min(100, prev + jump);

        if (next >= 100 && !doneRef.current) {
          doneRef.current = true;
          if (timerRef.current) clearInterval(timerRef.current);
          // Quick exit after hitting 100%
          setTimeout(() => setIsReady(true), 300);
        }

        return next;
      });
    }, interval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <AnimatePresence>
      {!isReady && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4, ease: "easeOut" } }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
        >
          {/* Cyberpunk Grid Background */}
          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

          {/* Ambient Glow */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[20vh] rounded-full pointer-events-none"
            animate={{
              background: progress >= 100
                ? "radial-gradient(ellipse, rgba(255,255,255,0.15), transparent)"
                : "radial-gradient(ellipse, rgba(6,182,212,0.15), transparent)",
            }}
            style={{ filter: "blur(80px)" }}
            transition={{ duration: 0.3 }}
          />

          {/* Content */}
          <div className="relative flex flex-col items-center justify-center z-10 w-full max-w-xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="w-full flex flex-col items-center"
            >
              <div className="flex justify-between w-full mb-3 items-end px-1">
                <span className="text-xs tracking-[0.3em] text-cyan-400 uppercase font-semibold animate-glitch-text truncate">
                  System Initialization
                </span>
                <motion.span
                  className="text-2xl sm:text-4xl font-light tracking-widest font-mono tabular-nums"
                  animate={{
                    color: progress >= 100 ? "#ffffff" : "#e4e4e7",
                    textShadow: progress >= 100
                      ? "0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(6,182,212,0.5)"
                      : "0 0 10px rgba(6,182,212,0.6)",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {Math.round(progress)}%
                </motion.span>
              </div>

              {/* Cyberpunk Loading Bar */}
              <div className="relative w-full h-2 sm:h-3 bg-neutral-900 border border-neutral-800 rounded-sm overflow-hidden animate-crt-flicker">
                {/* Animated scanline sweep */}
                <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
                  <div className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/15 to-transparent animate-scanline-sweep" />
                </div>

                <motion.div
                  className="h-full relative"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${Math.max(2, progress)}%`,
                    background: progress >= 100
                      ? "linear-gradient(90deg, #fff, #22d3ee, #a855f7, #fff)"
                      : "linear-gradient(90deg, #0891b2, #22d3ee, #a855f7)",
                  }}
                  transition={{ ease: "linear", duration: 0.08 }}
                >
                  {/* Leading edge glow */}
                  <div className="absolute right-0 top-0 bottom-0 w-6 bg-white opacity-60 blur-[4px]" />
                </motion.div>

                {/* Horizontal scanline texture */}
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.3)_50%,transparent_100%)] bg-[size:100%_4px] z-10 pointer-events-none opacity-40" />
              </div>

              <div className="w-full flex justify-between mt-2 text-[10px] sm:text-xs text-neutral-500 font-mono uppercase tracking-[0.2em]">
                <span>Loading Assets</span>
                <motion.span
                  animate={{
                    color: progress >= 100 ? "#22d3ee" : "rgba(168,85,247,0.7)",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {progress >= 100 ? "Complete" : "Sys.Ready"}
                </motion.span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
