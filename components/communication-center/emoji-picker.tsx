"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void
  compact?: boolean
}

export function EmojiPicker({ onEmojiSelect, compact = false }: EmojiPickerProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("smileys")

  // Simple emoji categories
  const categories = [
    {
      id: "smileys",
      emojis: ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰"],
    },
    {
      id: "gestures",
      emojis: ["👍", "👎", "👌", "✌️", "🤞", "🤟", "🤙", "🤛", "🤜", "👏", "🙌", "👐", "🤲", "🤝", "🙏"],
    },
    {
      id: "symbols",
      emojis: ["❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝", "💟"],
    },
  ]

  // Filter emojis by search query
  const filteredEmojis = searchQuery
    ? categories.flatMap((cat) => cat.emojis).filter((emoji) => emoji.includes(searchQuery))
    : categories.find((cat) => cat.id === activeCategory)?.emojis || []

  return (
    <div className={cn("bg-background border rounded-md shadow-md overflow-hidden", compact ? "w-48" : "w-64")}>
      {/* Search input */}
      <div className="p-1 border-b">
        <div className="relative">
          <Search
            className={cn(
              "absolute left-1.5 top-1/2 -translate-y-1/2 text-muted-foreground",
              compact ? "h-2.5 w-2.5" : "h-3 w-3",
            )}
          />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search emojis..."
            className={cn("pl-6 border-muted", compact ? "h-6 text-[10px]" : "h-8 text-xs")}
          />
        </div>
      </div>

      {/* Category tabs */}
      {!searchQuery && (
        <Tabs defaultValue="smileys" value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className={cn("w-full grid grid-cols-3 bg-transparent border-b", compact ? "h-6" : "h-8")}>
            <TabsTrigger
              value="smileys"
              className={cn("data-[state=active]:bg-muted rounded-none", compact ? "text-[9px]" : "text-xs")}
            >
              Smileys
            </TabsTrigger>
            <TabsTrigger
              value="gestures"
              className={cn("data-[state=active]:bg-muted rounded-none", compact ? "text-[9px]" : "text-xs")}
            >
              Gestures
            </TabsTrigger>
            <TabsTrigger
              value="symbols"
              className={cn("data-[state=active]:bg-muted rounded-none", compact ? "text-[9px]" : "text-xs")}
            >
              Symbols
            </TabsTrigger>
          </TabsList>
        </Tabs>
      )}

      {/* Emoji grid */}
      <ScrollArea className={cn(compact ? "h-24" : "h-32")}>
        <div className="grid grid-cols-6 gap-0.5 p-1">
          {filteredEmojis.map((emoji, index) => (
            <button type="button"
              key={index}
              onClick={() => onEmojiSelect(emoji)}
              className={cn(
                "flex items-center justify-center rounded hover:bg-muted",
                compact ? "h-6 w-6 text-sm" : "h-8 w-8 text-base",
              )}
            >
              {emoji}
            </button>
          ))}
          {filteredEmojis.length === 0 && (
            <div
              className={cn(
                "col-span-6 flex items-center justify-center text-muted-foreground",
                compact ? "h-20 text-[10px]" : "h-28 text-xs",
              )}
            >
              No emojis found
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
