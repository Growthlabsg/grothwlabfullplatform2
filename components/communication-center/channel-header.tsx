"use client"

import { useState } from "react"
import { type Channel, type Section, PlatformType } from "@/types/communication"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import {
  Info,
  Search,
  Phone,
  Video,
  Pin,
  Bell,
  MessageCircle,
  Send,
  Users,
  Hash,
  Globe,
  Radio,
  MessageSquare,
} from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

interface ChannelHeaderProps {
  channel: Channel
  section: Section | null
  onSearchClick: () => void
}

export function ChannelHeader({ channel, section, onSearchClick }: ChannelHeaderProps) {
  const [isInfoOpen, setIsInfoOpen] = useState(false)

  // Get the appropriate icon based on the channel type
  const getChannelIcon = () => {
    if (channel.platform === PlatformType.WHATSAPP) {
      return <MessageCircle className="h-4 w-4 text-green-500" />
    } else if (channel.platform === PlatformType.TELEGRAM) {
      return <Send className="h-4 w-4 text-blue-500" />
    }

    if (!section) return null

    switch (section.type) {
      case "direct":
        return <MessageSquare className="h-4 w-4" />
      case "team":
        return <Hash className="h-4 w-4" />
      case "group":
        return <Users className="h-4 w-4" />
      case "community":
        return <Globe className="h-4 w-4" />
      case "broadcast":
        return <Radio className="h-4 w-4" />
      default:
        return null
    }
  }

  const getOnlineStatus = () => {
    if (channel.members === 1) {
      return (
        <div className="flex items-center text-xs">
          <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
          <span className="text-muted-foreground">Online</span>
        </div>
      )
    } else {
      return <div className="text-xs text-muted-foreground">{channel.members} members</div>
    }
  }

  return (
    <div className="flex items-center justify-between p-3 border-b bg-background">
      <div className="flex items-center">
        <Avatar className="h-9 w-9 mr-3">
          <AvatarImage src={channel.avatar || "/placeholder.svg"} alt={channel.name} />
          <AvatarFallback className="bg-primary/10">{getChannelIcon()}</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-1.5">
            <h3 className="font-medium text-base">{channel.name}</h3>
            {channel.isPinned && <Pin className="h-3.5 w-3.5 text-muted-foreground" />}
            {channel.platform !== PlatformType.INTERNAL && (
              <Badge variant="outline" className="text-xs font-normal px-1.5 py-0 h-5">
                {channel.platform === PlatformType.WHATSAPP ? "WhatsApp" : "Telegram"}
              </Badge>
            )}
          </div>
          {getOnlineStatus()}
        </div>
      </div>

      <div className="flex items-center gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={onSearchClick}>
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Search in conversation</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Phone className="h-4 w-4" />
                <span className="sr-only">Call</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Start audio call</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Video className="h-4 w-4" />
                <span className="sr-only">Video</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Start video call</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Sheet open={isInfoOpen} onOpenChange={setIsInfoOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Info className="h-4 w-4" />
              <span className="sr-only">Info</span>
            </Button>
          </SheetTrigger>
          <SheetContent className="sm:max-w-md p-0">
            <SheetHeader className="p-6 pb-2">
              <SheetTitle>Channel Information</SheetTitle>
              <SheetDescription>View details about this conversation</SheetDescription>
            </SheetHeader>
            <Separator />
            <ScrollArea className="h-[calc(100vh-10rem)]">
              <div className="p-6">
                <div className="flex items-center justify-center mb-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={channel.avatar || "/placeholder.svg"} alt={channel.name} />
                    <AvatarFallback className="text-2xl bg-primary/10">{channel.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium mb-1">Channel Name</h4>
                    <p className="text-base">{channel.name}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-1">Type</h4>
                    <p className="text-base capitalize">{section?.name || "Channel"}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-1">Members</h4>
                    <p className="text-base">{channel.members} participants</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-1">Created</h4>
                    <p className="text-base">April 15, 2023</p>
                  </div>

                  {channel.platform !== PlatformType.INTERNAL && (
                    <div>
                      <h4 className="text-sm font-medium mb-1">Integration</h4>
                      <div
                        className={cn(
                          "flex items-center gap-1.5 p-2 rounded-md",
                          channel.platform === PlatformType.WHATSAPP ? "bg-green-50" : "bg-blue-50",
                        )}
                      >
                        {channel.platform === PlatformType.WHATSAPP ? (
                          <MessageCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <Send className="h-5 w-5 text-blue-600" />
                        )}
                        <span
                          className={cn(
                            "font-medium",
                            channel.platform === PlatformType.WHATSAPP ? "text-green-700" : "text-blue-700",
                          )}
                        >
                          {channel.platform === PlatformType.WHATSAPP ? "WhatsApp" : "Telegram"} integration
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Actions</h4>

                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="justify-start h-auto py-2">
                      <Bell className="h-4 w-4 mr-2" />
                      <div className="text-left">
                        <div className="text-sm font-medium">Notifications</div>
                        <div className="text-xs text-muted-foreground">Customize alerts</div>
                      </div>
                    </Button>

                    <Button variant="outline" className="justify-start h-auto py-2">
                      <Users className="h-4 w-4 mr-2" />
                      <div className="text-left">
                        <div className="text-sm font-medium">Members</div>
                        <div className="text-xs text-muted-foreground">View all</div>
                      </div>
                    </Button>

                    <Button variant="outline" className="justify-start h-auto py-2">
                      <Pin className="h-4 w-4 mr-2" />
                      <div className="text-left">
                        <div className="text-sm font-medium">{channel.isPinned ? "Unpin" : "Pin"}</div>
                        <div className="text-xs text-muted-foreground">
                          {channel.isPinned ? "Remove pin" : "Keep at top"}
                        </div>
                      </div>
                    </Button>

                    <Button variant="outline" className="justify-start h-auto py-2">
                      <Search className="h-4 w-4 mr-2" />
                      <div className="text-left">
                        <div className="text-sm font-medium">Search</div>
                        <div className="text-xs text-muted-foreground">Find messages</div>
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
