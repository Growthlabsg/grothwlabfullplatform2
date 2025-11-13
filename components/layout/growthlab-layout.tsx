"use client"
import type { ReactNode } from "react"
import { LayoutWithSidebar } from "./layout-with-sidebar"
import { BreadcrumbNavigation } from "../breadcrumb-navigation"

interface GrowthLabLayoutProps {
  children: ReactNode
}

export function GrowthLabLayout({ children }: GrowthLabLayoutProps) {
  return (
    <LayoutWithSidebar>
      <div className="flex flex-col">
        <BreadcrumbNavigation />
        {children}
      </div>
    </LayoutWithSidebar>
  )
}
