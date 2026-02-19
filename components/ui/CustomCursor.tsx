"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { useMediaQuery } from "@/hooks/useMediaQuery"

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery("(hover: none) and (pointer: coarse)")

  useEffect(() => {
    if (isMobile || !dotRef.current || !ringRef.current) return

    const dot = dotRef.current
    const ring = ringRef.current

    const xDot = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power2.out" })
    const yDot = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power2.out" })
    const xRing = gsap.quickTo(ring, "x", {
      duration: 0.5,
      ease: "power2.out",
    })
    const yRing = gsap.quickTo(ring, "y", {
      duration: 0.5,
      ease: "power2.out",
    })

    const onMouseMove = (e: MouseEvent) => {
      xDot(e.clientX)
      yDot(e.clientY)
      xRing(e.clientX)
      yRing(e.clientY)
    }

    const onMouseEnterInteractive = () => {
      gsap.to(ring, { scale: 2, opacity: 0.5, duration: 0.3 })
      gsap.to(dot, { scale: 0.5, duration: 0.3 })
    }

    const onMouseLeaveInteractive = () => {
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3 })
      gsap.to(dot, { scale: 1, duration: 0.3 })
    }

    window.addEventListener("mousemove", onMouseMove)

    // Use event delegation for interactive elements
    const handleEnter = (e: Event) => {
      const target = e.target as HTMLElement
      if (target.closest("a, button, [data-cursor='pointer']")) {
        onMouseEnterInteractive()
      }
    }
    const handleLeave = (e: Event) => {
      const target = e.target as HTMLElement
      if (target.closest("a, button, [data-cursor='pointer']")) {
        onMouseLeaveInteractive()
      }
    }

    document.addEventListener("mouseenter", handleEnter, true)
    document.addEventListener("mouseleave", handleLeave, true)

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseenter", handleEnter, true)
      document.removeEventListener("mouseleave", handleLeave, true)
    }
  }, [isMobile])

  if (isMobile) return null

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)] mix-blend-difference"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--foreground)]/50 mix-blend-difference"
      />
    </>
  )
}
