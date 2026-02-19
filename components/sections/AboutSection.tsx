"use client"

import { TextReveal } from "@/components/ui/TextReveal"
import { AnimatedCounter } from "@/components/ui/AnimatedCounter"
import { STATS } from "@/lib/constants"

export function AboutSection() {
  return (
    <section id="about" className="relative py-32">
      <div className="section-padding">
        {/* Giant heading */}
        <TextReveal
          as="h2"
          splitType="chars"
          className="text-display-xl gradient-text mb-20"
          stagger={0.02}
        >
          About Us
        </TextReveal>

        {/* Two column layout */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Left: Philosophy */}
          <div>
            <TextReveal
              as="p"
              splitType="lines"
              className="text-xl leading-relaxed text-[var(--muted)] md:text-2xl"
              stagger={0.1}
            >
              We are a collective of strategists, creatives, and technologists
              united by a singular belief: marketing should be art backed by
              science. Every campaign we craft, every brand we build, every
              pixel we place is driven by data and elevated by imagination.
            </TextReveal>

            <TextReveal
              as="p"
              splitType="lines"
              className="mt-8 text-lg leading-relaxed text-[var(--muted)]"
              stagger={0.1}
            >
              Founded in 2014, MarketingWalla has grown from a small team with
              big ideas into an award-winning agency trusted by brands across
              the globe. We don&apos;t just follow trends — we set them.
            </TextReveal>
          </div>

          {/* Right: Stats */}
          <div className="grid grid-cols-2 gap-8 self-center">
            {STATS.map((stat) => (
              <AnimatedCounter
                key={stat.label}
                target={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
