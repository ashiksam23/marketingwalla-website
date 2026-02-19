"use client"

import { useRef, type ElementType } from "react"
import { gsap } from "gsap"
import { SplitText } from "gsap/SplitText"
import { useGSAP } from "@gsap/react"

interface TextRevealProps {
  children: string
  as?: ElementType
  splitType?: "chars" | "words" | "lines"
  className?: string
  stagger?: number
  delay?: number
  scrub?: boolean
}

export function TextReveal({
  children,
  as: Tag = "p",
  splitType = "lines",
  className,
  stagger = 0.1,
  delay = 0,
  scrub = false,
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (!ref.current) return
      const split = new SplitText(ref.current, { type: splitType })
      const elements =
        splitType === "chars"
          ? split.chars
          : splitType === "words"
            ? split.words
            : split.lines

      gsap.from(elements, {
        y: splitType === "chars" ? 80 : 40,
        opacity: 0,
        rotateX: splitType === "chars" ? -90 : 0,
        stagger,
        delay,
        duration: 0.8,
        ease: "expo.out",
        scrollTrigger: scrub
          ? {
              trigger: ref.current,
              start: "top 80%",
              end: "top 30%",
              scrub: 1,
            }
          : {
              trigger: ref.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
      })
    },
    { scope: ref }
  )

  return (
    // @ts-expect-error dynamic tag element
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
