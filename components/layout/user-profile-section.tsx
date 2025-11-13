"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, LogOut, Settings, Shield, User } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

export function UserProfileSection() {
  const { user, logout } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const [notificationCount, setNotificationCount] = useState(5) // Mock notification count

  const handleLogout = async () => {
    try {
      await logout()
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      })
      // Redirect to home page after logout to ensure sidebar updates correctly
      router.push("/")
    } catch (error) {
      console.error("Logout error:", error)
      toast({
        title: "Logout failed",
        description: "There was an error logging out. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link href="/login">Sign In</Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link href="/signup">Sign Up</Link>
        </Button>
        <Button size="sm" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white" asChild>
          <Link href="/accelerator/apply">Apply to GrowthLab</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-4">
      <Button variant="outline" size="sm" className="relative" asChild>
        <Link href="/notifications">
          <Bell className="h-4 w-4" />
          {notificationCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white">
              {notificationCount}
            </Badge>
          )}
          <span className="sr-only">Notifications</span>
        </Link>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?key=user" alt={user.displayName || "User"} />
              <AvatarFallback>
                {user.displayName
                  ? user.displayName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                  : "U"}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.displayName || "User"}</p>
              <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/settings/profile" className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings/security" className="cursor-pointer">
              <Shield className="mr-2 h-4 w-4" />
              <span>Security</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings" className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
