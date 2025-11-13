"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, FileText, Link2, User, ImageIcon } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useCommunication } from "@/hooks/use-communication"
import type { Message } from "@/types/communication"

interface SearchDialogProps {
  isOpen: boolean
  onClose: () => void
  channelId: string
}

export function SearchDialog({ isOpen, onClose, channelId }: SearchDialogProps) {
  const { messages } = useCommunication()
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Message[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  const channelMessages = messages[channelId] || []

  const handleSearch = () => {
    if (!searchQuery.trim()) return

    setIsSearching(true)

    // Simulate search delay
    setTimeout(() => {
      const results = channelMessages.filter((msg) => msg.content.toLowerCase().includes(searchQuery.toLowerCase()))
      setSearchResults(results)
      setIsSearching(false)
    }, 500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date)
  }

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text

    const regex = new RegExp(`(${query})`, "gi")
    const parts = text.split(regex)

    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-yellow-200 dark:bg-yellow-800">
          {part}
        </mark>
      ) : (
        part
      ),
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Search Messages</DialogTitle>
          <DialogDescription>Search for messages, files, and more in this conversation.</DialogDescription>
        </DialogHeader>

        <div className="relative my-2">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search messages..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        <Tabs
          defaultValue="all"
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex-1 min-h-0 flex flex-col"
        >
          <TabsList className="grid grid-cols-6 mb-2">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="files">Files</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="links">Links</TabsTrigger>
            <TabsTrigger value="people">People</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="flex-1 min-h-0 overflow-hidden">
            <ScrollArea className="h-[300px] w-full">
              {isSearching ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-muted-foreground">Searching...</p>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="space-y-4">
                  {searchResults.map((message) => (
                    <div key={message.id} className="border rounded-md p-3 hover:bg-muted/50">
                      <div className="flex items-center mb-2">
                        <span className="font-medium">{message.sender.name}</span>
                        <span className="text-xs text-muted-foreground ml-2">{formatDate(message.timestamp)}</span>
                      </div>
                      <p className="text-sm">{highlightText(message.content, searchQuery)}</p>
                    </div>
                  ))}
                </div>
              ) : searchQuery ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <Search className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="font-medium">No results found</p>
                  <p className="text-sm text-muted-foreground">Try different keywords or check your spelling</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <Search className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="font-medium">Search for messages</p>
                  <p className="text-sm text-muted-foreground">Enter keywords to search through this conversation</p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="messages" className="flex-1 min-h-0">
            <div className="flex flex-col items-center justify-center h-[300px] text-center">
              <FileText className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="font-medium">Message search</p>
              <p className="text-sm text-muted-foreground">Search for specific messages in this conversation</p>
            </div>
          </TabsContent>

          <TabsContent value="files" className="flex-1 min-h-0">
            <div className="flex flex-col items-center justify-center h-[300px] text-center">
              <FileText className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="font-medium">File search</p>
              <p className="text-sm text-muted-foreground">
                Search for documents and files shared in this conversation
              </p>
            </div>
          </TabsContent>

          <TabsContent value="images" className="flex-1 min-h-0">
            <div className="flex flex-col items-center justify-center h-[300px] text-center">
              <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="font-medium">Image search</p>
              <p className="text-sm text-muted-foreground">Search for images shared in this conversation</p>
            </div>
          </TabsContent>

          <TabsContent value="links" className="flex-1 min-h-0">
            <div className="flex flex-col items-center justify-center h-[300px] text-center">
              <Link2 className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="font-medium">Link search</p>
              <p className="text-sm text-muted-foreground">Search for links shared in this conversation</p>
            </div>
          </TabsContent>

          <TabsContent value="people" className="flex-1 min-h-0">
            <div className="flex flex-col items-center justify-center h-[300px] text-center">
              <User className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="font-medium">People search</p>
              <p className="text-sm text-muted-foreground">Search for people mentioned in this conversation</p>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex items-center justify-between mt-4">
          <div className="text-xs text-muted-foreground">
            {searchResults.length > 0 && `${searchResults.length} results found`}
          </div>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
