"use client"

import { useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { TESTIMONIALS } from "@/lib/constants"
import { TextReveal } from "@/components/ui/TextReveal"
import { useMediaQuery } from "@/hooks/useMediaQuery"

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery("(max-width: 768px)")

  useGSAP(
    () => {
      if (!sectionRef.current || !trackRef.current || isMobile) return

      const track = trackRef.current
      const totalWidth = track.scrollWidth - window.innerWidth

      gsap.to(track, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${totalWidth}`,
          invalidateOnRefresh: true,
        },
      })
    },
    { scope: sectionRef, dependencies: [isMobile] }
  )

  return (
    <section id="testimonials" ref={sectionRef} className="relative overflow-hidden">
      <div className="section-padding pt-32 pb-8">
        <TextReveal
          as="h2"
          splitType="words"
          className="text-display-lg mb-8"
          stagger={0.08}
        >
          What They Say
        </TextReveal>
      </div>

      {/* Desktop: Horizontal scroll */}
      {/* Mobile: Vertical stack */}
      <div
        ref={trackRef}
        className={`${
          isMobile
            ? "section-padding flex flex-col gap-8 pb-32"
            : "flex gap-8 px-12 py-20 will-change-transform"
        }`}
      >
        {TESTIMONIALS.map((testimonial) => (
          <div
            key={testimonial.id}
            className={`flex flex-col justify-between rounded-3xl border border-white/5 bg-[var(--surface)] p-12 md:p-16 ${
              isMobile ? "w-full" : "w-[80vw] max-w-[1000px] flex-shrink-0"
            }`}
          >
            {/* Large quotation mark */}
            <span
              className="text-[120px] leading-none text-[var(--accent)]/20"
              style={{ fontFamily: "var(--font-display)" }}
            >
              &ldquo;
            </span>
            <blockquote
              className="text-display-sm mt-4 md:text-display-md"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {testimonial.quote}
            </blockquote>
            <div className="mt-8 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-[var(--surface-light)]" />
              <div>
                <p className="text-sm font-medium">{testimonial.author}</p>
                <p className="text-xs text-[var(--muted)]">
                  {testimonial.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
