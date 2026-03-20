"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Lock } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface RequestAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle: string;
}

export function RequestAccessModal({ isOpen, onClose, projectTitle }: RequestAccessModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form handling using Formspree structure
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    data.project = projectTitle; // Inject project name

    try {
      const response = await fetch("https://formspree.io/f/xyzkpvqq", { // Replace with actual Formspree endpoint if provided
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          onClose();
        }, 3000);
      } else {
        console.error("Form submission failed");
      }
    } catch (error) {
      console.error("Error submitting form", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-6 sm:p-8 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-cyan-500/10 blur-3xl pointer-events-none rounded-full" />

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight text-white mb-1 flex items-center gap-2">
                    Request Access <Lock className="w-5 h-5 text-cyan-400" />
                  </h3>
                  <p className="text-sm text-gray-400">
                    Request private access to <span className="text-cyan-400 font-medium">{projectTitle}</span>.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
                  className="flex flex-col items-center justify-center py-8 text-center"
                >
                  <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mb-4">
                    <Send className="w-8 h-8 text-emerald-500" />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-2">Request Sent!</h4>
                  <p className="text-gray-400 text-sm">
                    Thank you. I'll review your request and get back to you shortly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label htmlFor="name" className="text-sm font-medium text-gray-300">Name <span className="text-red-400">*</span></label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Jane Doe"
                      className="w-full px-4 py-2.5 bg-neutral-800/50 border border-neutral-700 focus:border-cyan-500/50 rounded-xl outline-none text-white placeholder-gray-500 transition-all focus:ring-1 focus:ring-cyan-500/50 text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="email" className="text-sm font-medium text-gray-300">Email Address <span className="text-red-400">*</span></label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="jane@company.com"
                      className="w-full px-4 py-2.5 bg-neutral-800/50 border border-neutral-700 focus:border-cyan-500/50 rounded-xl outline-none text-white placeholder-gray-500 transition-all focus:ring-1 focus:ring-cyan-500/50 text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="message" className="text-sm font-medium text-gray-300">Message <span className="text-gray-500 text-xs font-normal">(Optional)</span></label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      placeholder="I'm a recruiter at..."
                      className="w-full px-4 py-2.5 bg-neutral-800/50 border border-neutral-700 focus:border-cyan-500/50 rounded-xl outline-none text-white placeholder-gray-500 transition-all focus:ring-1 focus:ring-cyan-500/50 resize-none text-sm"
                    />
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-cyan-600 hover:bg-cyan-500 text-white border-none py-6 rounded-xl text-base tracking-wide transition-all shadow-[0_0_20px_rgba(8,145,178,0.2)] hover:shadow-[0_0_25px_rgba(8,145,178,0.4)] relative overflow-hidden group"
                    >
                      {/* Shine effect */}
                      <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent z-10" />
                      
                      <span className="flex items-center gap-2 relative z-20">
                        {isSubmitting ? (
                          <>Sending...</>
                        ) : (
                          <>Send Request <Send className="w-4 h-4 ml-1" /></>
                        )}
                      </span>
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
