"use client"

import { useState, useEffect } from "react"
import { ErrorBoundary } from "@/components/error-boundary"
import { useCommunication } from "@/contexts/communication-context"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Sidebar } from "@/components/communication-center/sidebar"
import { MessageView } from "@/components/communication-center/message-view"
import { EmptyView } from "@/components/communication-center/empty-view"
import type { Channel, Section } from "@/types/communication"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"

export function CommunicationCenterUI() {
  const { loading, sections, channels, currentUser } = useCommunication()
  const [activeSection, setActiveSection] = useState<Section | null>(null)
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null)
  const [isSidebarOpen, setSidebarOpen] = useState(true)
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Set initial active section when data loads
  useEffect(() => {
    if (!loading && sections.length > 0 && !activeSection) {
      setActiveSection(sections[0])
    }
  }, [loading, sections, activeSection])

  // Close sidebar on mobile when a channel is selected
  useEffect(() => {
    if (isMobile && selectedChannel) {
      setSidebarOpen(false)
    }
  }, [selectedChannel, isMobile])

  // Reset to desktop view on resize
  useEffect(() => {
    if (!isMobile) {
      setSidebarOpen(true)
    }
  }, [isMobile])

  const handleSectionChange = (section: Section | null) => {
    setActiveSection(section)
    // On mobile, don't close the sidebar when changing sections
    if (!isMobile) {
      setSelectedChannel(null)
    }
  }

  const handleChannelSelect = (channel: Channel | null) => {
    setSelectedChannel(channel)
    // On desktop, we can leave the sidebar open
    if (isMobile) {
      setSidebarOpen(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <div className="h-screen flex overflow-hidden bg-background">
        {/* Mobile sidebar toggle */}
        {!isSidebarOpen && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 left-4 z-30 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}

        {/* Sidebar */}
        <div
          className={cn(
            "h-full border-r transition-all duration-200 bg-background z-20",
            isSidebarOpen ? "w-80" : "w-0 -translate-x-full",
            !isMobile && "md:w-80 md:translate-x-0",
          )}
        >
          <Sidebar
            sections={sections}
            channels={channels}
            activeSection={activeSection}
            selectedChannel={selectedChannel}
            setActiveSection={handleSectionChange}
            setSelectedChannel={handleChannelSelect}
            closeSidebar={() => setSidebarOpen(false)}
            setActiveChannel={handleChannelSelect}
            setSidebarOpen={setSidebarOpen}
            isMobile={isMobile}
          />
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {selectedChannel ? (
            <MessageView channel={selectedChannel} section={activeSection} />
          ) : (
            <EmptyView section={activeSection} />
          )}
        </div>
      </div>
    </ErrorBoundary>
  )
}
