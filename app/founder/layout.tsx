"use client"

import type React from "react"
import { FounderAuthProvider } from "@/contexts/founder-auth-context"

export default function FounderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <FounderAuthProvider>
      {children}
    </FounderAuthProvider>
  )
}
