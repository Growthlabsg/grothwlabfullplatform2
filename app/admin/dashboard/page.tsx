"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AdminDashboardRedirect() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to super admin panel
    router.replace("/super-admin?tab=admin-dashboard")
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Redirecting to Super Admin Panel...</h2>
        <p className="text-muted-foreground">All administration features have been moved to the Super Admin Panel.</p>
      </div>
    </div>
  )
}