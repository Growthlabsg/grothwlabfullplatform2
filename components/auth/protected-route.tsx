"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredPermission?: string
  redirectTo?: string
}

export function ProtectedRoute({ children, requiredPermission, redirectTo = "/login" }: ProtectedRouteProps) {
  const { user, isLoading, hasPermission } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isLoading) {
      // If user is not logged in, redirect to login
      if (!user) {
        router.push(`${redirectTo}?returnUrl=${encodeURIComponent(pathname)}`)
        return
      }

      // If user is logged in but profile is not completed, redirect to onboarding
      if (user && !user.profileCompleted && pathname !== "/onboarding") {
        router.push("/onboarding")
        return
      }

      // If permission is required but user doesn't have it, redirect to dashboard
      if (requiredPermission && !hasPermission(requiredPermission)) {
        router.push("/dashboard")
        return
      }
    }
  }, [user, isLoading, requiredPermission, router, pathname, redirectTo, hasPermission])

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#0F7377]" />
      </div>
    )
  }

  // If no user or missing permission, don't render children
  if (!user || (requiredPermission && !hasPermission(requiredPermission))) {
    return null
  }

  // Render children if authenticated and has permission
  return <>{children}</>
}
