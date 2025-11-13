"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { formatDistanceToNow } from "date-fns"
import { Heart, MessageCircle, Repeat2, Send, MoreHorizontal, Bookmark, Flag, Link2, Trash2, Edit, Share2, Copy, Check } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Post as PostType } from "@/types/feed"

interface PostProps {
  post: PostType
  className?: string
  onUpdate?: (updates: Partial<PostType>) => void
  onDelete?: () => void
}

interface Comment {
  id: string
  author: {
    id: string
    name: string
    avatar: string
  }
  content: string
  timestamp: string
  likes: number
}

export function Post({ post, className, onUpdate, onDelete }: PostProps) {
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [reposted, setReposted] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likes)
  const [commentCount, setCommentCount] = useState(post.comments)
  const [repostCount, setRepostCount] = useState(post.reposts)
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      author: { id: "user1", name: "Sarah Chen", avatar: "/sarah-chen.png" },
      content: "Congratulations! This is amazing news! 🎉",
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      likes: 5
    },
    {
      id: "2",
      author: { id: "user2", name: "Alex Wong", avatar: "/alex-wong.png" },
      content: "Looking forward to seeing what you build next!",
      timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
      likes: 3
    }
  ])
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(post.content)

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1)
    } else {
      setLikeCount(likeCount + 1)
    }
    setLiked(!liked)
    
    // Update parent component
    if (onUpdate) {
      onUpdate({ likes: liked ? likeCount - 1 : likeCount + 1 })
    }
  }

  const handleRepost = () => {
    if (reposted) {
      setRepostCount(repostCount - 1)
    } else {
      setRepostCount(repostCount + 1)
    }
    setReposted(!reposted)
    
    // Update parent component
    if (onUpdate) {
      onUpdate({ reposts: reposted ? repostCount - 1 : repostCount + 1 })
    }
  }

  const handleBookmark = () => {
    setBookmarked(!bookmarked)
  }

  const handleComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: String(Date.now()),
        author: {
          id: "current-user",
          name: "You",
          avatar: "/placeholder-user.jpg"
        },
        content: newComment.trim(),
        timestamp: new Date().toISOString(),
        likes: 0
      }
      setComments(prev => [comment, ...prev])
      setCommentCount(prev => prev + 1)
      setNewComment("")
      
      // Update parent component
      if (onUpdate) {
        onUpdate({ comments: commentCount + 1 })
      }
    }
  }

  const handleShare = async (platform: string) => {
    const postUrl = `${window.location.origin}/post/${post.id}`
    const text = `${post.content.substring(0, 100)}...`
    
    switch (platform) {
      case "copy":
        try {
          await navigator.clipboard.writeText(postUrl)
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        } catch (err) {
          console.error("Failed to copy:", err)
        }
        break
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(postUrl)}`)
        break
      case "linkedin":
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`)
        break
      case "whatsapp":
        window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + postUrl)}`)
        break
    }
    setShowShareMenu(false)
  }

  const handleEdit = () => {
    if (isEditing) {
      // Save changes
      if (onUpdate) {
        onUpdate({ content: editContent })
      }
    }
    setIsEditing(!isEditing)
  }

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this post?")) {
      if (onDelete) {
        onDelete()
      }
    }
  }

  const copyLink = async () => {
    try {
      const postUrl = `${window.location.origin}/post/${post.id}`
      await navigator.clipboard.writeText(postUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <div className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)}>
      <div className="p-6 space-y-4">
        {/* Post Header */}
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-3">
            <Avatar className="h-12 w-12 border">
              <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
              <AvatarFallback className="bg-[#0F7377] text-white text-sm font-medium">
                {post.author.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <Link href={`/profile/${post.author.id}`} className="font-semibold hover:underline text-[#1E293B]">
                  {post.author.name}
                </Link>
                {post.author.verified && (
                  <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
                    ✓ Verified
                  </Badge>
                )}
              </div>
              <div className="text-sm text-muted-foreground flex items-center gap-1">
                <span>{post.author.headline}</span>
                <span className="text-xs">•</span>
                <span className="text-xs">{formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}</span>
              </div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={handleBookmark}>
                <Bookmark className={cn("mr-2 h-4 w-4", bookmarked && "fill-current text-primary")} />
                <span>{bookmarked ? "Remove bookmark" : "Save post"}</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={copyLink}>
                <Link2 className="mr-2 h-4 w-4" />
                <span>Copy link to post</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowShareMenu(true)}>
                <Share2 className="mr-2 h-4 w-4" />
                <span>Share post</span>
              </DropdownMenuItem>
              {post.author.id === "current-user" && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleEdit}>
                    <Edit className="mr-2 h-4 w-4" />
                    <span>Edit post</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Delete post</span>
                  </DropdownMenuItem>
                </>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Flag className="mr-2 h-4 w-4" />
                <span>Report post</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Post Content */}
        <div className="space-y-3">
          {isEditing ? (
            <div className="space-y-3">
              <Textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="min-h-[100px] resize-none"
                placeholder="What's on your mind?"
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={handleEdit} className="bg-[#0F7377] hover:bg-[#0F7377]/90 text-white">
                  Save
                </Button>
                <Button size="sm" variant="outline" onClick={() => {
                  setIsEditing(false)
                  setEditContent(post.content)
                }}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-sm whitespace-pre-line leading-relaxed">{post.content}</div>
          )}
          
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-secondary/10 text-secondary-foreground hover:bg-secondary/20 cursor-pointer transition-colors"
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          )}
          
          {/* Multiple Images or Video */}
          {post.images && post.images.length > 0 && (
            <div className="mt-3">
              {post.images.length === 1 ? (
                <div className="relative rounded-lg overflow-hidden">
                  <Image
                    src={post.images[0]}
                    alt="Post image"
                    width={600}
                    height={400}
                    className="w-full object-cover max-h-[400px] hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ) : post.images.length === 2 ? (
                <div className="grid grid-cols-2 gap-2">
                  {post.images.map((image, index) => (
                    <div key={index} className="relative rounded-lg overflow-hidden">
                      <Image
                        src={image}
                        alt={`Post image ${index + 1}`}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              ) : post.images.length === 3 ? (
                <div className="grid grid-cols-3 gap-2">
                  {post.images.map((image, index) => (
                    <div key={index} className="relative rounded-lg overflow-hidden">
                      <Image
                        src={image}
                        alt={`Post image ${index + 1}`}
                        width={200}
                        height={150}
                        className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              ) : post.images.length === 4 ? (
                <div className="grid grid-cols-2 gap-2">
                  {post.images.slice(0, 3).map((image, index) => (
                    <div key={index} className="relative rounded-lg overflow-hidden">
                      <Image
                        src={image}
                        alt={`Post image ${index + 1}`}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                  <div className="relative rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-2xl font-bold text-gray-600">+{post.images.length - 3}</span>
                      <p className="text-sm text-gray-500">more</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {post.images.slice(0, 4).map((image, index) => (
                    <div key={index} className="relative rounded-lg overflow-hidden">
                      <Image
                        src={image}
                        alt={`Post image ${index + 1}`}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                  <div className="relative rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-2xl font-bold text-gray-600">+{post.images.length - 4}</span>
                      <p className="text-sm text-gray-500">more</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Video */}
          {post.video && (
            <div className="mt-3">
              <video
                controls
                className="w-full rounded-lg max-h-[400px] bg-black"
                poster="/video-thumbnail-placeholder.png"
              >
                <source src={post.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>

        {/* Post Stats */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <span>{likeCount.toLocaleString()} likes</span>
            <span>•</span>
            <span>{commentCount.toLocaleString()} comments</span>
            <span>•</span>
            <span>{repostCount.toLocaleString()} reposts</span>
          </div>
          {bookmarked && (
            <span className="text-primary flex items-center gap-1">
              <Bookmark className="h-3 w-3 fill-current" />
              Saved
            </span>
          )}
        </div>

        {/* Post Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <Button
            variant="ghost"
            size="sm"
            className={cn("flex-1 gap-2 hover:bg-red-50", liked && "text-red-500 hover:text-red-600")}
            onClick={handleLike}
          >
            <Heart className={cn("h-4 w-4", liked && "fill-current")} />
            <span>{liked ? "Liked" : "Like"}</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex-1 gap-2 hover:bg-blue-50"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageCircle className="h-4 w-4" />
            <span>Comment</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className={cn("flex-1 gap-2 hover:bg-green-50", reposted && "text-green-500 hover:text-green-600")}
            onClick={handleRepost}
          >
            <Repeat2 className="h-4 w-4" />
            <span>{reposted ? "Reposted" : "Repost"}</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex-1 gap-2 hover:bg-purple-50"
            onClick={() => setShowShareMenu(true)}
          >
            <Send className="h-4 w-4" />
            <span>Share</span>
          </Button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="border-t border-gray-100 pt-4 space-y-4">
            <h4 className="font-medium text-sm text-[#1E293B]">Comments ({commentCount})</h4>
            
            {/* Add Comment */}
            <div className="flex gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-user.jpg" alt="You" />
                <AvatarFallback className="bg-[#0F7377] text-white text-xs">Y</AvatarFallback>
              </Avatar>
              <div className="flex-1 flex gap-2">
                <Input
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="flex-1"
                  onKeyPress={(e) => e.key === "Enter" && handleComment()}
                />
                <Button 
                  size="sm" 
                  onClick={handleComment}
                  disabled={!newComment.trim()}
                  className="bg-[#0F7377] hover:bg-[#0F7377]/90 text-white"
                >
                  Post
                </Button>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                    <AvatarFallback className="bg-gray-200 text-gray-700 text-xs">
                      {comment.author.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{comment.author.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}
                        </span>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <button className="hover:text-primary transition-colors">Like</button>
                      <button className="hover:text-primary transition-colors">Reply</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Share Menu Modal */}
        {showShareMenu && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">Share this post</h3>
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-3"
                  onClick={() => handleShare("copy")}
                >
                  {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied!" : "Copy link"}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-3"
                  onClick={() => handleShare("twitter")}
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  Share on X (Twitter)
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-3"
                  onClick={() => handleShare("linkedin")}
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  Share on LinkedIn
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-3"
                  onClick={() => handleShare("whatsapp")}
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  Share on WhatsApp
                </Button>
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={() => setShowShareMenu(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export const LinkedInStylePost = Post
