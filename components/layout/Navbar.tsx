"use client"

import { useRef, useState, useCallback, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { NAV_ITEMS } from "@/lib/constants"

export function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: "#hero",
      start: "bottom 80px",
      onEnter: () => setIsScrolled(true),
      onLeaveBack: () => setIsScrolled(false),
    })
  })

  // Mobile menu animation
  useEffect(() => {
    if (!mobileMenuRef.current) return

    if (isMobileOpen) {
      const items = mobileMenuRef.current.querySelectorAll(".mobile-nav-item")
      gsap.set(mobileMenuRef.current, { display: "flex" })
      gsap.fromTo(
        mobileMenuRef.current,
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 0.6, ease: "expo.inOut" }
      )
      gsap.from(items, {
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: "expo.out",
        delay: 0.3,
      })
    } else {
      gsap.to(mobileMenuRef.current, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.4,
        ease: "expo.in",
        onComplete: () => {
          if (mobileMenuRef.current) {
            gsap.set(mobileMenuRef.current, { display: "none" })
          }
        },
      })
    }
  }, [isMobileOpen])

  const handleNavClick = useCallback(
    (href: string) => {
      // Get the Lenis instance from the DOM
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({ behavior: "smooth" })
      }
      setIsMobileOpen(false)
    },
    []
  )

  return (
    <nav
      ref={navRef}
      className={`fixed left-0 right-0 top-0 z-[100] transition-all duration-500 ${
        isScrolled
          ? "border-b border-white/5 bg-[var(--background)]/80 py-4 backdrop-blur-xl"
          : "bg-transparent py-6"
      }`}
    >
      <div className="mx-auto flex max-w-[1800px] items-center justify-between section-padding">
        {/* Logo */}
        <button
          onClick={() => handleNavClick("#hero")}
          className="text-xl font-semibold tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Marketing
          <span className="text-[var(--accent)]">Walla</span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className="text-sm text-[var(--muted)] transition-colors duration-300 hover:text-[var(--foreground)]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick("#contact")}
            className="rounded-full bg-[var(--accent)] px-6 py-2.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-[var(--accent)]/80"
          >
            Let&apos;s Talk
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label={isMobileOpen ? "Close menu" : "Open menu"}
        >
          <span
            className={`h-px w-6 bg-[var(--foreground)] transition-transform duration-300 ${
              isMobileOpen ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-[var(--foreground)] transition-all duration-300 ${
              isMobileOpen ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 top-0 z-[99] hidden flex-col items-center justify-center gap-8 bg-[var(--background)]"
        style={{ clipPath: "inset(0 0 100% 0)" }}
      >
        {NAV_ITEMS.map((item) => (
          <button
            key={item.href}
            onClick={() => handleNavClick(item.href)}
            className="mobile-nav-item text-display-md text-[var(--foreground)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {item.label}
          </button>
        ))}
        <button
          onClick={() => handleNavClick("#contact")}
          className="mobile-nav-item mt-4 rounded-full bg-[var(--accent)] px-8 py-3 text-lg font-medium text-white"
        >
          Let&apos;s Talk
        </button>
      </div>
    </nav>
  )
}
