"use client"

import type React from "react"
import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useFounderAuth } from "@/contexts/founder-auth-context"
import { Loader2, Crown, Shield } from "lucide-react"

interface FounderProtectedRouteProps {
  children: React.ReactNode
  redirectTo?: string
}

export function FounderProtectedRoute({ 
  children, 
  redirectTo = "/founder/login" 
}: FounderProtectedRouteProps) {
  const { founder, isLoading } = useFounderAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isLoading) {
      // If founder is not logged in, redirect to founder login
      if (!founder) {
        router.push(`${redirectTo}?returnUrl=${encodeURIComponent(pathname)}`)
        return
      }

      // If user is not a founder, redirect to founder login
      if (!founder.isFounder) {
        router.push(redirectTo)
        return
      }
    }
  }, [founder, isLoading, router, pathname, redirectTo])

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center">
            <div className="p-4 bg-yellow-400/20 rounded-full">
              <Crown className="h-12 w-12 text-yellow-400 animate-pulse" />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">Verifying Founder Access</h2>
            <p className="text-slate-300">Please wait while we authenticate your credentials...</p>
          </div>
          <Loader2 className="h-8 w-8 animate-spin text-yellow-400 mx-auto" />
        </div>
      </div>
    )
  }

  // If no founder or not a founder, don't render children
  if (!founder || !founder.isFounder) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center">
            <div className="p-4 bg-red-500/20 rounded-full">
              <Shield className="h-12 w-12 text-red-400" />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">Access Denied</h2>
            <p className="text-slate-300">Founder authentication required</p>
            <p className="text-slate-400 text-sm">Redirecting to founder login...</p>
          </div>
        </div>
      </div>
    )
  }

  // Render children if authenticated as founder
  return <>{children}</>
}
