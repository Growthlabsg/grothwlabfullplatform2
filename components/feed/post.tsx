"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ProfileHoverCard } from "./profile-hover-card"
import { PollOption } from "./poll-option"
import { RepostDialog } from "./repost-dialog"
import { ReportButton } from "./report-button"
import { useUserActivity } from "@/hooks/use-user-activity"
import { useAuth } from "@/contexts/auth-context"
import { areUsersConnected, isFollowing } from "@/lib/connection-service"
import { formatDistanceToNow } from "date-fns"
import {
  MessageSquare,
  ThumbsUp,
  Share,
  Bookmark,
  MoreHorizontal,
  Calendar,
  MapPin,
  Link2,
  FileText,
  Award,
  AlertTriangle,
  Eye,
} from "lucide-react"
import type { Post as PostType } from "@/types/feed"

interface PostProps {
  post: PostType
  onEngagement?: (action: "like" | "comment" | "share" | "save") => void
}

export function Post({ post, onEngagement }: PostProps) {
  const [liked, setLiked] = useState(post.isLiked || false)
  const [likesCount, setLikesCount] = useState(post.likesCount || 0)
  const [saved, setSaved] = useState(post.isSaved || false)
  const [repostDialogOpen, setRepostDialogOpen] = useState(false)
  const { trackPostView, trackPostEngagement } = useUserActivity()
  const { user } = useAuth()

  // Check if the post author is connected to the current user
  const isConnected = user ? areUsersConnected(user.id, post.author.id) : false
  const isFollowed = user ? isFollowing(post.author.id) : false

  // Track post view
  useState(() => {
    if (user) {
      trackPostView(post.id, post.author.id)
    }
  })

  const handleLike = () => {
    setLiked(!liked)
    setLikesCount(liked ? likesCount - 1 : likesCount + 1)

    if (user) {
      trackPostEngagement(post.id, "like", post.author.id)
    }

    if (onEngagement) {
      onEngagement("like")
    }
  }

  const handleComment = () => {
    if (user) {
      trackPostEngagement(post.id, "comment", post.author.id)
    }

    if (onEngagement) {
      onEngagement("comment")
    }
  }

  const handleShare = () => {
    setRepostDialogOpen(true)

    if (user) {
      trackPostEngagement(post.id, "share", post.author.id)
    }

    if (onEngagement) {
      onEngagement("share")
    }
  }

  const handleSave = () => {
    setSaved(!saved)

    if (user) {
      trackPostEngagement(post.id, "save", post.author.id)
    }

    if (onEngagement) {
      onEngagement("save")
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between">
          <div className="flex items-start gap-3">
            <ProfileHoverCard user={post.author}>
              <Avatar className="cursor-pointer">
                <AvatarImage src={post.author.avatarUrl || "/placeholder.svg"} alt={post.author.displayName} />
                <AvatarFallback>{post.author.displayName.charAt(0)}</AvatarFallback>
              </Avatar>
            </ProfileHoverCard>
            <div>
              <div className="flex items-center gap-2">
                <ProfileHoverCard user={post.author}>
                  <span className="font-semibold cursor-pointer hover:underline">{post.author.displayName}</span>
                </ProfileHoverCard>

                {post.author.isVerified && (
                  <Badge variant="outline" className="text-xs px-1 py-0 h-5 bg-primary/10 text-primary">
                    <Award className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}

                {(isConnected || isFollowed) && (
                  <Badge variant="outline" className="text-xs px-1 py-0 h-5">
                    {isConnected ? "Connection" : "Following"}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{post.author.designation}</span>
                <span>•</span>
                <span>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</span>

                {post.isRecommended && (
                  <>
                    <span>•</span>
                    <span className="flex items-center">
                      <Eye className="h-3 w-3 mr-1" />
                      Recommended
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <ReportButton contentId={post.id} contentType="post" />
            <Button variant="ghost" size="icon" aria-label="Post options">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="space-y-4">
          {post.content && <div className="whitespace-pre-line">{post.content}</div>}

          {post.attachments && post.attachments.length > 0 && (
            <div className="space-y-2">
              {post.attachments.map((attachment, index) => (
                <div key={index}>
                  {attachment.type === "image" && (
                    <img
                      src={attachment.url || "/placeholder.svg"}
                      alt="Post attachment"
                      className="rounded-md w-full object-cover max-h-[400px]"
                    />
                  )}
                  {attachment.type === "document" && (
                    <div className="flex items-center gap-2 p-3 border rounded-md">
                      <FileText className="h-5 w-5 text-primary" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{attachment.name}</p>
                        <p className="text-xs text-muted-foreground">{attachment.size}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  )}
                  {attachment.type === "link" && (
                    <div className="flex items-start gap-3 p-3 border rounded-md">
                      {attachment.image ? (
                        <img
                          src={attachment.image || "/placeholder.svg"}
                          alt={attachment.title || "Link preview"}
                          className="w-20 h-20 object-cover rounded-md"
                        />
                      ) : (
                        <div className="w-20 h-20 bg-muted rounded-md flex items-center justify-center">
                          <Link2 className="h-8 w-8 text-muted-foreground" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{attachment.title || "Untitled Link"}</p>
                        {attachment.description && (
                          <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{attachment.description}</p>
                        )}
                        <p className="text-xs text-primary mt-1 truncate">{attachment.url}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {post.poll && (
            <div className="space-y-2 pt-2">
              <p className="font-medium">{post.poll.question}</p>
              <div className="space-y-2">
                {post.poll.options.map((option, index) => (
                  <PollOption
                    key={index}
                    option={option}
                    totalVotes={post.poll.totalVotes}
                    isVoted={post.poll.voted}
                    onVote={() => {}}
                  />
                ))}
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                <span>{post.poll.totalVotes} votes</span>
                {post.poll.endsAt && (
                  <span className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {formatDistanceToNow(new Date(post.poll.endsAt), { addSuffix: true })}
                  </span>
                )}
              </div>
            </div>
          )}

          {post.event && (
            <div className="border rounded-md p-4 space-y-3">
              <div className="space-y-1">
                <h3 className="font-semibold">{post.event.title}</h3>
                <p className="text-sm text-muted-foreground">{post.event.description}</p>
              </div>
              <div className="flex flex-wrap gap-3 text-sm">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-primary" />
                  <span>
                    {new Date(post.event.startDate).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                    {post.event.endDate &&
                      ` - ${new Date(post.event.endDate).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}`}
                  </span>
                </div>
                {post.event.location && (
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-primary" />
                    <span>{post.event.location}</span>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Button size="sm">Register</Button>
                <Button size="sm" variant="outline">
                  Add to Calendar
                </Button>
              </div>
            </div>
          )}

          {post.isFlagged && (
            <div className="bg-destructive/10 text-destructive p-3 rounded-md flex items-center gap-2 text-sm">
              <AlertTriangle className="h-4 w-4" />
              <span>
                This post has been flagged for review by our moderation team. It may contain content that violates our
                community guidelines.
              </span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="w-full space-y-2">
          {(post.likesCount > 0 || post.commentsCount > 0) && (
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center">
                <ThumbsUp className="h-3 w-3 mr-1" />
                <span>{likesCount} likes</span>
              </div>
              <div>{post.commentsCount} comments</div>
            </div>
          )}
          <Separator />
          <div className="grid grid-cols-4 gap-1 sm:flex sm:justify-between">
            <Button variant="ghost" size="sm" className="col-span-1 flex-1" onClick={handleLike}>
              {liked ? (
                <ThumbsUp className="h-4 w-4 mr-2 fill-primary text-primary" />
              ) : (
                <ThumbsUp className="h-4 w-4 mr-2" />
              )}
              Like
            </Button>
            <Button variant="ghost" size="sm" className="col-span-1 flex-1" onClick={handleComment}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Comment
            </Button>
            <Button variant="ghost" size="sm" className="col-span-1 flex-1" onClick={handleShare}>
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="ghost" size="sm" className="col-span-1 flex-1" onClick={handleSave}>
              {saved ? (
                <Bookmark className="h-4 w-4 mr-2 fill-primary text-primary" />
              ) : (
                <Bookmark className="h-4 w-4 mr-2" />
              )}
              Save
            </Button>
          </div>
        </div>
      </CardFooter>

      <RepostDialog open={repostDialogOpen} onOpenChange={setRepostDialogOpen} post={post} />
    </Card>
  )
}
