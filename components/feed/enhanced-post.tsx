"use client"

import { useState } from "react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import {
  ThumbsUp,
  MessageSquare,
  RefreshCw,
  Send,
  Share2,
  MoreHorizontal,
  Globe,
  Building,
  Bookmark,
  BookmarkX,
  Flag,
  Bell,
  BellOff,
  Link2,
  Eye,
  EyeOff,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Post } from "@/types/feed"

interface EnhancedPostProps {
  post: Post
}

export function EnhancedPost({ post }: EnhancedPostProps) {
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [followed, setFollowed] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likes)
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleLike = () => {
    if (liked) {
      setLikeCount((prev) => prev - 1)
    } else {
      setLikeCount((prev) => prev + 1)
    }
    setLiked(!liked)
  }

  const toggleSave = () => {
    setSaved(!saved)
  }

  const toggleFollow = () => {
    setFollowed(!followed)
  }

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : ""
    try {
      if (navigator.share) {
        await navigator.share({ title: post.author.name, text: post.content.slice(0, 120), url })
        return
      }
      await navigator.clipboard.writeText(url)
    } catch {
      // noop
    }
  }

  const formatTimestamp = (timestamp: string) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true })
    } catch (error) {
      return "recently"
    }
  }

  // Show a preview of the content if it's longer than 280 characters
  const contentPreview = post.content.length > 280 && !isExpanded ? post.content.slice(0, 280) + "..." : post.content
  const hasLongContent = post.content.length > 280

  return (
    <div className="bg-card border rounded-lg overflow-hidden">
      <div className="p-4">
        {/* Author Info */}
        <div className="flex justify-between">
          <div className="flex space-x-3">
            <Link
              href={post.author.isBusinessPage ? `/business/${post.author.id}` : `/profile/${post.author.id}`}
              className="shrink-0"
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </Link>
            <div>
              <div className="flex items-center">
                <Link
                  href={post.author.isBusinessPage ? `/business/${post.author.id}` : `/profile/${post.author.id}`}
                  className="font-medium hover:underline"
                >
                  {post.author.name}
                </Link>
                {post.author.verified && (
                  <Badge variant="outline" className="ml-2 bg-primary/10 text-primary text-xs">
                    Verified
                  </Badge>
                )}
                {post.author.isBusinessPage && (
                  <Badge variant="outline" className="ml-2 text-xs">
                    <Building className="h-3 w-3 mr-1" />
                    Page
                  </Badge>
                )}
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <span>{post.author.headline}</span>
                <span className="mx-1">•</span>
                <span>{formatTimestamp(post.timestamp)}</span>
                <span className="mx-1">•</span>
                <Globe className="h-3 w-3" />
              </div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <MoreHorizontal className="h-5 w-5" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={toggleSave}>
                {saved ? (
                  <>
                    <BookmarkX className="mr-2 h-4 w-4" /> Remove from saved
                  </>
                ) : (
                  <>
                    <Bookmark className="mr-2 h-4 w-4" /> Save post
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link2 className="mr-2 h-4 w-4" /> Copy link to post
              </DropdownMenuItem>
              {post.author.isBusinessPage && (
                <DropdownMenuItem onClick={toggleFollow}>
                  {followed ? (
                    <>
                      <BellOff className="mr-2 h-4 w-4" /> Unfollow {post.author.name}
                    </>
                  ) : (
                    <>
                      <Bell className="mr-2 h-4 w-4" /> Follow {post.author.name}
                    </>
                  )}
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" /> Who can see this post?
              </DropdownMenuItem>
              <DropdownMenuItem>
                <EyeOff className="mr-2 h-4 w-4" /> Hide this post
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                <Flag className="mr-2 h-4 w-4" /> Report this post
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Post Content */}
        <div className="mt-3">
          <div className="whitespace-pre-line">
            {contentPreview}
            {hasLongContent && (
              <button type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-primary font-medium hover:underline ml-1"
              >
                {isExpanded ? "Show less" : "See more"}
              </button>
            )}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {post.tags.map((tag, i) => (
                <Link href={`/tag/${tag}`} key={i}>
                  <Badge variant="secondary" className="hover:bg-secondary/80">
                    #{tag}
                  </Badge>
                </Link>
              ))}
            </div>
          )}

          {/* Image */}
          {post.image && (
            <div className="mt-3">
              <img
                src={post.image || "/placeholder.svg"}
                alt="Post attachment"
                className="rounded-md w-full h-auto max-h-[400px] object-cover"
              />
            </div>
          )}
        </div>

        {/* Engagement Stats */}
        <div className="flex justify-between items-center mt-3 text-xs text-muted-foreground">
          <div className="flex items-center">
            <div className="flex items-center">
              <ThumbsUp className="h-3 w-3 mr-1 fill-primary text-primary" />
              <span>{likeCount}</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span>{post.comments} comments</span>
            <span>{post.reposts} reposts</span>
          </div>
        </div>

        <Separator className="my-3" />

        {/* Engagement Buttons */}
        <div className="flex justify-between">
          <Button variant="ghost" size="sm" className={`flex-1 ${liked ? "text-primary" : ""}`} onClick={toggleLike}>
            <ThumbsUp className={`mr-2 h-4 w-4 ${liked ? "fill-primary" : ""}`} />
            {liked ? "Liked" : "Like"}
          </Button>
          <Button variant="ghost" size="sm" className="flex-1">
            <MessageSquare className="mr-2 h-4 w-4" />
            Comment
          </Button>
          <Button variant="ghost" size="sm" className="flex-1">
            <RefreshCw className="mr-2 h-4 w-4" />
            Repost
          </Button>
          <Button variant="ghost" size="sm" className="flex-1" onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </div>
    </div>
  )
}
