"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { particleVertexShader, particleFragmentShader } from "./shaders"

const PARTICLE_COUNT = 5000

export function HeroParticles() {
  const meshRef = useRef<THREE.Points>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  const particles = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const randoms = new Float32Array(PARTICLE_COUNT)
    const sizes = new Float32Array(PARTICLE_COUNT)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Distribute on a sphere surface with some depth variation
      const phi = Math.acos(2 * Math.random() - 1)
      const theta = Math.random() * Math.PI * 2
      const r = 2 + Math.random() * 0.5

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)

      randoms[i] = Math.random()
      sizes[i] = Math.random() * 2 + 0.5
    }

    return { positions, randoms, sizes }
  }, [])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColor1: { value: new THREE.Color("#46399a") },
      uColor2: { value: new THREE.Color("#008f72") },
      uColor3: { value: new THREE.Color("#a84a0d") },
      uPixelRatio: {
        value: typeof window !== "undefined"
          ? Math.min(window.devicePixelRatio, 1.5)
          : 1,
      },
    }),
    []
  )

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
      materialRef.current.uniforms.uMouse.value.set(
        state.pointer.x,
        state.pointer.y
      )
    }
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute(
      "position",
      new THREE.BufferAttribute(particles.positions, 3)
    )
    geo.setAttribute(
      "aRandom",
      new THREE.BufferAttribute(particles.randoms, 1)
    )
    geo.setAttribute("aSize", new THREE.BufferAttribute(particles.sizes, 1))
    return geo
  }, [particles])

  return (
    <points ref={meshRef} geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
