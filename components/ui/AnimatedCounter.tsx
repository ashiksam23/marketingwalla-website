"use client"

import { useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"

interface AnimatedCounterProps {
  target: number
  suffix?: string
  prefix?: string
  label: string
  duration?: number
}

export function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  label,
  duration = 2,
}: AnimatedCounterProps) {
  const counterRef = useRef<HTMLSpanElement>(null)

  useGSAP(() => {
    if (!counterRef.current) return

    gsap.from(counterRef.current, {
      innerText: 0,
      duration,
      snap: { innerText: 1 },
      ease: "power1.out",
      scrollTrigger: {
        trigger: counterRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    })
  })

  return (
    <div className="text-center">
      <div
        className="text-4xl md:text-5xl"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {prefix}
        <span ref={counterRef}>{target}</span>
        {suffix}
      </div>
      <span className="mt-2 block text-sm text-[var(--muted)]">{label}</span>
    </div>
  )
}
