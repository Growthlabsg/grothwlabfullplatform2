"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useResponsive } from "@/hooks/use-responsive"
import { GrowthLabSidebar } from "@/components/sidebar/growthlab-sidebar"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { cn } from "@/lib/utils"

interface EnhancedLayoutWithSidebarProps {
  children: React.ReactNode
  className?: string
  hideFooter?: boolean
}

export function EnhancedLayoutWithSidebar({ children, className, hideFooter = false }: EnhancedLayoutWithSidebarProps) {
  const { isMobile, isTablet } = useResponsive()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Auto-collapse sidebar on tablet
  useEffect(() => {
    if (isTablet) {
      setIsCollapsed(true)
    } else if (!isMobile) {
      setIsCollapsed(false)
    }
  }, [isMobile, isTablet])

  // Close sidebar when switching to desktop
  useEffect(() => {
    if (!isMobile && isSidebarOpen) {
      setIsSidebarOpen(false)
    }
  }, [isMobile, isSidebarOpen])

  const toggleSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen(!isSidebarOpen)
    } else {
      setIsCollapsed(!isCollapsed)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header toggleSidebar={toggleSidebar} isMobile={isMobile} />

      <div className="flex flex-1 relative">
        <GrowthLabSidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          isMobile={isMobile}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        <main
          className={cn(
            "flex-1 flex flex-col transition-all duration-300 ease-in-out",
            isMobile ? "" : isCollapsed ? "md:ml-16" : "md:ml-64",
            className,
          )}
        >
          <div className="flex-1">{children}</div>
          {!hideFooter && <Footer />}
        </main>
      </div>
    </div>
  )
}
