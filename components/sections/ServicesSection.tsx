"use client"

import { useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { SERVICES } from "@/lib/constants"
import { ServiceCard } from "@/components/ui/ServiceCard"
import { MarqueeText } from "@/components/ui/MarqueeText"
import { TextReveal } from "@/components/ui/TextReveal"

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!cardsRef.current) return

      const cards = cardsRef.current.querySelectorAll(".service-card")

      ScrollTrigger.batch(cards, {
        onEnter: (batch) =>
          gsap.from(batch, {
            y: 80,
            opacity: 0,
            scale: 0.95,
            stagger: 0.15,
            duration: 0.8,
            ease: "expo.out",
          }),
        start: "top 85%",
      })
    },
    { scope: sectionRef }
  )

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-32"
    >
      <div className="section-padding">
        <TextReveal
          as="h2"
          splitType="words"
          className="text-display-lg"
          stagger={0.08}
        >
          What We Do
        </TextReveal>
      </div>

      <MarqueeText text="STRATEGY — CREATIVE — DIGITAL — CONTENT — ANALYTICS — SOCIAL —" />

      <div
        ref={cardsRef}
        className="section-padding grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {SERVICES.map((service, index) => (
          <div key={service.id} className="service-card">
            <ServiceCard
              index={index}
              title={service.title}
              description={service.description}
              color={service.color}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
