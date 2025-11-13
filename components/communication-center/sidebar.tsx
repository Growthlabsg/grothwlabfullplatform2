"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Channel, Section } from "@/types/communication"
import { SectionHeader } from "./section-header"
import { CreateChannelDialog } from "./dialogs/create-channel-dialog"
import { PlatformSettingsDialog } from "./dialogs/platform-settings-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useCommunication } from "@/contexts/communication-context"
import { PlatformType } from "@/types/communication"
import { Plus, Search, Settings, ChevronLeft, MessageCircle, Send } from "lucide-react"
import { Hash } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface SidebarProps {
  sections: Section[]
  channels: Record<string, Channel[]>
  activeSection: Section | null
  selectedChannel: Channel | null
  setActiveSection: (section: Section | null) => void
  setSelectedChannel: (channel: Channel | null) => void
  closeSidebar: () => void
  setActiveChannel: (channel: Channel | null) => void
  setSidebarOpen: (open: boolean) => void
  isMobile: boolean
}

export function Sidebar({
  sections,
  channels,
  activeSection,
  selectedChannel,
  setActiveSection,
  setSelectedChannel,
  closeSidebar,
  setActiveChannel,
  setSidebarOpen,
  isMobile,
}: SidebarProps) {
  const { currentUser, platformIntegrations } = useCommunication()

  const [searchQuery, setSearchQuery] = useState("")
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(
    // Initially expand all sections except integrations
    sections.reduce(
      (acc, section) => {
        acc[section.id] = !["whatsapp", "telegram"].includes(section.id)
        return acc
      },
      {} as Record<string, boolean>,
    ),
  )

  const [isCreateChannelOpen, setIsCreateChannelOpen] = useState(false)
  const [isPlatformSettingsOpen, setIsPlatformSettingsOpen] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformType | null>(null)

  // Toggle section expanded state
  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }))
  }

  // Filter channels based on search query
  const getFilteredChannels = (sectionId: string) => {
    if (!searchQuery) return channels[sectionId] || []

    return (channels[sectionId] || []).filter((channel) =>
      channel.name.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  // Show platform settings
  const handlePlatformSettings = (platform: PlatformType) => {
    setSelectedPlatform(platform)
    setIsPlatformSettingsOpen(true)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Sidebar header */}
      <div className="p-4 border-b flex items-center justify-between">
        <h1 className="font-semibold text-lg truncate">Communication</h1>
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={closeSidebar} className="md:hidden">
            <ChevronLeft className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* User profile */}
      <div className="p-4 border-b">
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8 flex-shrink-0">
            <AvatarImage src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.name} />
            <AvatarFallback>
              {currentUser.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{currentUser.name}</p>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2 flex-shrink-0"></div>
              <p className="text-xs text-muted-foreground truncate">Online</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="flex-shrink-0">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="p-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search channels..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Sections and channels */}
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-4">
          {sections.map((section) => {
            const filteredChannels = getFilteredChannels(section.id)
            const isExpanded = expandedSections[section.id]
            const isPlatformSection = ["whatsapp", "telegram"].includes(section.id)
            const isConnected =
              isPlatformSection &&
              platformIntegrations.includes(section.id === "whatsapp" ? PlatformType.WHATSAPP : PlatformType.TELEGRAM)

            return (
              <div key={section.id} className="mb-2">
                <SectionHeader
                  section={section}
                  isActive={activeSection?.id === section.id}
                  isExpanded={isExpanded}
                  onSectionClick={() => setActiveSection(section)}
                  onExpandClick={() => toggleSection(section.id)}
                  onAddClick={() => {
                    if (isPlatformSection) {
                      handlePlatformSettings(section.id === "whatsapp" ? PlatformType.WHATSAPP : PlatformType.TELEGRAM)
                    } else {
                      setIsCreateChannelOpen(true)
                    }
                  }}
                />

                {isPlatformSection && !isConnected && isExpanded && (
                  <div className="pl-2 pr-2 pb-2">
                    <div
                      className="flex flex-col items-center justify-center p-4 rounded-md border border-dashed space-y-2"
                      onClick={() =>
                        handlePlatformSettings(
                          section.id === "whatsapp" ? PlatformType.WHATSAPP : PlatformType.TELEGRAM,
                        )
                      }
                    >
                      {section.id === "whatsapp" ? (
                        <MessageCircle className="h-10 w-10 text-green-500" />
                      ) : (
                        <Send className="h-10 w-10 text-blue-500" />
                      )}
                      <p className="text-sm text-center">
                        Connect your {section.id === "whatsapp" ? "WhatsApp" : "Telegram"} account
                      </p>
                      <Button size="sm" variant="outline" className="mt-2">
                        <Plus className="h-4 w-4 mr-1" />
                        Connect
                      </Button>
                    </div>
                  </div>
                )}

                {isExpanded && filteredChannels.length > 0 && (
                  <div className="pl-2 pr-1 space-y-0.5">
                    {filteredChannels.map((channel) => (
                      <button type="button"
                        key={channel.id}
                        className={cn(
                          "w-full flex items-center gap-2 rounded-md px-2 py-1.5 text-sm",
                          selectedChannel?.id === channel.id ? "bg-primary/10 font-medium" : "hover:bg-muted",
                        )}
                        onClick={() => {
                          setActiveChannel(channel)
                          setActiveSection(null)
                          setSelectedChannel(channel)
                          if (isMobile) setSidebarOpen(false)
                        }}
                      >
                        <Hash className="h-4 w-4 text-muted-foreground shrink-0" />
                        <span className="truncate">{channel.name}</span>
                        {channel.unread > 0 && <Badge className="ml-auto shrink-0">{channel.unread}</Badge>}
                      </button>
                    ))}
                  </div>
                )}

                {isExpanded && filteredChannels.length === 0 && searchQuery && (
                  <div className="pl-4 pr-2 py-2 text-sm text-muted-foreground">No channels found</div>
                )}
              </div>
            )
          })}
        </div>
      </ScrollArea>

      {/* Create channel dialog */}
      <CreateChannelDialog
        isOpen={isCreateChannelOpen}
        onClose={() => setIsCreateChannelOpen(false)}
        activeSection={activeSection}
      />

      {/* Platform settings dialog */}
      <PlatformSettingsDialog
        isOpen={isPlatformSettingsOpen}
        onClose={() => setIsPlatformSettingsOpen(false)}
        platform={selectedPlatform}
      />
    </div>
  )
}
