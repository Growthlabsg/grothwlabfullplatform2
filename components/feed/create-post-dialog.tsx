"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ImageIcon, Link2, FileText, Calendar, X, Smile, Hash, Users, Globe, AlertCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface CreatePostDialogProps {
  trigger?: React.ReactNode
  className?: string
  onPostCreated?: (data: { text: string; tags: string[]; images: string[]; video: string | null }) => void
}

const SUGGESTED_TAGS = [
  "startup", "entrepreneurship", "funding", "innovation", "tech", "business", 
  "growth", "networking", "mentorship", "investing", "product", "marketing",
  "healthtech", "fintech", "ai", "blockchain", "sustainability", "diversity"
]

const AUDIENCE_OPTIONS = [
  { value: "anyone", label: "Anyone", icon: Globe, description: "Visible to everyone" },
  { value: "connections", label: "Connections", icon: Users, description: "Visible to your connections only" }
]

export function CreatePostDialog({ trigger, className, onPostCreated }: CreatePostDialogProps) {
  const [open, setOpen] = useState(false)
  const [postText, setPostText] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState("")
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [links, setLinks] = useState<string[]>([])
  const [showLinkInput, setShowLinkInput] = useState(false)
  const [linkUrl, setLinkUrl] = useState("")
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [audience, setAudience] = useState<"anyone" | "connections">("anyone")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const [characterCount, setCharacterCount] = useState(0)
  const [showTagSuggestions, setShowTagSuggestions] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const MAX_CHARACTERS = 2000
  const MAX_TAGS = 10
  const MAX_LINKS = 3

  useEffect(() => {
    setCharacterCount(postText.length)
  }, [postText])

  const validateForm = (): string[] => {
    const newErrors: string[] = []
    
    if (!postText.trim() && selectedImages.length === 0 && !selectedVideo && links.length === 0) {
      newErrors.push("Please add some content to your post")
    }
    
    if (postText.length > MAX_CHARACTERS) {
      newErrors.push(`Post text cannot exceed ${MAX_CHARACTERS} characters`)
    }
    
    if (tags.length > MAX_TAGS) {
      newErrors.push(`Maximum ${MAX_TAGS} tags allowed`)
    }
    
    if (links.length > MAX_LINKS) {
      newErrors.push(`Maximum ${MAX_LINKS} links allowed`)
    }
    
    // Validate links
    links.forEach((link, index) => {
      try {
        new URL(link)
      } catch {
        newErrors.push(`Invalid link format at position ${index + 1}`)
      }
    })
    
    return newErrors
  }

  const handleAddTag = () => {
    const cleanTag = currentTag.trim().toLowerCase().replace(/\s+/g, '')
    
    if (cleanTag && !tags.includes(cleanTag) && tags.length < MAX_TAGS) {
      setTags([...tags, cleanTag])
      setCurrentTag("")
      setShowTagSuggestions(false)
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentTag) {
      e.preventDefault()
      handleAddTag()
    } else if (e.key === "Escape") {
      setShowTagSuggestions(false)
    }
  }

  const handleTagSuggestion = (tag: string) => {
    if (!tags.includes(tag) && tags.length < MAX_TAGS) {
      setTags([...tags, tag])
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      // Validate file types and sizes
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
      const maxSize = 5 * 1024 * 1024 // 5MB
      const maxImages = 10
      
      if (selectedImages.length + files.length > maxImages) {
        setErrors([`Maximum ${maxImages} images allowed`])
        return
      }
      
      const validFiles = files.filter(file => {
        if (!validTypes.includes(file.type)) {
          setErrors(["Please select valid image files (JPEG, PNG, GIF, or WebP)"])
          return false
        }
        
        if (file.size > maxSize) {
          setErrors(["Image size must be less than 5MB"])
          return false
        }
        
        return true
      })
      
      if (validFiles.length > 0) {
        setErrors([])
        validFiles.forEach(file => {
          const reader = new FileReader()
          reader.onload = () => {
            setSelectedImages(prev => [...prev, reader.result as string])
          }
          reader.readAsDataURL(file)
        })
      }
    }
  }

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type and size
      const validTypes = ['video/mp4', 'video/webm', 'video/ogg']
      const maxSize = 100 * 1024 * 1024 // 100MB
      
      if (!validTypes.includes(file.type)) {
        setErrors(["Please select a valid video file (MP4, WebM, or OGG)"])
        return
      }
      
      if (file.size > maxSize) {
        setErrors(["Video size must be less than 100MB"])
        return
      }
      
      if (selectedImages.length > 0) {
        setErrors(["Cannot upload both images and video. Please choose one."])
        return
      }
      
      setErrors([])
      const reader = new FileReader()
      reader.onload = () => {
        setSelectedVideo(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerImageUpload = () => {
    fileInputRef.current?.click()
  }

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index))
  }

  const removeVideo = () => {
    setSelectedVideo(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleAddLink = () => {
    const cleanUrl = linkUrl.trim()
    if (cleanUrl && links.length < MAX_LINKS) {
      try {
        // Ensure URL has protocol
        const url = cleanUrl.startsWith('http') ? cleanUrl : `https://${cleanUrl}`
        new URL(url) // Validate URL
        setLinks([...links, url])
        setLinkUrl("")
        setShowLinkInput(false)
        setErrors([])
      } catch {
        setErrors(["Please enter a valid URL"])
      }
    }
  }

  const handleRemoveLink = (linkToRemove: string) => {
    setLinks(links.filter((link) => link !== linkToRemove))
  }

  const handlePost = async () => {
    const validationErrors = validateForm()
    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)
    setErrors([])

    try {
      const mergedText = [postText.trim(), ...links].filter(Boolean).join("\n")
      const payload = { text: mergedText, tags, images: selectedImages, video: selectedVideo }
      
      await onPostCreated?.(payload)
      
      // Reset form and close dialog
      setPostText("")
      setTags([])
      setSelectedImages([])
      setSelectedVideo(null)
      setLinks([])
      setShowLinkInput(false)
      setLinkUrl("")
      setShowEmojiPicker(false)
      setAudience("anyone")
      setOpen(false)
    } catch (error) {
      setErrors(["Failed to create post. Please try again."])
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      // Reset form when closing
      setPostText("")
      setTags([])
      setSelectedImages([])
      setSelectedVideo(null)
      setLinks([])
      setShowLinkInput(false)
      setLinkUrl("")
      setShowEmojiPicker(false)
      setErrors([])
    }
    setOpen(newOpen)
  }

  const isFormValid = postText.trim().length > 0 || selectedImages.length > 0 || selectedVideo || links.length > 0

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <div className="flex items-center gap-3 p-4 bg-card rounded-lg border shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" alt="User" />
              <AvatarFallback className="bg-[#0F7377] text-white">U</AvatarFallback>
            </Avatar>
            <Button
              variant="outline"
              className="h-10 w-full justify-start text-muted-foreground rounded-full"
              onClick={() => setOpen(true)}
              data-testid="create-post-trigger"
            >
              Start a post
            </Button>
          </div>
        )}
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Create a Post</DialogTitle>
          <DialogDescription>
            Share your thoughts, updates, or achievements with the GrowthLab community
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Audience Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Who can see this post?</Label>
            <div className="grid grid-cols-2 gap-3">
              {AUDIENCE_OPTIONS.map((option) => {
                const Icon = option.icon
                return (
                  <Button
                    key={option.value}
                    variant={audience === option.value ? "default" : "outline"}
                    className={cn(
                      "justify-start h-auto p-3",
                      audience === option.value 
                        ? "bg-[#0F7377] hover:bg-[#0F7377]/90 text-white" 
                        : "hover:bg-gray-50"
                    )}
                    onClick={() => setAudience(option.value as "anyone" | "connections")}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    <div className="text-left">
                      <div className="font-medium">{option.label}</div>
                      <div className="text-xs opacity-80">{option.description}</div>
                    </div>
                  </Button>
                )
              })}
            </div>
          </div>

          {/* Post Content */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder-user.jpg" alt="User" />
                <AvatarFallback className="bg-[#0F7377] text-white">U</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  ref={textareaRef}
                  placeholder="What's on your mind? Share your startup journey, ask for advice, or celebrate milestones..."
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                  className="min-h-[120px] resize-none border-0 focus-visible:ring-0 text-base"
                  maxLength={MAX_CHARACTERS}
                />
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>Posting as <strong>You</strong></span>
                  <span className={cn(
                    characterCount > MAX_CHARACTERS * 0.9 ? "text-orange-500" : "",
                    characterCount > MAX_CHARACTERS * 0.95 ? "text-red-500" : ""
                  )}>
                    {characterCount}/{MAX_CHARACTERS}
                  </span>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Tags (optional)</Label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add tags to help others discover your post..."
                    value={currentTag}
                    onChange={(e) => {
                      setCurrentTag(e.target.value)
                      setShowTagSuggestions(e.target.value.length > 0)
                    }}
                    onKeyDown={handleKeyDown}
                    className="flex-1"
                  />
                  <Button 
                    size="sm" 
                    onClick={handleAddTag}
                    disabled={!currentTag.trim() || tags.length >= MAX_TAGS}
                    className="bg-[#0F7377] hover:bg-[#0F7377]/90 text-white"
                  >
                    <Hash className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* Tag Suggestions */}
                {showTagSuggestions && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-2">Suggested tags:</div>
                    <div className="flex flex-wrap gap-2">
                      {SUGGESTED_TAGS
                        .filter(tag => !tags.includes(tag) && tag.includes(currentTag.toLowerCase()))
                        .slice(0, 8)
                        .map(tag => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors"
                            onClick={() => handleTagSuggestion(tag)}
                          >
                            #{tag}
                          </Badge>
                        ))}
                    </div>
                  </div>
                )}

                {/* Current Tags */}
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-primary/10 text-primary hover:bg-primary/20"
                      >
                        #{tag}
                        <button
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-1 hover:text-red-500 transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                    <span className="text-xs text-muted-foreground self-center">
                      {tags.length}/{MAX_TAGS}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Media Upload */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Add Media (optional)</Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (fileInputRef.current) {
                      fileInputRef.current.accept = "image/*"
                      fileInputRef.current.multiple = true
                      fileInputRef.current.click()
                    }
                  }}
                  className="gap-2"
                  disabled={selectedVideo !== null}
                >
                  <ImageIcon className="h-4 w-4" />
                  Upload Images
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (fileInputRef.current) {
                      fileInputRef.current.accept = "video/*"
                      fileInputRef.current.multiple = false
                      fileInputRef.current.click()
                    }
                  }}
                  className="gap-2"
                  disabled={selectedImages.length > 0}
                >
                  <FileText className="h-4 w-4" />
                  Upload Video
                </Button>
              </div>
              
              {/* Hidden file inputs */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
              
              {/* Selected Images */}
              {selectedImages.length > 0 && (
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">
                    {selectedImages.length} image{selectedImages.length !== 1 ? 's' : ''} selected
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedImages.map((image, index) => (
                      <div key={index} className="relative rounded-lg overflow-hidden border">
                        <img
                          src={image}
                          alt={`Selected ${index + 1}`}
                          className="w-full h-32 object-cover"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 h-6 w-6 p-0 bg-white/80 hover:bg-white"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Selected Video */}
              {selectedVideo && (
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Video selected</div>
                  <div className="relative rounded-lg overflow-hidden border">
                    <video
                      src={selectedVideo}
                      className="w-full max-h-[300px] object-cover"
                      controls
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={removeVideo}
                      className="absolute top-2 right-2 h-6 w-6 p-0 bg-white/80 hover:bg-white"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Links */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Add Links (optional)</Label>
              <div className="space-y-2">
                {!showLinkInput && links.length < MAX_LINKS && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowLinkInput(true)}
                    className="gap-2"
                  >
                    <Link2 className="h-4 w-4" />
                    Add Link
                  </Button>
                )}
                
                {showLinkInput && (
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter URL..."
                      value={linkUrl}
                      onChange={(e) => setLinkUrl(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleAddLink()}
                      className="flex-1"
                    />
                    <Button 
                      size="sm" 
                      onClick={handleAddLink}
                      disabled={!linkUrl.trim()}
                      className="bg-[#0F7377] hover:bg-[#0F7377]/90 text-white"
                    >
                      Add
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        setShowLinkInput(false)
                        setLinkUrl("")
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                )}

                {/* Current Links */}
                {links.length > 0 && (
                  <div className="space-y-2">
                    {links.map((link, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                        <Link2 className="h-4 w-4 text-blue-500" />
                        <a 
                          href={link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline flex-1 truncate"
                        >
                          {link}
                        </a>
                        <button
                          onClick={() => handleRemoveLink(link)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    <span className="text-xs text-muted-foreground">
                      {links.length}/{MAX_LINKS} links
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Error Display */}
            {errors.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="flex items-center gap-2 text-red-700 mb-2">
                  <AlertCircle className="h-4 w-4" />
                  <span className="font-medium">Please fix the following errors:</span>
                </div>
                <ul className="text-sm text-red-600 space-y-1">
                  {errors.map((error, index) => (
                    <li key={index}>• {error}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Success Preview */}
            {isFormValid && errors.length === 0 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-center gap-2 text-green-700">
                  <CheckCircle className="h-4 w-4" />
                  <span className="font-medium">Post ready to publish!</span>
                </div>
                <p className="text-sm text-green-600 mt-1">
                  Your post will be visible to {audience === "anyone" ? "everyone" : "your connections only"}
                </p>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="gap-3">
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button 
            onClick={handlePost} 
            disabled={!isFormValid || isSubmitting}
            className="bg-[#0F7377] hover:bg-[#0F7377]/90 text-white font-medium px-6 py-2 hover:scale-105 transition-all duration-200"
          >
            {isSubmitting ? "Publishing..." : "Publish Post"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
