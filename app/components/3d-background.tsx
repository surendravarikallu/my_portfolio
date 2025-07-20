"use client"

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function Background3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Particle system
    class Particle {
      x: number
      y: number
      z: number
      vx: number
      vy: number
      vz: number
      size: number
      color: string
      life: number

      constructor() {
        this.x = Math.random() * canvas!.width
        this.y = Math.random() * canvas!.height
        this.z = Math.random() * 1000
        this.vx = (Math.random() - 0.5) * 2
        this.vy = (Math.random() - 0.5) * 2
        this.vz = Math.random() * 2 + 1
        this.size = Math.random() * 3 + 1
        this.color = `hsl(${180 + Math.random() * 60}, 70%, 60%)`
        this.life = 1
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        this.z -= this.vz
        this.life -= 0.005

        if (this.z <= 0 || this.life <= 0) {
          this.x = Math.random() * canvas!.width
          this.y = Math.random() * canvas!.height
          this.z = 1000
          this.life = 1
        }
      }

      draw() {
        const scale = 1000 / (1000 + this.z)
        const x2d = this.x * scale + canvas!.width / 2 * (1 - scale)
        const y2d = this.y * scale + canvas!.height / 2 * (1 - scale)
        const size2d = this.size * scale

        ctx!.save()
        ctx!.globalAlpha = this.life * scale
        ctx!.fillStyle = this.color
        ctx!.beginPath()
        ctx!.arc(x2d, y2d, size2d, 0, Math.PI * 2)
        ctx!.fill()
        ctx!.restore()
      }
    }

    // Create particles
    const particles: Particle[] = []
    for (let i = 0; i < 100; i++) {
      particles.push(new Particle())
    }

    // Animation loop
    let animationId: number
    const animate = () => {
      ctx!.fillStyle = 'rgba(17, 24, 39, 0.1)'
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height)

      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })

      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 animate-gradient-shift" />
      
      {/* 3D geometric shapes */}
      <div className="absolute inset-0">
        {/* Floating cubes */}
        <motion.div
          className="absolute top-20 left-20 w-20 h-20 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-20"
          style={{
            transform: 'rotateX(45deg) rotateY(45deg)',
            transformStyle: 'preserve-3d'
          }}
          animate={{
            rotateX: [45, 135, 45],
            rotateY: [45, 135, 45],
            y: [-20, 20, -20]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute top-40 right-32 w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 opacity-20"
          style={{
            transform: 'rotateX(30deg) rotateY(60deg)',
            transformStyle: 'preserve-3d'
          }}
          animate={{
            rotateX: [30, 120, 30],
            rotateY: [60, 150, 60],
            x: [20, -20, 20]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div
          className="absolute bottom-32 left-1/3 w-24 h-24 bg-gradient-to-r from-green-400 to-cyan-500 opacity-20"
          style={{
            transform: 'rotateX(60deg) rotateY(30deg)',
            transformStyle: 'preserve-3d'
          }}
          animate={{
            rotateX: [60, 150, 60],
            rotateY: [30, 120, 30],
            y: [20, -20, 20]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Floating rings */}
        <motion.div
          className="absolute top-1/2 right-20 w-32 h-32 border-4 border-cyan-400 rounded-full opacity-30"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <motion.div
          className="absolute bottom-20 right-1/4 w-20 h-20 border-2 border-purple-400 rounded-full opacity-25"
          animate={{
            rotate: [360, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/20 to-gray-900/40" />
    </div>
  )
}
