"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

interface AdminRedirectProps {
  targetTab: string
  pageName: string
}

export function AdminRedirect({ targetTab, pageName }: AdminRedirectProps) {
  const router = useRouter()

  useEffect(() => {
    // Redirect to super admin panel with specific tab
    router.replace(`/super-admin?tab=${targetTab}`)
  }, [router, targetTab])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Redirecting to Super Admin Panel...</h2>
        <p className="text-muted-foreground">
          {pageName} has been moved to the Super Admin Panel.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          You will be redirected automatically.
        </p>
      </div>
    </div>
  )
}
