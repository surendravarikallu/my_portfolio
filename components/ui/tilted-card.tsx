"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltedCardProps extends React.PropsWithChildren {
    className?: string;
    containerHeight?: string | number;
    containerWidth?: string | number;
    imageSrc?: string;
    altText?: string;
    captionText?: string;
    scaleOnHover?: number;
    rotateAmplitude?: number;
    showMobileWarning?: boolean;
    showTooltip?: boolean;
    displayOverlayContent?: boolean;
    overlayContent?: React.ReactNode;
}

export const TiltedCard = ({
    children,
    className = "",
    containerHeight = "100%",
    containerWidth = "100%",
    scaleOnHover = 1.05,
    rotateAmplitude = 12
}: TiltedCardProps) => {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 100, damping: 10 });
    const mouseYSpring = useSpring(y, { stiffness: 100, damping: 10 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [rotateAmplitude, -rotateAmplitude]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-rotateAmplitude, rotateAmplitude]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                width: containerWidth,
                height: containerHeight,
                transformStyle: "preserve-3d",
            }}
            className={`relative ${className}`}
        >
            <motion.div
                style={{
                    rotateY,
                    rotateX,
                    transformStyle: "preserve-3d",
                }}
                whileHover={{ scale: scaleOnHover }}
                className="w-full h-full relative"
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                {/* Content */}
                <div style={{ transform: "translateZ(20px)" }} className="w-full h-full">
                    {children}
                </div>

                {/* Glare Effect */}
                <motion.div
                    className="absolute inset-0 w-full h-full pointer-events-none z-50 rounded-xl mix-blend-overlay"
                    style={{
                        background: useTransform(
                            [mouseXSpring, mouseYSpring],
                            (values: any[]) => {
                                const [xVal, yVal] = values as [number, number];
                                return `radial-gradient(
                                circle at ${50 + xVal * 100}% ${50 + yVal * 100}%,
                                rgba(255, 255, 255, 0.3) 0%,
                                transparent 60%
                            )`
                            }
                        ),
                        opacity: useTransform(
                            [mouseXSpring, mouseYSpring],
                            (values: any[]) => {
                                const [xVal, yVal] = values as [number, number];
                                return Math.abs(xVal) + Math.abs(yVal);
                            }
                        )
                    }}
                />
            </motion.div>
        </motion.div>
    );
};

export default TiltedCard;
