"use client"

import type { Channel } from "@/types/communication"
import { Button } from "@/components/ui/button"
import { Menu, ArrowLeft, Search, Command } from "lucide-react"

interface MobileHeaderProps {
  isSidebarOpen: boolean
  toggleSidebar: () => void
  selectedChannel: Channel | null
  onBackClick: () => void
  onSearchClick: () => void
  onCommandClick: () => void
}

export function MobileHeader({
  isSidebarOpen,
  toggleSidebar,
  selectedChannel,
  onBackClick,
  onSearchClick,
  onCommandClick,
}: MobileHeaderProps) {
  return (
    <div className="sticky top-0 z-30 h-10 border-b flex items-center justify-between px-2 bg-background">
      {selectedChannel ? (
        <>
          <Button variant="ghost" size="sm" onClick={onBackClick} className="h-7 w-7 p-0 flex-shrink-0">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="font-medium text-xs truncate max-w-[150px] mx-1">{selectedChannel.name}</div>
          <div className="flex items-center flex-shrink-0">
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={onSearchClick}>
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={onCommandClick}>
              <Command className="h-4 w-4" />
            </Button>
          </div>
        </>
      ) : (
        <>
          <Button variant="ghost" size="sm" onClick={toggleSidebar} className="h-7 w-7 p-0 flex-shrink-0">
            <Menu className="h-4 w-4" />
          </Button>
          <div className="font-medium text-xs">Communication</div>
          <div className="flex items-center flex-shrink-0">
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={onSearchClick}>
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={onCommandClick}>
              <Command className="h-4 w-4" />
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
