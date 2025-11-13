"use client"

import { useState } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Search, X } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function MobileHeader() {
  const [showSearch, setShowSearch] = useState(false)
  const { user } = useAuth()
  const unreadNotifications = 3 // This would come from a notifications context

  if (showSearch) {
    return (
      <div className="flex items-center gap-2 p-3 border-b bg-background sticky top-0 z-10">
        <Button variant="ghost" size="icon" onClick={() => setShowSearch(false)}>
          <X className="h-5 w-5" />
        </Button>
        <Input placeholder="Search GrowthLab" className="flex-1" autoFocus />
      </div>
    )
  }

  return (
    <header className="flex items-center justify-between p-3 border-b bg-background sticky top-0 z-10">
      <Link href="/" className="flex items-center">
        <img src="/images/GrowthLab Icon (1).png" alt="GrowthLab" className="h-8 w-8" />
      </Link>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => setShowSearch(true)}>
          <Search className="h-5 w-5" />
        </Button>

        <Sheet>
          <SheetTrigger asChild>
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
          </SheetTrigger>
          <SheetContent side="right">
            <div className="py-4">
              <h2 className="text-lg font-semibold mb-4">Notifications</h2>
              {/* Notification content would go here */}
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">You have {unreadNotifications} new notifications</p>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full p-0 h-8 w-8">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={user?.avatarUrl || "/placeholder.svg?height=32&width=32&query=abstract profile"}
                  alt={user?.displayName || "User"}
                />
                <AvatarFallback>{user?.displayName ? user.displayName.charAt(0) : "U"}</AvatarFallback>
              </Avatar>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="py-4">
              <div className="flex items-center gap-3 mb-6">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={user?.avatarUrl || "/placeholder.svg?height=48&width=48&query=abstract profile"}
                    alt={user?.displayName || "User"}
                  />
                  <AvatarFallback>{user?.displayName ? user.displayName.charAt(0) : "U"}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold">{user?.displayName || "User"}</h2>
                  <p className="text-sm text-muted-foreground">{user?.designation || "No designation"}</p>
                </div>
              </div>

              <nav className="space-y-1">
                <Link href="/profile" className="block p-2 hover:bg-muted rounded-md">
                  View Profile
                </Link>
                <Link href="/settings" className="block p-2 hover:bg-muted rounded-md">
                  Settings
                </Link>
                <Link href="/help" className="block p-2 hover:bg-muted rounded-md">
                  Help Center
                </Link>
                <Button variant="outline" className="w-full mt-4">
                  Sign Out
                </Button>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
