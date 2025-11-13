"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EnhancedCreatePostDialog } from "./enhanced-create-post-dialog"
import { useAuth } from "@/contexts/auth-context"
import { ImageIcon, FileText, Calendar, BarChart2, Bell, Filter } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { FeedFilterDialog } from "./feed-filter-dialog"

interface EnhancedFeedHeaderProps {
  onOpenScheduler: () => void
  onOpenNotifications: () => void
}

export function EnhancedFeedHeader({ onOpenScheduler, onOpenNotifications }: EnhancedFeedHeaderProps) {
  const [createPostOpen, setCreatePostOpen] = useState(false)
  const [filterDialogOpen, setFilterDialogOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState("all")
  const [unreadNotifications, setUnreadNotifications] = useState(5)
  const { user } = useAuth()

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={user?.avatarUrl || "/placeholder.svg"} alt={user?.displayName || "User"} />
            <AvatarFallback>{user?.displayName ? user.displayName.charAt(0) : "U"}</AvatarFallback>
          </Avatar>
          <Button
            variant="outline"
            className="w-full justify-start text-muted-foreground h-10 px-4"
            onClick={() => setCreatePostOpen(true)}
          >
            Start a post
          </Button>
        </div>

        <div className="flex justify-between mt-3">
          <Button variant="ghost" size="sm" onClick={() => setCreatePostOpen(true)}>
            <ImageIcon className="h-4 w-4 mr-2 text-blue-500" />
            <span>Photo</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setCreatePostOpen(true)}>
            <FileText className="h-4 w-4 mr-2 text-green-500" />
            <span>Document</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={onOpenScheduler}>
            <Calendar className="h-4 w-4 mr-2 text-orange-500" />
            <span>Schedule</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setCreatePostOpen(true)}>
            <BarChart2 className="h-4 w-4 mr-2 text-purple-500" />
            <span>Poll</span>
          </Button>
        </div>
      </Card>

      <div className="flex items-center justify-between">
        <Tabs defaultValue={activeFilter} onValueChange={setActiveFilter} className="w-full">
          <TabsList className="grid grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="connections">Connections</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2 ml-2">
          <Button variant="outline" size="icon" onClick={() => setFilterDialogOpen(true)}>
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="relative" onClick={onOpenNotifications}>
            <Bell className="h-4 w-4" />
            {unreadNotifications > 0 && (
              <Badge
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                variant="destructive"
              >
                {unreadNotifications > 9 ? "9+" : unreadNotifications}
              </Badge>
            )}
          </Button>
        </div>
      </div>

      <EnhancedCreatePostDialog open={createPostOpen} onOpenChange={setCreatePostOpen} />
      <FeedFilterDialog open={filterDialogOpen} onOpenChange={setFilterDialogOpen} />
    </div>
  )
}
