"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Avatar } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { ImageIcon, FileText, BarChart2, Video, MapPin, Clock, Users, Smile, X, Link as LinkIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface EnhancedCreatePostDialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  onPostCreated?: (data: { content: string; attachments: string[]; scheduledDate?: Date }) => void
}

export function EnhancedCreatePostDialog({ open: controlledOpen, onOpenChange, onPostCreated }: EnhancedCreatePostDialogProps) {
  const [open, setOpen] = useState(controlledOpen ?? false)
  const [postContent, setPostContent] = useState("")
  const [attachments, setAttachments] = useState<string[]>([])
  const [links, setLinks] = useState<string[]>([])
  const [linkUrl, setLinkUrl] = useState("")
  const [showLinkInput, setShowLinkInput] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [audience, setAudience] = useState<"anyone" | "connections">("anyone")
  const [isScheduling, setIsScheduling] = useState(false)
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>(undefined)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // In a real app, you would upload the file to a server and get a URL back
      // For this demo, we'll just use a placeholder
      setAttachments([...attachments, `/placeholder.svg?height=300&width=400&query=uploaded image`])
    }
  }

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index))
  }

  const handlePost = () => {
    // In a real app, you would send the post to a server
    onPostCreated?.({ content: postContent.trim(), attachments, scheduledDate })
    setOpen(false)
    setPostContent("")
    setAttachments([])
    setIsScheduling(false)
    setScheduledDate(undefined)
  }

  // keep internal state in sync with controlled prop
  React.useEffect(() => {
    if (controlledOpen !== undefined) setOpen(controlledOpen)
  }, [controlledOpen])

  return (
    <Dialog open={open} onOpenChange={(o) => { setOpen(o); onOpenChange?.(o) }}>
      <DialogTrigger asChild>
        <div className="flex items-center gap-2 p-4 bg-white rounded-lg border shadow-sm cursor-pointer hover:bg-gray-50">
          <Avatar className="h-10 w-10">
            <img src="/vibrant-street-market.png" alt="User" />
          </Avatar>
          <div className="flex-1">
            <Input
              placeholder="Start a post"
              className="border-none shadow-none focus-visible:ring-0 text-muted-foreground"
              onClick={() => setOpen(true)}
              readOnly
            />
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create a post</DialogTitle>
        </DialogHeader>
        <div className="flex items-start gap-3 mt-4">
          <Avatar className="h-10 w-10">
            <img src="/vibrant-street-market.png" alt="User" />
          </Avatar>
          <div className="flex-1">
            <div className="font-semibold">John Doe</div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="mt-1 text-xs">
                  <Users className="h-3 w-3 mr-1" />
                  {audience === "anyone" ? "Public" : "Connections"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => setAudience("anyone")}>Post to anyone</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setAudience("connections")}>Post to connections</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <Textarea
          placeholder="What do you want to talk about?"
          className="min-h-[120px] resize-none border-none focus-visible:ring-0 text-base"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        />

        {attachments.length > 0 && (
          <div className="grid grid-cols-2 gap-2 mt-2">
            {attachments.map((attachment, index) => (
              <div key={index} className="relative rounded-md overflow-hidden">
                <img src={attachment || "/placeholder.svg"} alt="Attachment" className="w-full h-auto" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1 right-1 h-6 w-6 bg-black/50 hover:bg-black/70"
                  onClick={() => removeAttachment(index)}
                >
                  <X className="h-3 w-3 text-white" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {isScheduling && (
          <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {scheduledDate
                ? `Scheduled for ${format(scheduledDate, "PPP")} at ${format(scheduledDate, "p")}`
                : "Select a date to schedule"}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto h-6 w-6"
              onClick={() => {
                setIsScheduling(false)
                setScheduledDate(undefined)
              }}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileUpload}
              accept="image/*,video/*"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => fileInputRef.current?.click()}
              className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            >
              <ImageIcon className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              onClick={() => setShowLinkInput((v) => !v)}
              aria-label="Add link"
            >
              <LinkIcon className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700 hover:bg-gray-100">
              <Video className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700 hover:bg-gray-100">
              <FileText className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700 hover:bg-gray-100">
              <BarChart2 className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700 hover:bg-gray-100">
              <MapPin className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700 hover:bg-gray-100" onClick={() => setShowEmojiPicker((v) => !v)}>
              <Smile className="h-5 w-5" />
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "text-gray-500 hover:text-gray-700 hover:bg-gray-100",
                    isScheduling && "text-blue-500 hover:text-blue-700",
                  )}
                  onClick={() => setIsScheduling(true)}
                >
                  <Clock className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={scheduledDate} onSelect={setScheduledDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          <Button onClick={handlePost} disabled={!postContent.trim() && attachments.length === 0 && links.length === 0}>
            {isScheduling && scheduledDate ? "Schedule" : "Post"}
          </Button>
        </div>

        {showLinkInput && (
          <div className="flex items-center gap-2 mt-3">
            <Input
              placeholder="https://example.com"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              className="flex-1"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const url = linkUrl.trim()
                if (!url) return
                try {
                  const u = new URL(url.startsWith("http") ? url : `https://${url}`)
                  setLinks((prev) => [u.toString(), ...prev])
                  setLinkUrl("")
                  setShowLinkInput(false)
                } catch {
                  // keep input open; could add toast in future
                }
              }}
            >
              Add Link
            </Button>
          </div>
        )}

        {links.length > 0 && (
          <div className="mt-3 flex flex-col gap-2">
            {links.map((l, i) => (
              <div key={`${l}-${i}`} className="flex items-center justify-between rounded-md border px-3 py-2 text-sm">
                <span className="truncate mr-2">{l}</span>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setLinks((prev) => prev.filter((_, idx) => idx !== i))}>
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        )}
        {showEmojiPicker && (
          <div className="mt-2 grid grid-cols-8 gap-1 text-xl">
            {[
              "😀","😂","😍","👍","🎉","🔥","🚀","💡",
              "🙏","😊","😎","🤝","💼","📈","📣","💬",
            ].map((e) => (
              <button
                key={e}
                type="button"
                className="hover:bg-muted rounded"
                onClick={() => setPostContent((t) => (t ? `${t} ${e}` : e))}
              >
                {e}
              </button>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
