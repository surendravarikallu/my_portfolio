"use client";

import { useEffect, useState, useRef } from "react";

const LOADER_DURATION_MS = 2400;

export function PageLoader() {
  if (typeof process !== "undefined" && process.env.NEXT_PUBLIC_DISABLE_LOADER === "1") {
    return null;
  }

  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  const percentRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const assetStatusRef = useRef<HTMLSpanElement>(null);
  const readyStatusRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const start = performance.now();
    let animId: number;

    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / LOADER_DURATION_MS);
      // Gentle smooth curve (takes ~0.7s per state for 100% readability)
      const p = Math.min(100, Math.round((1 - Math.pow(1 - t, 1.45)) * 100));

      if (percentRef.current) {
        percentRef.current.textContent = `${p}%`;
        if (p >= 100) {
          percentRef.current.style.color = "#ffffff";
          percentRef.current.style.textShadow = "0 0 20px rgba(255,255,255,0.8), 0 0 35px rgba(6,182,212,0.4)";
        }
      }

      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${Math.max(0.02, p / 100)})`;
      }

      if (assetStatusRef.current) {
        if (p < 28) {
          assetStatusRef.current.textContent = "CORE MODULES LOADING...";
        } else if (p < 62) {
          assetStatusRef.current.textContent = "ASSETS ADDED • COMPILING SHADERS...";
        } else if (p < 90) {
          assetStatusRef.current.textContent = "CONFIGURING 3D ENVIRONMENT...";
        } else {
          assetStatusRef.current.textContent = "ALL ASSETS LOADED";
          assetStatusRef.current.style.color = "#ffffff";
        }
      }

      if (readyStatusRef.current && p >= 100) {
        readyStatusRef.current.textContent = "Complete";
        readyStatusRef.current.style.color = "#38bdf8";
      }

      if (t < 1) {
        animId = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setIsFadingOut(true);
          setTimeout(() => {
            setIsRemoved(true);
          }, 350);
        }, 140);
      }
    };

    animId = requestAnimationFrame(tick);

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  if (isRemoved) {
    return null;
  }

  return (
    <div
      id="page-loader-root"
      role="status"
      aria-live="polite"
      aria-label="System Initialization"
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black transition-opacity duration-350 ease-out select-none ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Precision Micro-Grid Ambient Matrix */}
      <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

      {/* Atmospheric Central Cyan Specular Sheen */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65vw] max-w-2xl h-[30vh] rounded-full pointer-events-none opacity-40"
        style={{
          background: "radial-gradient(ellipse, rgba(56,189,248,0.15), transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Main Content Box: Generous, commanding classic scale */}
      <div className="relative flex flex-col items-center justify-center z-10 w-full max-w-xl sm:max-w-2xl px-6 sm:px-8">
        <div className="w-full flex flex-col items-center">
          
          {/* Top Header Row: System Initialization | Percentage */}
          <div className="flex justify-between w-full mb-3.5 items-end px-1">
            <span className="text-xs sm:text-sm tracking-[0.3em] text-cyan-400 uppercase font-semibold truncate font-mono">
              System Initialization
            </span>
            <span
              ref={percentRef}
              id="page-loader-percent"
              className="text-2xl sm:text-4xl font-light tracking-widest font-mono tabular-nums text-zinc-100 transition-colors duration-200"
              style={{ textShadow: "0 0 10px rgba(6,182,212,0.5)" }}
            >
              0%
            </span>
          </div>

          {/* Substantial Precision Loading Bar */}
          <div className="relative w-full h-2.5 sm:h-3 bg-zinc-950 border border-zinc-800 rounded-sm overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]">
            {/* Progress Bar (scaleX on GPU compositor) */}
            <div
              ref={barRef}
              id="page-loader-bar"
              className="h-full w-full relative origin-left will-change-transform bg-gradient-to-r from-zinc-200 via-cyan-400 to-blue-500 rounded-sm"
              style={{ transform: "scaleX(0.02)" }}
            >
              {/* Leading edge specular plasma flare */}
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-white opacity-80 blur-[3px]" />
            </div>

            {/* Horizontal scanline texture */}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.3)_50%,transparent_100%)] bg-[size:100%_4px] z-10 pointer-events-none opacity-40" />
          </div>

          {/* Bottom Status Row: Dynamic Asset Status | Sys.Ready */}
          <div className="w-full flex justify-between mt-2.5 text-[11px] sm:text-xs text-zinc-400 font-mono uppercase tracking-[0.2em] px-1">
            <div className="flex items-center gap-2 truncate pr-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shrink-0" />
              <span
                ref={assetStatusRef}
                id="page-loader-asset-status"
                className="transition-colors duration-200 truncate"
              >
                CORE MODULES LOADING...
              </span>
            </div>
            
            <span
              ref={readyStatusRef}
              id="page-loader-ready-status"
              className="text-zinc-500 font-mono transition-colors duration-200 shrink-0 font-medium"
            >
              Sys.Ready
            </span>
          </div>

        </div>
      </div>

      {/* Frame 0 Immediate Script: Runs at HTML parse time with zero React hydration delay */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
(function() {
  var pEl = document.getElementById('page-loader-percent');
  var bEl = document.getElementById('page-loader-bar');
  var aEl = document.getElementById('page-loader-asset-status');
  var rEl = document.getElementById('page-loader-ready-status');
  if (!pEl || !bEl) return;
  var start = performance.now();
  var dur = 2400;
  function f(now) {
    var t = Math.min(1, (now - start) / dur);
    var p = Math.min(100, Math.round((1 - Math.pow(1 - t, 1.45)) * 100));
    pEl.textContent = p + '%';
    bEl.style.transform = 'scaleX(' + Math.max(0.02, p / 100) + ')';
    if (aEl) {
      if (p < 28) aEl.textContent = 'CORE MODULES LOADING...';
      else if (p < 62) aEl.textContent = 'ASSETS ADDED • COMPILING SHADERS...';
      else if (p < 90) aEl.textContent = 'CONFIGURING 3D ENVIRONMENT...';
      else { aEl.textContent = 'ALL ASSETS LOADED'; aEl.style.color = '#ffffff'; }
    }
    if (rEl && p >= 100) {
      rEl.textContent = 'Complete';
      rEl.style.color = '#38bdf8';
    }
    if (t < 1) requestAnimationFrame(f);
  }
  requestAnimationFrame(f);
})();
`,
        }}
      />
    </div>
  );
}
