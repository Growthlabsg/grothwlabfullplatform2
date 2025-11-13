"use client"

import type { ReactNode } from "react"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, MapPin, Briefcase, Award, UserPlus, UserCheck } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import {
  areUsersConnected,
  isFollowing,
  sendConnectionRequest,
  followUser,
  unfollowUser,
} from "@/lib/connection-service"
import { useUserActivity } from "@/hooks/use-user-activity"
import type { PostAuthor } from "@/types/feed"

interface ProfileHoverCardProps {
  user: PostAuthor
  children: ReactNode
}

export function ProfileHoverCard({ user, children }: ProfileHoverCardProps) {
  const { user: currentUser } = useAuth()
  const { trackProfileView } = useUserActivity()

  const isConnected = currentUser && areUsersConnected(currentUser.id, user.id)
  const isFollowed = currentUser && isFollowing(user.id)

  const handleConnect = () => {
    if (!currentUser) return
    sendConnectionRequest(currentUser.id, user.id)
  }

  const handleFollow = () => {
    if (!currentUser) return
    if (isFollowed) {
      unfollowUser(currentUser.id, user.id)
    } else {
      followUser(currentUser.id, user.id)
    }
  }

  const handleCardOpen = () => {
    if (currentUser) {
      trackProfileView(user.id)
    }
  }

  return (
    <HoverCard onOpenChange={(open) => open && handleCardOpen()}>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.avatarUrl || "/placeholder.svg"} />
            <AvatarFallback>{user.displayName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1 flex-1">
            <div className="flex items-center">
              <h4 className="text-sm font-semibold">{user.displayName}</h4>
              {user.isVerified && (
                <Badge variant="outline" className="ml-2 text-xs px-1 py-0 h-5 bg-primary/10 text-primary">
                  <Award className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              )}
            </div>
            {user.designation && (
              <p className="text-sm flex items-center text-muted-foreground">
                <Briefcase className="h-3 w-3 mr-1" />
                {user.designation}
              </p>
            )}
            <p className="text-sm flex items-center text-muted-foreground">
              <MapPin className="h-3 w-3 mr-1" />
              Singapore
            </p>
            <p className="text-sm flex items-center text-muted-foreground">
              <CalendarDays className="h-3 w-3 mr-1" />
              Joined April 2023
            </p>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          {currentUser && currentUser.id !== user.id && (
            <>
              {isConnected ? (
                <Button variant="outline" size="sm" className="w-full">
                  <UserCheck className="h-4 w-4 mr-2" />
                  Connected
                </Button>
              ) : (
                <Button variant="default" size="sm" className="w-full" onClick={handleConnect}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Connect
                </Button>
              )}
              <Button
                variant={isFollowed ? "outline" : "secondary"}
                size="sm"
                className="w-full"
                onClick={handleFollow}
              >
                {isFollowed ? "Following" : "Follow"}
              </Button>
            </>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
