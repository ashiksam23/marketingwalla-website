"use client"

import dynamic from "next/dynamic"
import { HeroParticles } from "./HeroParticles"
import { PostProcessing } from "./PostProcessing"

const ThreeProvider = dynamic(
  () => import("@/providers/ThreeProvider").then((mod) => mod.ThreeProvider),
  { ssr: false }
)

export default function SceneCanvas() {
  return (
    <ThreeProvider camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <HeroParticles />
      <PostProcessing />
    </ThreeProvider>
  )
}
