"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  yOffset?: number;
  className?: string;
  blur?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  yOffset = 50,
  className = "",
  blur = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);
    
    const element = containerRef.current;
    
    const ctx = gsap.context(() => {
        gsap.fromTo(
            element,
            {
              y: yOffset,
              opacity: 0,
              filter: blur ? "blur(10px)" : "none",
            },
            {
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 1.2,
              delay: delay,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
    }, element);

    return () => ctx.revert();
  }, [delay, yOffset, blur, prefersReducedMotion]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};
