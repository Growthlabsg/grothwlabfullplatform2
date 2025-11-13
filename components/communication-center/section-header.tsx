"use client"

import type { Section } from "@/types/communication"
import { ChevronRight, Plus, Users, MessageSquare, Globe, Radio, Send, MessageCircle, Hash } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface SectionHeaderProps {
  section: Section
  isActive: boolean
  isExpanded: boolean
  onSectionClick: () => void
  onExpandClick: () => void
  onAddClick: () => void
}

export function SectionHeader({
  section,
  isActive,
  isExpanded,
  onSectionClick,
  onExpandClick,
  onAddClick,
}: SectionHeaderProps) {
  const getSectionIcon = () => {
    switch (section.type) {
      case "team":
        return <Users className="h-4 w-4" />
      case "direct":
        return <MessageSquare className="h-4 w-4" />
      case "group":
        return <Users className="h-4 w-4" />
      case "community":
        return <Globe className="h-4 w-4" />
      case "broadcast":
        return <Radio className="h-4 w-4" />
      case "whatsapp":
        return <MessageCircle className="h-4 w-4" />
      case "telegram":
        return <Send className="h-4 w-4" />
      default:
        return <Hash className="h-4 w-4" />
    }
  }

  return (
    <div className="flex items-center justify-between py-1 px-2 rounded-md group">
      <div
        className={cn(
          "flex-1 flex items-center space-x-1 cursor-pointer",
          isActive ? "text-foreground" : "text-muted-foreground",
        )}
      >
        <button type="button"
          onClick={onExpandClick}
          className="p-0.5 rounded-sm hover:bg-muted"
          aria-label={isExpanded ? "Collapse section" : "Expand section"}
        >
          <ChevronRight className={cn("h-4 w-4 transition-transform", isExpanded ? "transform rotate-90" : "")} />
        </button>

        <div className="flex items-center space-x-2 py-1 flex-1" onClick={onSectionClick}>
          <span>{getSectionIcon()}</span>
          <span className="text-sm font-medium">{section.name}</span>
        </div>
      </div>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={onAddClick}
            >
              <Plus className="h-4 w-4" />
              <span className="sr-only">Add {section.name}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {section.type === "whatsapp" || section.type === "telegram"
              ? `Connect ${section.name}`
              : `Add ${section.name}`}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
