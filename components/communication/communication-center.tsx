"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CommunicationSidebar } from "./communication-sidebar"
import { ChatInterface } from "./chat-interface"
import { RecipientSelector } from "./recipient-selector"
import { EmptyState } from "./empty-state"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"

export function CommunicationCenter() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("individual")
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isSelectingRecipient, setIsSelectingRecipient] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const router = useRouter()

  // Automatically close sidebar on mobile
  useEffect(() => {
    if (!isDesktop) {
      setIsSidebarOpen(false)
    } else {
      setIsSidebarOpen(true)
    }
  }, [isDesktop])

  // Handle new chat creation
  const handleNewChat = () => {
    setIsSelectingRecipient(true)
    if (!isDesktop) {
      setIsSidebarOpen(false)
    }
  }

  // Handle recipient selection
  const handleRecipientSelected = (recipientId: string, recipientType: "individual" | "group") => {
    setIsSelectingRecipient(false)
    setSelectedChat(recipientId)
    setSelectedCategory(recipientType === "individual" ? "individual" : "group")
  }

  // Handle chat selection
  const handleChatSelected = (chatId: string, category: string) => {
    setSelectedChat(chatId)
    setSelectedCategory(category)
    if (!isDesktop) {
      setIsSidebarOpen(false)
    }
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-background">
      {/* Mobile sidebar toggle */}
      {!isDesktop && selectedChat && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 z-30 lg:hidden rounded-full hover:bg-muted/90 transition-colors"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "h-full border-r transition-all duration-300 ease-in-out bg-background/95 backdrop-blur-sm shadow-sm",
          isSidebarOpen ? "w-80 translate-x-0" : "w-0 -translate-x-full lg:w-80 lg:translate-x-0",
          isDesktop ? "relative" : "absolute z-20",
        )}
      >
        {isSidebarOpen && (
          <CommunicationSidebar
            selectedCategory={selectedCategory}
            selectedChat={selectedChat}
            onCategoryChange={setSelectedCategory}
            onChatSelect={handleChatSelected}
            onNewChat={handleNewChat}
          />
        )}
      </div>

      {/* Main content area */}
      <div className="flex-1 overflow-hidden relative">
        {isSelectingRecipient ? (
          <RecipientSelector onSelect={handleRecipientSelected} onCancel={() => setIsSelectingRecipient(false)} />
        ) : selectedChat ? (
          <ChatInterface chatId={selectedChat} category={selectedCategory} />
        ) : (
          <EmptyState onNewChat={handleNewChat} />
        )}
      </div>
    </div>
  )
}
