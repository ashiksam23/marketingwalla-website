"use client"

import { useRef, useState } from "react"
import { gsap } from "gsap"
import { SplitText } from "gsap/SplitText"
import { useGSAP } from "@gsap/react"

export function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const [isComplete, setIsComplete] = useState(false)

  useGSAP(
    () => {
      if (!textRef.current || !containerRef.current || !counterRef.current)
        return

      const split = new SplitText(textRef.current, { type: "chars" })
      const tl = gsap.timeline({
        onComplete: () => setIsComplete(true),
      })

      // Counter from 0 to 100
      tl.to(
        counterRef.current,
        {
          innerText: 100,
          duration: 2,
          snap: { innerText: 1 },
          ease: "power1.inOut",
        },
        0
      )

      // Letters stagger in
      tl.from(
        split.chars,
        {
          y: 40,
          opacity: 0,
          rotateX: -90,
          stagger: 0.04,
          duration: 0.8,
          ease: "back.out(1.7)",
        },
        0.3
      )

      // Hold, then reveal
      tl.to(containerRef.current, {
        clipPath: "inset(0 0 100% 0)",
        duration: 1,
        ease: "expo.inOut",
        delay: 0.5,
      })
    },
    { scope: containerRef }
  )

  if (isComplete) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-[var(--background)]"
      style={{ clipPath: "inset(0 0 0% 0)" }}
    >
      <h1
        ref={textRef}
        className="text-display-xl text-[var(--foreground)]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        MarketingWalla
      </h1>
      <span
        ref={counterRef}
        className="absolute bottom-8 right-8 text-sm text-[var(--muted)]"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        0
      </span>
    </div>
  )
}
