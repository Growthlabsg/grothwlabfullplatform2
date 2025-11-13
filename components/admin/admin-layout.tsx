"use client"

import type * as React from "react"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { hasPermission, isFounder } = useAuth()

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-200 bg-white">
        <div className="flex h-16 items-center justify-center border-b">
          <span className="text-lg font-semibold">Admin Panel</span>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {/* Founder-only section */}
            {isFounder() && (
              <>
                <li className="pt-4 pb-2">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Founder Control
                  </span>
                </li>
                <li>
                  <Link 
                    href="/admin/founder-dashboard" 
                    className="block rounded-md p-2 hover:bg-gray-100 text-yellow-700 font-medium"
                  >
                    👑 Founder Dashboard
                  </Link>
                </li>
                <li className="pt-4 pb-2">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    General Admin
                  </span>
                </li>
              </>
            )}
            
            <li>
              <Link href="/admin/dashboard" className="block rounded-md p-2 hover:bg-gray-100">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/admin/users" className="block rounded-md p-2 hover:bg-gray-100">
                Users
              </Link>
            </li>
            <li>
              <Link href="/admin/startups" className="block rounded-md p-2 hover:bg-gray-100">
                Startups
              </Link>
            </li>
            <li>
              <Link href="/admin/events" className="block rounded-md p-2 hover:bg-gray-100">
                Events
              </Link>
            </li>
            <li>
              <Link href="/admin/courses" className="block rounded-md p-2 hover:bg-gray-100">
                Courses
              </Link>
            </li>
            <li>
              <Link href="/admin/activity-logs" className="block rounded-md p-2 hover:bg-gray-100">
                Activity Logs
              </Link>
            </li>
            <li>
              <Link href="/admin/environment" className="block rounded-md p-2 hover:bg-gray-100">
                Environment
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">{children}</div>
    </div>
  )
}
