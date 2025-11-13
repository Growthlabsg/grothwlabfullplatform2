"use client"

import type React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { useResponsive } from "@/hooks/use-responsive"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Tab {
  id: string
  label: string
  content: React.ReactNode
}

interface ResponsiveTabsProps {
  tabs: Tab[]
  defaultTabId?: string
  className?: string
  tabsClassName?: string
  contentClassName?: string
}

export function ResponsiveTabs({
  tabs,
  defaultTabId,
  className,
  tabsClassName,
  contentClassName,
}: ResponsiveTabsProps) {
  const { isMobile } = useResponsive()
  const [activeTabId, setActiveTabId] = useState(defaultTabId || tabs[0]?.id)

  const activeTab = tabs.find((tab) => tab.id === activeTabId) || tabs[0]

  // Mobile dropdown view
  if (isMobile) {
    return (
      <div className={cn("space-y-4", className)}>
        <Select value={activeTabId} onValueChange={setActiveTabId}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={activeTab?.label} />
          </SelectTrigger>
          <SelectContent>
            {tabs.map((tab) => (
              <SelectItem key={tab.id} value={tab.id}>
                {tab.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className={cn("pt-2", contentClassName)}>{activeTab?.content}</div>
      </div>
    )
  }

  // Desktop tabs view
  return (
    <div className={cn("space-y-4", className)}>
      <div className={cn("flex border-b", tabsClassName)}>
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant="ghost"
            className={cn(
              "rounded-none border-b-2 border-transparent px-4 py-2 -mb-px",
              activeTabId === tab.id && "border-primary text-primary",
            )}
            onClick={() => setActiveTabId(tab.id)}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      <div className={cn("pt-2", contentClassName)}>{activeTab?.content}</div>
    </div>
  )
}
