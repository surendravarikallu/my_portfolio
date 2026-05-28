"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export const TextReveal: React.FC<TextRevealProps> = ({ text, className = "", delay = 0 }) => {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const words = text.split(" ");

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const element = containerRef.current;
    const targets = element.querySelectorAll(".word-item");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        {
          y: "80%",
          opacity: 0,
        },
        {
          y: "0%",
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          delay: delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, element);

    return () => ctx.revert();
  }, [delay, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return <h2 className={className}>{text}</h2>;
  }

  const justifyClass = className.includes("justify-") ? "" : "justify-center";

  return (
    <h2 ref={containerRef} className={`${className} overflow-hidden flex flex-wrap ${justifyClass} py-1`}>
      {words.map((word, index) => {
        const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
        const isCyan = ["Me"].includes(cleanWord);
        return (
          <span 
            key={index} 
            className={`word-item inline-block mr-[0.25em] last:mr-0 origin-bottom ${isCyan ? "text-cyan-400" : ""}`}
          >
            {word}
          </span>
        );
      })}
    </h2>
  );
};
