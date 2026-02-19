"use client"

import { useRef } from "react"
import { gsap } from "gsap"

interface ServiceCardProps {
  index: number
  title: string
  description: string
  color: string
}

export function ServiceCard({
  index,
  title,
  description,
  color,
}: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    gsap.to(cardRef.current, {
      rotateY: x * 10,
      rotateX: -y * 10,
      duration: 0.4,
      ease: "power2.out",
    })
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: "expo.out",
    })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-2xl border border-white/5 bg-[var(--surface)] p-8 transition-colors duration-500 hover:border-white/10"
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
    >
      <div
        className="absolute bottom-6 left-0 top-6 w-1 rounded-full transition-all duration-500 group-hover:bottom-0 group-hover:top-0"
        style={{ backgroundColor: color }}
      />
      <span
        className="text-xs text-[var(--muted)]"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3
        className="text-display-sm mb-3 mt-2"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-[var(--muted)]">
        {description}
      </p>
    </div>
  )
}
