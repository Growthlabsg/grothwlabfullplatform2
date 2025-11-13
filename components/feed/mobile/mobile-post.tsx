"use client"

import { useState } from "react"
import Image from "next/image"
import { ThumbsUp, MessageSquare, Share2, Bookmark, MoreHorizontal, Heart, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import type { Post } from "@/types/feed"

interface MobilePostProps {
  post: Post
}

export function MobilePost({ post }: MobilePostProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked || false)
  const [isSaved, setIsSaved] = useState(post.isSaved || false)
  const [likesCount, setLikesCount] = useState(post.likesCount || 0)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1))
  }

  const handleSave = () => {
    setIsSaved(!isSaved)
  }

  const formattedDate = post.createdAt
    ? formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })
    : post.timestamp || "recently"

  return (
    <Card className="mb-3 overflow-hidden">
      <CardContent className="p-3">
        <div className="flex items-center gap-2 mb-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center">
              <p className="text-sm font-medium">{post.author.name}</p>
              {post.author.isVerified && (
                <Badge variant="outline" className="ml-1 h-4 px-1 bg-blue-50 text-blue-600 border-blue-200">
                  <Award className="h-3 w-3 mr-0.5" />
                  <span className="text-[10px]">Verified</span>
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground">{post.author.role || "Member"}</p>
            <p className="text-xs text-muted-foreground">{formattedDate}</p>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 ml-auto">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        {post.title && <p className="text-sm font-medium mb-2">{post.title}</p>}

        <p className="text-sm mb-3">{post.content}</p>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
        )}

        {post.image && (
          <div className="mb-3 rounded-md overflow-hidden">
            <Image
              src={post.image || "/placeholder.svg"}
              alt="Post image"
              width={400}
              height={300}
              className="w-full object-cover"
            />
          </div>
        )}

        {(likesCount > 0 || (post.commentsCount && post.commentsCount > 0)) && (
          <div className="flex justify-between text-xs text-muted-foreground mb-2 px-1">
            <div className="flex items-center">
              {likesCount > 0 && (
                <div className="flex items-center">
                  <Heart className="h-3 w-3 mr-1 fill-current text-red-500 stroke-red-500" />
                  <span>{likesCount}</span>
                </div>
              )}
            </div>
            {post.commentsCount && post.commentsCount > 0 && <div>{post.commentsCount} comments</div>}
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t">
          <Button
            variant="ghost"
            size="sm"
            className={`h-8 px-2 ${isLiked ? "text-primary" : ""}`}
            onClick={handleLike}
          >
            <ThumbsUp className={`h-4 w-4 mr-1 ${isLiked ? "fill-current" : ""}`} />
            <span className="text-xs">Like</span>
          </Button>
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <MessageSquare className="h-4 w-4 mr-1" />
            <span className="text-xs">Comment</span>
          </Button>
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <Share2 className="h-4 w-4 mr-1" />
            <span className="text-xs">Share</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`h-8 px-2 ${isSaved ? "text-primary" : ""}`}
            onClick={handleSave}
          >
            <Bookmark className={`h-4 w-4 mr-1 ${isSaved ? "fill-current" : ""}`} />
            <span className="text-xs">Save</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
