"use client"

import { useEffect, createContext, useContext, useState, type ReactNode } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { useGSAP } from "@gsap/react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)
}

const GSAPContext = createContext<{ isReady: boolean }>({ isReady: false })

export function GSAPProvider({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    gsap.defaults({
      ease: "power2.out",
      duration: 0.6,
    })
    setIsReady(true)
  }, [])

  return (
    <GSAPContext.Provider value={{ isReady }}>{children}</GSAPContext.Provider>
  )
}

export const useGSAPReady = () => useContext(GSAPContext)
