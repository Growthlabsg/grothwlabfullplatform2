"use client"

import { useState } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, MessageSquare, Search, X } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Badge } from "@/components/ui/badge"

export function MobileHeader() {
  const [showSearch, setShowSearch] = useState(false)
  const { user } = useAuth()
  const unreadNotifications = 3 // This would come from a notifications context
  const unreadMessages = 2 // This would come from a messages context

  if (showSearch) {
    return (
      <div className="flex items-center gap-2 p-3 border-b bg-white sticky top-0 z-10">
        <Button variant="ghost" size="icon" onClick={() => setShowSearch(false)}>
          <X className="h-5 w-5" />
        </Button>
        <Input placeholder="Search" className="flex-1" autoFocus />
      </div>
    )
  }

  return (
    <header className="flex items-center justify-between p-3 border-b bg-white sticky top-0 z-10">
      <div className="flex items-center">
        <Link href="/" className="mr-3">
          <img src="/images/GrowthLab Icon (1).png" alt="GrowthLab" className="h-8 w-8" />
        </Link>
        <Button
          variant="outline"
          size="sm"
          className="rounded-full h-8 text-muted-foreground"
          onClick={() => setShowSearch(true)}
        >
          <Search className="h-4 w-4 mr-2" />
          <span className="text-sm">Search</span>
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <MessageSquare className="h-5 w-5" />
          {unreadMessages > 0 && (
            <Badge
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
              variant="destructive"
            >
              {unreadMessages}
            </Badge>
          )}
        </Button>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadNotifications > 0 && (
            <Badge
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
              variant="destructive"
            >
              {unreadNotifications}
            </Badge>
          )}
        </Button>

        <Avatar className="h-8 w-8">
          <AvatarImage
            src={user?.avatarUrl || "/placeholder.svg?height=32&width=32&query=abstract profile"}
            alt={user?.displayName || "User"}
          />
          <AvatarFallback>{user?.displayName ? user.displayName.charAt(0) : "U"}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
