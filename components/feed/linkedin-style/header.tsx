"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import {
  Bell,
  Home,
  LogOut,
  MessageSquare,
  Search,
  Settings,
  Shield,
  User,
  Users,
  Briefcase,
  MenuIcon,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/components/ui/use-toast"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useRouter } from "next/navigation"

interface LinkedInStyleHeaderProps {
  onCreatePost?: () => void
}

export function LinkedInStyleHeader({ onCreatePost }: LinkedInStyleHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const { user, logout } = useAuth()
  const { toast } = useToast()
  const pathname = usePathname()
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [notificationCount, setNotificationCount] = useState(5) // Mock notification count
  const [messageCount, setMessageCount] = useState(3) // Mock message count
  const router = useRouter()

  const handleSearch = () => {
    if (!searchQuery.trim()) return
    console.log("Searching for:", searchQuery)
    // In a real app, this would trigger a search
  }

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

  const isActive = (path: string) => pathname === path

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Search */}
          <div className="flex items-center flex-1">
            <Link href="/" className="mr-4">
              <img src="/images/GrowthLab Icon (1).png" alt="GrowthLab" className="h-8 w-8" />
            </Link>
            {!isMobile && (
              <div className="relative flex-1 max-w-md">
                <Input
                  type="text"
                  placeholder="Search..."
                  className={`${isMobile ? "w-full" : "w-64"} h-9`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch()
                    }
                  }}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            )}
          </div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="flex items-center space-x-1">
              <Link
                href="/feed"
                className={`flex flex-col items-center justify-center px-3 py-2 ${
                  isActive("/feed") ? "text-primary border-b-2 border-primary" : "text-muted-foreground"
                }`}
              >
                <Home className="h-5 w-5" />
                <span className="text-xs mt-1">Home</span>
              </Link>
              <Link
                href="/network"
                className={`flex flex-col items-center justify-center px-3 py-2 ${
                  isActive("/network") ? "text-primary border-b-2 border-primary" : "text-muted-foreground"
                }`}
              >
                <Users className="h-5 w-5" />
                <span className="text-xs mt-1">Network</span>
              </Link>
              <Link
                href="/jobs"
                className={`flex flex-col items-center justify-center px-3 py-2 ${
                  isActive("/jobs") ? "text-primary border-b-2 border-primary" : "text-muted-foreground"
                }`}
              >
                <Briefcase className="h-5 w-5" />
                <span className="text-xs mt-1">Jobs</span>
              </Link>
              <Link
                href="/chat"
                className={`flex flex-col items-center justify-center px-3 py-2 relative ${
                  isActive("/chat") ? "text-primary border-b-2 border-primary" : "text-muted-foreground"
                }`}
              >
                <MessageSquare className="h-5 w-5" />
                {messageCount > 0 && (
                  <Badge
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0"
                    variant="destructive"
                  >
                    {messageCount}
                  </Badge>
                )}
                <span className="text-xs mt-1">Chat</span>
              </Link>
              <Link
                href="/notifications"
                className={`flex flex-col items-center justify-center px-3 py-2 relative ${
                  isActive("/notifications") ? "text-primary border-b-2 border-primary" : "text-muted-foreground"
                }`}
              >
                <Bell className="h-5 w-5" />
                {notificationCount > 0 && (
                  <Badge
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0"
                    variant="destructive"
                  >
                    {notificationCount}
                  </Badge>
                )}
                <span className="text-xs mt-1">Notifications</span>
              </Link>
            </nav>
          )}

          {/* User Profile Dropdown */}
          <div className="flex items-center">
            {isMobile && (
              <Button variant="ghost" size="icon" className="mr-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                <MenuIcon className="h-5 w-5" />
              </Button>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatarUrl || "/abstract-headscape.png"} alt={user?.displayName || "User"} />
                    <AvatarFallback>{user?.displayName ? user.displayName.charAt(0) : "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.displayName || "User"}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
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
            {!isMobile && (
              <Button variant="outline" className="ml-4" onClick={onCreatePost}>
                Create Post
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Search and Menu */}
        {isMobile && mobileMenuOpen && (
          <div className="py-2 border-t">
            <div className="relative mb-3">
              <Input
                type="text"
                placeholder="Search..."
                className={`${isMobile ? "w-full" : "w-64"} h-9`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch()
                  }
                }}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/feed"
                className={`flex items-center px-3 py-2 rounded-md ${
                  isActive("/feed") ? "bg-primary/10 text-primary" : "text-muted-foreground"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Home className="h-5 w-5 mr-3" />
                <span>Home</span>
              </Link>
              <Link
                href="/network"
                className={`flex items-center px-3 py-2 rounded-md ${
                  isActive("/network") ? "bg-primary/10 text-primary" : "text-muted-foreground"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Users className="h-5 w-5 mr-3" />
                <span>Network</span>
              </Link>
              <Link
                href="/jobs"
                className={`flex items-center px-3 py-2 rounded-md ${
                  isActive("/jobs") ? "bg-primary/10 text-primary" : "text-muted-foreground"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Briefcase className="h-5 w-5 mr-3" />
                <span>Jobs</span>
              </Link>
              <Link
                href="/chat"
                className={`flex items-center px-3 py-2 rounded-md ${
                  isActive("/chat") ? "bg-primary/10 text-primary" : "text-muted-foreground"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <MessageSquare className="h-5 w-5 mr-3" />
                <span>Chat</span>
                {messageCount > 0 && (
                  <Badge className="ml-auto" variant="destructive">
                    {messageCount}
                  </Badge>
                )}
              </Link>
              <Link
                href="/notifications"
                className={`flex items-center px-3 py-2 rounded-md ${
                  isActive("/notifications") ? "bg-primary/10 text-primary" : "text-muted-foreground"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Bell className="h-5 w-5 mr-3" />
                <span>Notifications</span>
                {notificationCount > 0 && (
                  <Badge className="ml-auto" variant="destructive">
                    {notificationCount}
                  </Badge>
                )}
              </Link>
              <Button className="mt-2" onClick={onCreatePost}>
                Create Post
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export const Header = LinkedInStyleHeader
