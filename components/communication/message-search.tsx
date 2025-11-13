"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, FileText, ImageIcon, Link2, User, Calendar, ArrowUp, ArrowDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface MessageSearchProps {
  channelId: string
  onResultClick: (messageId: string) => void
  className?: string
}

interface SearchResult {
  id: string
  type: "message" | "file" | "image" | "link" | "user" | "event"
  content: string
  matchText: string
  sender: {
    id: string
    name: string
    avatar?: string
  }
  timestamp: Date
}

export function MessageSearch({ channelId, onResultClick, className }: MessageSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState<SearchResult[]>([])
  const [currentResultIndex, setCurrentResultIndex] = useState(-1)

  const handleSearch = () => {
    if (!searchQuery.trim()) return

    setIsSearching(true)

    // In a real app, this would call an API
    setTimeout(() => {
      // Mock search results
      const mockResults: SearchResult[] = [
        {
          id: "msg1",
          type: "message",
          content: "I've shared the pitch deck template with you. Let me know if you need any help with it.",
          matchText: "pitch deck template",
          sender: {
            id: "user1",
            name: "Sarah Chen",
            avatar: "/abstract-geometric-shapes.png",
          },
          timestamp: new Date(Date.now() - 3600000 * 24),
        },
        {
          id: "msg2",
          type: "file",
          content: "pitch-deck-template.pptx",
          matchText: "pitch-deck-template",
          sender: {
            id: "user1",
            name: "Sarah Chen",
            avatar: "/abstract-geometric-shapes.png",
          },
          timestamp: new Date(Date.now() - 3600000 * 24),
        },
        {
          id: "msg3",
          type: "message",
          content: "The investor meeting is scheduled for next Tuesday at 2 PM.",
          matchText: "investor meeting",
          sender: {
            id: "user2",
            name: "Alex Wong",
            avatar: "/abstract-geometric-aw.png",
          },
          timestamp: new Date(Date.now() - 3600000 * 48),
        },
      ]

      setResults(mockResults)
      setIsSearching(false)
      setCurrentResultIndex(mockResults.length > 0 ? 0 : -1)
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const navigateResults = (direction: "up" | "down") => {
    if (results.length === 0) return

    if (direction === "up") {
      setCurrentResultIndex((prev) => (prev <= 0 ? results.length - 1 : prev - 1))
    } else {
      setCurrentResultIndex((prev) => (prev >= results.length - 1 ? 0 : prev + 1))
    }
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date)
  }

  const getResultIcon = (type: string) => {
    switch (type) {
      case "message":
        return <Search className="h-4 w-4 text-primary" />
      case "file":
        return <FileText className="h-4 w-4 text-blue-500" />
      case "image":
        return <ImageIcon className="h-4 w-4 text-purple-500" />
      case "link":
        return <Link2 className="h-4 w-4 text-green-500" />
      case "user":
        return <User className="h-4 w-4 text-orange-500" />
      case "event":
        return <Calendar className="h-4 w-4 text-red-500" />
      default:
        return <Search className="h-4 w-4" />
    }
  }

  const highlightMatch = (text: string, match: string) => {
    if (!match) return text

    const regex = new RegExp(`(${match})`, "gi")
    const parts = text.split(regex)

    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-yellow-200 dark:bg-yellow-800 px-0.5 rounded">
          {part}
        </mark>
      ) : (
        part
      ),
    )
  }

  const filteredResults = activeTab === "all" ? results : results.filter((result) => result.type === activeTab)

  return (
    <div className={cn("flex flex-col h-full border rounded-md overflow-hidden", className)}>
      <div className="p-3 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search messages..."
            className="pl-9 pr-16"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              disabled={results.length === 0}
              onClick={() => navigateResults("up")}
            >
              <ArrowUp className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              disabled={results.length === 0}
              onClick={() => navigateResults("down")}
            >
              <ArrowDown className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {results.length > 0 && (
          <div className="text-xs text-muted-foreground mt-2">
            {currentResultIndex + 1} of {results.length} results
          </div>
        )}
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="px-3 pt-2">
          <TabsList className="grid grid-cols-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="message">Messages</TabsTrigger>
            <TabsTrigger value="file">Files</TabsTrigger>
            <TabsTrigger value="image">Images</TabsTrigger>
            <TabsTrigger value="link">Links</TabsTrigger>
            <TabsTrigger value="user">People</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="flex-1 overflow-hidden">
          <SearchResults
            results={filteredResults}
            isSearching={isSearching}
            searchQuery={searchQuery}
            currentResultIndex={currentResultIndex}
            onResultClick={onResultClick}
            getResultIcon={getResultIcon}
            formatDate={formatDate}
            highlightMatch={highlightMatch}
          />
        </TabsContent>

        <TabsContent value="message" className="flex-1 overflow-hidden">
          <SearchResults
            results={filteredResults}
            isSearching={isSearching}
            searchQuery={searchQuery}
            currentResultIndex={currentResultIndex}
            onResultClick={onResultClick}
            getResultIcon={getResultIcon}
            formatDate={formatDate}
            highlightMatch={highlightMatch}
          />
        </TabsContent>

        {/* Repeat for other tabs */}
      </Tabs>
    </div>
  )
}

interface SearchResultsProps {
  results: SearchResult[]
  isSearching: boolean
  searchQuery: string
  currentResultIndex: number
  onResultClick: (messageId: string) => void
  getResultIcon: (type: string) => React.ReactNode
  formatDate: (date: Date) => string
  highlightMatch: (text: string, match: string) => React.ReactNode
}

function SearchResults({
  results,
  isSearching,
  searchQuery,
  currentResultIndex,
  onResultClick,
  getResultIcon,
  formatDate,
  highlightMatch,
}: SearchResultsProps) {
  if (isSearching) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <div className="text-center">
          <Search className="h-8 w-8 text-muted-foreground mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Searching...</p>
        </div>
      </div>
    )
  }

  if (results.length === 0 && searchQuery) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <div className="text-center">
          <Search className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
          <p className="font-medium mb-1">No results found</p>
          <p className="text-sm text-muted-foreground">Try different keywords or check your spelling</p>
        </div>
      </div>
    )
  }

  if (results.length === 0) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <div className="text-center">
          <Search className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
          <p className="font-medium mb-1">Search for messages</p>
          <p className="text-sm text-muted-foreground">Enter keywords to search through this conversation</p>
        </div>
      </div>
    )
  }

  return (
    <ScrollArea className="h-full">
      <div className="p-3 space-y-2">
        {results.map((result, index) => (
          <div
            key={result.id}
            className={cn(
              "border rounded-md p-3 cursor-pointer hover:bg-muted/50 transition-colors",
              index === currentResultIndex && "bg-muted/50 border-primary/50",
            )}
            onClick={() => onResultClick(result.id)}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarImage src={result.sender.avatar || "/placeholder.svg"} alt={result.sender.name} />
                  <AvatarFallback className="text-xs">{result.sender.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="font-medium text-sm">{result.sender.name}</span>
                <span className="text-xs text-muted-foreground ml-2">{formatDate(result.timestamp)}</span>
              </div>
              <div className="flex items-center">
                {getResultIcon(result.type)}
                <span className="text-xs ml-1 capitalize">{result.type}</span>
              </div>
            </div>
            <p className="text-sm">{highlightMatch(result.content, result.matchText)}</p>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
