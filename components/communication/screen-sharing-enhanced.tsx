"use client"

import { useState, useEffect, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Monitor,
  AppWindow,
  Layout,
  Check,
  Mic,
  MicOff,
  Copy,
  CheckCircle2,
  Users,
  AlertTriangle,
  Loader2,
  Volume2,
  Maximize2,
  Minimize2,
  Video,
  VideoOff,
  MessageSquare,
  Settings,
  PenTool,
  Eraser,
  MousePointer2,
  Lock,
  ScreenShare,
  PhoneOff,
  Send,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface ScreenShareEnhancedProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  participants?: {
    id: string
    name: string
    avatar?: string
    role: "host" | "presenter" | "participant"
    isActive?: boolean
  }[]
  className?: string
}

interface ShareOption {
  id: string
  type: "screen" | "window" | "application"
  title: string
  thumbnail?: string
  selected: boolean
}

// ShareTime component to display elapsed time
function ShareTime() {
  const [elapsedTime, setElapsedTime] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    return [
      hours > 0 ? String(hours).padStart(2, "0") : null,
      String(minutes).padStart(2, "0"),
      String(secs).padStart(2, "0"),
    ]
      .filter(Boolean)
      .join(":")
  }

  return (
    <div className="flex items-center gap-1 text-sm font-mono">
      <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
      <span>{formatTime(elapsedTime)}</span>
    </div>
  )
}

// Chat message component
function ChatMessage({ message }: { message: any }) {
  return (
    <div className={cn("flex mb-2", message.isMe ? "justify-end" : "justify-start")}>
      {!message.isMe && (
        <Avatar className="h-6 w-6 mr-2">
          <AvatarImage src={message.avatar || "/placeholder.svg"} alt={message.sender} />
          <AvatarFallback>{message.sender.substring(0, 2)}</AvatarFallback>
        </Avatar>
      )}
      <div>
        {!message.isMe && (
          <div className="flex items-center mb-1">
            <span className="text-xs font-medium">{message.sender}</span>
            <span className="text-xs text-muted-foreground ml-1">{message.time}</span>
          </div>
        )}
        <div
          className={cn(
            "rounded-lg p-2 text-sm max-w-[200px]",
            message.isMe ? "bg-primary text-primary-foreground" : "bg-muted",
          )}
        >
          <p>{message.text}</p>
        </div>
      </div>
      {message.isMe && (
        <Avatar className="h-6 w-6 ml-2">
          <AvatarImage src="/vibrant-street-market.png" alt="You" />
          <AvatarFallback>You</AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}

export function ScreenShareEnhanced({ open, onOpenChange, participants = [], className }: ScreenShareEnhancedProps) {
  const [activeTab, setActiveTab] = useState("screen")
  const [isSharing, setIsSharing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [shareOptions, setShareOptions] = useState<ShareOption[]>([])
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [videoEnabled, setVideoEnabled] = useState(false)
  const [optimizeVideo, setOptimizeVideo] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showParticipants, setShowParticipants] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [showAnnotation, setShowAnnotation] = useState(false)
  const [annotationTool, setAnnotationTool] = useState<"pointer" | "pen" | "eraser">("pointer")
  const [chatMessage, setChatMessage] = useState("")
  const [chatMessages, setChatMessages] = useState<any[]>([
    {
      sender: "Sarah Chen",
      avatar: "/abstract-geometric-shapes.png",
      text: "Can everyone see my screen?",
      time: "10:32 AM",
      isMe: false,
    },
    {
      sender: "Alex Wong",
      avatar: "/abstract-geometric-aw.png",
      text: "Yes, it's clear!",
      time: "10:32 AM",
      isMe: false,
    },
    {
      sender: "You",
      avatar: "/vibrant-street-market.png",
      text: "Looks good to me",
      time: "10:33 AM",
      isMe: true,
    },
  ])

  const chatEndRef = useRef<HTMLDivElement>(null)

  // Default participants if none provided
  const defaultParticipants = [
    {
      id: "user1",
      name: "Sarah Chen",
      avatar: "/abstract-geometric-shapes.png",
      role: "host" as const,
      isActive: true,
    },
    {
      id: "user2",
      name: "Alex Wong",
      avatar: "/abstract-geometric-aw.png",
      role: "participant" as const,
      isActive: false,
    },
    {
      id: "user3",
      name: "Mei Lin",
      avatar: "/machine-learning-concept.png",
      role: "participant" as const,
      isActive: false,
    },
  ]

  const allParticipants = participants.length > 0 ? participants : defaultParticipants

  // Mock screen/window options
  useEffect(() => {
    // Simulate loading available screens and windows
    setIsLoading(true)
    setTimeout(() => {
      const mockOptions: ShareOption[] = [
        {
          id: "screen1",
          type: "screen",
          title: "Entire Screen 1",
          thumbnail: "/modern-web-browser-interface.png",
          selected: false,
        },
        {
          id: "screen2",
          type: "screen",
          title: "Entire Screen 2",
          thumbnail: "/bustling-city-intersection.png",
          selected: false,
        },
        {
          id: "window1",
          type: "window",
          title: "GrowthLab - Google Chrome",
          thumbnail: "/modern-code-editor.png",
          selected: false,
        },
        {
          id: "window2",
          type: "window",
          title: "Pitch Deck - Presentation",
          thumbnail: "/financial-projection-growth.png",
          selected: false,
        },
        {
          id: "app1",
          type: "application",
          title: "Figma - Design File",
          thumbnail: "/abstract-colorful-swirls.png",
          selected: false,
        },
        {
          id: "app2",
          type: "application",
          title: "Terminal",
          thumbnail: "/airport-terminal-waiting.png",
          selected: false,
        },
      ]
      setShareOptions(mockOptions)
      setIsLoading(false)
    }, 1000)

    // Clean up if dialog is closed
    return () => {
      if (!open) {
        setIsSharing(false)
        setSelectedOption(null)
        setError(null)
      }
    }
  }, [open, activeTab])

  // Scroll to bottom of chat when new messages arrive
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [chatMessages])

  // Handle selection of a share option
  const handleSelect = (id: string) => {
    setShareOptions((prev) =>
      prev.map((option) => ({
        ...option,
        selected: option.id === id,
      })),
    )
    setSelectedOption(id)
    setError(null)
  }

  // Handle start sharing
  const handleStartSharing = () => {
    if (!selectedOption) {
      setError("Please select what you want to share")
      return
    }

    setIsLoading(true)
    // Simulate starting screen share
    setTimeout(() => {
      setIsSharing(true)
      setIsLoading(false)
    }, 1500)
  }

  // Handle stop sharing
  const handleStopSharing = () => {
    setIsLoading(true)
    // Simulate stopping screen share
    setTimeout(() => {
      setIsSharing(false)
      setIsLoading(false)
      onOpenChange(false)
    }, 1000)
  }

  // Handle copy invite link
  const handleCopyInviteLink = () => {
    navigator.clipboard.writeText("https://growthlab.sg/share/abc123")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Toggle fullscreen
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  // Handle send chat message
  const handleSendChatMessage = () => {
    if (!chatMessage.trim()) return

    setChatMessages([
      ...chatMessages,
      {
        sender: "You",
        avatar: "/vibrant-street-market.png",
        text: chatMessage,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isMe: true,
      },
    ])

    setChatMessage("")

    // Simulate response after a delay
    if (Math.random() > 0.5) {
      setTimeout(
        () => {
          const responders = [
            { name: "Sarah Chen", avatar: "/abstract-geometric-shapes.png" },
            { name: "Alex Wong", avatar: "/abstract-geometric-aw.png" },
            { name: "Mei Lin", avatar: "/machine-learning-concept.png" },
          ]
          const responder = responders[Math.floor(Math.random() * responders.length)]
          const responses = [
            "Thanks for sharing!",
            "That's interesting.",
            "Could you explain that part again?",
            "Great point!",
            "I have a question about that.",
          ]
          const response = responses[Math.floor(Math.random() * responses.length)]

          setChatMessages((prev) => [
            ...prev,
            {
              sender: responder.name,
              avatar: responder.avatar,
              text: response,
              time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              isMe: false,
            },
          ])
        },
        2000 + Math.random() * 3000,
      )
    }
  }

  return (
    <Dialog open={open} onOpenChange={(value) => !isLoading && onOpenChange(value)}>
      <DialogContent
        className={cn(
          "sm:max-w-[700px] max-h-[90vh] flex flex-col",
          isFullscreen && "sm:max-w-[95vw] w-[95vw] h-[90vh] max-h-[90vh]",
        )}
      >
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>{isSharing ? "Screen Sharing" : "Share Your Screen"}</DialogTitle>
            <div className="flex items-center gap-2">
              {isSharing && (
                <>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" onClick={toggleFullscreen}>
                          {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>{isFullscreen ? "Exit Fullscreen" : "Fullscreen"}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" onClick={() => setShowParticipants(!showParticipants)}>
                          <Users className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Participants</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" onClick={() => setShowChat(!showChat)}>
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Chat</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </>
              )}
            </div>
          </div>
        </DialogHeader>

        {isSharing ? (
          // Currently sharing UI
          <div className="flex flex-col space-y-4">
            <div className="border rounded-md p-4 bg-muted/30">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-green-500 text-white border-green-500">
                    Live
                  </Badge>
                  <p className="text-sm font-medium">You are currently sharing your screen</p>
                </div>
                <ShareTime />
              </div>

              <div className="flex gap-4">
                <div
                  className={cn(
                    "aspect-video rounded-md overflow-hidden relative border bg-black flex-1",
                    showParticipants && "w-3/4",
                    showChat && "w-2/3",
                  )}
                >
                  <img
                    src="/modern-code-editor.png"
                    alt="Screen Share Preview"
                    className="w-full h-full object-cover opacity-90"
                  />

                  {/* Annotation overlay */}
                  {showAnnotation && (
                    <div className="absolute inset-0 pointer-events-auto">
                      <div className="absolute top-2 left-2 bg-black/50 rounded-md p-1 flex space-x-1">
                        <Button
                          variant={annotationTool === "pointer" ? "default" : "ghost"}
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => setAnnotationTool("pointer")}
                        >
                          <MousePointer2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant={annotationTool === "pen" ? "default" : "ghost"}
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => setAnnotationTool("pen")}
                        >
                          <PenTool className="h-4 w-4" />
                        </Button>
                        <Button
                          variant={annotationTool === "eraser" ? "default" : "ghost"}
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => setAnnotationTool("eraser")}
                        >
                          <Eraser className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className="absolute bottom-3 right-3">
                    <Badge variant="outline" className="bg-black/70 text-white border-transparent">
                      Your Screen
                    </Badge>
                  </div>
                </div>

                {/* Participants panel */}
                {showParticipants && (
                  <div className="w-1/4 border rounded-md overflow-hidden">
                    <div className="bg-muted/50 p-2 border-b">
                      <h3 className="text-sm font-medium">Participants ({allParticipants.length})</h3>
                    </div>
                    <ScrollArea className="h-[300px]">
                      <div className="p-2 space-y-2">
                        {allParticipants.map((participant) => (
                          <div
                            key={participant.id}
                            className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50"
                          >
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.name} />
                                <AvatarFallback>{participant.name.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium">{participant.name}</p>
                                <Badge variant="outline" className="text-xs">
                                  {participant.role}
                                </Badge>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {participant.isActive && (
                                <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                                  Viewing
                                </Badge>
                              )}
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Volume2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                )}

                {/* Chat panel */}
                {showChat && (
                  <div className="w-1/3 border rounded-md overflow-hidden flex flex-col">
                    <div className="bg-muted/50 p-2 border-b">
                      <h3 className="text-sm font-medium">Chat</h3>
                    </div>
                    <ScrollArea className="flex-1 p-2 h-[250px]">
                      <div className="space-y-2">
                        {chatMessages.map((message, index) => (
                          <ChatMessage key={index} message={message} />
                        ))}
                        <div ref={chatEndRef} />
                      </div>
                    </ScrollArea>
                    <div className="p-2 border-t">
                      <div className="flex items-center gap-2">
                        <Input
                          placeholder="Type a message..."
                          value={chatMessage}
                          onChange={(e) => setChatMessage(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault()
                              handleSendChatMessage()
                            }
                          }}
                        />
                        <Button size="icon" onClick={handleSendChatMessage} disabled={!chatMessage.trim()}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setAudioEnabled(!audioEnabled)}
                          className={!audioEnabled ? "bg-red-100 dark:bg-red-900/20 text-red-500" : ""}
                        >
                          {audioEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>{audioEnabled ? "Mute Audio" : "Unmute Audio"}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setVideoEnabled(!videoEnabled)}
                          className={!videoEnabled ? "bg-red-100 dark:bg-red-900/20 text-red-500" : ""}
                        >
                          {videoEnabled ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>{videoEnabled ? "Turn Off Camera" : "Turn On Camera"}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setShowAnnotation(!showAnnotation)}
                          className={showAnnotation ? "bg-blue-100 dark:bg-blue-900/20 text-blue-500" : ""}
                        >
                          <PenTool className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        {showAnnotation ? "Hide Annotation Tools" : "Show Annotation Tools"}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <Button variant="outline" size="sm" onClick={handleCopyInviteLink}>
                    {copied ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Invite Link
                      </>
                    )}
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                  <Button variant="destructive" onClick={handleStopSharing} disabled={isLoading}>
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <PhoneOff className="h-4 w-4 mr-2" />
                    )}
                    End Sharing
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Share selection UI
          <div className="flex flex-col space-y-4">
            <Tabs defaultValue="screen" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="screen">
                  <Monitor className="h-4 w-4 mr-2" />
                  Entire Screen
                </TabsTrigger>
                <TabsTrigger value="window">
                  <AppWindow className="h-4 w-4 mr-2" />
                  Window
                </TabsTrigger>
                <TabsTrigger value="application">
                  <Layout className="h-4 w-4 mr-2" />
                  Application
                </TabsTrigger>
              </TabsList>

              {isLoading ? (
                <div className="h-[300px] flex items-center justify-center">
                  <div className="flex flex-col items-center">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Loading available sources...</p>
                  </div>
                </div>
              ) : (
                <>
                  <TabsContent value="screen" className="mt-4">
                    <ScrollArea className="h-[300px]">
                      <div className="grid grid-cols-2 gap-4">
                        {shareOptions
                          .filter((option) => option.type === "screen")
                          .map((option) => (
                            <div
                              key={option.id}
                              className={cn(
                                "border rounded-md p-2 cursor-pointer hover:bg-muted/50 transition-colors",
                                option.selected && "border-primary bg-primary/5",
                              )}
                              onClick={() => handleSelect(option.id)}
                            >
                              <div className="relative">
                                <img
                                  src={option.thumbnail || "/placeholder.svg"}
                                  alt={option.title}
                                  className="w-full h-auto aspect-video object-cover rounded-md mb-2"
                                />
                                {option.selected && (
                                  <div className="absolute top-2 right-2 h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                                    <Check className="h-4 w-4 text-white" />
                                  </div>
                                )}
                              </div>
                              <p className="text-sm font-medium truncate">{option.title}</p>
                            </div>
                          ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="window" className="mt-4">
                    <ScrollArea className="h-[300px]">
                      <div className="grid grid-cols-2 gap-4">
                        {shareOptions
                          .filter((option) => option.type === "window")
                          .map((option) => (
                            <div
                              key={option.id}
                              className={cn(
                                "border rounded-md p-2 cursor-pointer hover:bg-muted/50 transition-colors",
                                option.selected && "border-primary bg-primary/5",
                              )}
                              onClick={() => handleSelect(option.id)}
                            >
                              <div className="relative">
                                <img
                                  src={option.thumbnail || "/placeholder.svg"}
                                  alt={option.title}
                                  className="w-full h-auto aspect-video object-cover rounded-md mb-2"
                                />
                                {option.selected && (
                                  <div className="absolute top-2 right-2 h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                                    <Check className="h-4 w-4 text-white" />
                                  </div>
                                )}
                              </div>
                              <p className="text-sm font-medium truncate">{option.title}</p>
                            </div>
                          ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="application" className="mt-4">
                    <ScrollArea className="h-[300px]">
                      <div className="grid grid-cols-2 gap-4">
                        {shareOptions
                          .filter((option) => option.type === "application")
                          .map((option) => (
                            <div
                              key={option.id}
                              className={cn(
                                "border rounded-md p-2 cursor-pointer hover:bg-muted/50 transition-colors",
                                option.selected && "border-primary bg-primary/5",
                              )}
                              onClick={() => handleSelect(option.id)}
                            >
                              <div className="relative">
                                <img
                                  src={option.thumbnail || "/placeholder.svg"}
                                  alt={option.title}
                                  className="w-full h-auto aspect-video object-cover rounded-md mb-2"
                                />
                                {option.selected && (
                                  <div className="absolute top-2 right-2 h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                                    <Check className="h-4 w-4 text-white" />
                                  </div>
                                )}
                              </div>
                              <p className="text-sm font-medium truncate">{option.title}</p>
                            </div>
                          ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                </>
              )}
            </Tabs>

            <div className="space-y-4">
              <div className="border rounded-md p-4">
                <h3 className="text-sm font-medium mb-3">Share Options</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="share-audio">Share computer audio</Label>
                      <p className="text-xs text-muted-foreground">
                        Share audio from your computer when sharing screen or window
                      </p>
                    </div>
                    <Switch
                      id="share-audio"
                      checked={audioEnabled}
                      onCheckedChange={setAudioEnabled}
                      aria-label="Share computer audio"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="optimize-video">Optimize for video</Label>
                      <p className="text-xs text-muted-foreground">
                        Recommended for sharing video content with smooth playback
                      </p>
                    </div>
                    <Switch
                      id="optimize-video"
                      checked={optimizeVideo}
                      onCheckedChange={setOptimizeVideo}
                      aria-label="Optimize for video"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="enable-camera">Enable camera</Label>
                      <p className="text-xs text-muted-foreground">Show your camera alongside the shared content</p>
                    </div>
                    <Switch
                      id="enable-camera"
                      checked={videoEnabled}
                      onCheckedChange={setVideoEnabled}
                      aria-label="Enable camera"
                    />
                  </div>
                </div>
              </div>

              <div className="border rounded-md p-4">
                <h3 className="text-sm font-medium mb-3">Invite Others</h3>
                <div className="flex gap-2">
                  <Input
                    value="https://growthlab.sg/share/abc123"
                    readOnly
                    className="font-mono text-xs"
                    onClick={(e) => e.currentTarget.select()}
                  />
                  <Button variant="outline" onClick={handleCopyInviteLink}>
                    {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    <span className="sr-only">{copied ? "Copied" : "Copy"}</span>
                  </Button>
                </div>

                <div className="mt-2 flex items-center space-x-2">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">Only invited participants can join this session</p>
                </div>
              </div>

              <div className="border rounded-md p-4">
                <h3 className="text-sm font-medium mb-3">Security Settings</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="require-permission">Require permission to join</Label>
                      <p className="text-xs text-muted-foreground">Participants must be approved before joining</p>
                    </div>
                    <Switch id="require-permission" defaultChecked aria-label="Require permission to join" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="allow-recording">Allow recording</Label>
                      <p className="text-xs text-muted-foreground">
                        Participants can record this screen sharing session
                      </p>
                    </div>
                    <Switch id="allow-recording" defaultChecked={false} aria-label="Allow recording" />
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-destructive text-sm">
                <AlertTriangle className="h-4 w-4" />
                <p>{error}</p>
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
                Cancel
              </Button>
              <Button onClick={handleStartSharing} disabled={isLoading || !selectedOption}>
                {isLoading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <ScreenShare className="h-4 w-4 mr-2" />
                )}
                Share
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
