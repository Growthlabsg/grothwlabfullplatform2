"use client"

import type { ReactNode } from "react"
import { CommunicationProvider } from "@/contexts/communication-context"

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <CommunicationProvider>
      <div className="flex h-screen w-full overflow-hidden bg-background">{children}</div>
    </CommunicationProvider>
  )
}
