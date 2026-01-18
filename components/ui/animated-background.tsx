"use client"

import { cn } from "@/lib/utils"
import { useEffect, useRef } from "react"

interface AnimatedBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
    numStars?: number
    starSpeed?: number
    starSize?: number
}

export const AnimatedBackground = ({
    className,
    children,
    numStars = 100,
    starSpeed = 0.5,
    starSize = 1.5,
    ...props
}: AnimatedBackgroundProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let animationFrameId: number

        const stars: { x: number; y: number; z: number; o: number }[] = []

        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            initStars()
        }

        const initStars = () => {
            stars.length = 0
            for (let i = 0; i < numStars; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    z: Math.random() * 0.5 + 0.5, // speed factor
                    o: Math.random(), // opacity
                })
            }
        }

        const drawStars = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            stars.forEach((star) => {
                ctx.beginPath()
                ctx.arc(star.x, star.y, starSize * star.z, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(255, 255, 255, ${star.o})`
                ctx.fill()

                // Move star
                star.y -= starSpeed * star.z

                // Reset if out of bounds
                if (star.y < 0) {
                    star.y = canvas.height
                    star.x = Math.random() * canvas.width
                }

                // Twinkle
                if (Math.random() > 0.99) {
                    star.o = Math.random()
                }
            })

            animationFrameId = requestAnimationFrame(drawStars)
        }

        window.addEventListener("resize", resizeCanvas)
        resizeCanvas()
        drawStars()

        return () => {
            window.removeEventListener("resize", resizeCanvas)
            cancelAnimationFrame(animationFrameId)
        }
    }, [numStars, starSpeed, starSize])

    return (
        <div className={cn("relative w-full h-full overflow-hidden bg-slate-950", className)} {...props}>
            <canvas
                ref={canvasRef}
                className="absolute inset-0 pointer-events-none"
            />
            <div className="relative z-10 w-full h-full">
                {children}
            </div>
        </div>
    )
}

export default AnimatedBackground
