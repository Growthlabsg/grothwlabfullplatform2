"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Share2, Globe, Users, Lock } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/contexts/auth-context"
import type { Post } from "@/types/feed"

interface RepostDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  post: Post
}

export function RepostDialog({ open, onOpenChange, post }: RepostDialogProps) {
  const [comment, setComment] = useState("")
  const [visibility, setVisibility] = useState("connections")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const { user } = useAuth()

  const handleRepost = async () => {
    if (!user) return

    setIsSubmitting(true)

    try {
      // In a real app, this would call an API to repost
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Post shared",
        description: "The post has been shared with your network.",
      })

      onOpenChange(false)
      setComment("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to share the post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Share Post</DialogTitle>
          <DialogDescription>Share this post with your network or specific groups</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={user?.avatarUrl || "/placeholder.svg"} alt={user?.displayName || "User"} />
              <AvatarFallback>{user?.displayName ? user.displayName.charAt(0) : "U"}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{user?.displayName || "User"}</p>
              <div className="flex items-center text-xs text-muted-foreground">
                <Select value={visibility} onValueChange={setVisibility}>
                  <SelectTrigger className="h-auto p-0 border-0 bg-transparent text-xs font-normal shadow-none">
                    <div className="flex items-center">
                      {visibility === "public" && <Globe className="h-3 w-3 mr-1" />}
                      {visibility === "connections" && <Users className="h-3 w-3 mr-1" />}
                      {visibility === "private" && <Lock className="h-3 w-3 mr-1" />}
                      <SelectValue />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 mr-2" />
                        <div>
                          <p>Public</p>
                          <p className="text-xs text-muted-foreground">Anyone on GrowthLab</p>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="connections">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        <div>
                          <p>Connections</p>
                          <p className="text-xs text-muted-foreground">Only your connections</p>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="private">
                      <div className="flex items-center">
                        <Lock className="h-4 w-4 mr-2" />
                        <div>
                          <p>Private</p>
                          <p className="text-xs text-muted-foreground">Only you</p>
                        </div>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Textarea
            placeholder="Add a comment (optional)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-[100px]"
          />

          <Card className="border-dashed">
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={post.author.avatarUrl || "/placeholder.svg"} alt={post.author.displayName} />
                  <AvatarFallback>{post.author.displayName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <span className="font-medium">{post.author.displayName}</span>
                  <span className="text-muted-foreground"> • {post.author.designation}</span>
                </div>
              </div>
              <div className="mt-2 text-sm line-clamp-3">{post.content}</div>
              {post.attachments && post.attachments.length > 0 && (post.attachments[0] ? post.attachments[0].type : undefined) === "image" && (
                <div className="mt-2 h-20 bg-muted rounded-md overflow-hidden">
                  <img
                    src={(post.attachments[0] ? post.attachments[0].url : undefined) || "/placeholder.svg"}
                    alt="Post attachment"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleRepost} disabled={isSubmitting} className="gap-2">
            <Share2 className="h-4 w-4" />
            {isSubmitting ? "Sharing..." : "Share"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
