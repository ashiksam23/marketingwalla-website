"use client"

import { Canvas } from "@react-three/fiber"
import { Preload } from "@react-three/drei"
import { Suspense, type ReactNode } from "react"

interface ThreeProviderProps {
  children: ReactNode
  className?: string
  camera?: { position: [number, number, number]; fov: number }
}

export function ThreeProvider({
  children,
  className,
  camera = { position: [0, 0, 5], fov: 45 },
}: ThreeProviderProps) {
  return (
    <Canvas
      className={className}
      camera={camera}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      style={{ position: "absolute", inset: 0 }}
    >
      <Suspense fallback={null}>
        {children}
        <Preload all />
      </Suspense>
    </Canvas>
  )
}
