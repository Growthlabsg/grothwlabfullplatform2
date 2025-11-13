"use client"

import dynamic from "next/dynamic"
import { ErrorBoundary } from "@/components/error-boundary"

// Dynamically import components with no SSR to prevent hydration issues
const CommunicationCenterWithProvider = dynamic(
  () => import("@/components/communication-center/communication-center-with-provider"),
  { ssr: false },
)

export default function CommunicationCenterPage() {
  return (
    <ErrorBoundary>
      <CommunicationCenterWithProvider />
    </ErrorBoundary>
  )
}
