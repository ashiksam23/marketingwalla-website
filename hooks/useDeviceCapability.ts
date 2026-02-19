"use client"

import { useEffect, useState } from "react"

type Tier = "high" | "medium" | "low"

export function useDeviceCapability(): Tier {
  const [tier, setTier] = useState<Tier>("high")

  useEffect(() => {
    const cores = navigator.hardwareConcurrency || 4
    const memory = (navigator as unknown as { deviceMemory?: number })
      .deviceMemory || 4

    if (cores <= 2 || memory <= 2) {
      setTier("low")
    } else if (cores <= 4 || memory <= 4) {
      setTier("medium")
    } else {
      setTier("high")
    }
  }, [])

  return tier
}
