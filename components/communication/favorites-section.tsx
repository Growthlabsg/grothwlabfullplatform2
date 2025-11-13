"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Plus, X, MoreHorizontal, Pin, MessageSquare, Phone, Video } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface FavoriteItem {
  id: string
  type: "contact" | "channel" | "group"
  name: string
  avatar?: string
  status?: "online" | "offline" | "away" | "busy"
  lastMessage?: string
  lastMessageTime?: Date
  unreadCount?: number
  pinned?: boolean
}

interface FavoritesSectionProps {
  className?: string
  onItemClick?: (item: FavoriteItem) => void
  onAddFavorite?: () => void
}

export function FavoritesSection({ className, onItemClick, onAddFavorite }: FavoritesSectionProps) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([
    {
      id: "fav1",
      type: "contact",
      name: "Sarah Chen",
      avatar: "/abstract-geometric-shapes.png",
      status: "online",
      lastMessage: "I've shared the pitch deck template with you.",
      lastMessageTime: new Date(Date.now() - 3600000 * 2),
      unreadCount: 2,
      pinned: true,
    },
    {
      id: "fav2",
      type: "channel",
      name: "product-team",
      lastMessage: "Alex: Let's discuss the new features tomorrow.",
      lastMessageTime: new Date(Date.now() - 3600000 * 5),
      unreadCount: 0,
      pinned: true,
    },
    {
      id: "fav3",
      type: "group",
      name: "Marketing Team",
      avatar: "/physical-therapy-session.png",
      lastMessage: "Mei: I've updated the campaign assets.",
      lastMessageTime: new Date(Date.now() - 3600000 * 24),
      unreadCount: 0,
      pinned: false,
    },
    {
      id: "fav4",
      type: "contact",
      name: "Alex Wong",
      avatar: "/abstract-geometric-aw.png",
      status: "away",
      lastMessage: "Let me know when you're free to chat.",
      lastMessageTime: new Date(Date.now() - 3600000 * 48),
      unreadCount: 0,
      pinned: false,
    },
  ])

  const handleRemoveFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setFavorites((prev) => prev.filter((fav) => fav.id !== id))
  }

  const handleTogglePin = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setFavorites((prev) => prev.map((fav) => (fav.id === id ? { ...fav, pinned: !fav.pinned } : fav)))
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    } else if (diffInHours < 48) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" })
    }
  }

  const sortedFavorites = [...favorites].sort((a, b) => {
    // First sort by pinned status
    if (a.pinned && !b.pinned) return -1
    if (!a.pinned && b.pinned) return 1

    // Then sort by unread count
    if ((a.unreadCount || 0) > (b.unreadCount || 0)) return -1
    if ((a.unreadCount || 0) < (b.unreadCount || 0)) return 1

    // Then sort by last message time
    if (a.lastMessageTime && b.lastMessageTime) {
      return b.lastMessageTime.getTime() - a.lastMessageTime.getTime()
    }

    return 0
  })

  return (
    <div className={cn("border rounded-md overflow-hidden", className)}>
      <div className="p-3 border-b flex items-center justify-between">
        <div className="flex items-center">
          <Star className="h-4 w-4 mr-2 text-yellow-500" />
          <h3 className="font-medium">Favorites</h3>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onAddFavorite}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="h-[300px]">
        <div className="p-2 space-y-1">
          {sortedFavorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 text-center p-4">
              <Star className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">No favorites yet</p>
              <Button variant="link" size="sm" className="mt-2" onClick={onAddFavorite}>
                Add favorites
              </Button>
            </div>
          ) : (
            sortedFavorites.map((favorite) => (
              <div
                key={favorite.id}
                className="flex items-center p-2 rounded-md hover:bg-muted cursor-pointer group"
                onClick={() => onItemClick?.(favorite)}
              >
                <div className="relative mr-3 flex-shrink-0">
                  {favorite.type === "channel" ? (
                    <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                  ) : (
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={favorite.avatar || "/placeholder.svg"} alt={favorite.name} />
                      <AvatarFallback>{favorite.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  )}

                  {favorite.status && (
                    <div
                      className={cn(
                        "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background",
                        favorite.status === "online" && "bg-green-500",
                        favorite.status === "away" && "bg-yellow-500",
                        favorite.status === "busy" && "bg-red-500",
                        favorite.status === "offline" && "bg-gray-500",
                      )}
                    />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="font-medium truncate">{favorite.name}</span>
                      {favorite.pinned && <Pin className="h-3 w-3 ml-1 text-muted-foreground" />}
                    </div>
                    {favorite.lastMessageTime && (
                      <span className="text-xs text-muted-foreground">{formatTime(favorite.lastMessageTime)}</span>
                    )}
                  </div>

                  {favorite.lastMessage && (
                    <p className="text-xs text-muted-foreground truncate">{favorite.lastMessage}</p>
                  )}
                </div>

                {favorite.unreadCount ? (
                  <div className="ml-2 bg-primary text-primary-foreground rounded-full h-5 min-w-5 flex items-center justify-center text-xs px-1">
                    {favorite.unreadCount}
                  </div>
                ) : (
                  <div className="ml-2 opacity-0 group-hover:opacity-100 flex items-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={(e) => handleTogglePin(favorite.id, e)}>
                          <Pin className="h-4 w-4 mr-2" />
                          {favorite.pinned ? "Unpin" : "Pin"}
                        </DropdownMenuItem>

                        {favorite.type === "contact" && (
                          <>
                            <DropdownMenuItem>
                              <Phone className="h-4 w-4 mr-2" />
                              Call
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Video className="h-4 w-4 mr-2" />
                              Video call
                            </DropdownMenuItem>
                          </>
                        )}

                        <DropdownMenuSeparator />

                        <DropdownMenuItem onClick={(e) => handleRemoveFavorite(favorite.id, e)}>
                          <X className="h-4 w-4 mr-2" />
                          Remove from favorites
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
