"use client"

import Link from "next/link"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Clock,
  X,
  MessageSquare,
  FileText,
  Users,
  Calendar,
  ChevronRight,
  File,
  ImageIcon,
  FileArchive,
  Video,
  Download,
  ExternalLink,
  Bookmark,
  Star,
  MoreHorizontal,
  Filter,
  SlidersHorizontal,
} from "lucide-react"

interface EnhancedSearchProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Mock search history
const searchHistory = [
  "funding opportunities",
  "pitch deck template",
  "investor contacts",
  "startup valuation",
  "growth metrics",
]

// Mock search results
const mockSearchResults = {
  messages: [
    {
      id: "msg1",
      content: "I've shared the <mark>pitch deck</mark> template with you. Let me know if you need any help with it.",
      sender: "Sarah Chen",
      senderAvatar: "/abstract-geometric-shapes.png",
      chat: "Direct Message",
      date: "Yesterday",
      attachments: 1,
    },
    {
      id: "msg2",
      content: "The <mark>pitch deck</mark> looks great! I especially like the market analysis slide.",
      sender: "Alex Wong",
      senderAvatar: "/abstract-geometric-aw.png",
      chat: "Product Team",
      date: "2 days ago",
      attachments: 0,
    },
  ],
  files: [
    {
      id: "file1",
      name: "Startup_Pitch_Deck_Template.pptx",
      type: "presentation",
      size: "2.4 MB",
      owner: "Sarah Chen",
      ownerAvatar: "/abstract-geometric-shapes.png",
      lastModified: "3 days ago",
      path: "Shared with me/Templates",
    },
    {
      id: "file2",
      name: "Pitch_Deck_Guidelines.pdf",
      type: "document",
      size: "1.2 MB",
      owner: "GrowthLab",
      ownerAvatar: "/images/GrowthLab Icon (1).png",
      lastModified: "1 week ago",
      path: "Resources/Fundraising",
    },
    {
      id: "file3",
      name: "Investor_Pitch_Deck_Final.pptx",
      type: "presentation",
      size: "5.7 MB",
      owner: "You",
      ownerAvatar: "/vibrant-street-market.png",
      lastModified: "2 days ago",
      path: "My Files/Presentations",
    },
  ],
  people: [
    {
      id: "person1",
      name: "David Lee",
      role: "Pitch Coach @ GrowthLab",
      avatar: "/thoughtful-portrait.png",
      expertise: ["Pitch Decks", "Fundraising", "Presentation Skills"],
      relevance: "Pitch deck expert",
    },
    {
      id: "person2",
      name: "Lisa Park",
      role: "Investor @ Sequoia",
      avatar: "/abstract-geometric-shapes.png",
      expertise: ["Venture Capital", "Due Diligence", "Pitch Evaluation"],
      relevance: "Recently reviewed pitch decks",
    },
  ],
  events: [
    {
      id: "event1",
      title: "Pitch Deck Workshop",
      description: "Learn how to create a compelling pitch deck",
      date: "Next Tuesday, 2:00 PM",
      location: "GrowthLab HQ",
      organizer: "GrowthLab Events",
      attendees: 45,
    },
    {
      id: "event2",
      title: "Investor Pitch Practice Session",
      description: "Practice your pitch and get feedback from investors",
      date: "March 15, 6:00 PM",
      location: "Virtual Event",
      organizer: "Startup Grind Singapore",
      attendees: 30,
    },
  ],
}

export function EnhancedSearch({ open, onOpenChange }: EnhancedSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<any>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [dateFilter, setDateFilter] = useState("anytime")
  const [typeFilter, setTypeFilter] = useState("all")
  const [sortBy, setSortBy] = useState("relevance")

  const searchInputRef = useRef<HTMLInputElement>(null)

  // Focus search input when dialog opens
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        searchInputRef.current?.focus()
      }, 100)
    } else {
      // Reset search when dialog closes
      setSearchQuery("")
      setIsSearching(false)
      setSearchResults(null)
    }
  }, [open])

  // Handle search
  const handleSearch = () => {
    if (!searchQuery.trim()) return

    setIsSearching(true)

    // Simulate API call delay
    setTimeout(() => {
      setSearchResults(mockSearchResults)
      setIsSearching(false)
    }, 800)
  }

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  // Clear search
  const handleClearSearch = () => {
    setSearchQuery("")
    setSearchResults(null)
    searchInputRef.current?.focus()
  }

  // Get file icon based on type
  const getFileIcon = (type: string) => {
    switch (type) {
      case "document":
        return <FileText className="h-10 w-10 text-blue-500" />
      case "presentation":
        return <File className="h-10 w-10 text-orange-500" />
      case "image":
        return <ImageIcon className="h-10 w-10 text-green-500" />
      case "archive":
        return <FileArchive className="h-10 w-10 text-purple-500" />
      case "video":
        return <Video className="h-10 w-10 text-red-500" />
      default:
        return <File className="h-10 w-10 text-gray-500" />
    }
  }

  // Get result counts
  const getResultCounts = () => {
    if (!searchResults) return {}

    return {
      all: Object.values(searchResults).reduce((acc: number, curr: any) => acc + curr.length, 0),
      messages: searchResults.messages.length,
      files: searchResults.files.length,
      people: searchResults.people.length,
      events: searchResults.events.length,
    }
  }

  const resultCounts = getResultCounts()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] p-0 flex flex-col">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              ref={searchInputRef}
              placeholder="Search messages, files, people, and events..."
              className="pl-10 pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
                onClick={handleClearSearch}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {!searchResults && !isSearching && (
            <div className="mt-4">
              <div className="flex items-center text-sm text-muted-foreground mb-2">
                <Clock className="h-4 w-4 mr-2" />
                <span>Recent searches</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {searchHistory.map((term, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => {
                      setSearchQuery(term)
                      handleSearch()
                    }}
                  >
                    <Clock className="h-3 w-3 mr-1" />
                    {term}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {searchResults && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">
                {resultCounts.all} results for <span className="font-medium">"{searchQuery}"</span>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={() => setShowFilters(!showFilters)}>
                  <Filter className="h-3 w-3 mr-1" />
                  Filters
                </Button>
                <Button variant="ghost" size="sm" className="h-8 text-xs">
                  <SlidersHorizontal className="h-3 w-3 mr-1" />
                  Advanced
                </Button>
              </div>
            </div>
          )}

          {showFilters && searchResults && (
            <div className="mt-2 p-2 border rounded-md bg-muted/30 grid grid-cols-3 gap-2 text-sm">
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Date</label>
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                >
                  <option value="anytime">Anytime</option>
                  <option value="today">Today</option>
                  <option value="week">This week</option>
                  <option value="month">This month</option>
                  <option value="year">This year</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Type</label>
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <option value="all">All types</option>
                  <option value="documents">Documents</option>
                  <option value="presentations">Presentations</option>
                  <option value="images">Images</option>
                  <option value="videos">Videos</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Sort by</label>
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="relevance">Relevance</option>
                  <option value="date">Date (newest)</option>
                  <option value="date-asc">Date (oldest)</option>
                  <option value="name">Name (A-Z)</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {isSearching ? (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="flex flex-col items-center">
              <div className="relative h-10 w-10">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Search className="h-6 w-6 text-muted-foreground animate-pulse" />
                </div>
                <div className="absolute inset-0 border-t-2 border-primary rounded-full animate-spin"></div>
              </div>
              <p className="mt-4 text-muted-foreground">Searching across all your content...</p>
            </div>
          </div>
        ) : searchResults ? (
          <div className="flex-1 flex flex-col">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <div className="border-b">
                <TabsList className="w-full justify-start p-0 h-auto bg-transparent border-b-0">
                  <TabsTrigger value="all" className="text-sm py-1 px-2 h-8 data-[state=active]:bg-muted">
                    All
                    {resultCounts.all > 0 && (
                      <Badge variant="secondary" className="ml-2">
                        {resultCounts.all}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="messages" className="text-sm py-1 px-2 h-8 data-[state=active]:bg-muted">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Messages
                    {resultCounts.messages > 0 && (
                      <Badge variant="secondary" className="ml-2">
                        {resultCounts.messages}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="files" className="text-sm py-1 px-2 h-8 data-[state=active]:bg-muted">
                    <FileText className="h-4 w-4 mr-2" />
                    Files
                    {resultCounts.files > 0 && (
                      <Badge variant="secondary" className="ml-2">
                        {resultCounts.files}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="people" className="text-sm py-1 px-2 h-8 data-[state=active]:bg-muted">
                    <Users className="h-4 w-4 mr-2" />
                    People
                    {resultCounts.people > 0 && (
                      <Badge variant="secondary" className="ml-2">
                        {resultCounts.people}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="events" className="text-sm py-1 px-2 h-8 data-[state=active]:bg-muted">
                    <Calendar className="h-4 w-4 mr-2" />
                    Events
                    {resultCounts.events > 0 && (
                      <Badge variant="secondary" className="ml-2">
                        {resultCounts.events}
                      </Badge>
                    )}
                  </TabsTrigger>
                </TabsList>
              </div>

              <ScrollArea className="flex-1">
                <TabsContent value="all" className="p-0 m-0">
                  <div className="p-4 space-y-6">
                    {/* Messages section */}
                    {searchResults.messages.length > 0 && (
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-sm font-medium">Messages</h3>
                          <Button
                            variant="link"
                            size="sm"
                            className="h-auto p-0"
                            onClick={() => setActiveTab("messages")}
                          >
                            View all {searchResults.messages.length} <ChevronRight className="h-3 w-3 ml-1" />
                          </Button>
                        </div>
                        <div className="space-y-2">
                          {searchResults.messages.slice(0, 2).map((message: any) => (
                            <div key={message.id} className="border rounded-md p-3 hover:bg-muted/50">
                              <div className="flex items-center mb-2">
                                <Avatar className="h-6 w-6 mr-2">
                                  <AvatarImage src={message.senderAvatar || "/placeholder.svg"} alt={message.sender} />
                                  <AvatarFallback>{message.sender.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium">{message.sender}</p>
                                    <p className="text-xs text-muted-foreground">{message.date}</p>
                                  </div>
                                  <p className="text-xs text-muted-foreground">{message.chat}</p>
                                </div>
                              </div>
                              <p
                                className="text-sm"
                                dangerouslySetInnerHTML={{
                                  __html: message.content.replace(
                                    new RegExp(searchQuery, "gi"),
                                    `<mark class="bg-yellow-200 dark:bg-yellow-800">${searchQuery}</mark>`,
                                  ),
                                }}
                              ></p>
                              {message.attachments > 0 && (
                                <div className="mt-2 flex items-center text-xs text-muted-foreground">
                                  <FileText className="h-3 w-3 mr-1" />
                                  <span>
                                    {message.attachments} attachment{message.attachments !== 1 ? "s" : ""}
                                  </span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Files section */}
                    {searchResults.files.length > 0 && (
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-sm font-medium">Files</h3>
                          <Button variant="link" size="sm" className="h-auto p-0" onClick={() => setActiveTab("files")}>
                            View all {searchResults.files.length} <ChevronRight className="h-3 w-3 ml-1" />
                          </Button>
                        </div>
                        <div className="space-y-2">
                          {searchResults.files.slice(0, 2).map((file: any) => (
                            <div key={file.id} className="border rounded-md p-3 hover:bg-muted/50">
                              <div className="flex items-start">
                                {getFileIcon(file.type)}
                                <div className="ml-3 flex-1">
                                  <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium">
                                      {file.name.replace(
                                        new RegExp(searchQuery, "gi"),
                                        (match: string) =>
                                          `<mark class="bg-yellow-200 dark:bg-yellow-800">${match}</mark>`,
                                      )}
                                    </p>
                                    <div className="flex items-center gap-1">
                                      <Button variant="ghost" size="icon" className="h-7 w-7">
                                        <Download className="h-4 w-4" />
                                      </Button>
                                      <Button variant="ghost" size="icon" className="h-7 w-7">
                                        <MoreHorizontal className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                                    <span className="mr-2">{file.size}</span>
                                    <span className="mr-2">•</span>
                                    <span>{file.lastModified}</span>
                                  </div>
                                  <div className="flex items-center mt-2">
                                    <Avatar className="h-5 w-5 mr-1">
                                      <AvatarImage src={file.ownerAvatar || "/placeholder.svg"} alt={file.owner} />
                                      <AvatarFallback>{file.owner.substring(0, 2)}</AvatarFallback>
                                    </Avatar>
                                    <span className="text-xs">{file.owner}</span>
                                    <span className="mx-2 text-xs text-muted-foreground">in</span>
                                    <span className="text-xs text-muted-foreground">{file.path}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* People section */}
                    {searchResults.people.length > 0 && (
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-sm font-medium">People</h3>
                          <Button
                            variant="link"
                            size="sm"
                            className="h-auto p-0"
                            onClick={() => setActiveTab("people")}
                          >
                            View all {searchResults.people.length} <ChevronRight className="h-3 w-3 ml-1" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {searchResults.people.map((person: any) => (
                            <div key={person.id} className="border rounded-md p-3 hover:bg-muted/50">
                              <div className="flex items-center">
                                <Avatar className="h-10 w-10 mr-3">
                                  <AvatarImage src={person.avatar || "/placeholder.svg"} alt={person.name} />
                                  <AvatarFallback>{person.name.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{person.name}</p>
                                  <p className="text-xs text-muted-foreground">{person.role}</p>
                                </div>
                              </div>
                              <div className="mt-2">
                                <p className="text-xs text-muted-foreground mb-1">Expertise:</p>
                                <div className="flex flex-wrap gap-1">
                                  {person.expertise.map((skill: string) => (
                                    <Badge key={skill} variant="outline" className="text-xs">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div className="mt-2 flex items-center text-xs text-muted-foreground">
                                <Star className="h-3 w-3 mr-1 text-amber-500" />
                                <span>{person.relevance}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Events section */}
                    {searchResults.events.length > 0 && (
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-sm font-medium">Events</h3>
                          <Button
                            variant="link"
                            size="sm"
                            className="h-auto p-0"
                            onClick={() => setActiveTab("events")}
                          >
                            View all {searchResults.events.length} <ChevronRight className="h-3 w-3 ml-1" />
                          </Button>
                        </div>
                        <div className="space-y-2">
                          {searchResults.events.map((event: any) => (
                            <div key={event.id} className="border rounded-md p-3 hover:bg-muted/50">
                              <div className="flex items-center justify-between mb-1">
                                <p className="font-medium">{event.title}</p>
                                <Badge variant="outline" className="text-xs">
                                  {event.attendees} attending
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                              <div className="flex items-center text-xs text-muted-foreground">
                                <Calendar className="h-3 w-3 mr-1" />
                                <span className="mr-2">{event.date}</span>
                                <span className="mr-2">•</span>
                                <span>{event.location}</span>
                              </div>
                              <div className="mt-2 flex items-center justify-between">
                                <span className="text-xs text-muted-foreground">By {event.organizer}</span>
                                <Button variant="outline" size="sm" className="h-7 text-xs">
                                  RSVP
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="messages" className="p-0 m-0">
                  <div className="p-4 space-y-2">
                    {searchResults.messages.map((message: any) => (
                      <div key={message.id} className="border rounded-md p-3 hover:bg-muted/50">
                        <div className="flex items-center mb-2">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src={message.senderAvatar || "/placeholder.svg"} alt={message.sender} />
                            <AvatarFallback>{message.sender.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="font-medium">{message.sender}</p>
                              <p className="text-xs text-muted-foreground">{message.date}</p>
                            </div>
                            <p className="text-xs text-muted-foreground">{message.chat}</p>
                          </div>
                        </div>
                        <p
                          className="text-sm"
                          dangerouslySetInnerHTML={{
                            __html: message.content.replace(
                              new RegExp(searchQuery, "gi"),
                              `<mark class="bg-yellow-200 dark:bg-yellow-800">${searchQuery}</mark>`,
                            ),
                          }}
                        ></p>
                        {message.attachments > 0 && (
                          <div className="mt-2 flex items-center text-xs text-muted-foreground">
                            <FileText className="h-3 w-3 mr-1" />
                            <span>
                              {message.attachments} attachment{message.attachments !== 1 ? "s" : ""}
                            </span>
                          </div>
                        )}
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="h-7 text-xs">
                              View in Chat
                            </Button>
                            <Button variant="ghost" size="sm" className="h-7 text-xs">
                              Reply
                            </Button>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <Bookmark className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="files" className="p-0 m-0">
                  <div className="p-4 space-y-2">
                    {searchResults.files.map((file: any) => (
                      <div key={file.id} className="border rounded-md p-3 hover:bg-muted/50">
                        <div className="flex items-start">
                          {getFileIcon(file.type)}
                          <div className="ml-3 flex-1">
                            <div className="flex items-center justify-between">
                              <p className="font-medium">
                                {file.name.replace(
                                  new RegExp(searchQuery, "gi"),
                                  (match: string) => `<mark class="bg-yellow-200 dark:bg-yellow-800">${match}</mark>`,
                                )}
                              </p>
                              <div className="flex items-center gap-1">
                                <Button variant="ghost" size="icon" className="h-7 w-7">
                                  <Download className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-7 w-7">
                                  <ExternalLink className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-7 w-7">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <div className="flex items-center text-xs text-muted-foreground mt-1">
                              <span className="mr-2">{file.size}</span>
                              <span className="mr-2">•</span>
                              <span>{file.lastModified}</span>
                            </div>
                            <div className="flex items-center mt-2">
                              <Avatar className="h-5 w-5 mr-1">
                                <AvatarImage src={file.ownerAvatar || "/placeholder.svg"} alt={file.owner} />
                                <AvatarFallback>{file.owner.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <span className="text-xs">{file.owner}</span>
                              <span className="mx-2 text-xs text-muted-foreground">in</span>
                              <span className="text-xs text-muted-foreground">{file.path}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="people" className="p-0 m-0">
                  <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {searchResults.people.map((person: any) => (
                      <div key={person.id} className="border rounded-md p-4 hover:bg-muted/50">
                        <div className="flex items-center">
                          <Avatar className="h-12 w-12 mr-3">
                            <AvatarImage src={person.avatar || "/placeholder.svg"} alt={person.name} />
                            <AvatarFallback>{person.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{person.name}</p>
                            <p className="text-sm text-muted-foreground">{person.role}</p>
                          </div>
                        </div>
                        <div className="mt-3">
                          <p className="text-xs text-muted-foreground mb-1">Expertise:</p>
                          <div className="flex flex-wrap gap-1">
                            {person.expertise.map((skill: string) => (
                              <Badge key={skill} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="mt-3 flex items-center text-xs text-muted-foreground">
                          <Star className="h-3 w-3 mr-1 text-amber-500" />
                          <span>{person.relevance}</span>
                        </div>
                        <div className="mt-3 flex justify-between">
                          <Button variant="outline" size="sm">
                            View Profile
                          </Button>
                          <Button size="sm">Connect</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="events" className="p-0 m-0">
                  <div className="p-4 space-y-4">
                    {searchResults.events.map((event: any) => (
                      <div key={event.id} className="border rounded-md p-4 hover:bg-muted/50">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">{event.title}</h3>
                          <Badge variant="outline">{event.attendees} attending</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Link className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>Organized by {event.organizer}</span>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                          <Button>RSVP</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </ScrollArea>
            </Tabs>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="flex flex-col items-center text-center max-w-md">
              <Search className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
              <h3 className="text-lg font-medium mb-2">Search across all your content</h3>
              <p className="text-muted-foreground mb-4">
                Find messages, files, people, and events across GrowthLab. Type a search term and press Enter.
              </p>
              <div className="flex flex-col items-start text-sm text-muted-foreground space-y-2">
                <div className="flex items-center">
                  <Badge variant="outline" className="mr-2">
                    from:name
                  </Badge>
                  <span>Find messages from a specific person</span>
                </div>
                <div className="flex items-center">
                  <Badge variant="outline" className="mr-2">
                    has:file
                  </Badge>
                  <span>Find messages with files</span>
                </div>
                <div className="flex items-center">
                  <Badge variant="outline" className="mr-2">
                    before:2023-01-01
                  </Badge>
                  <span>Find content before a date</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
