"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, Cpu, Server, ShieldCheck, Zap, Activity, Database, 
  Layers, ArrowRight, HardDrive, Terminal, GitBranch, Lock, Brain
} from "lucide-react";

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectType: "skillnox" | "skillnox_ai" | null;
}

export function ArchitectureModal({ isOpen, onClose, projectType }: ArchitectureModalProps) {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("primary");
  const scrollBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset tab and scroll position when modal opens or projectType/tab changes
  useEffect(() => {
    if (isOpen) {
      setActiveTab("primary");
      if (scrollBodyRef.current) {
        scrollBodyRef.current.scrollTop = 0;
      }
    }
  }, [isOpen, projectType]);

  useEffect(() => {
    if (scrollBodyRef.current) {
      scrollBodyRef.current.scrollTop = 0;
    }
  }, [activeTab]);

  // Lock background scroll completely on html and body, and pause Lenis smooth-scroll
  useEffect(() => {
    if (!isOpen) return;

    const html = document.documentElement;
    const body = document.body;

    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;

    html.classList.add("lenis-stopped");
    body.classList.add("lenis-stopped");
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    if (typeof window !== "undefined" && (window as any).lenis) {
      (window as any).lenis.stop();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      html.classList.remove("lenis-stopped");
      body.classList.remove("lenis-stopped");
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      if (typeof window !== "undefined" && (window as any).lenis) {
        (window as any).lenis.start();
      }
    };
  }, [isOpen, onClose]);

  if (!mounted || !isOpen || !projectType) return null;

  const isSkillnox = projectType === "skillnox";
  const isSkillnoxAI = projectType === "skillnox_ai";

  const modalContent = (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-hidden overscroll-contain select-none"
        onWheel={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        onTouchMove={(e) => {
          e.stopPropagation();
        }}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          className="relative w-full max-w-4xl h-[85vh] bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10 select-text"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Header */}
          <div 
            className="relative px-6 py-5 border-b border-neutral-800/80 bg-neutral-900/70 backdrop-blur-sm shrink-0 flex items-center justify-between"
            onWheel={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <div className={`absolute top-0 left-1/4 w-96 h-12 ${isSkillnox ? "bg-cyan-500/15" : "bg-purple-500/15"} blur-3xl pointer-events-none rounded-full`} />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold font-mono ${
                  isSkillnox 
                    ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" 
                    : "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                }`}>
                  <ShieldCheck className="w-3.5 h-3.5" /> 
                  {isSkillnox ? "docs/skillnox/STRESS_TEST_REPORT.md" : "docs/skillnox_ai/ARCHITECTURE.md"}
                </span>
                <span className="text-xs text-neutral-400 font-mono">Verified Repository Docs</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {isSkillnox ? "Skillnox Platform — System Architecture & 5K VU Stress Test" : "Skillnox.AI — AI System Architecture & Dual Inference"}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="px-6 pt-3 border-b border-neutral-800 bg-neutral-900/40 shrink-0 flex gap-2 overflow-x-auto scrollbar-hide">
            {isSkillnox && (
              <>
                <button
                  onClick={() => setActiveTab("primary")}
                  className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-t-xl border-b-2 transition-all duration-200 whitespace-nowrap ${
                    activeTab === "primary"
                      ? "border-cyan-400 text-cyan-400 bg-cyan-500/10"
                      : "border-transparent text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50"
                  }`}
                >
                  <Activity className="w-4 h-4" /> k6 5,000 VU Stress Test Report
                </button>
                <button
                  onClick={() => setActiveTab("caching")}
                  className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-t-xl border-b-2 transition-all duration-200 whitespace-nowrap ${
                    activeTab === "caching"
                      ? "border-purple-400 text-purple-400 bg-purple-500/10"
                      : "border-transparent text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50"
                  }`}
                >
                  <Layers className="w-4 h-4" /> 3-Tier Caching & Anti-Thundering Herd
                </button>
              </>
            )}

            {isSkillnoxAI && (
              <>
                <button
                  onClick={() => setActiveTab("primary")}
                  className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-t-xl border-b-2 transition-all duration-200 whitespace-nowrap ${
                    activeTab === "primary"
                      ? "border-purple-400 text-purple-400 bg-purple-500/10"
                      : "border-transparent text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50"
                  }`}
                >
                  <Cpu className="w-4 h-4" /> Dual AI Inference Engine
                </button>
                <button
                  onClick={() => setActiveTab("queue")}
                  className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-t-xl border-b-2 transition-all duration-200 whitespace-nowrap ${
                    activeTab === "queue"
                      ? "border-pink-400 text-pink-400 bg-pink-500/10"
                      : "border-transparent text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50"
                  }`}
                >
                  <Terminal className="w-4 h-4" /> EvaluationQueue & 3-Round Pipeline
                </button>
              </>
            )}
          </div>

          {/* Modal Body */}
          <div 
            ref={scrollBodyRef}
            className="p-6 overflow-y-auto flex-1 min-h-0 space-y-6 text-sm text-neutral-300 overscroll-contain select-text"
            data-lenis-prevent="true"
            onWheel={(e) => {
              e.stopPropagation();
              const el = e.currentTarget;
              const { scrollTop, scrollHeight, clientHeight } = el;
              const deltaY = e.deltaY;
              const isScrollingUp = deltaY < 0;
              const isScrollingDown = deltaY > 0;
              const isAtTop = scrollTop <= 0;
              const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

              if ((isScrollingUp && isAtTop) || (isScrollingDown && isAtBottom)) {
                e.preventDefault();
              }
            }}
          >
            {/* SKILLNOX TAB 1: k6 STRESS TEST REPORT */}
            {isSkillnox && activeTab === "primary" && (
              <div className="space-y-6">
                {/* 4 Stat Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800">
                    <div className="text-xs text-neutral-400 font-mono mb-1">Peak Concurrency</div>
                    <div className="text-2xl font-bold text-cyan-400 font-mono">5,000 VUs</div>
                    <div className="text-[11px] text-neutral-500 mt-1">20-min sustained hold</div>
                  </div>
                  <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800">
                    <div className="text-xs text-neutral-400 font-mono mb-1">Success Rate</div>
                    <div className="text-2xl font-bold text-emerald-400 font-mono">100.00%</div>
                    <div className="text-[11px] text-emerald-500/80 mt-1">0 failed of 146,045 reqs</div>
                  </div>
                  <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800">
                    <div className="text-xs text-neutral-400 font-mono mb-1">Average Latency</div>
                    <div className="text-2xl font-bold text-purple-400 font-mono">3.97 ms</div>
                    <div className="text-[11px] text-neutral-500 mt-1">400x speedup vs baseline</div>
                  </div>
                  <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800">
                    <div className="text-xs text-neutral-400 font-mono mb-1">P95 / P99 Latency</div>
                    <div className="text-2xl font-bold text-amber-400 font-mono">6.98 / 17 ms</div>
                    <div className="text-[11px] text-neutral-500 mt-1">Zero timeout drops</div>
                  </div>
                </div>

                {/* Benchmark Progression Table */}
                <div className="rounded-xl border border-neutral-800 overflow-hidden bg-neutral-900/50">
                  <div className="px-4 py-3 bg-neutral-900 border-b border-neutral-800 font-semibold text-white flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-cyan-400" /> Official k6 Benchmark Progression
                    </span>
                    <span className="text-xs text-neutral-400 font-mono">Grafana Labs k6 Suite v1.1</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-neutral-900/90 text-neutral-400 font-mono uppercase border-b border-neutral-800">
                        <tr>
                          <th className="py-2.5 px-4">Metric</th>
                          <th className="py-2.5 px-4">Baseline (May 23)</th>
                          <th className="py-2.5 px-4">Pre-Opt (June 25)</th>
                          <th className="py-2.5 px-4 text-cyan-300">Optimized (June 26)</th>
                          <th className="py-2.5 px-4 text-emerald-400">Impact Trend</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-800/60 font-mono">
                        <tr>
                          <td className="py-2.5 px-4 font-sans font-medium text-neutral-200">Peak Concurrency</td>
                          <td className="py-2.5 px-4 text-neutral-400">5,000 VUs</td>
                          <td className="py-2.5 px-4 text-neutral-400">5,000 VUs</td>
                          <td className="py-2.5 px-4 text-cyan-400 font-bold">5,000 VUs</td>
                          <td className="py-2.5 px-4 text-emerald-400">Sustained Peak</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 font-sans font-medium text-neutral-200">Total HTTP Requests</td>
                          <td className="py-2.5 px-4 text-neutral-400">97,449</td>
                          <td className="py-2.5 px-4 text-neutral-400">92,620</td>
                          <td className="py-2.5 px-4 text-cyan-400 font-bold">146,045</td>
                          <td className="py-2.5 px-4 text-emerald-400">+57% Throughput</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 font-sans font-medium text-neutral-200">Success Rate</td>
                          <td className="py-2.5 px-4 text-neutral-400">99.66%</td>
                          <td className="py-2.5 px-4 text-rose-400">95.28%</td>
                          <td className="py-2.5 px-4 text-emerald-400 font-bold">100.00%</td>
                          <td className="py-2.5 px-4 text-emerald-400">0 Failures</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 font-sans font-medium text-neutral-200">Avg Latency</td>
                          <td className="py-2.5 px-4 text-neutral-400">—</td>
                          <td className="py-2.5 px-4 text-rose-400">1.60 s</td>
                          <td className="py-2.5 px-4 text-purple-400 font-bold">3.97 ms</td>
                          <td className="py-2.5 px-4 text-emerald-400">400x Speedup</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 font-sans font-medium text-neutral-200">P95 Latency</td>
                          <td className="py-2.5 px-4 text-neutral-400">16.51 s</td>
                          <td className="py-2.5 px-4 text-neutral-400">62.65 ms</td>
                          <td className="py-2.5 px-4 text-amber-400 font-bold">6.98 ms</td>
                          <td className="py-2.5 px-4 text-emerald-400">9x Reduction</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 font-sans font-medium text-neutral-200">P99 Latency</td>
                          <td className="py-2.5 px-4 text-neutral-400">30.73 s</td>
                          <td className="py-2.5 px-4 text-rose-400">60.00 s (timeout)</td>
                          <td className="py-2.5 px-4 text-amber-400 font-bold">17.12 ms</td>
                          <td className="py-2.5 px-4 text-emerald-400">1700x Reduction</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-4 font-sans font-medium text-neutral-200">Completed Exams</td>
                          <td className="py-2.5 px-4 text-neutral-400">55,341</td>
                          <td className="py-2.5 px-4 text-neutral-400">58,002</td>
                          <td className="py-2.5 px-4 text-cyan-400 font-bold">101,022</td>
                          <td className="py-2.5 px-4 text-emerald-400">+74% Completed</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Infrastructure */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
                    <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                      <Server className="w-4 h-4 text-cyan-400" /> Server Infrastructure Profile
                    </h4>
                    <ul className="space-y-1.5 text-xs text-neutral-400 font-mono">
                      <li>• <span className="text-neutral-200">Host:</span> Windows Server (12 vCPU cores, 32 GB RAM)</li>
                      <li>• <span className="text-neutral-200">Cluster:</span> Node.js PM2 Cluster (8 isolated workers)</li>
                      <li>• <span className="text-neutral-200">Session & Cache:</span> Redis Store (Multi-Worker Sync)</li>
                      <li>• <span className="text-neutral-200">Database:</span> PostgreSQL 12 Connection Pool</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
                    <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                      <HardDrive className="w-4 h-4 text-emerald-400" /> Resource Saturation at Peak
                    </h4>
                    <ul className="space-y-1.5 text-xs text-neutral-400 font-mono">
                      <li>• <span className="text-neutral-200">CPU Usage:</span> 22% average (35% peak across 12 cores)</li>
                      <li>• <span className="text-neutral-200">RAM Utilized:</span> 16.9 GB / 32.6 GB (53% total capacity)</li>
                      <li>• <span className="text-neutral-200">Throughput:</span> 118.7 requests / second sustained</li>
                      <li>• <span className="text-neutral-200">Validation Checks:</span> 88,320 checks passed with 100.00%</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* SKILLNOX TAB 2: 3-TIER CACHING */}
            {isSkillnox && activeTab === "caching" && (
              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-200 text-xs leading-relaxed">
                  <strong>3-Tier Caching & Anti-Thundering Herd:</strong> Implemented inside Skillnox to eliminate database connection starvation and cache eviction storms when 5,000 students join exams and poll leaderboards simultaneously.
                </div>

                {/* 3-Tier Flow */}
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-cyan-400 font-bold flex items-center gap-2">
                        <Zap className="w-4 h-4" /> L1: In-Process LRU Memory Cache
                      </span>
                      <span className="text-[11px] bg-cyan-500/10 px-2 py-0.5 rounded text-cyan-300">allowStale: true (5m TTL)</span>
                    </div>
                    <p className="text-neutral-400 font-sans text-xs">
                      Embedded in each Node.js PM2 process. When a cached leaderboard or question set expires, stale content is immediately returned to waiting users while a background worker refreshes the cache. <strong>Eliminates cache stampedes.</strong>
                    </p>
                  </div>

                  <div className="flex justify-center text-neutral-600">
                    <ArrowRight className="w-4 h-4 rotate-90" />
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-purple-400 font-bold flex items-center gap-2">
                        <Database className="w-4 h-4" /> L2: Shared Redis Store + Pub/Sub Sync
                      </span>
                      <span className="text-[11px] bg-purple-500/10 px-2 py-0.5 rounded text-purple-300">noeviction (256MB)</span>
                    </div>
                    <p className="text-neutral-400 font-sans text-xs">
                      Houses active session states and real-time contest submissions. On writes, workers broadcast an invalidation event over the <code className="text-cyan-300">skillnox:cache:invalidate</code> Redis channel so all 8 PM2 workers clear their local L1 caches simultaneously.
                    </p>
                  </div>

                  <div className="flex justify-center text-neutral-600">
                    <ArrowRight className="w-4 h-4 rotate-90" />
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-emerald-400 font-bold flex items-center gap-2">
                        <Layers className="w-4 h-4" /> L3: PostgreSQL 12 with Singleflight
                      </span>
                      <span className="text-[11px] bg-emerald-500/10 px-2 py-0.5 rounded text-emerald-300">Promise Coalescing</span>
                    </div>
                    <p className="text-neutral-400 font-sans text-xs">
                      If 50 students request the same contest leaderboard at the same millisecond, the singleflight wrapper coalesces them into <strong>1 single SQL query</strong>. All 49 other requests await the single promise, reducing DB load by over 80%.
                    </p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
                    <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-cyan-400" /> Compiler Throttling (AsyncSemaphore)
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                      Restricts concurrent compiler processes (<code className="text-cyan-300">g++</code>, <code className="text-cyan-300">javac</code>, <code className="text-cyan-300">node</code>) via <code className="text-neutral-200 font-mono">MAX_CONCURRENT_EXECUTIONS = 100</code>, protecting the Node.js event loop from starvation.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
                    <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" /> Anti-Cheating & Integrity Guard
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                      Monitors <code className="text-neutral-200 font-mono">visibilitychange</code>, <code className="text-neutral-200 font-mono">window.blur</code>, and <code className="text-neutral-200 font-mono">pagehide</code> with cooldown filters to eliminate false positives; blocks DevTools shortcuts and enforces fullscreen.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* SKILLNOX.AI TAB 1: DUAL INFERENCE ENGINE */}
            {isSkillnoxAI && activeTab === "primary" && (
              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-200 text-xs leading-relaxed">
                  <strong>Privacy-First Local AI + NVIDIA NIM Cloud:</strong> Designed to evaluate candidate responses in real time without leaking private campus exam data or crashing on third-party rate limits.
                </div>

                {/* Dual Inference Pipeline Diagram */}
                <div className="grid sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
                    <div className="flex items-center gap-2 text-cyan-400 font-bold mb-2">
                      <Cpu className="w-4 h-4" /> Primary Cloud Tier: NVIDIA NIM
                    </div>
                    <ul className="space-y-2 text-neutral-400 font-sans text-xs leading-relaxed">
                      <li>• Model: <code className="text-cyan-300 font-mono">meta/llama-3.1-8b-instruct</code></li>
                      <li>• Multi-key pool rotation for high-density assessment concurrency</li>
                      <li>• Automatic 429 rate-limit backoff handling</li>
                      <li>• Multi-socket async concurrency via Python FastAPI</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
                    <div className="flex items-center gap-2 text-purple-400 font-bold mb-2">
                      <Brain className="w-4 h-4" /> Fallback Tier: Local Ollama LLM
                    </div>
                    <ul className="space-y-2 text-neutral-400 font-sans text-xs leading-relaxed">
                      <li>• Model: Local <code className="text-purple-300 font-mono">qwen3.5:9b</code> / <code className="text-purple-300 font-mono">qwen 2.5 3b</code></li>
                      <li>• Zero-Data-Leakage on-premise execution</li>
                      <li>• Triggered automatically if cloud keys are omitted or unreachable</li>
                      <li>• Zero third-party API dependencies required</li>
                    </ul>
                  </div>
                </div>

                {/* Security & Recruiter Privacy */}
                <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
                  <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-emerald-400" /> Candidate Privacy & Data Masking
                  </h4>
                  <p className="text-xs text-neutral-400 leading-relaxed font-sans mb-3">
                    Public portfolio links automatically mask the candidate's last name (initials only), roll number, and email address, and exclude raw voice/video recordings. All candidate inputs are strictly validated through Zod schemas before Drizzle ORM persistence across 13 PostgreSQL tables.
                  </p>
                  <div className="flex flex-wrap gap-2 text-[11px] font-mono text-neutral-400">
                    <span className="bg-neutral-800 px-2 py-1 rounded">JWT HttpOnly Auth</span>
                    <span className="bg-neutral-800 px-2 py-1 rounded">PostgreSQL 15</span>
                    <span className="bg-neutral-800 px-2 py-1 rounded">Drizzle ORM</span>
                    <span className="bg-neutral-800 px-2 py-1 rounded">Zod Schemas</span>
                  </div>
                </div>
              </div>
            )}

            {/* SKILLNOX.AI TAB 2: EVALUATION QUEUE & MULTI-ROUND */}
            {isSkillnoxAI && activeTab === "queue" && (
              <div className="space-y-6">
                {/* Multi-Round Flow */}
                <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
                  <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <GitBranch className="w-4 h-4 text-purple-400" /> Adaptive 3-Stage Interview Workflow
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800">
                      <span className="text-cyan-400 font-bold block mb-1">Round 1: Aptitude</span>
                      <p className="text-neutral-400 text-[11px]">5 questions, threshold 40%. Evaluates quantitative and logical reasoning.</p>
                    </div>
                    <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800">
                      <span className="text-purple-400 font-bold block mb-1">Round 2: Technical</span>
                      <p className="text-neutral-400 text-[11px]">5 deep-dive questions, threshold 50%. Evaluates architecture, algorithms, and code logic.</p>
                    </div>
                    <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800">
                      <span className="text-emerald-400 font-bold block mb-1">Round 3: HR / Culture</span>
                      <p className="text-neutral-400 text-[11px]">3 behavioral questions. Generates comprehensive feedback rubric & PDF breakdown.</p>
                    </div>
                  </div>
                </div>

                {/* EvaluationQueue Architecture */}
                <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
                  <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-amber-400" /> EvaluationQueue Engine & Load Shedding
                  </h4>
                  <p className="text-xs text-neutral-400 leading-relaxed font-sans mb-3">
                    The evaluation queue decouples answer submission from AI scoring to prevent HTTP timeouts during LLM token generation:
                  </p>
                  <ul className="space-y-2 text-xs text-neutral-400 font-mono">
                    <li>• <span className="text-neutral-200">Concurrency Limiter:</span> Max 2 concurrent active evaluations at a time</li>
                    <li>• <span className="text-neutral-200">Exponential Backoff:</span> Up to 3 retries (5s × attempt delay) on network failures</li>
                    <li>• <span className="text-neutral-200">Load Shedding:</span> If queue exceeds 100 pending answers, heuristic fallback scoring takes over automatically</li>
                    <li>• <span className="text-neutral-200">23 Company Rubrics:</span> Custom interviewer personas for Google, Amazon, Microsoft, TCS, Infosys, Zoho</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div 
            className="px-6 py-4 bg-neutral-900/80 border-t border-neutral-800 shrink-0 flex items-center justify-between text-xs text-neutral-400"
            onWheel={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <span className="font-mono">
              {isSkillnox ? "Tested with 5,000 VUs • 100.00% Success Rate" : "Skillnox.AI • Local Qwen & NVIDIA NIM Inference"}
            </span>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
            >
              Close Breakdown
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
