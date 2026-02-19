import type { Metadata } from "next"
import { displayFont, bodyFont, monoFont } from "@/lib/fonts"
import { GSAPProvider } from "@/providers/GSAPProvider"
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider"
import { Navbar } from "@/components/layout/Navbar"
import { Preloader } from "@/components/layout/Preloader"
import { CustomCursor } from "@/components/ui/CustomCursor"
import "./globals.css"

export const metadata: Metadata = {
  title: "MarketingWalla | Where Brands Come Alive",
  description:
    "Award-winning marketing agency crafting unforgettable brand experiences through strategy, creativity, and data-driven performance.",
  metadataBase: new URL("https://marketingwalla.com"),
  openGraph: {
    title: "MarketingWalla | Where Brands Come Alive",
    description:
      "Award-winning marketing agency crafting unforgettable brand experiences.",
    url: "https://marketingwalla.com",
    siteName: "MarketingWalla",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}
    >
      <body
        className="bg-[var(--background)] text-[var(--foreground)] antialiased"
        style={{ fontFamily: "var(--font-body)" }}
      >
        <GSAPProvider>
          <SmoothScrollProvider>
            <Preloader />
            <CustomCursor />
            <Navbar />
            <main>{children}</main>
          </SmoothScrollProvider>
        </GSAPProvider>
      </body>
    </html>
  )
}
