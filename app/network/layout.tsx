import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Network - GrowthLab",
  description: "Connect with founders, investors, and mentors in the GrowthLab community",
}

export default function NetworkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
