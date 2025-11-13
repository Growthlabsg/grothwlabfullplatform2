"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import AcceleratorApplicationClient from "./AcceleratorApplicationClient"

export function ClientWrapper() {
  return (
    <ProtectedRoute requiredPermission="startup.funding">
      <AcceleratorApplicationClient />
    </ProtectedRoute>
  )
}
