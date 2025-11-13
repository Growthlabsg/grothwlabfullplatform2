"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import {
  Phone,
  Video,
  MessageCircle,
  Maximize2,
  Minimize2,
  Mic,
  MicOff,
  VideoOff,
  Volume2,
  VolumeX,
  Share2,
  Send,
  User,
  Monitor,
} from "lucide-react"

interface CallInterfaceProps {
  callType: "audio" | "video"
  participants: {
    id: string
    name: string
    avatar?: string
  }[]
  onEndCall: () => void
  fullScreen?: boolean
  onToggleFullScreen?: () => void
}

export function CallInterface({
  callType,
  participants,
  onEndCall,
  fullScreen = false,
  onToggleFullScreen,
}: CallInterfaceProps) {
  const [micMuted, setMicMuted] = useState(false)
  const [videoOff, setVideoOff] = useState(false)
  const [speakerMuted, setSpeakerMuted] = useState(false)
  const [screenSharing, setScreenSharing] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [messageText, setMessageText] = useState("")

  const primaryParticipant = participants[0]

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // Handle sending message logic
      setMessageText("")
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      {/* Call header */}
      <div className="h-14 px-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          {callType === "video" ? <Video className="h-5 w-5" /> : <Phone className="h-5 w-5" />}
          <h2 className="text-lg font-semibold">
            {primaryParticipant?.name || "Call"}
            {participants.length > 1 && ` (${participants.length})`}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setShowChat(!showChat)}>
            <MessageCircle className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onToggleFullScreen}>
            {fullScreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Call content */}
      <div className="flex-1 flex">
        {/* Main call area */}
        <div className={cn("flex-1 flex flex-col", showChat ? "md:w-2/3" : "w-full")}>
          {/* Video area */}
          <div className="flex-1 bg-gray-900 relative flex items-center justify-center">
            {callType === "video" && !videoOff ? (
              <div className="relative w-full h-full">
                {/* Remote video (placeholder) */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src={primaryParticipant?.avatar || "/placeholder.svg"}
                    alt={primaryParticipant?.name || "Participant"}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Self video (placeholder) */}
                <div className="absolute bottom-4 right-4 w-48 h-36 bg-gray-800 rounded-lg overflow-hidden border-2 border-white">
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="h-12 w-12 text-gray-400" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-white">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage
                    src={primaryParticipant?.avatar || "/placeholder.svg"}
                    alt={primaryParticipant?.name || "Participant"}
                  />
                  <AvatarFallback>
                    {primaryParticipant?.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("") || "?"}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-medium">{primaryParticipant?.name || "Participant"}</h3>
                <p className="text-gray-400">
                  {callType === "video" ? "Video call" : "Audio call"}
                  {screenSharing && " • Screen sharing"}
                </p>
              </div>
            )}

            {screenSharing && (
              <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                <Monitor className="h-16 w-16 text-gray-400" />
                <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-medium">
                  Sharing screen
                </div>
              </div>
            )}
          </div>

          {/* Call controls */}
          <div className="py-4 px-6 border-t flex items-center justify-center gap-4 bg-background/95">
            <Button
              variant={micMuted ? "destructive" : "outline"}
              size="icon"
              className="h-12 w-12 rounded-full shadow-sm"
              onClick={() => setMicMuted(!micMuted)}
            >
              {micMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>

            {callType === "video" && (
              <Button
                variant={videoOff ? "destructive" : "outline"}
                size="icon"
                className="h-12 w-12 rounded-full shadow-sm"
                onClick={() => setVideoOff(!videoOff)}
              >
                {videoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
              </Button>
            )}

            <Button
              variant={speakerMuted ? "destructive" : "outline"}
              size="icon"
              className="h-12 w-12 rounded-full"
              onClick={() => setSpeakerMuted(!speakerMuted)}
            >
              {speakerMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </Button>

            <Button
              variant={screenSharing ? "destructive" : "outline"}
              size="icon"
              className="h-12 w-12 rounded-full"
              onClick={() => setScreenSharing(!screenSharing)}
            >
              <Share2 className="h-5 w-5" />
            </Button>

            <Button variant="destructive" size="icon" className="h-12 w-12 rounded-full" onClick={onEndCall}>
              <Phone className="h-5 w-5 rotate-135" />
            </Button>
          </div>
        </div>

        {/* Chat sidebar */}
        {showChat && (
          <div className="w-full md:w-1/3 border-l flex flex-col h-full">
            <div className="px-3 py-2 border-b">
              <h3 className="font-medium">In-call messages</h3>
            </div>

            <ScrollArea className="flex-1 p-3">
              <div className="space-y-4">
                <div className="flex justify-start">
                  <div className="max-w-[80%] bg-muted rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src={primaryParticipant?.avatar || "/placeholder.svg"}
                          alt={primaryParticipant?.name || "Participant"}
                        />
                        <AvatarFallback>
                          {primaryParticipant?.name
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("") || "?"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{primaryParticipant?.name}</span>
                    </div>
                    <p className="text-sm">Can you see my screen now?</p>
                    <div className="mt-1 text-right text-xs text-muted-foreground">Just now</div>
                  </div>
                </div>
              </div>
            </ScrollArea>

            <div className="p-3 border-t">
              <div className="flex items-center gap-2">
                <Textarea
                  placeholder="Type a message..."
                  className="min-h-[60px] resize-none"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                />
                <Button size="icon" onClick={handleSendMessage} disabled={!messageText.trim()} className="shrink-0">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
