"use client"

import { useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"

export function MarqueeText({
  text,
  speed = 20,
}: {
  text: string
  speed?: number
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!containerRef.current) return
      const inner = containerRef.current.querySelector(".marquee-inner")
      if (!inner) return

      gsap.to(inner, {
        xPercent: -50,
        repeat: -1,
        duration: speed,
        ease: "none",
      })
    },
    { scope: containerRef }
  )

  return (
    <div ref={containerRef} className="overflow-hidden whitespace-nowrap py-8">
      <div className="marquee-inner inline-block">
        <span
          className="text-6xl uppercase tracking-wider text-white/[0.05] md:text-8xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {text}&nbsp;&nbsp;{text}&nbsp;&nbsp;
        </span>
      </div>
    </div>
  )
}
