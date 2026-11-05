"use client";

import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export const TextReveal: React.FC<TextRevealProps> = ({ text, className = "", delay = 0 }) => {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const words = text.split(" ");

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { rootMargin: "0px 0px -20px 0px", threshold: 0.05 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

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
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translate3d(0, 0, 0)" : "translate3d(0, 60%, 0)",
              transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay + index * 0.05}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay + index * 0.05}s`,
            }}
          >
            {word}
          </span>
        );
      })}
    </h2>
  );
};
