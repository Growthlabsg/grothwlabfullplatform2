"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { X, ImageIcon, FileText, Link2, BarChart2, Calendar } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface MobileCreatePostProps {
  onClose: () => void
}

export function MobileCreatePost({ onClose }: MobileCreatePostProps) {
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user } = useAuth()

  const handleSubmit = async () => {
    if (!content.trim()) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Reset and close
    setContent("")
    setIsSubmitting(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="font-semibold">Create Post</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex items-center gap-3 p-4">
        <Avatar className="h-10 w-10">
          <AvatarImage
            src={user?.avatarUrl || "/placeholder.svg?height=40&width=40&query=abstract profile"}
            alt={user?.displayName || "User"}
          />
          <AvatarFallback>{user?.displayName ? user.displayName.charAt(0) : "U"}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{user?.displayName || "User"}</p>
          <Button variant="outline" size="sm" className="h-6 text-xs mt-1">
            Public
          </Button>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-auto">
        <Textarea
          placeholder="What do you want to talk about?"
          className="w-full min-h-[150px] border-none resize-none text-base focus-visible:ring-0 p-0"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          autoFocus
        />
      </div>

      <div className="p-4 border-t">
        <div className="flex justify-between mb-4">
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
              <ImageIcon className="h-5 w-5 text-blue-500" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
              <FileText className="h-5 w-5 text-green-500" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
              <Link2 className="h-5 w-5 text-purple-500" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
              <BarChart2 className="h-5 w-5 text-orange-500" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
              <Calendar className="h-5 w-5 text-red-500" />
            </Button>
          </div>
        </div>

        <Button
          className="w-full bg-[#0F7377] hover:bg-[#0a5c5f]"
          disabled={!content.trim() || isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting ? "Posting..." : "Post"}
        </Button>
      </div>
    </div>
  )
}
