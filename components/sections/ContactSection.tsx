"use client"

import { useRef, useState } from "react"
import dynamic from "next/dynamic"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { MagneticButton } from "@/components/ui/MagneticButton"
import { TextReveal } from "@/components/ui/TextReveal"

const ContactCanvas = dynamic(
  () => import("@/components/three/ContactCanvasWrapper"),
  { ssr: false }
)

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  useGSAP(
    () => {
      if (!formRef.current) return

      const inputs = formRef.current.querySelectorAll(".form-field")
      gsap.from(inputs, {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "expo.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      })
    },
    { scope: sectionRef }
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic (Formspree, Resend, etc.)
    console.log("Form submitted:", formData)
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen py-32"
    >
      {/* 3D Globe Background */}
      <div className="absolute inset-0 opacity-30">
        <ContactCanvas />
      </div>

      <div className="section-padding relative z-10">
        {/* Heading */}
        <TextReveal
          as="h2"
          splitType="words"
          className="text-display-lg mx-auto mb-20 max-w-4xl text-center"
          stagger={0.06}
        >
          Let&apos;s create something extraordinary
        </TextReveal>

        {/* Contact Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mx-auto max-w-2xl space-y-8"
        >
          <div className="form-field">
            <label
              htmlFor="name"
              className="mb-2 block text-xs uppercase tracking-widest text-[var(--muted)]"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full border-b border-white/10 bg-transparent py-4 text-lg text-[var(--foreground)] outline-none transition-colors duration-300 placeholder:text-[var(--muted)]/50 focus:border-[var(--accent)]"
              placeholder="Your name"
              required
            />
          </div>

          <div className="form-field">
            <label
              htmlFor="email"
              className="mb-2 block text-xs uppercase tracking-widest text-[var(--muted)]"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full border-b border-white/10 bg-transparent py-4 text-lg text-[var(--foreground)] outline-none transition-colors duration-300 placeholder:text-[var(--muted)]/50 focus:border-[var(--accent)]"
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="form-field">
            <label
              htmlFor="message"
              className="mb-2 block text-xs uppercase tracking-widest text-[var(--muted)]"
            >
              Message
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              rows={4}
              className="w-full resize-none border-b border-white/10 bg-transparent py-4 text-lg text-[var(--foreground)] outline-none transition-colors duration-300 placeholder:text-[var(--muted)]/50 focus:border-[var(--accent)]"
              placeholder="Tell us about your project..."
              required
            />
          </div>

          <div className="form-field pt-4">
            <MagneticButton
              className="group relative rounded-full bg-[var(--accent)] px-12 py-4 text-lg font-medium text-white transition-colors duration-300 hover:bg-[var(--accent)]/80"
              onClick={() => {}}
            >
              Send Message
              <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </MagneticButton>
          </div>
        </form>

        {/* Footer */}
        <footer className="mt-32 border-t border-white/5 pt-12">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div>
              <span
                className="text-xl font-semibold tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Marketing
                <span className="text-[var(--accent)]">Walla</span>
              </span>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Where brands come alive.
              </p>
            </div>

            <div className="flex gap-8">
              {["Twitter", "LinkedIn", "Instagram", "Dribbble"].map(
                (social) => (
                  <a
                    key={social}
                    href="#"
                    className="text-sm text-[var(--muted)] transition-colors duration-300 hover:text-[var(--foreground)]"
                  >
                    {social}
                  </a>
                )
              )}
            </div>

            <p className="text-xs text-[var(--muted)]">
              &copy; {new Date().getFullYear()} MarketingWalla. All rights
              reserved.
            </p>
          </div>
        </footer>
      </div>
    </section>
  )
}
