"use client"

import { useState } from "react"
import { X, ImageIcon, FileText, Calendar, BarChart, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/contexts/auth-context"

interface MobileCreatePostDialogProps {
  onClose: () => void
}

export function MobileCreatePostDialog({ onClose }: MobileCreatePostDialogProps) {
  const [content, setContent] = useState("")
  const { user } = useAuth()

  const handleSubmit = () => {
    // Handle post submission
    console.log("Submitting post:", content)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex flex-col">
      <div className="bg-white rounded-t-lg mt-auto max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-semibold">Create a post</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-4 flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={user?.avatarUrl || "/placeholder.svg?height=40&width=40&query=abstract profile"}
              alt={user?.displayName || "User"}
            />
            <AvatarFallback>{user?.displayName ? user.displayName.charAt(0) : "U"}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{user?.displayName || "User"}</p>
            <Button variant="outline" size="sm" className="mt-1 h-6 text-xs rounded-full">
              Anyone
            </Button>
          </div>
        </div>

        <div className="p-4 flex-1 overflow-auto">
          <Textarea
            placeholder="What do you want to talk about?"
            className="min-h-[150px] border-none shadow-none resize-none text-base"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="p-4 border-t">
          <div className="flex justify-between mb-4">
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                <ImageIcon className="h-5 w-5 text-blue-600" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                <FileText className="h-5 w-5 text-blue-600" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                <Calendar className="h-5 w-5 text-blue-600" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                <BarChart className="h-5 w-5 text-blue-600" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                <MoreHorizontal className="h-5 w-5 text-blue-600" />
              </Button>
            </div>
            <Button disabled={!content.trim()} onClick={handleSubmit} className="rounded-full">
              Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
