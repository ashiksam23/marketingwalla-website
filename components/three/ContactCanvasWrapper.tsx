"use client"

import dynamic from "next/dynamic"
import { ContactGlobe } from "./ContactGlobe"

const ThreeProvider = dynamic(
  () => import("@/providers/ThreeProvider").then((mod) => mod.ThreeProvider),
  { ssr: false }
)

export default function ContactCanvasWrapper() {
  return (
    <ThreeProvider camera={{ position: [0, 0, 6], fov: 45 }}>
      <ambientLight intensity={0.3} />
      <ContactGlobe />
    </ThreeProvider>
  )
}
