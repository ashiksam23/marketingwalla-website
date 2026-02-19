"use client"

import { useRef } from "react"
import { gsap } from "gsap"
import { SplitText } from "gsap/SplitText"
import { useGSAP } from "@gsap/react"
import { PROJECTS } from "@/lib/constants"
import { TextReveal } from "@/components/ui/TextReveal"

function WorkCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[number]
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  const isEven = index % 2 === 0

  useGSAP(
    () => {
      if (!cardRef.current || !imageRef.current || !titleRef.current) return

      const split = new SplitText(titleRef.current, { type: "chars" })

      // Image clipPath reveal
      gsap.fromTo(
        imageRef.current,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            end: "top 30%",
            scrub: 1,
          },
        }
      )

      // Title reveal
      gsap.from(split.chars, {
        y: 60,
        opacity: 0,
        stagger: 0.02,
        duration: 0.8,
        ease: "expo.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      })

      // Parallax on image
      gsap.to(imageRef.current, {
        y: -80,
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })
    },
    { scope: cardRef }
  )

  return (
    <div
      ref={cardRef}
      className={`section-padding relative grid min-h-[70vh] grid-cols-1 items-center gap-8 py-20 lg:grid-cols-2 lg:gap-16 ${
        isEven ? "" : "lg:[grid-auto-flow:dense]"
      }`}
    >
      {/* Image */}
      <div
        ref={imageRef}
        className={`relative aspect-[4/3] overflow-hidden rounded-2xl bg-[var(--surface)] ${
          isEven ? "" : "lg:col-start-2"
        }`}
      >
        {/* Placeholder gradient since we don't have actual images yet */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${project.color}33 0%, ${project.color}11 100%)`,
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-6xl font-bold opacity-10"
            style={{ fontFamily: "var(--font-display)", color: project.color }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        {/* Colored glow */}
        <div
          className="absolute -inset-20 opacity-20 blur-3xl"
          style={{ backgroundColor: project.color }}
        />
      </div>

      {/* Content */}
      <div className={isEven ? "" : "lg:col-start-1 lg:row-start-1"}>
        <span
          className="text-xs uppercase tracking-widest text-[var(--muted)]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {project.category}
        </span>
        <h3
          ref={titleRef}
          className="text-display-lg mb-4 mt-3"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {project.title}
        </h3>
        <p className="max-w-md text-[var(--muted)]">{project.description}</p>
        <div className="mt-8 flex items-baseline gap-3">
          <span
            className="text-4xl"
            style={{
              fontFamily: "var(--font-display)",
              color: project.color,
            }}
          >
            {project.stats.metric}
          </span>
          <span className="text-sm text-[var(--muted)]">
            {project.stats.label}
          </span>
        </div>
      </div>
    </div>
  )
}

export function WorkSection() {
  return (
    <section id="work" className="relative py-32">
      <div className="section-padding mb-16">
        <TextReveal
          as="h2"
          splitType="words"
          className="text-display-lg"
          stagger={0.08}
        >
          Selected Work
        </TextReveal>
      </div>

      {PROJECTS.map((project, index) => (
        <WorkCard key={project.id} project={project} index={index} />
      ))}
    </section>
  )
}
