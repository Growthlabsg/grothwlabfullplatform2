"use client"

import { useEffect } from "react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { useCommunication } from "@/contexts/communication-context"
import {
  Hash,
  Users,
  Search,
  Calendar,
  Languages,
  Download,
  User,
  Radio,
  MessageCircle,
  Send,
  Bookmark,
  Settings,
  HelpCircle,
  PlusCircle,
} from "lucide-react"
import { PlatformType } from "@/types/communication"

interface CommandCenterProps {
  isOpen: boolean
  onClose: () => void
}

export function CommandCenter({ isOpen, onClose }: CommandCenterProps) {
  const { sections, channels, setSelectedChannel, setActiveSection, currentUser, searchMessages } = useCommunication()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const handleAction = (action: string, data?: any) => {
    switch (action) {
      case "select-channel":
        if (data) {
          // Find the channel and section
          for (const sectionId in channels) {
            const channel = (channels[sectionId] ? channels[sectionId].find : undefined)((c) => c.id === data)
            if (channel) {
              const section = sections.find((s) => s.id === sectionId)
              if (section) {
                setActiveSection(section)
                setSelectedChannel(channel)
                break
              }
            }
          }
        }
        break

      case "search":
        // Open search dialog
        break

      case "create-channel":
        // Open create channel dialog
        break

      default:
        break
    }

    onClose()
  }

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Channels">
          {sections.map((section) => {
            const sectionChannels = channels[section.id] || []
            if (sectionChannels.length === 0) return null

            return sectionChannels.slice(0, 5).map((channel) => {
              // Custom icon based on platform
              let icon = <Hash className="mr-2 h-4 w-4" />

              if (channel.platform === PlatformType.WHATSAPP) {
                icon = <MessageCircle className="mr-2 h-4 w-4 text-green-500" />
              } else if (channel.platform === PlatformType.TELEGRAM) {
                icon = <Send className="mr-2 h-4 w-4 text-blue-500" />
              } else if (channel.type === "direct") {
                icon = <User className="mr-2 h-4 w-4" />
              } else if (channel.type === "group") {
                icon = <Users className="mr-2 h-4 w-4" />
              } else if (channel.type === "broadcast") {
                icon = <Radio className="mr-2 h-4 w-4" />
              }

              return (
                <CommandItem key={channel.id} onSelect={() => handleAction("select-channel", channel.id)}>
                  {icon}
                  <span>{channel.name}</span>
                  {channel.unreadCount > 0 && (
                    <span className="ml-auto text-xs bg-primary/10 text-primary rounded-full px-2">
                      {channel.unreadCount}
                    </span>
                  )}
                </CommandItem>
              )
            })
          })}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => handleAction("search")}>
            <Search className="mr-2 h-4 w-4" />
            <span>Search messages</span>
          </CommandItem>

          <CommandItem onSelect={() => handleAction("create-channel")}>
            <PlusCircle className="mr-2 h-4 w-4" />
            <span>Create channel</span>
          </CommandItem>

          <CommandItem onSelect={() => handleAction("schedule")}>
            <Calendar className="mr-2 h-4 w-4" />
            <span>Schedule message</span>
          </CommandItem>

          <CommandItem onSelect={() => handleAction("translate")}>
            <Languages className="mr-2 h-4 w-4" />
            <span>Translate message</span>
          </CommandItem>

          <CommandItem onSelect={() => handleAction("export")}>
            <Download className="mr-2 h-4 w-4" />
            <span>Export chat</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Quick Access">
          <CommandItem onSelect={() => handleAction("favorites")}>
            <Bookmark className="mr-2 h-4 w-4" />
            <span>Favorites</span>
          </CommandItem>

          <CommandItem onSelect={() => handleAction("settings")}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </CommandItem>

          <CommandItem onSelect={() => handleAction("help")}>
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>Help & Support</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
