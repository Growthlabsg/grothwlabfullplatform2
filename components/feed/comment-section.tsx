"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Heart, MoreHorizontal } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { ProfileHoverCard } from "./profile-hover-card"
import { ReportButton } from "./report-button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface CommentSectionProps {
  comments: any[]
  postId: string
}

export function CommentSection({ comments, postId }: CommentSectionProps) {
  const [commentText, setCommentText] = useState("")
  const [localComments, setLocalComments] = useState(comments)

  const handleAddComment = () => {
    if (!commentText.trim()) return

    const newComment = {
      id: `temp-${Date.now()}`,
      author: {
        id: "current-user",
        name: "Current User",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content: commentText,
      createdAt: new Date().toISOString(),
      likes: 0,
    }

    setLocalComments([...localComments, newComment])
    setCommentText("")
  }

  return (
    <div className="px-4 py-2 border-t">
      <div className="flex gap-2 mb-4">
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Your avatar" />
          <AvatarFallback>YA</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Textarea
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="min-h-[60px] resize-none"
          />
          <div className="flex justify-end mt-2">
            <Button size="sm" onClick={handleAddComment} disabled={!commentText.trim()}>
              Comment
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {localComments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  )
}

function Comment({ comment }: { comment: any }) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(comment.likes)

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1)
    } else {
      setLikeCount(likeCount + 1)
    }
    setLiked(!liked)
  }

  return (
    <div className="flex gap-2">
      <ProfileHoverCard user={comment.author}>
        <Avatar className="h-8 w-8">
          <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
          <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
        </Avatar>
      </ProfileHoverCard>
      <div className="flex-1">
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="flex justify-between items-start">
            <ProfileHoverCard user={comment.author}>
              <div className="font-semibold hover:underline cursor-pointer">{comment.author.name}</div>
            </ProfileHoverCard>
            <div className="flex items-center">
              <ReportButton contentId={comment.id} contentType="comment" className="h-6 w-6 mr-1" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <MoreHorizontal className="h-3 w-3" />
                    <span className="sr-only">More options</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Copy text</DropdownMenuItem>
                  <DropdownMenuItem>Hide comment</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <p className="text-sm mt-1">{comment.content}</p>
        </div>
        <div className="flex items-center gap-4 mt-1 ml-2">
          <Button
            variant="ghost"
            size="sm"
            className={`h-6 px-2 text-xs ${liked ? "text-red-500" : ""}`}
            onClick={handleLike}
          >
            <Heart className={`h-3 w-3 mr-1 ${liked ? "fill-current" : ""}`} />
            <span>{likeCount > 0 ? likeCount : "Like"}</span>
          </Button>
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
          </span>
        </div>
      </div>
    </div>
  )
}
