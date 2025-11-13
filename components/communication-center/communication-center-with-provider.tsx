"use client"

import { CommunicationCenterUI } from "./communication-center-ui"
import { CommunicationProvider } from "@/contexts/communication-context"

export default function CommunicationCenterWithProvider() {
  return (
    <CommunicationProvider>
      <CommunicationCenterUI />
    </CommunicationProvider>
  )
}
