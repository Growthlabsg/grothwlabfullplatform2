"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { GrowthLabSidebar } from "@/components/sidebar/growthlab-sidebar"
import { Header } from "@/components/layout/header"
import { CommunicationHubButton } from "@/components/communication/communication-hub-button"
// Hide legacy hub components by not importing/using them here
import { useMobile } from "@/hooks/use-mobile"

interface LayoutWithSidebarProps {
  children: React.ReactNode
}

export function LayoutWithSidebar({ children }: LayoutWithSidebarProps) {
  const { isMobile } = useMobile()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  // Render immediately; avoid returning null on server to prevent Next.js from treating the page as not-found

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} isMobile={isMobile} />
      <div className="flex flex-1 overflow-hidden">
        <GrowthLabSidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          isMobile={isMobile}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <main
          className={`flex-1 flex flex-col transition-all duration-300 ${isCollapsed ? "md:ml-16" : "md:ml-64"} pt-0 bg-gray-50 dark:bg-gray-900`}
        >
          {children}
        </main>
      </div>
      
      {/* Communication Hub Button */}
      <CommunicationHubButton />
    </div>
  )
}
