export const ANIMATION = {
  DURATION: {
    FAST: 0.3,
    NORMAL: 0.6,
    SLOW: 1.0,
    VERY_SLOW: 1.5,
  },
  EASE: {
    OUT_EXPO: "expo.out",
    OUT_QUART: "quart.out",
    IN_OUT_CUBIC: "cubic.inOut",
    SMOOTH: "power2.out",
  },
  STAGGER: {
    FAST: 0.05,
    NORMAL: 0.1,
    SLOW: 0.15,
  },
} as const

export const COLORS = {
  BACKGROUND: "#0a0a0f",
  SURFACE: "#12121a",
  SURFACE_LIGHT: "#1a1a2e",
  FOREGROUND: "#f0f0f0",
  MUTED: "#888899",
  ACCENT: "#6c5ce7",
  ACCENT_WARM: "#fd7014",
  ACCENT_CYAN: "#00d4aa",
} as const

export const SERVICES = [
  {
    id: "strategy",
    title: "Brand Strategy",
    description:
      "We craft brand narratives that resonate and differentiate in saturated markets.",
    color: "#6c5ce7",
  },
  {
    id: "digital",
    title: "Digital Marketing",
    description:
      "Data-driven campaigns across search, social, and programmatic channels.",
    color: "#fd7014",
  },
  {
    id: "creative",
    title: "Creative Direction",
    description:
      "Visual identities and campaign creative that command attention.",
    color: "#00d4aa",
  },
  {
    id: "content",
    title: "Content Production",
    description:
      "From video to editorial, content that tells stories worth sharing.",
    color: "#e84393",
  },
  {
    id: "analytics",
    title: "Analytics & Insights",
    description:
      "Turning data into actionable intelligence that drives growth.",
    color: "#0984e3",
  },
  {
    id: "social",
    title: "Social Media",
    description:
      "Community building and engagement strategies that create brand advocates.",
    color: "#fdcb6e",
  },
] as const

export const PROJECTS = [
  {
    id: "project-1",
    title: "Lumina Rebrand",
    category: "Brand Strategy",
    description:
      "Complete brand overhaul for a fintech unicorn, resulting in 340% brand awareness lift.",
    image: "/images/projects/lumina.webp",
    stats: { metric: "340%", label: "Brand Awareness" },
    color: "#6c5ce7",
  },
  {
    id: "project-2",
    title: "NovaPulse Launch",
    category: "Digital Campaign",
    description:
      "Multi-channel launch campaign generating 2M impressions in the first week.",
    image: "/images/projects/novapulse.webp",
    stats: { metric: "2M+", label: "Impressions" },
    color: "#fd7014",
  },
  {
    id: "project-3",
    title: "Verdant Growth",
    category: "Content & Social",
    description:
      "Sustainable fashion brand storytelling that tripled engagement rates.",
    image: "/images/projects/verdant.webp",
    stats: { metric: "3x", label: "Engagement" },
    color: "#00d4aa",
  },
  {
    id: "project-4",
    title: "Cipher Analytics",
    category: "Performance Marketing",
    description:
      "B2B SaaS demand generation achieving 85% reduction in CAC.",
    image: "/images/projects/cipher.webp",
    stats: { metric: "-85%", label: "CAC Reduction" },
    color: "#0984e3",
  },
] as const

export const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "MarketingWalla transformed our brand from invisible to unforgettable. The results speak for themselves.",
    author: "Sarah Chen",
    role: "CMO, Lumina Finance",
  },
  {
    id: 2,
    quote:
      "Their strategic approach to our launch exceeded every KPI we set. Not just a vendor — a true partner.",
    author: "James Adeyemi",
    role: "Founder, NovaPulse",
  },
  {
    id: 3,
    quote:
      "The creative team at MarketingWalla thinks in dimensions others don't even see. Absolutely world-class.",
    author: "Priya Sharma",
    role: "Head of Marketing, Verdant",
  },
] as const

export const STATS = [
  { value: 12, suffix: "+", label: "Years of Excellence" },
  { value: 200, suffix: "+", label: "Brands Transformed" },
  { value: 15, suffix: "", label: "Industry Awards" },
  { value: 50, suffix: "+", label: "Creative Minds" },
] as const

export const NAV_ITEMS = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const
