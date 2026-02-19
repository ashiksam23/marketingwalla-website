"use client"

import { useRef } from "react"
import dynamic from "next/dynamic"
import { gsap } from "gsap"
import { SplitText } from "gsap/SplitText"
import { useGSAP } from "@gsap/react"

const SceneCanvas = dynamic(
  () => import("@/components/three/SceneCanvas"),
  { ssr: false }
)

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const tagRef = useRef<HTMLParagraphElement>(null)

  useGSAP(
    () => {
      if (!headingRef.current || !subRef.current || !tagRef.current) return

      const split = new SplitText(headingRef.current, {
        type: "chars, words",
      })

      const tl = gsap.timeline({ delay: 2.8 }) // After preloader

      tl.from(tagRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      })
        .from(
          split.chars,
          {
            y: 80,
            opacity: 0,
            rotateX: -90,
            stagger: 0.03,
            duration: 1,
            ease: "expo.out",
          },
          "-=0.3"
        )
        .from(
          subRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.5"
        )
    },
    { scope: sectionRef }
  )

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex h-screen items-center justify-center overflow-hidden"
    >
      {/* 3D Background */}
      <div className="absolute inset-0">
        <SceneCanvas />
      </div>

      {/* Content Overlay */}
      <div className="section-padding relative z-10 text-center">
        <p
          ref={tagRef}
          className="mb-4 text-sm uppercase tracking-[0.3em] text-[var(--muted)] md:text-base"
        >
          We make brands
        </p>
        <h1
          ref={headingRef}
          className="text-display-xl gradient-text"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Unforgettable
        </h1>
        <p
          ref={subRef}
          className="mx-auto mt-6 max-w-2xl text-lg text-[var(--muted)] md:text-xl"
        >
          Strategy. Creativity. Performance. We craft marketing that moves
          markets.
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="text-xs uppercase tracking-widest text-[var(--muted)]">
          Scroll
        </span>
        <div className="h-12 w-px animate-pulse bg-gradient-to-b from-[var(--accent)] to-transparent" />
      </div>
    </section>
  )
}
