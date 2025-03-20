"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface SinusoidalBoxesProps {
  count?: number
  className?: string
}

export default function SinusoidalBoxes({ count = 20, className = "" }: SinusoidalBoxesProps) {
  const [boxes, setBoxes] = useState<
    Array<{
      id: number
      x: number
      y: number
      size: number
      color: string
      delay: number
      duration: number
      amplitude: number
    }>
  >([])

  useEffect(() => {
    // Generate random boxes
    const newBoxes = Array.from({ length: count }).map((_, i) => {
      const size = Math.random() * 20 + 10 // 10-30px
      return {
        id: i,
        x: Math.random() * 100, // Initial x position (percentage)
        y: Math.random() * 100, // Initial y position (percentage)
        size,
        color: getRandomColor(),
        delay: Math.random() * 2, // Random delay for animation
        duration: Math.random() * 10 + 15, // 15-25s duration
        amplitude: Math.random() * 30 + 10, // 10-40px amplitude
      }
    })
    setBoxes(newBoxes)
  }, [count])

  const getRandomColor = () => {
    const colors = [
      "rgba(59, 130, 246, 0.3)", // blue-500
      "rgba(37, 99, 235, 0.3)", // blue-600
      "rgba(168, 85, 247, 0.3)", // purple-500
      "rgba(139, 92, 246, 0.3)", // violet-500
      "rgba(79, 70, 229, 0.3)", // indigo-600
    ]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {boxes.map((box) => (
        <motion.div
          key={box.id}
          className="absolute rounded-md"
          style={{
            width: box.size,
            height: box.size,
            backgroundColor: box.color,
            left: `${box.x}%`,
            top: `${box.y}%`,
          }}
          animate={{
            y: [box.y, box.y - box.amplitude, box.y, box.y + box.amplitude, box.y],
            x: [box.x, box.x + box.amplitude / 2, box.x + box.amplitude, box.x + box.amplitude / 2, box.x],
            rotate: [0, 45, 90, 135, 180, 225, 270, 315, 360],
          }}
          transition={{
            duration: box.duration,
            ease: "easeInOut",
            times: [0, 0.25, 0.5, 0.75, 1],
            repeat: Number.POSITIVE_INFINITY,
            delay: box.delay,
          }}
        />
      ))}
    </div>
  )
}

