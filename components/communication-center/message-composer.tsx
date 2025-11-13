"use client"

import { useState, useRef, type KeyboardEvent } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Clock, Paperclip, Send, Smile, Mic, ImageIcon, AtSign } from "lucide-react"
import { cn } from "@/lib/utils"
import { EmojiPicker } from "./emoji-picker"

interface MessageComposerProps {
  value: string
  onChange: (value: string) => void
  onKeyDown?: (e: KeyboardEvent<HTMLTextAreaElement>) => void
  onSend: () => void
  onSchedule: () => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

export function MessageComposer({
  value,
  onChange,
  onKeyDown,
  onSend,
  onSchedule,
  placeholder = "Type a message...",
  disabled = false,
  className,
}: MessageComposerProps) {
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false)
  const [isAttachmentMenuOpen, setIsAttachmentMenuOpen] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleEmojiSelect = (emoji: string) => {
    // Insert emoji at cursor position if possible
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart
      const end = textareaRef.current.selectionEnd
      const newValue = value.substring(0, start) + emoji + value.substring(end)
      onChange(newValue)

      // Reset focus and move cursor after emoji
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus()
          const newPosition = start + emoji.length
          textareaRef.current.setSelectionRange(newPosition, newPosition)
        }
      }, 10)
    } else {
      // Fallback to just appending emoji
      onChange(value + emoji)
    }
    setIsEmojiPickerOpen(false)
  }

  // Auto-resize textarea based on content
  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 150) + "px"
    }
  }

  return (
    <div className={cn("flex flex-col space-y-2", className)}>
      <div className="rounded-lg border shadow-sm bg-background relative">
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => {
            onChange(e.target.value)
            handleInput()
          }}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="min-h-[60px] max-h-[150px] resize-none border-0 rounded-lg focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none placeholder:text-muted-foreground/70 pb-10"
          onInput={handleInput}
        />

        <div className="absolute bottom-2 left-2 flex items-center gap-1 z-10">
          <Popover open={isEmojiPickerOpen} onOpenChange={setIsEmojiPickerOpen}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full hover:bg-muted/60 transition-colors"
                      aria-label="Add emoji"
                    >
                      <Smile className="h-[18px] w-[18px] text-muted-foreground/70" />
                    </Button>
                  </PopoverTrigger>
                </TooltipTrigger>
                <TooltipContent side="top" align="center">
                  Add emoji
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <PopoverContent className="w-auto p-0" align="start">
              <EmojiPicker onEmojiSelect={handleEmojiSelect} onClose={() => setIsEmojiPickerOpen(false)} />
            </PopoverContent>
          </Popover>

          <Popover open={isAttachmentMenuOpen} onOpenChange={setIsAttachmentMenuOpen}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full hover:bg-muted/60 transition-colors"
                      aria-label="Attach file"
                    >
                      <Paperclip className="h-[18px] w-[18px] text-muted-foreground/70" />
                    </Button>
                  </PopoverTrigger>
                </TooltipTrigger>
                <TooltipContent side="top" align="center">
                  Attach files
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <PopoverContent className="w-auto p-2" align="start">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex flex-col gap-1 h-auto py-2 px-3">
                  <ImageIcon className="h-4 w-4" />
                  <span className="text-xs">Photo</span>
                </Button>
                <Button variant="outline" size="sm" className="flex flex-col gap-1 h-auto py-2 px-3">
                  <Paperclip className="h-4 w-4" />
                  <span className="text-xs">File</span>
                </Button>
                <Button variant="outline" size="sm" className="flex flex-col gap-1 h-auto py-2 px-3">
                  <Mic className="h-4 w-4" />
                  <span className="text-xs">Audio</span>
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full hover:bg-muted/60 transition-colors"
                  onClick={onSchedule}
                  aria-label="Schedule message"
                >
                  <Clock className="h-[18px] w-[18px] text-muted-foreground/70" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" align="center">
                Schedule message
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full hover:bg-muted/60 transition-colors"
                  aria-label="Mention"
                >
                  <AtSign className="h-[18px] w-[18px] text-muted-foreground/70" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" align="center">
                Mention someone
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="absolute bottom-2 right-2">
          <Button
            size="sm"
            onClick={onSend}
            disabled={disabled || !value.trim()}
            className={cn("h-8 w-8 p-0 rounded-full transition-colors", !value.trim() ? "bg-muted/70" : "bg-primary")}
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
