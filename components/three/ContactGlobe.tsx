"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Sphere } from "@react-three/drei"
import * as THREE from "three"

export function ContactGlobe() {
  const groupRef = useRef<THREE.Group>(null)
  const innerRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Outer wireframe sphere */}
      <Sphere args={[2, 32, 32]}>
        <meshBasicMaterial
          wireframe
          color="#6c5ce7"
          transparent
          opacity={0.08}
        />
      </Sphere>

      {/* Inner sphere with slightly different rotation */}
      <Sphere ref={innerRef} args={[1.95, 16, 16]}>
        <meshBasicMaterial
          wireframe
          color="#00d4aa"
          transparent
          opacity={0.04}
        />
      </Sphere>

      {/* Latitude rings */}
      {[-0.8, -0.4, 0, 0.4, 0.8].map((y, i) => {
        const radius = Math.sqrt(4 - y * y)
        return (
          <mesh key={i} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[radius - 0.005, radius + 0.005, 64]} />
            <meshBasicMaterial
              color="#6c5ce7"
              transparent
              opacity={0.15}
              side={THREE.DoubleSide}
            />
          </mesh>
        )
      })}
    </group>
  )
}
